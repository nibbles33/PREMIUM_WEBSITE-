#!/usr/bin/env node
/**
 * Full visual verification — charcoal secondary CTA fix across 5 components.
 * Captures resting/hover/focus screenshots + mobile tap + navigation + regression.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.CTA_VALIDATE_PORT || 3018);
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, "../docs/qa-screenshots/homepage-cta-broker-fix");

const SURFACES = [
  {
    id: "homepage-final-cta",
    label: "Homepage final CTA (PilotFinalCta)",
    url: "/",
    selector: 'section[aria-labelledby="pilot-final-cta-heading"] a.pilot-charcoal-secondary-btn',
    scrollTo: "#pilot-final-cta-heading",
    expectedHref: "/talk-to-a-broker/",
    expectedLabel: "Talk to a Broker",
    mobileTest: true,
    clickTest: true,
  },
  {
    id: "homepage-hero-broker",
    label: "Homepage hero broker CTA (PilotHomeHero)",
    url: "/",
    selector: "#hero a.pilot-charcoal-secondary-btn",
    scrollTo: "#hero",
    expectedHref: "/talk-to-a-broker/",
    expectedLabel: "Talk to a Broker",
    mobileTest: true,
    clickTest: true,
  },
  {
    id: "commercial-discovery-all-commercial",
    label: "Commercial Discovery All Commercial (PilotCommercialDiscovery)",
    url: "/",
    selector: ".pilot-commercial-panel a.pilot-charcoal-secondary-btn",
    scrollTo: ".pilot-commercial-panel",
    expectedHref: "/commercial-insurance/",
    expectedLabel: "All Commercial",
    mobileTest: false,
    clickTest: false,
  },
  {
    id: "trucking-product-final-cta",
    label: "Trucking final broker CTA (ProductFinalCta — live /trucking-insurance/)",
    url: "/trucking-insurance/",
    selector: 'section[aria-labelledby="pilot-product-final-trucking-insurance"] a.pilot-charcoal-secondary-btn',
    scrollTo: "#pilot-product-final-trucking-insurance",
    expectedHref: "/talk-to-a-broker/",
    expectedLabel: "Talk to a Broker",
    mobileTest: false,
    clickTest: true,
    note: "PilotTruckingPage.tsx was also updated but is legacy/unmounted since Batch C/D migration",
  },
];

const REGRESSION = [
  {
    id: "auto-final-cta-regression",
    label: "Auto final CTA regression (AutoFinalCta)",
    url: "/auto-insurance/",
    selector: 'section[aria-labelledby="pilot-auto-final-heading"] a.pilot-charcoal-secondary-btn',
    scrollTo: "#pilot-auto-final-heading",
    expectedHref: "/talk-to-a-broker/",
  },
  {
    id: "product-final-cta-regression",
    label: "Product final CTA regression (ProductFinalCta — home insurance)",
    url: "/home-insurance/",
    selector: 'section[aria-labelledby^="pilot-product-final-"] a.pilot-charcoal-secondary-btn',
    scrollTo: '[id^="pilot-product-final-"]',
    expectedHref: "/talk-to-a-broker/",
  },
];

function rgbToDesc(color) {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return color;
  const [, r, g, b, a] = m;
  const ri = Number(r);
  const gi = Number(g);
  const bi = Number(b);
  if (ri > 240 && gi > 240 && bi > 240) return `white text (${color})`;
  if (ri > 180 && gi > 140 && bi < 80) return `gold text (${color})`;
  if (ri < 60 && gi < 60 && bi < 60) return `dark/invisible text (${color}) — FAIL`;
  return color;
}

function borderDesc(color) {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return color;
  const [, r, g, b] = m.map(Number);
  if (g > 150 && b < 100 && r > 150) return `gold/champagne border (${color})`;
  if (r > 200 && g > 200) return `light border (${color})`;
  return color;
}

async function readButtonState(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false };
    el.scrollIntoView({ block: "center", inline: "center" });
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      found: true,
      href: el.getAttribute("href"),
      text: el.textContent?.trim(),
      color: cs.color,
      borderColor: cs.borderTopColor,
      backgroundColor: cs.backgroundColor,
      outlineWidth: cs.outlineWidth,
      outlineColor: cs.outlineColor,
      boxShadow: cs.boxShadow,
      visible:
        rect.width > 0 &&
        rect.height > 0 &&
        cs.visibility !== "hidden" &&
        parseFloat(cs.opacity || "1") >= 0.95,
      rect: { width: rect.width, height: rect.height },
    };
  }, selector);
}

function isRestingOk(state) {
  if (!state.found || !state.visible) return false;
  const m = state.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  const [, r, g, b] = m.map(Number);
  return r > 240 && g > 240 && b > 240; // white resting text
}

function isHoverOrFocusOk(state) {
  if (!state.found) return false;
  const m = state.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  const [, r, g, b] = m.map(Number);
  const goldText = r > 180 && g > 140 && b < 120;
  const hasOutline = state.outlineWidth && state.outlineWidth !== "0px";
  return goldText || hasOutline;
}

async function clipScreenshot(page, selector, outPath) {
  const handle = await page.$(selector);
  if (!handle) return false;
  await handle.screenshot({ path: outPath });
  return true;
}

async function verifySurface(browser, surface, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(`${BASE}${surface.url}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(surface.scrollTo, { timeout: 20000 });
  await page.waitForSelector(surface.selector, { timeout: 20000 });

  const dir = path.join(OUT, surface.id, viewport.width <= 400 ? "mobile_390" : "desktop_1440");
  fs.mkdirSync(dir, { recursive: true });

  const resting = await readButtonState(page, surface.selector);
  await clipScreenshot(page, surface.selector, path.join(dir, "01_resting.png"));

  const handle = await page.$(surface.selector);
  if (handle) await handle.hover();
  await new Promise((r) => setTimeout(r, 150));
  const hover = await readButtonState(page, surface.selector);
  await clipScreenshot(page, surface.selector, path.join(dir, "02_hover.png"));

  await page.focus(surface.selector);
  await new Promise((r) => setTimeout(r, 100));
  const focus = await readButtonState(page, surface.selector);
  await clipScreenshot(page, surface.selector, path.join(dir, "03_focus.png"));

  let clickResult = null;
  if (surface.clickTest) {
    await page.goto(`${BASE}${surface.url}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(surface.selector, { timeout: 20000 });
    const hrefBefore = await page.$eval(surface.selector, (el) => el.getAttribute("href"));
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 15000 }).catch(() => null),
      viewport.width <= 400
        ? page.tap(surface.selector)
        : page.click(surface.selector),
    ]);
    const finalUrl = page.url();
    const expectedPath = surface.expectedHref.replace(/\/$/, "");
    clickResult = {
      hrefAttribute: hrefBefore,
      finalUrl,
      ok: finalUrl.includes(expectedPath),
    };
  }

  await page.close();

  return {
    surface: surface.id,
    label: surface.label,
    viewport: `${viewport.width}×${viewport.height}`,
    expectedHref: surface.expectedHref,
    expectedLabel: surface.expectedLabel,
    resting: {
      ...resting,
      textColorDesc: rgbToDesc(resting.color || ""),
      borderDesc: borderDesc(resting.borderColor || ""),
      ok: isRestingOk(resting),
    },
    hover: {
      ...hover,
      textColorDesc: rgbToDesc(hover.color || ""),
      borderDesc: borderDesc(hover.borderColor || ""),
      ok: isHoverOrFocusOk(hover),
    },
    focus: {
      ...focus,
      textColorDesc: rgbToDesc(focus.color || ""),
      borderDesc: borderDesc(focus.borderColor || ""),
      outline: `${focus.outlineWidth} ${focus.outlineColor}`,
      ok: isHoverOrFocusOk(focus),
    },
    click: clickResult,
    screenshots: {
      resting: `${surface.id}/${viewport.width <= 400 ? "mobile_390" : "desktop_1440"}/01_resting.png`,
      hover: `${surface.id}/${viewport.width <= 400 ? "mobile_390" : "desktop_1440"}/02_hover.png`,
      focus: `${surface.id}/${viewport.width <= 400 ? "mobile_390" : "desktop_1440"}/03_focus.png`,
    },
    ok:
      isRestingOk(resting) &&
      isHoverOrFocusOk(hover) &&
      isHoverOrFocusOk(focus) &&
      (!surface.clickTest || clickResult?.ok),
  };
}

async function verifyRegression(browser, item) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${item.url}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(item.selector, { timeout: 20000 });

  const dir = path.join(OUT, item.id);
  fs.mkdirSync(dir, { recursive: true });

  const resting = await readButtonState(page, item.selector);
  await clipScreenshot(page, item.selector, path.join(dir, "resting_regression.png"));

  const handle = await page.$(item.selector);
  if (handle) await handle.hover();
  const hover = await readButtonState(page, item.selector);
  await clipScreenshot(page, item.selector, path.join(dir, "hover_regression.png"));

  await page.close();

  return {
    id: item.id,
    label: item.label,
    url: item.url,
    expectedHref: item.expectedHref,
    resting: {
      textColorDesc: rgbToDesc(resting.color || ""),
      borderDesc: borderDesc(resting.borderColor || ""),
      ok: isRestingOk(resting),
    },
    hover: {
      textColorDesc: rgbToDesc(hover.color || ""),
      ok: isHoverOrFocusOk(hover),
    },
    unchangedFromExpected: isRestingOk(resting) && isHoverOrFocusOk(hover),
    screenshots: {
      resting: `${item.id}/resting_regression.png`,
      hover: `${item.id}/hover_regression.png`,
    },
  };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const desktop = { width: 1440, height: 900 };
  const mobile = { width: 390, height: 844 };

  const surfaceResults = [];
  for (const surface of SURFACES) {
    surfaceResults.push(await verifySurface(browser, surface, desktop));
    if (surface.mobileTest) {
      surfaceResults.push(await verifySurface(browser, surface, mobile));
    }
  }

  const regressionResults = [];
  for (const item of REGRESSION) {
    regressionResults.push(await verifyRegression(browser, item));
  }

  await browser.close();

  const report = {
    timestamp: new Date().toISOString(),
    base: BASE,
    buildNote: "Run npm run build separately; see full-verification-report.md",
    surfaces: surfaceResults,
    regression: regressionResults,
    summary: {
      surfacesPassed: surfaceResults.filter((r) => r.ok).length,
      surfacesTotal: surfaceResults.filter((r) => r.viewport.startsWith("1440")).length,
      allSurfacesOk: surfaceResults.every((r) => r.ok),
      regressionOk: regressionResults.every((r) => r.unchangedFromExpected),
    },
  };

  fs.writeFileSync(path.join(OUT, "full-verification-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.summary, null, 2));
  process.exit(report.summary.allSurfacesOk && report.summary.regressionOk ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
