#!/usr/bin/env node
/** Coverage Explorer UX v2 regression — detail copy split, eyebrow removal, fallbacks. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07");

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1280", width: 1280, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const DAYCARE_DETAIL_TITLES = [
  "When everyday accidents become liability claims",
  "Protecting the spaces children learn and play in",
  "A coverage that needs to be addressed specifically",
  "Protection for professional and care-related decisions",
  "Protection for the people making governance decisions",
  "When a covered loss forces operations to stop",
];

const NORMAL_ROUTES = [
  "/home-insurance/",
  "/cyber-insurance/",
  "/greenhouse-agribusiness-insurance/",
];

async function scrollToExplorer(page) {
  await page.evaluate(() =>
    document
      .querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage")
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));
}

async function getExplorerState(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage");
    const eyebrow = document.querySelector(".pilot-ce-stage-eyebrow");
    const activeTab = document.querySelector(
      ".pilot-product-coverage-card.is-active, .pilot-auto-coverage-card.is-active",
    );
    const tabTitle = activeTab?.querySelector(".font-medium, .text-\\[15px\\]")?.textContent?.trim();
    const tabDesc = activeTab?.querySelector(".text-secondary, .text-\\[13px\\]")?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img =
      document.querySelector(".pilot-ce-scene-interactive-master-image") ||
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image");
    const imgEl = img?.tagName === "IMG" ? img : img;
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const magnifier = document.querySelector(".pilot-ce-magnifier-lens, .pilot-ce-magnifier-hint");
    return {
      hasEyebrow: Boolean(eyebrow?.offsetParent),
      eyebrowText: eyebrow?.textContent?.trim() || null,
      tabTitle,
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateTitle: tabTitle && detailH3 && tabTitle === detailH3,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(imgEl),
      objectFit: imgEl ? getComputedStyle(imgEl).objectFit : null,
      overflow,
      hasMagnifier: Boolean(magnifier && magnifier.offsetParent !== null),
      hasStateImageStage: Boolean(document.querySelector(".pilot-ce-state-image-stage")),
    };
  });
}

async function testDaycare(page, results) {
  const route = "/daycare-private-school-insurance/";
  const states = [];
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollToExplorer(page);
  const tabs = await page.$$(".pilot-product-coverage-card");
  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 400));
    const s = await getExplorerState(page);
    states.push({ index: i, ...s });
  }
  const keyboardOk = await page.evaluate(() => {
    const tab = document.querySelector(".pilot-product-coverage-card.is-active");
    tab?.focus();
    tab?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    return Boolean(document.querySelector(".pilot-product-coverage-card.is-active"));
  });
  results.daycare = {
    stateCount: states.length,
    states,
    allDetailTitlesMatch: states.every((s, i) => s.detailTitle === DAYCARE_DETAIL_TITLES[i]),
    noDuplicateText: states.every((s) => !s.duplicateTitle && !s.duplicateDesc),
    noEyebrow: states.every((s) => !s.hasEyebrow),
    keyboardOk,
    pass:
      states.length === 6 &&
      states.every((s, i) => s.detailTitle === DAYCARE_DETAIL_TITLES[i]) &&
      states.every((s) => !s.duplicateTitle && !s.duplicateDesc) &&
      states.every((s) => !s.hasEyebrow) &&
      states.every((s) => s.overflow === 0),
  };
}

async function testRestaurant(page, results) {
  await page.goto(`${BASE}/restaurant-insurance/`, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollToExplorer(page);
  const tabs = await page.$$(".pilot-product-coverage-card");
  const states = [];
  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 500));
    states.push(await getExplorerState(page));
  }
  await page.setViewport({ width: 1440, height: 900, hasTouch: false });
  await new Promise((r) => setTimeout(r, 300));
  const desktopMagnifier = await page.evaluate(
    () =>
      Boolean(
        document.querySelector(".pilot-ce-magnifier-lens, .pilot-ce-magnifier-hint"),
      ),
  );
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await new Promise((r) => setTimeout(r, 300));
  const mobilePage = await page.browser().newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true });
  await mobilePage.goto(`${BASE}/restaurant-insurance/`, { waitUntil: "networkidle0", timeout: 60000 });
  await mobilePage.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 600));
  const mobileMagnifierHidden = await mobilePage.evaluate(() => {
    const m = document.querySelector(".pilot-ce-magnifier-lens, .pilot-ce-magnifier-hint");
    return !m;
  });
  await mobilePage.close();
  results.restaurant = {
    stateCount: states.length,
    fallbackDetail: states.every((s) => s.detailTitle && s.detailDescription),
    noEyebrow: states.every((s) => !s.hasEyebrow),
    hasStateImages: states.every((s) => s.hasStateImageStage),
    objectFitContain: states.every((s) => s.objectFit === "contain"),
    desktopMagnifier,
    mobileMagnifierHidden,
    pass:
      states.length >= 4 &&
      states.every((s) => s.detailTitle && s.detailDescription) &&
      states.every((s) => !s.hasEyebrow) &&
      desktopMagnifier &&
      mobileMagnifierHidden,
  };
}

async function testContractors(page, results) {
  await page.goto(`${BASE}/contractors-insurance/`, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollToExplorer(page);
  const tabs = await page.$$(".pilot-product-coverage-card");
  const states = [];
  for (let i = 0; i < tabs.length; i++) {
    await tabs[i].click();
    await new Promise((r) => setTimeout(r, 400));
    states.push(await getExplorerState(page));
  }
  const noAnimation = await page.evaluate(
    () => !document.querySelector(".pilot-ce-falling-tool, .pilot-ce-motion-prototype"),
  );
  results.contractors = {
    stateCount: states.length,
    fallbackDetail: states.every((s) => s.detailTitle && s.detailDescription),
    noEyebrow: states.every((s) => !s.hasEyebrow),
    staticImages: states.every((s) => s.hasStateImageStage),
    noAnimation,
    pass:
      states.length >= 4 &&
      states.every((s) => s.detailTitle && s.detailDescription) &&
      states.every((s) => !s.hasEyebrow) &&
      noAnimation,
  };
}

async function testNormalRoutes(page, results) {
  results.normalRoutes = [];
  for (const route of NORMAL_ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await scrollToExplorer(page);
    const s = await getExplorerState(page);
    results.normalRoutes.push({
      route,
      ...s,
      pass: s.hasImage && s.detailTitle && s.detailDescription && s.overflow === 0 && !s.hasEyebrow,
    });
  }
}

async function testViewports(page, results) {
  results.viewports = [];
  await page.goto(`${BASE}/daycare-private-school-insurance/`, { waitUntil: "domcontentloaded" });
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
    await new Promise((r) => setTimeout(r, 350));
    await scrollToExplorer(page);
    const s = await getExplorerState(page);
    results.viewports.push({
      viewport: vp.name,
      overflow: s.overflow,
      hasExplorer: s.hasImage,
      pass: s.overflow === 0 && s.hasImage,
    });
  }
}

async function captureScreenshots(page) {
  const shots = [
    { route: "/daycare-private-school-insurance/", name: "daycare-desktop_1440", w: 1440, h: 900 },
    { route: "/daycare-private-school-insurance/", name: "daycare-mobile_390", w: 390, h: 844, mobile: true },
    { route: "/restaurant-insurance/", name: "restaurant-desktop_1440", w: 1440, h: 900 },
    { route: "/contractors-insurance/", name: "contractors-desktop_1440", w: 1440, h: 900 },
    { route: "/home-insurance/", name: "home-insurance-desktop_1440", w: 1440, h: 900 },
  ];
  for (const shot of shots) {
    await page.setViewport({ width: shot.w, height: shot.h, isMobile: shot.mobile || false });
    await page.goto(`${BASE}${shot.route}`, { waitUntil: "networkidle0", timeout: 60000 });
    await scrollToExplorer(page);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUT, `${shot.name}.png`),
      fullPage: shot.name.includes("mobile") ? true : false,
    });
  }
  // Update legacy daycare screenshot paths
  fs.copyFileSync(
    path.join(OUT, "daycare-desktop_1440.png"),
    path.join(__dirname, "../docs/qa-screenshots/daycare-content-2026-09-07/desktop_1440.png"),
  );
  fs.copyFileSync(
    path.join(OUT, "daycare-mobile_390.png"),
    path.join(__dirname, "../docs/qa-screenshots/daycare-content-2026-09-07/mobile_390.png"),
  );
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    const original = window.matchMedia.bind(window);
    window.matchMedia = (query) => {
      if (query.includes("pointer: fine") || query.includes("(pointer: fine)")) {
        return {
          matches: true,
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        };
      }
      return original(query);
    };
  });
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  const results = { consoleErrors };
  await testDaycare(page, results);
  await testRestaurant(page, results);
  await testContractors(page, results);
  await testNormalRoutes(page, results);
  await testViewports(page, results);
  await captureScreenshots(page);

  await browser.close();

  results.pass =
    results.daycare?.pass &&
    results.restaurant?.pass &&
    results.contractors?.pass &&
    results.normalRoutes?.every((r) => r.pass) &&
    results.viewports?.every((v) => v.pass) &&
    consoleErrors.length === 0;

  fs.writeFileSync(path.join(OUT, "regression.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ pass: results.pass, daycare: results.daycare?.pass, restaurant: results.restaurant?.pass, contractors: results.contractors?.pass }, null, 2));
  process.exit(results.pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
