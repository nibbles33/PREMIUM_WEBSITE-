#!/usr/bin/env node
/** Capture Contractors handoff sequence with real transparent assets. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT = path.join(__dirname, "../docs/qa-screenshots/contractors-motion-prototype");
const ROUTE = "/contractors-insurance/";

async function goto(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
}

async function clickTab(page, index) {
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[index]) await tabs[index].click();
}

async function shotStage(page, file) {
  const stage = await page.$(".pilot-ce-stage-frame--contractors-insurance");
  if (stage) {
    await stage.screenshot({ path: path.join(OUT, `${file}.png`) });
    console.log(`saved ${file}.png`);
  }
}

async function captureSequence(page, tabIndex, prefix, choreographyMs, handoffMs, settledMs) {
  await clickTab(page, tabIndex);
  await new Promise((r) => setTimeout(r, 450));
  await shotStage(page, `${prefix}-01-clean-bg`);

  await new Promise((r) => setTimeout(r, choreographyMs));
  await shotStage(page, `${prefix}-02-mid-choreography`);

  await new Promise((r) => setTimeout(r, handoffMs));
  await shotStage(page, `${prefix}-03-handoff`);

  await new Promise((r) => setTimeout(r, settledMs));
  await shotStage(page, `${prefix}-04-settled`);
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
  await shotStage(page, "00-general-load");

  // Builder's Risk — full sequence with mid-animation frame
  await captureSequence(page, 2, "builders", 420, 380, 500);

  // Tools & Equipment — full sequence with mid-animation frame
  await captureSequence(page, 1, "tools", 380, 360, 500);

  await clickTab(page, 0);
  await new Promise((r) => setTimeout(r, 550));
  await shotStage(page, "liability-settled");

  await clickTab(page, 3);
  await new Promise((r) => setTimeout(r, 550));
  await shotStage(page, "wrap-up-settled");

  // Mobile Builder's Risk mid-choreography
  await page.setViewport({ width: 390, height: 844 });
  await goto(page);
  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 520));
  await shotStage(page, "mobile-builders-mid-choreography");
  await new Promise((r) => setTimeout(r, 1200));
  await shotStage(page, "mobile-builders-settled");

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
