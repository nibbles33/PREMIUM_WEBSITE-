#!/usr/bin/env node
/**
 * Final whole-site pre-launch audit — audit-only artifact generator.
 * Run: BASE_URL=http://127.0.0.1:3019 node scripts/final-prelaunch-audit.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3019";
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs/qa-screenshots/final-prelaunch-audit-2026-09-10");
const OUT_JSON = path.join(OUT_DIR, "audit-results.json");

const RESPONSIVE_ROUTES = [
  "/",
  "/commercial-insurance/",
  "/home-insurance/",
  "/restaurant-insurance/",
  "/contractors-insurance/",
  "/cannabis-retail-insurance/",
  "/cannabis-producer-insurance/",
  "/claims/",
  "/partners/",
  "/careers/",
  "/about/",
  "/contact/",
];

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 1024, isMobile: true },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const RUNTIME_PAGES = [
  "/",
  "/commercial-insurance/",
  "/restaurant-insurance/",
  "/contractors-insurance/",
  "/cannabis-retail-insurance/",
  "/claims/",
  "/partners/",
  "/careers/",
  "/contact/",
  "/get-a-quote/",
  "/about/",
];

function loadAppRoutes() {
  const appDir = path.join(ROOT, "src/app");
  const routes = [];
  function walk(dir, prefix = "") {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name.startsWith("_") || ent.name.startsWith(".")) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name.startsWith("(")) continue;
        const seg = ent.name.startsWith("[") ? `[${ent.name.slice(1, -1)}]` : ent.name;
        walk(full, `${prefix}/${seg}`);
      } else if (ent.name === "page.tsx" || ent.name === "page.ts") {
        routes.push(prefix || "/");
      }
    }
  }
  walk(appDir);
  return routes.sort();
}

function loadJobSlugs() {
  const jobsFile = fs.existsSync(path.join(ROOT, "src/data/jobs/index.ts"))
    ? path.join(ROOT, "src/data/jobs/index.ts")
    : path.join(ROOT, "src/data/jobs.ts");
  const src = fs.readFileSync(jobsFile, "utf8");
  const slugs = [];
  for (const m of src.matchAll(/slug:\s*"([^"]+)"/g)) slugs.push(m[1]);
  return slugs;
}

function normalizeRoute(r) {
  if (r === "/") return "/";
  return r.endsWith("/") ? r : `${r}/`;
}

function fetchStatus(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(url, { timeout: 15000 }, (res) => {
      res.resume();
      resolve({ status: res.statusCode, redirect: res.headers.location || null });
    });
    req.on("error", (e) => resolve({ status: 0, error: e.message }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ status: 0, error: "timeout" });
    });
  });
}

function checkImageMagic(filePath) {
  if (!fs.existsSync(filePath)) return { exists: false };
  const buf = fs.readFileSync(filePath).subarray(0, 12);
  let detected = "unknown";
  if (buf[0] === 0x89 && buf[1] === 0x50) detected = "png";
  else if (buf[0] === 0xff && buf[1] === 0xd8) detected = "jpeg";
  else if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") detected = "webp";
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return { exists: true, ext, detected, mismatch: ext !== detected && detected !== "unknown" };
}

async function extractPageMeta(page, route) {
  const url = `${BASE}${normalizeRoute(route)}`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 600));
    return await page.evaluate(() => {
      const title = document.title || "";
      const desc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content") || "";
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "";
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "";
      const h1s = [...document.querySelectorAll("h1")].map((el) => el.textContent?.trim()).filter(Boolean);
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => {
        try {
          return { valid: true, data: JSON.parse(el.textContent || "") };
        } catch (e) {
          return { valid: false, error: e.message, raw: (el.textContent || "").slice(0, 200) };
        }
      });
      const links = [...document.querySelectorAll("a[href]")].map((a) => ({
        href: a.getAttribute("href"),
        text: (a.textContent || "").trim().slice(0, 80),
      }));
      const overflow = document.documentElement.scrollWidth > window.innerWidth + 2;
      return { title, desc, canonical, robots, ogTitle, ogDesc, h1s, jsonLd, links, overflow };
    });
  } catch (e) {
    return { error: e.message };
  }
}

async function crawlLinksFromSeedPages(page) {
  const seeds = [
    "/",
    "/commercial-insurance/",
    "/claims/",
    "/partners/",
    "/careers/",
    "/contact/",
    "/about/",
    "/resources/",
    "/privacy-policy/",
  ];
  const allLinks = new Map();
  for (const seed of seeds) {
    const meta = await extractPageMeta(page, seed);
    if (meta.links) {
      for (const l of meta.links) {
        const key = `${seed}::${l.href}`;
        if (!allLinks.has(key)) allLinks.set(key, { from: seed, ...l });
      }
    }
  }
  return [...allLinks.values()];
}

async function verifyInternalLinks(links) {
  const broken = [];
  const checked = new Set();
  for (const link of links) {
    const href = link.href;
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (href.startsWith("http") && !href.includes("127.0.0.1") && !href.includes("localhost") && !href.includes("premiumib.com")) continue;
    let target = href;
    if (href.startsWith("/")) target = `${BASE}${href.endsWith("/") || href.includes("#") ? href : href + "/"}`;
    else if (href.startsWith("http://localhost") || href.startsWith("http://127.0.0.1")) {
      target = href.replace(/localhost:\d+/, "127.0.0.1:3019").replace(/127\.0\.0\.1:\d+/, "127.0.0.1:3019");
    } else if (href.includes("premiumib.com")) continue;
    else continue;
    const key = target.split("#")[0];
    if (checked.has(key)) continue;
    checked.add(key);
    const res = await fetchStatus(key);
    if (res.status >= 400 || res.status === 0) {
      broken.push({ from: link.from, href, status: res.status, error: res.error });
    }
  }
  return broken;
}

async function auditResponsive(page) {
  const results = [];
  for (const route of RESPONSIVE_ROUTES) {
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: !!vp.isMobile });
      const url = `${BASE}${normalizeRoute(route)}`;
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
        await new Promise((r) => setTimeout(r, 700));
        const metrics = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasMain: Boolean(document.querySelector("main")),
        }));
        results.push({ route, viewport: vp.name, ...metrics, ok: !metrics.overflow && metrics.hasMain });
      } catch (e) {
        results.push({ route, viewport: vp.name, ok: false, error: e.message });
      }
    }
  }
  return results;
}

async function auditRuntime(page) {
  const results = [];
  for (const route of RUNTIME_PAGES) {
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    const onConsole = (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    };
    const onPageError = (e) => pageErrors.push(e.message);
    const onRequestFailed = (req) => {
      failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    };
    page.on("console", onConsole);
    page.on("pageerror", onPageError);
    page.on("requestfailed", onRequestFailed);
    try {
      const res = await page.goto(`${BASE}${normalizeRoute(route)}`, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await new Promise((r) => setTimeout(r, 1000));
      results.push({
        route,
        status: res?.status() ?? 0,
        consoleErrors: [...new Set(consoleErrors)],
        pageErrors: [...new Set(pageErrors)],
        failedRequests: failedRequests.filter((r) => !r.url.includes("favicon")),
      });
    } catch (e) {
      results.push({ route, error: e.message, consoleErrors, pageErrors, failedRequests });
    }
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
    page.removeAllListeners("requestfailed");
  }
  return results;
}

async function smokeFormApis() {
  const post = (pathname, body, contentType = "application/json") =>
    new Promise((resolve) => {
      const url = new URL(pathname, BASE);
      const data = typeof body === "string" ? body : JSON.stringify(body);
      const req = http.request(
        {
          hostname: url.hostname,
          port: url.port,
          path: url.pathname,
          method: "POST",
          headers: {
            "Content-Type": contentType,
            "Content-Length": Buffer.byteLength(data),
          },
          timeout: 15000,
        },
        (res) => {
          let chunks = "";
          res.on("data", (c) => (chunks += c));
          res.on("end", () => {
            let parsed = chunks;
            try {
              parsed = JSON.parse(chunks);
            } catch (_) {}
            resolve({ status: res.statusCode, body: parsed });
          });
        },
      );
      req.on("error", (e) => resolve({ status: 0, error: e.message }));
      req.write(data);
      req.end();
    });

  const quote = await post("/api/quote-submit/", {
    category: "auto",
    name: "Audit Test",
    phone: "2265550100",
    email: "audit-test@example.invalid",
    preferredContactMethod: "email",
    answers: { vehicleType: "car" },
    website: "",
  });

  const job = await post(
    "/api/job-apply/",
    JSON.stringify({
      jobSlug: "general-application",
      name: "Audit Test",
      email: "audit-test@example.invalid",
      phone: "2265550100",
      message: "Audit smoke test — do not process",
    }),
  );

  return { quoteSubmit: quote, jobApply: job };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const appRoutes = loadAppRoutes();
  const jobSlugs = loadJobSlugs();
  const dynamicJobRoutes = jobSlugs.map((s) => `/careers/${s}/`);
  const allRoutes = [...new Set([...appRoutes.map(normalizeRoute), ...dynamicJobRoutes.map(normalizeRoute)])];

  // HTTP route inventory (fetch, faster than puppeteer for all routes)
  const routeInventory = [];
  for (const route of allRoutes) {
    const url = `${BASE}${normalizeRoute(route)}`;
    const res = await fetchStatus(url);
    routeInventory.push({
      route,
      status: res.status,
      redirect: res.redirect,
      category: res.status >= 500 ? "500" : res.status === 404 ? "404" : res.redirect ? "REDIRECT" : res.status >= 200 && res.status < 300 ? "200" : res.status >= 300 && res.status < 400 ? "REDIRECT" : "BROKEN",
    });
  }
  // Fake 404
  const fake404 = await fetchStatus(`${BASE}/this-route-does-not-exist-404-audit/`);
  routeInventory.push({ route: "/this-route-does-not-exist-404-audit/", ...fake404, category: fake404.status === 404 ? "404" : "BROKEN" });

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const seoRoutes = allRoutes.filter((r) => !r.includes("["));
  const seoResults = [];
  for (const route of seoRoutes) {
    process.stderr.write(`SEO ${route}\n`);
    const meta = await extractPageMeta(page, route);
    seoResults.push({ route, ...meta });
  }

  const seedLinks = await crawlLinksFromSeedPages(page);
  const brokenLinks = await verifyInternalLinks(seedLinks);
  const responsive = await auditResponsive(page);
  const runtime = await auditRuntime(page);

  await browser.close();

  const formApis = await smokeFormApis();

  // Image format checks
  const imageChecks = [];
  const cannabisHeroes = [
    "public/images/coverage-explorer/cannabis-retail-insurance/hero.webp",
    "public/images/coverage-explorer/cannabis-producer-insurance/hero.webp",
  ];
  for (const rel of cannabisHeroes) {
    imageChecks.push({ file: rel, ...checkImageMagic(path.join(ROOT, rel)) });
  }
  // Scan public for other extension mismatches (sample)
  const publicImages = [];
  function walkImages(dir, base = "") {
    if (!fs.existsSync(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = path.join(base, ent.name);
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walkImages(full, rel);
      else if (/\.(webp|png|jpe?g)$/i.test(ent.name)) publicImages.push(rel);
    }
  }
  walkImages(path.join(ROOT, "public/images"));
  const mismatches = [];
  for (const rel of publicImages.slice(0, 500)) {
    const check = checkImageMagic(path.join(ROOT, "public/images", rel.replace(/^public\/images\//, "")));
    if (check.mismatch) mismatches.push({ file: `public/images/${rel}`, ...check });
  }

  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE,
    branch: "cursor/coverage-explorer-ux-v2-2026-09-07",
    navFreeze: "4e68fc4",
    routeInventory: {
      total: routeInventory.length,
      ok200: routeInventory.filter((r) => r.category === "200").length,
      redirect: routeInventory.filter((r) => r.category === "REDIRECT").length,
      notFound: routeInventory.filter((r) => r.category === "404").length,
      serverError: routeInventory.filter((r) => r.category === "500").length,
      broken: routeInventory.filter((r) => r.category === "BROKEN").length,
      productRoutes: appRoutes.filter((r) => r.endsWith("-insurance")).length,
    },
    links: { crawled: seedLinks.length, broken: brokenLinks.length, brokenLinks },
    seo: {
      total: seoResults.length,
      missingTitle: seoResults.filter((r) => !r.title).length,
      missingDesc: seoResults.filter((r) => !r.desc).length,
      missingH1: seoResults.filter((r) => !r.h1s?.length).length,
      missingCanonical: seoResults.filter((r) => !r.canonical).length,
      duplicateTitles: findDuplicates(seoResults.map((r) => r.title).filter(Boolean)),
      duplicateDescriptions: findDuplicates(seoResults.map((r) => r.desc).filter(Boolean)),
    },
    responsive: {
      total: responsive.length,
      pass: responsive.filter((r) => r.ok).length,
      fail: responsive.filter((r) => !r.ok).length,
      failures: responsive.filter((r) => !r.ok),
    },
    runtime: {
      pages: runtime.length,
      withConsoleErrors: runtime.filter((r) => r.consoleErrors?.length).length,
      withPageErrors: runtime.filter((r) => r.pageErrors?.length).length,
      withFailedRequests: runtime.filter((r) => r.failedRequests?.length).length,
    },
    formApis,
    imageChecks,
    imageMismatches: mismatches,
  };

  function findDuplicates(arr) {
    const counts = {};
    for (const v of arr) counts[v] = (counts[v] || 0) + 1;
    return Object.entries(counts)
      .filter(([, c]) => c > 1)
      .map(([v, c]) => ({ value: v.slice(0, 120), count: c }));
  }

  const output = { summary, routeInventory, seoResults, seedLinks, brokenLinks, responsive, runtime, formApis, imageChecks, imageMismatches: mismatches };
  fs.writeFileSync(OUT_JSON, JSON.stringify(output, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
