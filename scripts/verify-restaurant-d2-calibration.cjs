#!/usr/bin/env node
/** Verify Restaurant D2 calibration — approved copy + 4-state Explorer + 11 considerations */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/restaurant-d2-calibration-2026-09-08",
);
const ROUTE = "/restaurant-insurance/";

const DETAIL_TITLES = [
  "When a busy dining room becomes a liability claim",
  "Why kitchen equipment drives property values",
  "Civil liability under the Act versus the coverage on your policy",
  "When the walk-in fails on a Friday night",
];

const CONSIDERATION_TITLES = [
  "Disclosures your broker typically needs",
  "Food safety is regulatory — not an insurance substitute",
  "Product Liability / Food Illness",
  "Liquor licensing, civil liability, and insurance are three different things",
  "Delivery and app-based orders",
  "Kitchen fire and suppression maintenance",
  "Patio and seasonal operations",
  "Business Interruption",
  "Lease and franchisor requirements",
  "WSIB and kitchen employee injuries",
  "Did you know?",
];

const FAQ_QUESTIONS = [
  "Do I need liquor liability if I serve alcohol?",
  "Is food spoilage from a power outage covered?",
  "Do I need coverage for delivery drivers?",
  "What food safety rules apply in Ontario?",
  "What information do I need for a restaurant quote?",
];

const TAB_LABELS = ["General", "Property", "Liquor", "Equipment"];

async function scrollToSelector(page, sel) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "center" }), sel);
  await new Promise((r) => setTimeout(r, 350));
}

