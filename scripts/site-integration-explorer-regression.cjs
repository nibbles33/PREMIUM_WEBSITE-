#!/usr/bin/env node
/**
 * Extended Coverage Explorer regression — all states, multiple viewports, geometry proof.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/site-integration-final-7402");

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1280", width: 1280, height: 900 },
  { name: "desktop-1024", width: 1024, height: 900 },
  { name: "mobile-390", width: 390, height: 844, isMobile: true },
];

function loadInteractiveMasterRoutes() {
  const src = fs.readFileSync(
    path.join(__dirname, "../src/data/coverage-explorer/interactive-master-assets.ts"),
    "utf8",
  );
  const block = src.match(/ROUTE_TO_INTERACTIVE_MASTER_FILE[^=]*=\s*\{([\s\S]*?)\n\};/);
  const routes = {};
  for (const m of block[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) routes[m[1]] = m[2];
  return Object.keys(routes).sort();
}

async function measureExplorer(page) {
  return page.evaluate(() => {
    const frame = document.querySelector(".pilot-ce-stage-frame");
    const stage = document.querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage");
    const img =
      document.querySelector(".pilot-ce-scene-interactive-master-image") ||
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image");
    const imgEl = img?.tagName === "IMG" ? img : img;
    function rect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height, left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    }
    const frameRect = rect(frame);
    const stageRect = rect(stage || frame);
    const imgRect = rect(imgEl);
    const natural = imgEl ? { width: imgEl.naturalWidth, height: imgEl.naturalHeight } : null;
    let containedInStage = null;
    let painted = null;
    if (frameRect && imgRect && natural?.width && imgEl) {
      const fit = getComputedStyle(imgEl).objectFit || "fill";
      let pw, ph, ox, oy;
      if (fit === "contain") {
        const scale = Math.min(imgRect.width / natural.width, imgRect.height / natural.height);
        pw = natural.width * scale;
        ph = natural.height * scale;
        ox = (imgRect.width - pw) / 2;
        oy = (imgRect.height - ph) / 2;
      } else {
        pw = imgRect.width;
        ph = imgRect.height;
        ox = 0;
        oy = 0;
      }
      painted = { left: imgRect.left + ox, top: imgRect.top + oy, right: imgRect.left + ox + pw, bottom: imgRect.top + oy + ph };
      const within = (outer, inner) =>
        inner.left >= outer.left - 1 && inner.top >= outer.top - 1 && inner.right <= outer.right + 1 && inner.bottom <= outer.bottom + 1;
      containedInStage = stageRect ? within(stageRect, painted) : null;
    }
    const activeTab = document.querySelector(".pilot-product-coverage-card.is-active, .pilot-auto-coverage-card.is-active");
    const activeId = activeTab?.id?.replace(/.*-tab-/, "") || null;
    const caption = document.querySelector(".pilot-ce-stage-title")?.textContent?.trim() || "";
    return {
      mode: document.querySelector(".pilot-ce-scene-interactive-master-image") ? "interactive-master" : document.querySelector(".pilot-ce-state-image-stage") ? "state-images" : "other",
      natural,
      frameRect,
      stageRect,
      imgRect,
      imgStyles: imgEl ? { objectFit: getComputedStyle(imgEl).objectFit, transform: getComputedStyle(imgEl).transform } : null,
      containedInStage,
      paintedContentRect: painted,
      activeCoverageId: activeId,
      caption,
      frameOverflowStage: frameRect && stageRect ? frameRect.right > stageRect.right + 1 || frameRect.left < stageRect.left - 1 : null,
    };
  });
}

async function auditRouteViewport(page, slug, vp) {
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile || false });
  const route = `/${slug}/`;
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 1200));
  const hasExplorer = await page.evaluate(() =>
    Boolean(document.querySelector(".pilot-ce-stage-frame, .pilot-auto-explorer-stage")),
  );
  if (!hasExplorer) return { slug, viewport: vp.name, explorer: false };

  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));

  // Re-query + evaluate-click each iteration — avoids stale ElementHandle after React re-render
  // (confirmed Fitness flake on desktop-1024 when capturing page.$$ once then clicking retained handles).
  const tabClass = slug === "auto-insurance" ? "pilot-auto-coverage-card" : "pilot-product-coverage-card";
  const tabCount = await page.evaluate((cls) => document.querySelectorAll(`.${cls}`).length, tabClass);
  const states = [];

  for (let i = 0; i < Math.max(tabCount, 1); i++) {
    await page.evaluate(
      (cls, idx) => {
        const tabs = document.querySelectorAll(`.${cls}`);
        tabs[idx]?.scrollIntoView({ block: "center" });
        tabs[idx]?.click();
      },
      tabClass,
      i,
    );
    await new Promise((r) => setTimeout(r, 450));
    const m = await measureExplorer(page);
    states.push({ index: i, ...m });
  }

  const anyClip = states.some((s) => s.containedInStage === false || s.frameOverflowStage === true);
  return { slug, viewport: vp.name, explorer: true, stateCount: states.length, states, pass: !anyClip };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const routes = loadInteractiveMasterRoutes();
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  const results = [];
  for (const slug of routes) {
    for (const vp of VIEWPORTS) {
      process.stderr.write(`${slug} @ ${vp.name}\n`);
      results.push(await auditRouteViewport(page, slug, vp));
    }
  }

  await browser.close();

  const explorerRoutes = results.filter((r) => r.explorer);
  const summary = {
    totalChecks: results.length,
    explorerChecks: explorerRoutes.length,
    pass: explorerRoutes.filter((r) => r.pass).length,
    fail: explorerRoutes.filter((r) => !r.pass).length,
    noExplorer: results.filter((r) => !r.explorer).length,
    failures: explorerRoutes.filter((r) => !r.pass).map((r) => `${r.slug}@${r.viewport}`),
  };

  fs.writeFileSync(path.join(OUT_DIR, "explorer-full-regression.json"), JSON.stringify({ summary, results }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
