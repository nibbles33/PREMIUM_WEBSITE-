#!/usr/bin/env node
/**
 * Batch 3.5 — Personal Lines discovery completeness verifier (static).
 * Run: node scripts/verify-personal-discovery.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "docs/qa-screenshots/prelaunch-batch-3-5-2026-09-10",
);

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function hrefsFromFilmstrip(src) {
  const block = src.match(
    /export const personalFilmstripItems[^=]*=\s*\[([\s\S]*?)\];/,
  );
  if (!block) return [];
  return [...block[1].matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function hrefsFromNav(src) {
  return [...src.matchAll(/href:\s*"(\/[^"]+-insurance\/)"/g)].map((m) => m[1]);
}

function hrefsFromHub(src) {
  return [...src.matchAll(/href:\s*"(\/[^"]+-insurance\/)"/g)].map((m) => m[1]);
}

function registrySlugs(src) {
  // getPilotPersonalSlugs comes from registry keys — parse specialty + inline maps via app pages
  const appDir = path.join(ROOT, "src/app");
  const personalPages = [];
  for (const ent of fs.readdirSync(appDir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const page = path.join(appDir, ent.name, "page.tsx");
    if (!fs.existsSync(page)) continue;
    const body = fs.readFileSync(page, "utf8");
    if (
      body.includes("PilotPersonalPage") ||
      body.includes("PilotAutoPage") ||
      body.includes("createPilotPersonalPageExports")
    ) {
      personalPages.push(`/${ent.name}/`);
    }
  }
  return personalPages.sort();
}

const errors = [];
const filmstrip = hrefsFromFilmstrip(read("src/data/pilot-home.ts"));
const nav = hrefsFromNav(read("src/data/nav-personal.ts"));
const hub = [...new Set(hrefsFromHub(read("src/data/personal-categories.ts")))];
const authoritative = registrySlugs(read("src/data/pilot-personal-registry.ts"));

// Expect auto + 13 registry = 14
if (authoritative.length !== 14) {
  errors.push(
    `Expected 14 authoritative Personal routes, found ${authoritative.length}: ${authoritative.join(", ")}`,
  );
}

function missing(from, hay) {
  return from.filter((h) => !hay.includes(h));
}

const missingHome = missing(authoritative, filmstrip);
const missingNav = missing(authoritative, nav);
const missingHub = missing(authoritative, hub);

const filmstripDupes = filmstrip.filter(
  (h, i) => filmstrip.indexOf(h) !== i,
);
const hubDupes = hrefsFromHub(read("src/data/personal-categories.ts")).filter(
  (h, i, arr) => arr.indexOf(h) !== i,
);

if (missingHome.length) {
  errors.push(`Homepage Personal missing: ${missingHome.join(", ")}`);
}
if (missingNav.length) {
  errors.push(`Desktop/mobile Personal nav missing: ${missingNav.join(", ")}`);
}
if (missingHub.length) {
  errors.push(`Personal hub missing: ${missingHub.join(", ")}`);
}
if (filmstripDupes.length) {
  errors.push(`Homepage Personal duplicate hrefs: ${filmstripDupes.join(", ")}`);
}
if (hubDupes.length) {
  errors.push(`Personal hub duplicate hrefs: ${hubDupes.join(", ")}`);
}

// Dead routes: every authoritative href must have app page
for (const href of authoritative) {
  const slug = href.replace(/^\/|\/$/g, "");
  const page = path.join(ROOT, "src/app", slug, "page.tsx");
  if (!fs.existsSync(page)) errors.push(`Dead Personal route (no page): ${href}`);
}

// Hub / nav personal top-level should point at /personal/
const navTs = read("src/data/nav.ts");
const navPersonal = read("src/data/nav-personal.ts");
if (!navTs.includes('href: "/personal/"')) {
  errors.push('nav.ts Personal hub href is not /personal/');
}
if (!navPersonal.includes('href: "/personal/"')) {
  errors.push("personalNavHub.href is not /personal/");
}
if (!fs.existsSync(path.join(ROOT, "src/app/personal/page.tsx"))) {
  errors.push("Missing /personal/ hub page");
}

const zeroDiscovery = authoritative.filter(
  (h) => !filmstrip.includes(h) && !nav.includes(h) && !hub.includes(h),
);
if (zeroDiscovery.length) {
  errors.push(`ZERO-DISCOVERY Personal: ${zeroDiscovery.join(", ")}`);
}

const summary = {
  ok: errors.length === 0,
  authoritativeCount: authoritative.length,
  authoritative,
  homepageCount: filmstrip.length,
  homepage: filmstrip,
  desktopMobileNavCount: nav.length,
  nav,
  hubCount: hub.length,
  hub,
  missingHomepage: missingHome,
  missingNav,
  missingHub,
  zeroDiscovery,
  errors,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUT_DIR, "personal-discovery.json"),
  JSON.stringify(summary, null, 2),
);

console.log(JSON.stringify(summary, null, 2));
if (!summary.ok) process.exit(1);
