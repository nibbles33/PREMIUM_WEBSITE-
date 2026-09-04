#!/usr/bin/env node
/**
 * Full card navigation validation — every configured href click-tested,
 * related-rail coverage per visual family, desktop drag + mobile touch.
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { buildInventory, normalizeHref, RELATED_FAMILY_PAGES } = require("./card-navigation-hrefs.cjs");

const PORT = Number(process.env.CARD_NAV_PORT || 3016);
const BASE = `http://localhost:${PORT}`;
const MOBILE_VIEWPORT = { width: 390, height: 844, isMobile: true, hasTouch: true };
const SWIPE_DISTANCE_PX = 150;
const TAP_DRAG_THRESHOLD_PX = 8;

function pathMatches(url, expectedHref) {
  const normalized = normalizeHref(expectedHref).replace(/\/$/, "");
  try {
    const pathname = new URL(url).pathname.replace(/\/$/, "");
    return pathname === normalized;
  } catch {
    return false;
  }
}

async function waitForPath(page, expectedHref, timeout = 10000) {
  const target = normalizeHref(expectedHref).replace(/\/$/, "");
  try {
    await page.waitForFunction(
      (p) => window.location.pathname.replace(/\/$/, "") === p,
      { timeout },
      target,
    );
    return true;
  } catch {
    return false;
  }
}

async function gotoPage(page, route, viewport) {
  if (viewport) await page.setViewport(viewport);
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 90000 });
}

async function selectCommercialCategory(page, categoryId) {
  await page.evaluate((id) => {
    const tab = document.querySelector(`[role="tab"][id$="-cat-${id}"]`);
    if (tab) tab.click();
  }, categoryId);
  await new Promise((r) => setTimeout(r, 350));
}

async function clickHrefOnPage(page, target) {
  const hrefKey = normalizeHref(target.href).replace(/\/$/, "");

  if (target.surface === "commercialDiscoveryProduct" || target.surface === "commercialDiscoveryCategory") {
    if (target.categoryId) await selectCommercialCategory(page, target.categoryId);
  }

  const clicked = await page.evaluate(
    ({ hrefKey, surface, cardClass, label }) => {
      const fullHref = `${hrefKey}/`;

      if (surface === "personalFilmstrip") {
        const links = document.querySelectorAll(`a.pilot-filmstrip-frame[href="${fullHref}"], a.pilot-filmstrip-frame[href="${hrefKey}"]`);
        for (const el of links) {
          if (el.getAttribute("aria-hidden") === "true") continue;
          el.scrollIntoView({ block: "center", inline: "center" });
          el.click();
          return { clicked: true, method: "filmstrip-visible" };
        }
        return { clicked: false, method: "filmstrip-missing" };
      }

      if (surface === "yepCarousel") {
        const link = document.querySelector(`a.pilot-yep-tile[href="${fullHref}"], a.pilot-yep-tile[href="${hrefKey}"]`);
        if (!link) return { clicked: false, method: "yep-missing" };
        link.scrollIntoView({ block: "center", inline: "nearest" });
        link.click();
        return { clicked: true, method: "yep-tile" };
      }

      if (surface.startsWith("commercialDiscovery")) {
        const panel = document.querySelector(".pilot-commercial-panel");
        if (!panel) return { clicked: false, method: "commercial-panel-missing" };
        const links = panel.querySelectorAll("a[href]");
        for (const el of links) {
          const h = el.getAttribute("href")?.replace(/\/$/, "") ?? "";
          if (h !== hrefKey) continue;
          if (surface === "commercialDiscoveryHub" && !el.textContent?.includes("All Commercial")) continue;
          if (surface === "commercialDiscoveryCategory" && !el.textContent?.includes("Explore")) continue;
          if (surface === "commercialDiscoveryProduct" && el.textContent?.includes("Explore")) continue;
          el.scrollIntoView({ block: "center" });
          el.click();
          return { clicked: true, method: "commercial-link" };
        }
        return { clicked: false, method: "commercial-link-missing" };
      }

      const selector = `a.${cardClass}[href="${fullHref}"], a.${cardClass}[href="${hrefKey}"]`;
      const link = document.querySelector(selector);
      if (!link) return { clicked: false, method: "related-missing", selector };
      link.scrollIntoView({ block: "center", inline: "center" });
      link.click();
      return { clicked: true, method: "related-card", selector };
    },
    {
      hrefKey,
      surface: target.surface,
      cardClass: target.cardClass,
      label: target.label,
    },
  );

  if (!clicked.clicked) {
    return { ...clicked, navigated: false, finalUrl: page.url(), ok: false };
  }

  try {
    await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 });
  } catch {
    /* SPA or same-page */
  }

  const navigated = pathMatches(page.url(), target.href);
  return {
    ...clicked,
    navigated,
    finalUrl: page.url(),
    ok: navigated,
  };
}

