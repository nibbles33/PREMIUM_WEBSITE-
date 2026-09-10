#!/usr/bin/env node
/** Greenhouse Coverage Explorer V2 refinement verification. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const ROUTE = "/greenhouse-agribusiness-insurance";
const OUT = path.join(__dirname, "../docs/qa-screenshots/greenhouse-coverage-explorer-v2-2026-09-08");

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const EXPECTED_SHORT_LABELS = [
  "Greenhouse Property",
  "Equipment",
  "Stock & Property",
  "Interruption",
  "Liability",
  "Breakdown",
];

const EXPECTED_DETAIL_TITLES = [
  "Why greenhouse structures drive insurable values",
  "When heating and irrigation systems keep the operation running",
  "How plants, supplies, and stock are treated on the policy",
  "When a covered loss forces a shutdown",
  "Liability from premises, visitors, and daily operations",
  "Critical system failure during peak season",
];

async function scrollToExplorer(page) {
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 500));
}

async function getExplorerState(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".pilot-product-explorer-stage");
    const activeTab = document.querySelector(".pilot-product-coverage-card.is-active");
    const shortLabel = activeTab?.querySelector(".font-medium, .text-\\[15px\\]")?.textContent?.trim();
    const tabDesc = activeTab?.querySelector(".text-secondary, .text-\\[13px\\]")?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img = document.querySelector(".pilot-ce-scene-interactive-master-image");
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    return {
      shortLabel,
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      duplicateTitle: shortLabel && detailH3 && shortLabel === detailH3,
      hasImage: Boolean(img),
      objectFit: img ? getComputedStyle(img).objectFit : null,
      overflow,
    };
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  const results = { route: ROUTE, consoleErrors, viewports: [], states: [] };

  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToExplorer(page);

  const tabs = await page.$$(".pilot-product-coverage-card");
  for (let i = 0; i < tabs.length; i++) {
    const currentTabs = await page.$$(".pilot-product-coverage-card");
    await currentTabs[i].click();
    await new Promise((r) => setTimeout(r, 450));
    const s = await getExplorerState(page);
    results.states.push({ index: i, ...s });
  }

  results.stateCount = results.states.length;
  results.shortLabelsMatch = results.states.every(
    (s, i) => s.shortLabel === EXPECTED_SHORT_LABELS[i],
  );
  results.detailTitlesMatch = results.states.every(
    (s, i) => s.detailTitle === EXPECTED_DETAIL_TITLES[i],
  );
  results.noDuplicateText = results.states.every(
    (s) => !s.duplicateTitle && !s.duplicateDesc,
  );
  results.allHaveDetail = results.states.every(
    (s) => s.detailTitle && s.detailDescription,
  );
  results.allHaveImage = results.states.every((s) => s.hasImage);

  const keyboardOk = await page.evaluate(() => {
    const tab = document.querySelector(".pilot-product-coverage-card.is-active");
    tab?.focus();
    tab?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    return Boolean(document.querySelector(".pilot-product-coverage-card.is-active"));
  });
  results.keyboardOk = keyboardOk;

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
    await new Promise((r) => setTimeout(r, 350));
    await scrollToExplorer(page);
    const s = await getExplorerState(page);
    results.viewports.push({ viewport: vp.name, overflow: s.overflow, pass: s.overflow === 0 });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToExplorer(page);
  await page.screenshot({ path: path.join(OUT, "explorer_1440.png"), fullPage: false });

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToExplorer(page);
  await page.screenshot({ path: path.join(OUT, "explorer_390.png"), fullPage: true });

  const stateNames = ["structures", "equipment", "stock", "interruption", "liability", "breakdown"];
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToExplorer(page);
  for (let i = 0; i < stateNames.length; i++) {
    const stateTabs = await page.$$(".pilot-product-coverage-card");
    if (stateTabs[i]) {
      await stateTabs[i].click();
      await new Promise((r) => setTimeout(r, 450));
    }
    await page.screenshot({
      path: path.join(OUT, `state-${stateNames[i]}.png`),
      fullPage: false,
    });
  }

  results.pass =
    results.stateCount === 6 &&
    results.shortLabelsMatch &&
    results.detailTitlesMatch &&
    results.noDuplicateText &&
    results.allHaveDetail &&
    results.allHaveImage &&
    results.keyboardOk &&
    results.viewports.every((v) => v.pass) &&
    consoleErrors.length === 0;

  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(results, null, 2));
  await browser.close();
  console.log(JSON.stringify({ pass: results.pass, stateCount: results.stateCount }, null, 2));
  process.exit(results.pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
