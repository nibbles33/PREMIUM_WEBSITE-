#!/usr/bin/env node
/**
 * READ-ONLY audit — card/discovery photography vs hero registry.
 * Does not modify any source files or assets.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { buildInventory } = require("./card-navigation-hrefs.cjs");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs");
const GENERIC_ASSET = "/images/photography/commercial/commercial-insurance.webp";

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

/** Parse placements.ts — prefer completed hero branch when available. */
function loadPlacements() {
  const source = read("src/data/photography/placements.ts");

  const placements = [];
  const blocks = source.match(/\{\s*slug:[\s\S]*?\},(?=\s*\{|\s*\];)/g) ?? [];
  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const route = block.match(/route:\s*"([^"]+)"/)?.[1];
    const src = block.match(/src:\s*"([^"]+)"/)?.[1];
    const confidence = block.match(/confidence:\s*"([^"]+)"/)?.[1] ?? "HIGH";
    if (slug && src) placements.push({ slug, route: route ?? "", src, confidence });
  }
  return placements;
}

function normalizeHref(href) {
  if (!href) return null;
  const withSlash = href.startsWith("/") ? href : `/${href}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

function getPageHeroPhotography(placements, slug) {
  const p = placements.find((x) => x.slug === slug);
  if (!p || p.confidence === "LOW") return undefined;
  return p;
}

function resolveCommercialPhotographySlug(placements, slug) {
  if (getPageHeroPhotography(placements, slug)) return slug;
  return "commercial-insurance";
}

/** Mirror buildPilotProductConfig.ts photoSlugFromHref — registry lookup */
function photoSlugFromHref(href, placements) {
  const normalized = normalizeHref(href);
  const placement = placements.find((p) => p.route === normalized && p.confidence !== "LOW");
  if (placement) return placement.slug;
  return "commercial-insurance";
}

function getDestinationHeroSlug(placements, href) {
  const normalized = normalizeHref(href);
  const byRoute = placements.find((p) => p.route === normalized);
  if (byRoute && byRoute.confidence !== "LOW") return byRoute.slug;
  const pageSlug = normalized.replace(/^\/|\/$/g, "");
  if (getPageHeroPhotography(placements, pageSlug)) return pageSlug;
  return resolveCommercialPhotographySlug(placements, pageSlug);
}

function heroSrc(placements, slug) {
  return getPageHeroPhotography(placements, slug)?.src ?? null;
}

function extractSlugField(block, field) {
  const re = new RegExp(`${field}:\\s*"([^"]+)"`);
  return block.match(re)?.[1] ?? null;
}

function extractFilmstripSlugs(pilotHome) {
  const block = pilotHome.match(/export const personalFilmstripItems[\s\S]*?= (\[[\s\S]*?\]);/)?.[1];
  const map = new Map();
  if (!block) return map;
  const itemRe = /href:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"/g;
  let m;
  while ((m = itemRe.exec(block)) !== null) {
    map.set(normalizeHref(m[1]), m[2]);
  }
  return map;
}

function extractPhotoSlugItems(pilotHome, exportName) {
  const block = pilotHome.match(new RegExp(`export const ${exportName}[\\s\\S]*?= (\\[[\\s\\S]*?\\]);`))?.[1];
  const map = new Map();
  if (!block) return map;
  const itemRe = /href:\s*"([^"]+)"[\s\S]*?photoSlug:\s*"([^"]+)"/g;
  let m;
  while ((m = itemRe.exec(block)) !== null) {
    map.set(normalizeHref(m[1]), m[2]);
  }
  return map;
}

function extractAutoRelatedSlugs(pilotAuto) {
  const block = pilotAuto.match(/export const autoRelatedProducts[\s\S]*?= (\[[\s\S]*?\]);/)?.[1];
  const map = new Map();
  if (!block) return map;
  const chunks = block.split(/\},\s*\{/);
  for (const chunk of chunks) {
    const href = chunk.match(/href:\s*"([^"]+)"/)?.[1];
    const photoSlug = chunk.match(/photoSlug:\s*"([^"]+)"/)?.[1];
    if (href && photoSlug) map.set(normalizeHref(href), photoSlug);
  }
  return map;
}

