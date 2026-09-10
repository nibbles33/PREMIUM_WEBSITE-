#!/usr/bin/env node
/**
 * Inspect Contractors Coverage Explorer image geometry across interaction states.
 * Captures DOM/computed styles for fresh load vs post-selection.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/contractors-insurance/";
const OUT_DIR =
  process.env.OUT_DIR ||
  path.join(__dirname, "../docs/qa-screenshots/contractors-geometry-fix");

const SEQUENCE = [
  { key: "A-fresh-general", label: "Fresh load — General", clickTab: null },
  { key: "B-tools", label: "Click Tools", clickTab: 1 },
  { key: "C-builders", label: "Click Builder's", clickTab: 2 },
  { key: "D-wrap-up", label: "Click Wrap-Up", clickTab: 3 },
  { key: "E-general-again", label: "Click General again", clickTab: 0 },
];

const TAB_NAMES = [
  "general-liability",
  "tools-equipment-coverage",
  "builder-s-risk",
  "wrap-up-liability",
];

async function measure(page) {
  return page.evaluate(() => {
    const frame = document.querySelector(".pilot-ce-stage-frame--contractors-insurance");
    const stage = document.querySelector(".pilot-ce-state-image-stage");
    const stack = document.querySelector(".pilot-ce-state-image-stack");
    const img =
      document.querySelector(".pilot-ce-state-image--current") ||
      document.querySelector(".pilot-ce-state-image");
    const nextImg = document.querySelector(".pilot-ce-state-image--next");

    function rect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
        top: r.top,
        left: r.left,
        right: r.right,
        bottom: r.bottom,
      };
    }

    function styles(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        objectFit: cs.objectFit,
        objectPosition: cs.objectPosition,
        position: cs.position,
        inset: `${cs.top} ${cs.right} ${cs.bottom} ${cs.left}`,
        transform: cs.transform,
        transformOrigin: cs.transformOrigin,
        overflow: cs.overflow,
        aspectRatio: cs.aspectRatio,
        maxWidth: cs.maxWidth,
        maxHeight: cs.maxHeight,
        width: cs.width,
        height: cs.height,
        minHeight: cs.minHeight,
        clipPath: cs.clipPath,
        animationName: cs.animationName,
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
            class: node.className?.slice?.(0, 80) || "",
            overflow: cs.overflow,
            overflowX: cs.overflowX,
            overflowY: cs.overflowY,
          });
        }
        node = node.parentElement;
      }
      return chain;
    }

    const natural = img
      ? { width: img.naturalWidth, height: img.naturalHeight }
      : null;

    const painted =
      frame && natural
        ? (() => {
            const fr = frame.getBoundingClientRect();
            const scale = Math.min(fr.width / natural.width, fr.height / natural.height);
            const w = natural.width * scale;
            const h = natural.height * scale;
            const ox = (fr.width - w) / 2;
            const oy = (fr.height - h) / 2;
            return {
              width: w,
              height: h,
              offsetX: ox,
              offsetY: oy,
              left: fr.left + ox,
              top: fr.top + oy,
              right: fr.left + ox + w,
              bottom: fr.top + oy + h,
            };
          })()
        : null;

    return {
      dataInteracted: stage?.getAttribute("data-interacted") ?? null,
      dataCoverage: stage?.getAttribute("data-coverage") ?? null,
      dataMotion: stage?.getAttribute("data-motion") ?? null,
      imgSrc: img?.currentSrc || img?.src || null,
      nextImgSrc: nextImg?.currentSrc || nextImg?.src || null,
      component: stage ? "CoverageStateImageStage" : "unknown",
      frame: rect(frame),
      stage: rect(stage),
      stack: rect(stack),
      imgElement: rect(img),
      paintedContainRect: painted,
      imgStyles: styles(img),
      stackStyles: styles(stack),
      frameStyles: styles(frame),
      overflowAncestors: overflowChain(img),
      activeTabId: document
        .querySelector(".pilot-product-coverage-card.is-active")
        ?.textContent?.trim()
        ?.split("\n")[0],
    };
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 600));

  const results = [];
  const tabs = await page.$$(".pilot-product-coverage-card");

  for (const step of SEQUENCE) {
    if (step.clickTab !== null) {
      await tabs[step.clickTab].click();
      await new Promise((r) => setTimeout(r, 2200));
    } else {
      await new Promise((r) => setTimeout(r, 800));
    }

    const m = await measure(page);
    results.push({ step: step.key, label: step.label, ...m });

    const shotName = step.key.replace(/^A-/, "01-").replace(/^B-/, "02-").replace(/^C-/, "03-").replace(/^D-/, "04-").replace(/^E-/, "05-") + ".png";
    const frame = await page.$(".pilot-ce-stage-frame--contractors-insurance");
    if (frame) {
      await frame.screenshot({ path: path.join(OUT_DIR, shotName) });
    }
  }

  await browser.close();

  const report = {
    capturedAt: new Date().toISOString(),
    viewport: { width: 1440, height: 900 },
    sequence: results,
    geometryComparison: {
      frameRects: results.map((r) => ({ step: r.step, ...r.frame })),
      imgRects: results.map((r) => ({ step: r.step, ...r.imgElement })),
      paintedRects: results.map((r) => ({ step: r.step, ...r.paintedContainRect })),
      sources: results.map((r) => ({ step: r.step, src: r.imgSrc, interacted: r.dataInteracted })),
      transforms: results.map((r) => ({
        step: r.step,
        transform: r.imgStyles?.transform,
        animation: r.imgStyles?.animationName,
      })),
    },
  };

  const reportPath = path.join(OUT_DIR, "geometry-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log("=== Contractors geometry inspection ===\n");
  for (const r of results) {
    console.log(`--- ${r.label} (${r.step}) ---`);
    console.log("  interacted:", r.dataInteracted);
    console.log("  src:", r.imgSrc?.split("/").pop());
    console.log("  frame:", r.frame?.width?.toFixed(1), "x", r.frame?.height?.toFixed(1));
    console.log("  img box:", r.imgElement?.width?.toFixed(1), "x", r.imgElement?.height?.toFixed(1));
    console.log(
      "  painted:",
      r.paintedContainRect?.width?.toFixed(1),
      "x",
      r.paintedContainRect?.height?.toFixed(1),
    );
    console.log("  object-fit:", r.imgStyles?.objectFit);
    console.log("  transform:", r.imgStyles?.transform);
    console.log("  animation:", r.imgStyles?.animationName);
    console.log("");
  }

  const first = results[0];
  const mismatches = results.slice(1).filter((r) => {
    if (!first.frame || !r.frame) return true;
    return (
      Math.abs(r.frame.width - first.frame.width) > 1 ||
      Math.abs(r.frame.height - first.frame.height) > 1 ||
      Math.abs(r.paintedContainRect.width - first.paintedContainRect.width) > 2 ||
      Math.abs(r.paintedContainRect.height - first.paintedContainRect.height) > 2 ||
      Math.abs(r.imgElement.width - first.imgElement.width) > 2 ||
      Math.abs(r.imgElement.height - first.imgElement.height) > 2
    );
  });

  const sourceMismatches = results.filter(
    (r) => !r.imgSrc?.includes("state-") && !r.imgSrc?.includes("state-liability"),
  );
  if (sourceMismatches.length) {
    console.log(
      "NON-STATE IMAGE SOURCES:",
      sourceMismatches.map((m) => `${m.step}: ${m.imgSrc?.split("/").pop()}`).join(", "),
    );
    process.exitCode = 1;
  }

  if (mismatches.length) {
    console.log("GEOMETRY MISMATCH vs fresh load:", mismatches.map((m) => m.step).join(", "));
    process.exitCode = 1;
  } else {
    console.log("All steps share identical geometry.");
  }

  console.log("\nReport:", reportPath);
  console.log("Screenshots:", OUT_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
