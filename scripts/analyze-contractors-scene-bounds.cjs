#!/usr/bin/env node
/**
 * Measure scene perimeter columns/rows across Contractors PNGs
 * by detecting departure from corner background color.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_DIR = path.join(__dirname, "../public/images");
const FILES = {
  master: "contractors-insurance-interactive-master.png",
  general: "contractors-insurance-state-liability.png",
  tools: "contractors-insurance-state-tools-equipment.png",
  builders: "contractors-insurance-state-property.png",
  wrapup: "contractors-insurance-state-installation-work.png",
};

async function loadRaw(file) {
  const { data, info } = await sharp(path.join(IMAGE_DIR, file))
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

function bgColor(data, w, c) {
  // sample four corners average
  const pts = [
    [0, 0],
    [w - 1, 0],
    [0, 941 - 1],
    [w - 1, 941 - 1],
  ];
  let r = 0,
    g = 0,
    b = 0;
  for (const [x, y] of pts) {
    const i = (y * w + x) * c;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  return { r: r / 4, g: g / 4, b: b / 4 };
}

function colorDist(a, b) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function sceneBounds(data, w, h, c, bg, threshold = 22) {
  let minX = w,
    maxX = 0,
    minY = h,
    maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      const px = { r: data[i], g: data[i + 1], b: data[i + 2] };
      if (colorDist(px, bg) > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const bboxW = maxX - minX + 1;
  const cx = minX + bboxW / 2;
  return {
    minX,
    maxX,
    minY,
    maxY,
    bboxW,
    bboxH: maxY - minY + 1,
    centerX: cx,
    centerY: minY + (maxY - minY + 1) / 2,
    marginLeft: minX,
    marginRight: w - maxX - 1,
    marginTop: minY,
    marginBottom: h - maxY - 1,
    offsetCenterX: cx - w / 2,
  };
}

async function main() {
  const results = {};
  for (const [key, file] of Object.entries(FILES)) {
    const { data, width, height, channels } = await loadRaw(file);
    const bg = bgColor(data, width, channels);
    results[key] = { file, bg, ...sceneBounds(data, width, height, channels, bg) };
  }

  const ref = results.general;
  console.log("=== Scene bounds via background-diff (1672×941) ===\n");
  for (const [key, r] of Object.entries(results)) {
    console.log(`${key} (${r.file}):`);
    console.log(`  scene bbox: ${r.bboxW}×${r.bboxH}`);
    console.log(`  margins L/R/T/B: ${r.marginLeft}/${r.marginRight}/${r.marginTop}/${r.marginBottom}`);
    console.log(`  centerX offset: ${r.offsetCenterX.toFixed(1)}px`);
    if (key !== "general") {
      console.log(
        `  vs General: ΔmarginL=${r.marginLeft - ref.marginLeft} ΔmarginR=${r.marginRight - ref.marginRight} ΔcenterX=${(r.centerX - ref.centerX).toFixed(1)}`,
      );
    }
    console.log("");
  }

  const tools = results.tools;
  const dL = tools.marginLeft - ref.marginLeft;
  const dR = tools.marginRight - ref.marginRight;
  const dCX = tools.centerX - ref.centerX;

  console.log("=== Verdict ===");
  if (Math.abs(dCX) > 5 || Math.abs(dL) > 5 || Math.abs(dR) > 5) {
    console.log(`SOURCE IMAGE MISMATCH: Tools scene offset vs General by ${dCX.toFixed(1)}px centerX`);
    console.log(`  Tools margin L/R vs General: ${dL}/${dR}px`);
  } else {
    console.log("Tools scene bounds match General within 5px — investigate CSS/rendering.");
  }

  const outDir = path.join(__dirname, "../docs/qa-screenshots/contractors-geometry-fix");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "scene-bounds-analysis.json"), JSON.stringify(results, null, 2));
}

main().catch(console.error);
