#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/contractors-insurance/";
const OUT = path.join(__dirname, "../docs/qa-screenshots/contractors-contain-fix");

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  for (const vp of [
    { w: 1440, label: "desktop-1440" },
    { w: 390, label: "mobile-390" },
  ]) {
    await page.setViewport({ width: vp.w, height: vp.w === 390 ? 844 : 900 });
    await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2" });
    const tabs = await page.$$(".pilot-product-coverage-card");
    for (let i = 0; i < tabs.length; i++) {
      await tabs[i].click();
      await new Promise((r) => setTimeout(r, 2000));
      const stage = await page.$(".pilot-product-explorer-stage");
      const names = ["liability", "tools", "property", "installation"];
      if (stage) {
        const file = `after-${vp.label}-${names[i]}.png`;
        await stage.screenshot({ path: path.join(OUT, file) });
        console.log("saved", file);
      }
    }
  }
  await browser.close();
}

main();
