#!/usr/bin/env node
/** Grade C Batch E — manufacturing / commercial hub verification */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/grade-c-batch-e-2026-09-09");

const MANUFACTURING = {
  slug: "manufacturing-insurance",
  tabs: [
    "product-liability",
    "commercial-property",
    "business-interruption",
    "equipment-breakdown",
    "machine-shop-tool-die",
  ],
  detailTitles: [
    "A defective part can follow your product long after it leaves the dock",
    "Your landlord's policy doesn't cover your CNC line",
    "Rent and payroll don't pause when the line stops",
    "Fire insurance and breakdown insurance respond to different failures",
    "Custom work-in-progress is hard to replace overnight",
  ],
  heroSnippet: "Ordinary manufacturing and light industrial",
  trustSnippet: "reviewed through an independent broker",
  considerationCount: 8,
  faqCount: 5,
  forbidden: [
    "Covers buildings, machinery, and stock",
    "Addresses sudden mechanical or electrical breakdown of critical",
    "automatically included",
    "will cover",
    "will pay",
    "CGL never covers pollution",
    "never covers pollution",
  ],
  requiredPhrases: [
    "equipment breakdown",
    "where purchased",
    "product recall",
    "not automatic",
    "reviewed through an independent broker",
    "direct physical loss",
  ],
};

const COMMERCIAL_HUB = {
  slug: "commercial-insurance",
  forbidden: [
    "automatically included",
    "will cover every",
    "all-in-one policy",
    "Covers buildings",
  ],
  requiredPhrases: [
    "Core commercial coverage categories",
    "Industries we cover",
    "Specialty & program routes",
    "not a single bundled policy",
    "Independent advice",
  ],
  considerationCount: 4,
  faqCount: 5,
  categoryLinkCount: 10,
};

const VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
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
    const tabDesc = activeTab
      ?.querySelector("[data-coverage-description], .text-secondary, p")
      ?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img =
      document.querySelector(".pilot-ce-scene-interactive-master-image") ||
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image");
    const tabId =
      activeTab?.id?.match(/-tab-(.+)$/)?.[1] ||
      activeTab?.getAttribute("aria-controls")?.replace(/-panel$/, "").match(/-tab-(.+)$/)?.[1] ||
      null;
    return {
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(img),
      hasV2Detail: Boolean(detailH3 && detailP && detailH3 !== tabDesc),
      activeId: tabId,
    };
  });
}

async function verifyManufacturing(page, routeOut) {
  const route = MANUFACTURING;
  const result = { slug: route.slug, type: "manufacturing", explorer: [], pass: false };
  fs.mkdirSync(routeOut, { recursive: true });

  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await page.waitForSelector(`[id$="-tab-${route.tabs[0]}"]`, { timeout: 30000 });
  await scrollToExplorer(page);
  await new Promise((r) => setTimeout(r, 600));

  for (let i = 0; i < route.tabs.length; i++) {
    const tabId = route.tabs[i];
    const expectedTitle = route.detailTitles[i];
    const tabSel = `.pilot-product-coverage-list [id$="-tab-${tabId}"]`;
    await page.waitForSelector(tabSel, { timeout: 10000 });
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      el?.scrollIntoView({ block: "center" });
      el?.click();
    }, tabSel);
    await page.waitForFunction(
      (id, title) => {
        const tab = document.querySelector(`.pilot-product-coverage-list [id$="-tab-${id}"]`);
        const stage = document.querySelector(".pilot-product-explorer-stage");
        const h3 = stage?.querySelector("h3")?.textContent?.trim();
        return tab?.getAttribute("aria-selected") === "true" && h3 === title;
      },
      { timeout: 15000 },
      tabId,
      expectedTitle,
    );
    await new Promise((r) => setTimeout(r, 300));
    const state = await getExplorerState(page);
    result.explorer.push({ index: i, id: tabId, ...state });
  }

  result.trustBand = await page.evaluate(
    (snippets) => {
      const hero = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
      const trust = [...document.querySelectorAll("main section p")].find((p) =>
        p.textContent?.includes("reviewed through an independent broker"),
      )?.textContent?.trim();
      return {
        heroPresent: Boolean(hero?.includes(snippets.heroSnippet)),
        trustPresent: Boolean(
          (trust && trust.includes(snippets.trustSnippet)) ||
            (hero && hero.includes(snippets.trustSnippet)),
        ),
        distinct: hero !== trust,
      };
    },
    { heroSnippet: route.heroSnippet, trustSnippet: route.trustSnippet },
  );

  await page.evaluate(() =>
    document.getElementById("pilot-product-considerations-heading")?.scrollIntoView({
      block: "center",
    }),
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
    result.considerations.expandWorks =
      (await page.evaluate(() =>
        document.querySelectorAll(
          'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
        ).length,
      )) >= 1;
  } else {
    result.considerations.expandWorks = result.considerations.count >= 6;
  }

  result.faqCount = await page.evaluate(
    () => document.querySelectorAll(".pilot-auto-faq-trigger").length,
  );

  const bodyText = await page.evaluate(() => document.body.innerText);
  const bodyLower = bodyText.toLowerCase();
  result.forbidden = route.forbidden.filter((p) => bodyLower.includes(p.toLowerCase()));
  result.requiredMissing = route.requiredPhrases.filter(
    (p) => !bodyLower.includes(p.toLowerCase()),
  );
  result.idsPreserved = route.tabs.every((id, i) => result.explorer[i]?.id === id);
  result.allV2Detail = result.explorer.every((s) => s.hasV2Detail && !s.duplicateDesc);
  result.noExplorerOnHub = true;

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
    await scrollToExplorer(page);
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({
      path: path.join(routeOut, `explorer_${vp.name}.png`),
      fullPage: false,
    });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
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

  const explorerPass =
    result.explorer.length === 5 &&
    result.idsPreserved &&
    result.allV2Detail &&
    result.explorer.every((s, i) => s.detailTitle === route.detailTitles[i] && s.hasImage);

  result.pass =
    explorerPass &&
    result.trustBand.heroPresent &&
    result.trustBand.trustPresent &&
    result.trustBand.distinct &&
    result.considerations.count === route.considerationCount &&
    result.considerations.expandWorks !== false &&
    result.faqCount === route.faqCount &&
    result.forbidden.length === 0 &&
    result.requiredMissing.length === 0 &&
    VIEWPORTS.every((vp) => result[`overflow_${vp.name}`] === 0);

  fs.writeFileSync(path.join(routeOut, "verification-route.json"), JSON.stringify(result, null, 2));
  return result;
}

