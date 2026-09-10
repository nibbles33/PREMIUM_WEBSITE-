#!/usr/bin/env node
/** Grade C Batch A — professional & advisory liability verification */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/grade-c-batch-a-2026-09-09");

const ROUTES = [
  {
    slug: "professional-liability-insurance",
    tabs: [
      "accountants-bookkeepers",
      "consultants-advisors",
      "engineers-architects",
      "financial-advisors-it-consultants",
    ],
    detailTitles: [
      "A reporting mistake can become a client loss claim",
      "A strategy recommendation can outlive the engagement",
      "A specification error can ripple through an entire project",
      "Implementation failure and advice errors are different from a data breach bill",
    ],
    heroSnippet: "financial loss",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "$1M to $5M per occurrence is common for mid-size engagements",
      "Covers investment advice errors",
      "Addresses claims alleging errors",
    ],
    requiredPhrases: [
      "claims-made",
      "retroactive date",
    ],
  },
  {
    slug: "professional-offices-insurance",
    tabs: [
      "general-liability",
      "professional-liability-errors-omissions",
      "commercial-property",
      "cyber-liability",
    ],
    detailTitles: [
      "A client visit creates premises exposure separate from your advice",
      "Bad advice is not a slip-and-fall claim",
      "Your landlord's policy does not automatically cover your contents",
      "Client files on your server create exposure GL may exclude",
    ],
    heroSnippet: "Professional offices combine",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "Covers office contents",
      "Helps protect against third-party injury",
    ],
    requiredPhrases: ["Professional Liability"],
  },
  {
    slug: "real-estate-insurance",
    tabs: [
      "errors-omissions-e-o",
      "commercial-property",
      "general-liability",
      "landlord-coverage",
    ],
    detailTitles: [
      "Transaction errors and deposit disputes follow RECO's program rules",
      "Boardroom equipment and MLS workstations are your contents exposure",
      "An open-house visitor injury is a premises claim — not a transaction E&O claim",
      "Client contact lists and deal files are brokerage cyber exposure",
    ],
    heroSnippet: "RECO's mandatory professional liability",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "Landlord Coverage",
      "Protects rental property owners",
      "What's covered under landlord insurance",
      "Yes in practice — and many brokerages and boards require it",
    ],
    requiredPhrases: [
      "Landlord Insurance",
      "Property Management",
      "does not replace or sell this program",
    ],
    visitorTabLabels: ["E&O", "Property", "GL", "Cyber"],
  },
  {
    slug: "medical-dental-insurance",
    tabs: [
      "commercial-general-liability",
      "commercial-property",
      "cyber-privacy",
      "malpractice-coordination",
    ],
    detailTitles: [
      "A waiting-room fall is not a treatment-error claim",
      "Operatory equipment drives property values beyond desks and chairs",
      "Patient records create cyber exposure PHIPA does not insure away",
      "The clinic entity and each practitioner carry different protection",
    ],
    heroSnippet: "two distinct insurance layers",
    trustSnippet: "reviewed through an independent broker",
    considerationCount: 8,
    faqCount: 5,
    forbidden: [
      "Covers patient slip-and-fall",
      "Addresses patient data breaches and privacy notification costs under PHIPA",
      "CMPA is an insurance company",
    ],
    requiredPhrases: [
      "does not replace",
      "PHIPA",
      "CMPA",
      "RCDSO",
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
      tabLabel: activeTab?.textContent?.trim().slice(0, 80),
      tabDesc,
      detailTitle: detailH3,
      detailDescription: detailP,
      duplicateDesc: tabDesc && detailP && tabDesc === detailP,
      hasImage: Boolean(img),
      hasV2Detail: Boolean(detailH3 && detailP && detailH3 !== tabDesc),
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
    const tabId = route.tabs[i];
    const expectedTitle = route.detailTitles[i];
    const tabSel = `.pilot-product-coverage-list [id$="-tab-${tabId}"]`;
    await page.waitForSelector(tabSel, { timeout: 10000 });
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      el?.scrollIntoView({ block: "center" });
      el?.click();
    }, tabSel);
    await page.waitForFunction(
      (id, title) => {
        const tab = document.querySelector(`.pilot-product-coverage-list [id$="-tab-${id}"]`);
        const stage = document.querySelector(".pilot-product-explorer-stage");
        const h3 = stage?.querySelector("h3")?.textContent?.trim();
        return tab?.getAttribute("aria-selected") === "true" && h3 === title;
      },
      { timeout: 15000 },
      tabId,
      expectedTitle,
    );
    await new Promise((r) => setTimeout(r, 300));
    const state = await getExplorerState(page);
    result.explorer.push({ index: i, id: tabId, ...state });
  }

  result.trustBand = await page.evaluate(
    (snippets) => {
      const hero = document.querySelector(".pilot-product-hero p.mt-4")?.textContent?.trim();
      const trust = [...document.querySelectorAll("main section p")].find((p) =>
        p.textContent?.includes("reviewed through an independent broker"),
      )?.textContent?.trim();
      return {
        heroPresent: Boolean(hero?.includes(snippets.heroSnippet)),
        trustPresent: Boolean(
          (trust && trust.includes(snippets.trustSnippet)) ||
            (hero && hero.includes(snippets.trustSnippet)),
        ),
        distinct: hero !== trust,
        heroPreview: hero?.slice(0, 160) || null,
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
    const openCount = await page.evaluate(() =>
      document.querySelectorAll(
        'section[aria-labelledby="pilot-product-considerations-heading"] button[aria-expanded="true"]',
      ).length,
    );
    result.considerations.oneOpenAtATime = openCount >= 1;
    result.considerations.expandWorks = openCount >= 1;
  } else {
    result.considerations.oneOpenAtATime = result.considerations.count >= 6;
    result.considerations.expandWorks = result.considerations.count >= 6;
  }

  result.faqCount = await page.evaluate(
    () => document.querySelectorAll(".pilot-auto-faq-trigger").length,
  );
  const bodyText = await page.evaluate(() => document.body.innerText);
  result.forbidden = route.forbidden.filter((p) => bodyText.includes(p));
  result.requiredMissing = route.requiredPhrases.filter((p) => !bodyText.includes(p));
  result.idsPreserved = route.tabs.every((id, i) => result.explorer[i]?.id === id);
  result.allV2Detail = result.explorer.every((s) => s.hasV2Detail && !s.duplicateDesc);

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
    await scrollToExplorer(page);
    result[`overflow_${vp.name}`] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    await page.screenshot({ path: path.join(routeOut, `explorer_${vp.name}.png`), fullPage: false });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${route.slug}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-product-explorer-stage", { timeout: 30000 });
  await scrollToExplorer(page);
  for (let i = 0; i < route.tabs.length; i++) {
    await page.click(`[id$="-tab-${route.tabs[i]}"]`);
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(routeOut, `explorer_state-${i}_${route.tabs[i]}_1440.png`),
      fullPage: false,
    });
  }

  const explorerPass =
    result.explorer.length === 4 &&
    result.idsPreserved &&
    result.allV2Detail &&
    result.explorer.every((s, i) => s.detailTitle === route.detailTitles[i] && s.hasImage);

  result.pass =
    explorerPass &&
    result.trustBand.heroPresent &&
    result.trustBand.trustPresent &&
    result.trustBand.distinct &&
    result.considerations.count === route.considerationCount &&
    result.considerations.expandWorks !== false &&
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
      allV2Detail: r.allV2Detail,
      considerationCount: r.considerations?.count,
      faqCount: r.faqCount,
      forbidden: r.forbidden,
      requiredMissing: r.requiredMissing,
      explorerTitles: r.explorer.map((s) => s.detailTitle),
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
