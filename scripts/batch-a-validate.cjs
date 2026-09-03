#!/usr/bin/env node
/**
 * Batch A route validation + screenshot capture
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const ARTIFACTS = "/opt/cursor/artifacts/screenshots/batch-a";

const PERSONAL_ROUTES = [
  "/home-insurance/",
  "/condo-insurance/",
  "/tenant-insurance/",
  "/landlord-insurance/",
  "/motorcycle-insurance/",
  "/boat-insurance/",
  "/cottage-insurance/",
  "/travel-insurance/",
  "/mobile-home-insurance/",
  "/personal-umbrella-insurance/",
  "/home-sharing-insurance/",
  "/life-insurance/",
  "/group-home-auto-insurance/",
];

const REGRESSION_ROUTES = [
  "/",
  "/auto-insurance/",
  "/trucking-insurance/",
  "/claims/",
  "/get-a-quote/",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function slugFromRoute(route) {
  return route.replace(/^\/|\/$/g, "");
}

async function checkRoute(page, route) {
  const url = `${BASE}${route.startsWith("/") ? route : `/${route}`}`;
  const response = await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  const status = response?.status() ?? 0;

  const overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return el.scrollWidth > el.clientWidth + 1;
  });

  const brokerBtnVisible = await page.evaluate(() => {
    const btn = document.querySelector(".pilot-product-final-broker-btn");
    if (!btn) return null;
    const style = window.getComputedStyle(btn);
    const rect = btn.getBoundingClientRect();
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      parseFloat(style.opacity) > 0.1 &&
      rect.width > 0 &&
      rect.height > 0
    );
  });

  const hasHero = await page.evaluate(() =>
    Boolean(document.querySelector(".pilot-product-hero")),
  );
  const hasExplorer = await page.evaluate(() =>
    Boolean(document.querySelector(".pilot-product-explorer-stage")),
  );

  return { route, status, overflow, brokerBtnVisible, hasHero, hasExplorer, url };
}

async function fullPageShot(page, route, viewport) {
  const slug = slugFromRoute(route);
  const dir = path.join(ARTIFACTS, slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${viewport.name}_${viewport.width}.png`);
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(`${BASE}${route.startsWith("/") ? route : `/${route}`}`, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: file, fullPage: true });
  return file;
}

async function main() {
  fs.mkdirSync(ARTIFACTS, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const results = [];

  for (const route of [...PERSONAL_ROUTES, ...REGRESSION_ROUTES]) {
    try {
      const check = await checkRoute(page, route);
      results.push(check);
      console.log(`${check.status === 200 ? "OK" : "FAIL"} ${route} status=${check.status}`);
    } catch (err) {
      results.push({ route, status: 0, error: String(err) });
      console.log(`ERR ${route}: ${err.message}`);
    }
  }

  for (const route of PERSONAL_ROUTES) {
    for (const vp of VIEWPORTS) {
      try {
        const file = await fullPageShot(page, route, vp);
        console.log(`SHOT ${file}`);
      } catch (err) {
        console.log(`SHOT ERR ${route} ${vp.name}: ${err.message}`);
      }
    }
  }

  await browser.close();

  const report = {
    base: BASE,
    timestamp: new Date().toISOString(),
    results,
    personalRoutes: PERSONAL_ROUTES.length,
    screenshotsDir: ARTIFACTS,
  };
  fs.writeFileSync(
    path.join(ARTIFACTS, "validation-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));

  const failures = results.filter((r) => r.status !== 200);
  if (failures.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