async function verifyCommercialHub(page, routeOut) {
  const route = COMMERCIAL_HUB;
  const result = { slug: route.slug, type: "commercial-hub", pass: false };
  fs.mkdirSync(routeOut, { recursive: true });

  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  result.hubStructure = await page.evaluate(() => ({
    hasCategorySection: Boolean(document.getElementById("commercial-hub-categories-heading")),
    hasIndustryGrid: Boolean(document.getElementById("industries-heading")),
    hasRelatedSection: document.body.innerText.includes("Specialty & program routes"),
    explorerAbsent: !document.querySelector(".pilot-product-explorer-stage"),
    categoryLinks: document.querySelectorAll(
      '[aria-labelledby="commercial-hub-categories-heading"] a[href]',
    ).length,
    industryTiles: document.querySelectorAll('[aria-labelledby="industries-heading"] a[href]')
      .length,
  }));

  result.ctaHeading = await page.evaluate(() =>
    document.querySelector("main h2, main h3")?.textContent?.trim(),
  );

  result.considerations = await page.evaluate(() => ({
    count: document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    ).length,
  }));

  result.faqCount = await page.evaluate(
    () => document.querySelectorAll(".pilot-auto-faq-trigger").length,
  );

  const bodyText = await page.evaluate(() => document.body.innerText);
  const bodyLower = bodyText.toLowerCase();
  result.forbidden = route.forbidden.filter((p) => bodyLower.includes(p.toLowerCase()));
  result.requiredMissing = route.requiredPhrases.filter(
    (p) => !bodyLower.includes(p.toLowerCase()),
  );

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await new Promise((r) => setTimeout(r, 500));
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({
      path: path.join(routeOut, `hub_${vp.name}.png`),
      fullPage: true,
    });
  }

  result.pass =
    result.hubStructure.explorerAbsent &&
    result.hubStructure.hasCategorySection &&
    result.hubStructure.hasIndustryGrid &&
    result.hubStructure.categoryLinks >= route.categoryLinkCount &&
    result.considerations.count === route.considerationCount &&
    result.faqCount === route.faqCount &&
    result.forbidden.length === 0 &&
    result.requiredMissing.length === 0 &&
    VIEWPORTS.every((vp) => result[`overflow_${vp.name}`] <= 2);

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

  const manufacturing = await verifyManufacturing(
    page,
    path.join(OUT, "manufacturing-insurance"),
  );
  const commercialHub = await verifyCommercialHub(page, path.join(OUT, "commercial-insurance"));

  const payload = {
    consoleErrors,
    routes: [
      {
        slug: manufacturing.slug,
        pass: manufacturing.pass,
        idsPreserved: manufacturing.idsPreserved,
        allV2Detail: manufacturing.allV2Detail,
        considerationCount: manufacturing.considerations?.count,
        faqCount: manufacturing.faqCount,
        forbidden: manufacturing.forbidden,
        requiredMissing: manufacturing.requiredMissing,
        explorerTitles: manufacturing.explorer.map((s) => s.detailTitle),
      },
      {
        slug: commercialHub.slug,
        pass: commercialHub.pass,
        hubStructure: commercialHub.hubStructure,
        considerationCount: commercialHub.considerations?.count,
        faqCount: commercialHub.faqCount,
        forbidden: commercialHub.forbidden,
        requiredMissing: commercialHub.requiredMissing,
      },
    ],
    pass:
      consoleErrors.length === 0 && manufacturing.pass && commercialHub.pass,
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
