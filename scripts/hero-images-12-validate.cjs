#!/usr/bin/env node
/**
 * Validates final 12 hero image wiring — dedicated assets, no fallback.
 * Audits ALL commercial routes; only /commercial-insurance/ may use hub fallback.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const TOUCHED_ROUTES = [
  { route: "/directors-officers-insurance/", expected: "executive-leadership.webp" },
  { route: "/employment-practices-liability-insurance/", expected: "executive-leadership.webp" },
  { route: "/cyber-insurance/", expected: "cyber-insurance.webp" },
  { route: "/small-business-insurance/", expected: "small-business-insurance.webp" },
  { route: "/non-profit-insurance/", expected: "non-profit-insurance.webp" },
  { route: "/event-liability-insurance/", expected: "event-venue.webp" },
  { route: "/liquor-liability-insurance/", expected: "event-venue.webp" },
  { route: "/business-interruption-insurance/", expected: "business-interruption-insurance.webp" },
  { route: "/crime-fidelity-insurance/", expected: "crime-fidelity-insurance.webp" },
  { route: "/professional-liability-insurance/", expected: "professional-offices-insurance.webp" },
  { route: "/pollution-liability-insurance/", expected: "manufacturing-insurance.webp" },
  { route: "/product-recall-insurance/", expected: "manufacturing-insurance.webp" },
];

/** All pilot commercial product routes (Batch B + inline + C/D). */
const ALL_COMMERCIAL_ROUTES = [
  "/commercial-insurance/",
  "/small-business-insurance/",
  "/landscaping-snow-removal-insurance/",
  "/cyber-insurance/",
  "/directors-officers-insurance/",
  "/business-interruption-insurance/",
  "/professional-liability-insurance/",
  "/cargo-freight-insurance/",
  "/garage-dealership-insurance/",
  "/builders-risk-insurance/",
  "/warehousing-insurance/",
  "/property-management-insurance/",
  "/condominium-corporation-insurance/",
  "/pollution-liability-insurance/",
  "/product-recall-insurance/",
  "/hotel-motel-insurance/",
  "/convenience-store-insurance/",
  "/grocery-specialty-food-insurance/",
  "/medical-dental-insurance/",
  "/pharmacy-insurance/",
  "/fitness-gym-insurance/",
  "/salon-barber-insurance/",
  "/non-profit-insurance/",
  "/religious-organizations-insurance/",
  "/daycare-private-school-insurance/",
  "/event-liability-insurance/",
  "/liquor-liability-insurance/",
  "/crime-fidelity-insurance/",
  "/employment-practices-liability-insurance/",
  "/contractors-insurance/",
  "/manufacturing-insurance/",
  "/commercial-property-insurance/",
  "/restaurant-insurance/",
  "/professional-offices-insurance/",
  "/real-estate-insurance/",
  "/builders-developers-insurance/",
  "/retail-insurance/",
  "/farm-insurance/",
  "/food-truck-insurance/",
  "/trucking-insurance/",
  "/commercial-auto-insurance/",
  "/dump-truck-insurance/",
  "/greenhouse-agribusiness-insurance/",
  "/bonding-insurance/",
];

const SCREENSHOT_ROUTES = [
  "/directors-officers-insurance/",
  "/cyber-insurance/",
  "/non-profit-insurance/",
];

const PORT = process.env.PORT || 3017;
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/hero-images-12");

async function getHeroSrc(page) {
  return page.evaluate(() => {
    const img = document.querySelector(".pilot-product-hero-photo img");
    if (!img) return null;
    const src = img.getAttribute("src") || "";
    if (src.includes("/_next/image")) {
      const u = new URL(src, window.location.origin);
      return decodeURIComponent(u.searchParams.get("url") || "");
    }
    return src;
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const touchedResults = [];
  for (const { route, expected } of TOUCHED_ROUTES) {
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-product-hero", { timeout: 15000 }).catch(() => {});

    const heroSrc = await getHeroSrc(page);
    const usesFallback = heroSrc?.includes("/commercial-insurance.webp") || false;
    const hasExpected = heroSrc?.includes(expected) || false;

    touchedResults.push({
      route,
      expected,
      status: res?.status() ?? 0,
      heroSrc: heroSrc || null,
      ok: res?.status() === 200 && hasExpected && !usesFallback,
      usesFallback,
    });

    if (SCREENSHOT_ROUTES.includes(route)) {
      for (const [label, width, height] of [
        ["desktop_1440", 1440, 900],
        ["mobile_390", 390, 844],
      ]) {
        await page.setViewport({ width, height });
        await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
        await page.waitForSelector(".pilot-product-hero", { timeout: 15000 });
        const dir = path.join(OUT_DIR, route.replace(/^\/|\/$/g, ""));
        fs.mkdirSync(dir, { recursive: true });
        await page.screenshot({ path: path.join(dir, `${label}.png`), fullPage: false });
      }
    }

    await page.close();
  }

  const commercialAudit = [];
  for (const route of ALL_COMMERCIAL_ROUTES) {
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-product-hero, .pilot-commercial-hub-hero", { timeout: 15000 }).catch(() => {});

    const heroSrc = await getHeroSrc(page);
    const usesCommercialFallback = heroSrc?.includes("/commercial-insurance.webp") || false;
    const isHub = route === "/commercial-insurance/";
    const unintentionalFallback = usesCommercialFallback && !isHub;

    commercialAudit.push({
      route,
      status: res?.status() ?? 0,
      heroSrc: heroSrc || null,
      usesCommercialFallback,
      unintentionalFallback,
      ok: res?.status() === 200 && !unintentionalFallback,
    });

    await page.close();
  }

  const regression = [];
  for (const route of ["/", "/auto-insurance/"]) {
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
    regression.push({ route, status: res?.status() ?? 0, ok: res?.status() === 200 });
    await page.close();
  }

  await browser.close();

  const unintentionalFallbacks = commercialAudit.filter((r) => r.unintentionalFallback);
  const report = {
    timestamp: new Date().toISOString(),
    base: BASE,
    touchedRoutes: touchedResults,
    allTouchedOk: touchedResults.every((r) => r.ok),
    commercialAudit,
    zeroUnintentionalFallback: unintentionalFallbacks.length === 0,
    unintentionalFallbacks,
    sharedPairs: {
      executiveLeadership: touchedResults.filter((r) => r.expected === "executive-leadership.webp"),
      eventVenue: touchedResults.filter((r) => r.expected === "event-venue.webp"),
    },
    regression,
  };

  fs.writeFileSync(path.join(OUT_DIR, "validation-report.json"), JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      {
        allTouchedOk: report.allTouchedOk,
        zeroUnintentionalFallback: report.zeroUnintentionalFallback,
        failedTouched: touchedResults.filter((r) => !r.ok),
        unintentionalFallbacks,
      },
      null,
      2,
    ),
  );
  process.exit(report.allTouchedOk && report.zeroUnintentionalFallback ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
