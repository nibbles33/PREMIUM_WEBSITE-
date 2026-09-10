#!/usr/bin/env node
/** Final D batch verification — crime, D&O, EPL, product-recall */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/final-d-batch-2026-09-09");

const ROUTES = [
  {
    slug: "crime-fidelity-insurance",
    tabs: [
      "employee-dishonesty",
      "forgery-alteration",
      "theft-of-money-securities",
      "computer-fraud",
    ],
    detailTitles: [
      "Many property forms exclude or restrict insider theft",
      "A forged instrument can drain an account before anyone notices",
      "Cash and negotiable instruments need their own crime agreements",
      "A convincing email is not the same as a computer takeover",
    ],
    heroSnippet: "not a surety bond",
    trustSnippet: "Windsor–Essex businesses handling cash",
    considerationCount: 8,
    faqCount: 5,
    requiredPhrases: [
      "social engineering",
      "fraudulent-instruction",
      "employee definition",
    ],
    forbidden: [
      "Covers theft of money, securities, or property by employees acting fraudulently",
      "May cover losses from fraudulent electronic transfers and social engineering schemes",
      "Computer Fraud & Social Engineering",
    ],
  },
  {
    slug: "directors-officers-insurance",
    tabs: [
      "side-a-individual-coverage",
      "side-b-corporate-reimbursement",
      "side-c-entity-coverage",
      "defence-costs",
    ],
    detailTitles: [
      "Personal assets are exposed when indemnification fails",
      "The company’s indemnity promise needs balance-sheet backup",
      "Entity coverage is not one-size-fits-all",
      "Legal bills can consume the limit before settlement",
    ],
    heroSnippet: "Side A",
    trustSnippet: "Windsor–Essex corporations, nonprofit boards",
    considerationCount: 8,
    faqCount: 5,
    requiredPhrases: [
      "erode",
      "claims-made",
      "Side C",
    ],
    forbidden: [
      "GL covers the organization's operational liability, not personal claims against directors",
      "Protects directors and officers personally when the organization cannot indemnify them",
      "often irrespective of outcome",
    ],
  },
  {
    slug: "employment-practices-liability-insurance",
    tabs: [
      "wrongful-termination",
      "harassment-discrimination",
      "retaliation-claims",
      "defence-costs",
    ],
    detailTitles: [
      "Termination disputes are common — insurance is not severance pay",
      "Human rights and workplace allegations create defence exposure",
      "Reporting misconduct can precede a second claim",
      "Defence can dominate the cost of an employment claim",
    ],
    heroSnippet: "Employment Standards Act",
    trustSnippet: "Windsor–Essex employers with staff",
    considerationCount: 8,
    faqCount: 5,
    requiredPhrases: [
      "termination pay",
      "Human Rights Code",
      "claims-made",
    ],
    forbidden: [
      "Covers claims alleging improper dismissal or constructive dismissal",
      "Pays legal defence for covered employment claims regardless of outcome",
      "Covers improper dismissal",
    ],
  },
  {
    slug: "product-recall-insurance",
    tabs: [
      "recall-expenses",
      "replacement-costs",
      "consultant-lab-fees",
      "brand-rehabilitation",
    ],
    detailTitles: [
      "Pulling product is an operations problem before it is a liability lawsuit",
      "Replacement is a separate expense category — not automatic",
      "Finding the source and scope drives both cost and credibility",
      "Reputation spend is optional coverage, not a free add-on",
    ],
    heroSnippet: "not the same product as product liability",
    trustSnippet: "Windsor–Essex food manufacturers",
    considerationCount: 8,
    faqCount: 5,
    requiredPhrases: [
      "product liability",
      "voluntary",
      "traceability",
    ],
    forbidden: [
      "Product liability covers injury or damage claims from defective products. Recall covers the cost of withdrawing products from the market.",
      "Covers costs to notify customers, retrieve products, and dispose of or destroy affected inventory",
      "Addresses testing and expert costs to identify contamination sources and scope",
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
    const tabDesc = activeTab
      ?.querySelector("[data-coverage-description], .text-secondary, p")
      ?.textContent?.trim();
    const detailH3 = stage?.querySelector("h3")?.textContent?.trim();
    const detailP = stage?.querySelector("h3 + p")?.textContent?.trim();
    const img =
      document.querySelector(".pilot-ce-scene-interactive-master-image") ||
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image");
    return {
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(img),
      activeId:
        activeTab?.id?.replace(/^.*-tab-/, "") ||
        activeTab?.getAttribute("aria-controls") ||
        null,
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
        heroPreview: hero?.slice(0, 140) || null,
        trustPreview: trust?.slice(0, 140) || null,
      };
    },
    { heroSnippet: route.heroSnippet, trustSnippet: route.trustSnippet },
  );

  await page.evaluate(() =>
    document.getElementById("pilot-product-considerations-heading")?.scrollIntoView({
      block: "center",
    }),
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

  result.faqCount = await page.evaluate(
    () => document.querySelectorAll(".pilot-auto-faq-trigger").length,
  );
  const bodyText = await page.evaluate(() => document.body.innerText);
  result.forbidden = route.forbidden.filter((p) => bodyText.includes(p));
  result.requiredMissing = route.requiredPhrases.filter((p) => !bodyText.includes(p));
  result.idsPreserved = route.tabs.every((id, i) => result.explorer[i]?.id === id);
  result.headline = await page.evaluate(() =>
    document.querySelector(".pilot-product-hero h1")?.textContent?.trim(),
  );

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
    result.idsPreserved &&
    result.explorer.every(
      (s, i) => s.detailTitle === route.detailTitles[i] && !s.duplicateDesc && s.hasImage,
    );

  result.pass =
    explorerPass &&
    result.trustBand.distinct &&
    result.trustBand.heroPresent &&
    result.trustBand.trustPresent &&
    result.considerations.count === route.considerationCount &&
    result.considerations.oneOpenAtATime === true &&
    result.faqCount === route.faqCount &&
    result.forbidden.length === 0 &&
    result.requiredMissing.length === 0 &&
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
    routes: routes.map((r) => ({
      slug: r.slug,
      pass: r.pass,
      idsPreserved: r.idsPreserved,
      considerationCount: r.considerations?.count,
      faqCount: r.faqCount,
      forbidden: r.forbidden,
      requiredMissing: r.requiredMissing,
      explorerTitles: r.explorer.map((s) => s.detailTitle),
      trustBand: r.trustBand,
      overflow: {
        390: r.overflow_390,
        768: r.overflow_768,
        1024: r.overflow_1024,
        1440: r.overflow_1440,
      },
    })),
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