async function desktopDragTest(page, selector, stayPathFragment, action, distance = 120) {
  const el = await page.$(selector);
  if (!el) return { ok: false, error: "element-not-found", action, finalUrl: page.url() };

  const box = await el.boundingBox();
  if (!box) return { ok: false, error: "no-bounding-box", action, finalUrl: page.url() };

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx - distance, cy, { steps: 12 });
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 400));

  const stayed = page.url().includes(stayPathFragment);
  return { ok: stayed, action, distancePx: distance, finalUrl: page.url() };
}

async function mobileTapFirstVisible(page, selector, surfaceName) {
  await page.evaluate((sel) => {
    const first = document.querySelector(sel);
    const viewport = first?.closest(".pilot-filmstrip-viewport") ?? first?.closest("section");
    viewport?.scrollIntoView({ block: "center" });
  }, selector);
  await new Promise((r) => setTimeout(r, 600));

  const target = await page.evaluate((sel) => {
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    let best = null;
    let bestScore = -Infinity;

    for (const el of document.querySelectorAll(sel)) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) continue;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      if (centerX <= 0 || centerX >= viewportW) continue;

      const visibleWidth = Math.min(rect.right, viewportW) - Math.max(rect.left, 0);
      if (visibleWidth <= 0) continue;
      const visibleRatio = visibleWidth / rect.width;
      const centerDist = Math.abs(centerX - viewportW / 2);
      const score = visibleRatio * 1000 - centerDist;
      if (score > bestScore) {
        bestScore = score;
        best = {
          x: centerX,
          y: Math.min(Math.max(centerY, 12), viewportH - 12),
          href: el.getAttribute("href") ?? "",
          label: el.querySelector("h3, p, span")?.textContent?.trim() ?? "",
        };
      }
    }

    return best ? { found: true, ...best } : { found: false };
  }, selector);

  if (!target.found || !target.href) {
    return { ok: false, error: "link-not-found", surface: surfaceName };
  }

  await page.touchscreen.tap(target.x, target.y);
  try {
    await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 });
  } catch {
    /* no nav */
  }

  const ok = pathMatches(page.url(), target.href);
  return {
    ok,
    expected: target.href,
    label: target.label,
    finalUrl: page.url(),
    tapX: target.x,
    tapY: target.y,
    surface: surfaceName,
  };
}

async function mobileSwipeTest(page, trackSelector, stayPathFragment, distance = SWIPE_DISTANCE_PX) {
  const el = await page.$(trackSelector);
  if (!el) return { ok: false, error: "track-not-found", finalUrl: page.url() };

  const box = await el.boundingBox();
  if (!box) return { ok: false, error: "no-bounding-box", finalUrl: page.url() };

  const startX = box.x + box.width * 0.7;
  const endX = startX - distance;
  const y = box.y + box.height / 2;

  await page.touchscreen.touchStart(startX, y);
  for (let step = 1; step <= 10; step++) {
    const x = startX + ((endX - startX) * step) / 10;
    await page.touchscreen.touchMove(x, y);
  }
  await page.touchscreen.touchEnd();
  await new Promise((r) => setTimeout(r, 400));

  const stayed = page.url().includes(stayPathFragment);
  return {
    ok: stayed,
    distancePx: distance,
    thresholdPx: TAP_DRAG_THRESHOLD_PX,
    finalUrl: page.url(),
  };
}

async function testRelatedFamilyPage(page, family) {
  await gotoPage(page, family.page, { width: 1440, height: 900 });
  await page.waitForSelector(`.${family.cardClass}`, { timeout: 20000 });

  const cards = await page.$$eval(`.${family.cardClass}`, (els) =>
    els.map((el) => ({
      href: el.getAttribute("href"),
      label: el.querySelector("p")?.textContent?.trim() ?? el.textContent?.trim()?.slice(0, 40) ?? "",
    })),
  );

  const results = [];
  for (const card of cards) {
    await gotoPage(page, family.page, { width: 1440, height: 900 });
    await page.waitForSelector(`.${family.cardClass}`, { timeout: 20000 });

    const hrefKey = card.href?.replace(/\/$/, "") ?? "";
    const link = await page.$(`a.${family.cardClass}[href="${card.href}"], a.${family.cardClass}[href="${hrefKey}"]`);
    if (link) {
      await link.evaluate((node) => node.scrollIntoView({ block: "center", inline: "center" }));
      await Promise.all([
        page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }).catch(() => null),
        link.click(),
      ]);
    }

    const ok = pathMatches(page.url(), card.href ?? "");
    results.push({
      family: family.family,
      from: family.page,
      label: card.label,
      href: card.href,
      clicked: Boolean(link),
      navigated: ok,
      finalUrl: page.url(),
      ok,
    });
  }

  return results;
}

