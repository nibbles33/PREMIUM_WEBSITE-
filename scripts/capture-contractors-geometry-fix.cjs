#!/usr/bin/env node
/** Capture Contractors geometry-fix screenshots at multiple viewports. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/contractors-insurance/";
const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/contractors-geometry-fix");

const STEPS = [
  { file: "01-fresh-general.png", tab: null },
  { file: "02-selected-tools.png", tab: 1 },
  { file: "03-selected-builders.png", tab: 2 },
  { file: "04-selected-wrap-up.png", tab: 3 },
  { file: "05-selected-general-again.png", tab: 0 },
];

const VIEWPORTS = [
  { name: "desktop-1440", w: 1440, h: 900 },
  { name: "desktop-1280", w: 1280, h: 900 },
  { name: "desktop-1024", w: 1024, h: 768 },
  { name: "mobile-390", w: 390, h: 844 },
];

async function captureViewport(browser, vp) {
  const dir = path.join(OUT_DIR, "after", vp.name);
  fs.mkdirSync(dir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: vp.w, height: vp.h });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 600));

  const tabs = await page.$$(".pilot-product-coverage-card");

  for (const step of STEPS) {
    if (step.tab !== null) {
      await tabs[step.tab].click();
      await new Promise((r) => setTimeout(r, 1800));
    }
    const frame = await page.$(".pilot-ce-stage-frame--contractors-insurance");
    if (frame) await frame.screenshot({ path: path.join(dir, step.file) });
  }

  // Rapid sequence: refresh → General → Tools → Builder's → Wrap-Up → General → Tools → General
  await page.reload({ waitUntil: "networkidle2" });
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  const seq = [0, 1, 2, 3, 0, 1, 0];
  const rects = [];
  for (const tabIdx of seq) {
    const seqTabs = await page.$$(".pilot-product-coverage-card");
    await seqTabs[tabIdx].click();
    await new Promise((r) => setTimeout(r, 1200));
    const m = await page.evaluate(() => {
      const frame = document.querySelector(".pilot-ce-stage-frame--contractors-insurance");
      const img = document.querySelector(".pilot-ce-state-image--current");
      const fr = frame?.getBoundingClientRect();
      const ir = img?.getBoundingClientRect();
      return {
        frame: fr ? { w: fr.width, h: fr.height } : null,
        img: ir ? { w: ir.width, h: ir.height } : null,
        src: img?.currentSrc?.split("/").pop(),
        transform: img ? getComputedStyle(img).transform : null,
      };
    });
    rects.push(m);
  }

  const base = rects[0];
  const drift = rects.some(
    (r) =>
      Math.abs(r.frame.w - base.frame.w) > 1 ||
      Math.abs(r.frame.h - base.frame.h) > 1 ||
      Math.abs(r.img.w - base.img.w) > 1 ||
      Math.abs(r.img.h - base.img.h) > 1 ||
      r.transform !== "none",
  );

  await page.close();
  return { viewport: vp.name, drift, rects };
}

async function main() {
  fs.mkdirSync(path.join(OUT_DIR, "after"), { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const results = [];
  for (const vp of VIEWPORTS) {
    results.push(await captureViewport(browser, vp));
    console.log(`Captured ${vp.name}`);
  }
  await browser.close();

  fs.writeFileSync(path.join(OUT_DIR, "rapid-sequence-report.json"), JSON.stringify(results, null, 2));
  const failed = results.filter((r) => r.drift);
  if (failed.length) {
    console.error("GEOMETRY DRIFT:", failed.map((f) => f.viewport).join(", "));
    process.exit(1);
  }
  console.log("All viewports: no geometry drift in rapid sequence.");
}

main();
