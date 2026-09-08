#!/usr/bin/env node
/** Reproduce filmstrip swipe + 1024 overflow */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3018";

async function filmstripSwipeTest(page) {
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  const before = await page.evaluate(() => {
    const inner = document.querySelector(".pilot-filmstrip-inner");
    const progress = document.querySelector(".pilot-filmstrip-progress-fill");
    return {
      transform: inner?.style.transform || getComputedStyle(inner).transform,
      progressWidth: progress?.style.width,
      activeIndex: [...document.querySelectorAll(".pilot-filmstrip-frame-dense.is-active")].length,
      innerWidth: inner?.scrollWidth,
    };
  });

  const viewport = await page.$(".pilot-filmstrip-viewport");
  const box = await viewport.boundingBox();
  const startX = box.x + box.width * 0.7;
  const endX = startX - 150;
  const y = box.y + box.height / 2;

  // Touch swipe
  await page.touchscreen.touchStart(startX, y);
  for (let i = 1; i <= 10; i++) {
    await page.touchscreen.touchMove(startX + ((endX - startX) * i) / 10, y);
  }
  await page.touchscreen.touchEnd();
  await new Promise((r) => setTimeout(r, 500));

  const afterTouch = await page.evaluate(() => {
    const inner = document.querySelector(".pilot-filmstrip-inner");
    const progress = document.querySelector(".pilot-filmstrip-progress-fill");
    return {
      transform: inner?.style.transform || getComputedStyle(inner).transform,
      progressWidth: progress?.style.width,
      url: location.href,
    };
  });

  // Pointer events swipe (CDP)
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));
  const vp = await page.$(".pilot-filmstrip-viewport");
  const b2 = await vp.boundingBox();
  const sx = b2.x + b2.width * 0.7;
  const ex = sx - 150;
  const cy = b2.y + b2.height / 2;

  await page.evaluate(
    (sel, sx, sy, ex, ey) => {
      const el = document.querySelector(sel);
      el.dispatchEvent(new PointerEvent("pointerdown", { clientX: sx, clientY: sy, bubbles: true, pointerId: 1, pointerType: "touch", isPrimary: true }));
      for (let i = 1; i <= 10; i++) {
        const x = sx + ((ex - sx) * i) / 10;
        el.dispatchEvent(new PointerEvent("pointermove", { clientX: x, clientY: ey, bubbles: true, pointerId: 1, pointerType: "touch", isPrimary: true }));
      }
      el.dispatchEvent(new PointerEvent("pointerup", { clientX: ex, clientY: ey, bubbles: true, pointerId: 1, pointerType: "touch", isPrimary: true }));
    },
    ".pilot-filmstrip-viewport",
    sx,
    cy,
    ex,
    cy,
  );
  await new Promise((r) => setTimeout(r, 300));

  const afterPointer = await page.evaluate(() => ({
    transform: document.querySelector(".pilot-filmstrip-inner")?.style.transform,
    progressWidth: document.querySelector(".pilot-filmstrip-progress-fill")?.style.width,
  }));

  return { before, afterTouch, afterPointer, navigated: !afterTouch.url.endsWith("/") };
}

async function overflowTest(page, route) {
  await page.setViewport({ width: 1024, height: 900 });
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1200));
  return page.evaluate(() => {
    const doc = document.documentElement;
    const offenders = [];
    const vw = doc.clientWidth;
    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0 && r.height > 0) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || cs.visibility === "hidden") continue;
        offenders.push({
          tag: el.tagName,
          cls: (el.className || "").toString().slice(0, 80),
          right: Math.round(r.right),
          vw,
          delta: Math.round(r.right - vw),
        });
      }
    }
    offenders.sort((a, b) => b.delta - a.delta);
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      delta: doc.scrollWidth - doc.clientWidth,
      topOffenders: offenders.slice(0, 8),
    };
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  console.log("=== FILMSTRIP SWIPE 390 ===");
  console.log(JSON.stringify(await filmstripSwipeTest(page), null, 2));
  console.log("=== OVERFLOW 1024 cyber ===");
  console.log(JSON.stringify(await overflowTest(page, "/cyber-insurance/"), null, 2));
  console.log("=== OVERFLOW 1024 restaurant ===");
  console.log(JSON.stringify(await overflowTest(page, "/restaurant-insurance/"), null, 2));
  await browser.close();
})();
