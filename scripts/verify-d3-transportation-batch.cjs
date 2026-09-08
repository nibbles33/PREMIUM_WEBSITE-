#!/usr/bin/env node
/** D3 Transportation batch verification — trucking, dump-truck, cargo-freight */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/d3-transportation-batch-2026-09-08");

const ROUTES = [
  {
    slug: "trucking-insurance",
    tabs: ["cargo-insurance", "liability-coverage", "physical-damage", "cross-border-coverage"],
    detailTitles: [
      "Shippers' freight is a separate exposure from your tractor on the highway",
      "Highway liability is regulated automobile coverage — not cargo or CGL",
      "Tractors and trailers are scheduled values — trailers are not automatic",
      "U.S. lanes change territory, limits, and filings — not a generic add-on label",
    ],
    heroSnippet: "Motor carriers and for-hire trucking",
    trustSnippet: "Windsor–Essex motor carriers",
    considerationCount: 7,
    faqCount: 5,
    forbidden: [
      "Liability covers injury and damage to others; cargo is about the freight itself",
      "CVOR is insurance",
    ],
  },
  {
    slug: "dump-truck-insurance",
    tabs: [
      "commercial-auto-liability",
      "physical-damage",
      "cargo-debris-coverage",
      "non-trucking-liability",
    ],
    detailTitles: [
      "On the highway is automobile liability — jobsites may be different",
      "Heavy units, bodies, and hydraulics drive values and deductibles",
      "Own material hauling is not the same as for-hire freight",
      "Bobtail and non-dispatched use need explicit lease review",
    ],
    heroSnippet: "construction-site and material-handling",
    trustSnippet: "Windsor–Essex dump truck operators",
    considerationCount: 6,
    faqCount: 5,
    forbidden: [
      "Liability covers damage to others; cargo addresses the material you're hauling",
    ],
  },
  {
    slug: "cargo-freight-insurance",
    tabs: ["motor-truck-cargo", "carrier-liability", "refrigerated-cargo", "contingent-cargo"],
    detailTitles: [
      "Customers' goods in the trailer — not the tractor's highway liability",
      "Legal responsibility to the shipper is not the same as insuring the goods directly",
      "Reefer freight needs cause-of-loss precision — not automatic spoilage coverage",
      "Brokers need a backup layer — not a substitute for carrier coverage",
    ],
    heroSnippet: "goods in transit",
    trustSnippet: "Windsor–Essex motor carriers",
    considerationCount: 7,
    faqCount: 5,
    forbidden: [
      "Cargo insurance addresses the goods themselves; liability covers damage to others",
      "Liability covers injury and damage to others; cargo is a separate coverage",
      "Covers loss or damage to freight",
    ],
  },
];

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

async function scrollToExplorer(page) {
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));
}

async function getExplorerState(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".pilot-product-explorer-stage");
    const activeTab = document.querySelector(".pilot-product-coverage-card.is-active");
    const tabDesc = activeTab?.querySelector(".text-secondary, .text-\\[13px\\]")?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img = document.querySelector(".pilot-ce-scene-interactive-master-image");
    return {
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(img),
    };
  });
}

async function verifyRoute(page, route, routeOut) {
  const result = { slug: route.slug, explorer: [], pass: false };
  fs.mkdirSync(routeOut, { recursive: true });

  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await scrollToExplorer(page);

  for (let i = 0; i < route.tabs.length; i++) {
    await page.click(`[id$="-tab-${route.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    const state = await getExplorerState(page);
    result.explorer.push({ index: i, id: route.tabs[i], ...state });
  }

  result.trustBand = await page.evaluate(
    (snippets) => {
      const hero = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
      const trust = [...document.querySelectorAll("main section p")].find((p) =>
        p.textContent?.includes("reviewed through an independent broker"),
      )?.textContent?.trim();
      return {
        heroPresent: Boolean(hero?.includes(snippets.heroSnippet)),
        trustPresent: Boolean(trust?.includes(snippets.trustSnippet)),
        distinct: hero !== trust,
      };
    },
    { heroSnippet: route.heroSnippet, trustSnippet: route.trustSnippet },
  );

  await page.evaluate(() =>
    document.getElementById("pilot-product-considerations-heading")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 300));

  result.considerations = await page.evaluate(() => ({
    count: document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    ).length,
  }));

  const buttons = await page.$$(
    'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
  );
  if (buttons.length >= 2) {
    await buttons[1].click();
    await new Promise((r) => setTimeout(r, 400));
    result.considerations.oneOpenAtATime =
      (await page.evaluate(() =>
        document.querySelectorAll(
          'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
        ).length,
      )) === 1;
  }

  result.faqCount = await page.evaluate(() => document.querySelectorAll(".pilot-auto-faq-trigger").length);
  const bodyText = await page.evaluate(() => document.body.innerText);
  result.forbidden = route.forbidden.filter((p) => bodyText.includes(p));

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile ?? false });
    await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
    await scrollToExplorer(page);
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({ path: path.join(routeOut, `explorer_${vp.name}.png`), fullPage: false });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await scrollToExplorer(page);
  for (let i = 0; i < route.tabs.length; i++) {
    await page.click(`[id$="-tab-${route.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(routeOut, `explorer_state-${i}_${route.tabs[i]}_1440.png`),
      fullPage: false,
    });
  }

  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-hero", { timeout: 30000 });
  await page.screenshot({ path: path.join(routeOut, "hero_1440.png"), fullPage: false });

  result.pass =
    result.explorer.length === 4 &&
    result.explorer.every((s, i) => s.detailTitle === route.detailTitles[i] && !s.duplicateDesc && s.hasImage) &&
    result.trustBand.distinct &&
    result.trustBand.heroPresent &&
    result.trustBand.trustPresent &&
    result.considerations.count === route.considerationCount &&
    result.faqCount === route.faqCount &&
    result.forbidden.length === 0 &&
    VIEWPORTS.every((vp) => result[`overflow_${vp.name}`] === 0);

  fs.writeFileSync(path.join(routeOut, "verification-route.json"), JSON.stringify(result, null, 2));
  return result;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  const routes = [];
  for (const route of ROUTES) {
    routes.push(await verifyRoute(page, route, path.join(OUT, route.slug)));
  }

  const payload = {
    consoleErrors,
    routes,
    pass: consoleErrors.length === 0 && routes.every((r) => r.pass),
  };
  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload, null, 2));
  await browser.close();
  process.exit(payload.pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
