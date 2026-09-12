#!/usr/bin/env node
/**
 * Recapture Concept F screenshots using live DOM ids + reduced motion.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3020";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/homepage-authority-concept-f-2026-09-11/screenshots",
);

const SECTIONS = [
  { id: "hero", selector: "#hero" },
  { id: "authority-strip", selector: ".pilot-authority-strip" },
  { id: "carrier", selector: "#pilot-carriers-heading" },
  { id: "personal", selector: "#pilot-personal-filmstrip-heading" },
  {
    id: "commercial",
    selector: "section.bg-charcoal.py-12, section[class*='bg-charcoal'][aria-labelledby*='heading']",
  },
  { id: "why-premium", selector: "#pilot-why-premium-heading" },
  { id: "yep", selector: "#pilot-yep-heading" },
  { id: "google", selector: "#pilot-google-reviews-heading" },
  { id: "awards", selector: "#awards-heading, #pilot-local-heading" },
  { id: "windsor", selector: "#pilot-windsor-oracle-heading" },
  { id: "team", selector: "#pilot-team-heading" },
  { id: "final-cta", selector: "#pilot-final-cta-heading" },
];

async function forceReveal(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("is-revealed");
    });
  });
}

async function clipFor(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const target = el.closest("section") || el;
    target.scrollIntoView({ block: "center" });
    target.querySelectorAll(".reveal-on-scroll").forEach((n) => {
      n.classList.add("is-revealed");
    });
    const r = target.getBoundingClientRect();
    return {
      x: Math.max(0, Math.floor(r.left)),
      y: Math.max(0, Math.floor(window.scrollY + r.top)),
      width: Math.max(1, Math.floor(Math.min(window.innerWidth, r.width))),
      height: Math.max(40, Math.floor(Math.min(1800, r.height))),
    };
  }, selector);
}

async function main() {
  fs.mkdirSync(path.join(OUT, "sections-1440"), { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);

  const results = [];

  for (const vp of [
    { name: "390", width: 390, height: 844, isMobile: true },
    { name: "1440", width: 1440, height: 900 },
    { name: "1920", width: 1920, height: 1080 },
    { name: "2560", width: 2560, height: 1440 },
  ]) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: Boolean(vp.isMobile),
    });
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector(".pilot-authority-strip", { timeout: 30000 });
    await forceReveal(page);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({
      path: path.join(OUT, `homepage-full-${vp.name}.png`),
      fullPage: true,
    });
    results.push({ type: "full", id: vp.name, ok: true });
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForSelector(".pilot-authority-strip", { timeout: 30000 });
  await forceReveal(page);
  await new Promise((r) => setTimeout(r, 500));

  // Hero + authority composite
  const composite = await page.evaluate(() => {
    const hero = document.querySelector("#hero");
    const strip = document.querySelector(".pilot-authority-strip");
    if (!hero || !strip) return null;
    const a = hero.getBoundingClientRect();
    const b = strip.getBoundingClientRect();
    return {
      x: 0,
      y: Math.max(0, Math.floor(window.scrollY + a.top)),
      width: window.innerWidth,
      height: Math.max(100, Math.floor(b.bottom - a.top + 8)),
    };
  });
  if (composite) {
    await page.screenshot({
      path: path.join(OUT, "sections-1440", "hero-authority.png"),
      clip: composite,
    });
    results.push({ type: "section", id: "hero-authority", ok: true });
  }

  for (const section of SECTIONS) {
    const clip = await clipFor(page, section.selector);
    if (!clip) {
      results.push({ type: "section", id: section.id, ok: false, reason: "missing" });
      continue;
    }
    await new Promise((r) => setTimeout(r, 200));
    await page.screenshot({
      path: path.join(OUT, "sections-1440", `${section.id}.png`),
      clip,
    });
    const size = fs.statSync(path.join(OUT, "sections-1440", `${section.id}.png`)).size;
    results.push({
      type: "section",
      id: section.id,
      ok: size > 8000,
      bytes: size,
    });
  }

  await browser.close();
  const summary = {
    ok: results.every((r) => r.ok),
    results,
  };
  fs.writeFileSync(
    path.join(OUT, "..", "screenshot-recapture.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
  if (!summary.ok) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
