#!/usr/bin/env node
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/site-integration-final-7402");

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1280", width: 1280, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "768", width: 768, height: 1024, isMobile: true },
  { name: "390", width: 390, height: 844, isMobile: true },
];

async function auditHomepage(page, vp) {
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  return page.evaluate(() => {
    const doc = document.documentElement;
    const hOverflow = doc.scrollWidth > doc.clientWidth + 1;
    return {
      hero: Boolean(document.querySelector(".pilot-hero-immersive img")),
      heroCtaQuote: Boolean(document.querySelector('a[href*="get-a-quote"]')),
      heroCtaBroker: Boolean(document.querySelector('a[href*="talk-to-a-broker"]')),
      carrierRail: Boolean(document.querySelector(".pilot-carrier-rail")),
      carrierItems: document.querySelectorAll(".pilot-carrier-rail li, .pilot-carrier-rail img").length,
      filmstripLinks: document.querySelectorAll("a.pilot-filmstrip-frame").length,
      commercialDiscovery: Boolean(document.querySelector(".pilot-commercial-panel")),
      yepTiles: document.querySelectorAll("a.pilot-yep-tile").length,
      awardsRail: Boolean(document.querySelector(".pilot-infinite-rail")),
      finalCtaBroker: Boolean(document.querySelector(".pilot-final-cta a[href*='talk-to-a-broker'], .pilot-final-cta a[href*='broker']")),
      horizontalOverflow: hOverflow,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
    };
  });
}

async function auditResponsiveSample(page, vp) {
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
  const routes = ["/", "/cyber-insurance/", "/auto-insurance/", "/restaurant-insurance/"];
  const out = [];
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 600));
    const d = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    out.push({ route, ...d });
  }
  return out;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });

  const homepage = [];
  for (const vp of VIEWPORTS) homepage.push({ viewport: vp.name, ...(await auditHomepage(page, vp)) });

  const responsive = [];
  for (const vp of VIEWPORTS) responsive.push({ viewport: vp.name, routes: await auditResponsiveSample(page, vp) });

  await browser.close();

  const result = {
    homepage,
    responsive,
    consoleErrors: [...new Set(consoleErrors)],
    summary: {
      homepagePass: homepage.every((h) => h.hero && h.carrierRail && h.filmstripLinks > 0 && h.commercialDiscovery && h.yepTiles > 0),
      overflowFails: responsive.flatMap((v) => v.routes.filter((r) => r.overflow).map((r) => `${r.route}@${v.viewport}`)),
    },
  };
  fs.writeFileSync(path.join(OUT, "homepage-responsive-audit.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result.summary, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
