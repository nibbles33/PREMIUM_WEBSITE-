#!/usr/bin/env node
/** Capture Restaurant magnifier prototype QA screenshots. */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT = path.join(__dirname, "../docs/qa-screenshots/restaurant-magnifier-prototype");
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

async function setupDesktop(page) {
  await page.setViewport({ width: 1440, height: 900 });
}

async function gotoAndClick(page, tabIndex) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  if (tabIndex !== null) {
    const tabs = await page.$$(".pilot-product-coverage-card");
    if (tabs[tabIndex]) {
      await tabs[tabIndex].click();
      await new Promise((r) => setTimeout(r, 550));
    }
  }
}

async function hoverLens(page, relX, relY) {
  const box = await page.$eval(".pilot-ce-state-image-stack", (el) => {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });
  await page.mouse.move(box.left + box.width * relX, box.top + box.height * relY);
  await new Promise((r) => setTimeout(r, 180));
}

async function screenshotStage(page, file) {
  const stage = await page.$(".pilot-product-explorer-stage");
  if (stage) {
    await stage.screenshot({ path: path.join(OUT, `${file}.png`) });
    console.log(`saved ${file}.png`);
  }
}

async function screenshotExplorer(page, file) {
  const stage = await page.$(".pilot-product-explorer-stage");
  if (!stage) return;
  const section = await page.evaluateHandle((el) => el.closest("section"), stage);
  const sectionEl = section.asElement();
  const target = sectionEl || stage;
  await target.screenshot({ path: path.join(OUT, `${file}.png`) });
  console.log(`saved ${file}.png`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await emulateFinePointer(page, true);
  await setupDesktop(page);

  await gotoAndClick(page, 0);
  await hoverLens(page, 0.55, 0.45);
  await screenshotStage(page, "magnifier-general-liability-desktop");

  await gotoAndClick(page, 2);
  await hoverLens(page, 0.72, 0.38);
  await screenshotStage(page, "magnifier-liquor-liability-bar-desktop");

  await gotoAndClick(page, 3);
  await hoverLens(page, 0.35, 0.55);
  await screenshotStage(page, "magnifier-equipment-breakdown-kitchen-desktop");

  await gotoAndClick(page, 0);
  await hoverLens(page, 0.08, 0.5);
  await screenshotStage(page, "magnifier-lens-near-edge-desktop");

  await gotoAndClick(page, 1);
  await hoverLens(page, 0.5, 0.5);
  await screenshotExplorer(page, "magnifier-explorer-full-desktop");

  await page.setViewport({ width: 390, height: 844 });
  const mobilePage = await browser.newPage();
  await emulateFinePointer(mobilePage, false);
  await mobilePage.setViewport({ width: 390, height: 844 });
  await gotoAndClick(mobilePage, 0);
  const stage = await mobilePage.$(".pilot-product-explorer-stage");
  if (stage) {
    await stage.screenshot({ path: path.join(OUT, "magnifier-mobile-390-no-lens.png") });
    console.log("saved magnifier-mobile-390-no-lens.png");
  }
  await mobilePage.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
