/**
 * Runtime motion verification — samples computed transforms at T=0, T=2s, T=5s
 */
import puppeteer from "puppeteer";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const VIEWPORT = { width: 1440, height: 900 };

async function sample(page, selector, prop = "transform") {
  return page.evaluate(
    (sel, property) => {
      const el = document.querySelector(sel);
      if (!el) return { found: false };
      const cs = getComputedStyle(el);
      return {
        found: true,
        transform: cs.transform,
        animationName: cs.animationName,
        animationDuration: cs.animationDuration,
        animationPlayState: cs.animationPlayState,
        display: cs.display,
        overflowX: cs.overflowX,
      };
    },
    selector,
    prop,
  );
}

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);

  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });

  // Scroll through page to trigger RevealOnScroll
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await wait(500);

  const reducedMotion = await page.evaluate(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const carrierVisible = await page.evaluate(() => {
    const marquee = document.querySelector(".pilot-carrier-marquee");
    const fallback = document.querySelector(".pilot-carrier-static-fallback");
    if (!marquee || !fallback) return null;
    return {
      marqueeDisplay: getComputedStyle(marquee).display,
      fallbackDisplay: getComputedStyle(fallback).display,
    };
  });

  const selectors = {
    carriers: ".pilot-carrier-marquee-track",
    personal: ".pilot-filmstrip-inner",
    awards: ".pilot-awards-track",
    yep: ".pilot-yep-lane-track.is-right",
  };

  const t0 = {};
  for (const [name, sel] of Object.entries(selectors)) {
    t0[name] = await sample(page, sel);
  }

  await wait(2000);
  const t2 = {};
  for (const [name, sel] of Object.entries(selectors)) {
    t2[name] = await sample(page, sel);
  }

  await wait(3000);
  const t5 = {};
  for (const [name, sel] of Object.entries(selectors)) {
    t5[name] = await sample(page, sel);
  }

  // Personal arrow test
  const personalBefore = t5.personal?.transform ?? "none";
  await page.click('button[aria-label="Next personal insurance product"]');
  await wait(300);
  const personalAfterArrow = await sample(page, selectors.personal);

  // Awards scrollbar check
  const awardsScrollbar = await page.evaluate(() => {
    const marquee = document.querySelector(".pilot-awards-marquee");
    const fallback = document.querySelector(".pilot-awards-static-fallback");
    const section = document.querySelector(".pilot-section-awards");
    return {
      marqueeDisplay: marquee ? getComputedStyle(marquee).display : null,
      fallbackDisplay: fallback ? getComputedStyle(fallback).display : null,
      fallbackOverflow: fallback ? getComputedStyle(fallback).overflowX : null,
      sectionOverflow: section ? getComputedStyle(section).overflow : null,
      fallbackScrollbarWidth: fallback
        ? getComputedStyle(fallback).scrollbarWidth
        : null,
    };
  });

  function changed(a, b) {
    return a?.transform !== b?.transform;
  }

  const report = {
    prefersReducedMotion: reducedMotion,
    carrierVisibility: carrierVisible,
    awardsScrollbar,
    samples: { t0, t2, t5 },
    motionChanged: {
      carriers: changed(t0.carriers, t5.carriers),
      personal: changed(t0.personal, t5.personal),
      awards: changed(t0.awards, t5.awards),
      yep: changed(t0.yep, t5.yep),
    },
    personalArrowChanged: personalBefore !== personalAfterArrow?.transform,
    personalAfterArrow,
  };

  console.log(JSON.stringify(report, null, 2));
  await browser.close();

  const allMoving =
    report.motionChanged.carriers &&
    report.motionChanged.personal &&
    report.motionChanged.awards &&
    report.motionChanged.yep &&
    report.personalArrowChanged &&
    carrierVisible?.marqueeDisplay !== "none" &&
    carrierVisible?.fallbackDisplay === "none";

  process.exit(allMoving ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
