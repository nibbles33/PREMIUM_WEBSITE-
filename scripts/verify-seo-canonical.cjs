#!/usr/bin/env node
/**
 * Batch 3 SEO / canonical verifier (static + optional live checks).
 * Run: BASE_URL=http://127.0.0.1:3032 node scripts/verify-seo-canonical.cjs
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "docs/qa-screenshots/prelaunch-batch-3-seo-2026-09-10",
);
const OUT_JSON = path.join(OUT_DIR, "seo-verifier.json");
const BASE = process.env.BASE_URL || "";
const SITE_ORIGIN = "https://premiumib.com";

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function listAppPages(dir = path.join(ROOT, "src/app"), prefix = "") {
  const routes = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith("_") || ent.name.startsWith(".")) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.startsWith("(")) continue;
      const seg = ent.name.startsWith("[") ? ent.name : ent.name;
      listAppPages(full, `${prefix}/${seg}`).forEach((r) => routes.push(r));
    } else if (ent.name === "page.tsx" || ent.name === "page.ts") {
      routes.push(prefix || "/");
    }
  }
  return routes;
}

function fetchStatus(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(
      url,
      { method: "HEAD", timeout: 15000 },
      (res) => {
        resolve({
          status: res.statusCode,
          location: res.headers.location || null,
        });
      },
    );
    req.on("error", () => resolve({ status: 0, location: null }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ status: 0, location: null });
    });
    req.end();
  });
}

async function fetchText(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { timeout: 20000 }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () =>
          resolve({ status: res.statusCode, body: data, headers: res.headers }),
        );
      })
      .on("error", () => resolve({ status: 0, body: "", headers: {} }));
  });
}

const errors = [];
const warnings = [];

const nextConfig = read("next.config.ts");
if (!/trailingSlash:\s*true/.test(nextConfig)) {
  errors.push("next.config.ts missing trailingSlash: true");
}

const layout = read("src/app/layout.tsx");
if (!layout.includes("metadataBase")) {
  errors.push("Root layout missing metadataBase");
}
if (/localhost|127\.0\.0\.1|vercel\.app/i.test(layout)) {
  errors.push("Root layout references localhost/vercel.app");
}

const home = read("src/app/page.tsx");
if (!home.includes("Premium Insurance Brokers")) {
  errors.push("Homepage metadata missing Premium Insurance Brokers brand");
}
if (/title:\s*"PremiumIB\b/.test(home) || /PremiumIB \|/.test(home)) {
  errors.push("Homepage still uses generic PremiumIB title");
}

const sitemap = read("src/app/sitemap.ts");
if (!sitemap.includes(SITE_ORIGIN)) {
  errors.push("Sitemap missing production origin");
}
if (sitemap.includes("/talk-to-a-broker/")) {
  errors.push("Sitemap still lists redirect-only /talk-to-a-broker/");
}
if (/localhost|vercel\.app/i.test(sitemap)) {
  errors.push("Sitemap references localhost/vercel");
}

const robots = read("src/app/robots.ts");
if (!robots.includes(`${SITE_ORIGIN}/sitemap.xml`)) {
  errors.push("robots.txt sitemap host incorrect");
}
if (!robots.includes('disallow: ["/api/"]') && !robots.includes('"/api/"')) {
  warnings.push("robots does not disallow /api/");
}

const partners = read("src/app/partners/page.tsx");
if (partners.includes("PremiumIB") && partners.includes("title:")) {
  // title line only
}
if (/Our Partners \| PremiumIB/.test(partners)) {
  errors.push("Partners title still uses PremiumIB");
}
if (partners.includes("Core Markets") || partners.includes("Our Markets")) {
  errors.push("Partners page restored Core/Our Markets labels");
}

const quoteNotify = read("src/lib/quote/notify.ts");
if (!quoteNotify.includes("QUOTE_NOTIFY_TO")) {
  errors.push("Batch 2.5 QUOTE_NOTIFY_TO missing — do not regress");
}

const homepageTax = read("src/data/homepage-category-taxonomy.ts");
if (!homepageTax.includes("HOMEPAGE_CATEGORY_ASSIGNMENTS")) {
  errors.push("Homepage taxonomy missing");
}

// Source canonical trailing-slash policy sample
const commercialFactory = read("src/lib/createPilotCommercialPage.tsx");
if (!commercialFactory.includes("buildPageMetadata")) {
  errors.push("Commercial metadata factory not using buildPageMetadata");
}

const routes = listAppPages().sort();
const productRoutes = routes.filter((r) => r.endsWith("-insurance"));
if (productRoutes.length !== 60) {
  errors.push(`Expected 60 product routes, found ${productRoutes.length}`);
}

const live = { checked: false, samples: [], sitemapUrlCount: null };

async function runLiveChecks() {
  if (!BASE) return;
  live.checked = true;
  const samples = [
    "/",
    "/commercial-insurance/",
    "/auto-insurance/",
    "/cannabis-retail-insurance/",
    "/cannabis-producer-insurance/",
    "/claims/",
    "/partners/",
    "/about/",
    "/contact/",
  ];
  for (const route of samples) {
    const withSlash = `${BASE}${route === "/" ? "/" : route}`;
    const withoutSlash =
      route === "/" ? null : `${BASE}${route.replace(/\/$/, "")}`;
    const html = await fetchText(withSlash);
    const title = (html.body.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
    const canonical =
      (html.body.match(/rel="canonical"\s+href="([^"]+)"/i) ||
        html.body.match(/href="([^"]+)"\s+rel="canonical"/i) ||
        [])[1] || null;
    const robotsMeta =
      (html.body.match(/name="robots"\s+content="([^"]+)"/i) || [])[1] || null;
    const h1 = (html.body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]
      ?.replace(/<[^>]+>/g, "")
      .trim();
    const ogTitle =
      (html.body.match(/property="og:title"\s+content="([^"]+)"/i) ||
        [])[1] || null;

    if (!title) errors.push(`${route}: missing <title>`);
    if (!canonical) errors.push(`${route}: missing canonical`);
    if (canonical && !canonical.startsWith(SITE_ORIGIN)) {
      errors.push(`${route}: canonical host not production (${canonical})`);
    }
    if (canonical && route !== "/" && !canonical.endsWith("/")) {
      errors.push(`${route}: canonical missing trailing slash`);
    }
    if (/localhost|127\.0\.0\.1|vercel\.app/i.test(canonical || "")) {
      errors.push(`${route}: bad canonical host`);
    }
    if (!h1) warnings.push(`${route}: H1 not found in HTML sample`);
    if (!ogTitle) warnings.push(`${route}: missing og:title`);

    let slash308 = null;
    if (withoutSlash) {
      const head = await fetchStatus(withoutSlash);
      slash308 = head.status;
      if (head.status !== 308 && head.status !== 301) {
        warnings.push(
          `${route}: no-slash status ${head.status} (expected 308 with trailingSlash)`,
        );
      }
    }

    live.samples.push({
      route,
      status: html.status,
      title,
      canonical,
      robotsMeta,
      h1: h1?.slice(0, 80) || null,
      ogTitle,
      noSlashStatus: slash308,
    });
  }

  const sitemapXml = await fetchText(`${BASE}/sitemap.xml`);
  if (sitemapXml.status !== 200) {
    errors.push("sitemap.xml not 200");
  } else {
    if (sitemapXml.body.includes("talk-to-a-broker")) {
      errors.push("Live sitemap includes talk-to-a-broker");
    }
    if (!sitemapXml.body.includes("cannabis-retail-insurance")) {
      errors.push("Live sitemap missing cannabis retail");
    }
    if (!sitemapXml.body.includes("cannabis-producer-insurance")) {
      errors.push("Live sitemap missing cannabis producer");
    }
    live.sitemapUrlCount = (sitemapXml.body.match(/<loc>/g) || []).length;
  }

  const robotsTxt = await fetchText(`${BASE}/robots.txt`);
  if (robotsTxt.status !== 200) errors.push("robots.txt not 200");
  if (!robotsTxt.body.includes(`${SITE_ORIGIN}/sitemap.xml`)) {
    errors.push("robots.txt sitemap URL incorrect");
  }
}

async function main() {
  await runLiveChecks();
  const result = {
    ok: errors.length === 0,
    errors,
    warnings,
    productRouteCount: productRoutes.length,
    appRouteCount: routes.length,
    live,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(result, null, 2));
  console.log(
    JSON.stringify(
      {
        ok: result.ok,
        errors,
        warnings: warnings.slice(0, 20),
        productRouteCount: productRoutes.length,
        appRouteCount: routes.length,
        sitemapUrlCount: live.sitemapUrlCount,
      },
      null,
      2,
    ),
  );
  process.exit(result.ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

