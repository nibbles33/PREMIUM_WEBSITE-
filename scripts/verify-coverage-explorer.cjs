#!/usr/bin/env node
/** Verify coverage explorer has no duplicate description blocks per state. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const ROUTES = ["/boat-insurance/", "/home-insurance/", "/tenant-insurance/"];

async function verifyRoute(page, route) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 60000 });

  const tabs = await page.$$(".pilot-product-coverage-card");
  const results = [];

  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 200));

    const state = await page.evaluate(() => {
      const panel = document.querySelector(".pilot-product-explorer-stage");
      if (!panel) return { ok: false, reason: "missing-panel" };

      const stageCaptions = panel.querySelectorAll(".pilot-product-coverage-stage-caption");
      const detailBlocks = panel.querySelectorAll(
        ".rounded-xl.border.border-gold\\/25 h3",
      );
      const detailTexts = Array.from(detailBlocks).map((el) => el.textContent?.trim());
      const uniqueDetails = new Set(detailTexts);

      return {
        ok: stageCaptions.length === 0 && detailTexts.length === 1 && uniqueDetails.size === 1,
        stageCaptions: stageCaptions.length,
        detailBlocks: detailTexts.length,
        detailText: detailTexts[0] ?? null,
        duplicateDetail: detailTexts.length > 1,
      };
    });

    results.push({ index: i, ...state });
  }

  const failed = results.filter((r) => !r.ok);
  return { route, ok: failed.length === 0, states: results.length, failed };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const summary = [];
  for (const route of ROUTES) {
    const result = await verifyRoute(page, route);
    summary.push(result);
    console.log(`${result.ok ? "OK" : "FAIL"} ${route} (${result.states} states)`);
    if (result.failed?.length) console.log(JSON.stringify(result.failed, null, 2));
  }

  await browser.close();

  if (summary.some((r) => !r.ok)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
