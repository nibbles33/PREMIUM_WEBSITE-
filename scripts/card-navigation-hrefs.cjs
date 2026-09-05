#!/usr/bin/env node
/**
 * Extract every configured discovery/related-product href from source data.
 * Used by card-navigation-validate.cjs for full click-test coverage.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function normalizeHref(href) {
  if (!href || href === "#" || href.startsWith("javascript:")) return null;
  const withSlash = href.startsWith("/") ? href : `/${href}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

function extractLabelHrefPairs(source) {
  const results = [];
  const patterns = [
    /label:\s*"([^"]*?)"\s*,\s*href:\s*"([^"]*?)"/g,
    /label:\s*'([^']*?)'\s*,\s*href:\s*'([^']*?)'/g,
  ];
  for (const re of patterns) {
    let match;
    while ((match = re.exec(source)) !== null) {
      const href = normalizeHref(match[2]);
      if (href) results.push({ label: match[1], href });
    }
  }
  return results;
}

function extractArrayBlock(source, exportName) {
  const startRe = new RegExp(`export const ${exportName}[^=]*=\\s*\\[`);
  const start = source.search(startRe);
  if (start === -1) return null;

  const eqIndex = source.indexOf("=", start);
  let i = source.indexOf("[", eqIndex);
  let depth = 0;
  const arrayStart = i;
  for (; i < source.length; i++) {
    const ch = source[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return source.slice(arrayStart, i + 1);
    }
  }
  return null;
}

function extractCommercialCategories(source) {
  const blockStart = source.indexOf("export const commercialCategories");
  if (blockStart === -1) return { categories: [], products: [] };

  const slice = source.slice(blockStart);
  const categories = [];
  const products = [];

  const catHrefRe = /id:\s*["']([^"']+)["'][\s\S]*?href:\s*["']([^"']+)["']/g;
  let m;
  while ((m = catHrefRe.exec(slice)) !== null) {
    categories.push({
      categoryId: m[1],
      href: normalizeHref(m[2]),
    });
  }

  const productRe = /products:\s*\[[\s\S]*?\]/g;
  const catBlocks = slice.match(/{\s*id:\s*["'][^"']+["'][\s\S]*?products:\s*\[[\s\S]*?\]\s*,?\s*}/g) ?? [];

  for (const catBlock of catBlocks) {
    const idMatch = catBlock.match(/id:\s*["']([^"']+)["']/);
    const categoryId = idMatch?.[1] ?? "unknown";
    for (const { label, href } of extractLabelHrefPairs(catBlock)) {
      products.push({ categoryId, label, href });
    }
  }

  return { categories, products };
}

function extractIndustryRelatedLinks(source) {
  const start = source.indexOf("const industryRelatedLinks");
  if (start === -1) return [];

  const block = source.slice(start);
  const results = [];
  const pageRe = /"([^"]+)":\s*\[/g;
  let pageMatch;

  while ((pageMatch = pageRe.exec(block)) !== null) {
    const slug = pageMatch[1];
    const arrStart = pageMatch.index + pageMatch[0].length - 1;
    let depth = 0;
    let arrEnd = arrStart;
    for (let i = arrStart; i < block.length; i++) {
      if (block[i] === "[") depth++;
      else if (block[i] === "]") {
        depth--;
        if (depth === 0) {
          arrEnd = i + 1;
          break;
        }
      }
    }
    const arrBlock = block.slice(arrStart, arrEnd);
    for (const { label, href } of extractLabelHrefPairs(arrBlock)) {
      results.push({
        sourcePage: `/${slug}/`,
        label,
        href,
      });
    }
  }

  return results;
}

function extractRelatedFromInlineConfigs(source) {
  const results = [];
  const configRe = /"([a-z0-9-]+)":\s*buildPilotProductConfig\(\{([\s\S]*?)\n  \}\),/g;
  let match;
  while ((match = configRe.exec(source)) !== null) {
    const slug = match[1];
    const block = match[2];
    const relatedMatch =
      block.match(/relatedProducts:\s*relatedLinksToProducts\(\[([\s\S]*?)\]\)/) ??
      block.match(/relatedLinks:\s*\[([\s\S]*?)\],/);
    if (!relatedMatch) continue;
    for (const { label, href } of extractLabelHrefPairs(relatedMatch[0])) {
      results.push({
        sourcePage: `/${slug}/`,
        label,
        href,
      });
    }
  }
  return results;
}

function extractRelatedFromProductPages(source) {
  const results = [];
  const pageRe = /slug:\s*"([a-z0-9-]+)"[\s\S]*?relatedLinks:\s*\[([\s\S]*?)\],/g;
  let match;
  while ((match = pageRe.exec(source)) !== null) {
    const slug = match[1];
    const linksBlock = match[2];
    for (const { label, href } of extractLabelHrefPairs(linksBlock)) {
      results.push({
        sourcePage: `/${slug}/`,
        label,
        href,
      });
    }
  }
  return results;
}

function extractRelatedFromFile(relPath) {
  const source = read(relPath);

  if (relPath.includes("pilot-personal-inline") || relPath.includes("pilot-commercial-inline")) {
    return extractRelatedFromInlineConfigs(source);
  }

  if (relPath.includes("product-pages/")) {
    return extractRelatedFromProductPages(source);
  }

  return [];
}

/** Representative related-rail page per visual family */
const RELATED_FAMILY_PAGES = [
  { family: "personal-inline", page: "/home-insurance/", cardClass: "pilot-product-related-card" },
  { family: "personal-specialty", page: "/personal-umbrella-insurance/", cardClass: "pilot-product-related-card" },
  { family: "auto-related", page: "/auto-insurance/", cardClass: "pilot-auto-related-card" },
  { family: "commercial-property", page: "/commercial-property-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-transportation", page: "/trucking-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-agriculture", page: "/farm-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-greenhouse", page: "/greenhouse-agribusiness-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-construction", page: "/contractors-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-hospitality", page: "/restaurant-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-food-truck", page: "/food-truck-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-professional", page: "/professional-offices-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-retail", page: "/retail-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-manufacturing", page: "/manufacturing-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-real-estate", page: "/real-estate-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-product-batch-b", page: "/small-business-insurance/", cardClass: "pilot-product-related-card" },
  { family: "commercial-cyber", page: "/cyber-insurance/", cardClass: "pilot-product-related-card" },
];

