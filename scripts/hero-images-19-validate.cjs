#!/usr/bin/env node
/**
 * Validates 19 hero image wiring — dedicated assets, no fallback.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ROUTES = [
  { route: "/garage-dealership-insurance/", expected: "garage-dealership-insurance.webp" },
  { route: "/builders-risk-insurance/", expected: "builders-risk-insurance.webp" },
  { route: "/cargo-freight-insurance/", expected: "cargo-freight-insurance.webp" },
  { route: "/condominium-corporation-insurance/", expected: "condo-property-management.webp" },
  { route: "/property-management-insurance/", expected: "condo-property-management.webp" },
  { route: "/convenience-store-insurance/", expected: "convenience-store-insurance.webp" },
  { route: "/daycare-private-school-insurance/", expected: "daycare-private-school-insurance.webp" },
  { route: "/grocery-specialty-food-insurance/", expected: "grocery-specialty-food-insurance.webp" },
  { route: "/group-home-auto-insurance/", expected: "group-home-auto-insurance.webp" },
  { route: "/fitness-gym-insurance/", expected: "fitness-gym-insurance.webp" },
  { route: "/hotel-motel-insurance/", expected: "hotel-motel-insurance.webp" },
  { route: "/landscaping-snow-removal-insurance/", expected: "landscaping-snow-removal-insurance.webp" },
  { route: "/life-insurance/", expected: "life-insurance.webp" },
  { route: "/medical-dental-insurance/", expected: "medical-dental-insurance.webp" },
  { route: "/mobile-home-insurance/", expected: "mobile-home-insurance.webp" },
  { route: "/personal-umbrella-insurance/", expected: "personal-umbrella-insurance.webp" },
  { route: "/pharmacy-insurance/", expected: "pharmacy-insurance.webp" },
  { route: "/religious-organizations-insurance/", expected: "religious-organizations-insurance.webp" },
  { route: "/salon-barber-insurance/", expected: "salon-barber-insurance.webp" },
  { route: "/warehousing-insurance/", expected: "warehousing-insurance.webp" },
];

const SCREENSHOT_ROUTES = [
  "/daycare-private-school-insurance/",
  "/personal-umbrella-insurance/",
  "/life-insurance/",
];

const PORT = 3015;
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/hero-images-19");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const results = [];
  for (const { route, expected } of ROUTES) {
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-product-hero img, .pilot-product-hero-image", { timeout: 15000 }).catch(() => {});

    const heroSrc = await page.evaluate(() => {
      const img = document.querySelector(".pilot-product-hero-photo img");
      if (!img) return null;
      const src = img.getAttribute("src") || "";
      if (src.includes("/_next/image")) {
        const u = new URL(src, window.location.origin);
        return decodeURIComponent(u.searchParams.get("url") || "");
      }
      return src;
    });

    const usesFallback = heroSrc?.includes("/commercial-insurance.webp") || false;
    const oldReusePatterns = [
      "/landlord.webp",
      "/home-insurance.webp",
      "/contact.webp",
      "/team.webp",
    ];
    const usesOldReuse = oldReusePatterns.some((p) => heroSrc?.endsWith(p));
    const hasExpected = heroSrc?.includes(expected) || false;

    results.push({
      route,
      expected,
      status: res?.status() ?? 0,
      heroSrc: heroSrc || null,
      ok: res?.status() === 200 && hasExpected && !usesFallback && !usesOldReuse,
      usesFallback,
      usesOldReuse,
    });

    if (SCREENSHOT_ROUTES.includes(route)) {
      for (const [label, width, height] of [
        ["desktop_1440", 1440, 900],
        ["mobile_390", 390, 844],
      ]) {
        await page.setViewport({ width, height });
        await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
        await page.waitForSelector(".pilot-product-hero", { timeout: 15000 });
        const slug = route.replace(/\//g, "").replace(/-insurance$/, "-insurance");
        const dir = path.join(OUT_DIR, route.replace(/^\/|\/$/g, ""));
        fs.mkdirSync(dir, { recursive: true });
        await page.screenshot({ path: path.join(dir, `${label}.png`), fullPage: false });
      }
    }

    await page.close();
  }

  // Homepage + auto regression
  const regression = [];
  for (const route of ["/", "/auto-insurance/"]) {
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
    regression.push({ route, status: res?.status() ?? 0 });
    await page.close();
  }

  await browser.close();

  const report = {
    timestamp: new Date().toISOString(),
    base: BASE,
    routes: results,
    allOk: results.every((r) => r.ok),
    regression,
  };

  fs.writeFileSync(path.join(OUT_DIR, "validation-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ allOk: report.allOk, failed: results.filter((r) => !r.ok) }, null, 2));
  process.exit(report.allOk ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
