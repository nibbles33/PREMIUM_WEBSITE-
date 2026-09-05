#!/usr/bin/env node
/** Verify Contractors state images use full contain geometry (no crop). */
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3012";
const ROUTE = "/contractors-insurance/";
const SOURCE_ASPECT = 1672 / 941;

async function measureContain(page) {
  return page.evaluate((sourceAspect) => {
    const frame = document.querySelector(".pilot-ce-stage-frame--contractors-insurance");
    const img = document.querySelector(".pilot-ce-state-image--current");
    if (!frame || !img) return { error: "missing elements" };

    const fr = frame.getBoundingClientRect();
    const ir = img.getBoundingClientRect();
    const cs = getComputedStyle(img);

    const scale = Math.min(fr.width / 1672, fr.height / 941);
    const renderedW = 1672 * scale;
    const renderedH = 941 * scale;
    const offsetX = (fr.width - renderedW) / 2;
    const offsetY = (fr.height - renderedH) / 2;

    const paintedLeft = fr.left + offsetX;
    const paintedRight = paintedLeft + renderedW;
    const paintedTop = fr.top + offsetY;
    const paintedBottom = paintedTop + renderedH;

    const frameAspect = fr.width / fr.height;
    const imgBoxAspect = ir.width / ir.height;

    return {
      objectFit: cs.objectFit,
      clipPath: cs.clipPath,
      frame: { w: fr.width, h: fr.height, aspect: frameAspect },
      imgBox: { w: ir.width, h: ir.height, aspect: imgBoxAspect },
      expectedPainted: { w: renderedW, h: renderedH, offsetX, offsetY },
      frameMatchesSourceAspect: Math.abs(frameAspect - sourceAspect) < 0.02,
      imgUsesContain: cs.objectFit === "contain",
      noClipPath: cs.clipPath === "none",
      minHeight: getComputedStyle(frame).minHeight,
      scrollW: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      paintedInsideFrame:
        paintedLeft >= fr.left - 1 &&
        paintedRight <= fr.right + 1 &&
        paintedTop >= fr.top - 1 &&
        paintedBottom <= fr.bottom + 1,
    };
  }, SOURCE_ASPECT);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  let allOk = true;
  for (const vp of [
    { w: 1440, h: 900 },
    { w: 1280, h: 900 },
    { w: 1024, h: 768 },
    { w: 390, h: 844 },
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(`${BASE}${ROUTE}`, { waitUntil: "networkidle2", timeout: 60000 });

    const tabs = await page.$$(".pilot-product-coverage-card");
    for (let i = 0; i < tabs.length; i++) {
      await tabs[i].click();
      await new Promise((r) => setTimeout(r, 2000));
      const m = await measureContain(page);
      const errors = [];
      if (m.error) errors.push(m.error);
      if (!m.imgUsesContain) errors.push("not-contain");
      if (!m.noClipPath) errors.push(`clip-path:${m.clipPath}`);
      if (!m.frameMatchesSourceAspect) errors.push(`frame-aspect:${m.frame.aspect}`);
      if (!m.paintedInsideFrame) errors.push("painted-outside-frame");
      if (m.scrollW > m.viewport + 1) errors.push(`overflow:${m.scrollW}`);
      console.log(`VP ${vp.w} tab ${i}:`, errors.length ? "FAIL" : "OK", errors, m);
      if (errors.length) allOk = false;
    }
    await page.close();
  }

  await browser.close();
  process.exit(allOk ? 0 : 1);
}

main();