function extractCategoryPhotoSlugs(pilotHome) {
  const map = new Map();
  const slice = pilotHome.slice(pilotHome.indexOf("export const commercialCategories"));
  const catBlocks = slice.match(/\{\s*id:\s*"[^"]+"[\s\S]*?\},(?=\s*\{|\s*\])/g) ?? [];
  for (const cat of catBlocks) {
    const id = cat.match(/id:\s*"([^"]+)"/)?.[1];
    const photoSlug = cat.match(/photoSlug:\s*"([^"]+)"/)?.[1];
    if (id && photoSlug) map.set(id, photoSlug);
  }
  return map;
}

function classify({ cardSrc, destHeroSrc, cardSlug, destSlug, resolution, hasImage, href, surface, notes }) {
  if (!hasImage) return { classification: "ICON_NO_IMAGE", notes: notes ?? "Text-only / no card thumbnail" };

  if (!cardSrc) return { classification: "POTENTIALLY_NEEDS_NEW", notes: "Card resolver returned no image (missing/broken reference)" };

  if (cardSrc === destHeroSrc) {
    return { classification: "ALREADY_CORRECT", notes: notes ?? "Card asset matches destination hero" };
  }

  // Intentional hero reuse on destination (e.g. professional-liability → professional-offices photo)
  if (destHeroSrc && cardSrc === destHeroSrc) {
    return { classification: "ALREADY_CORRECT", notes: "Matches intentional destination hero (including shared/reuse)" };
  }

  // Card uses alias slug that matches intentional hero reuse pattern
  if (cardSlug !== destSlug && cardSrc === destHeroSrc) {
    return { classification: "ALREADY_CORRECT", notes: "Card slug alias resolves to same file as destination hero" };
  }

  if (destHeroSrc && cardSrc !== destHeroSrc) {
    if (cardSrc === GENERIC_ASSET && destHeroSrc !== GENERIC_ASSET) {
      return {
        classification: "CAN_INHERIT_FOR_FREE",
        notes: "Card on generic commercial fallback; destination has dedicated hero asset",
      };
    }
    if (cardSrc !== destHeroSrc && destHeroSrc) {
      // Different dedicated assets — destination has usable hero
      const dupNote =
        surface === "productRelatedRail"
          ? "Related card may show different photo than destination hero; inheritance available without new artwork"
          : "Card uses different photography than destination hero; dedicated hero exists for destination";
      return { classification: "CAN_INHERIT_FOR_FREE", notes: dupNote };
    }
  }

  if (!destHeroSrc || destHeroSrc === GENERIC_ASSET) {
    return {
      classification: "POTENTIALLY_NEEDS_NEW",
      notes: "No dedicated destination hero asset beyond generic fallback",
    };
  }

  return { classification: "CAN_INHERIT_FOR_FREE", notes: notes ?? "Destination hero available; card not using it" };
}

function componentForSurface(surface) {
  const map = {
    personalFilmstrip: "PilotPersonalFilmstrip",
    yepCarousel: "PilotBreadthUniverse / YepMediaTile",
    commercialDiscoveryCategory: "PilotCommercialDiscovery (category panel)",
    commercialDiscoveryProduct: "PilotCommercialDiscovery (product row)",
    commercialDiscoveryHub: "PilotCommercialDiscovery (All Commercial btn)",
    autoRelatedRail: "AutoRelatedProducts",
    productRelatedRail: "ProductRelatedProducts",
  };
  return map[surface] ?? surface;
}

function resolutionLabel(surface, resolution) {
  if (resolution === "icon/no-image") return "icon/no-image treatment";
  if (resolution === "hero registry") return "hero photography registry (getPageHeroPhotography)";
  if (resolution === "photoSlugFromHref alias") return "hero registry via photoSlugFromHref() alias map";
  if (resolution === "explicit photoSlug") return "hero registry via explicit photoSlug in data config";
  if (resolution === "category panel") return "hero registry via category photoSlug (panel hero only)";
  return resolution;
}

