#!/usr/bin/env node
/** Claims 500 QA diagnostic — network + console capture on clean production build. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const http = require("http");

const PORT = process.env.QA_PORT || 3020;
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, "../docs/qa-screenshots/carrier-claims-500-qa-2026-09-08");

function classifyResource(url, resourceType) {
  const u = url.replace(BASE, "");
  if (u.includes("/_next/static/chunks/") && u.endsWith(".js")) return "Next.js JS chunk";
  if (u.includes("/_next/static/css/") && u.endsWith(".css")) return "CSS";
  if (u.includes("/_next/static/media/")) return "font";
  if (u.includes("/_next/image")) return "image (Next.js optimizer)";
  if (u.includes("/_next/static/chunks/") && u.endsWith(".map")) return "source map";
  if (u.includes("/_next/static/")) return "Next.js static asset";
  if (u.startsWith("/api/")) return "API request";
  if (u.includes("?_rsc=") || resourceType === "fetch" && u.includes("/claims")) return "RSC/Flight request";
  if (/\.(png|jpg|jpeg|gif|webp|svg|ico)(\?|$)/i.test(u)) return "image";
  if (/\.(woff2?|ttf|otf)(\?|$)/i.test(u)) return "font";
  if (resourceType === "stylesheet") return "CSS";
  if (resourceType === "script") return "JS (other)";
  return "other static asset";
}

function httpGet(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`${BASE}${urlPath}`, (res) => {
      res.resume();
      resolve({ status: res.statusCode, headers: res.headers });
    });
    req.on("error", (err) => resolve({ status: 0, error: err.message }));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ status: 0, error: "timeout" });
    });
  });
}

async function collectPageMetrics(page, route, viewport, interactions) {
  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];
  const failedRequests = [];
  const httpErrors = [];

  page.on("console", (msg) => {
    const entry = { type: msg.type(), text: msg.text(), location: msg.location() };
    if (msg.type() === "error") consoleErrors.push(entry);
    if (msg.type() === "warning") consoleWarnings.push(entry);
  });
  page.on("pageerror", (err) => {
    pageErrors.push({ message: err.message, stack: err.stack });
  });
  page.on("requestfailed", (req) => {
    failedRequests.push({
      url: req.url(),
      resourceType: req.resourceType(),
      method: req.method(),
      failure: req.failure()?.errorText || "unknown",
      classification: classifyResource(req.url(), req.resourceType()),
    });
  });
  page.on("response", (res) => {
    const status = res.status();
    if (status >= 400) {
      const url = res.url();
      const req = res.request();
      httpErrors.push({
        url,
        status,
        resourceType: req.resourceType(),
        method: req.method(),
        classification: classifyResource(url, req.resourceType()),
      });
    }
  });

  await page.setViewport(viewport);
  await page.setCacheEnabled(false);
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 120000 });

  if (interactions) {
    await interactions(page);
  }

  await new Promise((r) => setTimeout(r, 800));

  return {
    route,
    viewport: { width: viewport.width, height: viewport.height },
    consoleErrors,
    consoleWarnings,
    pageErrors,
    failedRequests,
    httpErrors,
    http500: httpErrors.filter((e) => e.status === 500),
  };
}

async function claimsInteractions(page) {
  // Search filter
  const search = await page.$('input[type="search"]');
  if (search) {
    await search.click({ clickCount: 3 });
    await search.type("Economical");
    await new Promise((r) => setTimeout(r, 400));
  }

  // Select insurer from dropdown
  const select = await page.$('select[name="carrier"]');
  if (select) {
    const options = await page.$$eval('select[name="carrier"] option[value]:not([value=""])', (els) =>
      els.map((o) => ({ value: o.value, text: o.textContent?.trim() })),
    );
    if (options.length > 0) {
      await page.select('select[name="carrier"]', options[0].value);
      await new Promise((r) => setTimeout(r, 600));
    }
    // Try specialty/MGA option if present
    const mgaOption = options.find((o) =>
      ["mga", "specialty", "coachman", "facility"].some((k) =>
        o.text?.toLowerCase().includes(k) || o.value.toLowerCase().includes(k),
      ),
    );
    if (mgaOption) {
      await page.select('select[name="carrier"]', mgaOption.value);
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  // Scroll sections
  await page.evaluate(() => {
    document.getElementById("partners-heading")?.scrollIntoView?.();
    document.querySelector("select[name=carrier]")?.scrollIntoView({ block: "center" });
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise((r) => setTimeout(r, 500));
}

async function homepageSanity(page) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.setCacheEnabled(false);
  const metrics = { consoleErrors: [], httpErrors: [], marqueeCount: 0, pageStatus: 0 };

  page.on("console", (msg) => {
    if (msg.type() === "error") metrics.consoleErrors.push(msg.text());
  });
  page.on("response", (res) => {
    if (res.status() >= 400) {
      metrics.httpErrors.push({ url: res.url(), status: res.status() });
    }
    if (res.url() === `${BASE}/` || res.url() === `${BASE}`) {
      metrics.pageStatus = res.status();
    }
  });

  const resp = await page.goto(BASE, { waitUntil: "networkidle0", timeout: 120000 });
  metrics.pageStatus = resp?.status() ?? metrics.pageStatus;

  await page.evaluate(() =>
    document.getElementById("pilot-carriers-heading")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 1200));

  metrics.marqueeCount = await page.evaluate(() => {
    const track = document.querySelector('[data-testid="carrier-marquee-track"]')
      || document.querySelector(".carrier-marquee-track")
      || document.querySelector("#pilot-carriers-heading")?.closest("section")?.querySelectorAll("img");
    if (!track) {
      const section = document.getElementById("pilot-carriers-heading")?.closest("section");
      return section ? section.querySelectorAll("img[alt]").length : 0;
    }
    return track.querySelectorAll ? track.querySelectorAll("img").length : (track.length || 0);
  });

  return metrics;
}

async function partnersSanity(page) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.setCacheEnabled(false);
  const metrics = {
    consoleErrors: [],
    httpErrors: [],
    pageStatus: 0,
    sections: { personal: false, commercial: false, specialty: false },
    brokenImages: 0,
  };

  page.on("console", (msg) => {
    if (msg.type() === "error") metrics.consoleErrors.push(msg.text());
  });
  page.on("response", (res) => {
    if (res.status() >= 400) {
      metrics.httpErrors.push({ url: res.url(), status: res.status() });
    }
  });

  const resp = await page.goto(`${BASE}/partners/`, { waitUntil: "networkidle0", timeout: 120000 });
  metrics.pageStatus = resp?.status() ?? 0;

  metrics.sections = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      personal: /personal/i.test(text) && !!document.querySelector("h2, h3"),
      commercial: /commercial/i.test(text),
      specialty: /specialty.*mga|mga.*specialty/i.test(text),
    };
  });

  metrics.brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img"));
    return imgs.filter((img) => !img.complete || img.naturalWidth === 0).length;
  });

  return metrics;
}

async function claimsSanity(page) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.setCacheEnabled(false);
  const metrics = { consoleErrors: [], httpErrors: [], pageStatus: 0, optionCount: 0 };

  page.on("console", (msg) => {
    if (msg.type() === "error") metrics.consoleErrors.push(msg.text());
  });
  page.on("response", (res) => {
    if (res.status() >= 400) {
      metrics.httpErrors.push({ url: res.url(), status: res.status() });
    }
  });

  const resp = await page.goto(`${BASE}/claims/`, { waitUntil: "networkidle0", timeout: 120000 });
  metrics.pageStatus = resp?.status() ?? 0;

  metrics.optionCount = await page.evaluate(() => {
    return document.querySelectorAll('select[name="carrier"] option[value]:not([value=""])').length;
  });

  return metrics;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

  const results = {
    capturedAt: new Date().toISOString(),
    port: PORT,
    base: BASE,
    claimsDesktop: null,
    claimsMobile: null,
    homepage: null,
    partners: null,
    claimsSanity: null,
    directResourceChecks: [],
    buildChunkInventory: [],
  };

  // Claims desktop
  {
    const page = await browser.newPage();
    results.claimsDesktop = await collectPageMetrics(
      page,
      "/claims/",
      { width: 1440, height: 900 },
      claimsInteractions,
    );
    await page.screenshot({ path: path.join(OUT, "claims-desktop_1440.png"), fullPage: true });
    await page.close();
  }

  // Claims mobile (fresh context)
  {
    const page = await browser.newPage();
    results.claimsMobile = await collectPageMetrics(
      page,
      "/claims/",
      { width: 390, height: 844, isMobile: true, hasTouch: true },
      claimsInteractions,
    );
    await page.screenshot({ path: path.join(OUT, "claims-mobile_390.png"), fullPage: true });
    await page.close();
  }

  // Sanity checks
  {
    const page = await browser.newPage();
    results.homepage = await homepageSanity(page);
    await page.close();
  }
  {
    const page = await browser.newPage();
    results.partners = await partnersSanity(page);
    await page.close();
  }
  {
    const page = await browser.newPage();
    results.claimsSanity = await claimsSanity(page);
    await page.close();
  }

  await browser.close();

  // Inventory current build chunks
  const nextStatic = path.join(__dirname, "../.next/static");
  if (fs.existsSync(nextStatic)) {
    const walk = (dir, acc = []) => {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, acc);
        else acc.push(p.replace(path.join(__dirname, "../"), ""));
      }
      return acc;
    };
    results.buildChunkInventory = walk(nextStatic).filter((p) => p.includes("chunks") && p.endsWith(".js"));
  }

  // Direct resource checks for any 500 URLs found
  const all500 = [
    ...(results.claimsDesktop?.http500 || []),
    ...(results.claimsMobile?.http500 || []),
  ];
  const unique500Paths = [...new Set(all500.map((e) => {
    try {
      const u = new URL(e.url);
      return u.pathname + u.search;
    } catch {
      return e.url;
    }
  }))];

  for (const urlPath of unique500Paths) {
    const direct = await httpGet(urlPath);
    const rel = urlPath.replace(/^\//, "");
    const existsOnDisk = fs.existsSync(path.join(__dirname, "../", rel))
      || fs.existsSync(path.join(__dirname, "../.next", rel.replace(/^_next\//, "")))
      || results.buildChunkInventory.some((p) => urlPath.includes(path.basename(p)));

    results.directResourceChecks.push({
      oldFailedResource: urlPath,
      existsInCleanBuild: existsOnDisk ? "YES" : "NO",
      directRequestStatus: direct.status || direct.error,
      referencedByCurrentHtmlJs: "UNKNOWN",
    });
  }

  fs.writeFileSync(path.join(OUT, "diagnostic.json"), JSON.stringify(results, null, 2));

  const summary = {
    claimsDesktop500: results.claimsDesktop?.http500?.length ?? 0,
    claimsMobile500: results.claimsMobile?.http500?.length ?? 0,
    claimsDesktopConsoleErrors: results.claimsDesktop?.consoleErrors?.length ?? 0,
    claimsMobileConsoleErrors: results.claimsMobile?.consoleErrors?.length ?? 0,
    homepageConsoleErrors: results.homepage?.consoleErrors?.length ?? 0,
    partnersConsoleErrors: results.partners?.consoleErrors?.length ?? 0,
    claimsOptions: results.claimsSanity?.optionCount ?? 0,
    marqueeImages: results.homepage?.marqueeCount ?? 0,
  };
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
