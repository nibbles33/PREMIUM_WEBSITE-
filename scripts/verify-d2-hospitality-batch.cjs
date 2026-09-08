#!/usr/bin/env node
/** D2 Hospitality Batch verification — Hotel/Motel, Event Liability, Convenience Store. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/d2-hospitality-batch-2026-09-08");

const ROUTES = [
  {
    slug: "hotel-motel-insurance",
    tabs: [
      "commercial-property",
      "general-liability",
      "business-interruption",
      "liquor-liability",
    ],
    detailTitles: [
      "Guest rooms and back-of-house equipment drive property values",
      "When a guest injury in your lobby becomes a liability claim",
      "Room revenue does not pause automatically when repairs begin",
      "A hotel bar is not the same coverage question as guest-room liability",
    ],
    heroSnippet: "guest rooms, common areas, and amenities",
    trustSnippet: "Windsor–Essex independent hotels",
    considerationCount: 6,
    faqCount: 5,
    forbidden: ["Covers the building", "Yes — serving alcohol requires"],
  },
  {
    slug: "event-liability-insurance",
    tabs: [
      "third-party-bodily-injury",
      "property-damage",
      "liquor-liability-events",
      "vendor-exhibitor-coverage",
    ],
    detailTitles: [
      "A wedding reception trip-and-fall is an event-host exposure",
      "Damage to a rented hall is a different claim than an injury",
      "Serving alcohol at a one-night event is not the same as running a bar",
      "Market organizers may need to address vendor exposure",
    ],
    heroSnippet: "specific event you host",
    trustSnippet: "Windsor–Essex event organizers",
    considerationCount: 6,
    faqCount: 5,
    forbidden: [
      "Covers claims when attendees",
      "Event liability covers third-party",
    ],
  },
  {
    slug: "convenience-store-insurance",
    tabs: [
      "commercial-property",
      "general-liability",
      "pollution-liability",
      "crime-hold-up",
    ],
    detailTitles: [
      "Coolers, inventory, and late-night theft drive property values",
      "A slip at the pump island is a premises liability claim",
      "Fuel tanks create environmental exposure property policies may not fully address",
      "Cash-heavy operations face crime exposure standard property may not cover",
    ],
    heroSnippet: "high-traffic retail, cash handling",
    trustSnippet: "Windsor–Essex independent convenience stores",
    considerationCount: 7,
    faqCount: 5,
    forbidden: [
      "Covers building, coolers",
      "Covers underground storage tank",
      "Covers claims when attendees",
    ],
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
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    const shot = path.join(routeOut, `explorer_${vp.name}.png`);
    await page.screenshot({ path: shot, fullPage: false });
    result[`overflow_${vp.name}`] = overflow;
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
  page.on("pageerror", (e) => consoleErrors.push({ route: "global", msg: e.message }));

  const results = { consoleErrors, routes: [], pass: false };
  for (const route of ROUTES) {
    const routeOut = path.join(OUT, route.slug);
    fs.mkdirSync(routeOut, { recursive: true });
    const r = await verifyRoute(page, route, routeOut);
    results.routes.push(r);
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
