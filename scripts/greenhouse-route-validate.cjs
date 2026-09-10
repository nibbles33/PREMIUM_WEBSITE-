#!/usr/bin/env node
/**
 * Greenhouse route validation + screenshots
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const ROUTE = "/greenhouse-agribusiness-insurance/";
const ARTIFACTS = path.join(__dirname, "../docs/qa-screenshots/greenhouse-route");
const SLUG = "greenhouse-agribusiness-insurance";

async function waitForPage(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.waitForSelector(".pilot-product-hero", { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 600));
}

async function verifyCoverageNoDuplication(page) {
  await waitForPage(page);
  await page.waitForSelector(".pilot-product-coverage-card", { timeout: 30000 });

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

      return {
        ok: stageCaptions.length === 0 && detailTexts.length === 1,
        stageCaptions: stageCaptions.length,
        detailBlocks: detailTexts.length,
      };
    });

    results.push({ index: i, ...state });
  }

  const failed = results.filter((r) => !r.ok);
  return { ok: failed.length === 0, states: results.length, failed };
}

async function main() {
  fs.mkdirSync(path.join(ARTIFACTS, SLUG), { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await waitForPage(page);

  const checks = await page.evaluate(() => {
    const heroPhoto = document.querySelector(".pilot-product-hero-photo img");
    const brokerBtn = document.querySelector(".pilot-product-final-broker-btn");
    const brokerStyle = brokerBtn ? window.getComputedStyle(brokerBtn) : null;
    const brokerRect = brokerBtn?.getBoundingClientRect();
    const quoteLink = [...document.querySelectorAll("a")].find((a) =>
      a.textContent?.includes("Get a Greenhouse Quote"),
    );
    const quoteHref = quoteLink?.getAttribute("href") ?? null;
    return {
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      hasHero: Boolean(document.querySelector(".pilot-product-hero")),
      hasHeroPhoto: Boolean(heroPhoto?.getAttribute("src")?.includes("greenhouse")),
      hasExplorer: Boolean(document.querySelector(".pilot-product-explorer-stage")),
      coverageCards: document.querySelectorAll(".pilot-product-coverage-card").length,
      considerations: document.querySelectorAll("#pilot-product-considerations-heading").length,
      considerationItems: document.querySelectorAll(
        "#pilot-product-considerations-heading",
      ).length
        ? document.querySelectorAll(
            '[aria-labelledby="pilot-product-considerations-heading"] li, section[aria-labelledby="pilot-product-considerations-heading"] li',
          ).length
        : 0,
      faqItems: document.querySelectorAll(".pilot-auto-faq-item").length,
      brokerVisible:
        brokerBtn &&
        brokerStyle?.display !== "none" &&
        brokerStyle?.visibility !== "hidden" &&
        parseFloat(brokerStyle?.opacity) > 0.1 &&
        brokerRect.width > 0 &&
        brokerRect.height > 0,
      relatedRail: Boolean(document.querySelector(".pilot-related-rail-track")),
      quoteHref,
    };
  });

  // Re-count considerations with simpler selector after page load
  const considerationCount = await page.evaluate(() => {
    const section = document.querySelector("#pilot-product-considerations-heading");
    if (!section) return 0;
    return section.closest("section")?.querySelectorAll("li").length ?? 0;
  });

  checks.considerationItems = considerationCount;

  const coverageTest = await verifyCoverageNoDuplication(page);

  for (const vp of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await waitForPage(page);
    const file = path.join(ARTIFACTS, SLUG, `${vp.name}_${vp.width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`SHOT ${file}`);
  }

  const navSource = fs.readFileSync(
    path.join(__dirname, "../src/data/nav-agriculture.ts"),
    "utf8",
  );
  const navSourceOk = navSource.includes('href: "/greenhouse-agribusiness-insurance/"');

  await page.goto(`${BASE}/farm-insurance/`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.waitForSelector(".pilot-product-hero", { timeout: 30000 });
  const farmOk = await page.evaluate(() => ({
    headline: document.querySelector("h1")?.textContent?.trim(),
    hasExplorer: Boolean(document.querySelector(".pilot-product-explorer-stage")),
    coverageCards: document.querySelectorAll(".pilot-product-coverage-card").length,
  }));

  await browser.close();

  const report = {
    base: BASE,
    timestamp: new Date().toISOString(),
    route: ROUTE,
    checks,
    coverageTest,
    navSourceOk,
    farmRegression: farmOk,
    status: 200,
  };
  fs.writeFileSync(path.join(ARTIFACTS, "validation-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  const failures = [];
  if (!checks.hasHeroPhoto) failures.push("missing-hero-photo");
  if (!checks.brokerVisible) failures.push("broker-not-visible");
  if (checks.overflow) failures.push("horizontal-overflow");
  if (!navSourceOk) failures.push("nav-source-not-updated");
  if (checks.coverageCards !== 6) failures.push(`coverage-cards-${checks.coverageCards}`);
  if (checks.considerationItems !== 6) failures.push(`considerations-${checks.considerationItems}`);
  if (checks.faqItems !== 5) failures.push(`faq-items-${checks.faqItems}`);
  if (checks.quoteHref !== "/get-a-quote?type=business&industry=greenhouse")
    failures.push(`quote-href-${checks.quoteHref}`);
  if (!coverageTest.ok) failures.push("coverage-duplication");
  if (farmOk.headline !== "Farm Insurance" || farmOk.coverageCards !== 4)
    failures.push("farm-regression");

  if (failures.length) {
    console.error("Failures:", failures);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
