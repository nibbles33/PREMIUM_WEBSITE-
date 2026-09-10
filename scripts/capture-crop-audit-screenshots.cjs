#!/usr/bin/env node
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT = path.join(__dirname, "../docs/qa-screenshots/coverage-explorer-crop-audit");

const FOCUS = [
  { slug: "cyber-insurance", tabIndex: 1, label: "data" },
  { slug: "travel-insurance", tabIndex: 2, label: "emergency" },
  { slug: "mobile-home-insurance", tabIndex: 1, label: "contents" },
];

async function main() {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const { slug, tabIndex, label } of FOCUS) {
    await page.goto(`${BASE}/${slug}/`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1200));
    await page.evaluate(() =>
      document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
    );
    const tabs = await page.$$(".pilot-product-coverage-card");
    if (tabs[tabIndex]) {
      await tabs[tabIndex].click();
      await new Promise((r) => setTimeout(r, 600));
    }
    const dir = path.join(OUT, `${slug}-post-fix`);
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, `${label}-explorer-desktop-1440.png`) });
    const frame = await page.$(".pilot-ce-stage-frame");
    if (frame) await frame.screenshot({ path: path.join(dir, `${label}-stage-frame.png`) });
  }

  await browser.close();
  console.log("Screenshots saved to", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
