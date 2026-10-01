#!/usr/bin/env node
/**
 * Homepage Authority Concept F — responsive QA + section screenshots.
 * Run: BASE_URL=http://127.0.0.1:3020 node scripts/concept-f-homepage-qa.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3020";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/homepage-authority-concept-f-2026-09-11",
);
const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "430", width: 430, height: 932, isMobile: true },
  { name: "768", width: 768, height: 1024, isMobile: true },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
  { name: "2560", width: 2560, height: 1440 },
  { name: "3440", width: 3440, height: 1440 },
  { name: "3840", width: 3840, height: 1600 },
];

const FULLPAGE_SHOTS = ["390", "1440", "1920", "2560"];

const SECTIONS = [
  { id: "hero-authority", selector: "#hero" },
  { id: "authority-strip", selector: ".pilot-authority-strip" },
  { id: "carrier", selector: "#pilot-carriers-heading" },
  { id: "personal", selector: "#pilot-personal-filmstrip-heading" },
  { id: "commercial", selector: ".bg-charcoal.py-12, section[aria-labelledby*='heading']" },
  { id: "why-premium", selector: "#pilot-why-premium-heading" },
  { id: "yep", selector: ".pilot-yep-rail, #pilot-yep-heading" },
  { id: "google", selector: "#pilot-google-reviews-heading" },
  { id: "awards", selector: "#pilot-local-heading" },
  { id: "windsor", selector: "#pilot-windsor-oracle-heading" },
  { id: "team", selector: "#pilot-team-heading" },
  { id: "final-cta", selector: "#pilot-final-cta-heading" },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function audit(page, vp) {
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    isMobile: Boolean(vp.isMobile),
  });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-authority-strip", { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));

  return page.evaluate(() => {
    const doc = document.documentElement;
    const text = (sel) => document.querySelector(sel)?.textContent?.trim() || "";
    const exists = (sel) => Boolean(document.querySelector(sel));
    const filmstripLinks = [
      ...document.querySelectorAll("a.pilot-filmstrip-frame:not([aria-hidden='true'])"),
    ];
    const uniqueFilmstrip = new Set(
      filmstripLinks.map((a) => a.getAttribute("href")).filter(Boolean),
    );
    const commercialTabs = document.querySelectorAll(
      '[role="tablist"][aria-label="Commercial insurance categories"] [role="tab"], [role="tablist"][aria-label="Commercial insurance categories"] button',
    ).length;
    const carrierCards = document.querySelectorAll(
      ".pilot-carrier-rail .partner-logo-card",
    ).length;
    const uniqueCarriers = new Set(
      [...document.querySelectorAll(".pilot-carrier-rail .partner-logo-card img")].map(
        (img) => img.getAttribute("alt") || img.getAttribute("src"),
      ),
    );

    return {
      horizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      hero: exists(".pilot-hero-immersive"),
      heroQuote: exists('#hero a[href="/get-a-quote/"], #hero a[href*="get-a-quote"]'),
      heroBroker: exists('#hero a[href*="intent=broker"], #hero a[href*="talk-to-a-broker"]'),
      authorityStrip: exists(".pilot-authority-strip"),
      authorityText: text(".pilot-authority-strip"),
      carrierHeading: text("#pilot-carriers-heading"),
      carrierRail: exists(".pilot-carrier-rail .pilot-infinite-rail-track"),
      carrierCardInstances: carrierCards,
      uniqueCarrierAlts: uniqueCarriers.size,
      personalHeading: text("#pilot-personal-filmstrip-heading"),
      homesProof: /2,400\+ homes covered/.test(document.body.innerText),
      uniquePersonalHrefs: uniqueFilmstrip.size,
      commercialHeading: /Serious insurance for serious businesses/.test(
        document.body.innerText,
      ),
      commercialTabs,
      whyPremium: exists("#pilot-why-premium-heading"),
      yepRail: exists(".pilot-yep-rail"),
      google: exists("#pilot-google-reviews-heading"),
      googleCta: exists('a[href*="share.google"]'),
      awards: exists("#pilot-local-heading"),
      awardsRail: exists(".pilot-awards-rail"),
      windsor: exists("#pilot-windsor-oracle-heading"),
      team: exists("#pilot-team-heading"),
      finalCta: exists("#pilot-final-cta-heading"),
      finalTaxonomy: /HOME\s*·\s*AUTO\s*·\s*BUSINESS\s*·\s*SPECIALTY/i.test(
        document.body.innerText,
      ),
    };
  });
}

async function captureSection(page, section, shotDir) {
  const handle = await page.$(section.selector);
  if (!handle) {
    // Fallback: find by heading id parent section
    const box = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const section = el.closest("section") || el;
      const rect = section.getBoundingClientRect();
      return {
        x: Math.max(0, rect.x),
        y: Math.max(0, window.scrollY + rect.y),
        width: Math.min(rect.width, window.innerWidth),
        height: Math.min(Math.max(rect.height, 120), 1400),
      };
    }, section.selector);
    if (!box) return { id: section.id, ok: false, reason: "missing" };
    await page.screenshot({
      path: path.join(shotDir, `${section.id}.png`),
      clip: {
        x: box.x,
        y: box.y,
        width: Math.max(1, Math.floor(box.width)),
        height: Math.max(1, Math.floor(box.height)),
      },
    });
    return { id: section.id, ok: true };
  }

  const sectionEl = await page.evaluateHandle((el) => el.closest("section") || el, handle);
  await sectionEl.asElement().screenshot({
    path: path.join(shotDir, `${section.id}.png`),
  });
  return { id: section.id, ok: true };
}

async function main() {
  ensureDir(OUT);
  const shotsDir = path.join(OUT, "screenshots");
  ensureDir(shotsDir);
  const sectionsDir = path.join(shotsDir, "sections-1440");
  ensureDir(sectionsDir);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=3840,1600"],
  });
  const page = await browser.newPage();
  const audits = [];
  const errors = [];

  for (const vp of VIEWPORTS) {
    const row = await audit(page, vp);
    audits.push({ viewport: vp.name, ...row });

    if (row.horizontalOverflow) {
      errors.push(`${vp.name}: horizontal overflow ${row.scrollWidth}>${row.clientWidth}`);
    }
    if (!row.hero || !row.heroQuote || !row.heroBroker) {
      errors.push(`${vp.name}: hero CTA incomplete`);
    }
    if (!row.authorityStrip) errors.push(`${vp.name}: missing authority strip`);
    if (!/More markets/.test(row.carrierHeading)) {
      errors.push(`${vp.name}: carrier heading mismatch`);
    }
    if (row.uniqueCarrierAlts < 12) {
      errors.push(`${vp.name}: expected ≥12 unique carriers, got ${row.uniqueCarrierAlts}`);
    }
    if (row.uniquePersonalHrefs < 14) {
      errors.push(`${vp.name}: expected 14 personal hrefs, got ${row.uniquePersonalHrefs}`);
    }
    if (row.commercialTabs !== 10) {
      errors.push(`${vp.name}: expected 10 commercial tabs, got ${row.commercialTabs}`);
    }
    for (const key of [
      "homesProof",
      "commercialHeading",
      "whyPremium",
      "yepRail",
      "google",
      "googleCta",
      "awards",
      "windsor",
      "team",
      "finalCta",
      "finalTaxonomy",
    ]) {
      if (!row[key]) errors.push(`${vp.name}: missing ${key}`);
    }

    if (FULLPAGE_SHOTS.includes(vp.name)) {
      await page.screenshot({
        path: path.join(shotsDir, `homepage-full-${vp.name}.png`),
        fullPage: true,
      });
    }
  }

  // Section captures at 1440
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-authority-strip", { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1000));

  // Hero + authority composite
  await page.evaluate(() => window.scrollTo(0, 0));
  const heroAuth = await page.evaluate(() => {
    const hero = document.querySelector("#hero");
    const strip = document.querySelector(".pilot-authority-strip");
    if (!hero || !strip) return null;
    const a = hero.getBoundingClientRect();
    const b = strip.getBoundingClientRect();
    return {
      x: 0,
      y: window.scrollY + a.y,
      width: window.innerWidth,
      height: Math.min(b.bottom - a.top + 8, 1600),
    };
  });
  if (heroAuth) {
    await page.screenshot({
      path: path.join(sectionsDir, "hero-authority.png"),
      clip: {
        x: heroAuth.x,
        y: Math.max(0, heroAuth.y),
        width: Math.floor(heroAuth.width),
        height: Math.floor(heroAuth.height),
      },
    });
  }

  const sectionResults = [];
  for (const section of SECTIONS) {
    try {
      const result = await captureSection(page, section, sectionsDir);
      sectionResults.push(result);
      if (!result.ok) errors.push(`section capture failed: ${section.id}`);
    } catch (err) {
      sectionResults.push({ id: section.id, ok: false, reason: String(err) });
      errors.push(`section capture error: ${section.id}`);
    }
  }

  await browser.close();

  const report = {
    ok: errors.length === 0,
    base: BASE,
    generatedAt: new Date().toISOString(),
    audits,
    sectionResults,
    errors,
  };
  fs.writeFileSync(path.join(OUT, "qa-results.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ok: report.ok, errorCount: errors.length, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
