#!/usr/bin/env node
/** Liquor Liability D2 V2 implementation verification. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const ROUTE = "/liquor-liability-insurance";
const OUT = path.join(__dirname, "../docs/qa-screenshots/liquor-liability-d2-2026-09-08");

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const STATE_IDS = [
  "patron-injury-property-damage",
  "assault-battery",
  "legal-defence",
  "event-host-liquor",
];

const DETAIL_TITLES = [
  "When service at the bar becomes a third-party claim",
  "When an altercation leads to a liability claim",
  "Defence costs can accrue before fault is determined",
  "A one-night event is not the same risk profile as a licensed bar",
];

async function scrollToExplorer(page) {
  await page.evaluate(() =>
    document
      .querySelector(".pilot-product-explorer-stage")
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));
}

async function scrollToConsiderations(page) {
  await page.evaluate(() =>
    document
      .getElementById("pilot-product-considerations-heading")
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));
}

async function getExplorerState(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".pilot-product-explorer-stage");
    const activeTab = document.querySelector(".pilot-product-coverage-card.is-active");
    const shortLabel = activeTab?.querySelector(".text-\\[11px\\], .text-xs")?.textContent?.trim();
    const tabTitle = activeTab?.querySelector(".font-medium, .text-\\[15px\\]")?.textContent?.trim();
    const tabDesc = activeTab?.querySelector(".text-secondary, .text-\\[13px\\]")?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img = document.querySelector(".pilot-ce-scene-interactive-master-image");
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    return {
      shortLabel,
      tabTitle,
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateTitle: tabTitle && detailH3 && tabTitle === detailH3,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(img),
      objectFit: img ? getComputedStyle(img).objectFit : null,
      overflow,
      hasJackOs: document.body.textContent.includes("Jack-O"),
      hasDutyToDefend: detailP?.includes("duty-to-defend") ?? false,
    };
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  const results = { consoleErrors, explorer: [], viewports: [], considerations: {} };

  await page.goto(`${BASE}${ROUTE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToExplorer(page);

  const tabs = await page.$$(".pilot-product-coverage-card");
  results.explorerTabCount = tabs.length;

  for (let i = 0; i < tabs.length; i++) {
    const tabList = await page.$$(".pilot-product-coverage-card");
    await tabList[i].click();
    await new Promise((r) => setTimeout(r, 350));
    const state = await getExplorerState(page);
    results.explorer.push({ index: i, ...state });
  }

  // Trust band distinct from hero
  const trustHero = await page.evaluate(() => {
    const hero = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
    const trust = [...document.querySelectorAll("main section p")].find((p) =>
      p.textContent?.includes("reviewed through an independent broker"),
    )?.textContent?.trim();
    return {
      heroPresent: Boolean(hero?.includes("Liquor liability insurance helps protect")),
      trustPresent: Boolean(trust),
      distinct: hero !== trust,
    };
  });
  results.trustBand = trustHero;

  // Considerations expandable
  await scrollToConsiderations(page);
  const considerationButtons = await page.$$(
    'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
  );
  results.considerations.count = considerationButtons.length;
  results.considerations.collapsedByDefault = await page.evaluate(() => {
    const btns = document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    );
    return [...btns].every((b) => b.getAttribute("aria-expanded") === "false");
  });

  if (considerationButtons[1]) {
    await considerationButtons[1].click();
    await new Promise((r) => setTimeout(r, 350));
  }
  if (considerationButtons[4]) {
    const btns = await page.$$(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    );
    await btns[4].click();
    await new Promise((r) => setTimeout(r, 350));
    const openCount = await page.evaluate(() =>
      document.querySelectorAll(
        'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
      ).length,
    );
    results.considerations.singleOpen = openCount === 1;
  }

  const considerationText = await page.evaluate(() =>
    document.body.textContent.includes(
      "AGCO's Liquor Sales Licence application required-documents list",
    ),
  );
  results.considerations.noAgcoAppDocsClaim = !considerationText;

  // FAQ count
  results.faqCount = await page.evaluate(() =>
    document.querySelectorAll('[class*="faq"] details, .faq-accordion details, section details').length ||
    document.querySelectorAll("main section").length,
  );

  const faqQuestions = await page.evaluate(() =>
    [...document.querySelectorAll("details summary, [data-faq] summary")].map((el) =>
      el.textContent?.trim(),
    ),
  );
  results.faqQuestions = faqQuestions.filter(Boolean);

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
    await page.goto(`${BASE}${ROUTE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await scrollToExplorer(page);
    const s = await getExplorerState(page);
    await page.screenshot({
      path: path.join(OUT, `explorer-default_${vp.name}.png`),
    });
    results.viewports.push({ viewport: vp.name, overflow: s.overflow, pass: s.overflow === 0 });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToConsiderations(page);
  await page.screenshot({ path: path.join(OUT, "considerations-collapsed_1440.png") });

  const assaultTab = await page.evaluate(() => {
    const cards = [...document.querySelectorAll(".pilot-product-coverage-card")];
    const idx = cards.findIndex((c) => c.textContent?.includes("Altercations"));
    return idx;
  });

  await page.goto(`${BASE}${ROUTE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToExplorer(page);
  if (assaultTab >= 0) {
    const cards = await page.$$(".pilot-product-coverage-card");
    await cards[assaultTab].click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUT, "explorer-altercations_1440.png") });
  }

  results.pass =
    results.explorerTabCount === 4 &&
    results.explorer.every((s) => !s.duplicateTitle && !s.duplicateDesc && !s.hasJackOs) &&
    results.explorer.some((s) => s.shortLabel === "Altercations") &&
    results.explorer.every((s) => DETAIL_TITLES.includes(s.detailTitle)) &&
    results.trustBand.heroPresent &&
    results.trustBand.trustPresent &&
    results.trustBand.distinct &&
    results.considerations.count === 9 &&
    results.considerations.collapsedByDefault &&
    results.considerations.singleOpen &&
    results.considerations.noAgcoAppDocsClaim &&
    results.viewports.every((v) => v.pass) &&
    consoleErrors.length === 0;

  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ pass: results.pass, explorer: results.explorer.length }, null, 2));
  await browser.close();
  process.exit(results.pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
