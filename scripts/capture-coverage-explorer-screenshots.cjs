#!/usr/bin/env node
/** Capture coverage explorer screenshots for Part 2 report. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(__dirname, "../docs/qa-screenshots/pre-integration-part2");

const CAPTURES = [
  { file: "auto-explorer-desktop", route: "/auto-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-auto-coverage-card" },
  { file: "auto-explorer-mobile", route: "/auto-insurance/", viewport: { width: 390, height: 844 }, tabClass: "pilot-auto-coverage-card" },
  { file: "restaurant-explorer-desktop", route: "/restaurant-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 2 },
  { file: "restaurant-explorer-mobile", route: "/restaurant-insurance/", viewport: { width: 390, height: 844 }, tabClass: "pilot-product-coverage-card", tabIndex: 2 },
  { file: "home-explorer-desktop", route: "/home-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card" },
  { file: "boat-explorer-desktop", route: "/boat-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card", tabIndex: 1 },
  { file: "garage-explorer-desktop", route: "/garage-dealership-insurance/", viewport: { width: 1440, height: 900 }, tabClass: "pilot-product-coverage-card" },
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
    await page.goto(`${BASE}${cap.route}`, { waitUntil: "networkidle2", timeout: 60000 });
    const tabs = await page.$$(`.${cap.tabClass}`);
    const idx = cap.tabIndex ?? 0;
    if (tabs[idx]) {
      await tabs[idx].click();
      await new Promise((r) => setTimeout(r, 400));
    }
    const stage = await page.$(".pilot-auto-explorer-stage, .pilot-product-explorer-stage");
    if (stage) {
      await stage.screenshot({ path: path.join(OUT, `${cap.file}.png`) });
      console.log(`saved ${cap.file}.png`);
    }
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
