#!/usr/bin/env node
/**
 * Business mega-menu viewport/zoom accessibility test.
 */
const puppeteer = require("puppeteer");

const PORT = process.env.MEGA_MENU_PORT || 3019;
const BASE = `http://localhost:${PORT}`;

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1280x720", width: 1280, height: 720 },
];

const ZOOMS = [1, 1.25, 1.5];

async function testCombo(page, viewport, zoom) {
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: zoom,
  });

  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });

  const businessBtn = await page.evaluateHandle(() => {
    const buttons = [...document.querySelectorAll("button")];
    return buttons.find((b) => b.textContent?.trim().startsWith("Business")) ?? null;
  });

  const btnEl = businessBtn.asElement();
  if (!btnEl) {
    throw new Error("Business nav button not found");
  }

  await btnEl.hover();
  await page.waitForSelector(".nav-dropdown-panel-scroll", { timeout: 5000 });

  const metrics = await page.evaluate(() => {
    const panel = document.querySelector(".nav-dropdown-panel-scrollable");
    const scroll = document.querySelector(".nav-dropdown-panel-scroll");
    const links = scroll?.querySelectorAll("a") ?? [];
    const last = links[links.length - 1];
    if (!panel || !scroll || !last) return { ok: false, reason: "missing elements" };

    const panelRect = panel.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();
    const vh = window.innerHeight;

    const panelWithinViewport =
      panelRect.top >= 0 && panelRect.bottom <= vh + 1;
    const lastLinkReachable =
      lastRect.bottom <= panelRect.bottom + 1 ||
      scroll.scrollHeight > scroll.clientHeight;

    scroll.scrollTop = scroll.scrollHeight;
    const lastRectAfterScroll = last.getBoundingClientRect();
    const lastVisibleAfterScroll =
      lastRectAfterScroll.top >= panelRect.top &&
      lastRectAfterScroll.bottom <= panelRect.bottom + 2;

    return {
      ok: panelWithinViewport && lastLinkReachable && lastVisibleAfterScroll,
      panelWithinViewport,
      lastLinkReachable,
      lastVisibleAfterScroll,
      panelHeight: panelRect.height,
      viewportHeight: vh,
      scrollable: scroll.scrollHeight > scroll.clientHeight,
      linkCount: links.length,
    };
  });

  return {
    viewport: viewport.name,
    zoom,
    pass: metrics.ok,
    ...metrics,
  };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });

  const results = [];
  for (const vp of VIEWPORTS) {
    for (const zoom of ZOOMS) {
      try {
        results.push(await testCombo(page, vp, zoom));
      } catch (e) {
        results.push({
          viewport: vp.name,
          zoom,
          pass: false,
          error: String(e.message),
        });
      }
    }
  }

  await browser.close();

  const summary = {
    total: results.length,
    passed: results.filter((r) => r.pass).length,
    failed: results.filter((r) => !r.pass).length,
  };

  console.log(JSON.stringify({ summary, results }, null, 2));
  if (summary.failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
