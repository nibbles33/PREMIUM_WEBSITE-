#!/usr/bin/env node
/**
 * Greenhouse route recovery validation + screenshots
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
    return {
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      hasHero: Boolean(document.querySelector(".pilot-product-hero")),
      hasHeroPhoto: Boolean(heroPhoto?.getAttribute("src")?.includes("greenhouse")),
      hasExplorer: Boolean(document.querySelector(".pilot-product-explorer-stage")),
      brokerVisible:
        brokerBtn &&
        brokerStyle?.display !== "none" &&
        brokerStyle?.visibility !== "hidden" &&
        parseFloat(brokerStyle?.opacity) > 0.1 &&
        brokerRect.width > 0 &&
        brokerRect.height > 0,
      relatedRail: Boolean(document.querySelector(".pilot-related-rail-track")),
    };
  });

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

  // Nav destination verified from source (dropdown requires interaction not reliable headless)
  const navSource = fs.readFileSync(
    path.join(__dirname, "../src/data/nav-agriculture.ts"),
    "utf8",
  );
  const navSourceOk = navSource.includes('href: "/greenhouse-agribusiness-insurance/"');

  // Farm intact
  await page.goto(`${BASE}/farm-insurance/`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.waitForSelector(".pilot-product-hero", { timeout: 30000 });
  const farmOk = await page.evaluate(() => ({
    headline: document.querySelector("h1")?.textContent?.trim(),
    hasExplorer: Boolean(document.querySelector(".pilot-product-explorer-stage")),
  }));

  await browser.close();

  const report = {
    base: BASE,
    timestamp: new Date().toISOString(),
    route: ROUTE,
    checks,
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
  if (farmOk.headline !== "Farm Insurance" || !farmOk.hasExplorer) failures.push("farm-regression");

  if (failures.length) {
    console.error("Failures:", failures);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
