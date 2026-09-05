#!/usr/bin/env node
/** Capture final Coverage Explorer wiring QA screenshots (committed to repo). */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(__dirname, "../docs/qa-screenshots/coverage-explorer-wiring");

const CAPTURES = [
  { file: "auto-diorama-desktop", route: "/auto-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-auto-coverage-card", tabIndex: 0 },
  { file: "auto-collision-state-desktop", route: "/auto-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-auto-coverage-card", tabIndex: 1 },
  { file: "auto-mobile-390", route: "/auto-insurance/", viewport: { width: 390, height: 844 }, tabClass: "pilot-auto-coverage-card", tabIndex: 0 },
  { file: "home-explorer-desktop", route: "/home-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 1 },
  { file: "restaurant-explorer-desktop", route: "/restaurant-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 2 },
  { file: "bonding-alias-desktop", route: "/bonding-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 0 },
  { file: "greenhouse-alias-desktop", route: "/greenhouse-agribusiness-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 0 },
  { file: "daycare-new-route-desktop", route: "/daycare-private-school-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 0 },
  { file: "gym-new-route-desktop", route: "/fitness-gym-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 1 },
  { file: "nonprofit-new-route-desktop", route: "/non-profit-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 0 },
  { file: "fleet-alias-desktop", route: "/commercial-auto-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 1 },
  { file: "cyber-explorer-desktop", route: "/cyber-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 0 },
  { file: "home-reduced-motion", route: "/home-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 2, reducedMotion: true },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  for (const cap of CAPTURES) {
    await page.setViewport(cap.viewport);
    if (cap.reducedMotion) {
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    } else {
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    }
    await page.goto(`${BASE}${cap.route}`, { waitUntil: "networkidle2", timeout: 60000 });
    const tabs = await page.$$(`.${cap.tabClass}`);
    const idx = cap.tabIndex ?? 0;
    if (tabs[idx]) {
      await tabs[idx].click();
      await new Promise((r) => setTimeout(r, 500));
    }
    const stage = await page.$(".pilot-auto-explorer-stage, .pilot-product-explorer-stage");
    if (stage) {
      await stage.screenshot({ path: path.join(OUT, `${cap.file}.png`) });
      console.log(`saved ${cap.file}.png`);
    } else {
      console.warn(`missing stage for ${cap.file}`);
    }
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
