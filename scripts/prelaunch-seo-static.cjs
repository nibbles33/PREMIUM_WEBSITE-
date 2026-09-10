#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const pages = [];

function walk(dir, prefix = "") {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith("_") || ent.name.startsWith(".")) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.startsWith("(")) continue;
      walk(full, `${prefix}/${ent.name}`);
    } else if (ent.name === "page.tsx") {
      const src = fs.readFileSync(full, "utf8");
      const title =
        src.match(/title:\s*["']([^"']+)["']/)?.[1] ||
        src.match(/metaTitle:\s*["']([^"']+)["']/)?.[1] ||
        null;
      const desc =
        src.match(/description:\s*\n?\s*["']([^"']+)["']/)?.[1] ||
        src.match(/metaDescription:\s*\n?\s*["']([^"']+)["']/)?.[1] ||
        null;
      pages.push({
        route: prefix || "/",
        title,
        desc,
        hasMetadata: src.includes("export const metadata"),
        hasCanonical: src.includes("canonical"),
        noindex: /noindex/i.test(src),
      });
    }
  }
}

walk(path.join(ROOT, "src/app"));

function dupes(arr) {
  const counts = {};
  for (const v of arr) counts[v] = (counts[v] || 0) + 1;
  return Object.entries(counts)
    .filter(([, c]) => c > 1)
    .map(([value, count]) => ({ value, count }));
}

const titles = pages.map((p) => p.title).filter(Boolean);
const descs = pages.map((p) => p.desc).filter(Boolean);

const summary = {
  totalPages: pages.length,
  withMetadataExport: pages.filter((p) => p.hasMetadata).length,
  missingTitle: pages.filter((p) => !p.title).map((p) => p.route),
  missingDesc: pages.filter((p) => !p.desc).map((p) => p.route),
  withCanonical: pages.filter((p) => p.hasCanonical).length,
  noindexPages: pages.filter((p) => p.noindex).map((p) => p.route),
  duplicateTitles: dupes(titles),
  duplicateDescriptions: dupes(descs),
  premiumIbTitles: pages.filter((p) => p.title && /PremiumIB/i.test(p.title)).map((p) => ({ route: p.route, title: p.title })),
};

const outDir = path.join(ROOT, "docs/qa-screenshots/final-prelaunch-audit-2026-09-10");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "seo-static.json"), JSON.stringify({ summary, pages }, null, 2));
console.log(JSON.stringify(summary, null, 2));
