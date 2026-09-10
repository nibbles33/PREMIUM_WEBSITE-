#!/usr/bin/env node
/**
 * Batch 3.5 — Carrier marquee ultrawide coverage verifier (Puppeteer).
 * Mathematical coverage: at every animation progress, track must cover the rail viewport.
 * Run: BASE_URL=http://localhost:3000 node scripts/verify-carrier-marquee-coverage.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.join(
  __dirname,
  "../docs/qa-screenshots/prelaunch-batch-3-5-2026-09-10",
);

const VIEWPORTS = [390, 768, 1024, 1440, 1920, 2560, 3440, 3840];
const PROGRESS = [0, 0.25, 0.5, 0.75, 0.99];
const APPROVED = 12;

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=3840,900"],
  });
  const page = await browser.newPage();
  const results = [];
  const errors = [];

  for (const width of VIEWPORTS) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForSelector(".pilot-carrier-rail .pilot-infinite-rail-track", {
      timeout: 30000,
    });
    // Allow ResizeObserver to publish --pilot-rail-shift + images to settle
    await new Promise((r) => setTimeout(r, 800));

    const progresses = width >= 1440 ? PROGRESS : [0, 0.5, 0.99];
    for (const progress of progresses) {
      const row = await page.evaluate(
        ({ progress, approved, viewportWidth }) => {
          const rail = document.querySelector(
            ".pilot-carrier-rail .pilot-infinite-rail",
          );
          const track = document.querySelector(
            ".pilot-carrier-rail .pilot-infinite-rail-track",
          );
          if (!rail || !track) return { ok: false, reason: "missing-rail" };

          const sequences = [...track.children];
          const sequenceCount = sequences.length;
          const sequenceWidth = sequences[0]?.getBoundingClientRect().width || 0;
          const shiftPx =
            Number.parseFloat(
              getComputedStyle(track).getPropertyValue("--pilot-rail-shift"),
            ) || 0;

          track.style.animation = "none";
          const x = -shiftPx * (1 - progress);
          track.style.transform = `translate3d(${x}px, 0, 0)`;

          const railRect = rail.getBoundingClientRect();
          const trackRect = track.getBoundingClientRect();
          const gapLeft = Math.max(0, trackRect.left - railRect.left);
          const gapRight = Math.max(0, railRect.right - trackRect.right);
          const uncovered = gapLeft + gapRight;

          const cards = track.querySelectorAll(".partner-logo-card").length;
          const pageOverflow =
            document.documentElement.scrollWidth > viewportWidth + 1;

          const capacity = (sequenceCount - 1) * sequenceWidth;
          const capacityOk = capacity + 1 >= railRect.width;

          const shiftOk =
            shiftPx > 0 &&
            Math.abs(shiftPx - sequenceWidth) <=
              Math.max(48, sequenceWidth * 0.2);

          const ok =
            sequenceCount >= 4 &&
            cards === approved * sequenceCount &&
            shiftOk &&
            capacityOk &&
            uncovered < 1.5 &&
            !pageOverflow;

          return {
            ok,
            viewportWidth,
            railWidth: railRect.width,
            sequenceCount,
            sequenceWidth: Math.round(sequenceWidth * 100) / 100,
            shiftPx: Math.round(shiftPx * 100) / 100,
            trackWidth: Math.round(trackRect.width * 100) / 100,
            capacity: Math.round(capacity * 100) / 100,
            uncovered: Math.round(uncovered * 100) / 100,
            gapLeft: Math.round(gapLeft * 100) / 100,
            gapRight: Math.round(gapRight * 100) / 100,
            cards,
            pageOverflow,
            progress,
          };
        },
        { progress, approved: APPROVED, viewportWidth: width },
      );

      results.push({ width, ...row });
      if (!row.ok) errors.push(`${width}@${progress}: ${JSON.stringify(row)}`);
    }
  }

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const rails = await page.evaluate(() => ({
    yep: Boolean(document.querySelector(".pilot-section-yep")),
    personal: Boolean(document.querySelector(".pilot-section-personal")),
    awards: Boolean(document.querySelector(".pilot-section-awards")),
    carrier: Boolean(document.querySelector(".pilot-carrier-rail")),
  }));

  await browser.close();

  const widthPass = {};
  for (const w of VIEWPORTS) {
    widthPass[w] = results.filter((r) => r.width === w).every((r) => r.ok);
  }

  const summary = {
    ok: errors.length === 0,
    approvedCarriers: APPROVED,
    widthPass,
    rails,
    errors,
    results,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DIR, "carrier-marquee-coverage.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        ok: summary.ok,
        widthPass,
        rails,
        errorCount: errors.length,
        sampleErrors: errors.slice(0, 8),
      },
      null,
      2,
    ),
  );
  if (!summary.ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
