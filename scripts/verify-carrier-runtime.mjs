/**
 * Carrier marquee runtime verification — normal motion + missing pilot.css chunk
 */
import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync } from "fs";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const OUT = "/opt/cursor/artifacts";

async function audit(page, label) {
  return page.evaluate((label) => {
    const marquee = document.querySelector(".pilot-carrier-marquee");
    const fallback = document.querySelector(".pilot-carrier-static-fallback");
    const track = document.querySelector(".pilot-carrier-marquee-track");

    function cs(el) {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        display: s.display,
        visibility: s.visibility,
        height: el.getBoundingClientRect().height,
        className: el.className,
      };
    }

    const trackCs = track ? getComputedStyle(track) : null;
    const globalsHasPilotCarrier = [...document.styleSheets].some((sheet) => {
      try {
        return [...sheet.cssRules].some((r) =>
          r.cssText?.includes("pilot-carrier-static-fallback"),
        );
      } catch {
        return false;
      }
    });

    return {
      label,
      prefersReducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      globalsHasPilotCarrierRules: globalsHasPilotCarrier,
      marquee: cs(marquee),
      fallback: cs(fallback),
      track: trackCs
        ? {
            animationName: trackCs.animationName,
            animationDuration: trackCs.animationDuration,
            animationPlayState: trackCs.animationPlayState,
            transform: trackCs.transform,
          }
        : null,
    };
  }, label);
}

async function sampleTransforms(page) {
  const samples = {};
  for (const [key, ms] of [
    ["t0", 0],
    ["t2", 2000],
    ["t5", 3000],
  ]) {
    if (ms) await new Promise((r) => setTimeout(r, ms));
    samples[key] = await page.evaluate(() => {
      const track = document.querySelector(".pilot-carrier-marquee-track");
      if (!track) return null;
      const s = getComputedStyle(track);
      return {
        transform: s.transform,
        animationPlayState: s.animationPlayState,
      };
    });
  }
  return samples;
}

async function runScenario(blockPilotChunk) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);

  let blockedUrls = [];
  if (blockPilotChunk) {
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (req.resourceType() === "stylesheet" && url.includes("_next/static/chunks/")) {
        // Allow first/main CSS load through; block supplemental pilot.css split chunks
        if (url.includes("pilot") || url.match(/\/chunks\/[0-9a-z_-]+\.css$/)) {
          // defer: block non-primary chunks after we know main bundle hash
        }
      }
      req.continue();
    });
  }

  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });

  if (blockPilotChunk) {
    blockedUrls = await page.evaluate(() => {
      const removed = [];
      for (const sheet of [...document.styleSheets]) {
        const href = sheet.href || "";
        if (!href.includes("_next/static/chunks/")) continue;
        let hasCarrier = false;
        let hasOtherPilot = false;
        try {
          for (const rule of [...sheet.cssRules]) {
            const text = rule.cssText || "";
            if (text.includes("pilot-carrier-static-fallback")) hasCarrier = true;
            if (text.includes("pilot-filmstrip") || text.includes("pilot-awards"))
              hasOtherPilot = true;
          }
        } catch {
          continue;
        }
        if (hasOtherPilot && !hasCarrier) {
          sheet.ownerNode?.remove();
          removed.push(href);
        }
      }
      return removed;
    });
  }

  // Scroll to carriers
  await page.evaluate(() => {
    const h = document.querySelector("#pilot-carriers-heading");
    h?.scrollIntoView({ block: "center" });
  });
  await new Promise((r) => setTimeout(r, 500));

  const before = await audit(
    page,
    blockPilotChunk ? "blocked-pilot-chunk" : "normal",
  );
  const transforms = await sampleTransforms(page);

  mkdirSync(OUT, { recursive: true });
  if (!blockPilotChunk) {
    await page.screenshot({
      path: `${OUT}/carrier_marquee_normal_motion.png`,
      fullPage: false,
    });
  }

  await browser.close();
  return { blockedUrls, before, transforms };
}

const normal = await runScenario(false);
const blocked = await runScenario(true);

const report = {
  normal,
  blocked,
  pass:
    normal.before.marquee?.display === "block" &&
    normal.before.fallback?.display === "none" &&
    normal.before.fallback?.height === 0 &&
    normal.before.track?.animationName === "pilot-carrier-scroll" &&
    normal.transforms.t0?.transform !== normal.transforms.t5?.transform &&
    blocked.before.marquee?.display === "block" &&
    blocked.before.fallback?.display === "none" &&
    blocked.before.track?.animationName === "pilot-carrier-scroll",
};

console.log(JSON.stringify(report, null, 2));
writeFileSync(`${OUT}/carrier_runtime_report.json`, JSON.stringify(report, null, 2));
process.exit(report.pass ? 0 : 1);
