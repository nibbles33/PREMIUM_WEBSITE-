#!/usr/bin/env node
/**
 * READ-ONLY inventory of public/images assets vs placements.ts usage.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMAGE_EXT = /\.(webp|png|jpe?g|svg)$/i;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (IMAGE_EXT.test(ent.name)) files.push(p);
  }
  return files;
}

function loadPlacements() {
  const src = fs.readFileSync(
    path.join(ROOT, "src/data/photography/placements.ts"),
    "utf8",
  );
  const used = new Map();
  const blocks = src.match(/\{\s*slug:[\s\S]*?\},(?=\s*\{|\s*\];)/g) ?? [];
  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const route = block.match(/route:\s*"([^"]+)"/)?.[1];
    const srcPath = block.match(/src:\s*"([^"]+)"/)?.[1];
    if (srcPath) used.set(srcPath, { slug, route });
  }
  return used;
}

function categorize(rel) {
  if (rel.includes("/photography/personal/")) return "personal";
  if (rel.includes("/photography/commercial/")) return "commercial";
  if (rel.includes("/photography/special/")) return "special";
  if (rel.includes("/awards/")) return "awards";
  if (rel.includes("/partners/") || rel.includes("/carriers/")) return "partners";
  if (rel.includes("/miniatures/")) return "miniatures";
  if (rel.includes("/logo/")) return "logo";
  return "other";
}

const publicImages = walk(path.join(ROOT, "public/images"));
const placements = loadPlacements();

const inventory = publicImages.map((abs) => {
  const rel = abs.replace(path.join(ROOT, "public"), "").replace(/\\/g, "/");
  const stat = fs.statSync(abs);
  const usage = placements.get(rel);
  return {
    path: rel,
    category: categorize(rel),
    format: path.extname(rel).slice(1),
    bytes: stat.size,
    usedInPlacements: Boolean(usage),
    routes: usage ? [usage.route] : [],
    slug: usage?.slug ?? null,
  };
});

const byCategory = {};
for (const item of inventory) {
  byCategory[item.category] = byCategory[item.category] || [];
  byCategory[item.category].push(item);
}

const duplicateSrc = {};
for (const [src, meta] of placements) {
  if (!duplicateSrc[src]) duplicateSrc[src] = [];
  duplicateSrc[src].push(meta.route);
}

const duplicates = Object.entries(duplicateSrc)
  .filter(([, routes]) => routes.length > 1)
  .map(([src, routes]) => ({ src, routes, count: routes.length }));

const out = {
  timestamp: new Date().toISOString(),
  totalAssets: inventory.length,
  byCategory: Object.fromEntries(
    Object.entries(byCategory).map(([k, v]) => [k, v.length]),
  ),
  unusedPhotography: inventory.filter(
    (i) =>
      i.category === "commercial" ||
      i.category === "personal" ||
      i.category === "special",
  ).filter((i) => !i.usedInPlacements),
  duplicateHeroUsage: duplicates,
  items: inventory,
};

fs.mkdirSync(path.join(ROOT, "docs/qa-screenshots/pre-integration-part1"), {
  recursive: true,
});
fs.writeFileSync(
  path.join(ROOT, "docs/qa-screenshots/pre-integration-part1/image-library-inventory.json"),
  JSON.stringify(out, null, 2),
);

console.log(
  JSON.stringify(
    {
      totalAssets: out.totalAssets,
      byCategory: out.byCategory,
      unusedPhotographyCount: out.unusedPhotography.length,
      duplicateHeroUsage: out.duplicateHeroUsage,
    },
    null,
    2,
  ),
);
