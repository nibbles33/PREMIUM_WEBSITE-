#!/usr/bin/env node
/**
 * Responsive smoke for homepage commercial discovery section.
 * Run: BASE_URL=http://127.0.0.1:3025 node scripts/homepage-discovery-responsive-smoke.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3025";
const OUT_DIR = path.join(
  __dirname,
  "../docs/qa-screenshots/prelaunch-batch-2-5-2026-09-10",
);
const OUT_JSON = path.join(OUT_DIR, "homepage-discovery-responsive.json");

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "430", width: 430, height: 932, isMobile: true },
  { name: "768", width: 768, height: 1024, isMobile: true },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const CATEGORY_IDS = [
  "transportation",
  "construction",
  "property",
  "manufacturing",
  "hospitality",
  "professional",
  "retail",
  "health",
  "community",
  "specialty",
];

const EXPECTED_COUNTS = {
  transportation: 5,
  construction: 7,
  property: 6,
  manufacturing: 4,
  hospitality: 5,
  professional: 5,
  retail: 6,
  health: 4,
  community: 6,
  specialty: 6,
};

async function auditViewport(page, viewport) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    isMobile: viewport.isMobile ?? false,
  });
  await page.goto(`${BASE}/`, {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });
  await page.waitForSelector(".pilot-commercial-panel", { timeout: 20000 });
  await page.evaluate(() => {
    const heading = [...document.querySelectorAll("h2")].find((el) =>
      el.textContent?.includes("Whatever kind of business you run"),
    );
    heading?.scrollIntoView({ block: "center" });
  });
  await new Promise((r) => setTimeout(r, 800));

  const base = await page.evaluate(() => {
    const panelEl = document.querySelector(".pilot-commercial-panel");
    const tablist = document.querySelector('[role="tablist"]');
    const body = document.documentElement;
    const allCommercial = [...(panelEl?.querySelectorAll("a") ?? [])].find(
      (a) => a.textContent?.trim() === "All Commercial",
    );
    return {
      overflowX: body.scrollWidth > body.clientWidth + 2,
      tabCount: tablist?.querySelectorAll('[role="tab"]').length ?? 0,
      allCommercialHref: allCommercial?.getAttribute("href") ?? null,
      hasGridClass: !!panelEl?.querySelector("ul.grid"),
    };
  });

  const categoryResults = [];
  for (const id of CATEGORY_IDS) {
    const tabSelector = `button[role="tab"][id$="-cat-${id}"]`;
    await page.waitForSelector(tabSelector, { timeout: 10000 });
    await page.$eval(tabSelector, (el) => {
      el.scrollIntoView({ block: "nearest", inline: "center" });
      el.click();
    });
    await new Promise((r) => setTimeout(r, 250));

    const state = await page.evaluate(
      (catId, expectedCount) => {
        const panelEl = document.querySelector(".pilot-commercial-panel");
        const activeTab = document.querySelector(
          '[role="tab"][aria-selected="true"]',
        );
        const links = [
          ...(panelEl?.querySelectorAll("ul a[href*='-insurance']") ?? []),
        ];
        const hrefs = links.map((a) => a.getAttribute("href") || "");
        const unique = new Set(hrefs);
        const rects = links.map((a) => a.getBoundingClientRect());
        const tinyTap = rects.some((r) => r.height < 36);
        const panelRect = panelEl?.getBoundingClientRect();
        const clipped = links.some((a) => {
          const r = a.getBoundingClientRect();
          return panelRect && r.bottom > panelRect.bottom + 6;
        });
        return {
          category: catId,
          activeTabId: activeTab?.id ?? null,
          activeMatches: activeTab?.id?.endsWith(`-cat-${catId}`) ?? false,
          productCount: links.length,
          expectedCount,
          duplicateHrefs: hrefs.length !== unique.size,
          tinyTap,
          clipped,
          sampleLabels: links.slice(0, 3).map((a) => a.textContent?.trim()),
        };
      },
      id,
      EXPECTED_COUNTS[id],
    );

    categoryResults.push(state);
  }

  const largest = categoryResults.reduce(
    (max, row) => (row.productCount > (max?.productCount ?? 0) ? row : max),
    null,
  );

  const allCommercialOk =
    base.allCommercialHref === "/commercial-insurance/" ||
    base.allCommercialHref === "/commercial-insurance";

  const ok =
    !base.overflowX &&
    base.tabCount === 10 &&
    allCommercialOk &&
    categoryResults.every(
      (row) =>
        row.activeMatches &&
        row.productCount === row.expectedCount &&
        !row.duplicateHrefs &&
        !row.tinyTap &&
        !row.clipped,
    );

  return {
    viewport: viewport.name,
    ...base,
    allCommercialOk,
    largestCategory: largest,
    categories: categoryResults,
    ok,
  };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const results = [];
  for (const vp of VIEWPORTS) {
    results.push(await auditViewport(page, vp));
  }
  await browser.close();

  const output = {
    base: BASE,
    results,
    ok: results.every((r) => r.ok),
  };
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(output, null, 2));
  console.log(
    JSON.stringify(
      {
        ok: output.ok,
        viewports: results.map((r) => ({
          name: r.viewport,
          ok: r.ok,
          largest: r.largestCategory?.productCount,
        })),
      },
      null,
      2,
    ),
  );
  if (!output.ok) {
    for (const r of results) {
      if (!r.ok) {
        console.error(
          r.viewport,
          JSON.stringify(
            r.categories?.filter(
              (c) =>
                !c.activeMatches ||
                c.productCount !== c.expectedCount ||
                c.tinyTap ||
                c.clipped,
            ) ?? r,
            null,
            2,
          ),
        );
      }
    }
  }
  process.exit(output.ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
