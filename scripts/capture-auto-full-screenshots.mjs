/**
 * Full-page Auto screenshots for final visual polish review.
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

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(OUT, "auto_full_desktop_polish.png"),
    fullPage: true,
  });
  console.log("saved auto_full_desktop_polish.png");

  await page.setViewport({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(OUT, "auto_full_mobile_polish.png"),
    fullPage: true,
  });
  console.log("saved auto_full_mobile_polish.png");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
