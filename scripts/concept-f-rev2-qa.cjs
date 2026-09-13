#!/usr/bin/env node
/**
 * Concept F Owner Visual Revision 2 — QA + screenshots.
 * BASE_URL=http://127.0.0.1:3020 node scripts/concept-f-rev2-qa.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3020";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/homepage-authority-concept-f-rev2-2026-09-12",
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

const FULLPAGE = new Set(["390", "1440", "1920"]);

const SECTIONS = [
  { id: "hero-authority", selector: "#hero" },
  { id: "authority-strip", selector: ".pilot-authority-strip" },
  { id: "personal", selector: "#pilot-personal-filmstrip-heading" },
  {
    id: "commercial",
    selector: '[role="tablist"][aria-label="Commercial insurance categories"]',
  },
  { id: "why-premium", selector: "#pilot-why-premium-heading" },
  { id: "google", selector: "#pilot-google-reviews-heading" },
  { id: "awards", selector: "#awards-heading" },
  { id: "windsor", selector: "#pilot-windsor-oracle-heading" },
  { id: "final-cta", selector: "#pilot-final-cta-heading" },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function forceReveal(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((node) => {
      node.classList.add("is-revealed");
    });
  });
}

async function auditViewport(page, vp) {
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    isMobile: Boolean(vp.isMobile),
  });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-authority-strip", { timeout: 30000 });
  await forceReveal(page);
  await new Promise((r) => setTimeout(r, 700));

  return page.evaluate(() => {
    const doc = document.documentElement;
    const bodyText = document.body.innerText || "";
    const authorityText =
      document.querySelector(".pilot-authority-strip")?.textContent || "";

    const personalHrefs = new Set(
      [...document.querySelectorAll("a.pilot-filmstrip-frame")]
        .map((a) => a.getAttribute("href"))
        .filter(Boolean),
    );

    const commercialTabs = document.querySelectorAll(
      '[role="tablist"][aria-label="Commercial insurance categories"] [role="tab"], [role="tablist"][aria-label="Commercial insurance categories"] button',
    ).length;

    const googleSection = document
      .querySelector("#pilot-google-reviews-heading")
      ?.closest("section");

    const personalTrack = document.querySelector(
      ".pilot-personal-editorial-track",
    );
    const personalAnim = personalTrack
      ? getComputedStyle(personalTrack).animationName
      : "none";

    return {
      overflowX: doc.scrollWidth > doc.clientWidth + 1,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      hasTeamSection: Boolean(document.querySelector("#pilot-team-heading")),
      hasHomesPill: /2,?400\+?\s*homes/i.test(bodyText),
      authorityHasOracleCell: /A Division of\s*Oracle/i.test(authorityText),
      authorityHasGoogle: /Google/i.test(authorityText),
      authorityHasClients: /2,?700/.test(authorityText),
      personalEditorial: Boolean(
        document.querySelector(".pilot-personal-editorial-scroller"),
      ),
      personalUniqueHrefs: personalHrefs.size,
      personalAutoplayAnimation:
        personalAnim && personalAnim !== "none" ? personalAnim : "none",
      googleMajor: Boolean(
        document.querySelector("#pilot-google-reviews-heading"),
      ),
      googleMinHeight: googleSection
        ? Math.round(googleSection.getBoundingClientRect().height)
        : 0,
      commercialTabs,
      whyPremium: Boolean(document.querySelector("#pilot-why-premium-heading")),
      windsor: Boolean(document.querySelector("#pilot-windsor-oracle-heading")),
      yep: Boolean(
        document.querySelector("#pilot-yep-heading") ||
          document.querySelector(".pilot-section-yep"),
      ),
      awards: Boolean(
        document.querySelector("#awards-heading") ||
          document.querySelector("#pilot-local-heading"),
      ),
      finalCta: Boolean(document.querySelector("#pilot-final-cta-heading")),
    };
  });
}

async function captureSection(page, section, dir) {
  const box = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const target = el.closest("section") || el;
    target.scrollIntoView({ block: "center" });
    const r = target.getBoundingClientRect();
    return {
      x: Math.max(0, Math.floor(r.left)),
      y: Math.max(0, Math.floor(window.scrollY + r.top)),
      width: Math.max(1, Math.floor(Math.min(window.innerWidth, r.width))),
      height: Math.max(40, Math.floor(Math.min(1800, r.height))),
    };
  }, section.selector);

  if (!box) return { id: section.id, ok: false, reason: "missing" };
  await new Promise((r) => setTimeout(r, 200));
  const file = path.join(dir, `${section.id}.png`);
  await page.screenshot({ path: file, clip: box });
  const bytes = fs.statSync(file).size;
  return { id: section.id, ok: bytes > 4000, bytes };
}

async function personalInteraction(page) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-personal-editorial-scroller", {
    timeout: 30000,
  });

  return page.evaluate(async () => {
    const scroller = document.querySelector(".pilot-personal-editorial-scroller");
    const nextBtn = document.querySelector(
      'button[aria-label="Next personal insurance product"]',
    );
    const cards = [...document.querySelectorAll("a.pilot-filmstrip-frame")];
    const hrefs = [
      ...new Set(cards.map((a) => a.getAttribute("href")).filter(Boolean)),
    ];
    const before = scroller ? scroller.scrollLeft : -1;
    nextBtn?.click();
    await new Promise((r) => setTimeout(r, 500));
    const afterNext = scroller ? scroller.scrollLeft : -1;
    const track = document.querySelector(".pilot-personal-editorial-track");
    const animationName = track
      ? getComputedStyle(track).animationName || "none"
      : "none";

    return {
      uniqueHrefs: hrefs.length,
      hrefs,
      scrollMovedOnNext: afterNext !== before,
      animationName: animationName === "none" ? "none" : animationName,
      hasLegacyAutoplayTrack: Boolean(
        document.querySelector(".pilot-filmstrip-track-dense"),
      ),
    };
  });
}

async function main() {
  ensureDir(OUT);
  ensureDir(path.join(OUT, "screenshots"));
  ensureDir(path.join(OUT, "screenshots", "sections-1440"));

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);

  const audits = [];
  const errors = [];

  for (const vp of VIEWPORTS) {
    const row = await auditViewport(page, vp);
    audits.push({ viewport: vp.name, ...row });

    if (row.overflowX) {
      errors.push(
        `${vp.name}: horizontal overflow ${row.scrollWidth}>${row.clientWidth}`,
      );
    }
    if (row.hasTeamSection) errors.push(`${vp.name}: team section still present`);
    if (row.hasHomesPill) errors.push(`${vp.name}: homes pill still present`);
    if (row.authorityHasOracleCell) {
      errors.push(`${vp.name}: Oracle still in authority strip`);
    }
    if (!row.authorityHasGoogle) errors.push(`${vp.name}: Google missing from strip`);
    if (!row.authorityHasClients) errors.push(`${vp.name}: clients missing from strip`);
    if (!row.personalEditorial) errors.push(`${vp.name}: personal editorial missing`);
    if (row.personalUniqueHrefs < 14) {
      errors.push(`${vp.name}: personal hrefs ${row.personalUniqueHrefs} < 14`);
    }
    if (row.personalAutoplayAnimation !== "none") {
      errors.push(`${vp.name}: personal autoplay ${row.personalAutoplayAnimation}`);
    }
    if (!row.googleMajor) errors.push(`${vp.name}: google section missing`);
    if (vp.width >= 1024 && row.googleMinHeight < 400) {
      errors.push(`${vp.name}: google height ${row.googleMinHeight} < 400`);
    }
    if (row.commercialTabs !== 10) {
      errors.push(`${vp.name}: commercial tabs ${row.commercialTabs}`);
    }
    for (const key of ["whyPremium", "windsor", "yep", "awards", "finalCta"]) {
      if (!row[key]) errors.push(`${vp.name}: missing ${key}`);
    }

    if (FULLPAGE.has(vp.name)) {
      await forceReveal(page);
      await page.screenshot({
        path: path.join(OUT, "screenshots", `homepage-full-${vp.name}.png`),
        fullPage: true,
      });
    }
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-authority-strip", { timeout: 30000 });
  await forceReveal(page);
  await new Promise((r) => setTimeout(r, 500));

  const heroAuth = await page.evaluate(() => {
    const hero = document.querySelector("#hero");
    const strip = document.querySelector(".pilot-authority-strip");
    if (!hero || !strip) return null;
    const a = hero.getBoundingClientRect();
    const b = strip.getBoundingClientRect();
    return {
      x: 0,
      y: Math.max(0, Math.floor(window.scrollY + a.top)),
      width: window.innerWidth,
      height: Math.max(120, Math.floor(b.bottom - a.top + 8)),
    };
  });
  if (heroAuth) {
    await page.screenshot({
      path: path.join(OUT, "screenshots", "sections-1440", "hero-authority.png"),
      clip: heroAuth,
    });
  }

  const sectionResults = [];
  for (const section of SECTIONS) {
    sectionResults.push(
      await captureSection(
        page,
        section,
        path.join(OUT, "screenshots", "sections-1440"),
      ),
    );
  }

  const personalIx = await personalInteraction(page);
  if (personalIx.uniqueHrefs < 14) {
    errors.push(`personal interaction hrefs ${personalIx.uniqueHrefs}`);
  }
  if (personalIx.animationName !== "none") {
    errors.push(`personal animation ${personalIx.animationName}`);
  }
  if (personalIx.hasLegacyAutoplayTrack) {
    errors.push("legacy personal autoplay track still present");
  }
  if (!personalIx.scrollMovedOnNext) {
    errors.push("personal next arrow did not move scroller");
  }

  await browser.close();

  const report = {
    ok: errors.length === 0,
    revision: 2,
    base: BASE,
    generatedAt: new Date().toISOString(),
    audits,
    sectionResults,
    personalInteraction: personalIx,
    errors,
  };
  fs.writeFileSync(path.join(OUT, "qa-results.json"), JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      {
        ok: report.ok,
        errorCount: errors.length,
        errors,
        personalIx,
        sectionOk: sectionResults.filter((s) => s.ok).length,
      },
      null,
      2,
    ),
  );
  if (errors.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
