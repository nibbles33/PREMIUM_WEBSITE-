#!/usr/bin/env node
/**
 * QA-only Fitness/Gym mobile Explorer flake diagnostic.
 * Re-queries tab handles each click (avoids stale ElementHandle).
 * Does not modify production.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/grade-c-batch-e-2026-09-09/fitness-flake-diagnostic.json",
);
const SLUG = "fitness-gym-insurance";
const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 844, isMobile: true },
  { name: "desktop-1440", width: 1440, height: 900 },
];

async function audit(page, vp, strategy) {
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
        ".pilot-ce-stage-frame, .pilot-product-explorer-stage, .pilot-auto-explorer-stage",
      ),
    ),
  );
  if (!hasExplorer) {
    return { viewport: vp.name, strategy, explorer: false, pass: false, error: "no explorer" };
  }

  await page.evaluate(() =>
    document
      .querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage")
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));

  const tabCount = await page.evaluate(
    () => document.querySelectorAll(".pilot-product-coverage-card").length,
  );
  const states = [];
  let error = null;

  try {
    for (let i = 0; i < Math.max(tabCount, 1); i++) {
      if (strategy === "stale-handle") {
        // Mimic original regression: capture NodeList once, click by index
        const tabs = await page.$$(".pilot-product-coverage-card");
        if (tabs[i]) {
          await tabs[i].click();
          await new Promise((r) => setTimeout(r, 450));
        }
      } else {
        // Robust: re-query each time via evaluate click
        await page.evaluate((idx) => {
          const tabs = document.querySelectorAll(".pilot-product-coverage-card");
          tabs[idx]?.scrollIntoView({ block: "center" });
          tabs[idx]?.click();
        }, i);
        await new Promise((r) => setTimeout(r, 450));
      }

      const m = await page.evaluate(() => {
        const stage = document.querySelector(
          ".pilot-product-explorer-stage, .pilot-ce-stage-frame",
        );
        const img =
          document.querySelector(".pilot-ce-scene-interactive-master-image") ||
          document.querySelector(".pilot-ce-state-image--current") ||
          document.querySelector(".pilot-ce-state-image");
        const active = document.querySelector(
          ".pilot-product-coverage-card.is-active",
        );
        const stageRect = stage?.getBoundingClientRect();
        const imgRect = img?.getBoundingClientRect();
        let contained = null;
        if (stageRect && imgRect) {
          contained =
            imgRect.left >= stageRect.left - 1 &&
            imgRect.top >= stageRect.top - 1 &&
            imgRect.right <= stageRect.right + 1 &&
            imgRect.bottom <= stageRect.bottom + 1;
        }
        return {
          activeId: active?.id || null,
          hasImage: Boolean(img),
          containedInStage: contained,
          detailTitle: stage?.querySelector("h3")?.textContent?.trim() || null,
        };
      });
      states.push({ index: i, ...m });
    }
  } catch (e) {
    error = e.message || String(e);
  }

  const anyClip = states.some((s) => s.containedInStage === false);
  return {
    viewport: vp.name,
    strategy,
    explorer: true,
    tabCount,
    stateCount: states.length,
    states,
    pass: !error && !anyClip && states.length === tabCount,
    error,
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
    const runResult = { run, results: [] };
    for (const vp of VIEWPORTS) {
      for (const strategy of ["stale-handle", "requery-click"]) {
        process.stderr.write(`RUN ${run} ${vp.name} ${strategy}\n`);
        runResult.results.push(await audit(page, vp, strategy));
      }
    }
    runs.push(runResult);
  }

  await browser.close();

  const summary = {
    slug: SLUG,
    runs: runs.map((r) => ({
      run: r.run,
      results: r.results.map((x) => ({
        viewport: x.viewport,
        strategy: x.strategy,
        pass: x.pass,
        error: x.error,
        tabCount: x.tabCount,
        stateCount: x.stateCount,
        anyClip: x.states?.some((s) => s.containedInStage === false) || false,
      })),
    })),
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ summary, runs }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
