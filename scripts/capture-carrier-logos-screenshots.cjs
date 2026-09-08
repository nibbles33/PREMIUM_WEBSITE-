#!/usr/bin/env node
/** Capture carrier logo wiring screenshots — homepage marquee, partners, claims. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const PORT = process.env.SCREENSHOT_PORT || 3020;
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, "../docs/qa-screenshots/carrier-logos-2026-09-08");

async function shot(page, file, opts = {}) {
  const outPath = path.join(OUT, file);
  await page.screenshot({ path: outPath, fullPage: opts.fullPage ?? false, ...opts });
  console.log("saved", file);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const consoleErrors = [];

  // Homepage marquee — desktop
  {
    const page = await browser.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push({ route: "/", text: msg.text() });
    });
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE, { waitUntil: "networkidle0", timeout: 90000 });
    await page.evaluate(() =>
      document.getElementById("pilot-carriers-heading")?.scrollIntoView({ block: "center" }),
    );
    await new Promise((r) => setTimeout(r, 1200));
    await shot(page, "homepage-marquee-desktop_1440.png");
    await page.close();
  }

  // Homepage marquee — mobile
  {
    const page = await browser.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push({ route: "/", text: msg.text() });
    });
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(BASE, { waitUntil: "networkidle0", timeout: 90000 });
    await page.evaluate(() =>
      document.getElementById("pilot-carriers-heading")?.scrollIntoView({ block: "center" }),
    );
    await new Promise((r) => setTimeout(r, 1200));
    await shot(page, "homepage-marquee-mobile_390.png");
    await page.close();
  }

  // Partners page
  for (const [vp, file] of [
    [{ width: 1440, height: 900 }, "partners-desktop_1440.png"],
    [{ width: 390, height: 844, isMobile: true, hasTouch: true }, "partners-mobile_390.png"],
  ]) {
    const page = await browser.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push({ route: "/partners/", text: msg.text() });
    });
    await page.setViewport(vp);
    await page.goto(`${BASE}/partners/`, { waitUntil: "networkidle0", timeout: 90000 });
    await new Promise((r) => setTimeout(r, 800));
    await shot(page, file, { fullPage: true });
    await page.close();
  }

  // Claims page
  for (const [vp, file] of [
    [{ width: 1440, height: 900 }, "claims-desktop_1440.png"],
    [{ width: 390, height: 844, isMobile: true, hasTouch: true }, "claims-mobile_390.png"],
  ]) {
    const page = await browser.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push({ route: "/claims/", text: msg.text() });
    });
    await page.setViewport(vp);
    await page.goto(`${BASE}/claims/`, { waitUntil: "networkidle0", timeout: 90000 });
    await page.evaluate(() =>
      document.getElementById("partners-heading")?.scrollIntoView?.() ||
        document.querySelector("select[name=carrier]")?.scrollIntoView({ block: "center" }),
    );
    await new Promise((r) => setTimeout(r, 600));
    await shot(page, file, { fullPage: true });
    await page.close();
  }

  fs.writeFileSync(
    path.join(OUT, "regression.json"),
    JSON.stringify({ consoleErrors, capturedAt: new Date().toISOString() }, null, 2),
  );

  await browser.close();
  console.log("Console errors:", consoleErrors.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
