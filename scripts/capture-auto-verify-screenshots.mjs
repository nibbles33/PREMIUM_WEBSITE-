/**
 * Auto page verification screenshots — coverage car + final CTA visibility.
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3002";
const OUT = "/opt/cursor/artifacts/screenshots";
const URL = `${BASE}/auto-insurance/`;

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // 1. Coverage explorer with miniature car (desktop)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector(".pilot-auto-coverage-stage-frame", { timeout: 15000 });
  const carImg = await page.$(".pilot-auto-car-hero-image");
  if (carImg) {
    await carImg.evaluate((img) => {
      if (!(img instanceof HTMLImageElement)) return;
      if (!img.complete || img.naturalWidth === 0) {
        throw new Error("Miniature car image failed to load");
      }
    });
  }
  const coverageFrame = await page.$(".pilot-auto-coverage-stage-frame");
  await coverageFrame?.scrollIntoView({ block: "center" });
  await new Promise((r) => setTimeout(r, 300));
  await coverageFrame?.screenshot({
    path: path.join(OUT, "auto_coverage_car_desktop.png"),
  });
  console.log("saved auto_coverage_car_desktop.png");

  // 2. Bottom CTA — normal (non-hover) state
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForSelector(".pilot-auto-final-broker-btn", { timeout: 10000 });
  const ctaSection = await page.$("#pilot-auto-final-heading");
  await ctaSection?.scrollIntoView({ block: "center" });
  await new Promise((r) => setTimeout(r, 300));
  const ctaWrap = await page.evaluateHandle(() => {
    const heading = document.getElementById("pilot-auto-final-heading");
    return heading?.closest("section") ?? null;
  });
  const ctaEl = ctaWrap.asElement();
  if (ctaEl) {
    await ctaEl.screenshot({
      path: path.join(OUT, "auto_final_cta_default_desktop.png"),
    });
    console.log("saved auto_final_cta_default_desktop.png");
  }

  // 3. Bottom CTA — Talk to a Broker hovered
  const brokerBtn = await page.$(".pilot-auto-final-broker-btn");
  if (brokerBtn) {
    const box = await brokerBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise((r) => setTimeout(r, 200));
    }
    if (ctaEl) {
      await ctaEl.screenshot({
        path: path.join(OUT, "auto_final_cta_broker_hover_desktop.png"),
      });
      console.log("saved auto_final_cta_broker_hover_desktop.png");
    }
  }

  // 4. Mobile full page
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(OUT, "auto_page_mobile.png"),
    fullPage: true,
  });
  console.log("saved auto_page_mobile.png");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
