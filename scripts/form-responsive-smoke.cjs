#!/usr/bin/env node
/**
 * Responsive overflow check for form pages.
 * Run: BASE_URL=http://127.0.0.1:3019 node scripts/form-responsive-smoke.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3019";
const OUT = path.join(__dirname, "../docs/qa-screenshots/prelaunch-batch-1-2026-09-10/form-responsive.json");

const ROUTES = ["/contact", "/get-a-quote", "/careers"];
const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 1024, isMobile: true },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

async function main() {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const results = [];

  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: !!vp.isMobile });
      try {
        await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
        await new Promise((r) => setTimeout(r, 800));
        const metrics = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasForm: Boolean(document.querySelector("form, [role='status']")),
        }));
        results.push({ route, viewport: vp.name, ...metrics, ok: !metrics.overflow });
      } catch (e) {
        results.push({ route, viewport: vp.name, ok: false, error: e.message });
      }
      await page.close();
    }
  }

  await browser.close();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ results, pass: results.every((r) => r.ok) }, null, 2));
  console.log(JSON.stringify({ pass: results.every((r) => r.ok), failures: results.filter((r) => !r.ok) }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
