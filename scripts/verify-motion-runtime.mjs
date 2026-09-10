/**
 * Runtime motion verification — samples computed transforms at T=0, T=2s, T=5s
 * for all four homepage rails (normal + reduced motion).
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const RAIL_SELECTORS = {
  carrier: ".pilot-carrier-rail .pilot-infinite-rail-track",
  awards: ".pilot-awards-rail .pilot-infinite-rail-track",
  yep: ".pilot-yep-rail .pilot-infinite-rail-track",
  personal: ".pilot-filmstrip-inner",
};

async function sample(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false, selector: sel };
    const cs = getComputedStyle(el);
    return {
      found: true,
      selector: sel,
      transform: cs.transform,
      animationName: cs.animationName,
      animationDuration: cs.animationDuration,
      animationPlayState: cs.animationPlayState,
      display: cs.display,
      overflowX: cs.overflowX,
    };
  }, selector);
}

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrollPage(page) {
  await page.waitForSelector(".pilot-carrier-rail .pilot-infinite-rail-track", {
    timeout: 30000,
  });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
    const carrier = document.querySelector(".pilot-carrier-rail");
    carrier?.scrollIntoView({ block: "center" });
  });
  await wait(800);
}

async function sampleAll(page) {
  const out = {};
  for (const [name, sel] of Object.entries(RAIL_SELECTORS)) {
    out[name] = await sample(page, sel);
  }
  return out;
}

function changed(a, b) {
  return (
    a?.found &&
    b?.found &&
    a.transform !== b.transform &&
    a.transform !== "none"
  );
}

async function testMotionMode(page, reduced) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" },
  ]);
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollPage(page);

  const t0 = await sampleAll(page);
  await wait(2000);
  const t2 = await sampleAll(page);
  await wait(3000);
  const t5 = await sampleAll(page);

  const motionChanged = {};
  for (const name of Object.keys(RAIL_SELECTORS)) {
    motionChanged[name] = changed(t0[name], t5[name]);
  }

  const staticFallbacks = await page.evaluate(() => ({
    carrierGrid: document.querySelector(".pilot-carrier-static-fallback"),
    awardsStatic: document.querySelector(".pilot-awards-static-fallback"),
    yepStatic: document.querySelector(".pilot-yep-lane-static"),
    mobileTrack: document.querySelector(".pilot-filmstrip-track-mobile"),
  }));

  return {
    reducedMotion: reduced,
    samples: { t0, t2, t5 },
    motionChanged,
    staticFallbacks: {
      carrierGrid: !!staticFallbacks.carrierGrid,
      awardsStatic: !!staticFallbacks.awardsStatic,
      yepStatic: !!staticFallbacks.yepStatic,
      mobileTrack: !!staticFallbacks.mobileTrack,
    },
    durations: {
      carrier: t5.carrier?.animationDuration,
      awards: t5.awards?.animationDuration,
      yep: t5.yep?.animationDuration,
    },
  };
}

async function testPersonalArrows(page) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);
  await page.setViewport(DESKTOP);
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollPage(page);

  const getActive = () =>
    page.evaluate(() => {
      const labels = [
        "Auto",
        "Home",
        "Condo",
        "Tenant",
        "Motorcycle",
        "Boat",
        "Cottage",
        "Travel",
      ];
      const active = document.querySelector(
        ".pilot-filmstrip-frame-dense.is-active p",
      );
      const text = active?.textContent?.trim() ?? null;
      return { label: text, index: text ? labels.indexOf(text) : -1 };
    });

  const positions = [];
  positions.push({ step: "start", ...(await getActive()) });

  for (let i = 1; i <= 5; i++) {
    await page.click('button[aria-label="Next personal insurance product"]');
    await wait(350);
    positions.push({ step: `next-${i}`, ...(await getActive()) });
  }

  for (let i = 1; i <= 5; i++) {
    await page.click('button[aria-label="Previous personal insurance product"]');
    await wait(350);
    positions.push({ step: `prev-${i}`, ...(await getActive()) });
  }

  const nextSteps = positions.filter((p) => p.step.startsWith("next"));
  const prevSteps = positions.filter((p) => p.step.startsWith("prev"));

  const everyNextChanged = nextSteps.every((step, i) => {
    if (i === 0) return true;
    return step.index !== nextSteps[i - 1].index;
  });

  const everyPrevChanged = prevSteps.every((step, i) => {
    if (i === 0) return true;
    return step.index !== prevSteps[i - 1].index;
  });

  const beforeResume = await sample(page, RAIL_SELECTORS.personal);
  await wait(4000);
  const afterResume = await sample(page, RAIL_SELECTORS.personal);
  const autoplayResumed = changed(beforeResume, afterResume);

  return {
    positions,
    everyNextChanged,
    everyPrevChanged,
    autoplayResumed,
  };
}

async function testMobile(page) {
  await page.setViewport(MOBILE);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await scrollPage(page);

  const t0 = await sampleAll(page);
  await wait(3000);
  const t3 = await sampleAll(page);

  const overflow = await page.evaluate(() => ({
    docScrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));

  const motionChanged = {};
  for (const name of Object.keys(RAIL_SELECTORS)) {
    motionChanged[name] = changed(t0[name], t3[name]);
  }

  return { motionChanged, overflow, samples: { t0, t3 } };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport(DESKTOP);

  let report;
  try {
    const normal = await testMotionMode(page, false);
    const reduced = await testMotionMode(page, true);
    const arrows = await testPersonalArrows(page);
    const mobile = await testMobile(page);
    report = { normal, reduced, arrows, mobile };
  } finally {
    await browser.close();
  }

  console.log(JSON.stringify(report, null, 2));

  const allNormalMoving = Object.values(report.normal.motionChanged).every(Boolean);
  const allReducedMoving = Object.values(report.reduced.motionChanged).every(Boolean);
  const noStaticFallbacks =
    !report.normal.staticFallbacks.carrierGrid &&
    !report.normal.staticFallbacks.awardsStatic &&
    !report.normal.staticFallbacks.yepStatic &&
    !report.normal.staticFallbacks.mobileTrack;
  const arrowsOk =
    report.arrows.everyNextChanged &&
    report.arrows.everyPrevChanged &&
    report.arrows.autoplayResumed;
  const mobileOk =
    Object.values(report.mobile.motionChanged).every(Boolean) &&
    !report.mobile.overflow.hasHorizontalOverflow;

  const pass =
    allNormalMoving &&
    allReducedMoving &&
    noStaticFallbacks &&
    arrowsOk &&
    mobileOk;

  process.exit(pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
