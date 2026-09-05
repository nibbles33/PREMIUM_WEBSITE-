/**
 * Capture Auto product page screenshots for owner review.
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3002";
const OUT = "/opt/cursor/artifacts/screenshots";
const URL = `${BASE}/auto-insurance/`;

const shots = [
  { name: "auto_full_desktop", width: 1440, height: 900, fullPage: true },
  { name: "auto_hero_desktop", width: 1440, height: 900, y: 0, heightClip: 900 },
  { name: "auto_coverage_desktop", width: 1440, height: 900, selector: ".pilot-auto-coverage-stage" },
  { name: "auto_broker_desktop", width: 1440, height: 900, selector: ".pilot-auto-broker-section" },
  { name: "auto_broker_before_desktop", width: 1440, height: 900, selector: ".pilot-auto-broker-flow" },
  { name: "auto_related_desktop", width: 1440, height: 900, selector: ".pilot-auto-related-rail" },
  { name: "auto_final_cta_desktop", width: 1440, height: 900, selector: "#pilot-auto-final-heading" },
  { name: "auto_full_mobile", width: 390, height: 844, fullPage: true },
  { name: "auto_hero_mobile", width: 390, height: 844, y: 0, heightClip: 844 },
  { name: "auto_coverage_mobile", width: 390, height: 844, selector: ".pilot-auto-explorer-stage" },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  for (const shot of shots) {
    await page.setViewport({ width: shot.width, height: shot.height });
    await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });

    if (shot.selector) {
      await page.waitForSelector(shot.selector, { timeout: 15000 });
      const el = await page.$(shot.selector);
      if (shot.name.includes("coverage") && el) {
        const tab = await page.$('[role="tab"][aria-selected="false"]');
        if (tab) {
          await tab.click();
          await new Promise((r) => setTimeout(r, 400));
        }
      }
      await el?.scrollIntoView({ block: "center" });
      await new Promise((r) => setTimeout(r, 300));
    }

    const file = path.join(OUT, `${shot.name}.png`);
    if (shot.fullPage) {
      await page.screenshot({ path: file, fullPage: true });
    } else if (shot.selector) {
      const el = await page.$(shot.selector);
      if (el) {
        await el.screenshot({ path: file });
      } else {
        await page.screenshot({ path: file });
      }
    } else {
      await page.screenshot({
        path: file,
        clip: {
          x: 0,
          y: shot.y ?? 0,
          width: shot.width,
          height: shot.heightClip ?? shot.height,
        },
      });
    }
    console.log("saved", file);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
