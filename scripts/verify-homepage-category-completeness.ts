#!/usr/bin/env npx tsx
/**
 * Homepage category completeness verifier.
 * Compares commercialCategories vs approved taxonomy assignments.
 */
import fs from "fs";
import path from "path";
import {
  HOMEPAGE_CATEGORY_ASSIGNMENTS,
  HOMEPAGE_CATEGORY_IDS,
} from "../src/data/homepage-category-taxonomy";
import { commercialCategories } from "../src/data/pilot-home";

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "docs/qa-screenshots/prelaunch-batch-2-5-2026-09-10",
);
const OUT_JSON = path.join(OUT_DIR, "homepage-category-completeness.json");

function pageExists(href: string): boolean {
  const slug = href.replace(/^\/|\/$/g, "");
  return fs.existsSync(path.join(ROOT, "src/app", slug, "page.tsx"));
}

const errors: string[] = [];
const results = [];
let passCount = 0;
let totalLinks = 0;

for (const id of HOMEPAGE_CATEGORY_IDS) {
  const expected = HOMEPAGE_CATEGORY_ASSIGNMENTS[id];
  const category = commercialCategories.find((c) => c.id === id);
  const found = category?.products.map((p) => p.href) ?? [];

  const expectedSet = new Set(expected);
  const missing = expected.filter((href) => !found.includes(href));
  const extra = found.filter((href) => !expectedSet.has(href));
  const duplicates = found.length !== new Set(found).size;

  for (const href of found) {
    if (!pageExists(href)) errors.push(`${id}: dead link ${href}`);
  }
  if (duplicates) errors.push(`${id}: duplicate href within category`);
  if (missing.length) errors.push(`${id}: missing ${missing.join(", ")}`);
  if (extra.length) errors.push(`${id}: extra ${extra.join(", ")}`);

  const ok = missing.length === 0 && extra.length === 0 && !duplicates;
  if (ok) passCount += 1;
  totalLinks += found.length;

  results.push({
    category: id,
    found: found.length,
    expected: expected.length,
    missing,
    extra,
    duplicatesWithinCategory: duplicates,
    status: ok ? "PASS" : "FAIL",
  });
}

const output = {
  categoriesPass: passCount,
  categoriesTotal: HOMEPAGE_CATEGORY_IDS.length,
  totalHomepageProductLinks: totalLinks,
  results,
  errors,
  ok: errors.length === 0 && passCount === HOMEPAGE_CATEGORY_IDS.length,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(output, null, 2));

console.log(`CATEGORY COMPLETENESS: ${passCount}/${HOMEPAGE_CATEGORY_IDS.length}`);
console.log(`TOTAL HOMEPAGE PRODUCT LINKS: ${totalLinks}`);
console.log(`ERRORS: ${errors.length}`);
if (errors.length) errors.forEach((e) => console.error(`- ${e}`));
console.log(`WROTE ${OUT_JSON}`);
process.exit(output.ok ? 0 : 1);
