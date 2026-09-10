#!/usr/bin/env node
/** Restaurant Coverage Explorer prototype — all coverage states, desktop + mobile. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3010";
const OUT = path.join(__dirname, "../docs/qa-screenshots/restaurant-highlight-prototype");
const ROUTE = "/restaurant-insurance/";

const STATES = [
  { id: "general-liability", label: "general-liability", tabIndex: 0 },
  { id: "property-coverage", label: "property-coverage", tabIndex: 1 },
  { id: "liquor-liability", label: "liquor-liability", tabIndex: 2 },
  { id: "equipment-breakdown-spoilage", label: "equipment-spoilage", tabIndex: 3 },
];

const VIEWPORTS = [
  { suffix: "desktop", width: 1440, height: 900 },
  { suffix: "mobile-390", width: 390, height: 844 },
];

async function captureState(page, state, viewport) {
  await page.setViewport(viewport);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });

  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[state.tabIndex]) {
    await tabs[state.tabIndex].click();
    await new Promise((r) => setTimeout(r, 650));
  }

  const stage = await page.$(".pilot-product-explorer-stage");
  if (!stage) throw new Error("missing explorer stage");

  const hasMasked = await page.$(".pilot-ce-masked-scene");
  const hasYellowPoly = await page.$(".pilot-ce-svg-zone.is-active");
  if (!hasMasked) throw new Error(`${state.id}: missing masked scene`);
  if (hasYellowPoly) throw new Error(`${state.id}: yellow polygon still visible`);

  const file = `restaurant-${state.label}-${viewport.suffix}.png`;
  await stage.screenshot({ path: path.join(OUT, file) });
  console.log(`saved ${file}`);
}

async function captureReducedMotion(page) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[3]) {
    await tabs[3].click();
    await new Promise((r) => setTimeout(r, 500));
  }
  const stage = await page.$(".pilot-product-explorer-stage");
  await stage.screenshot({
    path: path.join(OUT, "restaurant-equipment-spoilage-reduced-motion-desktop.png"),
  });
  console.log("saved restaurant-equipment-spoilage-reduced-motion-desktop.png");
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    for (const state of STATES) {
      await captureState(page, state, vp);
    }
  }
  await captureReducedMotion(page);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
