#!/usr/bin/env node
/**
 * Phase 2 navigation responsive QA.
 * Requires BASE_URL (default http://localhost:3019).
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3019";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/navigation-reconciliation-2026-09-10",
);

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900, isMobile: true },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

function overflow() {
  return document.documentElement.scrollWidth - document.documentElement.clientWidth;
}

function normalizeHref(href) {
  if (!href) return "";
  return href.endsWith("/") ? href : `${href}/`;
}

function hasHref(hrefs, target) {
  return hrefs.map(normalizeHref).includes(normalizeHref(target));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const results = [];

  try {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: Boolean(vp.isMobile),
        hasTouch: Boolean(vp.isMobile),
      });

      const record = { viewport: vp.name, checks: [], ok: true };

      await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 60000 });
      const homeOverflow = await page.evaluate(overflow);
      record.checks.push({ name: "home-overflow", overflow: homeOverflow });
      if (homeOverflow > 1) {
        record.ok = false;
        record.checks.push({ name: "home-overflow-fail", overflow: homeOverflow });
      }

      const tabs = await page.$$('[role="tab"]');
      record.checks.push({ name: "homepage-tabs", count: tabs.length });
      if (tabs.length !== 10) record.ok = false;

      const wanted = [
        ["Retail", "/cannabis-retail-insurance/"],
        ["Manufacturing", "/cannabis-producer-insurance/"],
        ["Specialty Risks", "/cannabis-retail-insurance/"],
      ];
      for (const [label, href] of wanted) {
        const handle = await page.evaluateHandle((text) => {
          return Array.from(document.querySelectorAll('[role="tab"]')).find(
            (el) => el.textContent.trim() === text,
          );
        }, label);
        const el = handle.asElement();
        if (!el) {
          record.ok = false;
          record.checks.push({ name: `missing-tab-${label}` });
          continue;
        }
        await el.click();
        await new Promise((r) => setTimeout(r, 350));
        const panelHrefs = await page.evaluate(() =>
          Array.from(document.querySelectorAll('[role="tabpanel"] a')).map((a) =>
            a.getAttribute("href"),
          ),
        );
        const found = hasHref(panelHrefs, href);
        record.checks.push({ name: `homepage-${label}`, found, href });
        if (!found) record.ok = false;
      }

      const garageOnRetail = await page.evaluate(() => {
        const retailTab = Array.from(document.querySelectorAll('[role="tab"]')).find(
          (el) => el.textContent.trim() === "Retail",
        );
        retailTab?.click();
        return true;
      });
      await new Promise((r) => setTimeout(r, 350));
      const retailHrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="tabpanel"] a')).map((a) =>
          a.getAttribute("href"),
        ),
      );
      if (hasHref(retailHrefs, "/garage-dealership-insurance/")) {
        record.ok = false;
        record.checks.push({ name: "garage-still-on-retail" });
      }
      record.checks.push({ name: "retail-no-garage", ok: garageOnRetail });

      if (vp.width < 1024) {
        const toggle = await page.$('button[aria-controls="mobile-nav"]');
        if (!toggle) {
          record.ok = false;
          record.checks.push({ name: "missing-mobile-toggle" });
        } else {
          await toggle.click();
          await new Promise((r) => setTimeout(r, 250));
          const business = await page.evaluateHandle(() =>
            Array.from(document.querySelectorAll("#mobile-nav button")).find(
              (el) => el.textContent.trim() === "Business",
            ),
          );
          const businessEl = business.asElement();
          if (businessEl) {
            await businessEl.click();
            await new Promise((r) => setTimeout(r, 250));
          }
          const mobileLinks = await page.evaluate(() =>
            Array.from(document.querySelectorAll("#mobile-nav a")).map((a) =>
              a.getAttribute("href"),
            ),
          );
          const hasRetail = hasHref(mobileLinks, "/cannabis-retail-insurance/");
          const hasProducer = hasHref(mobileLinks, "/cannabis-producer-insurance/");
          const tapPad = await page.evaluate(() => {
            const link = Array.from(document.querySelectorAll("#mobile-nav a")).find(
              (a) =>
                (a.getAttribute("href") || "").replace(/\/$/, "") ===
                "/cannabis-retail-insurance",
            );
            if (!link) return 0;
            link.scrollIntoView({ block: "center" });
            return link.getBoundingClientRect().height;
          });
          record.checks.push({
            name: "mobile-cannabis",
            hasRetail,
            hasProducer,
            tapHeight: tapPad,
          });
          if (!hasRetail || !hasProducer) record.ok = false;
          if (tapPad && tapPad < 36) {
            record.ok = false;
            record.checks.push({ name: "tap-target-short", tapHeight: tapPad });
          }
          await page.screenshot({
            path: path.join(OUT, `mobile-nav_${vp.name}.png`),
            fullPage: false,
          });
        }
      } else {
        const business = await page.evaluateHandle(() =>
          Array.from(document.querySelectorAll("header button")).find((el) =>
            el.textContent.replace(/\s+/g, " ").trim().startsWith("Business"),
          ),
        );
        const businessEl = business.asElement();
        if (businessEl) {
          await businessEl.hover();
          await new Promise((r) => setTimeout(r, 500));
        }
        const megaHrefs = await page.evaluate(() =>
          Array.from(document.querySelectorAll("header a")).map((a) =>
            a.getAttribute("href"),
          ),
        );
        const hasRetail = hasHref(megaHrefs, "/cannabis-retail-insurance/");
        const hasProducer = hasHref(megaHrefs, "/cannabis-producer-insurance/");
        record.checks.push({
          name: "mega-cannabis",
          hasRetail,
          hasProducer,
        });
        if (!hasRetail || !hasProducer) {
          record.ok = false;
        }
        await page.screenshot({
          path: path.join(OUT, `mega-menu_${vp.name}.png`),
          fullPage: false,
        });
      }

      await page.goto(`${BASE}/commercial-insurance/`, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      const hubOverflow = await page.evaluate(overflow);
      const hubText = await page.evaluate(() => document.body.innerText);
      record.checks.push({
        name: "hub",
        overflow: hubOverflow,
        hasRetail: hubText.includes("Cannabis Retail"),
        hasProducer: hubText.includes("Cannabis Producer"),
        hasOldGL: /\bGeneral Liability\b/.test(hubText),
        hasOldEB: hubText.includes("Equipment Breakdown") && !hubText.includes("Equipment on Commercial Property"),
      });
      if (hubOverflow > 1) record.ok = false;
      if (!hubText.includes("Cannabis Retail") || !hubText.includes("Cannabis Producer")) {
        record.ok = false;
      }
      await page.screenshot({
        path: path.join(OUT, `hub_${vp.name}.png`),
        fullPage: false,
      });

      await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 60000 });
      const footerPersonal = await page.evaluate(() => {
        const cols = Array.from(document.querySelectorAll("footer nav, footer"));
        return document.body.innerText.includes("Business Insurance") &&
          Array.from(document.querySelectorAll("footer a")).some(
            (a) =>
              a.textContent.includes("Business Insurance") &&
              a.getAttribute("href") === "/commercial-insurance/",
          );
      });
      record.checks.push({ name: "footer-business-in-personal", present: footerPersonal });
      if (footerPersonal) record.ok = false;

      await page.screenshot({
        path: path.join(OUT, `home_${vp.name}.png`),
        fullPage: false,
      });

      results.push(record);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const ok = results.every((r) => r.ok);
  const payload = { ok, results };
  fs.writeFileSync(path.join(OUT, "responsive-qa.json"), JSON.stringify(payload, null, 2));
  console.log(JSON.stringify({ ok, viewports: results.map((r) => ({ vp: r.viewport, ok: r.ok })) }, null, 2));
  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
