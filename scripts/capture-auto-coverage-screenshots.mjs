/**
 * Capture Auto coverage stage screenshots for owner review.
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3002";
const OUT = "/opt/cursor/artifacts/screenshots";
const URL = `${BASE}/auto-insurance/`;

const coverageStates = [
  { id: "liability", label: "Liability" },
  { id: "collision", label: "Collision" },
  { id: "comprehensive", label: "Comprehensive" },
  { id: "accident-benefits", label: "Accident Benefits" },
  { id: "uninsured", label: "Uninsured Auto" },
  { id: "loss-of-use", label: "Loss of Use" },
];

async function selectCoverage(page, id) {
  const tab = await page.$(`#\\[object\\ Object\\]-tab-${id}, [role="tab"][id$="-tab-${id}"]`);
  const fallback = await page.evaluateHandle((coverageId) => {
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    return tabs.find((el) => el.id.endsWith(`-tab-${coverageId}`)) ?? null;
  }, id);
  const handle = tab ?? fallback;
  if (handle) {
    await handle.asElement()?.click();
    await new Promise((r) => setTimeout(r, 450));
  }
}

async function captureCoverageStates(page, width, height, suffix) {
  await page.setViewport({ width, height });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector(".pilot-auto-coverage-stage-frame", { timeout: 15000 });

  for (const state of coverageStates) {
    await selectCoverage(page, state.id);
    const frame = await page.$(".pilot-auto-coverage-stage-frame");
    await frame?.scrollIntoView({ block: "center" });
    await new Promise((r) => setTimeout(r, 250));

    const slug = state.id.replace(/-/g, "_");
    const file = path.join(
      OUT,
      `auto_coverage_${slug}_${suffix}.png`,
    );
    if (frame) {
      await frame.screenshot({ path: file });
    } else {
      await page.screenshot({ path: file });
    }
    console.log("saved", file);
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await captureCoverageStates(page, 1440, 900, "desktop");
  await captureCoverageStates(page, 390, 844, "mobile");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
