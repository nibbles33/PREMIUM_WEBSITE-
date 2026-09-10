#!/usr/bin/env node
/**
 * Site integration audit — HTTP routes, route counts, console errors.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/site-integration-final-7402");

function loadInteractiveMasterRoutes() {
  const src = fs.readFileSync(
    path.join(__dirname, "../src/data/coverage-explorer/interactive-master-assets.ts"),
    "utf8",
  );
  const block = src.match(/ROUTE_TO_INTERACTIVE_MASTER_FILE[^=]*=\s*\{([\s\S]*?)\n\};/);
  const routes = {};
  for (const m of block[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) routes[m[1]] = m[2];
  return routes;
}

function loadAppRoutes() {
  const appDir = path.join(__dirname, "../src/app");
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

function loadExcludedAssets() {
  const src = fs.readFileSync(
    path.join(__dirname, "../src/data/coverage-explorer/interactive-master-assets.ts"),
    "utf8",
  );
  const m = src.match(/EXCLUDED_EXTRA_ASSETS[^=]*=\s*\[([\s\S]*?)\]/);
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

function loadProductSlugs() {
  const routes = loadAppRoutes();
  const utility = new Set([
    "/",
    "/about",
    "/careers",
    "/careers/general-application",
    "/claims",
    "/commercial-insurance",
    "/compliance",
    "/contact",
    "/get-a-quote",
    "/newsletter",
    "/partners",
    "/payment",
    "/privacy-policy",
    "/resources",
    "/talk-to-a-broker",
    "/team",
  ]);
  return routes.filter((r) => !utility.has(r.replace(/\/$/, "")) && !r.includes("[") && r.endsWith("-insurance") || r.match(/\/(auto-insurance|life-insurance)$/));
}

async function auditHttp(page, route) {
  const url = `${BASE}${route}${route.endsWith("/") ? "" : "/"}`.replace(/([^:]\/)\/+/g, "$1");
  const normalized = route.startsWith("/") ? route : `/${route}`;
  try {
    const res = await page.goto(`${BASE}${normalized.endsWith("/") ? normalized : normalized + "/"}`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await new Promise((r) => setTimeout(r, 800));
    const status = res?.status() ?? 0;
    const hasMain = await page.evaluate(() => Boolean(document.querySelector("main")));
    const hasExplorer = await page.evaluate(() =>
      Boolean(
        document.querySelector(".pilot-ce-stage-frame") ||
          document.querySelector(".pilot-product-explorer-stage") ||
          document.querySelector(".pilot-auto-explorer-stage"),
      ),
    );
    const title = await page.title();
    return { route: normalized.replace(/\/$/, "").replace(/^\//, "") || "home", status, hasMain, hasExplorer, title, ok: status >= 200 && status < 400 && hasMain };
  } catch (e) {
    return { route: normalized, status: 0, hasMain: false, hasExplorer: false, title: "", ok: false, error: e.message };
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const appRoutes = loadAppRoutes();
  const imRoutes = loadInteractiveMasterRoutes();
  const excluded = loadExcludedAssets();
  const productPages = appRoutes.filter((r) => r.includes("insurance") || r === "/auto-insurance");

  const routeCounts = {
    appRouteCount: appRoutes.length,
    productInsurancePages: productPages.length,
    interactiveMasterRegistry: Object.keys(imRoutes).length,
    excludedExtraAssets: excluded.length,
    uniqueAssetFiles: new Set(Object.values(imRoutes)).size,
  };

  const utilityRoutes = [
    "/",
    "/about/",
    "/careers/",
    "/careers/general-application/",
    "/claims/",
    "/commercial-insurance/",
    "/compliance/",
    "/contact/",
    "/get-a-quote/",
    "/newsletter/",
    "/partners/",
    "/payment/",
    "/privacy-policy/",
    "/resources/",
    "/talk-to-a-broker/",
    "/team/",
  ];

  const allHttpRoutes = [...new Set([...appRoutes.map((r) => (r === "/" ? "/" : r.endsWith("/") ? r : r + "/")), ...utilityRoutes])];

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => pageErrors.push(e.message));

  const httpResults = [];
  for (const route of allHttpRoutes.sort()) {
    process.stderr.write(`HTTP ${route}\n`);
    httpResults.push(await auditHttp(page, route));
  }

  await browser.close();

  const output = {
    baseUrl: BASE,
    routeCounts,
    interactiveMasterAliases: Object.entries(imRoutes).filter(([k, v]) => !v.startsWith(k.replace(/-insurance$/, ""))),
    httpResults,
    summary: {
      total: httpResults.length,
      ok: httpResults.filter((r) => r.ok).length,
      fail: httpResults.filter((r) => !r.ok).length,
      withExplorer: httpResults.filter((r) => r.hasExplorer).length,
      uniqueConsoleErrors: [...new Set(consoleErrors)].slice(0, 50),
      pageErrors: [...new Set(pageErrors)],
    },
  };

  fs.writeFileSync(path.join(OUT_DIR, "http-route-audit.json"), JSON.stringify(output, null, 2));
  console.log(JSON.stringify(output.summary, null, 2));
  console.log("Route counts:", routeCounts);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
