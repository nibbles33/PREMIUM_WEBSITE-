#!/usr/bin/env node
/** Capture exact handoff moment + direct-click settled comparison. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT = path.join(__dirname, "../docs/qa-screenshots/contractors-handoff-seamless");
const ROUTE = "/contractors-insurance/";

const SEQUENCES = [
  { prefix: "builders", tabIndex: 2 },
  { prefix: "tools", tabIndex: 1 },
];

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
  const stack = await page.$(".pilot-ce-state-image-stack");
  if (stack) {
    await stack.screenshot({ path: path.join(OUT, `${file}.png`) });
    console.log(`saved ${file}.png`);
  }
}

async function waitForHandoffPhase(page, phase, timeoutMs = 12000) {
  await page.waitForFunction(
    (expected) =>
      document
        .querySelector(".pilot-ce-state-image-stage")
        ?.getAttribute("data-handoff-phase") === expected,
    { timeout: timeoutMs },
    phase,
  );
}

async function captureHandoffSequence(page, { prefix, tabIndex }) {
  await goto(page);
  await clickTab(page, tabIndex);

  await waitForHandoffPhase(page, "choreography");
  await new Promise((r) => setTimeout(r, 500));
  await shotStage(page, `${prefix}-mid-choreography`);

  await waitForHandoffPhase(page, "handoff");
  await new Promise((r) => setTimeout(r, 180));
  await shotStage(page, `${prefix}-handoff-moment`);

  await waitForHandoffPhase(page, "settled");
  await new Promise((r) => setTimeout(r, 120));
  await shotStage(page, `${prefix}-settled-after-animation`);
}

async function captureDirectClick(page, { prefix, tabIndex }) {
  await goto(page);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await clickTab(page, tabIndex);
  await new Promise((r) => setTimeout(r, 500));
  await shotStage(page, `${prefix}-direct-click-settled`);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const seq of SEQUENCES) {
    await captureHandoffSequence(page, seq);
    await captureDirectClick(page, seq);
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
