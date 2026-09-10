#!/usr/bin/env node
/** Restaurant Coverage Explorer magnifier — runtime verification. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/restaurant-insurance/";

async function emulateFinePointer(page, enabled) {
  await page.evaluateOnNewDocument((fine) => {
    const original = window.matchMedia.bind(window);
    window.matchMedia = (query) => {
      const result = original(query);
      if (query === "(hover: hover) and (pointer: fine)") {
        return {
          matches: fine,
          media: query,
          addEventListener: (type, fn) => result.addEventListener(type, fn),
          removeEventListener: (type, fn) => result.removeEventListener(type, fn),
          dispatchEvent: (event) => result.dispatchEvent(event),
        };
      }
      return result;
    };
  }, enabled);
}

async function clickTab(page, index) {
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[index]) {
    await tabs[index].click();
    await new Promise((r) => setTimeout(r, 550));
  }
}

async function hoverImageCenter(page) {
  const box = await page.$eval(".pilot-ce-state-image-stack", (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
  });
  await page.mouse.move(Math.round(box.x), Math.round(box.y));
  await new Promise((r) => setTimeout(r, 120));
  return box;
}

async function verifyDesktopLens(page) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 0);

  const magnifierEnabled = await page.$eval(".pilot-ce-state-image-stage", (el) =>
    el.getAttribute("data-magnifier"),
  );
  const hint = await page.$(".pilot-ce-magnifier-hint");
  const errors = [];
  if (magnifierEnabled !== "enabled") errors.push(`magnifier-not-enabled:${magnifierEnabled}`);
  if (!hint) errors.push("missing-hint");

  await hoverImageCenter(page);
  const lensVisible = await page.$eval(".pilot-ce-magnifier-lens", (el) => {
    const s = getComputedStyle(el);
    return s.visibility === "visible" && parseFloat(s.opacity) > 0.5;
  });
  if (!lensVisible) errors.push("lens-not-visible-on-hover");

  const bgImage = await page.$eval(".pilot-ce-magnifier-lens", (el) =>
    getComputedStyle(el).backgroundImage,
  );
  if (!bgImage.includes("state-general-liability")) {
    errors.push(`wrong-lens-image:${bgImage}`);
  }

  return errors;
}

async function verifyLetterboxHide(page) {
  const point = await page.evaluate(() => {
    const frame = document.querySelector(".pilot-ce-stage-frame--state-images");
    if (frame) frame.style.aspectRatio = "1 / 1";
    const stack = document.querySelector(".pilot-ce-state-image-stack");
    if (!stack) return null;
    const r = stack.getBoundingClientRect();
    const imageWidth = 1672;
    const imageHeight = 941;
    const scale = Math.min(r.width / imageWidth, r.height / imageHeight);
    const renderedHeight = imageHeight * scale;
    const offsetY = (r.height - renderedHeight) / 2;
    if (offsetY < 2) return { skip: true };
    return {
      x: r.left + r.width / 2,
      y: r.top + Math.max(2, offsetY - 4),
    };
  });
  if (!point) return ["missing-stack"];
  if (point.skip) return [];
  await page.mouse.move(Math.round(point.x), Math.round(point.y));
  await new Promise((r) => setTimeout(r, 100));
  const hidden = await page.$eval(".pilot-ce-magnifier-lens", (el) => {
    const s = getComputedStyle(el);
    return s.visibility === "hidden" || parseFloat(s.opacity) < 0.1;
  });
  return hidden ? [] : ["lens-visible-on-letterbox"];
}

async function verifyCoverageSwitch(page) {
  await clickTab(page, 1);
  const box = await hoverImageCenter(page);
  await page.mouse.move(Math.round(box.x), Math.round(box.y));
  const bgBefore = await page.$eval(".pilot-ce-magnifier-lens", (el) =>
    getComputedStyle(el).backgroundImage,
  );

  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 150));
  const hiddenDuring = await page.$eval(".pilot-ce-magnifier-lens", (el) => {
    const s = getComputedStyle(el);
    return s.visibility === "hidden" || parseFloat(s.opacity) < 0.1;
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.mouse.move(Math.round(box.x), Math.round(box.y));
  await new Promise((r) => setTimeout(r, 120));
  const bgAfter = await page.$eval(".pilot-ce-magnifier-lens", (el) =>
    getComputedStyle(el).backgroundImage,
  );
  const errors = [];
  if (!hiddenDuring) errors.push("lens-not-hidden-during-crossfade");
  if (bgAfter === bgBefore) errors.push("lens-stale-after-switch");
  if (!bgAfter.includes("state-liquor-liability")) errors.push(`wrong-after-switch:${bgAfter}`);
  return errors;
}

async function verifyMobileDisabled(page) {
  const mobilePage = await page.browser().newPage();
  await emulateFinePointer(mobilePage, false);
  await mobilePage.setViewport({ width: 390, height: 844 });
  await mobilePage.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(mobilePage, 0);

  const magnifierEnabled = await mobilePage.$eval(".pilot-ce-state-image-stage", (el) =>
    el.getAttribute("data-magnifier"),
  );
  const lensCount = await mobilePage.$$eval(".pilot-ce-magnifier-lens", (els) => els.length);
  const hintCount = await mobilePage.$$eval(".pilot-ce-magnifier-hint", (els) => els.length);
  const scrollW = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const viewport = await mobilePage.evaluate(() => document.documentElement.clientWidth);

  const errors = [];
  if (magnifierEnabled !== "disabled") errors.push(`mobile-magnifier-enabled:${magnifierEnabled}`);
  if (lensCount > 0) errors.push("mobile-lens-present");
  if (hintCount > 0) errors.push("mobile-hint-present");
  if (scrollW > viewport + 1) errors.push(`mobile-horizontal-scroll:${scrollW}`);
  await mobilePage.close();
  return errors;
}

async function verifyReducedMotion(page) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 3);
  await hoverImageCenter(page);
  const transition = await page.$eval(".pilot-ce-magnifier-lens", (el) =>
    getComputedStyle(el).transitionDuration,
  );
  return transition === "0s" ? [] : [`reduced-motion-lens-transition:${transition}`];
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await emulateFinePointer(page, true);
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  let allOk = true;
  const sections = [
    ["Desktop lens", verifyDesktopLens],
    ["Letterbox hide", verifyLetterboxHide],
    ["Coverage switch", verifyCoverageSwitch],
    ["Mobile disabled", verifyMobileDisabled],
    ["Reduced motion", verifyReducedMotion],
  ];

  for (const [name, fn] of sections) {
    const errors = await fn(page);
    console.log(name, errors.length ? "FAIL" : "OK", errors);
    if (errors.length) allOk = false;
  }

  if (consoleErrors.length) {
    console.log("Console errors:", consoleErrors.slice(0, 5));
    allOk = false;
  }

  await browser.close();
  process.exit(allOk ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
