#!/usr/bin/env node
/** Capture D1 closeout screenshots — Auto collision/comprehensive/FAQ copy changes. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(__dirname, "../docs/qa-screenshots/d1-final-closeout-2026-09-07");

async function scrollToExplorer(page) {
  await page.evaluate(() =>
    document.querySelector(".pilot-auto-explorer-stage, .pilot-product-coverage-list")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 500));
}

async function clickCard(page, match) {
  const ok = await page.evaluate((needle) => {
    const cards = Array.from(document.querySelectorAll(".pilot-auto-coverage-card"));
    const card = cards.find((c) => c.textContent.includes(needle));
    if (!card) return false;
    card.click();
    return true;
  }, match);
  if (!ok) throw new Error(`Card not found: ${match}`);
  await new Promise((r) => setTimeout(r, 600));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/auto-insurance`, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollToExplorer(page);

  for (const spec of [
    { file: "auto-collision-coverage.png", match: "Optional coverage that can help pay to repair or replace" },
    { file: "auto-comprehensive-coverage.png", match: "Optional coverage intended to address theft" },
  ]) {
    await clickCard(page, spec.match);
    const stage = await page.$(".pilot-auto-explorer-stage");
    await stage.screenshot({ path: path.join(OUT, spec.file) });
  }

  await page.evaluate(() => document.querySelector("#faq, .pilot-faq, section")?.scrollIntoView({ block: "start" }));
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button, summary")).find((el) =>
      el.textContent.includes("difference between collision and comprehensive"),
    );
    btn?.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  const faq = await page.$(".pilot-faq, [class*='faq']");
  await (faq || page).screenshot({ path: path.join(OUT, "auto-collision-comprehensive-faq.png") });

  // 390px overflow check on auto
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE}/auto-insurance`, { waitUntil: "networkidle0", timeout: 60000 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  fs.writeFileSync(path.join(OUT, "auto-mobile-390-overflow.json"), JSON.stringify({ overflow, pass: overflow <= 1 }, null, 2));
  await page.screenshot({ path: path.join(OUT, "auto-mobile-390-explorer.png"), fullPage: false });

  await browser.close();
  console.log("Screenshots saved to", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
