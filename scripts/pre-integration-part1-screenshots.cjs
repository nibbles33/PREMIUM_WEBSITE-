#!/usr/bin/env node
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const PORT = process.env.SCREENSHOT_PORT || 3019;
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, "../docs/qa-screenshots/pre-integration-part1");

async function shot(page, file, opts = {}) {
  const outPath = path.join(OUT, file);
  await page.screenshot({ path: outPath, fullPage: false, ...opts });
  console.log("saved", file);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
    const btn = await page.evaluateHandle(() =>
      [...document.querySelectorAll("button")].find((b) =>
        b.textContent?.trim().startsWith("Business"),
      ),
    );
    await btn.asElement()?.hover();
    await page.waitForSelector(".nav-dropdown-panel-scroll", { timeout: 5000 });
    await new Promise((r) => setTimeout(r, 400));
    await shot(page, "mega-menu-100pct-desktop.png");
    await page.close();
  }

  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() =>
      document.getElementById("pilot-personal-filmstrip-heading")?.scrollIntoView(),
    );
    await new Promise((r) => setTimeout(r, 800));
    await shot(page, "personal-carousel-mobile-390.png");
    await page.close();
  }

  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() =>
      document.getElementById("pilot-local-heading")?.scrollIntoView(),
    );
    await new Promise((r) => setTimeout(r, 800));
    await shot(page, "awards-rail-mobile-390.png");
    await page.close();
  }

  for (const [route, file] of [
    ["/liquor-liability-insurance/", "hero-liquor-liability-after.png"],
    ["/property-management-insurance/", "hero-property-management-after.png"],
    ["/event-liability-insurance/", "hero-event-liability-unchanged.png"],
    ["/non-profit-insurance/", "hero-non-profit-unchanged.png"],
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}${route}`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 500));
    await shot(page, file);
    await page.close();
  }

  await browser.close();
  console.log("done", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
