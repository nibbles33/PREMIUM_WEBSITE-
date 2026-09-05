#!/usr/bin/env node
/** Contractors motion Coverage Explorer — runtime verification. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/contractors-insurance/";

const STATES = [
  {
    id: "general-liability",
    tabIndex: 0,
    expectPath: "state-liability",
    title: "General Liability",
  },
  {
    id: "tools-equipment-coverage",
    tabIndex: 1,
    expectPath: "state-tools-equipment",
    title: "Tools & Equipment",
    motion: "equipment-activate",
  },
  {
    id: "builder-s-risk",
    tabIndex: 2,
    expectPath: "state-property",
    title: "Builder's Risk",
    motion: "vertical-reveal-settle",
  },
  {
    id: "wrap-up-liability",
    tabIndex: 3,
    expectPath: "state-installation-work",
    title: "Wrap-Up Liability",
  },
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

async function clickTab(page, index) {
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[index]) {
    await tabs[index].click();
    await new Promise((r) => setTimeout(r, 550));
  }
}

async function verifyBase(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  const hasStateStage = await page.$(".pilot-ce-state-image-stage");
  const hasInteractive = await page.$(".pilot-ce-scene-interactive-master");
  const interacted = await page.$eval(".pilot-ce-state-image-stage", (el) =>
    el.getAttribute("data-interacted"),
  );
  const src = await getVisibleImageSrc(page);
  const errors = [];
  if (!hasStateStage) errors.push("missing-state-image-stage");
  if (hasInteractive) errors.push("still-interactive-master");
  if (interacted !== "false") errors.push("should-not-be-interacted-on-load");
  if (!src.includes("contractors-insurance-interactive-master")) {
    errors.push(`base-not-shown:${src}`);
  }
  return errors;
}

async function verifyState(page, state) {
  await clickTab(page, state.tabIndex);
  const src = await getVisibleImageSrc(page);
  const errors = [];
  if (!src.includes(state.expectPath)) errors.push(`wrong-image:${src}`);
  if (state.motion) {
    await new Promise((r) => setTimeout(r, 200));
    const motion = await page.$eval(".pilot-ce-state-image-stage", (el) =>
      el.getAttribute("data-motion"),
    );
    if (motion !== "playing" && motion !== "idle") {
      errors.push(`unexpected-motion:${motion}`);
    }
  }
  await new Promise((r) => setTimeout(r, 1400));
  const settledMotion = await page.$eval(".pilot-ce-state-image-stage", (el) =>
    el.getAttribute("data-motion"),
  );
  if (settledMotion !== "idle") errors.push(`motion-not-settled:${settledMotion}`);
  return errors;
}

async function verifyRapidSwitch(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  const sequence = [2, 1, 2, 0, 3, 1];
  for (const idx of sequence) {
    await clickTab(page, idx);
    await new Promise((r) => setTimeout(r, 180));
  }
  await new Promise((r) => setTimeout(r, 1600));
  const src = await getVisibleImageSrc(page);
  const overlayCount = await page.$$eval(".pilot-ce-motion-overlay", (els) =>
    els.filter((el) => getComputedStyle(el).display !== "none").length,
  );
  const motion = await page.$eval(".pilot-ce-state-image-stage", (el) =>
    el.getAttribute("data-motion"),
  );
  const errors = [];
  if (!src.includes("state-tools-equipment")) errors.push(`rapid-stale:${src}`);
  if (overlayCount > 1) errors.push(`ghost-overlays:${overlayCount}`);
  if (motion === "playing") errors.push("motion-still-playing");
  return errors;
}

async function verifyReducedMotion(page) {
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 300));
  const anim = await page.evaluate(() => {
    const img = document.querySelector(".pilot-ce-state-image--current");
    return img ? getComputedStyle(img).animationName : "";
  });
  const src = await getVisibleImageSrc(page);
  const errors = [];
  if (anim && anim !== "none") errors.push(`reduced-motion-animation:${anim}`);
  if (!src.includes("state-property")) errors.push(`reduced-motion-image:${src}`);
  return errors;
}

async function verifyMobile(page) {
  await page.setViewport({ width: 390, height: 844 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 1200));
  const src = await getVisibleImageSrc(page);
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  const viewport = await page.evaluate(() => document.documentElement.clientWidth);
  const errors = [];
  if (!src.includes("state-property")) errors.push(`mobile-image:${src}`);
  if (scrollW > viewport + 1) errors.push(`mobile-overflow:${scrollW}>${viewport}`);
  return errors;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  let allOk = true;

  console.log("=== Base ===");
  const baseErrors = await verifyBase(page);
  console.log(baseErrors.length ? "FAIL" : "OK", baseErrors);

  console.log("\n=== States ===");
  for (const state of STATES) {
    const errors = await verifyState(page, state);
    console.log(errors.length ? "FAIL" : "OK", state.id, errors);
    if (errors.length) allOk = false;
  }

  console.log("\n=== Rapid switch ===");
  const rapidErrors = await verifyRapidSwitch(page);
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

  await browser.close();
  process.exit(allOk ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
