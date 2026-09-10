#!/usr/bin/env node
/**
 * Cannabis Phase 2 verifier — retail + producer routes.
 * Does not modify navigation. Expects BASE_URL (default http://localhost:3018).
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3018";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/cannabis-visual-wiring-2026-09-10",
);

const RETAIL = {
  slug: "cannabis-retail-insurance",
  tabs: [
    "general-liability",
    "cannabis-property-stock",
    "cannabis-product-liability",
    "cannabis-crime-theft",
    "business-interruption",
  ],
  requiredPhrases: [
    "OCS",
    "AGCO",
    "contractual",
    "recall",
    "subject to",
  ],
  forbidden: [
    "Ontario law requires $5 million",
    "AGCO requires $5",
    "is automatically covered",
    "are automatically covered",
    "will cover",
    "will pay",
    "guaranteed",
    "fully protected",
  ],
  considerationMin: 7,
  faqMin: 5,
};

const PRODUCER = {
  slug: "cannabis-producer-insurance",
  tabs: [
    "cannabis-property-infrastructure",
    "cannabis-crop-stock",
    "equipment-breakdown",
    "cannabis-product-liability",
    "cannabis-product-recall",
    "business-interruption",
  ],
  requiredPhrases: [
    "living plants",
    "equipment breakdown",
    "product recall",
    "Health Canada",
    "subject to",
  ],
  forbidden: [
    "is automatically covered",
    "are automatically covered",
    "will cover",
    "will pay",
    "guaranteed",
    "licence suspension is covered",
    "CGL never covers pollution",
  ],
  considerationMin: 8,
  faqMin: 5,
};

const VIEWPORTS = [
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

function assert(cond, msg, errors) {
  if (!cond) errors.push(msg);
}

async function verifyRoute(page, spec, routeOut) {
  const errors = [];
  const result = { slug: spec.slug, pass: false, errors: [], explorer: [] };
  fs.mkdirSync(routeOut, { recursive: true });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/${spec.slug}/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForSelector("h1", { timeout: 30000 });

  const bodyText = await page.evaluate(() => document.body.innerText || "");

  for (const phrase of spec.requiredPhrases) {
    assert(
      bodyText.toLowerCase().includes(phrase.toLowerCase()),
      `missing required phrase: ${phrase}`,
      errors,
    );
  }
  for (const phrase of spec.forbidden) {
    assert(
      !bodyText.toLowerCase().includes(phrase.toLowerCase()),
      `forbidden phrase present: ${phrase}`,
      errors,
    );
  }

  // AGCO vs OCS distinction on retail
  if (spec.slug === "cannabis-retail-insurance") {
    assert(/AGCO/i.test(bodyText), "retail missing AGCO mention", errors);
    assert(/OCS/i.test(bodyText), "retail missing OCS mention", errors);
    assert(
      /contractual/i.test(bodyText),
      "retail missing contractual framing for OCS",
      errors,
    );
    assert(
      !/Ontario law requires \$5/i.test(bodyText),
      "retail incorrectly frames $5M as statute",
      errors,
    );
  }

  // Product liability vs recall distinction
  assert(
    /product liability/i.test(bodyText) && /recall/i.test(bodyText),
    "missing product liability / recall distinction signals",
    errors,
  );

  if (spec.slug === "cannabis-producer-insurance") {
    assert(
      /living plant/i.test(bodyText),
      "producer missing living plant distinction",
      errors,
    );
    assert(
      /equipment breakdown/i.test(bodyText),
      "producer missing equipment breakdown",
      errors,
    );
  }

  const counts = await page.evaluate(() => {
    const considerations = document.querySelectorAll(
      "[data-consideration], .pilot-consideration-item, details.pilot-consideration",
    );
    const faqs = document.querySelectorAll(
      "[data-faq-item], .faq-item, details.faq-item, .pilot-faq-item",
    );
    const main = document.querySelector("main") || document.body;
    const faqButtons = main.querySelectorAll(
      'button[aria-expanded], [class*="faq"] button, [class*="Faq"] button',
    );
    const heroImg = document.querySelector(".pilot-product-hero-photo img");
    const explorerImg = document.querySelector(
      ".pilot-ce-scene-interactive-master-image",
    );
    const heroSrc =
      (heroImg && (heroImg.getAttribute("src") || heroImg.currentSrc)) || "";
    const explorerSrc =
      (explorerImg &&
        (explorerImg.getAttribute("src") || explorerImg.currentSrc)) ||
      "";
    const explorerFit = explorerImg
      ? getComputedStyle(explorerImg).objectFit
      : null;
    const explorerPos = explorerImg
      ? getComputedStyle(explorerImg).objectPosition
      : null;
    return {
      considerationNodes: considerations.length,
      faqNodes: Math.max(faqs.length, faqButtons.length),
      h1: document.querySelector("h1")?.textContent?.trim() || "",
      explorerPresent: Boolean(
        document.querySelector(
          ".pilot-product-explorer-stage, .pilot-ce-stage-frame",
        ),
      ),
      overflowX:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      heroSrc,
      explorerSrc,
      explorerFit,
      explorerPos,
    };
  });

  assert(counts.explorerPresent, "Coverage Explorer stage missing", errors);
  assert(!counts.overflowX, "horizontal overflow at 1440", errors);
  assert(
    /CANNABIS/.test(counts.heroSrc),
    `hero not using CANNABIS asset (src=${counts.heroSrc})`,
    errors,
  );
  assert(
    /CANNABIS/.test(counts.explorerSrc) ||
      /cannabis-(retail|producer)-insurance-interactive-master/.test(
        counts.explorerSrc,
      ),
    `explorer not using approved CANNABIS master (src=${counts.explorerSrc})`,
    errors,
  );
  assert(
    counts.explorerFit === "contain",
    `explorer object-fit is ${counts.explorerFit}, expected contain`,
    errors,
  );

  // Click each explorer tab by id suffix
  await page.evaluate(() =>
    document
      .querySelector(".pilot-product-explorer-stage, .pilot-ce-stage-frame")
      ?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 400));

  for (let i = 0; i < spec.tabs.length; i++) {
    const tabId = spec.tabs[i];
    const tabSel = `.pilot-product-coverage-list [id$="-tab-${tabId}"], [id$="-tab-${tabId}"]`;
    const found = await page.$(tabSel);
    assert(found, `missing explorer tab: ${tabId}`, errors);
    if (found) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        el?.scrollIntoView({ block: "center" });
        el?.click();
      }, tabSel);
      await new Promise((r) => setTimeout(r, 350));
      const state = await page.evaluate((id) => {
        const tab = document.querySelector(
          `.pilot-product-coverage-list [id$="-tab-${id}"], [id$="-tab-${id}"]`,
        );
        const stage = document.querySelector(
          ".pilot-product-explorer-stage, .pilot-ce-stage-frame",
        );
        const detailTitle = stage?.querySelector("h3")?.textContent?.trim();
        const detailBody = stage
          ?.querySelector("h3 + p")
          ?.textContent?.trim();
        return {
          selected: tab?.getAttribute("aria-selected") === "true",
          detailTitle: detailTitle || null,
          detailBodyLen: detailBody?.length || 0,
          hasV2Pair: Boolean(detailTitle && detailBody && detailBody.length > 40),
        };
      }, tabId);
      result.explorer.push({ id: tabId, ...state });
      assert(state.selected, `tab not selected after click: ${tabId}`, errors);
      assert(state.hasV2Pair, `missing V2 LEFT detail for: ${tabId}`, errors);
    }
  }

  assert(
    result.explorer.length === spec.tabs.length,
    `expected ${spec.tabs.length} explorer states, got ${result.explorer.length}`,
    errors,
  );
  assert(
    result.explorer.every((e) => e.hasV2Pair),
    "not all explorer states have V2 LEFT/RIGHT pairs",
    errors,
  );

  const keyboard = await page.evaluate((firstId) => {
    const tab = document.querySelector(
      `.pilot-product-coverage-list [id$="-tab-${firstId}"], [id$="-tab-${firstId}"]`,
    );
    if (!tab) return { ok: false, reason: "missing-first-tab" };
    tab.focus();
    tab.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );
    const active = document.querySelector(
      ".pilot-product-coverage-card.is-active, [aria-selected='true']",
    );
    return {
      ok: Boolean(active),
      activeId: active?.id || null,
    };
  }, spec.tabs[0]);
  assert(keyboard.ok, `keyboard interaction failed: ${JSON.stringify(keyboard)}`, errors);
  result.keyboard = keyboard;

  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  const reduced = await page.evaluate(() => ({
    hasH1: Boolean(document.querySelector("h1")),
    hasExplorer: Boolean(
      document.querySelector(
        ".pilot-product-explorer-stage, .pilot-ce-stage-frame",
      ),
    ),
    explorerSrc:
      document.querySelector(".pilot-ce-scene-interactive-master-image")
        ?.currentSrc ||
      document
        .querySelector(".pilot-ce-scene-interactive-master-image")
        ?.getAttribute("src") ||
      "",
  }));
  assert(reduced.hasExplorer, "explorer missing under reduced motion", errors);
  result.reducedMotion = reduced;
  await page.emulateMediaFeatures([]);

  // Considerations / FAQ soft checks via text markers
  const considerationHits = (
    bodyText.match(/\n[A-Z][^\n]{8,80}\n/g) || []
  ).length;
  assert(
    considerationHits >= spec.considerationMin ||
      counts.considerationNodes >= spec.considerationMin,
    `expected >= ${spec.considerationMin} considerations`,
    errors,
  );
  assert(
    (bodyText.match(/\?/g) || []).length >= spec.faqMin,
    `expected >= ${spec.faqMin} FAQ questions`,
    errors,
  );

  await page.screenshot({
    path: path.join(routeOut, "desktop_1440.png"),
    fullPage: true,
  });

  // Responsive sweep
  const responsive = [];
  for (const vp of VIEWPORTS) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
    });
    await page.goto(`${BASE}/${spec.slug}/`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 500));
    const metrics = await page.evaluate(() => ({
      overflowX:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      hasH1: Boolean(document.querySelector("h1")),
      hasExplorer: Boolean(
        document.querySelector(
          ".pilot-product-explorer-stage, .pilot-ce-stage-frame",
        ),
      ),
      hasCta: /quote|broker|review/i.test(document.body.innerText || ""),
    }));
    await page.screenshot({
      path: path.join(routeOut, `responsive_${vp.name}.png`),
      fullPage: true,
    });
    assert(!metrics.overflowX, `overflow at ${vp.name}`, errors);
    assert(metrics.hasH1, `missing h1 at ${vp.name}`, errors);
    assert(metrics.hasExplorer, `missing explorer at ${vp.name}`, errors);
    responsive.push({ viewport: vp.name, ...metrics });
  }

  result.responsive = responsive;
  result.errors = errors;
  result.pass = errors.length === 0;
  result.counts = counts;
  return result;
}

async function main() {
  // Static architecture checks (no browser)
  const staticErrors = [];
  const navFiles = [
    "src/data/nav.ts",
    "src/data/nav-business.ts",
    "src/data/nav-agriculture.ts",
    "src/data/nav-personal.ts",
    "src/data/nav-resources.ts",
    "src/data/commercial-clusters.ts",
  ];
  for (const f of navFiles) {
    const p = path.join(__dirname, "..", f);
    if (!fs.existsSync(p)) continue;
    const txt = fs.readFileSync(p, "utf8");
    if (/cannabis/i.test(txt)) {
      staticErrors.push(`navigation unexpectedly references cannabis in ${f}`);
    }
  }
  const masterAssets = fs.readFileSync(
    path.join(
      __dirname,
      "../src/data/coverage-explorer/interactive-master-assets.ts",
    ),
    "utf8",
  );
  assert(
    /cannabis-retail-insurance/.test(masterAssets),
    "retail missing from interactive master map",
    staticErrors,
  );
  assert(
    /cannabis-producer-insurance/.test(masterAssets),
    "producer missing from interactive master map",
    staticErrors,
  );
  assert(
    /CANNABIS\/cannabis-retail-insurance-interactive-master\.png/.test(
      masterAssets,
    ),
    "retail explorer not wired to approved CANNABIS master",
    staticErrors,
  );
  assert(
    /CANNABIS\/cannabis-producer-insurance-interactive-master\.png/.test(
      masterAssets,
    ),
    "producer explorer not wired to approved CANNABIS master",
    staticErrors,
  );
  assert(
    !/TODO BEFORE LAUNCH: CANNABIS/.test(masterAssets),
    "cannabis dedicated-image TODO still present after approved assets wired",
    staticErrors,
  );
  const producerMap = masterAssets.match(
    /"cannabis-producer-insurance":\s*"([^"]+)"/,
  );
  assert(
    producerMap && !/manufacturing-insurance-interactive-master/.test(producerMap[1]),
    "producer still mapped to manufacturing explorer master",
    staticErrors,
  );

  const placements = fs.readFileSync(
    path.join(__dirname, "../src/data/photography/placements.ts"),
    "utf8",
  );
  const retailHero = placements.match(
    /slug: "cannabis-retail-insurance"[\s\S]*?src: "([^"]+)"/,
  );
  const producerHero = placements.match(
    /slug: "cannabis-producer-insurance"[\s\S]*?src: "([^"]+)"/,
  );
  assert(
    retailHero && retailHero[1] === "/images/CANNABIS/cannabis-retail-insurance.webp",
    "retail hero not wired to approved CANNABIS webp",
    staticErrors,
  );
  assert(
    producerHero &&
      producerHero[1] === "/images/CANNABIS/cannabis-producer-insurance.webp",
    "producer hero not wired to approved CANNABIS webp",
    staticErrors,
  );
  assert(
    retailHero &&
      !/photography\/commercial\/retail-insurance\.webp/.test(retailHero[1]),
    "retail still references photography/commercial/retail-insurance.webp hero",
    staticErrors,
  );
  assert(
    producerHero &&
      !/photography\/commercial\/manufacturing-insurance\.webp/.test(
        producerHero[1],
      ),
    "producer still references photography/commercial/manufacturing-insurance.webp hero",
    staticErrors,
  );

  if (staticErrors.length) {
    console.error(JSON.stringify({ pass: false, staticErrors }, null, 2));
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  const retail = await verifyRoute(
    page,
    RETAIL,
    path.join(OUT, "cannabis-retail-insurance"),
  );
  const producer = await verifyRoute(
    page,
    PRODUCER,
    path.join(OUT, "cannabis-producer-insurance"),
  );

  await browser.close();

  const summary = {
    pass: retail.pass && producer.pass,
    navigationChanged: false,
    staticNavCannabisReferences: false,
    retail,
    producer,
    notes: [
      "Navigation intentionally NOT modified.",
      "Retail explorer image: /images/CANNABIS/cannabis-retail-insurance-interactive-master.png (approved PR #23).",
      "Producer explorer image: /images/CANNABIS/cannabis-producer-insurance-interactive-master.png (approved PR #23).",
      "Hero photography: /images/CANNABIS/cannabis-retail-insurance.webp and /images/CANNABIS/cannabis-producer-insurance.webp (approved PR #23).",
    ],
  };

  fs.writeFileSync(
    path.join(OUT, "verification.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
  if (!summary.pass) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
