#!/usr/bin/env npx tsx
/**
 * Homepage category completeness verifier.
 * Ensures discovery categories match nav-business and legacy URLs remain reachable.
 */
import fs from "fs";
import path from "path";
import {
  HOMEPAGE_CATEGORY_ASSIGNMENTS,
  HOMEPAGE_CATEGORY_IDS,
  LEGACY_HOMEPAGE_PRODUCT_URLS,
  getAllHomepageDiscoveryHrefs,
} from "../src/data/homepage-category-taxonomy";
import {
  commercialCategories,
  commercialIndustryCategories,
  commercialSpecialtyCategory,
} from "../src/data/pilot-home";
import {
  businessNavCategories,
  businessNavIndustries,
} from "../src/data/nav-business";

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

if (commercialIndustryCategories.length !== 8) {
  errors.push(
    `Expected 8 primary industries, found ${commercialIndustryCategories.length}`,
  );
}
if (commercialSpecialtyCategory.role !== "specialty_group") {
  errors.push("Specialty category must use role specialty_group");
}
if (commercialSpecialtyCategory.id !== "specialty-community") {
  errors.push("Specialty category id must be specialty-community");
}

const expectedIndustryOrder = businessNavIndustries.map((c) => c.id);
const actualIndustryOrder = commercialIndustryCategories.map((c) => c.id);
if (
  JSON.stringify(expectedIndustryOrder) !== JSON.stringify(actualIndustryOrder)
) {
  errors.push(
    `Industry order mismatch. expected=${expectedIndustryOrder.join(",")} actual=${actualIndustryOrder.join(",")}`,
  );
}

for (const id of HOMEPAGE_CATEGORY_IDS) {
  const expected = HOMEPAGE_CATEGORY_ASSIGNMENTS[id];
  const category = commercialCategories.find((c) => c.id === id);
  const found = category?.products.map((p) => p.href) ?? [];
  const nav = businessNavCategories.find((c) => c.id === id);
  const navHrefs = nav?.links.map((l) => l.href) ?? [];

  const expectedSet = new Set(expected);
  const missing = expected.filter((href) => !found.includes(href));
  const extra = found.filter((href) => !expectedSet.has(href));
  const duplicates = found.length !== new Set(found).size;
  const navMismatch =
    JSON.stringify(found) !== JSON.stringify(navHrefs) ||
    category?.products.some(
      (p, i) => p.label !== nav?.links[i]?.label || p.href !== nav?.links[i]?.href,
    );

  for (const href of found) {
    if (!pageExists(href)) errors.push(`${id}: dead link ${href}`);
  }
  if (duplicates) errors.push(`${id}: duplicate href within category`);
  if (missing.length) errors.push(`${id}: missing ${missing.join(", ")}`);
  if (extra.length) errors.push(`${id}: extra ${extra.join(", ")}`);
  if (navMismatch) errors.push(`${id}: products do not match nav-business`);

  const ok =
    missing.length === 0 &&
    extra.length === 0 &&
    !duplicates &&
    !navMismatch;
  if (ok) passCount += 1;
  totalLinks += found.length;

  results.push({
    category: id,
    found: found.length,
    expected: expected.length,
    missing,
    extra,
    duplicatesWithinCategory: duplicates,
    matchesNavBusiness: !navMismatch,
    status: ok ? "PASS" : "FAIL",
  });
}

const discoveryHrefs = new Set(getAllHomepageDiscoveryHrefs());
const missingLegacy = LEGACY_HOMEPAGE_PRODUCT_URLS.filter(
  (href) => !discoveryHrefs.has(href),
);
if (missingLegacy.length) {
  errors.push(
    `Legacy homepage URLs not discoverable: ${missingLegacy.join(", ")}`,
  );
}

const output = {
  categoriesPass: passCount,
  categoriesTotal: HOMEPAGE_CATEGORY_IDS.length,
  primaryIndustries: commercialIndustryCategories.length,
  specialtyGroup: commercialSpecialtyCategory.id,
  totalHomepageProductLinks: totalLinks,
  legacyUrlsPreserved: missingLegacy.length === 0,
  missingLegacyUrls: missingLegacy,
  results,
  errors,
  ok:
    errors.length === 0 &&
    passCount === HOMEPAGE_CATEGORY_IDS.length &&
    missingLegacy.length === 0,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(output, null, 2));

console.log(`CATEGORY COMPLETENESS: ${passCount}/${HOMEPAGE_CATEGORY_IDS.length}`);
console.log(`PRIMARY INDUSTRIES: ${commercialIndustryCategories.length}`);
console.log(`TOTAL HOMEPAGE PRODUCT LINKS: ${totalLinks}`);
console.log(`LEGACY URLS PRESERVED: ${missingLegacy.length === 0}`);
console.log(`ERRORS: ${errors.length}`);
if (errors.length) errors.forEach((e) => console.error(`- ${e}`));
console.log(`WROTE ${OUT_JSON}`);
process.exit(output.ok ? 0 : 1);
