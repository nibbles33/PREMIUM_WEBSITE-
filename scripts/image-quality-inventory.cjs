#!/usr/bin/env node
/**
 * Visitor-facing photography quality inventory (audit-only).
 * Requires: npm install --no-save image-size  (dev utility)
 */
const fs = require("fs");
const path = require("path");

let imageSize;
try {
  ({ imageSize } = require("image-size"));
} catch {
  console.error("Install image-size first: npm install --no-save image-size");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUT_DIR = path.join(
  ROOT,
  "docs/qa-screenshots/prelaunch-batch-2-5-2026-09-10",
);
const OUT_JSON = path.join(OUT_DIR, "image-quality-inventory.json");

const DIRS = [
  "images/photography",
  "images/partners",
  "images/carriers",
  "images/awards",
  "images/CANNABIS",
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, files);
    else if (/\.(webp|jpg|jpeg|png)$/i.test(ent.name)) files.push(full);
  }
  return files;
}

function classify(meta, rel) {
  if (!meta) return { risk: "MEDIUM", reason: "Could not read dimensions" };
  const maxDim = Math.max(meta.width, meta.height);
  const isLogo =
    rel.includes("/partners/") ||
    rel.includes("/carriers/") ||
    rel.includes("/awards/");
  if (isLogo) {
    if (maxDim < 180)
      return { risk: "HIGH", reason: "Logo under 180px — soft when enlarged" };
    if (maxDim < 320)
      return { risk: "MEDIUM", reason: "Logo modest resolution for retina cards" };
    return { risk: "LOW", reason: "Logo resolution adequate" };
  }
  if (maxDim < 900)
    return { risk: "HIGH", reason: "Photo long edge under 900px" };
  if (maxDim < 1400)
    return {
      risk: "MEDIUM",
      reason: "Photo under 1400px — may soften on large/retina",
    };
  return {
    risk: "LOW",
    reason: "Intrinsic resolution adequate for typical Next/Image delivery",
  };
}

const files = DIRS.flatMap((d) => walk(path.join(PUBLIC, d)));
const results = [];
for (const file of files) {
  const rel = "/" + path.relative(PUBLIC, file).split(path.sep).join("/");
  let meta = null;
  try {
    meta = imageSize(fs.readFileSync(file));
  } catch {
    meta = null;
  }
  const { risk, reason } = classify(meta, rel);
  const isLogo =
    rel.includes("/partners/") ||
    rel.includes("/carriers/") ||
    rel.includes("/awards/");
  results.push({
    file: rel,
    type: path.extname(file).slice(1).toLowerCase(),
    intrinsicWidth: meta?.width ?? null,
    intrinsicHeight: meta?.height ?? null,
    visibleQualityRisk: risk,
    reason,
    likelyUpscaledDesktop:
      !!meta && !isLogo && Math.max(meta.width, meta.height) < 1400,
    replacementAssetRequired: risk === "HIGH",
  });
}

const summary = {
  total: results.length,
  high: results.filter((r) => r.visibleQualityRisk === "HIGH").length,
  medium: results.filter((r) => r.visibleQualityRisk === "MEDIUM").length,
  low: results.filter((r) => r.visibleQualityRisk === "LOW").length,
  highRiskFiles: results
    .filter((r) => r.visibleQualityRisk === "HIGH")
    .map((r) => ({
      file: r.file,
      width: r.intrinsicWidth,
      height: r.intrinsicHeight,
      reason: r.reason,
    })),
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify({ summary, results }, null, 2));
console.log(JSON.stringify(summary, null, 2));
console.log(`WROTE ${OUT_JSON}`);
