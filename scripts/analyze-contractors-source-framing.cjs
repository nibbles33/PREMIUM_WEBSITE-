#!/usr/bin/env node
/**
 * Analyze Contractors state PNG scene framing within the 1672×941 canvas.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES = [
  { key: "master", file: "contractors-insurance-interactive-master.png" },
  { key: "general-liability", file: "contractors-insurance-state-liability.png" },
  { key: "tools-equipment", file: "contractors-insurance-state-tools-equipment.png" },
  { key: "builder-s-risk", file: "contractors-insurance-state-property.png" },
  { key: "wrap-up", file: "contractors-insurance-state-installation-work.png" },
];

const IMAGE_DIR = path.join(__dirname, "../public/images");
const BG_THRESHOLD = 248;

function contentBounds(data, width, height) {
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;
  let contentPixels = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (width * y + x) * 3;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const chroma = Math.max(r, g, b) - Math.min(r, g, b);
      const isBg = lum > BG_THRESHOLD && chroma < 18;
      if (!isBg) {
        contentPixels++;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (contentPixels === 0) return null;

  const bboxW = maxX - minX + 1;
  const bboxH = maxY - minY + 1;
  const cx = minX + bboxW / 2;
  const cy = minY + bboxH / 2;

  return {
    width,
    height,
    minX,
    minY,
    maxX,
    maxY,
    bboxW,
    bboxH,
    centerX: cx,
    centerY: cy,
    offsetFromCanvasCenterX: cx - width / 2,
    offsetFromCanvasCenterY: cy - height / 2,
    marginLeft: minX,
    marginRight: width - maxX - 1,
    marginTop: minY,
    marginBottom: height - maxY - 1,
    contentPixels,
  };
}

function compareToRef(ref, other) {
  return {
    deltaCenterX: other.centerX - ref.centerX,
    deltaCenterY: other.centerY - ref.centerY,
    deltaMarginLeft: other.marginLeft - ref.marginLeft,
    deltaMarginRight: other.marginRight - ref.marginRight,
    deltaBboxW: other.bboxW - ref.bboxW,
    deltaBboxH: other.bboxH - ref.bboxH,
  };
}

async function analyze(file) {
  const img = sharp(path.join(IMAGE_DIR, file));
  const meta = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const bounds = contentBounds(data, info.width, info.height);
  return { file, meta, bounds };
}

async function main() {
  const results = {};
  for (const { key, file } of IMAGES) {
    const { meta, bounds } = await analyze(file);
    results[key] = { file, width: meta.width, height: meta.height, ...bounds };
  }

  const ref = results["general-liability"];
  console.log("=== Contractors PNG content framing analysis ===\n");

  for (const { key } of IMAGES) {
    const r = results[key];
    console.log(`--- ${key} ---`);
    console.log(`  canvas: ${r.width}×${r.height}`);
    console.log(
      `  content bbox: ${r.bboxW}×${r.bboxH} @ (${r.minX},${r.minY})–(${r.maxX},${r.maxY})`,
    );
    console.log(
      `  margins L/R/T/B: ${r.marginLeft}/${r.marginRight}/${r.marginTop}/${r.marginBottom}`,
    );
    console.log(
      `  center offset: X=${r.offsetFromCanvasCenterX.toFixed(1)} Y=${r.offsetFromCanvasCenterY.toFixed(1)}`,
    );
    if (key !== "general-liability") {
      const d = compareToRef(ref, r);
      console.log(
        `  vs General: ΔcenterX=${d.deltaCenterX.toFixed(1)} ΔmarginL=${d.deltaMarginLeft} ΔmarginR=${d.deltaMarginRight} ΔbboxW=${d.deltaBboxW}`,
      );
    }
    console.log("");
  }

  const tools = results["tools-equipment"];
  const dTools = compareToRef(ref, tools);
  const isSourceProblem =
    Math.abs(dTools.deltaCenterX) > 8 ||
    Math.abs(dTools.deltaMarginLeft) > 8 ||
    Math.abs(dTools.deltaMarginRight) > 8 ||
    Math.abs(dTools.deltaBboxW) > 12;

  const outDir = path.join(__dirname, "../docs/qa-screenshots/contractors-geometry-fix");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "source-framing-analysis.json"),
    JSON.stringify(
      {
        analyzedAt: new Date().toISOString(),
        results,
        deltasFromGeneral: Object.fromEntries(
          IMAGES.filter((i) => i.key !== "general-liability").map(({ key }) => [
            key,
            compareToRef(ref, results[key]),
          ]),
        ),
        verdict: isSourceProblem ? "SOURCE_IMAGE_MISMATCH" : "WITHIN_TOLERANCE",
      },
      null,
      2,
    ),
  );

  console.log("=== Verdict ===");
  if (isSourceProblem) {
    console.log("SOURCE IMAGE PROBLEM — Tools PNG framing differs from General/other states.");
    console.log(`  Tools ΔcenterX vs General: ${dTools.deltaCenterX.toFixed(1)}px`);
    console.log(`  Tools margin L/R delta: ${dTools.deltaMarginLeft}/${dTools.deltaMarginRight}px`);
    process.exitCode = 2;
  } else {
    console.log("Source images similarly framed. Investigate CSS/rendering.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
