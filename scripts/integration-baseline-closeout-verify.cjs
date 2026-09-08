#!/usr/bin/env node
/**
 * Integration baseline closeout verification
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/integration-baseline-closeout-2026-09-07");

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: true },
  { name: "1024", width: 1024, height: 900 },
  { name: "1280", width: 1280, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

async function filmstripSwipe(page) {
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-filmstrip-viewport", { timeout: 20000 });
  await page.evaluate(() => {
    document.querySelector(".pilot-filmstrip-viewport")?.scrollIntoView({ block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const before = await page.evaluate(() => ({
    progress: document.querySelector(".pilot-filmstrip-progress-fill")?.style.width,
    transform: document.querySelector(".pilot-filmstrip-inner")?.style.transform,
  }));

  const box = await page.$eval(".pilot-filmstrip-viewport", (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });

  const sx = box.x + box.w * 0.75;
  const sy = box.y + box.h / 2;
  await page.touchscreen.touchStart(sx, sy);
  for (let i = 1; i <= 15; i++) {
    await page.touchscreen.touchMove(sx - (150 * i) / 15, sy);
  }
  await page.touchscreen.touchEnd();
  await new Promise((r) => setTimeout(r, 500));

  const after = await page.evaluate(() => ({
    progress: document.querySelector(".pilot-filmstrip-progress-fill")?.style.width,
    transform: document.querySelector(".pilot-filmstrip-inner")?.style.transform,
    url: location.pathname,
  }));

  return {
    before,
    after,
    progressChanged: before.progress !== after.progress,
    transformChanged: before.transform !== after.transform,
    stayedOnHome: after.url === "/" || after.url === "",
    pass: (before.progress !== after.progress || before.transform !== after.transform) && (after.url === "/" || after.url === ""),
  };
}

async function overflowCheck(page, route, vp) {
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.mobile || false });
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 800));
  return page.evaluate(() => {
    const doc = document.documentElement;
    return {
      delta: doc.scrollWidth - doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
    };
  });
}

async function reducedMotionCheck(page) {
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2000));

  const home = await page.evaluate(() => {
    const filmstripInner = document.querySelector(".pilot-filmstrip-inner");
    const carrierTrack = document.querySelector(".pilot-infinite-rail-track");
    const t1 = filmstripInner?.style.transform;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          filmstripAutoplayPaused: t1 === filmstripInner?.style.transform,
          carrierAnimation: carrierTrack ? getComputedStyle(carrierTrack).animationName : null,
          carrierDuration: carrierTrack
            ? getComputedStyle(carrierTrack).animationDuration
            : null,
        });
      }, 1500);
    });
  });

  await page.goto(`${BASE}/restaurant-insurance/`, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1200));
  const restaurant = await page.evaluate(() => {
    const tabs = document.querySelectorAll(".pilot-product-coverage-card");
    if (tabs[1]) tabs[1].click();
    const stateImage = document.querySelector(".pilot-ce-state-image");
    const stack = document.querySelector(".pilot-ce-state-image-stack");
    const magnifier = document.querySelector(".pilot-ce-magnifier-lens");
    return {
      hasMagnifierStack: Boolean(stack),
      magnifierVisible: magnifier ? getComputedStyle(magnifier).display !== "none" : false,
      stateImageTransition: stateImage
        ? getComputedStyle(stateImage).transitionDuration
        : null,
    };
  });

  return { home, restaurant };
}

async function mobileNavCheck(page) {
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 800));

  const closedOverflow = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));

  await page.click('button[aria-controls="mobile-nav"]');
  await new Promise((r) => setTimeout(r, 400));

  // Expand accordion sections so nested primary links are accessible
  await page.evaluate(() => {
    const dialog = document.querySelector("#mobile-nav");
    if (!dialog) return;
    for (const btn of dialog.querySelectorAll("button[aria-expanded='false'][aria-controls]")) {
      if (btn.getAttribute("aria-controls") === "mobile-nav") continue;
      btn.click();
    }
  });
  await new Promise((r) => setTimeout(r, 400));

  const openState = await page.evaluate(() => {
    const dialog = document.querySelector("#mobile-nav");
    const links = dialog ? [...dialog.querySelectorAll("a[href]")] : [];
    const hrefs = links.map((a) => a.getAttribute("href")).filter(Boolean);
    return {
      open: Boolean(dialog),
      linkCount: links.length,
      bodyOverflow: document.body.style.overflow,
      sampleHrefs: hrefs.slice(0, 8),
      hasPersonalHome: hrefs.some((h) => h.includes("home-insurance")),
      hasBusinessCommercial: hrefs.some((h) => h.includes("commercial-insurance")),
      hasAbout: hrefs.includes("/about") || hrefs.includes("/about/"),
      hasBroker: hrefs.some((h) => h.includes("talk-to-a-broker")),
      dialogOverflow: dialog ? dialog.scrollWidth - dialog.clientWidth : 0,
    };
  });

  await page.click('button[aria-controls="mobile-nav"]');
  await new Promise((r) => setTimeout(r, 300));

  const closed = await page.evaluate(() => !document.querySelector("#mobile-nav"));

  const primaryLinksAccessible =
    openState.hasPersonalHome &&
    openState.hasBusinessCommercial &&
    openState.hasAbout &&
    openState.hasBroker;

  return {
    closedOverflow,
    openState,
    closed,
    errors,
    pass:
      openState.open &&
      openState.linkCount > 20 &&
      primaryLinksAccessible &&
      closed &&
      closedOverflow.overflow === 0 &&
      openState.dialogOverflow === 0 &&
      errors.length === 0,
  };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const results = { filmstrip: await filmstripSwipe(page), overflow: {}, viewports: {} };

  for (const vp of VIEWPORTS) {
    results.viewports[vp.name] = {};
    for (const route of ["/", "/cyber-insurance/", "/restaurant-insurance/"]) {
      results.viewports[vp.name][route] = await overflowCheck(page, route, vp);
    }
  }

  results.reducedMotion = await reducedMotionCheck(page);
  results.mobileNav = await mobileNavCheck(page);

  await browser.close();
  fs.writeFileSync(path.join(OUT, "closeout-verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({
    filmstrip: results.filmstrip,
    overflow1024Cyber: results.viewports["1024"]["/cyber-insurance/"],
    overflow1024Restaurant: results.viewports["1024"]["/restaurant-insurance/"],
    reducedMotion: results.reducedMotion,
    mobileNav: { pass: results.mobileNav.pass, linkCount: results.mobileNav.openState.linkCount },
  }, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