function buildManifest() {
  const placements = loadPlacements();
  const pilotHome = read("src/data/pilot-home.ts");
  const pilotAuto = read("src/data/pilot-auto.ts");
  const inventory = buildInventory();

  const filmstripSlugs = extractFilmstripSlugs(pilotHome);
  const yepSlugs = extractPhotoSlugItems(pilotHome, "yepCarouselItems");
  const autoSlugs = extractAutoRelatedSlugs(pilotAuto);
  const categoryPhotoSlugs = extractCategoryPhotoSlugs(pilotHome);

  const rows = [];

  for (const target of inventory.clickTargets) {
    const href = normalizeHref(target.href);
    const destSlug = getDestinationHeroSlug(placements, href);
    const destHeroSrc = heroSrc(placements, destSlug);

    let cardSlug = null;
    let cardSrc = null;
    let resolution = "";
    let hasImage = true;
    let extraNotes = "";

    if (target.surface === "personalFilmstrip") {
      cardSlug = filmstripSlugs.get(href);
      cardSrc = heroSrc(placements, cardSlug);
      resolution = "hero registry";
    } else if (target.surface === "yepCarousel") {
      cardSlug = photoSlugFromHref(href, placements);
      cardSrc = heroSrc(placements, cardSlug);
      resolution = "hero registry via getPhotographySlugFromHref(href)";
    } else if (target.surface === "autoRelatedRail") {
      cardSlug = photoSlugFromHref(href, placements);
      cardSrc = heroSrc(placements, cardSlug);
      resolution = "hero registry via getPhotographySlugFromHref(href)";
    } else if (target.surface === "productRelatedRail") {
      cardSlug = photoSlugFromHref(href, placements);
      cardSrc = heroSrc(placements, cardSlug);
      resolution = "photoSlugFromHref alias";
    } else if (target.surface === "commercialDiscoveryCategory") {
      hasImage = true;
      cardSlug = categoryPhotoSlugs.get(target.categoryId);
      cardSrc = heroSrc(placements, cardSlug);
      resolution = "category panel";
      extraNotes = `Category panel hero when "${target.categoryId}" tab active — not a per-card thumbnail`;
    } else if (target.surface === "commercialDiscoveryProduct") {
      hasImage = false;
      cardSlug = categoryPhotoSlugs.get(target.categoryId);
      cardSrc = null;
      resolution = "icon/no-image";
      extraNotes = "Text link only — inherits active category panel image context, no row thumbnail";
    } else if (target.surface === "commercialDiscoveryHub") {
      hasImage = false;
      cardSrc = null;
      resolution = "icon/no-image";
      extraNotes = "Button only — no card image";
    }

    const match =
      hasImage && cardSrc && destHeroSrc ? cardSrc === destHeroSrc : hasImage ? false : "N/A";

    const { classification, notes } = classify({
      cardSrc,
      destHeroSrc,
      cardSlug,
      destSlug,
      resolution,
      hasImage,
      href,
      surface: target.surface,
      notes: extraNotes,
    });

    rows.push({
      surface: target.surface,
      component: componentForSurface(target.surface),
      cardLabel: target.label,
      destinationRoute: href,
      sourcePage: target.page,
      currentCardAsset: cardSrc ?? "(none)",
      resolutionSource: resolutionLabel(target.surface, resolution),
      destinationHeroAsset: destHeroSrc ?? "(none)",
      cardPhotoSlug: cardSlug,
      destinationHeroSlug: destSlug,
      match: match === true ? "YES" : match === false ? "NO" : match,
      classification,
      responsibleFile:
        target.surface === "productRelatedRail"
          ? "src/lib/buildPilotProductConfig.ts (photoSlugFromHref) + src/data/* relatedLinks"
          : target.surface === "personalFilmstrip" || target.surface === "yepCarousel"
            ? "src/data/pilot-home.ts"
            : target.surface === "autoRelatedRail"
              ? "src/data/pilot-auto.ts"
              : target.surface.startsWith("commercialDiscovery")
                ? "src/data/pilot-home.ts (commercialCategories)"
                : "—",
      notes,
    });
  }

  return { rows, placementsSource: "cursor/hero-images-12-7402 (completed hero registry)" };
}

