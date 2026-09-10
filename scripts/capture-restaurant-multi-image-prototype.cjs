#!/usr/bin/env node
/** Capture Restaurant multi-image prototype QA screenshots. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT = path.join(__dirname, "../docs/qa-screenshots/restaurant-multi-image-prototype");
const ROUTE = "/restaurant-insurance/";

const CAPTURES = [
  { file: "restaurant-base-default-desktop", tabIndex: null, viewport: { width: 1440, height: 900 }, skipClick: true },
  { file: "restaurant-general-liability-desktop", tabIndex: 0, viewport: { width: 1440, height: 900 } },
  { file: "restaurant-property-desktop", tabIndex: 1, viewport: { width: 1440, height: 900 } },
  { file: "restaurant-liquor-liability-desktop", tabIndex: 2, viewport: { width: 1440, height: 900 } },
  { file: "restaurant-equipment-breakdown-desktop", tabIndex: 3, viewport: { width: 1440, height: 900 } },
  { file: "restaurant-general-liability-mobile-390", tabIndex: 0, viewport: { width: 390, height: 844 } },
  { file: "restaurant-equipment-breakdown-mobile-390", tabIndex: 3, viewport: { width: 390, height: 844 } },
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
    await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
    if (!cap.skipClick && cap.tabIndex !== null) {
      const tabs = await page.$$(".pilot-product-coverage-card");
      if (tabs[cap.tabIndex]) {
        await tabs[cap.tabIndex].click();
        await new Promise((r) => setTimeout(r, 550));
      }
    }
    const stage = await page.$(".pilot-product-explorer-stage");
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
