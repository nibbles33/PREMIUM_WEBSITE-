#!/usr/bin/env node
/**
 * Batch C/D route validation + screenshot capture
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const ARTIFACTS = path.join(__dirname, "../docs/qa-screenshots/batch-cd");

const BATCH_CD_ROUTES = [
  "/farm-insurance/",
  "/food-truck-insurance/",
  "/trucking-insurance/",
  "/commercial-auto-insurance/",
  "/dump-truck-insurance/",
];

const REGRESSION_ROUTES = [
  "/",
  "/auto-insurance/",
  "/commercial-insurance/",
  "/contractors-insurance/",
  "/claims/",
  "/get-a-quote/",
];

const COVERAGE_VERIFY_ROUTES = [
  "/farm-insurance/",
  "/food-truck-insurance/",
  "/trucking-insurance/",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function slugFromRoute(route) {
  return route.replace(/^\/|\/$/g, "");
}

async function waitForPilotPage(page, route) {
  await page.goto(`${BASE}${route.startsWith("/") ? route : `/${route}`}`, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await page.waitForSelector(".pilot-product-hero, .pilot-product-explorer-stage", {
    timeout: 30000,
  });
  await new Promise((r) => setTimeout(r, 600));
}

async function checkRoute(page, route) {
  await waitForPilotPage(page, route);

  const overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return el.scrollWidth > el.clientWidth + 1;
  });

  const heroPresent = await page.evaluate(() => {
    const heroSection = document.querySelector(".pilot-product-hero");
    const heroPhoto = document.querySelector(".pilot-product-hero-photo img");
    return {
      hasHero: Boolean(heroSection),
      hasHeroPhoto: Boolean(heroPhoto && heroPhoto.getAttribute("src")),
    };
  });

  const hasExplorer = await page.evaluate(() =>
    Boolean(document.querySelector(".pilot-product-explorer-stage")),
  );

  return {
    route,
    status: 200,
    overflow,
    hasHero: heroPresent.hasHero,
    hasHeroPhoto: heroPresent.hasHeroPhoto,
    hasExplorer,
    url: `${BASE}${route.startsWith("/") ? route : `/${route}`}`,
  };
}

async function checkRegressionRoute(page, route) {
  const url = `${BASE}${route.startsWith("/") ? route : `/${route}`}`;
  const response = await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  return {
    route,
    status: response?.status() ?? 0,
    url,
  };
}

async function verifyCoverageNoDuplication(page, route) {
  await waitForPilotPage(page, route);
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
  return { route, ok: failed.length === 0, states: results.length, failed };
}

async function fullPageShot(page, route, viewport) {
  const slug = slugFromRoute(route);
  const dir = path.join(ARTIFACTS, slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${viewport.name}_${viewport.width}.png`);
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await waitForPilotPage(page, route);
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

  for (const route of BATCH_CD_ROUTES) {
    try {
      const check = await checkRoute(page, route);
      results.push(check);
      console.log(`${check.status === 200 ? "OK" : "FAIL"} ${route} status=${check.status}`);
    } catch (err) {
      results.push({ route, status: 0, error: String(err) });
      console.log(`ERR ${route}: ${err.message}`);
    }
  }

  for (const route of REGRESSION_ROUTES) {
    try {
      const check = await checkRegressionRoute(page, route);
      results.push(check);
      console.log(`${check.status === 200 ? "OK" : "FAIL"} ${route} status=${check.status}`);
    } catch (err) {
      results.push({ route, status: 0, error: String(err) });
      console.log(`ERR ${route}: ${err.message}`);
    }
  }

  const coverageTests = [];
  for (const route of COVERAGE_VERIFY_ROUTES) {
    try {
      const test = await verifyCoverageNoDuplication(page, route);
      coverageTests.push(test);
      console.log(`COVERAGE ${test.ok ? "OK" : "FAIL"} ${route}`);
    } catch (err) {
      coverageTests.push({ route, ok: false, error: String(err) });
    }
  }

  for (const route of BATCH_CD_ROUTES) {
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
    coverageTests,
    batchCDRoutes: BATCH_CD_ROUTES.length,
    screenshotsDir: ARTIFACTS,
  };
  fs.writeFileSync(
    path.join(ARTIFACTS, "validation-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));

  const batchResults = results.filter((r) => BATCH_CD_ROUTES.includes(r.route));
  const failures = batchResults.filter((r) => r.status !== 200);
  const missingHeroPhotos = batchResults.filter((r) => !r.hasHeroPhoto).map((r) => r.route);
  const coverageFailures = coverageTests.filter((r) => !r.ok);

  if (missingHeroPhotos.length) {
    console.error("Missing hero photos:", missingHeroPhotos.join(", "));
    process.exit(1);
  }
  if (coverageFailures.length) {
    console.error("Coverage duplication failures:", coverageFailures);
    process.exit(1);
  }
  if (failures.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
