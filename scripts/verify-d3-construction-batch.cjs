#!/usr/bin/env node
/** D3 Construction batch verification — builders-risk, bonding, contractors, builders-developers */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/d3-construction-batch-2026-09-08");

const ROUTES = [
  {
    slug: "builders-risk-insurance",
    tabs: [
      "work-in-progress",
      "materials-on-site-in-transit",
      "soft-costs",
      "existing-structure",
    ],
    detailTitles: [
      "Hard costs stop when fire or wind hits mid-build",
      "Materials off-site are not automatic",
      "Delay expenses need their own line item",
      "Occupied renovations change the property picture",
    ],
    heroSnippet: "course-of-construction",
    trustSnippet: "Windsor–Essex owners, developers, and contractors",
    considerationCount: 8,
    faqCount: 5,
    expectStaticImages: false,
    forbidden: [
      "Builder's risk covers the project itself during construction",
      "Covers the structure and installed materials during construction against covered perils",
      "fidelity bonds",
    ],
  },
  {
    slug: "bonding-insurance",
    tabs: [
      "bid-bonds",
      "performance-bonds",
      "labour-material-payment-bonds",
      "licence-permit-bonds",
    ],
    detailTitles: [
      "Tender security is about commitment — not project completion",
      "Default triggers a process — not an automatic insurance payout",
      "Subs and suppliers claim here — not on the performance bond",
      "Regulatory bonds are not project performance bonds",
    ],
    heroSnippet: "three-party obligation",
    trustSnippet: "Windsor–Essex contractors and vendors",
    considerationCount: 8,
    faqCount: 5,
    expectStaticImages: false,
    forbidden: [
      "Fidelity Bonds",
      "Guarantees completion of the contracted work",
      "Ensures subcontractors and suppliers are paid",
      "Bond Insurance",
    ],
  },
  {
    slug: "contractors-insurance",
    tabs: [
      "general-liability",
      "tools-equipment-coverage",
      "builder-s-risk",
      "wrap-up-liability",
    ],
    detailTitles: [
      "Job-site injury claims follow your operations — not the owner's property policy",
      "Stolen tools are rarely covered by liability alone",
      "When the contract names you to insure the build",
      "OCIP changes whose policy responds on site",
    ],
    heroSnippet: "operating contracting business",
    trustSnippet: "Windsor–Essex general contractors and trade contractors",
    considerationCount: 8,
    faqCount: 5,
    expectStaticImages: true,
    staticImageCount: 4,
    forbidden: [
      "Builder's risk covers the structure and materials during construction",
      "Protects a project under construction",
    ],
  },
  {
    slug: "builders-developers-insurance",
    tabs: [
      "builder-s-risk",
      "general-liability",
      "wrap-up-liability",
      "completed-operations",
    ],
    detailTitles: [
      "Each project needs its own property schedule",
      "Sales centres and site supervision create liability",
      "OCIP reduces gaps between trades — at a cost",
      "Defect claims can surface after occupancy",
    ],
    heroSnippet: "ownership or development entity",
    trustSnippet: "Windsor–Essex builders and developers",
    considerationCount: 8,
    faqCount: 5,
    expectStaticImages: false,
    forbidden: [
      "Protects the project under construction — materials and work in progress",
      "Tarion",
      "HCRA",
      "Builder's risk covers the structure and materials during construction",
    ],
  },
];

const VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

async function scrollToExplorer(page) {
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));
}

async function getExplorerState(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".pilot-product-explorer-stage");
    const activeTab = document.querySelector(".pilot-product-coverage-card.is-active");
    const tabDesc = activeTab?.querySelector(".text-secondary, .text-\\[13px\\]")?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img =
      document.querySelector(".pilot-ce-scene-interactive-master-image") ||
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image");
    const stateStage = document.querySelector(".pilot-ce-state-image-stage");
    const currentImg =
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image-stage img") ||
      document.querySelector(".pilot-ce-state-image");
    const rawSrc =
      currentImg?.getAttribute("src") ||
      currentImg?.getAttribute("srcset")?.split(/\s+/)?.[0] ||
      null;
    return {
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(img || currentImg),
      stateImageCount: stateStage ? 1 : 0,
      hasStateImageStage: Boolean(stateStage),
      currentStateSrc: rawSrc,
    };
  });
}