async function main() {
  const inventory = buildInventory();
  const { clickTargets, uniqueHrefs } = inventory;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const hrefFetchAudit = [];
  for (const href of uniqueHrefs) {
    const page = await browser.newPage();
    const res = await page.goto(`${BASE}${href}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    hrefFetchAudit.push({
      href,
      status: res?.status() ?? 0,
      ok: res?.status() === 200,
    });
    await page.close();
  }

  const clickTests = [];
  const byPage = new Map();
  for (const target of clickTargets) {
    const key = target.page;
    if (!byPage.has(key)) byPage.set(key, []);
    byPage.get(key).push(target);
  }

  for (const [pageRoute, targets] of byPage.entries()) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    for (const target of targets) {
      await gotoPage(page, pageRoute, { width: 1440, height: 900 });

      if (target.surface === "personalFilmstrip") {
        await page.waitForSelector(".pilot-filmstrip-frame", { timeout: 20000 });
      } else if (target.surface === "yepCarousel") {
        await page.waitForSelector(".pilot-yep-tile", { timeout: 20000 });
      } else if (target.surface.startsWith("commercialDiscovery")) {
        await page.waitForSelector(".pilot-commercial-panel", { timeout: 20000 });
      } else if (target.surface === "autoRelatedRail") {
        await page.waitForSelector(".pilot-auto-related-card", { timeout: 20000 });
      } else if (target.surface === "productRelatedRail") {
        try {
          await page.waitForSelector(".pilot-product-related-card", { timeout: 20000 });
        } catch {
          clickTests.push({
            href: target.href,
            label: target.label,
            surface: target.surface,
            page: target.page,
            categoryId: target.categoryId,
            clicked: false,
            method: "related-section-missing",
            navigated: false,
            finalUrl: page.url(),
            ok: false,
          });
          continue;
        }
      }

      const result = await clickHrefOnPage(page, target);
      clickTests.push({
        href: target.href,
        label: target.label,
        surface: target.surface,
        page: target.page,
        categoryId: target.categoryId,
        ...result,
      });
    }

    await page.close();
  }

  const hrefResults = uniqueHrefs.map((href) => {
    const tests = clickTests.filter((t) => t.href === href);
    const surfaces = [...new Set(tests.map((t) => t.surface))];
    const passed = tests.filter((t) => t.ok);
    const failed = tests.filter((t) => !t.ok);
    return {
      href,
      surfaceCount: surfaces.length,
      surfaces,
      clickAttempts: tests.length,
      passCount: passed.length,
      failCount: failed.length,
      ok: failed.length === 0 && tests.length > 0,
      failures: failed.map((f) => ({
        surface: f.surface,
        page: f.page,
        label: f.label,
        method: f.method,
        finalUrl: f.finalUrl,
      })),
    };
  });

  // Related rail — every visual family
  const relatedFamilyTests = [];
  {
    const page = await browser.newPage();
    for (const family of RELATED_FAMILY_PAGES) {
      const familyResults = await testRelatedFamilyPage(page, family);
      relatedFamilyTests.push(...familyResults);
    }
    await page.close();
  }

  // Desktop drag tests
  const desktopDragTests = [];
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    await gotoPage(page, "/");
    await page.waitForSelector(".pilot-filmstrip-viewport", { timeout: 20000 });
    desktopDragTests.push({
      page: "/",
      surface: "homepage-personal-filmstrip",
      input: "mouse",
      ...(await desktopDragTest(page, ".pilot-filmstrip-viewport", "localhost:3016/", "drag-left-120px", 120)),
    });

    await gotoPage(page, "/commercial-property-insurance/");
    await page.waitForSelector(".pilot-related-rail-track", { timeout: 20000 });
    desktopDragTests.push({
      page: "/commercial-property-insurance/",
      surface: "product-related-rail",
      input: "mouse",
      ...(await desktopDragTest(page, ".pilot-related-rail-track", "commercial-property-insurance", "drag-left-150px", 150)),
    });

    await gotoPage(page, "/auto-insurance/");
    await page.waitForSelector(".pilot-related-rail-track", { timeout: 20000 });
    desktopDragTests.push({
      page: "/auto-insurance/",
      surface: "auto-related-rail",
      input: "mouse",
      ...(await desktopDragTest(page, ".pilot-related-rail-track", "auto-insurance", "drag-left-150px", 150)),
    });

    await page.close();
  }

  // Mobile touch tests — 390px viewport, 3 pages
  const mobileTests = [];
  {
    const page = await browser.newPage();
    await page.setViewport(MOBILE_VIEWPORT);
    await page.setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    );

    // Page 1: Homepage personal filmstrip
    await gotoPage(page, "/");
    await page.waitForSelector(".pilot-filmstrip-frame", { timeout: 20000 });
    await page.waitForFunction(
      () => {
        const vw = window.innerWidth;
        return [...document.querySelectorAll("a.pilot-filmstrip-frame")].some((el) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          return cx > 0 && cx < vw && r.height > 8;
        });
      },
      { timeout: 15000 },
    );
    await new Promise((r) => setTimeout(r, 800));
    mobileTests.push({
      page: "/",
      surface: "homepage-personal-filmstrip",
      test: "tap",
      ...(await mobileTapFirstVisible(page, "a.pilot-filmstrip-frame", "homepage-personal-filmstrip")),
    });

    await gotoPage(page, "/");
    await page.waitForSelector(".pilot-filmstrip-viewport", { timeout: 20000 });
    mobileTests.push({
      page: "/",
      surface: "homepage-personal-filmstrip",
      test: "swipe",
      ...(await mobileSwipeTest(page, ".pilot-filmstrip-viewport", "localhost:3016/", SWIPE_DISTANCE_PX)),
    });

    // Page 2: Commercial property related rail
    await gotoPage(page, "/commercial-property-insurance/");
    await page.waitForSelector(".pilot-product-related-card", { timeout: 20000 });
    mobileTests.push({
      page: "/commercial-property-insurance/",
      surface: "product-related-rail",
      test: "tap",
      ...(await mobileTapFirstVisible(page, "a.pilot-product-related-card", "product-related-rail")),
    });

    await gotoPage(page, "/commercial-property-insurance/");
    await page.waitForSelector(".pilot-related-rail-track", { timeout: 20000 });
    mobileTests.push({
      page: "/commercial-property-insurance/",
      surface: "product-related-rail",
      test: "swipe",
      ...(await mobileSwipeTest(page, ".pilot-related-rail-track", "commercial-property-insurance", SWIPE_DISTANCE_PX)),
    });

    // Page 3: Auto related rail
    await gotoPage(page, "/auto-insurance/");
    await page.waitForSelector(".pilot-auto-related-card", { timeout: 20000 });
    mobileTests.push({
      page: "/auto-insurance/",
      surface: "auto-related-rail",
      test: "tap",
      ...(await mobileTapFirstVisible(page, "a.pilot-auto-related-card", "auto-related-rail")),
    });

    await gotoPage(page, "/auto-insurance/");
    await page.waitForSelector(".pilot-related-rail-track", { timeout: 20000 });
    mobileTests.push({
      page: "/auto-insurance/",
      surface: "auto-related-rail",
      test: "swipe",
      ...(await mobileSwipeTest(page, ".pilot-related-rail-track", "auto-insurance", SWIPE_DISTANCE_PX)),
    });

    await page.close();
  }

  await browser.close();

  const brokenHrefs = hrefFetchAudit.filter((h) => !h.ok);
  const failedClickTests = clickTests.filter((t) => !t.ok);
  const failedHrefResults = hrefResults.filter((h) => !h.ok);
  const failedFamilyTests = relatedFamilyTests.filter((t) => !t.ok);
  const failedDesktopDrag = desktopDragTests.filter((t) => !t.ok);
  const failedMobile = mobileTests.filter((t) => !t.ok);

  const report = {
    timestamp: new Date().toISOString(),
    base: BASE,
    summary: {
      uniqueHrefCount: uniqueHrefs.length,
      clickTargetCount: clickTargets.length,
      clickTestsRun: clickTests.length,
      clickTestsPassed: clickTests.filter((t) => t.ok).length,
      clickTestsFailed: failedClickTests.length,
      hrefResultsPassed: hrefResults.filter((h) => h.ok).length,
      hrefResultsFailed: failedHrefResults.length,
      relatedFamilyTestsRun: relatedFamilyTests.length,
      relatedFamilyTestsPassed: relatedFamilyTests.filter((t) => t.ok).length,
      relatedFamilyTestsFailed: failedFamilyTests.length,
      brokenHrefs: brokenHrefs.length,
      desktopDragPassed: desktopDragTests.filter((t) => t.ok).length,
      mobileTestsPassed: mobileTests.filter((t) => t.ok).length,
      mobileTestsFailed: failedMobile.length,
    },
    hrefFetchAudit,
    hrefResults,
    clickTests,
    relatedFamilyTests,
    desktopDragTests,
    mobileTests,
    brokenHrefs,
    failedClickTests,
    failedHrefResults,
    failedFamilyTests,
    failedMobile,
  };

  const outDir = path.join(__dirname, "../docs/qa-screenshots/card-navigation-fix");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "validation-report.json"), JSON.stringify(report, null, 2));

  console.log(JSON.stringify(report.summary, null, 2));

  const allOk =
    brokenHrefs.length === 0 &&
    failedClickTests.length === 0 &&
    failedFamilyTests.length === 0 &&
    failedDesktopDrag.length === 0 &&
    failedMobile.length === 0;

  process.exit(allOk ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
