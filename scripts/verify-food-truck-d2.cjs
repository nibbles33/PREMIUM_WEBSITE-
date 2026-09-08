#!/usr/bin/env node
/** Food Truck D2 V2 implementation verification. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const ROUTE = "/food-truck-insurance";
const OUT = path.join(__dirname, "../docs/qa-screenshots/food-truck-d2-2026-09-08");

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const TAB_SUFFIXES = [
  "general-liability",
  "commercial-auto",
  "equipment-coverage",
  "product-liability",
];

const DETAIL_TITLES = [
  "When a line at your service window becomes a liability claim",
  "On the road is a different policy question than at the service window",
  "The kitchen inside the truck is not always insured like the truck itself",
  "Foodborne illness claims are a distinct exposure from a slip-and-fall",
];

const FORBIDDEN = [
  "inland marine",
  "often exclude or restrict commercial use",
  "Fire code compliance and suppression maintenance are regulatory",
  "Most food trucks do not sell",
  "Standard property and commercial auto forms often do not fully address spoilage",
  "food service premises must have at least one certified food handler on site during operating hours",
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
    const tabTitle = activeTab?.querySelector(".font-medium, .text-\\[15px\\]")?.textContent?.trim();
    const tabDesc = activeTab?.querySelector(".text-secondary, .text-\\[13px\\]")?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img = document.querySelector(".pilot-ce-scene-interactive-master-image");
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    return {
      tabTitle,
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateTitle: tabTitle && detailH3 && tabTitle === detailH3,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(img),
      objectFit: img ? getComputedStyle(img).objectFit : null,
      overflow,
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

  const results = { consoleErrors, explorer: [], viewports: [], considerations: {}, forbidden: [] };

  await page.goto(`${BASE}${ROUTE}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollToExplorer(page);

  for (let i = 0; i < TAB_SUFFIXES.length; i++) {
    await page.click(`[id$="-tab-${TAB_SUFFIXES[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    const state = await getExplorerState(page);
    results.explorer.push({ index: i, id: TAB_SUFFIXES[i], ...state });
  }
  results.explorerTabCount = TAB_SUFFIXES.length;

  const trustHero = await page.evaluate(() => {
    const hero = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
    const trust = [...document.querySelectorAll("main section p")].find((p) =>
      p.textContent?.includes("reviewed through an independent broker"),
    )?.textContent?.trim();
    return {
      heroPresent: Boolean(hero?.includes("two different risk profiles")),
      trustPresent: Boolean(trust?.includes("Windsor–Essex food trucks")),
      distinct: hero !== trust,
    };
  });
  results.trustBand = trustHero;

  await scrollToConsiderations(page);
  const considerationButtons = await page.$$(
    'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
  );
  results.considerations.count = considerationButtons.length;
  results.considerations.expandable = considerationButtons.length > 0;

  if (considerationButtons.length >= 2) {
    await considerationButtons[0].evaluate((el) => el.click());
    await new Promise((r) => setTimeout(r, 350));
    const firstExpanded = await page.evaluate(() =>
      document.querySelectorAll(
        'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
      ).length,
    );
    await considerationButtons[1].evaluate((el) => el.click());
    await new Promise((r) => setTimeout(r, 350));
    const openCount = await page.evaluate(() =>
      document.querySelectorAll(
        'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
      ).length,
    );
    const firstAfterSecond = await page.evaluate(() =>
      document
        .querySelectorAll(
          'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
        )[0]
        ?.getAttribute("aria-expanded"),
    );
    results.considerations.oneOpenAtATime =
      firstExpanded === 1 && openCount === 1 && firstAfterSecond === "false";
  }

  results.faqCount = await page.evaluate(
    () => document.querySelectorAll(".pilot-auto-faq-trigger").length,
  );
  results.faqQuestions = await page.evaluate(() =>
    [...document.querySelectorAll(".pilot-auto-faq-trigger")].map((el) => el.textContent?.trim()).filter(Boolean),
  );

  const bodyText = await page.evaluate(() => document.body.innerText);
  for (const phrase of FORBIDDEN) {
    if (bodyText.toLowerCase().includes(phrase.toLowerCase())) {
      results.forbidden.push(phrase);
    }
  }

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile ?? false });
    await page.goto(`${BASE}${ROUTE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await scrollToExplorer(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({ path: path.join(OUT, `explorer_${vp.name}.png`), fullPage: false });
    results.viewports.push({ name: vp.name, overflow });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.screenshot({ path: path.join(OUT, "hero_1440.png"), fullPage: false });
  await scrollToConsiderations(page);
  await page.screenshot({ path: path.join(OUT, "considerations_1440.png"), fullPage: false });

  results.pass =
    results.explorerTabCount === 4 &&
    results.explorer.every((s) => !s.duplicateTitle && !s.duplicateDesc && s.hasImage) &&
    results.explorer.every((s, i) => s.detailTitle === DETAIL_TITLES[i]) &&
    results.considerations.count === 8 &&
    results.considerations.oneOpenAtATime &&
    results.trustBand.distinct &&
    results.forbidden.length === 0 &&
    results.viewports.every((v) => v.overflow <= 1) &&
    consoleErrors.length === 0;

  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
  process.exit(results.pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
