/**
 * Final release-candidate QA + screenshots.
 * BASE_URL=http://127.0.0.1:3460 node scripts/qa-final-release-candidate.mjs
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3460";
const OUT = path.resolve(
  "docs/qa-screenshots/final-release-candidate-2026-10-01",
);
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function clearConsent(page) {
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    document.cookie.split(";").forEach((c) => {
      const n = c.split("=")[0]?.trim();
      if (n) document.cookie = `${n}=; Max-Age=0; Path=/`;
    });
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
  });
  await page.reload({ waitUntil: "networkidle2" });
  await sleep(400);
}

async function acceptAll(page) {
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      /^Accept all$/i.test((b.textContent || "").trim()),
    );
    btn?.click();
  });
  await sleep(900);
}

async function dataLayerEvents(page) {
  return page.evaluate(() =>
    (window.dataLayer || [])
      .filter((e) => e && typeof e === "object" && typeof e.event === "string")
      .map((e) => e),
  );
}

async function shot(page, name) {
  await page.screenshot({
    path: path.join(OUT, name),
    fullPage: false,
  });
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(25000);
  const report = {
    analytics: {},
    inventory: {},
    viewports: {},
    checks: {},
  };

  // Homepage inventory + regressive content
  await page.setViewport({ width: 1440, height: 900 });
  await clearConsent(page);
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await sleep(500);
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((n) =>
      n.classList.add("is-revealed"),
    );
  });

  report.inventory = await page.evaluate(() => {
    const personal = Array.from(
      document.querySelectorAll("[data-track='personal_product_select']"),
    ).map((el) => el.getAttribute("data-track-product-slug"));
    const commercialTabs = document.querySelectorAll(
      '[role="tab"], [data-category-id], .pilot-commercial-cat, button[aria-controls*="commercial"]',
    );
    // commercial category buttons on homepage
    const catButtons = Array.from(
      document.querySelectorAll("button"),
    ).filter((b) => b.closest('[aria-label*="commercial" i], [class*="commercial" i], section'));
    const sections = {
      hasTeamSection: /real brokers/i.test(document.body.innerText) &&
        !!document.querySelector('[aria-labelledby*="team"], #pilot-team'),
      hasHomesPill: /2,?400\+?\s*homes/i.test(document.body.innerText),
      hasDevPlacesCopy: /Places API credentials/i.test(document.body.innerText),
      hasOracleGiantCell: !!document.querySelector(
        ".pilot-authority-strip [class*='oracle']",
      ),
      personalAutoplay: getComputedStyle(
        document.querySelector(".pilot-personal-filmstrip-track, [class*='filmstrip']") ||
          document.body,
      ).animationName,
    };
    // carrier names from marquee alt/text
    const carrierText = Array.from(
      document.querySelectorAll(".pilot-carrier-rail img, .pilot-carrier-rail [aria-label]"),
    ).map((el) => el.getAttribute("alt") || el.getAttribute("aria-label") || "");
    return {
      personalUnique: [...new Set(personal.filter(Boolean))].length,
      personalSlugs: [...new Set(personal.filter(Boolean))],
      commercialTabCount: document.querySelectorAll(
        '[role="tablist"] [role="tab"]',
      ).length,
      carrierLabels: carrierText.filter(Boolean).slice(0, 20),
      ...sections,
      gtmScripts: document.querySelectorAll("script[data-pib-gtm], script[src*='gtm.js']")
        .length,
      gtmId:
        document
          .querySelector("script[data-pib-gtm]")
          ?.getAttribute("data-pib-gtm") || null,
      gaDirect: document.querySelectorAll(
        'script[src*="gtag/js"], script[src*="googletagmanager.com/gtag"]',
      ).length,
      clarityBeforeConsent: !!document.querySelector("script[data-pib-clarity]"),
    };
  });

  // Screenshots homepage viewports
  for (const w of [390, 430, 1440, 1920]) {
    await page.setViewport({
      width: w,
      height: w < 768 ? 844 : 900,
    });
    await page.goto(BASE + "/", { waitUntil: "networkidle2" });
    await sleep(400);
    await page.evaluate(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((n) =>
        n.classList.add("is-revealed"),
      );
    });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    report.viewports[w] = { overflow, pass: !overflow };
    await shot(page, `homepage-${w}.png`);
  }

  // Accept analytics and test stale menu + SPA page_view
  await page.setViewport({ width: 1440, height: 900 });
  await clearConsent(page);
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await sleep(400);
  // Before consent: no page_view
  let dl = await dataLayerEvents(page);
  report.analytics.beforeConsentPageView = dl.some((e) => e.event === "page_view");

  await acceptAll(page);
  dl = await dataLayerEvents(page);
  report.analytics.afterAcceptPageView = dl.some((e) => e.event === "page_view");
  report.analytics.gtmIdAfterAccept = await page.evaluate(
    () =>
      document
        .querySelector("script[data-pib-gtm]")
        ?.getAttribute("data-pib-gtm") || null,
  );
  report.analytics.clarityAfterAccept = await page.evaluate(
    () => !!document.querySelector("script[data-pib-clarity]"),
  );
  report.analytics.gaDirectTags = await page.evaluate(
    () =>
      document.querySelectorAll(
        'script[src*="gtag/js?id="], script[src*="googletagmanager.com/gtag/js"]',
      ).length,
  );

  // Open resources menu then get quote — stale menu check
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      /^Resources$/i.test((b.textContent || "").trim()),
    );
    btn?.dispatchEvent(
      new MouseEvent("mouseenter", { bubbles: true, view: window }),
    );
    btn?.click();
  });
  await sleep(500);
  dl = await dataLayerEvents(page);
  const navOpen = [...dl].reverse().find((e) => e.event === "nav_open");
  await page.evaluate(() => {
    document.querySelectorAll("a[href*='get-a-quote']").forEach((a) => {
      a.addEventListener("click", (e) => e.preventDefault(), true);
    });
    const a = document.querySelector('header a[href*="get-a-quote"]');
    a?.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        composed: true,
        view: window,
      }),
    );
  });
  await sleep(400);
  dl = await dataLayerEvents(page);
  const gq = [...dl].reverse().find((e) => e.event === "get_quote_click");
  report.analytics.staleMenu = {
    navOpenMenu: navOpen?.menu ?? null,
    getQuoteMenu: gq?.menu ?? "MISSING_KEY",
    getQuoteLocation: gq?.location ?? null,
    getQuoteDestination: gq?.destination_id ?? null,
    getQuotePageType: gq?.page_type ?? "MISSING_KEY",
    pass: gq != null && gq.menu === null && gq.page_type === null,
  };

  // SPA page_view
  await page.goto(BASE + "/auto-insurance/", { waitUntil: "networkidle2" });
  await sleep(600);
  dl = await dataLayerEvents(page);
  report.analytics.spaPageView = dl.some(
    (e) => e.event === "page_view" && e.page_slug === "auto-insurance",
  );
  report.analytics.productView = dl.some((e) => e.event === "product_view");

  // Reject path
  await clearConsent(page);
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await sleep(400);
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      /Reject non-essential/i.test(b.textContent || ""),
    );
    btn?.click();
  });
  await sleep(700);
  await page.goto(BASE + "/auto-insurance/", { waitUntil: "networkidle2" });
  await sleep(500);
  dl = await dataLayerEvents(page);
  report.analytics.rejectNoPageView = !dl.some((e) => e.event === "page_view");
  report.analytics.rejectNoClarity = !(await page.evaluate(
    () => !!document.querySelector("script[data-pib-clarity]"),
  ));

  // Representative section screenshots (accept first for clean UI)
  await clearConsent(page);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await acceptAll(page);
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((n) =>
      n.classList.add("is-revealed"),
    );
  });

  const scrollShot = async (selector, file) => {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "center" });
    }, selector);
    await sleep(350);
    await shot(page, file);
  };

  await scrollShot(
    "#pilot-google-reviews-heading, [aria-labelledby*='google']",
    "desktop-google-reviews.png",
  );
  // awards / local proof
  await scrollShot(
    "#pilot-local-proof-heading, [aria-labelledby*='award'], [aria-labelledby*='local']",
    "desktop-awards-local.png",
  );
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(300);
  await shot(page, "desktop-footer.png");

  // Mega menu
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      /^Personal$/i.test((b.textContent || "").trim()),
    );
    btn?.click();
  });
  await sleep(400);
  await shot(page, "desktop-megamenu-personal.png");

  // Product pages
  await page.goto(BASE + "/auto-insurance/", { waitUntil: "networkidle2" });
  await sleep(500);
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((n) =>
      n.classList.add("is-revealed"),
    );
  });
  await shot(page, "desktop-personal-product-auto.png");
  await page.evaluate(() => {
    document
      .querySelector(
        ".pilot-product-explorer-stage, .pilot-auto-explorer-stage, [aria-labelledby*='coverage']",
      )
      ?.scrollIntoView({ block: "center" });
  });
  await sleep(400);
  await shot(page, "desktop-coverage-explorer-auto.png");

  await page.goto(BASE + "/restaurant-insurance/", {
    waitUntil: "networkidle2",
  });
  await sleep(500);
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((n) =>
      n.classList.add("is-revealed"),
    );
  });
  await shot(page, "desktop-commercial-product-restaurant.png");

  await page.goto(BASE + "/get-a-quote/", { waitUntil: "networkidle2" });
  await sleep(400);
  await shot(page, "desktop-quote.png");

  await page.goto(BASE + "/contact/", { waitUntil: "networkidle2" });
  await sleep(400);
  await shot(page, "desktop-contact.png");

  await page.goto(BASE + "/careers/", { waitUntil: "networkidle2" });
  await sleep(400);
  await shot(page, "desktop-careers.png");

  // Mobile homepage + menu
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await sleep(400);
  await shot(page, "mobile-390-homepage.png");
  await page.evaluate(() => {
    const btn = document.querySelector(
      'header button[aria-label*="menu" i], header button[aria-expanded]',
    );
    btn?.click();
  });
  await sleep(400);
  await shot(page, "mobile-390-nav.png");

  fs.writeFileSync(
    path.join(OUT, "qa-results.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
