#!/usr/bin/env node
/** D2 Batch 2 verification — Salon/Barber, Non-Profit, Warehousing, Property Management. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/d2-batch-2-2026-09-08");

const ROUTES = [
  {
    slug: "salon-barber-insurance",
    tabs: ["general-liability", "professional-treatment-liability", "commercial-property", "product-liability"],
    detailTitles: [
      "When a wet floor in reception becomes a premises claim",
      "A colour reaction is a professional claim, not a slip-and-fall",
      "Stations, tools, and retail inventory add up quickly",
      "Retail product claims are separate from a bad haircut",
    ],
    heroSnippet: "two different exposure types",
    trustSnippet: "Windsor–Essex hair salons",
    considerationCount: 6,
    faqCount: 5,
    forbidden: ["Covers claims that retail products", "Covers slip-and-fall"],
  },
  {
    slug: "non-profit-insurance",
    tabs: ["general-liability", "directors-officers", "commercial-property", "volunteer-accident"],
    detailTitles: [
      "When a program participant injury becomes an organization claim",
      "Board decisions can generate claims separate from program injury",
      "Donated goods and program equipment still have insurable value",
      "Volunteer injury is not always the same as employee WSIB coverage",
    ],
    heroSnippet: "program delivery, volunteer involvement",
    trustSnippet: "Windsor–Essex charities",
    considerationCount: 6,
    faqCount: 5,
    forbidden: ["Covers injury and property damage claims at events"],
  },
  {
    slug: "warehousing-insurance",
    tabs: ["commercial-property", "warehouse-legal-liability", "general-liability", "business-interruption"],
    detailTitles: [
      "Your building and forklifts are not the same as customers' inventory",
      "Storage contracts define what you owe when customers' goods are damaged",
      "A loading-dock injury is premises liability, not a bailee claim",
      "A fire that closes the dock interrupts revenue and customer obligations",
    ],
    heroSnippet: "three exposures that standard business insurance",
    trustSnippet: "Windsor–Essex warehouse operators",
    considerationCount: 6,
    faqCount: 5,
    forbidden: ["Covers the warehouse structure, racking, forklifts"],
  },
  {
    slug: "property-management-insurance",
    tabs: ["general-liability", "property-management-e-o", "commercial-property", "hired-non-owned-auto"],
    detailTitles: [
      "A visitor injury at a managed building can implicate the manager",
      "A tenant dispute about maintenance can become a professional claim",
      "Your office equipment is not the same as the buildings you manage",
      "Driving to a managed property in a personal vehicle is a business exposure",
    ],
    heroSnippet: "not insurance on the buildings themselves",
    trustSnippet: "Windsor–Essex property management firms",
    considerationCount: 6,
    faqCount: 5,
    forbidden: ["Covers injury and property damage claims arising from managed properties", "Covers managers and staff driving"],
  },
];

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
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
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

async function verifyRoute(page, route, routeOut) {
  const result = { slug: route.slug, explorer: [], pass: false };
  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollToExplorer(page);

  for (let i = 0; i < route.tabs.length; i++) {
    await page.click(`[id$="-tab-${route.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    const state = await getExplorerState(page);
    result.explorer.push({ index: i, id: route.tabs[i], ...state });
  }

  result.trustBand = await page.evaluate((snippets) => {
    const hero = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
    const trust = [...document.querySelectorAll("main section p")].find((p) =>
      p.textContent?.includes("reviewed through an independent broker"),
    )?.textContent?.trim();
    return {
      heroPresent: Boolean(hero?.includes(snippets.heroSnippet)),
      trustPresent: Boolean(trust?.includes(snippets.trustSnippet)),
      distinct: hero !== trust,
    };
  }, { heroSnippet: route.heroSnippet, trustSnippet: route.trustSnippet });

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
    await buttons[0].evaluate((el) => el.click());
    await new Promise((r) => setTimeout(r, 300));
    await buttons[1].evaluate((el) => el.click());
    await new Promise((r) => setTimeout(r, 300));
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
    await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await scrollToExplorer(page);
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({ path: path.join(routeOut, `explorer_${vp.name}.png`), fullPage: false });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await page.screenshot({ path: path.join(routeOut, "hero_1440.png"), fullPage: false });

  result.pass =
    result.explorer.length === 4 &&
    result.explorer.every((s, i) => s.detailTitle === route.detailTitles[i] && !s.duplicateDesc && s.hasImage) &&
    result.trustBand.distinct &&
    result.considerations.count === route.considerationCount &&
    result.faqCount === route.faqCount &&
    result.forbidden.length === 0 &&
    result.overflow_390 === 0 &&
    result.overflow_1440 === 0;

  fs.writeFileSync(path.join(routeOut, "verification.json"), JSON.stringify(result, null, 2));
  return result;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  const results = { consoleErrors, routes: [], pass: false };
  for (const route of ROUTES) {
    const routeOut = path.join(OUT, route.slug);
    fs.mkdirSync(routeOut, { recursive: true });
    results.routes.push(await verifyRoute(page, route, routeOut));
  }

  results.pass = consoleErrors.length === 0 && results.routes.every((r) => r.pass);
  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
  process.exit(results.pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
