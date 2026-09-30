#!/usr/bin/env node
/**
 * Concept F Owner Visual Revision 3 — precision polish QA + screenshots.
 * BASE_URL=http://127.0.0.1:3020 node scripts/concept-f-rev3-qa.cjs
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://127.0.0.1:3020";
const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/homepage-authority-concept-f-rev3-2026-09-30",
);

const VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
  { name: "2560", width: 2560, height: 1440 },
  { name: "3440", width: 3440, height: 1440 },
  { name: "3840", width: 3840, height: 1600 },
];

const FULLPAGE = new Set(["390", "1440", "1920"]);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function forceReveal(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((node) => {
      node.classList.add("is-revealed");
    });
  });
}

async function auditViewport(browser, vp) {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  try {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
    });
    await page.goto(`${BASE}/`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForSelector(".pilot-authority-strip", { timeout: 30000 });
    await forceReveal(page);
    await new Promise((r) => setTimeout(r, 400));

    const row = await page.evaluate(() => {
      const doc = document.documentElement;
      const bodyText = document.body.innerText || "";
      const authorityText =
        document.querySelector(".pilot-authority-strip")?.textContent || "";

      const personalHrefs = new Set(
        [...document.querySelectorAll("a.pilot-filmstrip-frame")]
          .map((a) => a.getAttribute("href"))
          .filter(Boolean),
      );

      const personalSection = document
        .querySelector("#pilot-personal-filmstrip-heading")
        ?.closest("section");
      const exploreInPersonal = personalSection
        ? [...personalSection.querySelectorAll("a")].filter((a) => {
            const href = a.getAttribute("href") || "";
            const t = (a.textContent || "").trim().toLowerCase();
            return href.includes("/personal") && t.includes("explore");
          }).length
        : 0;

      const cards = [
        ...document.querySelectorAll(".pilot-personal-editorial-card"),
      ];
      const scroller = document.querySelector(
        ".pilot-personal-editorial-scroller",
      );
      let visibleCards = 0;
      let partialPeek = false;
      if (scroller && cards.length) {
        const sRect = scroller.getBoundingClientRect();
        for (const card of cards) {
          const r = card.getBoundingClientRect();
          const overlap =
            Math.min(r.right, sRect.right) - Math.max(r.left, sRect.left);
          if (overlap > 24) {
            visibleCards += 1;
            if (overlap < r.width * 0.92 && r.right > sRect.right - 4) {
              partialPeek = true;
            }
          }
        }
      }

      const track = document.querySelector(".pilot-personal-editorial-track");
      const personalAnim = track
        ? getComputedStyle(track).animationName
        : "none";

      const commercialTabs = document.querySelectorAll(
        '[role="tablist"][aria-label="Commercial insurance categories"] [role="tab"], [role="tablist"][aria-label="Commercial insurance categories"] button',
      ).length;

      const headingFont = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return 0;
        return Math.round(parseFloat(getComputedStyle(el).fontSize));
      };

      return {
        overflowX: doc.scrollWidth > doc.clientWidth + 1,
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        hasTeamSection: Boolean(document.querySelector("#pilot-team-heading")),
        hasHomesPill: /2,?400\+?\s*homes/i.test(bodyText),
        authorityHasOracleCell: /A Division of\s*Oracle/i.test(authorityText),
        authorityHasGoogle: /Google/i.test(authorityText),
        authorityShowsBaselineAsLive:
          /\b4\.7\b/.test(authorityText) &&
          !document.querySelector(
            ".pilot-authority-strip a[href*='share.google']",
          ),
        personalUniqueHrefs: personalHrefs.size,
        personalExploreCtaCount: exploreInPersonal,
        personalVisibleCards: visibleCards,
        personalPartialPeek: partialPeek,
        personalAutoplayAnimation:
          personalAnim && personalAnim !== "none" ? personalAnim : "none",
        commercialTabs,
        headingSizes: {
          personal: headingFont("#pilot-personal-filmstrip-heading"),
          carriers: headingFont("#pilot-carriers-heading"),
          why: headingFont("#pilot-why-premium-heading"),
          google: headingFont("#pilot-google-reviews-heading"),
          awards: headingFont("#pilot-local-heading"),
          windsor: headingFont("#pilot-windsor-oracle-heading"),
          finalCta: headingFont("#pilot-final-cta-heading"),
        },
      };
    });

    if (FULLPAGE.has(vp.name)) {
      await forceReveal(page);
      await page.screenshot({
        path: path.join(OUT, "screenshots", `homepage-full-${vp.name}.png`),
        fullPage: true,
      });
    }

    return row;
  } finally {
    await page.close().catch(() => {});
  }
}

async function personalCloseup(browser) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(`${BASE}/`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForSelector(".pilot-personal-editorial-scroller", {
      timeout: 30000,
    });
    await forceReveal(page);

    const box = await page.evaluate(() => {
      const section = document
        .querySelector("#pilot-personal-filmstrip-heading")
        ?.closest("section");
      if (!section) return null;
      section.scrollIntoView({ block: "start" });
      const r = section.getBoundingClientRect();
      return {
        x: 0,
        y: Math.max(0, Math.floor(window.scrollY + r.top)),
        width: window.innerWidth,
        height: Math.max(200, Math.floor(Math.min(1400, r.height + 24))),
      };
    });
    if (!box) return { ok: false };
    await new Promise((r) => setTimeout(r, 250));
    const file = path.join(OUT, "screenshots", "personal-closeup-1440.png");
    await page.screenshot({ path: file, clip: box });
    return { ok: fs.statSync(file).size > 4000, bytes: fs.statSync(file).size };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  ensureDir(OUT);
  ensureDir(path.join(OUT, "screenshots"));

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const audits = [];
  const errors = [];

  for (const vp of VIEWPORTS) {
    console.error(`auditing ${vp.name}...`);
    const row = await auditViewport(browser, vp);
    audits.push({ viewport: vp.name, ...row });

    if (row.overflowX) {
      errors.push(
        `${vp.name}: horizontal overflow ${row.scrollWidth}>${row.clientWidth}`,
      );
    }
    if (row.hasTeamSection) errors.push(`${vp.name}: team section present`);
    if (row.hasHomesPill) errors.push(`${vp.name}: homes pill present`);
    if (row.authorityHasOracleCell) {
      errors.push(`${vp.name}: Oracle still in authority strip`);
    }
    if (!row.authorityHasGoogle) {
      errors.push(`${vp.name}: Google missing from strip`);
    }
    if (row.authorityShowsBaselineAsLive) {
      errors.push(`${vp.name}: baseline Google shown as live`);
    }
    if (row.personalUniqueHrefs < 14) {
      errors.push(`${vp.name}: personal hrefs ${row.personalUniqueHrefs} < 14`);
    }
    if (row.personalExploreCtaCount !== 1) {
      errors.push(
        `${vp.name}: personal Explore CTAs ${row.personalExploreCtaCount} (want 1)`,
      );
    }
    if (row.personalAutoplayAnimation !== "none") {
      errors.push(
        `${vp.name}: personal autoplay ${row.personalAutoplayAnimation}`,
      );
    }
    if (vp.name === "1440") {
      if (row.personalVisibleCards < 4 || row.personalVisibleCards > 6) {
        errors.push(
          `1440: visible personal cards ${row.personalVisibleCards} (want ~4–5)`,
        );
      }
      if (row.headingSizes.personal < 42) {
        errors.push(
          `1440: personal heading ${row.headingSizes.personal}px too small`,
        );
      }
      if (row.headingSizes.carriers < 28) {
        errors.push(
          `1440: carriers heading ${row.headingSizes.carriers}px too small`,
        );
      }
    }
    if (row.commercialTabs !== 10) {
      errors.push(`${vp.name}: commercial tabs ${row.commercialTabs}`);
    }
  }

  console.error("personal closeup...");
  const closeup = await personalCloseup(browser);
  if (!closeup.ok) errors.push("personal closeup screenshot failed");

  await browser.close();

  const report = {
    ok: errors.length === 0,
    revision: 3,
    base: BASE,
    generatedAt: new Date().toISOString(),
    audits,
    personalCloseup: closeup,
    errors,
  };
  fs.writeFileSync(
    path.join(OUT, "qa-results.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        ok: report.ok,
        errorCount: errors.length,
        errors,
        sample1440: audits.find((a) => a.viewport === "1440"),
      },
      null,
      2,
    ),
  );
  if (errors.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