function buildInventory() {
  const pilotHome = read("src/data/pilot-home.ts");
  const pilotAuto = read("src/data/pilot-auto.ts");
  const buildConfig = read("src/lib/buildPilotProductConfig.ts");

  const clickTargets = [];

  const filmstripBlock = extractArrayBlock(pilotHome, "personalFilmstripItems");
  if (filmstripBlock) {
    for (const { label, href } of extractLabelHrefPairs(filmstripBlock)) {
      clickTargets.push({
        href,
        label,
        surface: "personalFilmstrip",
        page: "/",
        categoryId: null,
        cardClass: "pilot-filmstrip-frame",
      });
    }
  }

  const yepBlock = extractArrayBlock(pilotHome, "yepCarouselItems");
  if (yepBlock) {
    for (const { label, href } of extractLabelHrefPairs(yepBlock)) {
      clickTargets.push({
        href,
        label,
        surface: "yepCarousel",
        page: "/",
        categoryId: null,
        cardClass: "pilot-yep-tile",
      });
    }
  }

  const { categories, products } = extractCommercialCategories(pilotHome);
  for (const cat of categories) {
    clickTargets.push({
      href: cat.href,
      label: `Explore ${cat.categoryId}`,
      surface: "commercialDiscoveryCategory",
      page: "/",
      categoryId: cat.categoryId,
      cardClass: "pilot-commercial-panel a",
    });
  }
  for (const product of products) {
    clickTargets.push({
      href: product.href,
      label: product.label,
      surface: "commercialDiscoveryProduct",
      page: "/",
      categoryId: product.categoryId,
      cardClass: "pilot-commercial-panel a",
    });
  }
  clickTargets.push({
    href: "/commercial-insurance/",
    label: "All Commercial",
    surface: "commercialDiscoveryHub",
    page: "/",
    categoryId: null,
    cardClass: "pilot-commercial-panel a",
  });

  const autoBlock = pilotAuto.match(/export const autoRelatedProducts[\s\S]*?= (\[[\s\S]*?\]);/);
  if (autoBlock) {
    for (const { label, href } of extractLabelHrefPairs(autoBlock[1])) {
      clickTargets.push({
        href,
        label,
        surface: "autoRelatedRail",
        page: "/auto-insurance/",
        categoryId: null,
        cardClass: "pilot-auto-related-card",
      });
    }
  }

  const relatedFiles = [
    "src/data/pilot-personal-inline.ts",
    "src/data/pilot-commercial-inline.ts",
    "src/data/product-pages/personal-specialty.ts",
    "src/data/product-pages/commercial-products-core.ts",
    "src/data/product-pages/commercial-products-specialty.ts",
    "src/data/product-pages/commercial-products-industry.ts",
  ];

  const relatedByHref = new Map();
  for (const rel of relatedFiles) {
    for (const item of extractRelatedFromFile(rel)) {
      if (!item.href || !item.sourcePage) continue;
      const key = `${item.sourcePage}|${item.href}`;
      relatedByHref.set(key, {
        href: item.href,
        label: item.label,
        surface: "productRelatedRail",
        page: item.sourcePage,
        categoryId: null,
        cardClass: "pilot-product-related-card",
      });
    }
  }

  for (const item of extractIndustryRelatedLinks(buildConfig)) {
    const key = `${item.sourcePage}|${item.href}`;
    relatedByHref.set(key, {
      href: item.href,
      label: item.label,
      surface: "productRelatedRail",
      page: item.sourcePage,
      categoryId: null,
      cardClass: "pilot-product-related-card",
    });
  }

  for (const target of relatedByHref.values()) {
    clickTargets.push(target);
  }

  const uniqueHrefs = [...new Set(clickTargets.map((t) => t.href))].sort();

  return {
    clickTargets,
    uniqueHrefs,
    uniqueHrefCount: uniqueHrefs.length,
    relatedFamilyPages: RELATED_FAMILY_PAGES,
  };
}

module.exports = { buildInventory, normalizeHref, RELATED_FAMILY_PAGES };

if (require.main === module) {
  const inv = buildInventory();
  console.log(
    JSON.stringify(
      {
        uniqueHrefCount: inv.uniqueHrefCount,
        clickTargetCount: inv.clickTargets.length,
        uniqueHrefs: inv.uniqueHrefs,
      },
      null,
      2,
    ),
  );
}