async function captureExplorerTab(page, name) {
  await scrollToSelector(page, ".pilot-product-explorer-stage");
  await page.screenshot({
    path: path.join(OUT, `explorer-${name}.png`),
    fullPage: false,
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  const viewports = [
    { name: "390", width: 390, height: 844, isMobile: true },
    { name: "768", width: 768, height: 900 },
    { name: "1024", width: 1024, height: 900 },
    { name: "1440", width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.isMobile || false,
    });
    await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 800));
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) errors.push(`overflow ${vp.name}px: ${overflow}px`);
    if (vp.name === "390" || vp.name === "1440") {
      await page.screenshot({
        path: path.join(OUT, `fullpage_${vp.name}.png`),
        fullPage: true,
      });
    }
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1000));

  const tabs = await page.$$(".pilot-product-coverage-card");
  const explorerStates = [];
  const stateImageSrcs = [];

  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 600));
    const state = await page.evaluate(() => {
      const stage = document.querySelector(".pilot-product-explorer-stage");
      const activeTab = document.querySelector(".pilot-product-coverage-card.is-active");
      const tabLabel = activeTab?.querySelector(".font-medium")?.textContent?.trim();
      const tabDesc = activeTab?.querySelector(".text-secondary")?.textContent?.trim();
      const detailTitle = stage?.querySelector("h3")?.textContent?.trim();
      const detailDesc = stage?.querySelector("h3 + p")?.textContent?.trim();
      const img = document.querySelector(".pilot-ce-state-image--current");
      const magnifierHint = document.querySelector(".pilot-ce-magnifier-hint");
      return {
        tabLabel,
        tabDesc,
        detailTitle,
        detailDesc,
        duplicateTitle: tabLabel && detailTitle && tabLabel === detailTitle,
        duplicateDesc: tabDesc && detailDesc && tabDesc === detailDesc,
        imgSrc: img?.getAttribute("src") || null,
        hasMagnifierHint: Boolean(magnifierHint),
      };
    });
    explorerStates.push(state);
    stateImageSrcs.push(state.imgSrc);
    await captureExplorerTab(page, TAB_LABELS[i].toLowerCase());
  }

  await scrollToSelector(page, "#pilot-product-considerations-heading");
  await page.screenshot({ path: path.join(OUT, "considerations-section.png"), fullPage: false });

  await page.evaluate(() => {
    const faqHeading = [...document.querySelectorAll("h2")].find((h) =>
      h.textContent?.includes("FAQ"),
    );
    faqHeading?.scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT, "faq-section.png"), fullPage: false });

  const dom = await page.evaluate(
    (considerationTitles, faqQuestions) => {
      const text = document.body.innerText.replace(/\s+/g, " ");
      const considerationSection = document.querySelector("#pilot-product-considerations-heading");
      const considerationCards = considerationSection
        ? [...considerationSection.closest("section")?.querySelectorAll("li h3") ?? []].map(
            (h) => h.textContent?.trim(),
          )
        : [];
      const faqButtons = [
        ...document.querySelectorAll("button"),
      ].filter((b) => b.textContent?.includes("?"));
      const faqTexts = faqButtons.map((b) => b.textContent?.trim());
      return {
        heroPresent: text.includes("O. Reg. 493/17"),
        heroNoOld: !text.includes("Coverage built around the realities of running a restaurant"),
        considerationCards,
        faqTexts,
        hasProductLiabilityConsideration: text.includes("Product Liability / Food Illness"),
        hasBusinessInterruptionConsideration: considerationCards.includes("Business Interruption"),
        liquorFaqAccurate: text.includes(
          "does not mandate liquor liability insurance as a statutory condition",
        ),
        noAgcoRequires: !text.includes("licensing bodies"),
      };
    },
    CONSIDERATION_TITLES,
    FAQ_QUESTIONS,
  );

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  const mobileMagnifier = await page.evaluate(() =>
    Boolean(document.querySelector(".pilot-ce-magnifier-hint:not(.is-dismissed)")),
  );

  for (const spot of [
    "/daycare-private-school-insurance/",
    "/greenhouse-agribusiness-insurance/",
    "/convenience-store-insurance/",
    "/contractors-insurance/",
  ]) {
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}${spot}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    const reg = await page.evaluate(() => {
      const text = document.body.innerText;
      const heading = document.querySelector("#pilot-product-considerations-heading");
      const considerationCount = heading
        ? heading.closest("section")?.querySelectorAll("li h3")?.length || 0
        : 0;
      return {
        route: location.pathname,
        hasConsiderationsHeading: Boolean(heading),
        considerationCount,
        ok: text.length > 200,
      };
    });
    if (!reg.ok) errors.push(`spot-check failed: ${spot}`);
    if (spot === "/daycare-private-school-insurance/" && reg.considerationCount < 9) {
      errors.push(`daycare considerations regression: ${reg.considerationCount}`);
    }
  }

  await browser.close();

  const uniqueStateImages = [...new Set(stateImageSrcs.filter(Boolean))];
  const detailTitlesMatch = explorerStates.every(
    (s, i) => s.detailTitle === DETAIL_TITLES[i],
  );
  const noDuplicateCopy = explorerStates.every((s) => !s.duplicateTitle && !s.duplicateDesc);
  const considerationsMatch =
    dom.considerationCards.length === 11 &&
    CONSIDERATION_TITLES.every((t) => dom.considerationCards.includes(t));

  const faqCount = FAQ_QUESTIONS.filter((q) =>
    dom.faqTexts.some((t) => t?.includes(q.replace("?", ""))),
  ).length;

  const results = {
    explorerTabCount: tabs.length,
    explorerStates,
    uniqueStateImageCount: uniqueStateImages.length,
    stateImageSrcs,
    detailTitlesMatch,
    noDuplicateCopy,
    considerationCount: dom.considerationCards.length,
    considerationTitles: dom.considerationCards,
    considerationsMatch,
    faqCount,
    faqTexts: dom.faqTexts,
    heroPresent: dom.heroPresent,
    liquorFaqAccurate: dom.liquorFaqAccurate,
    mobileMagnifierVisible: mobileMagnifier,
    errors,
    pass:
      tabs.length === 4 &&
      detailTitlesMatch &&
      noDuplicateCopy &&
      considerationsMatch &&
      faqCount === 5 &&
      dom.heroPresent &&
      dom.liquorFaqAccurate &&
      dom.noAgcoRequires &&
      uniqueStateImages.length >= 3 &&
      errors.length === 0,
  };

  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  process.exit(results.pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
