#!/usr/bin/env node
/** Contractors motion handoff choreography — runtime verification. */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/contractors-insurance/";

const STATES = [
  {
    id: "general-liability",
    tabIndex: 0,
    expectPath: "state-liability",
    handoff: false,
  },
  {
    id: "tools-equipment-coverage",
    tabIndex: 1,
    expectPath: "state-tools-equipment",
    handoff: true,
  },
  {
    id: "builder-s-risk",
    tabIndex: 2,
    expectPath: "state-property",
    handoff: true,
  },
  {
    id: "wrap-up-liability",
    tabIndex: 3,
    expectPath: "state-installation-work",
    handoff: false,
  },
];

async function getStageAttrs(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".pilot-ce-state-image-stage");
    const current = document.querySelector(".pilot-ce-state-image--current");
    const next = document.querySelector(".pilot-ce-state-image--next");
    const currentOpacity = current ? parseFloat(getComputedStyle(current).opacity) : 0;
    const nextOpacity = next ? parseFloat(getComputedStyle(next).opacity) : 0;
    const visible =
      next && nextOpacity > currentOpacity
        ? next.currentSrc || next.src
        : current?.currentSrc || current?.src || "";
    return {
      src: visible,
      motion: stage?.getAttribute("data-motion"),
      handoffPhase: stage?.getAttribute("data-handoff-phase"),
      assetMode: stage?.getAttribute("data-asset-mode"),
      handoffConfidence: stage?.getAttribute("data-handoff-confidence"),
      placeholderCount: document.querySelectorAll(
        ".pilot-ce-motion-object-placeholder",
      ).length,
    };
  });
}

async function clickTab(page, index) {
  const tabs = await page.$$(".pilot-product-coverage-card");
  if (tabs[index]) {
    await tabs[index].click();
    await new Promise((r) => setTimeout(r, 200));
  }
}

async function verifyBase(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  const attrs = await getStageAttrs(page);
  const errors = [];
  if (!attrs.src.includes("state-liability")) errors.push(`load-not-liability:${attrs.src}`);
  if (attrs.assetMode !== "final") errors.push(`load-asset-mode:${attrs.assetMode}`);
  return errors;
}

async function verifyHandoffState(page, state) {
  await clickTab(page, state.tabIndex);

  const errors = [];

  if (state.handoff) {
    await new Promise((r) => setTimeout(r, 550));
    const mid = await getStageAttrs(page);
    if (mid.handoffPhase !== "choreography" && mid.handoffPhase !== "handoff") {
      /* may have passed quickly — check placeholders were visible or motion playing */
      if (mid.motion !== "playing" && mid.placeholderCount === 0) {
        errors.push(`no-choreography:${mid.handoffPhase}`);
      }
    }
    if (mid.assetMode !== "placeholder") {
      errors.push(`expected-placeholder-mode:${mid.assetMode}`);
    }
    if (mid.handoffConfidence !== "low") {
      errors.push(`confidence-not-flagged:${mid.handoffConfidence}`);
    }
  }

  await new Promise((r) => setTimeout(r, 1600));
  const settled = await getStageAttrs(page);
  if (!settled.src.includes(state.expectPath)) errors.push(`wrong-image:${settled.src}`);
  if (settled.handoffPhase !== "settled" && settled.handoffPhase !== "idle") {
    errors.push(`not-settled:${settled.handoffPhase}`);
  }
  if (settled.motion !== "idle") errors.push(`motion-not-idle:${settled.motion}`);

  return errors;
}

async function verifyRapidSwitch(page) {
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  const sequence = [2, 1, 2, 0, 3, 1];
  for (const idx of sequence) {
    await clickTab(page, idx);
    await new Promise((r) => setTimeout(r, 180));
  }
  await new Promise((r) => setTimeout(r, 1800));
  const attrs = await getStageAttrs(page);
  const overlayCount = await page.$$eval(".pilot-ce-motion-overlay", (els) => els.length);
  const errors = [];
  if (!attrs.src.includes("state-tools-equipment")) errors.push(`rapid-stale:${attrs.src}`);
  if (overlayCount > 1) errors.push(`ghost-overlays:${overlayCount}`);
  if (attrs.motion === "playing") errors.push("motion-still-playing");
  return errors;
}

async function verifyReducedMotion(page) {
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 400));
  const attrs = await getStageAttrs(page);
  const anim = await page.evaluate(() => {
    const layer = document.querySelector(".pilot-ce-motion-object-layer");
    return layer ? getComputedStyle(layer).animationName : "none";
  });
  const errors = [];
  if (anim && anim !== "none") errors.push(`reduced-motion-animation:${anim}`);
  if (!attrs.src.includes("state-property")) errors.push(`reduced-motion-image:${attrs.src}`);
  if (attrs.handoffPhase !== "settled" && attrs.handoffPhase !== "idle") {
    errors.push(`reduced-not-settled:${attrs.handoffPhase}`);
  }
  return errors;
}

async function verifyMobile(page) {
  await page.setViewport({ width: 390, height: 844 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });
  await clickTab(page, 2);
  await new Promise((r) => setTimeout(r, 1400));
  const attrs = await getStageAttrs(page);
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  const viewport = await page.evaluate(() => document.documentElement.clientWidth);
  const errors = [];
  if (!attrs.src.includes("state-property")) errors.push(`mobile-image:${attrs.src}`);
  if (scrollW > viewport + 1) errors.push(`mobile-overflow:${scrollW}>${viewport}`);
  return errors;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  let allOk = true;

  console.log("=== Base (General liability on load) ===");
  const baseErrors = await verifyBase(page);
  console.log(baseErrors.length ? "FAIL" : "OK", baseErrors);

  console.log("\n=== Handoff states ===");
  for (const state of STATES) {
    const errors = await verifyHandoffState(page, state);
    console.log(errors.length ? "FAIL" : "OK", state.id, errors);
    if (errors.length) allOk = false;
  }

  console.log("\n=== Rapid switch ===");
  const rapidErrors = await verifyRapidSwitch(page);
  console.log(rapidErrors.length ? "FAIL" : "OK", rapidErrors);
  if (rapidErrors.length) allOk = false;

  console.log("\n=== Reduced motion (skip choreography) ===");
  const rmErrors = await verifyReducedMotion(page);
  console.log(rmErrors.length ? "FAIL" : "OK", rmErrors);
  if (rmErrors.length) allOk = false;

  console.log("\n=== Mobile 390px ===");
  const mobileErrors = await verifyMobile(page);
  console.log(mobileErrors.length ? "FAIL" : "OK", mobileErrors);
  if (mobileErrors.length) allOk = false;

  if (consoleErrors.length) {
    console.log("\nConsole errors:", consoleErrors.slice(0, 5));
    allOk = false;
  }

  console.log("\n=== Asset status ===");
  console.log("PLACEHOLDER CHOREOGRAPHY — object layers use labeled stand-ins, not final transparent PNGs");
  console.log("CLEAN BG — stand-in: state-liability.png until dedicated clean-scene assets supplied");
  console.log("HANDOFF ALIGNMENT CONFIDENCE — flagged LOW (invisible handoff not verified with final art)");

  await browser.close();
  process.exit(allOk ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
