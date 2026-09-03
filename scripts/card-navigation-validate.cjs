#!/usr/bin/env node
/**
 * Card navigation validation — href audit + click/drag behavior tests.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;

const PERSONAL_FILMSTRIP = [
  { label: "Auto", href: "/auto-insurance/" },
  { label: "Home", href: "/home-insurance/" },
  { label: "Condo", href: "/condo-insurance/" },
  { label: "Tenant", href: "/tenant-insurance/" },
  { label: "Motorcycle", href: "/motorcycle-insurance/" },
  { label: "Boat", href: "/boat-insurance/" },
  { label: "Cottage", href: "/cottage-insurance/" },
  { label: "Travel", href: "/travel-insurance/" },
];

const DISCOVERY_HREFS = [
  ...PERSONAL_FILMSTRIP.map((i) => ({ ...i, source: "personalFilmstrip" })),
  { label: "Commercial Insurance Hub", href: "/commercial-insurance/", source: "relatedExample" },
  { label: "Business Interruption", href: "/business-interruption-insurance/", source: "relatedExample" },
  { label: "Small Business", href: "/small-business-insurance/", source: "relatedExample" },
  { label: "Trucking", href: "/trucking-insurance/", source: "yepCarousel" },
  { label: "Farm", href: "/farm-insurance/", source: "yepCarousel" },
  { label: "Greenhouse", href: "/greenhouse-agribusiness-insurance/", source: "yepCarousel" },
  { label: "Retail", href: "/retail-insurance/", source: "yepCarousel" },
  { label: "Commercial Auto", href: "/commercial-auto-insurance/", source: "commercialDiscovery" },
  { label: "Contractors", href: "/contractors-insurance/", source: "commercialDiscovery" },
];

async function waitForNav(page, expectedPath, timeout = 8000) {
  try {
    await page.waitForFunction(
      (path) => window.location.pathname === path || window.location.pathname === path.replace(/\/$/, ""),
      { timeout },
      expectedPath.replace(/\/$/, "") + "/",
    );
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const hrefAudit = [];

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const item of DISCOVERY_HREFS) {
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${item.href}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    hrefAudit.push({
      href: item.href,
      source: item.source,
      label: item.label,
      status: res?.status() ?? 0,
      ok: res?.status() === 200,
    });
    await page.close();
  }

  const personalClickTests = [];
  const relatedClickTests = [];
  const dragTests = [];

  // Homepage personal filmstrip click tests
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-filmstrip-frame", { timeout: 15000 });

    for (const item of PERSONAL_FILMSTRIP) {
      await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
      await page.waitForSelector(".pilot-filmstrip-frame", { timeout: 15000 });

      const hrefKey = item.href.replace(/\/$/, "");
      const clicked = await page.evaluate((key) => {
        const links = document.querySelectorAll(`a.pilot-filmstrip-frame[href="${key}"]`);
        for (const el of links) {
          if (el.getAttribute("aria-hidden") === "true") continue;
          el.click();
          return true;
        }
        return false;
      }, hrefKey);

      let navigated = false;
      if (clicked) {
        try {
          await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 });
        } catch {
          /* no navigation */
        }
        navigated = page.url().includes(hrefKey);
      }

      personalClickTests.push({
        label: item.label,
        expected: item.href,
        clicked,
        navigated,
        finalUrl: page.url(),
        ok: navigated,
      });
    }

    // Drag should NOT navigate
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-filmstrip-viewport", { timeout: 15000 });
    const viewport = await page.$(".pilot-filmstrip-viewport");
    const box = await viewport.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 - 120, box.y + box.height / 2, { steps: 12 });
      await page.mouse.up();
      await new Promise((r) => setTimeout(r, 300));
      dragTests.push({
        surface: "homepage-personal-filmstrip",
        action: "drag-left-120px",
        finalUrl: page.url(),
        ok: page.url().endsWith("/") || page.url().endsWith("localhost:3016"),
      });
    }

    await page.close();
  }

  // Product related rail — commercial property page example from owner screenshot
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const testRoute = "/commercial-property-insurance/";
    await page.goto(`${BASE}${testRoute}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-product-related-card", { timeout: 15000 });

    const cards = await page.$$eval(".pilot-product-related-card", (els) =>
      els.map((el) => ({
        href: el.getAttribute("href"),
        label: el.querySelector("p")?.textContent?.trim() ?? "",
      })),
    );

    for (const card of cards.slice(0, 3)) {
      await page.goto(`${BASE}${testRoute}`, { waitUntil: "networkidle0", timeout: 60000 });
      await page.waitForSelector(".pilot-product-related-card", { timeout: 15000 });

      const selector = `a.pilot-product-related-card[href="${card.href}"]`;
      const link = await page.$(selector);
      let navigated = false;
      if (link) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }).catch(() => null),
          link.click(),
        ]);
        navigated = page.url().includes(card.href.replace(/\/$/, ""));
      }

      relatedClickTests.push({
        from: testRoute,
        label: card.label,
        expected: card.href,
        clicked: Boolean(link),
        navigated,
        finalUrl: page.url(),
        ok: navigated,
      });
    }

    // Drag related rail — should not navigate
    await page.goto(`${BASE}${testRoute}`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-related-rail-track", { timeout: 15000 });
    const track = await page.$(".pilot-related-rail-track");
    const tbox = await track.boundingBox();
    if (tbox) {
      await page.mouse.move(tbox.x + 200, tbox.y + tbox.height / 2);
      await page.mouse.down();
      await page.mouse.move(tbox.x + 50, tbox.y + tbox.height / 2, { steps: 10 });
      await page.mouse.up();
      await new Promise((r) => setTimeout(r, 300));
      dragTests.push({
        surface: "product-related-rail",
        action: "drag-left-150px",
        finalUrl: page.url(),
        ok: page.url().includes("commercial-property-insurance"),
      });
    }

    await page.close();
  }

  await browser.close();

  const report = {
    timestamp: new Date().toISOString(),
    base: BASE,
    hrefAuditCount: hrefAudit.length,
    hrefAudit,
    brokenHrefs: hrefAudit.filter((h) => !h.ok),
    personalClickTests,
    relatedClickTests,
    dragTests,
    allPersonalOk: personalClickTests.every((t) => t.ok),
    allRelatedOk: relatedClickTests.every((t) => t.ok),
    allDragOk: dragTests.every((t) => t.ok),
  };

  const outDir = path.join(__dirname, "../docs/qa-screenshots/card-navigation-fix");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "validation-report.json"), JSON.stringify(report, null, 2));

  console.log(
    JSON.stringify(
      {
        hrefAudit: hrefAudit.length,
        broken: report.brokenHrefs.length,
        personalOk: report.allPersonalOk,
        relatedOk: report.allRelatedOk,
        dragOk: report.allDragOk,
      },
      null,
      2,
    ),
  );

  process.exit(
    report.brokenHrefs.length === 0 &&
      report.allPersonalOk &&
      report.allRelatedOk &&
      report.allDragOk
      ? 0
      : 1,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
