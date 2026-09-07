#!/usr/bin/env node
/** Measure rendered painted-image rect for each Contractors state in browser. */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const OUT = path.join(__dirname, "../docs/qa-screenshots/contractors-centering-fix");

async function measurePaintedContent(page) {
  return page.evaluate(async () => {
    const frame = document.querySelector(".pilot-ce-stage-frame--contractors-insurance");
    const img = document.querySelector(".pilot-ce-state-image--current");
    if (!frame || !img) return { error: "missing" };

    const fr = frame.getBoundingClientRect();
    const ir = img.getBoundingClientRect();
    const cs = getComputedStyle(img);

    // Draw rendered image to canvas and find non-background content bounds
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(ir.width);
    canvas.height = Math.round(ir.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const corners = [
      [0, 0],
      [canvas.width - 1, 0],
      [0, canvas.height - 1],
      [canvas.width - 1, canvas.height - 1],
    ];
    let br = 0,
      bg = 0,
      bb = 0;
    for (const [x, y] of corners) {
      const i = (y * canvas.width + x) * 4;
      br += data[i];
      bg += data[i + 1];
      bb += data[i + 2];
    }
    br /= 4;
    bg /= 4;
    bb /= 4;

    let minX = canvas.width,
      maxX = 0,
      minY = canvas.height,
      maxY = 0;
    const threshold = 28;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const dr = data[i] - br;
        const dg = data[i + 1] - bg;
        const db = data[i + 2] - bb;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        if (dist > threshold) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }

    const contentW = maxX - minX + 1;
    const contentCx = minX + contentW / 2;
    const containerCx = canvas.width / 2;

    return {
      src: img.currentSrc,
      natural: { w: img.naturalWidth, h: img.naturalHeight },
      frame: { w: fr.width, h: fr.height, x: fr.x, y: fr.y },
      imgBox: { w: ir.width, h: ir.height, x: ir.x, y: ir.y },
      objectFit: cs.objectFit,
      objectPosition: cs.objectPosition,
      transform: cs.transform,
      width: cs.width,
      height: cs.height,
      renderedContent: {
        minX,
        maxX,
        minY,
        maxY,
        width: contentW,
        height: maxY - minY + 1,
        marginLeft: minX,
        marginRight: canvas.width - maxX - 1,
        offsetFromCenter: contentCx - containerCx,
        absLeft: ir.x + minX,
        absTop: ir.y + minY,
      },
    };
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/contractors-insurance/`, { waitUntil: "networkidle2" });
  await page.evaluate(() =>
    document.querySelector(".pilot-product-explorer-stage")?.scrollIntoView({ block: "center" }),
  );
  await new Promise((r) => setTimeout(r, 800));

  const tabs = await page.$$(".pilot-product-coverage-card");
  const names = ["01-general", "02-tools", "03-builders", "04-wrap-up"];
  const results = [];

  for (let i = 0; i < 4; i++) {
    if (i > 0) {
      await tabs[i].click();
      await new Promise((r) => setTimeout(r, 1800));
    }
    const m = await measurePaintedContent(page);
    results.push({ step: names[i], ...m });
    const frame = await page.$(".pilot-ce-stage-frame--contractors-insurance");
    if (frame) await frame.screenshot({ path: path.join(OUT, `${names[i]}.png`) });
  }

  await browser.close();

  const ref = results[0].renderedContent;
  console.log("=== Rendered content centering (1440px) ===\n");
  for (const r of results) {
    const c = r.renderedContent;
    console.log(`${r.step}:`);
    console.log(`  src: ${r.src?.split("/").pop()}`);
    console.log(`  imgBox: ${r.imgBox.w.toFixed(1)}×${r.imgBox.h.toFixed(1)}`);
    console.log(`  content margins L/R: ${c.marginLeft}/${c.marginRight}`);
    console.log(`  content offsetFromCenter: ${c.offsetFromCenter.toFixed(2)}px`);
    console.log(`  vs General: dCenter=${(c.offsetFromCenter - ref.offsetFromCenter).toFixed(2)} dMarginL=${c.marginLeft - ref.marginLeft} dMarginR=${c.marginRight - ref.marginRight}`);
    console.log("");
  }

  fs.writeFileSync(path.join(OUT, "rendered-centering-report.json"), JSON.stringify(results, null, 2));

  const tools = results[1].renderedContent;
  const dCenter = tools.offsetFromCenter - ref.offsetFromCenter;
  if (Math.abs(dCenter) > 2 || Math.abs(tools.marginLeft - ref.marginLeft) > 3) {
    console.log("RENDERING MISMATCH detected for Tools vs General");
    process.exitCode = 1;
  } else {
    console.log("Rendered content centering consistent across states.");
  }
  console.log(`Screenshots: ${OUT}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
