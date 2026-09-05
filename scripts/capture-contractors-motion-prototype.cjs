#!/usr/bin/env node
/** Capture Contractors motion prototype QA screenshots. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT = path.join(__dirname, "../docs/qa-screenshots/contractors-motion-prototype");
const ROUTE = "/contractors-insurance/";

async function goto(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
}

async function clickTab(page, index) {
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[index]) await tabs[index].click();
}

async function shotStage(page, file) {
  const stage = await page.$(".pilot-product-explorer-stage");
  if (stage) {
    await stage.screenshot({ path: path.join(OUT, `${file}.png`) });
    console.log(`saved ${file}.png`);
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await goto(page);
  await shotStage(page, "01-property-before");

  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 520));
  await shotStage(page, "02-property-motion");

  await new Promise((r) => setTimeout(r, 1000));
  await shotStage(page, "03-property-settled");

  await clickTab(page, 1);
  await new Promise((r) => setTimeout(r, 520));
  await shotStage(page, "04-tools-motion");

  await new Promise((r) => setTimeout(r, 900));
  await shotStage(page, "05-tools-settled");

  await clickTab(page, 0);
  await new Promise((r) => setTimeout(r, 550));
  await shotStage(page, "06-liability");

  await clickTab(page, 3);
  await new Promise((r) => setTimeout(r, 550));
  await shotStage(page, "07-installation");

  await page.setViewport({ width: 390, height: 844 });
  await goto(page);
  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 1200));
  await shotStage(page, "08-mobile-390");

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
