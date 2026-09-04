#!/usr/bin/env node
/** Runtime verification for coverage explorer visual states. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3000";

const ROUTES = [
  { route: "/auto-insurance/", stageClass: "pilot-auto-coverage-stage", tabClass: "pilot-auto-coverage-card", expectCutaway: false },
  { route: "/home-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-house" },
  { route: "/boat-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/restaurant-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-restaurant", tabIndex: 2 },
  { route: "/garage-dealership-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/trucking-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/greenhouse-agribusiness-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/commercial-property-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-commercial-building" },
  { route: "/contractors-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-construction-site" },
  { route: "/manufacturing-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-factory" },
  { route: "/farm-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-farm" },
  { route: "/commercial-auto-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-work-truck-fleet" },
  { route: "/retail-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card", expectImage: "premium-retail-store" },
];

async function verifyRoute(page, config) {
  await page.goto(`${BASE}${config.route}`, { waitUntil: "networkidle2", timeout: 60000 });

  const errors = [];
  const stage = await page.$(`.${config.stageClass}`);
  if (!stage) {
    return { route: config.route, ok: false, errors: ["missing-stage"], states: 0 };
  }

  const tabs = await page.$$(`.${config.tabClass}`);
  const tabIndex = config.tabIndex ?? 0;
  if (tabs[tabIndex]) {
    await tabs[tabIndex].click();
    await new Promise((r) => setTimeout(r, 350));
  }

  if (config.expectImage) {
    const hasImage = await page.evaluate((needle) => {
      return Array.from(document.querySelectorAll("img")).some((img) =>
        img.src.includes(needle),
      );
    }, config.expectImage);
    if (!hasImage) errors.push(`missing-image:${config.expectImage}`);
  }

  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 300));

    const result = await page.evaluate(() => {
      const activeZones = document.querySelectorAll(".pilot-ce-zone.is-active");
      const brokenImages = Array.from(document.querySelectorAll("img")).filter(
        (img) => img.complete && img.naturalWidth === 0 && img.src && !img.src.includes("data:"),
      );
      return {
        activeZoneCount: activeZones.length,
        brokenImages: brokenImages.map((img) => img.src),
      };
    });

    if (result.brokenImages.length) {
      errors.push(`state-${i}: broken images ${result.brokenImages.join(", ")}`);
    }
    if (result.activeZoneCount === 0 && config.stageClass === "pilot-ce-stage") {
      errors.push(`state-${i}: no active zones`);
    }
  }

  return {
    route: config.route,
    ok: errors.length === 0 && tabs.length > 0,
    states: tabs.length,
    errors,
  };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  let allOk = true;
  for (const config of ROUTES) {
    const result = await verifyRoute(page, config);
    console.log(`${result.ok ? "OK" : "FAIL"} ${config.route} (${result.states} states)`);
    if (!result.ok) {
      allOk = false;
      console.log(JSON.stringify(result.errors, null, 2));
    }
  }

  if (consoleErrors.length) {
    console.log("Console errors:", consoleErrors.slice(0, 10));
    allOk = false;
  }

  await browser.close();
  process.exit(allOk ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
