#!/usr/bin/env node
/**
 * Homepage / shared final CTA — broker button visibility + navigation validation.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.CTA_VALIDATE_PORT || 3017);
const BASE = `http://localhost:${PORT}`;

const PAGES = [
  { name: "homepage-final-cta", url: "/", selector: "#pilot-final-cta-heading", brokerSelector: 'section[aria-labelledby="pilot-final-cta-heading"] a.pilot-charcoal-secondary-btn' },
  { name: "auto-final-cta", url: "/auto-insurance/", selector: "#pilot-auto-final-heading", brokerSelector: 'section[aria-labelledby="pilot-auto-final-heading"] a.pilot-charcoal-secondary-btn' },
  { name: "home-product-final-cta", url: "/home-insurance/", selector: '[id^="pilot-product-final-"]', brokerSelector: 'section[aria-labelledby^="pilot-product-final-"] a.pilot-charcoal-secondary-btn' },
  { name: "commercial-property-final-cta", url: "/commercial-property-insurance/", selector: '[id^="pilot-product-final-"]', brokerSelector: 'section[aria-labelledby^="pilot-product-final-"] a.pilot-charcoal-secondary-btn' },
  { name: "trucking-final-cta", url: "/trucking-insurance/", selector: "h2, h3", brokerSelector: "a.pilot-charcoal-secondary-btn" },
];

async function getBrokerStyles(page, brokerSelector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false };
    el.scrollIntoView({ block: "center" });
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      found: true,
      href: el.getAttribute("href"),
      text: el.textContent?.trim(),
      color: cs.color,
      borderColor: cs.borderColor,
      backgroundColor: cs.backgroundColor,
      opacity: cs.opacity,
      visible: rect.width > 0 && rect.height > 0 && cs.visibility !== "hidden" && cs.opacity !== "0",
    };
  }, brokerSelector);
}

function isReadableOnCharcoal(color) {
  // rgb(255, 255, 255) or gold-ish — not dark charcoal text
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  const [, r, g, b] = m.map(Number);
  return r > 180 && g > 170 && b > 100; // white or gold
}

async function testPage(browser, pageDef, viewport) {
  const page = await browser.newPage();
  if (viewport) await page.setViewport(viewport);
  await page.goto(`${BASE}${pageDef.url}`, { waitUntil: "networkidle0", timeout: 90000 });
  await page.waitForSelector(pageDef.brokerSelector, { timeout: 20000 });

  const resting = await getBrokerStyles(page, pageDef.brokerSelector);
  const restingOk =
    resting.found &&
    resting.visible &&
    isReadableOnCharcoal(resting.color) &&
    parseFloat(resting.opacity || "1") >= 0.95;

  // Hover — real mouse hover for computed :hover styles
  const hoverHandle = await page.$(pageDef.brokerSelector);
  let hover = { found: false };
  if (hoverHandle) {
    await hoverHandle.hover();
    hover = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return { found: false };
      const cs = getComputedStyle(el);
      return {
        found: true,
        color: cs.color,
        borderColor: cs.borderColor,
        backgroundColor: cs.backgroundColor,
      };
    }, pageDef.brokerSelector);
  }

  // Focus
  await page.focus(pageDef.brokerSelector);
  const focus = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    const outline = cs.outlineWidth;
    return { found: true, color: cs.color, borderColor: cs.borderColor, outlineWidth: outline };
  }, pageDef.brokerSelector);

  // Click navigation
  await page.goto(`${BASE}${pageDef.url}`, { waitUntil: "networkidle0", timeout: 90000 });
  await page.waitForSelector(pageDef.brokerSelector, { timeout: 20000 });
  const href = await page.$eval(pageDef.brokerSelector, (el) => el.getAttribute("href"));
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }).catch(() => null),
    page.click(pageDef.brokerSelector),
  ]);
  const navigated = page.url().includes("talk-to-a-broker");

  await page.close();

  const hoverOk = hover.found && isReadableOnCharcoal(hover.color);
  const focusOk =
    focus.found && (isReadableOnCharcoal(focus.color) || focus.outlineWidth !== "0px");

  return {
    page: pageDef.name,
    url: pageDef.url,
    viewport: viewport ? `${viewport.width}px` : "1440px",
    resting,
    restingOk,
    hover,
    hoverOk: hover.found && isReadableOnCharcoal(hover.color),
    focus,
    focusOk: focus.found && (isReadableOnCharcoal(focus.color) || focus.outlineWidth !== "0px"),
    href,
    navigated,
    clickOk: navigated,
    ok: restingOk && hoverOk && focusOk && navigated,
  };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const results = [];

  // Homepage desktop
  results.push(await testPage(browser, PAGES[0], { width: 1440, height: 900 }));

  // Homepage mobile
  results.push(await testPage(browser, PAGES[0], { width: 390, height: 844 }));

  // 3 product pages desktop
  for (const p of PAGES.slice(1, 4)) {
    results.push(await testPage(browser, p, { width: 1440, height: 900 }));
  }

  await browser.close();

  const report = {
    timestamp: new Date().toISOString(),
    base: BASE,
    summary: {
      total: results.length,
      passed: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
    },
    results,
  };

  const outDir = path.join(__dirname, "../docs/qa-screenshots/homepage-cta-broker-fix");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "validation-report.json"), JSON.stringify(report, null, 2));

  console.log(JSON.stringify(report.summary, null, 2));
  if (report.summary.failed > 0) {
    console.log(JSON.stringify(results.filter((r) => !r.ok), null, 2));
  }

  process.exit(report.summary.failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
