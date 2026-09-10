#!/usr/bin/env node
/**
 * Phase 2 navigation / discovery verifier.
 * Static: reads implemented routes + discovery data files. Does not start a server.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "src/app");
const OUT_DIR = path.join(
  ROOT,
  "docs/qa-screenshots/navigation-reconciliation-2026-09-10",
);
const OUT_JSON = path.join(OUT_DIR, "discovery-matrix.json");

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function extractHrefs(source) {
  const hrefs = [];
  const re = /href:\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(source))) hrefs.push(match[1]);
  return hrefs;
}

function extractLabeledHrefs(source) {
  const items = [];
  const re = /\{\s*label:\s*"([^"]+)"\s*,\s*href:\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(source))) {
    items.push({ label: match[1], href: match[2] });
  }
  return items;
}

function listProductRoutes() {
  return fs
    .readdirSync(APP, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.endsWith("-insurance"))
    .map((entry) => `/${entry.name}/`)
    .sort();
}

function pageExists(href) {
  if (!href || href.startsWith("http") || href.startsWith("#")) return true;
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "/") return true;
  const slug = clean.replace(/^\/|\/$/g, "");
  const productPage = path.join(APP, slug, "page.tsx");
  if (fs.existsSync(productPage)) return true;
  const nested = path.join(APP, slug, "page.tsx");
  if (fs.existsSync(nested)) return true;
  const known = new Set([
    "/get-a-quote/",
    "/talk-to-a-broker/",
    "/contact/",
    "/about/",
    "/team/",
    "/partners/",
    "/payment/",
    "/compliance/",
    "/privacy-policy/",
    "/claims/",
    "/careers/",
    "/resources/",
    "/newsletter/",
  ]);
  return known.has(clean.endsWith("/") ? clean : `${clean}/`);
}

const productRoutes = listProductRoutes();
const productSet = new Set(productRoutes);

const businessSrc = read("src/data/nav-business.ts");
const personalSrc = read("src/data/nav-personal.ts");
const agricultureSrc = read("src/data/nav-agriculture.ts");
const homeSrc = read("src/data/pilot-home.ts");
const taxonomySrc = read("src/data/homepage-category-taxonomy.ts");
const footerSrc = read("src/components/Footer.tsx");
const hubSrc = read("src/data/commercial-industries.ts");
const relatedSrc = read("src/lib/buildPilotProductConfig.ts");
const inlineSrc = read("src/data/pilot-commercial-inline.ts");
const recallSrc = read("src/data/product-pages/commercial-products-industry.ts");

const megaItems = extractLabeledHrefs(
  businessSrc.slice(businessSrc.indexOf("export const businessNavClusters")),
);
const personalItems = extractLabeledHrefs(
  personalSrc.slice(personalSrc.indexOf("export const personalNavGroups")),
);
const agricultureItems = extractLabeledHrefs(
  agricultureSrc.slice(agricultureSrc.indexOf("export const agricultureNavLinks")),
);

function extractTaxonomyHomeItems(source) {
  const start = source.indexOf("export const HOMEPAGE_CATEGORY_ASSIGNMENTS");
  const end = source.indexOf("export type HomepageCategoryProduct", start);
  const block = source.slice(start, end);
  const items = [];
  const catRe = /(\w+):\s*\[([\s\S]*?)\],/g;
  let catMatch;
  while ((catMatch = catRe.exec(block))) {
    for (const href of catMatch[2].matchAll(/"(\/[^"]+\/)"/g)) {
      items.push({ label: href[1], href: href[1] });
    }
  }
  return items;
}

const categoryBlock = homeSrc.slice(
  homeSrc.indexOf("export const commercialCategories"),
  homeSrc.indexOf("export type BreadthItem"),
);
const homeItems = extractTaxonomyHomeItems(taxonomySrc);
const filmstripItems = extractLabeledHrefs(
  homeSrc.slice(
    homeSrc.indexOf("export const personalFilmstripItems"),
    homeSrc.indexOf("export function getFilmstripPhoto"),
  ),
);
const yepItems = extractLabeledHrefs(
  homeSrc.slice(homeSrc.indexOf("export const yepCarouselItems")),
);
const breadthItems = extractLabeledHrefs(
  homeSrc.slice(
    homeSrc.indexOf("export const breadthItems"),
    homeSrc.indexOf("export const breadthMobileItems"),
  ),
);

const hubCategoryBlock = hubSrc.slice(
  hubSrc.indexOf("export const commercialHubCategories"),
  hubSrc.indexOf("export const commercialHubFaqs"),
);
const hubTileBlock = hubSrc.slice(
  hubSrc.indexOf("export const commercialIndustryTiles"),
  hubSrc.indexOf("export type CommercialHubCategory"),
);
const hubCategoryItems = extractLabeledHrefs(hubCategoryBlock);
const hubTileItems = extractLabeledHrefs(hubTileBlock);

const hubRelatedBlock = inlineSrc.slice(
  inlineSrc.indexOf('"commercial-insurance"'),
  inlineSrc.indexOf('"bonding-insurance"'),
);
const hubRelatedItems = extractLabeledHrefs(hubRelatedBlock);

const greenhouseRelatedBlock = inlineSrc.slice(
  inlineSrc.lastIndexOf("relatedProducts: relatedLinksToProducts([") +
    "relatedProducts: relatedLinksToProducts([".length,
);
const greenhouseRelatedItems = extractLabeledHrefs(
  greenhouseRelatedBlock.slice(0, greenhouseRelatedBlock.indexOf("]),")),
);

const footerPersonal = extractLabeledHrefs(
  footerSrc.slice(
    footerSrc.indexOf("const personalLinks"),
    footerSrc.indexOf("const businessLinks"),
  ),
);
const footerBusiness = extractLabeledHrefs(
  footerSrc.slice(
    footerSrc.indexOf("const businessLinks"),
    footerSrc.indexOf("const resourceLinks"),
  ),
);
const footerResource = extractLabeledHrefs(
  footerSrc.slice(
    footerSrc.indexOf("const resourceLinks"),
    footerSrc.indexOf("const companyLinks"),
  ),
);
const footerCompany = extractLabeledHrefs(
  footerSrc.slice(
    footerSrc.indexOf("const companyLinks"),
    footerSrc.indexOf("const riboLink"),
  ),
);

function relatedBlock(src, key) {
  const start = src.indexOf(`"${key}": [`);
  if (start < 0) return "";
  const end = src.indexOf("],", start);
  return src.slice(start, end);
}
const retailRelatedBlock = relatedBlock(relatedSrc, "retail-insurance");
const manufacturingRelatedBlock = relatedBlock(
  relatedSrc,
  "manufacturing-insurance",
);

const errors = [];
const warnings = [];

if (productRoutes.length !== 60) {
  errors.push(`Expected 60 product routes, found ${productRoutes.length}`);
}

function collectSurface(name, items, { allowCrossCategoryDupes = false } = {}) {
  const seen = new Map();
  for (const item of items) {
    if (!pageExists(item.href)) {
      errors.push(`${name} dead link: ${item.label} → ${item.href}`);
    }
    if (item.href === "#") {
      errors.push(`${name} empty href: ${item.label}`);
    }
    if (allowCrossCategoryDupes) continue;
    const key = item.href;
    if (seen.has(key)) {
      errors.push(
        `${name} duplicate href ${item.href} (${seen.get(key)} / ${item.label})`,
      );
    } else {
      seen.set(key, item.label);
    }
  }
}

collectSurface("mega-business", megaItems);
collectSurface("mega-personal", personalItems);
collectSurface("mega-agriculture", agricultureItems);
collectSurface("homepage-categories", homeItems, {
  allowCrossCategoryDupes: true,
});
const categoryIds = [
  "transportation",
  "construction",
  "property",
  "manufacturing",
  "hospitality",
  "professional",
  "retail",
  "health",
  "community",
  "specialty",
];
function extractTaxonomyCategoryItems(source, categoryId) {
  const start = source.indexOf("export const HOMEPAGE_CATEGORY_ASSIGNMENTS");
  const end = source.indexOf("export type HomepageCategoryProduct", start);
  const block = source.slice(start, end);
  const catStart = block.indexOf(`${categoryId}:`);
  if (catStart < 0) return [];
  const slice = block.slice(
    catStart,
    block.indexOf("],", catStart) + 2,
  );
  return [...slice.matchAll(/"(\/[^"]+\/)"/g)].map((m) => ({
    label: m[1],
    href: m[1],
  }));
}

for (let i = 0; i < categoryIds.length; i += 1) {
  collectSurface(
    `homepage-${categoryIds[i]}`,
    extractTaxonomyCategoryItems(taxonomySrc, categoryIds[i]),
  );
}
collectSurface("homepage-filmstrip", filmstripItems);
collectSurface("hub-categories", hubCategoryItems, {
  allowCrossCategoryDupes: true,
});
if (
  hubCategoryItems.filter((item) => item.href === "/commercial-property-insurance/")
    .length !== 2
) {
  warnings.push(
    "Expected Commercial Property + Equipment-on-Property tiles to share the property route",
  );
}
collectSurface("hub-tiles", hubTileItems);
collectSurface("hub-related", hubRelatedItems);
collectSurface("footer-personal", footerPersonal);
collectSurface("footer-business", footerBusiness);
collectSurface("footer-resources", footerResource);
collectSurface("footer-company", footerCompany);

for (const href of [
  ...extractHrefs(relatedSrc),
  ...extractHrefs(recallSrc).filter((href) => href.includes("retail-insurance")),
]) {
  if (href.endsWith("-insurance/") && !pageExists(href)) {
    errors.push(`related dead link: ${href}`);
  }
}

const megaHrefs = new Set([
  ...megaItems.map((item) => item.href),
  ...personalItems.map((item) => item.href),
  ...agricultureItems.map((item) => item.href),
]);
const homeHrefs = new Set(homeItems.map((item) => item.href));
const hubHrefs = new Set([
  ...hubCategoryItems.map((item) => item.href),
  ...hubTileItems.map((item) => item.href),
  ...hubRelatedItems.map((item) => item.href),
]);
const footerHrefs = new Set([
  ...footerPersonal.map((item) => item.href),
  ...footerBusiness.map((item) => item.href),
]);
const relatedInboundHrefs = new Set();
if (retailRelatedBlock.includes("/cannabis-retail-insurance/")) {
  relatedInboundHrefs.add("/cannabis-retail-insurance/");
}
if (manufacturingRelatedBlock.includes("/cannabis-producer-insurance/")) {
  relatedInboundHrefs.add("/cannabis-producer-insurance/");
}
if (
  greenhouseRelatedItems.some(
    (item) => item.href === "/cannabis-producer-insurance/",
  )
) {
  relatedInboundHrefs.add("/cannabis-producer-insurance/");
}

const otherHrefs = new Set([
  ...filmstripItems.map((item) => item.href),
  ...yepItems.map((item) => item.href),
  ...breadthItems.map((item) => item.href),
]);

function row(route) {
  return {
    route,
    mega: megaHrefs.has(route),
    mobile: megaHrefs.has(route),
    homepage: homeHrefs.has(route),
    hub: hubHrefs.has(route) || route === "/commercial-insurance/",
    relatedInbound: relatedInboundHrefs.has(route),
    footerOther: footerHrefs.has(route) || otherHrefs.has(route),
  };
}

const matrix = productRoutes.map((route) => {
  const surfaces = row(route);
  const discoverable =
    surfaces.mega ||
    surfaces.homepage ||
    surfaces.hub ||
    surfaces.relatedInbound ||
    surfaces.footerOther;
  return { ...surfaces, discoverable };
});

const zeroDiscovery = matrix.filter((entry) => !entry.discoverable);

if (zeroDiscovery.length !== 0) {
  errors.push(
    `Zero-discovery routes: ${zeroDiscovery.map((entry) => entry.route).join(", ")}`,
  );
}

const cannabisRetail = matrix.find(
  (entry) => entry.route === "/cannabis-retail-insurance/",
);
const cannabisProducer = matrix.find(
  (entry) => entry.route === "/cannabis-producer-insurance/",
);

if (!cannabisRetail?.mega || !cannabisRetail?.homepage || !cannabisRetail?.hub) {
  errors.push("Cannabis Retail missing required discovery surface");
}
if (
  !cannabisProducer?.mega ||
  !cannabisProducer?.homepage ||
  !cannabisProducer?.hub
) {
  errors.push("Cannabis Producer missing required discovery surface");
}

if (agricultureItems.some((item) => item.href.includes("cannabis"))) {
  errors.push("Cannabis must not appear in Agriculture mega navigation");
}

const retailHome = categoryBlock.includes("id: \"retail\"")
  ? categoryBlock.slice(
      categoryBlock.indexOf('id: "retail"'),
      categoryBlock.indexOf('id: "health"'),
    )
  : "";
if (retailHome.includes("/garage-dealership-insurance/")) {
  errors.push("Garage / Dealership still on homepage Retail");
}

const professionalMega = businessSrc.slice(
  businessSrc.indexOf("Professional & Real Estate"),
  businessSrc.indexOf("Specialty & Community"),
);
if (professionalMega.includes("landscaping-snow-removal-insurance")) {
  errors.push("Landscaping still under Professional mega cluster");
}

const autoPersonal = personalSrc.slice(
  personalSrc.indexOf("Auto / Mobility"),
  personalSrc.indexOf("title: \"Property\""),
);
if (autoPersonal.includes("home-sharing-insurance")) {
  errors.push("Home & Ride Sharing still under Auto / Mobility");
}

if (footerPersonal.some((item) => item.href === "/commercial-insurance/")) {
  errors.push("Business Insurance still in footer Personal column");
}

if (hubCategoryItems.some((item) => item.label === "Equipment Breakdown")) {
  errors.push("Hub still labels Equipment Breakdown as a standalone product");
}
if (hubCategoryItems.some((item) => item.label === "General Liability")) {
  errors.push("Hub still labels Small Business destination as General Liability");
}
if (recallSrc.includes("Product Liability (Retail)")) {
  errors.push("Product Recall related label still says Product Liability (Retail)");
}
if (homeSrc.includes("Personal Valuables")) {
  errors.push("Homepage still uses Personal Valuables label");
}

const retailRelatedHasCannabis = retailRelatedBlock.includes(
  "/cannabis-retail-insurance/",
);
const manufacturingRelatedHasCannabis = manufacturingRelatedBlock.includes(
  "/cannabis-producer-insurance/",
);
if (!retailRelatedHasCannabis) {
  errors.push("Retail related links missing Cannabis Retail inbound");
}
if (!manufacturingRelatedHasCannabis) {
  errors.push("Manufacturing related links missing Cannabis Producer inbound");
}

const result = {
  totalRoutes: productRoutes.length,
  zeroDiscoveryCount: zeroDiscovery.length,
  zeroDiscovery: zeroDiscovery.map((entry) => entry.route),
  cannabisRetail,
  cannabisProducer,
  errors,
  warnings,
  matrix,
  ok: errors.length === 0 && zeroDiscovery.length === 0 && productRoutes.length === 60,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(result, null, 2));

console.log(`TOTAL ROUTES: ${productRoutes.length}`);
console.log(`ZERO-DISCOVERY: ${zeroDiscovery.length}`);
console.log(
  `CANNABIS RETAIL: mega=${cannabisRetail?.mega} home=${cannabisRetail?.homepage} hub=${cannabisRetail?.hub} related=${cannabisRetail?.relatedInbound}`,
);
console.log(
  `CANNABIS PRODUCER: mega=${cannabisProducer?.mega} home=${cannabisProducer?.homepage} hub=${cannabisProducer?.hub} related=${cannabisProducer?.relatedInbound}`,
);
console.log(`ERRORS: ${errors.length}`);
if (errors.length) errors.forEach((error) => console.error(`- ${error}`));
console.log(`WROTE ${OUT_JSON}`);
process.exit(result.ok ? 0 : 1);
