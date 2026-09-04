#!/usr/bin/env node
/** Runtime verification for coverage explorer visual states. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3000";

const ROUTES = [
  { route: "/auto-insurance/", stageClass: "pilot-auto-coverage-stage", tabClass: "pilot-auto-coverage-card" },
  { route: "/home-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/boat-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/restaurant-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/garage-dealership-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/trucking-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
  { route: "/greenhouse-agribusiness-insurance/", stageClass: "pilot-ce-stage", tabClass: "pilot-product-coverage-card" },
];

async function verifyRoute(page, { route, stageClass, tabClass }) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 60000 });

  const errors = [];
  const stage = await page.$(`.${stageClass}`);
  if (!stage) {
    return { route, ok: false, errors: ["missing-stage"], states: 0 };
  }

  const tabs = await page.$$(`.${tabClass}`);
  const stateResults = [];

  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 350));

    const result = await page.evaluate((sc) => {
      const activeZones = document.querySelectorAll(".pilot-ce-zone.is-active, .pilot-auto-coverage-scene");
      const panel = document.querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage");
      const detail = panel?.querySelector("h3")?.textContent?.trim();
      const brokenImages = Array.from(document.querySelectorAll("img")).filter(
        (img) => img.complete && img.naturalWidth === 0 && img.src && !img.src.includes("data:"),
      );
      return {
        activeZoneCount: activeZones.length,
        detail,
        brokenImages: brokenImages.map((img) => img.src),
        sceneData: document.querySelector(".pilot-ce-stage-frame")?.getAttribute("data-scene"),
      };
    }, stageClass);

    if (result.brokenImages.length) {
      errors.push(`state-${i}: broken images ${result.brokenImages.join(", ")}`);
    }
    stateResults.push(result);
  }

  return {
    route,
    ok: errors.length === 0 && tabs.length > 0,
    states: tabs.length,
    errors,
    stateResults,
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
