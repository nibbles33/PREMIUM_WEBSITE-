#!/usr/bin/env node
/** Restaurant multi-image Coverage Explorer — runtime verification. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/restaurant-insurance/";

const STATES = [
  { id: "general-liability", label: "general-liability", tabIndex: 0, expectPath: "state-general-liability" },
  { id: "property-coverage", label: "property", tabIndex: 1, expectPath: "state-property" },
  { id: "liquor-liability", label: "liquor-liability", tabIndex: 2, expectPath: "state-liquor-liability" },
  { id: "equipment-breakdown-spoilage", label: "equipment-breakdown", tabIndex: 3, expectPath: "state-equipment-breakdown" },
];

async function getVisibleImageSrc(page) {
  return page.evaluate(() => {
    const current = document.querySelector(".pilot-ce-state-image--current");
    const next = document.querySelector(".pilot-ce-state-image--next");
    const currentOpacity = current ? parseFloat(getComputedStyle(current).opacity) : 0;
    const nextOpacity = next ? parseFloat(getComputedStyle(next).opacity) : 0;
    if (next && nextOpacity > currentOpacity) {
      return next.getAttribute("src") || "";
    }
    return current?.getAttribute("src") || "";
  });
}

async function verifyBase(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  const hasStateStage = await page.$(".pilot-ce-state-image-stage");
  const hasMasked = await page.$(".pilot-ce-masked-scene");
  const interacted = await page.$eval(".pilot-ce-state-image-stage", (el) =>
    el.getAttribute("data-interacted"),
  );
  const src = await getVisibleImageSrc(page);
  const errors = [];
  if (!hasStateStage) errors.push("missing-state-image-stage");
  if (hasMasked) errors.push("masked-scene-still-present");
  if (interacted !== "false") errors.push("should-not-be-interacted-on-load");
  if (!src.includes("restaurant-insurance-interactive-master")) {
    errors.push(`base-not-shown:${src}`);
  }
  return errors;
}

async function clickTab(page, index) {
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[index]) {
    await tabs[index].click();
    await new Promise((r) => setTimeout(r, 550));
  }
}

async function verifyState(page, state) {
  await clickTab(page, state.tabIndex);
  const src = await getVisibleImageSrc(page);
  const title = await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage h3")?.textContent?.trim(),
  );
  const interacted = await page.$eval(".pilot-ce-state-image-stage", (el) =>
    el.getAttribute("data-interacted"),
  );
  const errors = [];
  if (interacted !== "true") errors.push("not-interacted-after-click");
  if (!src.includes(state.expectPath)) errors.push(`wrong-image:${src}`);
  if (!title) errors.push("missing-title");
  return { errors, src, title };
}

async function verifyRapidClick(page) {
  const sequence = [0, 3, 2, 1, 0, 3];
  for (const idx of sequence) {
    await clickTab(page, idx);
    await new Promise((r) => setTimeout(r, 120));
  }
  await new Promise((r) => setTimeout(r, 600));
  const src = await getVisibleImageSrc(page);
  const activeTab = await page.evaluate(() => {
    const tab = document.querySelector('.pilot-product-coverage-card.is-active');
    return tab?.textContent?.trim() || "";
  });
  const errors = [];
  if (!src.includes("state-equipment-breakdown")) {
    errors.push(`rapid-click-stale:${src} active:${activeTab}`);
  }
  return errors;
}

async function verifyReducedMotion(page) {
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 1);
  const transition = await page.evaluate(() => {
    const img = document.querySelector(".pilot-ce-state-image--current");
    return img ? getComputedStyle(img).transitionDuration : "";
  });
  const ok = transition.includes("0.08") || transition.includes("80ms");
  return ok ? [] : [`reduced-motion-transition:${transition}`];
}

async function verifyMobile(page) {
  await page.setViewport({ width: 390, height: 844 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 0);
  const overflow = await page.evaluate(() => {
    const stage = document.querySelector(".pilot-product-explorer-stage");
    const stageRect = stage?.getBoundingClientRect();
    const viewport = document.documentElement.clientWidth;
    let stageOverflow = false;
    if (stage) {
      stage.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (stageRect && (r.right > stageRect.right + 1 || r.left < stageRect.left - 1)) {
          stageOverflow = true;
        }
      });
    }
    return {
      stageOverflow,
      stageWidth: stageRect?.width ?? 0,
      stageRight: stageRect?.right ?? 0,
      viewport,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });
  const errors = [];
  if (overflow.stageOverflow) errors.push("explorer-stage-overflow");
  if (overflow.stageRight > overflow.viewport + 1) {
    errors.push(`stage-extends-past-viewport:${overflow.stageRight}>${overflow.viewport}`);
  }
  if (overflow.scrollWidth > overflow.viewport + 1) {
    errors.push(`page-horizontal-scroll:${overflow.scrollWidth}>${overflow.viewport}`);
  }
  return errors;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("requestfailed", (req) => {
    failedRequests.push(req.url());
  });

  let allOk = true;

  console.log("=== Base (clean master on load) ===");
  const baseErrors = await verifyBase(page);
  console.log(baseErrors.length ? "FAIL" : "OK", baseErrors);

  console.log("\n=== Coverage states ===");
  for (const state of STATES) {
    const result = await verifyState(page, state);
    console.log(
      result.errors.length ? "FAIL" : "OK",
      state.id,
      result.title,
      result.errors,
    );
    if (result.errors.length) allOk = false;
  }

  console.log("\n=== Direct switching ===");
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 0);
  for (const idx of [3, 2, 1, 0]) {
    await clickTab(page, idx);
  }
  console.log("OK direct switching sequence");

  console.log("\n=== Rapid click race ===");
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  const rapidErrors = await verifyRapidClick(page);
  console.log(rapidErrors.length ? "FAIL" : "OK", rapidErrors);
  if (rapidErrors.length) allOk = false;

  console.log("\n=== Reduced motion ===");
  const rmErrors = await verifyReducedMotion(page);
  console.log(rmErrors.length ? "FAIL" : "OK", rmErrors);
  if (rmErrors.length) allOk = false;

  console.log("\n=== Mobile 390px ===");
  const mobileErrors = await verifyMobile(page);
  console.log(mobileErrors.length ? "FAIL" : "OK", mobileErrors);
  if (mobileErrors.length) allOk = false;

  if (consoleErrors.length) {
    console.log("\nConsole errors:", consoleErrors.slice(0, 5));
    allOk = false;
  }
  const image404s = failedRequests.filter((u) => u.includes("restaurant") || u.includes("premium-coverage"));
  if (image404s.length) {
    console.log("\nFailed image requests:", image404s);
    allOk = false;
  }

  await browser.close();
  process.exit(allOk ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
