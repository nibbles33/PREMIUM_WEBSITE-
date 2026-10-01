#!/usr/bin/env node
/**
 * Personal Insurance completeness QA — all 14 products at 1440 + 390.
 * Run: BASE_URL=http://127.0.0.1:3000 node scripts/personal-completeness-qa.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/personal-completeness-2026-10-01",
);

const PRODUCTS = [
  { name: "Auto Insurance", route: "/auto-insurance/", minCards: 4 },
  { name: "Motorcycle Insurance", route: "/motorcycle-insurance/", minCards: 4 },
  { name: "Boat Insurance", route: "/boat-insurance/", minCards: 4 },
  { name: "Travel Insurance", route: "/travel-insurance/", minCards: 4 },
  { name: "Home Insurance", route: "/home-insurance/", minCards: 4 },
  { name: "Condo Insurance", route: "/condo-insurance/", minCards: 4 },
  { name: "Tenant Insurance", route: "/tenant-insurance/", minCards: 4 },
  { name: "Landlord Insurance", route: "/landlord-insurance/", minCards: 4 },
  { name: "Cottage Insurance", route: "/cottage-insurance/", minCards: 4 },
  {
    name: "Mobile / Manufactured Home",
    route: "/mobile-home-insurance/",
    minCards: 4,
  },
  {
    name: "Personal Umbrella",
    route: "/personal-umbrella-insurance/",
    minCards: 4,
  },
  { name: "Life Insurance", route: "/life-insurance/", minCards: 3 },
  {
    name: "Group Home & Auto",
    route: "/group-home-auto-insurance/",
    minCards: 3,
  },
  { name: "Home & Ride Sharing", route: "/home-sharing-insurance/", minCards: 4 },
];

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844, isMobile: true },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function auditPage(page, product, viewport) {
  const url = `${BASE}${product.route}`;
  const result = {
    product: product.name,
    route: product.route,
    viewport: viewport.name,
    status: "PASS",
    issues: [],
    coverageCount: 0,
    ctaHref: null,
    overflowX: false,
    brokenImages: 0,
    selectedWorks: false,
  };

  const response = await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  if (!response || response.status() >= 400) {
    result.status = "FAIL";
    result.issues.push(`HTTP ${response ? response.status() : "none"}`);
    return result;
  }

  await page.waitForSelector("h1", { timeout: 15000 });

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflowX = doc.scrollWidth > doc.clientWidth + 1;
    const imgs = [...document.querySelectorAll("img")];
    const brokenImages = imgs.filter(
      (img) => !img.complete || img.naturalWidth === 0,
    ).length;

    const coverageSection =
      document.querySelector("[data-coverage-explorer]") ||
      [...document.querySelectorAll("section")].find((s) =>
        /what'?s covered/i.test(s.textContent || ""),
      );

    const buttons = coverageSection
      ? [
          ...coverageSection.querySelectorAll(
            'button, [role="tab"], [role="button"]',
          ),
        ]
      : [];
    const cardLike = coverageSection
      ? [
          ...coverageSection.querySelectorAll(
            'button, [role="tab"], [data-coverage-id], .pilot-coverage-card, [class*="coverage"] button',
          ),
        ]
      : [];

    const primaryCta =
      document.querySelector('a[href*="get-a-quote"]') ||
      document.querySelector('a[href*="contact"]') ||
      document.querySelector('a[href*="inquiry"]');

    const bodyText = document.body.innerText || "";
    const genericFiller = /Provides liability coverage\.|Your policy covers/i.test(
      bodyText,
    );
    const landlordBleed =
      /cottage/i.test(location.pathname) &&
      /landlord-owned fixtures/i.test(bodyText);

    return {
      overflowX,
      brokenImages,
      coverageButtonCount: Math.max(buttons.length, cardLike.length),
      ctaHref: primaryCta ? primaryCta.getAttribute("href") : null,
      genericFiller,
      landlordBleed,
      h1: document.querySelector("h1")?.textContent?.trim() || "",
    };
  });

  result.coverageCount = metrics.coverageButtonCount;
  result.ctaHref = metrics.ctaHref;
  result.overflowX = metrics.overflowX;
  result.brokenImages = metrics.brokenImages;

  if (metrics.overflowX) {
    result.status = "FAIL";
    result.issues.push("horizontal overflow");
  }
  if (metrics.brokenImages > 0) {
    result.status = "FAIL";
    result.issues.push(`${metrics.brokenImages} broken images`);
  }
  if (metrics.coverageButtonCount < product.minCards) {
    result.status = "FAIL";
    result.issues.push(
      `coverage controls ${metrics.coverageButtonCount} < ${product.minCards}`,
    );
  }
  if (!metrics.ctaHref) {
    result.status = "FAIL";
    result.issues.push("missing CTA");
  }
  if (metrics.genericFiller) {
    result.status = "FAIL";
    result.issues.push("generic filler / guarantee wording");
  }
  if (metrics.landlordBleed) {
    result.status = "FAIL";
    result.issues.push("cottage landlord copy bleed");
  }

  // Interaction: click second coverage control if present
  try {
    const clicked = await page.evaluate(() => {
      const coverageSection =
        document.querySelector("[data-coverage-explorer]") ||
        [...document.querySelectorAll("section")].find((s) =>
          /what'?s covered/i.test(s.textContent || ""),
        );
      if (!coverageSection) return false;
      const controls = [
        ...coverageSection.querySelectorAll(
          'button, [role="tab"], [role="button"]',
        ),
      ].filter((el) => (el.textContent || "").trim().length > 0);
      if (controls.length < 2) return false;
      controls[1].click();
      return true;
    });
    if (clicked) {
      await new Promise((r) => setTimeout(r, 350));
      result.selectedWorks = true;
    } else {
      result.selectedWorks = metrics.coverageButtonCount > 0;
    }
  } catch (err) {
    result.issues.push(`interaction error: ${err.message}`);
    result.status = "FAIL";
  }

  const shotName = `${product.route.replace(/\//g, "").replace(/-insurance$/, "") || "auto"}-${viewport.name}.png`;
  await page.screenshot({
    path: path.join(OUT, shotName),
    fullPage: false,
  });

  return result;
}

async function main() {
  ensureDir(OUT);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const rows = [];

  for (const viewport of VIEWPORTS) {
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      isMobile: !!viewport.isMobile,
      deviceScaleFactor: 1,
    });
    for (const product of PRODUCTS) {
      const row = await auditPage(page, product, viewport);
      rows.push(row);
      console.log(
        `${viewport.name.padEnd(4)} ${product.name.padEnd(28)} ${row.status} cards=${row.coverageCount} cta=${row.ctaHref || "NONE"} ${row.issues.join("; ")}`,
      );
    }
  }

  // CTA route resolution sample
  const ctaChecks = [];
  for (const product of PRODUCTS) {
    const desktop = rows.find(
      (r) => r.product === product.name && r.viewport === "1440",
    );
    if (!desktop?.ctaHref) continue;
    const href = desktop.ctaHref.startsWith("http")
      ? desktop.ctaHref
      : new URL(desktop.ctaHref, BASE).pathname +
        (desktop.ctaHref.includes("?")
          ? "?" + desktop.ctaHref.split("?")[1]
          : "");
    const target = desktop.ctaHref.startsWith("http")
      ? desktop.ctaHref
      : `${BASE}${desktop.ctaHref.startsWith("/") ? "" : "/"}${desktop.ctaHref}`;
    try {
      const res = await page.goto(target, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      ctaChecks.push({
        product: product.name,
        href: desktop.ctaHref,
        status: res ? res.status() : 0,
        ok: !!res && res.status() < 400,
      });
    } catch (err) {
      ctaChecks.push({
        product: product.name,
        href: desktop.ctaHref,
        status: 0,
        ok: false,
        error: err.message,
      });
    }
  }

  const summary = {
    base: BASE,
    generatedAt: new Date().toISOString(),
    pass1440: rows
      .filter((r) => r.viewport === "1440")
      .every((r) => r.status === "PASS"),
    pass390: rows
      .filter((r) => r.viewport === "390")
      .every((r) => r.status === "PASS"),
    overflowPass: rows.every((r) => !r.overflowX),
    ctaPass: ctaChecks.every((c) => c.ok),
    rows,
    ctaChecks,
  };

  fs.writeFileSync(
    path.join(OUT, "qa-results.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log("\nSUMMARY", {
    pass1440: summary.pass1440,
    pass390: summary.pass390,
    overflowPass: summary.overflowPass,
    ctaPass: summary.ctaPass,
  });

  await browser.close();
  if (
    !summary.pass1440 ||
    !summary.pass390 ||
    !summary.overflowPass ||
    !summary.ctaPass
  ) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
