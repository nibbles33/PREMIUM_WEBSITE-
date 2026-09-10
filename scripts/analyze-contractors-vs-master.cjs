#!/usr/bin/env node
/** Align each Contractors state PNG against the interactive master base. */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_DIR = path.join(__dirname, "../public/images");
const MASTER = "contractors-insurance-interactive-master.png";
const STATES = [
  { key: "general-liability", file: "contractors-insurance-state-liability.png" },
  { key: "tools-equipment", file: "contractors-insurance-state-tools-equipment.png" },
  { key: "builder-s-risk", file: "contractors-insurance-state-property.png" },
  { key: "wrap-up", file: "contractors-insurance-state-installation-work.png" },
];

const SAMPLE_W = 418;
const SAMPLE_H = 235;
const MAX_SHIFT = 48;

async function loadEdgeSample(file) {
  const { data, info } = await sharp(path.join(IMAGE_DIR, file))
    .resize(SAMPLE_W, SAMPLE_H, { fit: "fill" })
    .grayscale()
    .convolve({ width: 3, height: 3, kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1] })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

function mse(a, b, w, h, shiftX, shiftY) {
  let sum = 0;
  let count = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const x2 = x + shiftX;
      const y2 = y + shiftY;
      if (x2 < 0 || y2 < 0 || x2 >= w || y2 >= h) continue;
      const d = a[y * w + x] - b[y2 * w + x2];
      sum += d * d;
      count++;
    }
  }
  return count ? sum / count : Infinity;
}

function findBestShift(ref, cmp) {
  let best = { shiftX: 0, shiftY: 0, mse: Infinity };
  for (let sy = -MAX_SHIFT; sy <= MAX_SHIFT; sy++) {
    for (let sx = -MAX_SHIFT; sx <= MAX_SHIFT; sx++) {
      const err = mse(ref.data, cmp.data, ref.width, ref.height, sx, sy);
      if (err < best.mse) best = { shiftX: sx, shiftY: sy, mse: err };
    }
  }
  const zero = mse(ref.data, cmp.data, ref.width, ref.height, 0, 0);
  return {
    sampleShiftX: best.shiftX,
    sampleShiftY: best.shiftY,
    canvasShiftX: best.shiftX * (1672 / SAMPLE_W),
    canvasShiftY: best.shiftY * (941 / SAMPLE_H),
    mseAtBest: best.mse,
    mseAtZero: zero,
    improvement: zero - best.mse,
  };
}

async function main() {
  const ref = await loadEdgeSample(MASTER);
  console.log("=== Edge alignment vs interactive-master ===\n");

  const results = {};
  for (const s of STATES) {
    const cmp = await loadEdgeSample(s.file);
    const a = findBestShift(ref, cmp);
    results[s.key] = { file: s.file, ...a };
    console.log(`${s.key}:`);
    console.log(`  zero-shift MSE: ${a.mseAtZero.toFixed(1)}`);
    console.log(`  best shift (canvas px): X=${a.canvasShiftX.toFixed(1)} Y=${a.canvasShiftY.toFixed(1)}`);
    console.log(`  improvement: ${a.improvement.toFixed(1)}`);
    console.log("");
  }

  const out = path.join(__dirname, "../docs/qa-screenshots/contractors-geometry-fix/source-alignment/master-edge-alignment.json");
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
}

main();
