#!/usr/bin/env node
const puppeteer = require("puppeteer");

const PORT = process.env.AUDIT_PORT || 3018;
const BASE = `http://localhost:${PORT}`;

async function decodeSrc(src) {
  if (src?.includes("/_next/image")) {
    const u = new URL(src, BASE);
    return decodeURIComponent(u.searchParams.get("url") || "");
  }
  return src ?? "";
}

async function findCardAsset(page, hrefFragment) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 500));
  const cards = await page.$$(
    ".pilot-yep-tile, .pilot-product-related-card, .pilot-auto-related-card",
  );
  for (const card of cards) {
    const href = await card.evaluate((el) => el.getAttribute("href"));
    if (href?.includes(hrefFragment.replace(/\/$/, ""))) {
      const img = await card.$("img");
      if (!img) return null;
      const src = await img.evaluate((el) => el.getAttribute("src"));
      return decodeSrc(src);
    }
  }
  return null;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const results = [];

  {
    const page = await browser.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".pilot-filmstrip-frame img", { timeout: 30000 });
    const imgs = await page.$$eval(".pilot-filmstrip-frame img", (els) =>
      els.slice(0, 3).map((el) => el.getAttribute("src")),
    );
    const assets = await Promise.all(imgs.map(decodeSrc));
    results.push({
      surface: "personalFilmstrip",
      pass: assets.some((a) => a.includes("auto-insurance")) && assets.some((a) => a.includes("home-insurance")),
      assets,
    });
    await page.close();
  }

  const cardChecks = [
    { surface: "yepCarousel-event", page: "/", href: "/event-liability-insurance/", asset: "event-venue.webp" },
    { surface: "yepCarousel-warehouse", page: "/", href: "/warehousing-insurance/", asset: "warehousing-insurance.webp" },
    { surface: "productRelatedRail-cyber", page: "/small-business-insurance/", href: "/cyber-insurance/", asset: "cyber-insurance.webp" },
    { surface: "productRelatedRail-cargo", page: "/trucking-insurance/", href: "/cargo-freight-insurance/", asset: "cargo-freight-insurance.webp" },
    { surface: "autoRelatedRail-umbrella", page: "/auto-insurance/", href: "/personal-umbrella-insurance/", asset: "personal-umbrella-insurance.webp" },
    { surface: "productRelatedRail-pollution", page: "/manufacturing-insurance/", href: "/product-recall-insurance/", asset: "manufacturing-insurance.webp" },
  ];

  for (const check of cardChecks) {
    const page = await browser.newPage();
    await page.goto(`${BASE}${check.page}`, { waitUntil: "networkidle0", timeout: 60000 });
    if (check.page === "/") {
      await page.evaluate(() => {
        document.getElementById("pilot-yep-heading")?.scrollIntoView({ block: "center" });
      });
      await page.waitForFunction(
        () => document.querySelector(".pilot-yep-tile img")?.getAttribute("src"),
        { timeout: 45000 },
      );
    } else {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise((r) => setTimeout(r, 1500));
      try {
        await page.waitForSelector(".pilot-product-related-card img, .pilot-auto-related-card img", {
          timeout: 15000,
        });
      } catch {
        /* section may use lazy reveal — cards still in DOM */
      }
    }
    const asset = await findCardAsset(page, check.href);
    results.push({
      surface: check.surface,
      pass: Boolean(asset && asset.includes(check.asset)),
      asset,
      expected: check.asset,
    });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify({ port: PORT, results, allPass: results.every((r) => r.pass) }, null, 2));
  if (!results.every((r) => r.pass)) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
