#!/usr/bin/env node
/** Verify daycare approved content implementation */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/daycare-content-2026-09-07");
const ROUTE = "/daycare-private-school-insurance/";

const APPROVED_HERO_SNIPPET = "Ontario Regulation 137/15, s. 71 requires licensees";
const APPROVED_CARDS = [
  "General Liability",
  "Property",
  "Abuse & Molestation Liability",
  "Professional Liability",
  "Directors & Officers",
  "Business Interruption",
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({ path: path.join(OUT, "desktop_1440.png"), fullPage: true });

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, "mobile_390.png"), fullPage: true });

  const dom = await page.evaluate((approvedCards) => {
    const text = document.body.innerText.replace(/\s+/g, " ");
    const cards = [...document.querySelectorAll(".pilot-product-coverage-card")].map((el) => ({
      title: el.querySelector("h3")?.textContent?.trim(),
    }));
    const considerationSection = document.querySelector("#pilot-product-considerations-heading");
    const considerationTitles = considerationSection
      ? [...considerationSection.closest("section")?.querySelectorAll("h3") ?? []].map((h) =>
          h.textContent?.trim(),
        )
      : [];
    const faqSection = [...document.querySelectorAll("h2")].find((h) =>
      h.textContent?.includes("FAQ"),
    );
    const faqButtons = faqSection
      ? [...faqSection.closest("section")?.querySelectorAll("button") ?? []].filter((b) =>
          b.textContent?.includes("?"),
        )
      : [];
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const explorerImg = document.querySelector(
      "img[src*='daycare-private-school'], .pilot-product-coverage-stage img",
    );
    const cardDescriptions = [
      "Helps protect the operation against certain third-party bodily injury",
      "May help cover your building (if owned)",
      "A distinct coverage addressing allegations of abuse",
      "May respond to certain claims alleging errors, omissions",
      "D&O insurance may help protect directors",
      "May help with lost business income",
    ];
    const cardDescriptionsMatch = cardDescriptions.every((d) => text.includes(d));
    return {
      heroPresent: text.includes("Ontario Regulation 137/15, s. 71 requires licensees"),
      cards,
      cardCount: cards.length,
      cardDescriptionsMatch,
      considerationTitles,
      considerationCount: considerationTitles.length,
      faqCount: faqButtons.length,
      overflow,
      hasExplorerImage: Boolean(explorerImg),
      hasDidYouKnow: text.includes("Did you know?") || text.includes("anaphylaxis policies"),
    };
  }, APPROVED_CARDS);

  // Spot-check other routes
  for (const spot of ["/greenhouse-agribusiness-insurance/", "/cyber-insurance/"]) {
    await page.goto(`${BASE}${spot}`, { waitUntil: "domcontentloaded" });
    const ok = await page.evaluate(() => document.body.innerText.length > 200);
    if (!ok) errors.push(`spot-check failed: ${spot}`);
  }

  await browser.close();

  const results = {
    heroSnippetPresent: dom.heroPresent,
    cardCount: dom.cardCount,
    cardTitles: dom.cards.map((c) => c.title),
    considerationCount: dom.considerationCount,
    faqCount: dom.faqCount,
    dom,
    errors,
    pass:
      dom.heroPresent &&
      dom.cardCount === 6 &&
      dom.cardDescriptionsMatch &&
      dom.considerationCount >= 9 &&
      dom.faqCount === 5 &&
      dom.hasDidYouKnow &&
      dom.overflow === 0 &&
      dom.hasExplorerImage &&
      errors.length === 0,
  };

  fs.writeFileSync(path.join(OUT, "verification.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  process.exit(results.pass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
