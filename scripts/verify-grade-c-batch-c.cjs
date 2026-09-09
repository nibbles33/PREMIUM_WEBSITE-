#!/usr/bin/env node
/** Grade C Batch C — auto / garage / pollution / farm verification */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

/** Use localhost — Next.js dev blocks 127.0.0.1 cross-origin HMR/chunks by default. */
const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/grade-c-batch-c-2026-09-09");

const ROUTES = [
  {
    slug: "commercial-auto-insurance",
    tabs: [
      "liability-coverage",
      "physical-damage-coverage",
      "hired-non-owned-auto",
      "fleet-discounts-multi-vehicle-management",
    ],
    detailTitles: [
      "Statutory minimums exist — adequate limits are a business decision",
      "Physical damage is optional — lenders and lessors may require it",
      "Employee errands create liability your base auto policy may not cover",
      "More vehicles means more data — and more certificate requests",
    ],
    heroSnippet: "Ontario-regulated automobile",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "Covers customer vehicles",
      "CGL never covers pollution",
      "pollution fills that gap",
      "pollution fills every pollution gap",
      "75% Out of Province",
      "10 or more self-propelled vehicles must",
      "CVOR certificate before operating",
      "mandatory collision",
      "HNOA is automatic",
    ],
    requiredPhrases: [
      "July 1, 2026",
      "$200,000",
      "OPCF 49",
      "not automatic",
      "trucking",
    ],
  },
  {
    slug: "garage-dealership-insurance",
    tabs: [
      "garagekeepers-liability",
      "dealer-open-lot",
      "garage-liability",
      "physical-damage-on-inventory",
    ],
    detailTitles: [
      "Customer cars are insured elsewhere first — your legal liability still matters",
      "Inventory values move daily — static limits go stale",
      "CGL does not replace OAP 4 — each policy has a different job",
      "Your tow truck and lot shuttle are owned autos — not customer cars",
    ],
    heroSnippet: "OAP 4",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "Covers customer vehicles",
      "OMVIC mandates",
      "CGL replace garage",
      "CGL never covers",
    ],
    requiredPhrases: [
      "OAP 4",
      "care, custody, or control",
      "does not replace",
      "MTO",
    ],
  },
  {
    slug: "pollution-liability-insurance",
    tabs: [
      "contractors-pollution-liability",
      "site-pollution",
      "transportation-pollution",
      "cleanup-defence-costs",
    ],
    detailTitles: [
      "Bid specs often require CPL — even when CGL is already in place",
      "Underground tanks and slow leaks outlive standard GL policy periods",
      "A highway spill is not automatically covered by auto liability alone",
      "Cleanup costs erode limits — defence may be inside the same bucket",
    ],
    heroSnippet: "commercial general liability",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "CGL never covers pollution",
      "pollution fills that gap",
      "pollution fills every pollution gap",
      "Covers regulatory-mandated remediation",
      "regulatory fines are generally insured",
      "Standard GL policies typically exclude pollution unless sudden",
    ],
    requiredPhrases: [
      "claims-made",
      "known condition",
      "fines and penalties",
      "Environmental Protection Act",
    ],
  },
  {
    slug: "farm-insurance",
    tabs: [
      "farm-property-coverage",
      "equipment-machinery",
      "farm-liability",
      "livestock-coverage",
    ],
    detailTitles: [
      "Barns and outbuildings are farm assets — not ordinary home attachments",
      "Field equipment and licensed road vehicles follow different rules",
      "Visitors, custom work, and roadside stands change liability exposure",
      "Herd loss can mean lost income — not just lost animals",
    ],
    heroSnippet: "Agricorp",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "Protects farmhouses",
      "Covers tractors",
      "automatically included",
      "all farm packages cover",
    ],
    requiredPhrases: [
      "automobile insurance",
      "Greenhouse",
      "AgriInsurance",
      "specified perils",
    ],
  },
];

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
      tabLabel: activeTab?.textContent?.trim().slice(0, 80),
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

async function verifyRoute(page, route, routeOut) {
  const result = { slug: route.slug, explorer: [], pass: false };
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
        heroPreview: hero?.slice(0, 160) || null,
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
    const openCount = await page.evaluate(() =>
      document.querySelectorAll(
        'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
      ).length,
    );
    result.considerations.oneOpenAtATime = openCount >= 1;
    result.considerations.expandWorks = openCount >= 1;
  } else {
    result.considerations.oneOpenAtATime = result.considerations.count >= 6;
    result.considerations.expandWorks = result.considerations.count >= 6;
  }

  result.faqCount = await page.evaluate(
    () => document.querySelectorAll(".pilot-auto-faq-trigger").length,
  );
  const bodyText = await page.evaluate(() => document.body.innerText);
  result.forbidden = route.forbidden.filter((p) => bodyText.includes(p));
  result.requiredMissing = route.requiredPhrases.filter((p) => !bodyText.includes(p));
  result.idsPreserved = route.tabs.every((id, i) => result.explorer[i]?.id === id);
  result.allV2Detail = result.explorer.every((s) => s.hasV2Detail && !s.duplicateDesc);

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
    await scrollToExplorer(page);
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({ path: path.join(routeOut, `explorer_${vp.name}.png`), fullPage: false });
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
    result.explorer.length === 4 &&
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
    routes: routes.map((r) => ({
      slug: r.slug,
      pass: r.pass,
      idsPreserved: r.idsPreserved,
      allV2Detail: r.allV2Detail,
      considerationCount: r.considerations?.count,
      faqCount: r.faqCount,
      forbidden: r.forbidden,
      requiredMissing: r.requiredMissing,
      explorerTitles: r.explorer.map((s) => s.detailTitle),
      overflow: {
        390: r.overflow_390,
        768: r.overflow_768,
        1024: r.overflow_1024,
        1440: r.overflow_1440,
      },
    })),
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
