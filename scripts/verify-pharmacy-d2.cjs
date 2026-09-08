#!/usr/bin/env node
/** Pharmacy D2 remediation verification */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/pharmacy-d2-remediation-2026-09-08");

const ROUTE = {
  slug: "pharmacy-insurance",
  tabs: ["commercial-property", "general-liability", "professional-liability", "cyber-privacy"],
  detailTitles: [
    "Prescription inventory and cold-chain equipment drive property values",
    "A slip at the pickup counter is not a dispensing-error claim",
    "A dispensing error is a professional claim — and OCP PPLI is separate",
    "Patient records create cyber exposure PHIPA does not insure away",
  ],
  heroSnippet: "professional dispensing exposure",
  trustSnippet: "Windsor–Essex independent pharmacies",
  considerationCount: 7,
  faqCount: 5,
  forbidden: [
    "Covers inventory, fixtures",
    "Covers patient data breaches",
    "narcotics storage security requirements",
  ],
};

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

async function verifyRoute(page, routeOut) {
  const result = { slug: ROUTE.slug, explorer: [], pass: false };

  await page.goto(`${BASE}/${ROUTE.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await scrollToExplorer(page);

  for (let i = 0; i < ROUTE.tabs.length; i++) {
    await page.click(`[id$="-tab-${ROUTE.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    const state = await getExplorerState(page);
    result.explorer.push({ index: i, id: ROUTE.tabs[i], ...state });
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
    { heroSnippet: ROUTE.heroSnippet, trustSnippet: ROUTE.trustSnippet },
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
  result.forbidden = ROUTE.forbidden.filter((p) => bodyText.includes(p));

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile ?? false });
    await page.goto(`${BASE}/${ROUTE.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
    await scrollToExplorer(page);
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({ path: path.join(routeOut, `explorer_${vp.name}.png`), fullPage: false });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${ROUTE.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await scrollToExplorer(page);
  for (let i = 0; i < ROUTE.tabs.length; i++) {
    await page.click(`[id$="-tab-${ROUTE.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(routeOut, `explorer_state-${i}_${ROUTE.tabs[i]}_1440.png`),
      fullPage: false,
    });
  }

  await page.goto(`${BASE}/${ROUTE.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-hero", { timeout: 30000 });
  await page.screenshot({ path: path.join(routeOut, "hero_1440.png"), fullPage: false });
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${BASE}/${ROUTE.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-hero", { timeout: 30000 });
  await page.screenshot({ path: path.join(routeOut, "hero_390.png"), fullPage: false });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${ROUTE.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() =>
    document.getElementById("pilot-product-considerations-heading")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));
  const considerationButtons = await page.$$(
    'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
  );
  if (considerationButtons[0]) {
    await considerationButtons[0].click();
    await new Promise((r) => setTimeout(r, 400));
  }
  await page.screenshot({ path: path.join(routeOut, "considerations-expanded_1440.png"), fullPage: false });

  await page.evaluate(() =>
    document.querySelector(".pilot-auto-faq-trigger")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(routeOut, "faq_1440.png"), fullPage: false });

  result.pass =
    result.explorer.length === 4 &&
    result.explorer.every((s, i) => s.detailTitle === ROUTE.detailTitles[i] && !s.duplicateDesc && s.hasImage) &&
    result.trustBand.distinct &&
    result.trustBand.heroPresent &&
    result.trustBand.trustPresent &&
    result.considerations.count === ROUTE.considerationCount &&
    result.faqCount === ROUTE.faqCount &&
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

  const routeResult = await verifyRoute(page, OUT);
  const payload = { consoleErrors, route: routeResult, pass: consoleErrors.length === 0 && routeResult.pass };
  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload, null, 2));
  await browser.close();
  process.exit(payload.pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
