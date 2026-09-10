#!/usr/bin/env node
/**
 * QA-only: reproduce Fitness mobile flake using the SAME click pattern as
 * site-integration-explorer-regression.cjs (capture tabs once via page.$$ then click).
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/grade-c-batch-e-2026-09-09/fitness-full-regression-pattern-runs.json",
);
const SLUG = "fitness-gym-insurance";
const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1280", width: 1280, height: 900 },
  { name: "desktop-1024", width: 1024, height: 900 },
  { name: "mobile-390", width: 390, height: 844, isMobile: true },
];

async function measure(page) {
  return page.evaluate(() => {
    const frame = document.querySelector(".pilot-ce-stage-frame");
    const stage = document.querySelector(
      ".pilot-product-explorer-stage, .pilot-auto-explorer-stage",
    );
    const img =
      document.querySelector(".pilot-ce-scene-interactive-master-image") ||
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image");
    function rect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        width: r.width,
        height: r.height,
        left: r.left,
        top: r.top,
        right: r.right,
        bottom: r.bottom,
      };
    }
    const frameRect = rect(frame);
    const stageRect = rect(stage || frame);
    const imgRect = rect(img);
    let containedInStage = null;
    if (frameRect && imgRect && stageRect) {
      containedInStage =
        imgRect.left >= stageRect.left - 1 &&
        imgRect.top >= stageRect.top - 1 &&
        imgRect.right <= stageRect.right + 1 &&
        imgRect.bottom <= stageRect.bottom + 1;
    }
    return { containedInStage, frameOverflowStage: false };
  });
}

async function auditRouteViewport(page, vp) {
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    isMobile: !!vp.isMobile,
  });
  await page.goto(`${BASE}/${SLUG}/`, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const hasExplorer = await page.evaluate(() =>
    Boolean(
      document.querySelector(
        ".pilot-ce-stage-frame, .pilot-auto-explorer-stage",
      ),
    ),
  );
  if (!hasExplorer) {
    return { viewport: vp.name, explorer: false, pass: false, error: "no explorer" };
  }

  await page.evaluate(() =>
    document
      .querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage")
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));

  // SAME pattern as site-integration-explorer-regression.cjs
  const tabs = await page.$$(".pilot-product-coverage-card");
  const states = [];
  let error = null;
  try {
    for (let i = 0; i < Math.max(tabs.length, 1); i++) {
      if (tabs[i]) {
        await tabs[i].click();
        await new Promise((r) => setTimeout(r, 450));
      }
      const m = await measure(page);
      states.push({ index: i, ...m });
    }
  } catch (e) {
    error = e.message || String(e);
  }

  const anyClip = states.some(
    (s) => s.containedInStage === false || s.frameOverflowStage === true,
  );
  return {
    viewport: vp.name,
    explorer: true,
    tabCount: tabs.length,
    stateCount: states.length,
    pass: !error && !anyClip,
    error,
    anyClip,
  };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const runs = [];

  for (let run = 1; run <= 3; run++) {
    const results = [];
    for (const vp of VIEWPORTS) {
      process.stderr.write(`RUN ${run} ${vp.name}\n`);
      results.push(await auditRouteViewport(page, vp));
    }
    runs.push({
      run,
      results,
      pass: results.every((r) => r.pass),
      failures: results.filter((r) => !r.pass),
    });
  }

  await browser.close();
  const payload = {
    slug: SLUG,
    pattern: "page.$$ once then click (site-integration-explorer-regression)",
    runs: runs.map((r) => ({
      run: r.run,
      pass: r.pass,
      failures: r.failures,
      results: r.results,
    })),
    allRunsPass: runs.every((r) => r.pass),
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload, null, 2));
  process.exit(payload.allRunsPass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
