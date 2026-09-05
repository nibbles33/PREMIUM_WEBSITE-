#!/usr/bin/env node
/** Final wiring verification — 58-route interactive master Coverage Explorer. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3000";

const ALIAS_ROUTES = [
  { route: "/bonding-insurance/", expectFile: "bonding-surety-interactive-master" },
  { route: "/commercial-auto-insurance/", expectFile: "commercial-auto-fleet-interactive-master" },
  { route: "/commercial-insurance/", expectFile: "commercial-insurance-hub-interactive-master", skipTabs: true },
  { route: "/convenience-store-insurance/", expectFile: "convenience-store-gas-station-insurance-interactive-master" },
  { route: "/food-truck-insurance/", expectFile: "food-truck-trailer-insurance-interactive-master" },
  { route: "/greenhouse-agribusiness-insurance/", expectFile: "greenhouse-insurance-interactive-master" },
  { route: "/grocery-specialty-food-insurance/", expectFile: "grocery-specialty-food-bakery-insurance-interactive-master" },
  { route: "/professional-liability-insurance/", expectFile: "professional-liability-eo-interactive-master" },
  { route: "/employment-practices-liability-insurance/", expectFile: "employment-practices-liability-interactive-master" },
  { route: "/pollution-liability-insurance/", expectFile: "pollution-liability-interactive-master" },
];

const SAMPLE_ROUTES = [
  { route: "/auto-insurance/", tabClass: "pilot-auto-coverage-card", expectFile: "auto-insurance-interactive-master", rejectFiles: ["premium-miniature-car", "premium-work-truck"] },
  { route: "/home-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/condo-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/restaurant-insurance/", tabClass: "pilot-product-coverage-card", tabIndex: 2 },
  { route: "/trucking-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/farm-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/daycare-private-school-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/fitness-gym-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/non-profit-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/salon-barber-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/cyber-insurance/", tabClass: "pilot-product-coverage-card" },
  { route: "/religious-organizations-insurance/", tabClass: "pilot-product-coverage-card" },
];

async function verifyRoute(page, config) {
  await page.goto(`${BASE}${config.route}`, { waitUntil: "networkidle2", timeout: 60000 });
  const errors = [];

  const hasInteractiveMaster = await page.evaluate(() =>
    Boolean(document.querySelector(".pilot-ce-scene-interactive-master-image")),
  );
  const isIconFallback = await page.evaluate(() =>
    Boolean(document.querySelector(".pilot-product-coverage-stage--icon-only")),
  );

  if (config.skipTabs) {
    if (hasInteractiveMaster) errors.push("hub-should-not-show-explorer");
    return { route: config.route, ok: errors.length === 0, errors, states: 0 };
  }

  if (isIconFallback) errors.push("icon-fallback-active");
  if (!hasInteractiveMaster) errors.push("missing-interactive-master");

  if (config.expectFile) {
    const hasExpected = await page.evaluate(
      (needle) => Array.from(document.querySelectorAll("img")).some((img) => img.src.includes(needle)),
      config.expectFile,
    );
    if (!hasExpected) errors.push(`missing-expected-image:${config.expectFile}`);
  }

  if (config.rejectFiles) {
    for (const reject of config.rejectFiles) {
      const hasRejected = await page.evaluate(
        (needle) => Array.from(document.querySelectorAll("img")).some((img) => img.src.includes(needle)),
        reject,
      );
      if (hasRejected) errors.push(`rejected-image-present:${reject}`);
    }
  }

  const tabs = await page.$$(`.${config.tabClass}`);
  if (tabs.length === 0) {
    errors.push("no-coverage-tabs");
    return { route: config.route, ok: false, errors, states: 0 };
  }

  const firstTitle = await page.evaluate(() => {
    const h3 = document.querySelector(".pilot-auto-explorer-stage h3, .pilot-product-explorer-stage h3");
    return h3?.textContent?.trim() ?? "";
  });

  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 400));

    const result = await page.evaluate(() => {
      const activeSvgZones = document.querySelectorAll(".pilot-ce-svg-zone.is-active");
      const activeRectZones = document.querySelectorAll(".pilot-ce-zone.is-active");
      const brokenImages = Array.from(document.querySelectorAll("img")).filter(
        (img) => img.complete && img.naturalWidth === 0 && img.src && !img.src.includes("data:"),
      );
      const title = document.querySelector(".pilot-auto-explorer-stage h3, .pilot-product-explorer-stage h3")?.textContent?.trim() ?? "";
      return {
        activeZoneCount: activeSvgZones.length + activeRectZones.length,
        brokenImages: brokenImages.map((img) => img.src),
        title,
      };
    });

    if (result.brokenImages.length) {
      errors.push(`state-${i}: broken-images`);
    }
    if (result.activeZoneCount === 0) {
      errors.push(`state-${i}: no-active-zones`);
    }
    if (i > 0 && result.title === firstTitle) {
      errors.push(`state-${i}: text-unchanged`);
    }
  }

  return { route: config.route, ok: errors.length === 0, errors, states: tabs.length };
}

async function verifyReducedMotion(page) {
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}/home-insurance/`, { waitUntil: "networkidle2", timeout: 60000 });
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[1]) await tabs[1].click();
  await new Promise((r) => setTimeout(r, 400));

  return page.evaluate(() => {
    const pulse = document.querySelector(".pilot-ce-svg-zone.is-active.pilot-ce-svg-zone--pulse");
    const style = pulse ? getComputedStyle(pulse) : null;
    const activeZones = document.querySelectorAll(".pilot-ce-svg-zone.is-active").length;
    const title = document.querySelector(".pilot-product-explorer-stage h3")?.textContent?.trim();
    return {
      ok: activeZones > 0 && Boolean(title) && (!style || style.animationName === "none"),
      activeZones,
      title,
      animationName: style?.animationName,
    };
  });
}

async function verifyMobileOverflow(page) {
  await page.setViewport({ width: 390, height: 844 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.goto(`${BASE}/auto-insurance/`, { waitUntil: "networkidle2", timeout: 60000 });
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hasMaster: Boolean(document.querySelector(".pilot-ce-scene-interactive-master-image")),
  }));
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

  console.log("=== Alias routes ===");
  for (const config of ALIAS_ROUTES) {
    const result = await verifyRoute(page, { ...config, tabClass: "pilot-product-coverage-card" });
    console.log(`${result.ok ? "OK" : "FAIL"} ${config.route}`);
    if (!result.ok) {
      allOk = false;
      console.log(JSON.stringify(result.errors));
    }
  }

  console.log("\n=== Sample routes (10+ families) ===");
  for (const config of SAMPLE_ROUTES) {
    const result = await verifyRoute(page, config);
    console.log(`${result.ok ? "OK" : "FAIL"} ${config.route} (${result.states} states)`);
    if (!result.ok) {
      allOk = false;
      console.log(JSON.stringify(result.errors));
    }
  }

  console.log("\n=== Reduced motion ===");
  const rm = await verifyReducedMotion(page);
  console.log(rm.ok ? "OK reduced-motion" : "FAIL reduced-motion", JSON.stringify(rm));
  if (!rm.ok) allOk = false;

  console.log("\n=== Mobile 390px ===");
  const mobile = await verifyMobileOverflow(page);
  const mobileOk = mobile.hasMaster && mobile.scrollWidth <= mobile.clientWidth + 2;
  console.log(mobileOk ? "OK mobile" : "FAIL mobile", JSON.stringify(mobile));
  if (!mobileOk) allOk = false;

  if (consoleErrors.length) {
    console.log("\nConsole errors:", consoleErrors.slice(0, 10));
    allOk = false;
  }

  await browser.close();
  process.exit(allOk ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
