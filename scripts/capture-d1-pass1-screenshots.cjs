#!/usr/bin/env node
/** Capture D1 implementation pass 1 screenshots — corrected copy in context. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/d1-implementation-pass-1-2026-09-07");

const PAGES = [
  {
    slug: "auto-insurance",
    route: "/auto-insurance/",
    cardMatch: "Accident Benefits",
    faqQuestion: "Is auto insurance mandatory in Ontario?",
    useAutoExplorer: true,
  },
  {
    slug: "motorcycle-insurance",
    route: "/motorcycle-insurance/",
    cardMatch: "Required in Ontario when riding on public roads",
  },
  {
    slug: "condo-insurance",
    route: "/condo-insurance/",
    cardMatch: "Intended to insure your belongings and upgrades",
  },
  {
    slug: "cottage-insurance",
    route: "/cottage-insurance/",
    cardMatch: "Personal liability coverage is intended to respond",
  },
  {
    slug: "small-business-insurance",
    route: "/small-business-insurance/",
    cardMatch: "Intended to insure your equipment, inventory",
  },
  {
    slug: "travel-insurance",
    route: "/travel-insurance/",
    cardMatch: "Can pay toward loss, theft, or damage to luggage",
  },
];

async function scrollToExplorer(page) {
  await page.evaluate(() =>
    document
      .querySelector(
        ".pilot-product-explorer-stage, .pilot-auto-explorer-stage, .pilot-product-coverage-list",
      )
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 500));
}

async function clickCoverageCard(page, matchText) {
  const clicked = await page.evaluate((needle) => {
    const cards = Array.from(
      document.querySelectorAll(
        ".pilot-product-coverage-card, .pilot-auto-coverage-card, .pilot-product-coverage-type-card",
      ),
    );
    const card = cards.find((el) => el.textContent.includes(needle));
    if (!card) return false;
    card.click();
    return true;
  }, matchText);
  if (!clicked) throw new Error(`Could not find coverage card matching: ${matchText}`);
  await new Promise((r) => setTimeout(r, 600));
}

async function screenshotExplorer(page, outPath, useAutoExplorer) {
  const selector = useAutoExplorer
    ? ".pilot-auto-explorer-stage"
    : ".pilot-product-explorer-stage, .pilot-product-coverage-section";
  const target = await page.$(selector);
  if (target) {
    await target.screenshot({ path: outPath });
  } else {
    await page.screenshot({ path: outPath, fullPage: false });
  }
}

async function screenshotFaq(page, question, outPath) {
  const found = await page.evaluate((q) => {
    const items = Array.from(document.querySelectorAll("details, [data-faq-item], .pilot-faq-item"));
    for (const item of items) {
      if (item.textContent.includes(q)) {
        if (item.tagName === "DETAILS") item.open = true;
        item.scrollIntoView({ block: "center" });
        return true;
      }
    }
    const headings = Array.from(document.querySelectorAll("h3, button, summary"));
    const hit = headings.find((el) => el.textContent.includes(q));
    if (hit) {
      hit.scrollIntoView({ block: "center" });
      hit.click?.();
      return true;
    }
    return false;
  }, question);

  await new Promise((r) => setTimeout(r, 400));
  const faqSection = await page.$(".pilot-faq, .pilot-product-faq, section:has(h2)");
  if (found && faqSection) {
    await faqSection.screenshot({ path: outPath });
  } else {
    await page.screenshot({ path: outPath, fullPage: false });
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const results = [];

  for (const spec of PAGES) {
    const url = `${BASE}${spec.route}`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 300));

    await scrollToExplorer(page);
    await clickCoverageCard(page, spec.cardMatch);
    const explorerPath = path.join(OUT, `${spec.slug}-coverage-explorer.png`);
    await screenshotExplorer(page, explorerPath, spec.useAutoExplorer);

    let faqPath = null;
    if (spec.faqQuestion) {
      await page.evaluate(() =>
        document.querySelector(".pilot-faq, .pilot-product-faq, #faq")?.scrollIntoView({ block: "start" }),
      );
      await new Promise((r) => setTimeout(r, 300));
      faqPath = path.join(OUT, `${spec.slug}-faq-mandatory.png`);
      await screenshotFaq(page, spec.faqQuestion, faqPath);
    }

    const copyCheck = await page.evaluate((needle) => {
      const stage = document.querySelector(
        ".pilot-product-explorer-stage, .pilot-auto-explorer-stage",
      );
      const active = document.querySelector(
        ".pilot-product-coverage-card.is-active, .pilot-auto-coverage-card.is-active",
      );
      return {
        detailText: stage?.querySelector("h3 + p")?.textContent?.trim() || null,
        cardDesc: active?.textContent?.trim().slice(0, 500) || null,
        cardMatch: needle,
      };
    }, spec.cardMatch);

    results.push({ ...spec, explorerPath, faqPath, copyCheck });
    console.log(`Captured ${spec.slug}`);
  }

  fs.writeFileSync(path.join(OUT, "capture-results.json"), JSON.stringify(results, null, 2));
  await browser.close();
  console.log(`Screenshots saved to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