async function verifyRoute(page, route, routeOut) {
  const result = { slug: route.slug, explorer: [], pass: false };
  fs.mkdirSync(routeOut, { recursive: true });

  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await page.waitForSelector(`[id$="-tab-${route.tabs[0]}"]`, { timeout: 30000 });
  await scrollToExplorer(page);
  await new Promise((r) => setTimeout(r, 600));

  for (let i = 0; i < route.tabs.length; i++) {
    await page.waitForSelector(`[id$="-tab-${route.tabs[i]}"]`, { timeout: 10000 });
    await page.click(`[id$="-tab-${route.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 700));
    const state = await getExplorerState(page);
    result.explorer.push({ index: i, id: route.tabs[i], ...state });
  }

  result.trustBand = await page.evaluate(
    (snippets) => {
      const hero = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
      const trust = [...document.querySelectorAll("main section p")].find((p) =>
        p.textContent?.includes("reviewed through an independent broker"),
      )?.textContent?.trim();
      return {
        heroPresent: Boolean(hero?.includes(snippets.heroSnippet)),
        trustPresent: Boolean(trust?.includes(snippets.trustSnippet)),
        distinct: hero !== trust,
        heroSnippetFound: snippets.heroSnippet,
        trustSnippetFound: snippets.trustSnippet,
        heroPreview: hero?.slice(0, 120) || null,
        trustPreview: trust?.slice(0, 120) || null,
      };
    },
    { heroSnippet: route.heroSnippet, trustSnippet: route.trustSnippet },
  );

  await page.evaluate(() =>
    document.getElementById("pilot-product-considerations-heading")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 300));

  result.considerations = await page.evaluate(() => ({
    count: document.querySelectorAll(
      'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
    ).length,
  }));

  const buttons = await page.$$(
    'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded]',
  );
  if (buttons.length >= 2) {
    await buttons[1].click();
    await new Promise((r) => setTimeout(r, 400));
    result.considerations.oneOpenAtATime =
      (await page.evaluate(() =>
        document.querySelectorAll(
          'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
        ).length,
      )) === 1;
  }

  result.faqCount = await page.evaluate(() => document.querySelectorAll(".pilot-auto-faq-trigger").length);
  const bodyText = await page.evaluate(() => document.body.innerText);
  result.forbidden = route.forbidden.filter((p) => bodyText.includes(p));
  result.fidelityStateAbsent = !bodyText.includes("Fidelity Bonds");
  result.headline = await page.evaluate(() =>
    document.querySelector(".pilot-product-hero h1")?.textContent?.trim(),
  );

  if (route.expectStaticImages) {
    const uniqueSrcs = [
      ...new Set(
        result.explorer
          .map((s) => s.currentStateSrc || "")
          .filter(Boolean)
          .map((src) => {
            const decoded = decodeURIComponent(src);
            const match = decoded.match(/\/images\/contractors-insurance-state-[a-z0-9-]+\.png/);
            if (match) return match[0];
            try {
              const u = new URL(src, BASE);
              const nested = u.searchParams.get("url");
              if (nested) {
                const m2 = decodeURIComponent(nested).match(
                  /\/images\/contractors-insurance-state-[a-z0-9-]+\.png/,
                );
                if (m2) return m2[0];
              }
              return u.pathname;
            } catch {
              return src;
            }
          }),
      ),
    ];
    result.staticArchitecture = {
      hasStateImageStage: result.explorer.every((s) => s.hasStateImageStage),
      uniqueStateImages: uniqueSrcs.length,
      stateSrcs: uniqueSrcs,
      expectedSrcs: [
        "/images/contractors-insurance-state-liability.png",
        "/images/contractors-insurance-state-tools-equipment.png",
        "/images/contractors-insurance-state-property.png",
        "/images/contractors-insurance-state-installation-work.png",
      ],
      mappingsMatch:
        uniqueSrcs.includes("/images/contractors-insurance-state-liability.png") &&
        uniqueSrcs.includes("/images/contractors-insurance-state-tools-equipment.png") &&
        uniqueSrcs.includes("/images/contractors-insurance-state-property.png") &&
        uniqueSrcs.includes("/images/contractors-insurance-state-installation-work.png"),
      motionClasses: await page.evaluate(() =>
        Boolean(
          document.querySelector(
            ".pilot-ce-falling-object, .pilot-ce-mask-overlay, .pilot-ce-motion-layer",
          ),
        ),
      ),
    };
  }

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
    await page.waitForSelector(`[id$="-tab-${route.tabs[0]}"]`, { timeout: 30000 });
    await scrollToExplorer(page);
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({ path: path.join(routeOut, `explorer_${vp.name}.png`), fullPage: false });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await page.waitForSelector(`[id$="-tab-${route.tabs[0]}"]`, { timeout: 30000 });
  await scrollToExplorer(page);
  for (let i = 0; i < route.tabs.length; i++) {
    await page.click(`[id$="-tab-${route.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(routeOut, `explorer_state-${i}_${route.tabs[i]}_1440.png`),
      fullPage: false,
    });
  }

  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-product-hero", { timeout: 30000 });
  await page.screenshot({ path: path.join(routeOut, "hero_1440.png"), fullPage: false });

  const explorerPass =
    result.explorer.length === 4 &&
    result.explorer.every((s, i) => s.detailTitle === route.detailTitles[i] && !s.duplicateDesc && s.hasImage);

  const staticPass = route.expectStaticImages
    ? result.staticArchitecture?.hasStateImageStage === true &&
      result.staticArchitecture?.uniqueStateImages === route.staticImageCount &&
      result.staticArchitecture?.mappingsMatch === true &&
      result.staticArchitecture?.motionClasses === false
    : true;

  const bondingPass =
    route.slug !== "bonding-insurance" ||
    (result.fidelityStateAbsent &&
      result.headline === "Surety Bonds" &&
      result.explorer.length === 4 &&
      !result.explorer.some((s) => s.id === "fidelity-bonds"));

  result.pass =
    explorerPass &&
    staticPass &&
    bondingPass &&
    result.trustBand.distinct &&
    result.trustBand.heroPresent &&
    result.trustBand.trustPresent &&
    result.considerations.count === route.considerationCount &&
    result.considerations.oneOpenAtATime === true &&
    result.faqCount === route.faqCount &&
    result.forbidden.length === 0 &&
    VIEWPORTS.every((vp) => result[`overflow_${vp.name}`] === 0);

  fs.writeFileSync(path.join(routeOut, "verification-route.json"), JSON.stringify(result, null, 2));
  return result;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));

  const routes = [];
  for (const route of ROUTES) {
    routes.push(await verifyRoute(page, route, path.join(OUT, route.slug)));
  }

  const payload = {
    consoleErrors,
    bondingStateCount: routes.find((r) => r.slug === "bonding-insurance")?.explorer?.length ?? null,
    fidelityStateRemoved: routes.find((r) => r.slug === "bonding-insurance")?.fidelityStateAbsent ?? null,
    contractorsStatic: routes.find((r) => r.slug === "contractors-insurance")?.staticArchitecture ?? null,
    routes,
    pass: consoleErrors.length === 0 && routes.every((r) => r.pass),
  };
  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload, null, 2));
  await browser.close();
  process.exit(payload.pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
