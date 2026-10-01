#!/usr/bin/env node
/**
 * Final pre-launch visual + UX polish QA + screenshots.
 * BASE_URL=http://127.0.0.1:3020 node scripts/final-prelaunch-polish-qa.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3020";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/final-prelaunch-visual-ux-polish-2026-09-30",
);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function forceReveal(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((node) => {
      node.classList.add("is-revealed");
    });
  });
}

async function gotoReady(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("main", { timeout: 30000 });
  await forceReveal(page);
  await new Promise((r) => setTimeout(r, 400));
}

async function shotFull(page, name) {
  await page.evaluate(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  });
  const dims = await page.evaluate(() => ({
    w: window.innerWidth,
    h: Math.min(document.documentElement.scrollHeight, 16000),
    sw: document.documentElement.scrollWidth,
  }));
  await page.screenshot({
    path: path.join(OUT, `${name}.png`),
    clip: { x: 0, y: 0, width: dims.w, height: dims.h },
    captureBeyondViewport: true,
  });
  return dims;
}

async function main() {
  ensureDir(OUT);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const results = { ok: true, checks: [], consoleErrors: [] };

  try {
    const homeVps = [
      { name: "390", width: 390, height: 844 },
      { name: "430", width: 430, height: 932 },
      { name: "768", width: 768, height: 1024 },
      { name: "1440", width: 1440, height: 900 },
      { name: "1920", width: 1920, height: 1080 },
    ];

    for (const vp of homeVps) {
      const page = await browser.newPage();
      page.on("pageerror", (e) =>
        results.consoleErrors.push(`${vp.name}:${String(e).slice(0, 160)}`),
      );
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
      });
      await gotoReady(page, `${BASE}/`);
      const audit = await page.evaluate(() => {
        const text = document.body.innerText || "";
        return {
          overflow:
            document.documentElement.scrollWidth > window.innerWidth + 2,
          scrollWidth: document.documentElement.scrollWidth,
          personal: document.querySelectorAll("a.pilot-filmstrip-frame").length,
          googleBad:
            /Places API|credentials are configured|configured server-side/i.test(
              text,
            ),
          googleFallback: /See what our clients are saying on Google/i.test(
            text,
          ),
          homesPill: /2,400\+ homes/i.test(text),
          teamInMain: /Meet the team/i.test(
            document.querySelector("main")?.innerText || "",
          ),
          oracleFooter: /A Division of Oracle RMS/i.test(text),
        };
      });
      if (
        audit.googleBad ||
        audit.homesPill ||
        audit.teamInMain ||
        audit.personal !== 14 ||
        !audit.googleFallback ||
        audit.overflow
      ) {
        results.ok = false;
      }
      const dims = await shotFull(page, `homepage-${vp.name}`);
      results.checks.push({ viewport: vp.name, ...audit, shot: dims });
      await page.close();
    }

    for (const [w, h, tag] of [
      [390, 844, "390"],
      [1440, 900, "1440"],
    ]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
      await gotoReady(page, `${BASE}/auto-insurance/`);
      await shotFull(page, `product-auto-${tag}`);
      await page.close();
    }

    for (const [w, h, tag] of [
      [390, 844, "390"],
      [1440, 900, "1440"],
    ]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
      await gotoReady(page, `${BASE}/contractors-insurance/`);
      await shotFull(page, `commercial-contractors-${tag}`);
      await page.close();
    }

    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await gotoReady(page, `${BASE}/`);
      await page.evaluate(() => {
        const btn = [...document.querySelectorAll("button")].find((b) =>
          (b.textContent || "").includes("Business"),
        );
        btn?.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
        btn?.click();
      });
      await new Promise((r) => setTimeout(r, 300));
      await page.screenshot({
        path: path.join(OUT, "mega-menu-business-1440.png"),
      });
      await page.keyboard.press("Escape");
      await new Promise((r) => setTimeout(r, 200));
      const closed = await page.evaluate(
        () => !document.querySelector('header [role="region"]'),
      );
      results.checks.push({ megaEscapeCloses: closed });
      if (!closed) results.ok = false;

      await page.evaluate(() => {
        document
          .querySelector("#pilot-google-reviews-heading")
          ?.closest("section")
          ?.scrollIntoView({ block: "center" });
      });
      await new Promise((r) => setTimeout(r, 250));
      await page.screenshot({
        path: path.join(OUT, "google-section-1440.png"),
      });

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise((r) => setTimeout(r, 250));
      await page.screenshot({ path: path.join(OUT, "footer-cta-1440.png") });
      await page.close();
    }

    {
      const page = await browser.newPage();
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
      await gotoReady(page, `${BASE}/`);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise((r) => setTimeout(r, 250));
      await page.screenshot({ path: path.join(OUT, "footer-cta-390.png") });
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const outJson = path.join(OUT, "polish-qa-results.json");
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  console.log("WROTE", outJson);
  if (!results.ok) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
