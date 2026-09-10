#!/usr/bin/env node
/**
 * Full Coverage Explorer geometry audit — all live routes.
 * Measures rendered vs intrinsic bounds; classifies RENDERING/CSS vs SOURCE-ASSET.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/coverage-explorer-crop-audit");

function loadInteractiveMasterRoutes() {
  const src = fs.readFileSync(
    path.join(__dirname, "../src/data/coverage-explorer/interactive-master-assets.ts"),
    "utf8",
  );
  const block = src.match(/ROUTE_TO_INTERACTIVE_MASTER_FILE[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!block) throw new Error("Could not parse ROUTE_TO_INTERACTIVE_MASTER_FILE");
  const routes = {};
  for (const m of block[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) {
    routes[m[1]] = m[2];
  }
  return routes;
}

const INTERACTIVE_MASTER_ROUTES = Object.keys(loadInteractiveMasterRoutes());

const COMPACT_FILES = new Set([
  "auto-insurance-interactive-master.png",
  "daycare-private-school-insurance-interactive-master.png",
  "fitness-gym-insurance-interactive-master.png",
  "non-profit-insurance-interactive-master.png",
  "religious-organizations-insurance-interactive-master.png",
  "salon-barber-insurance-interactive-master.png",
]);

const NO_EXPLORER_ROUTES = [
  "/",
  "/about/",
  "/commercial-insurance/",
  "/get-a-quote/",
  "/talk-to-a-broker/",
  "/contact/",
  "/team/",
  "/partners/",
  "/payment/",
  "/compliance/",
  "/privacy-policy/",
  "/claims/",
  "/careers/",
  "/careers/general-application/",
  "/resources/",
  "/newsletter/",
];

const STATE_IMAGE_ROUTES = ["contractors-insurance", "restaurant-insurance"];

function expectedDims(filename) {
  return COMPACT_FILES.has(filename)
    ? { width: 1312, height: 1199 }
    : { width: 1672, height: 941 };
}

async function analyzeSourceEdgeBleed(imagePath) {
  try {
    const full = path.join(__dirname, "../public/images", imagePath.replace(/^\/images\//, ""));
    if (!fs.existsSync(full)) return { error: "missing-file" };
    const { data, info } = await sharp(full).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height } = info;
    const margin = 8;
    let edgeContent = { top: 0, right: 0, bottom: 0, left: 0 };
    const checkStrip = (xs, ys) => {
      let count = 0;
      for (const y of ys) {
        for (const x of xs) {
          const i = (y * width + x) * 4;
          const a = data[i + 3];
          const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          if (a > 12 && lum < 245) count++;
        }
      }
      return count;
    };
    edgeContent.top = checkStrip(
      Array.from({ length: width }, (_, x) => x),
      Array.from({ length: margin }, (_, i) => i),
    );
    edgeContent.bottom = checkStrip(
      Array.from({ length: width }, (_, x) => x),
      Array.from({ length: margin }, (_, i) => height - margin + i),
    );
    edgeContent.left = checkStrip(
      Array.from({ length: margin }, (_, i) => i),
      Array.from({ length: height }, (_, y) => y),
    );
    edgeContent.right = checkStrip(
      Array.from({ length: margin }, (_, i) => width - margin + i),
      Array.from({ length: height }, (_, y) => y),
    );
    const threshold = Math.max(20, Math.floor(width * 0.002));
    const touchesEdge = {
      top: edgeContent.top > threshold,
      right: edgeContent.right > threshold,
      bottom: edgeContent.bottom > threshold,
      left: edgeContent.left > threshold,
    };
    return { width, height, edgeContent, touchesEdge, likelySourceCrop: Object.values(touchesEdge).some(Boolean) };
  } catch (e) {
    return { error: e.message };
  }
}

async function measureExplorer(page) {
  return page.evaluate(() => {
    const frame =
      document.querySelector(".pilot-ce-stage-frame") ||
      document.querySelector(".pilot-product-coverage-stage-frame");
    const explorerStage = document.querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage");
    const img =
      document.querySelector(".pilot-ce-scene-interactive-master-image") ||
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image") ||
      document.querySelector(".pilot-ce-scene-cutaway-image") ||
      document.querySelector(".pilot-ce-scene-photo-image") ||
      (explorerStage || frame)?.querySelector("img");

    function rect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, left: r.left, right: r.right, bottom: r.bottom };
    }

    function styles(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        objectFit: cs.objectFit,
        objectPosition: cs.objectPosition,
        transform: cs.transform,
        aspectRatio: cs.aspectRatio,
        overflow: cs.overflow,
        width: cs.width,
        height: cs.height,
        minHeight: cs.minHeight,
        position: cs.position,
      };
    }

    function overflowChain(el) {
      const chain = [];
      let node = el;
      while (node && node !== document.body) {
        const cs = getComputedStyle(node);
        if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible") {
          chain.push({
            tag: node.tagName.toLowerCase(),
            class: (typeof node.className === "string" ? node.className : "").slice(0, 100),
            overflow: cs.overflow,
          });
        }
        node = node.parentElement;
      }
      return chain;
    }

    const imgEl = img?.tagName === "IMG" ? img : img?.querySelector?.("img") || img;
    const wrapper = imgEl?.parentElement;

    const natural = imgEl
      ? { width: imgEl.naturalWidth, height: imgEl.naturalHeight }
      : null;

    const frameRect = rect(frame);
    const imgRect = rect(imgEl);
    const wrapperRect = rect(wrapper);
    const stageRect = rect(explorerStage || frame);

    let painted = null;
    let containedInFrame = null;
    let containedInStage = null;

    if (frameRect && imgRect && natural?.width && imgEl) {
      const cs = getComputedStyle(imgEl);
      const fit = cs.objectFit || "fill";
      let pw, ph, ox, oy;
      if (fit === "contain") {
        const scale = Math.min(imgRect.width / natural.width, imgRect.height / natural.height);
        pw = natural.width * scale;
        ph = natural.height * scale;
        ox = (imgRect.width - pw) / 2;
        oy = (imgRect.height - ph) / 2;
      } else if (fit === "cover") {
        const scale = Math.max(imgRect.width / natural.width, imgRect.height / natural.height);
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
      const paintedGlobal = {
        left: imgRect.left + ox,
        top: imgRect.top + oy,
        right: imgRect.left + ox + pw,
        bottom: imgRect.top + oy + ph,
        width: pw,
        height: ph,
      };
      painted = paintedGlobal;

      const within = (outer, inner) =>
        inner.left >= outer.left - 1 &&
        inner.top >= outer.top - 1 &&
        inner.right <= outer.right + 1 &&
        inner.bottom <= outer.bottom + 1;

      containedInFrame = frameRect ? within(frameRect, paintedGlobal) : null;
      containedInStage = stageRect ? within(stageRect, paintedGlobal) : null;
    }

    const srcMatch = imgEl?.src?.match(/\/([^/?]+\.(png|webp|jpg))/);
    const usesFill = imgEl ? getComputedStyle(imgEl).position === "absolute" && styles(imgEl)?.width === styles(imgEl)?.height : false;

    return {
      mode: document.querySelector(".pilot-ce-scene-interactive-master-image")
        ? "interactive-master"
        : document.querySelector(".pilot-ce-state-image-stage")
          ? "coverage-state-images"
          : document.querySelector(".pilot-ce-scene-cutaway-image")
            ? "cutaway-miniature"
            : document.querySelector(".pilot-ce-scene-photo-image")
              ? "photo-scene"
              : document.querySelector(".pilot-product-coverage-stage--icon-only")
                ? "icon-only"
                : "none",
      sourceFilename: srcMatch?.[1] ?? null,
      natural,
      frameRect,
      imgRect,
      wrapperRect,
      stageRect,
      imgStyles: styles(imgEl),
      wrapperStyles: styles(wrapper),
      frameStyles: styles(frame),
      usesNextFill: img && img.getAttribute?.("data-nimg") === "fill",
      overflowChain: overflowChain(imgEl),
      paintedContentRect: painted,
      containedInFrame,
      containedInStage,
      imgClippedByFrame:
        frameRect && imgRect
          ? imgRect.width > frameRect.width + 1 || imgRect.height > frameRect.height + 1 || imgRect.left < frameRect.left - 1 || imgRect.right > frameRect.right + 1
          : null,
    };
  });
}

async function auditRoute(page, slug, isPostFixRun = false) {
  const route = `/${slug}/`;
  const isStateImages = STATE_IMAGE_ROUTES.includes(slug);
  const tabClass = slug === "auto-insurance" ? "pilot-auto-coverage-card" : "pilot-product-coverage-card";

  try {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1500));

    const hasExplorer = await page.evaluate(
      () =>
        Boolean(
          document.querySelector(".pilot-ce-stage-frame") ||
            document.querySelector(".pilot-auto-explorer-stage") ||
            document.querySelector(".pilot-product-explorer-stage"),
        ),
    );

    if (!hasExplorer) {
      return {
        route: slug,
        explorerPresent: false,
        stateCount: 0,
        notes: "NO EXPLORER / NOT APPLICABLE",
        issueType: "N/A",
        preFixStatus: isPostFixRun ? undefined : "N/A",
        postFixStatus: isPostFixRun ? "N/A" : "pending",
      };
    }

    await page.evaluate(() => {
      const el = document.querySelector(".pilot-product-explorer-stage, .pilot-auto-explorer-stage, .pilot-ce-stage");
      el?.scrollIntoView({ block: "center" });
    });
    await new Promise((r) => setTimeout(r, 400));

    const tabs = await page.$$(`.${tabClass}`);
    const stateCount = tabs.length || 1;
    const states = [];

    for (let i = 0; i < Math.max(tabs.length, 1); i++) {
      if (tabs[i]) {
        await tabs[i].click();
        await new Promise((r) => setTimeout(r, 500));
      }
      const m = await measureExplorer(page);
      states.push({ index: i, ...m });
    }

    const primary = states[0] || {};
    const anyRenderingClip = states.some(
      (s) => s.containedInFrame === false || s.containedInStage === false || s.imgClippedByFrame === true,
    );

    const srcFile = primary.sourceFilename;
    const sourceAnalysis = srcFile ? await analyzeSourceEdgeBleed(`/images/${srcFile}`) : null;

    let issueType = "NONE";
    if (anyRenderingClip) issueType = "RENDERING/CSS ISSUE";
    else if (sourceAnalysis?.likelySourceCrop) issueType = "SOURCE-ASSET ISSUE";
    else if (sourceAnalysis?.error) issueType = "UNKNOWN";

    const preFixStatus = anyRenderingClip || sourceAnalysis?.likelySourceCrop ? "FAIL" : "PASS";

    return {
      route: slug,
      explorerPresent: true,
      stateCount,
      sourceDimensions: primary.natural
        ? `${primary.natural.width}×${primary.natural.height}`
        : sourceAnalysis?.width
          ? `${sourceAnalysis.width}×${sourceAnalysis.height}`
          : "unknown",
      sourceFilename: srcFile,
      mode: primary.mode,
      preFixStatus: isPostFixRun ? undefined : preFixStatus,
      postFixStatus: isPostFixRun ? (anyRenderingClip || sourceAnalysis?.likelySourceCrop ? "FAIL" : "PASS") : "pending",
      issueType,
      notes: anyRenderingClip
        ? `Rendering clip: frame=${states.some((s) => s.containedInFrame === false)} stage=${states.some((s) => s.containedInStage === false)}`
        : sourceAnalysis?.likelySourceCrop
          ? `Source touches edge: ${JSON.stringify(sourceAnalysis.touchesEdge)}`
          : "",
      states,
      sourceAnalysis,
    };
  } catch (e) {
    return {
      route: slug,
      explorerPresent: "error",
      stateCount: 0,
      preFixStatus: "ERROR",
      postFixStatus: "pending",
      issueType: "ERROR",
      notes: e.message,
    };
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const allSlugs = [
    ...INTERACTIVE_MASTER_ROUTES,
    ...NO_EXPLORER_ROUTES.map((r) => r.replace(/^\/|\/$/g, "")).filter(Boolean),
  ];
  const uniqueSlugs = [...new Set(allSlugs)].sort();

  // Save pre-fix snapshot if present (for report diff)
  const preFixPath = path.join(OUT_DIR, "geometry-audit-pre-fix.json");
  const hadPreFix = fs.existsSync(preFixPath);
  const isPostFixRun = process.env.POST_FIX === "1";

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });

  const results = [];
  for (const slug of uniqueSlugs) {
    process.stderr.write(`Auditing ${slug}...\n`);
    results.push(await auditRoute(page, slug, isPostFixRun));
  }

  // Focus routes owner reported
  for (const slug of ["cyber-insurance", "travel-insurance", "mobile-home-insurance"]) {
    const r = results.find((x) => x.route === slug);
    if (r?.states?.length) {
      const dir = path.join(OUT_DIR, slug);
      fs.mkdirSync(dir, { recursive: true });
      await page.goto(`${BASE}/${slug}/`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }));
      await new Promise((r) => setTimeout(r, 1000));
      const tabs = await page.$$(".pilot-product-coverage-card");
      for (let i = 0; i < tabs.length; i++) {
        await tabs[i].click();
        await new Promise((r) => setTimeout(r, 600));
        const frame = await page.$(".pilot-ce-stage-frame");
        if (frame) await frame.screenshot({ path: path.join(dir, `state-${i}.png`) });
      }
    }
  }

  await browser.close();

  const outName = isPostFixRun ? "geometry-audit-post-fix.json" : "geometry-audit-pre-fix.json";
  fs.writeFileSync(path.join(OUT_DIR, outName), JSON.stringify({ results, consoleErrors }, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "geometry-audit.json"), JSON.stringify({ results, consoleErrors }, null, 2));

  const failRendering = results.filter((r) => r.issueType === "RENDERING/CSS ISSUE");
  console.log(`\nAudited ${results.length} routes`);
  console.log(`Rendering issues: ${failRendering.length}`);
  console.log(`Source issues: ${results.filter((r) => r.issueType === "SOURCE-ASSET ISSUE").length}`);
  console.log(`Pass: ${results.filter((r) => r.preFixStatus === "PASS").length}`);
  if (consoleErrors.length) console.log("Console errors:", [...new Set(consoleErrors)].slice(0, 5));

  for (const r of failRendering.slice(0, 5)) {
    console.log("\n", r.route, JSON.stringify(r.states?.[0], null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
