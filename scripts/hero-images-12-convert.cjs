#!/usr/bin/env node
/**
 * Convert 7 hero PNG sources to WebP — matches hero-images-19 pipeline:
 * native 1672×941, quality 85, no upscaling.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const INBOX = path.join(__dirname, "../assets-source/website-photography/_inbox");
const OUT = path.join(__dirname, "../public/images/photography/commercial");

const CONVERSIONS = [
  {
    source: "ChatGPT Image Sep 1, 2026, 09_43_53 PM (35).png",
    dest: "executive-leadership.webp",
    concept: "Executive boardroom / leadership (D&O + EPLI shared)",
  },
  {
    source: "ChatGPT Image Sep 1, 2026, 09_43_49 PM (25).png",
    dest: "cyber-insurance.webp",
    concept: "Cybersecurity / modern business technology",
  },
  {
    source: "ChatGPT Image Sep 1, 2026, 09_44_01 PM (54).png",
    dest: "small-business-insurance.webp",
    concept: "Professional consultation / advisory office",
  },
  {
    source: "ChatGPT Image Sep 1, 2026, 09_43_55 PM (39).png",
    dest: "non-profit-insurance.webp",
    concept: "Community / volunteer organization",
  },
  {
    source: "ChatGPT Image Sep 1, 2026, 09_44_04 PM (58).png",
    dest: "event-venue.webp",
    concept: "Event venue setting (Event + Liquor shared)",
  },
  {
    source: "ChatGPT Image Sep 1, 2026, 09_43_57 PM (45).png",
    dest: "business-interruption-insurance.webp",
    concept: "Business disruption / paused operations",
  },
  {
    source: "ChatGPT Image Sep 1, 2026, 09_44_01 PM (55).png",
    dest: "crime-fidelity-insurance.webp",
    concept: "Financial integrity / security detail",
  },
];

const MAX_WIDTH = 1672;
const QUALITY = 85;

async function convertOne({ source, dest }) {
  const srcPath = path.join(INBOX, source);
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Missing source PNG: ${source}`);
  }

  const meta = await sharp(srcPath).metadata();
  const pipeline = sharp(srcPath).rotate();

  if (meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const outPath = path.join(OUT, dest);
  await pipeline.webp({ quality: QUALITY }).toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  return {
    source,
    dest,
    inputSize: `${meta.width}×${meta.height}`,
    outputSize: `${outMeta.width}×${outMeta.height}`,
    bytes: fs.statSync(outPath).size,
  };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const results = [];
  for (const item of CONVERSIONS) {
    results.push(await convertOne(item));
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
