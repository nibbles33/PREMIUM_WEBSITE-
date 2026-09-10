#!/usr/bin/env node
/** Restaurant UX refinement verification — trust band dedupe + expandable considerations. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const ROUTE = "/restaurant-insurance";
const OUT = path.join(__dirname, "../docs/qa-screenshots/restaurant-ux-refinement-2026-09-08");

const HERO_SUBHEAD_PREFIX =
  "Restaurants in Windsor–Essex combine busy dining rooms";

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const APPROVED_CONSIDERATION_TITLES = [
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

async function scrollToConsiderations(page) {
  await page.evaluate(() =>
    document
      .getElementById("pilot-product-considerations-heading")
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 500));
}

function considerationSectionSelector() {
  return 'section[aria-labelledby="pilot-product-considerations-heading"]';
}

async function getPageState(page) {
  return page.evaluate((prefix) => {
    const heroLead = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
    const trustBand = document.querySelector(
      "main > section.border-b.bg-white.py-8 p, main > section.border-b.bg-white.py-8.sm\\:py-10 p",
    );
    const trustSections = [...document.querySelectorAll("main section")].filter((s) => {
      const p = s.querySelector(":scope > div > p, :scope > div > div > p");
      return p?.textContent?.includes("Windsor–Essex combine busy dining rooms");
    });
    const considerationButtons = document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    );
    const expandedPanels = document.querySelectorAll(
      '#pilot-product-considerations-heading ~ ul [role="region"] p',
    );
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    return {
      heroLead: heroLead?.slice(0, 80) ?? null,
      heroLeadPresent: Boolean(heroLead?.startsWith(prefix)),
      trustBandCount: trustSections.length,
      trustBandDuplicate: trustSections.length > 0,
      considerationCount: considerationButtons.length,
      expandableButtons: considerationButtons.length,
      overflow,
    };
  }, HERO_SUBHEAD_PREFIX);
}

async function testRestaurant(page, results) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  const initial = await getPageState(page);
  results.restaurant = { initial };

  // Trust band dedupe
  results.restaurant.trustBandRemoved =
    initial.heroLeadPresent && initial.trustBandCount === 0;

  await scrollToConsiderations(page);
  const buttons = await page.$$(
    'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
  );
  results.restaurant.considerationCount = buttons.length;

  // All collapsed by default
  const collapsedDefault = await page.evaluate(() => {
    const btns = document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    );
    return [...btns].every((b) => b.getAttribute("aria-expanded") === "false");
  });
  results.restaurant.collapsedByDefault = collapsedDefault;

  // Expand first card — verify full text
  if (buttons[0]) {
    await buttons[0].click();
    await new Promise((r) => setTimeout(r, 400));
    const firstExpanded = await page.evaluate(() => {
      const panel = document.querySelector(
        'section[aria-labelledby="pilot-product-considerations-heading"] [role="region"] p',
      );
      return panel?.textContent?.trim() ?? null;
    });
    results.restaurant.firstExpandedText = firstExpanded;
    results.restaurant.firstExpandedMatches =
      firstExpanded ===
      "Cuisine type, seating capacity, cooking methods (deep fryer, open flame, wood-fired oven), hours, delivery or catering model, and whether you hold an AGCO Liquor Sales Licence.";
  }

  // Only one open at a time
  if (buttons[2]) {
    await buttons[2].click();
    await new Promise((r) => setTimeout(r, 400));
    const openCount = await page.evaluate(() => {
      const btns = document.querySelectorAll(
        'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
      );
      return btns.length;
    });
    results.restaurant.singleOpen = openCount === 1;
  }

  // Keyboard — focus a collapsed card and press Enter
  await scrollToConsiderations(page);
  const keyboardOk = await page.evaluate(() => {
    const btns = document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    );
    const collapsed = [...btns].find((b) => b.getAttribute("aria-expanded") === "false");
    if (!collapsed) return false;
    collapsed.focus();
    return document.activeElement === collapsed;
  });
  if (keyboardOk) {
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 350));
  }
  const keyboardExpanded = await page.evaluate(() => {
    const btns = document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
    );
    return btns.length >= 1;
  });
  results.restaurant.keyboardOk = keyboardOk && keyboardExpanded;

  // Titles
  const titles = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        'section[aria-labelledby="pilot-product-considerations-heading"] h3 button span.block.text-lg',
      ),
    ].map((el) => el.textContent?.trim()),
  );
  results.restaurant.titles = titles;
  results.restaurant.allTitlesPresent = APPROVED_CONSIDERATION_TITLES.every((t) =>
    titles.includes(t),
  );

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
    await new Promise((r) => setTimeout(r, 300));
    const s = await getPageState(page);
    results.restaurant.viewports = results.restaurant.viewports || [];
    results.restaurant.viewports.push({ viewport: vp.name, overflow: s.overflow, pass: s.overflow === 0 });
  }

  results.restaurant.pass =
    results.restaurant.trustBandRemoved &&
    results.restaurant.considerationCount === 11 &&
    results.restaurant.collapsedByDefault &&
    results.restaurant.firstExpandedMatches &&
    results.restaurant.singleOpen &&
    results.restaurant.keyboardOk &&
    results.restaurant.allTitlesPresent &&
    results.restaurant.viewports.every((v) => v.pass);
}

async function testStandardConsiderations(page, route, label, results) {
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  const state = await page.evaluate(() => {
    const section = document.querySelector(
      'section[aria-labelledby="pilot-product-considerations-heading"]',
    );
    const expandable = section?.querySelector("button[aria-expanded]");
    const staticCards = section?.querySelectorAll("li .rounded-xl.border") ?? [];
    const visibleDesc = section?.querySelector("li p.text-\\[15px\\]");
    return {
      hasExpandable: Boolean(expandable),
      staticCardCount: staticCards.length,
      hasVisibleDescription: Boolean(visibleDesc?.offsetParent),
    };
  });
  results.crossRoute = results.crossRoute || [];
  results.crossRoute.push({ route, label, ...state, pass: !state.hasExpandable && state.staticCardCount > 0 });
}

async function captureScreenshots(page) {
  fs.mkdirSync(OUT, { recursive: true });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToConsiderations(page);
  await page.screenshot({ path: path.join(OUT, "considerations-collapsed_1440.png") });

  const buttons = await page.$$(
    'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
  );
  if (buttons[2]) {
    await buttons[2].click();
    await new Promise((r) => setTimeout(r, 450));
  }
  await page.screenshot({ path: path.join(OUT, "considerations-one-expanded_1440.png") });

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await scrollToConsiderations(page);
  await page.screenshot({ path: path.join(OUT, "considerations-collapsed_390.png"), fullPage: true });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  const results = { consoleErrors };
  await testRestaurant(page, results);
  await testStandardConsiderations(page, "/daycare-private-school-insurance", "daycare", results);
  await testStandardConsiderations(page, "/greenhouse-agribusiness-insurance", "greenhouse", results);
  await captureScreenshots(page);

  await browser.close();

  results.pass =
    results.restaurant?.pass &&
    results.crossRoute?.every((r) => r.pass) &&
    consoleErrors.length === 0;

  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ pass: results.pass, restaurant: results.restaurant?.pass }, null, 2));
  process.exit(results.pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
