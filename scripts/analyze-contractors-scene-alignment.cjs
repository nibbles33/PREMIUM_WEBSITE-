#!/usr/bin/env node
/**
 * Cross-correlate Contractors state PNGs against General to detect
 * scene composition offsets (source-image alignment analysis).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_DIR = path.join(__dirname, "../public/images");
const STATES = [
  { key: "general-liability", file: "contractors-insurance-state-liability.png" },
  { key: "tools-equipment", file: "contractors-insurance-state-tools-equipment.png" },
  { key: "builder-s-risk", file: "contractors-insurance-state-property.png" },
  { key: "wrap-up", file: "contractors-insurance-state-installation-work.png" },
];

const SAMPLE_W = 418; // 1672/4
const SAMPLE_H = 235; // ~941/4
const MAX_SHIFT = 40;

async function loadGraySample(file) {
  const { data, info } = await sharp(path.join(IMAGE_DIR, file))
    .resize(SAMPLE_W, SAMPLE_H, { fit: "fill" })
    .grayscale()
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
      const i1 = y * w + x;
      const i2 = y2 * w + x2;
      const d = a[i1] - b[i2];
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
  // Convert sample pixels to full canvas pixels (×4)
  return {
    sampleShiftX: best.shiftX,
    sampleShiftY: best.shiftY,
    canvasShiftX: best.shiftX * (1672 / SAMPLE_W),
    canvasShiftY: best.shiftY * (941 / SAMPLE_H),
    mse: best.mse,
    alignedAtZero: best.shiftX === 0 && best.shiftY === 0,
  };
}

async function createOverlay(refFile, cmpFile, shiftX, shiftY, outPath) {
  const ref = sharp(path.join(IMAGE_DIR, refFile));
  const cmp = sharp(path.join(IMAGE_DIR, cmpFile));
  const refBuf = await ref.ensureAlpha().png().toBuffer();
  const cmpExtract = await cmp
    .extract({
      left: Math.max(0, Math.round(-shiftX)),
      top: Math.max(0, Math.round(-shiftY)),
      width: 1672 - Math.max(0, Math.round(-shiftX)) - Math.max(0, Math.round(shiftX)),
      height: 941 - Math.max(0, Math.round(-shiftY)) - Math.max(0, Math.round(shiftY)),
    })
    .toBuffer()
    .catch(() => cmp.png().toBuffer());

  // Simple side-by-side + diff
  const refRaw = await sharp(refBuf).resize(836, 470).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const cmpRaw = await sharp(path.join(IMAGE_DIR, cmpFile)).resize(836, 470).raw().ensureAlpha().toBuffer({ resolveWithObject: true });

  const w = refRaw.info.width;
  const h = refRaw.info.height;
  const diff = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const ri = i * 4;
    diff[ri] = Math.min(255, Math.abs(refRaw.data[ri] - cmpRaw.data[ri]) * 2);
    diff[ri + 1] = Math.min(255, Math.abs(refRaw.data[ri + 1] - cmpRaw.data[ri + 1]) * 2);
    diff[ri + 2] = Math.min(255, Math.abs(refRaw.data[ri + 2] - cmpRaw.data[ri + 2]) * 2);
    diff[ri + 3] = 255;
  }

  await sharp(diff, { raw: { width: w, height: h, channels: 4 } }).png().toFile(outPath);
}

async function main() {
  const ref = await loadGraySample(STATES[0].file);
  const zeroMse = mse(ref.data, ref.data, ref.width, ref.height, 0, 0);

  console.log("=== Scene alignment vs General (cross-correlation) ===\n");
  const results = {};

  for (const state of STATES) {
    const cmp = await loadGraySample(state.file);
    const alignment = findBestShift(ref, cmp);
    const selfMse = mse(ref.data, cmp.data, ref.width, ref.height, 0, 0);
    results[state.key] = { file: state.file, alignment, mseAtZero: selfMse, mseRatio: selfMse / zeroMse };
    console.log(`--- ${state.key} ---`);
    console.log(`  best shift (sample px): X=${alignment.sampleShiftX} Y=${alignment.sampleShiftY}`);
    console.log(`  best shift (canvas px est): X=${alignment.canvasShiftX.toFixed(1)} Y=${alignment.canvasShiftY.toFixed(1)}`);
    console.log(`  MSE at zero shift: ${selfMse.toFixed(1)} (ratio vs self: ${(selfMse / zeroMse).toFixed(3)})`);
    console.log("");
  }

  const tools = results["tools-equipment"].alignment;
  const builders = results["builder-s-risk"].alignment;
  const wrap = results["wrap-up"].alignment;

  const toolsMisaligned =
    Math.abs(tools.canvasShiftX) > 3 || Math.abs(tools.sampleShiftX) > 1;
  const othersMisaligned =
    Math.abs(builders.canvasShiftX) > 3 || Math.abs(wrap.canvasShiftX) > 3;

  const outDir = path.join(__dirname, "../docs/qa-screenshots/contractors-geometry-fix/source-alignment");
  fs.mkdirSync(outDir, { recursive: true });

  for (const state of STATES.slice(1)) {
    await createOverlay(
      STATES[0].file,
      state.file,
      0,
      0,
      path.join(outDir, `diff-vs-general-${state.key}.png`),
    );
  }

  fs.writeFileSync(
    path.join(outDir, "alignment-report.json"),
    JSON.stringify({ analyzedAt: new Date().toISOString(), results }, null, 2),
  );

  console.log("=== Verdict ===");
  if (toolsMisaligned && !othersMisaligned) {
    console.log("SOURCE IMAGE: Tools scene composition offset vs General.");
    console.log(`  Tools needs ~${tools.canvasShiftX.toFixed(1)}px horizontal realignment to match General.`);
    process.exitCode = 2;
  } else if (toolsMisaligned || othersMisaligned) {
    console.log("SOURCE IMAGE: Multiple states have composition offsets vs General.");
    process.exitCode = 2;
  } else {
    console.log("States align at zero shift — likely CSS/rendering inconsistency.");
  }
  console.log(`\nDiff images: ${outDir}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