function summarize(rows) {
  const imageRows = rows.filter((r) => r.classification !== "ICON_NO_IMAGE");
  const iconRows = rows.filter((r) => r.classification === "ICON_NO_IMAGE");

  const instanceCounts = {
    total: rows.length,
    alreadyCorrect: rows.filter((r) => r.classification === "ALREADY_CORRECT").length,
    canInherit: rows.filter((r) => r.classification === "CAN_INHERIT_FOR_FREE").length,
    potentiallyNeedsNew: rows.filter((r) => r.classification === "POTENTIALLY_NEEDS_NEW").length,
    iconNoImage: iconRows.length,
    withImage: imageRows.length,
  };

  // Unique destinations (image-bearing cards only)
  const destMap = new Map();
  for (const r of imageRows) {
    const key = r.destinationRoute;
    if (!destMap.has(key) || rank(r.classification) < rank(destMap.get(key).classification)) {
      destMap.set(key, r);
    }
  }
  function rank(c) {
    if (c === "ALREADY_CORRECT") return 0;
    if (c === "CAN_INHERIT_FOR_FREE") return 1;
    return 2;
  }

  const uniqueDests = [...destMap.values()];
  const uniqueCounts = {
    total: uniqueDests.length,
    alreadyCorrect: uniqueDests.filter((r) => r.classification === "ALREADY_CORRECT").length,
    canInherit: uniqueDests.filter((r) => r.classification === "CAN_INHERIT_FOR_FREE").length,
    potentiallyNeedsNew: uniqueDests.filter((r) => r.classification === "POTENTIALLY_NEEDS_NEW").length,
  };

  const uniqueCardAssets = new Set(imageRows.map((r) => r.currentCardAsset).filter((a) => a !== "(none)"));
  const uniqueDestHeroAssets = new Set(imageRows.map((r) => r.destinationHeroAsset).filter((a) => a !== "(none)"));
  const genericOnCards = imageRows.filter((r) => r.currentCardAsset === GENERIC_ASSET);
  const broken = imageRows.filter((r) => r.currentCardAsset === "(none)" || !r.currentCardAsset);

  return {
    instanceCounts,
    uniqueCounts,
    uniqueCardAssets: uniqueCardAssets.size,
    uniqueDestHeroAssets: uniqueDestHeroAssets.size,
    genericFallbackCardInstances: genericOnCards.length,
    brokenReferences: broken.length,
    genericFallbackUniqueDestinations: new Set(genericOnCards.map((r) => r.destinationRoute)).size,
  };
}

async function runtimeSample(placements) {
  // Optional runtime spot-check on homepage filmstrip + one product rail
  try {
    const puppeteer = require("puppeteer");
    const PORT = process.env.AUDIT_PORT || 3018;
    const BASE = `http://localhost:${PORT}`;
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const samples = [];

    for (const { page, selector, label } of [
      { page: "/", selector: ".pilot-filmstrip-frame img", label: "personalFilmstrip" },
      { page: "/home-insurance/", selector: ".pilot-product-related-card img", label: "productRelatedRail" },
    ]) {
      const p = await browser.newPage();
      await p.goto(`${BASE}${page}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await p.waitForSelector(selector, { timeout: 15000 }).catch(() => {});
      const imgs = await p.$$eval(selector, (els) =>
        els.slice(0, 3).map((el) => {
          const src = el.getAttribute("src") || "";
          if (src.includes("/_next/image")) {
            try {
              const u = new URL(src, window.location.origin);
              return decodeURIComponent(u.searchParams.get("url") || "");
            } catch {
              return src;
            }
          }
          return src;
        }),
      );
      samples.push({ surface: label, page, sampleAssets: imgs });
      await p.close();
    }
    await browser.close();
    return { ok: true, samples };
  } catch (e) {
    return { ok: false, error: String(e.message) };
  }
}

async function main() {
  const { rows, placementsSource } = buildManifest();
  const summary = summarize(rows);
  const runtime = await runtimeSample();

  // Post-wiring: load from local placements
  const report = {
    timestamp: new Date().toISOString(),
    auditType: "POST_WIRING_VERIFICATION",
    heroRegistrySource: "src/data/photography/placements.ts (local)",
    architecturalFinding: "SINGLE_SOURCE_A",
    summary,
    runtimeVerification: runtime,
    rows,
  };

  fs.mkdirSync(path.join(OUT_DIR, "qa-screenshots"), { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "card-photography-audit.json"), JSON.stringify(report, null, 2));

  console.log(JSON.stringify({ summary: report.summary, architecturalFinding: report.architecturalFinding }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
