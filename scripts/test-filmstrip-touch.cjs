#!/usr/bin/env node
const puppeteer = require("puppeteer");
const BASE = process.env.BASE_URL || "http://localhost:3018";

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  const read = () =>
    page.evaluate(() => ({
      transform: document.querySelector(".pilot-filmstrip-inner")?.style.transform,
      progress: document.querySelector(".pilot-filmstrip-progress-fill")?.style.width,
    }));

  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1500));
  const before = await read();

  const box = await page.$eval(".pilot-filmstrip-viewport", (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });

  // Mouse drag (pointer events)
  await page.mouse.move(box.x + box.w * 0.75, box.y + box.h / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.w * 0.75 - 150, box.y + box.h / 2, { steps: 15 });
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 400));
  const afterMouse = await read();

  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));
  const box2 = await page.$eval(".pilot-filmstrip-viewport", (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  const sx = box2.x + box2.w * 0.75;
  const sy = box2.y + box2.h / 2;
  await page.touchscreen.touchStart(sx, sy);
  for (let i = 1; i <= 15; i++) {
    await page.touchscreen.touchMove(sx - (150 * i) / 15, sy);
  }
  await page.touchscreen.touchEnd();
  await new Promise((r) => setTimeout(r, 400));
  const afterTouch = await read();

  console.log(JSON.stringify({ before, afterMouse, afterTouch, mouseMoved: before.transform !== afterMouse.transform, touchMoved: before.transform !== afterTouch.transform }, null, 2));
  await browser.close();
})();
