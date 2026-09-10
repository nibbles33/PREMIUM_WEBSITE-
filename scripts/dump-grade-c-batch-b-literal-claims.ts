#!/usr/bin/env npx tsx
/**
 * QA-only: Grade C Batch B literal claim dump from SOURCE product data.
 * Reads resolved pilot commercial config (same strings rendered on live pages).
 * Does not modify production copy.
 */
import fs from "fs";
import path from "path";
import { getPilotCommercialConfig } from "../src/data/pilot-commercial-registry";

const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/grade-c-batch-b-property-income-2026-09-09/literal-claim-dump.txt",
);

const SLUGS = [
  "commercial-property-insurance",
  "business-interruption-insurance",
  "small-business-insurance",
  "condominium-corporation-insurance",
] as const;

function emitBlock(label: string, value: string | undefined | null): string {
  if (value == null || value === "") {
    return `${label}:\n(empty)\n\n`;
  }
  return `${label}:\n${value}\n\n`;
}

function dumpRoute(slug: string): string {
  const config = getPilotCommercialConfig(slug);
  let out = `======== ROUTE: /${slug}/ ========\n\n`;

  out += emitBlock("metaTitle (page title)", config.metaTitle);
  out += emitBlock("metaDescription", config.metaDescription);
  out += emitBlock("eyebrow", config.eyebrow);
  out += emitBlock("headline (H1)", config.headline);
  out += emitBlock("heroLead (hero subhead)", config.heroLead);
  if (config.heroSupporting) {
    out += emitBlock("heroSupporting", config.heroSupporting);
  }
  out += emitBlock("trustStatement (trust band)", config.trustStatement);
  out += emitBlock("coverageHeading", config.coverageHeading);
  out += emitBlock("coverageIntro", config.coverageIntro);

  config.coverageItems.forEach((item, i) => {
    out += `--- Explorer state [${i}] ---\n`;
    out += emitBlock("id", item.id);
    out += emitBlock("title", item.title);
    out += emitBlock("shortLabel", item.shortLabel);
    out += emitBlock("description (RIGHT / WHAT)", item.description);
    out += emitBlock("detailTitle (LEFT)", item.detailTitle ?? item.title);
    out += emitBlock(
      "detailDescription (LEFT / WHY)",
      item.detailDescription ?? item.detail,
    );
    out += emitBlock("visualCaption", item.visualCaption);
    out += emitBlock("visualSubcaption", item.visualSubcaption);
  });

  (config.considerations ?? []).forEach((c, i) => {
    out += `--- Consideration [${i}] ---\n`;
    out += emitBlock("title", c.title);
    out += emitBlock("description (complete body)", c.description);
    out += `TITLE+BODY COMBINED:\nTITLE:\n${c.title}\n\nBODY:\n${c.description}\n\n`;
  });

  out += emitBlock("faqTitle", config.faqTitle);
  out += emitBlock("faqIntro", config.faqIntro);

  config.faqItems.forEach((f, i) => {
    out += `--- FAQ [${i}] ---\n`;
    out += emitBlock("question", f.question);
    out += emitBlock("answer (complete)", f.answer);
    out += `Q+A COMBINED:\nQ: ${f.question}\nA: ${f.answer}\n\n`;
  });

  if (config.relatedProducts.length) {
    out += `--- Related products ---\n`;
    config.relatedProducts.forEach((r, i) => {
      out += `[${i}] label: ${r.label}\n    href: ${r.href}\n`;
    });
    out += `\n`;
  }
  out += emitBlock("relatedIntro", config.relatedIntro);

  if (config.brokerSteps?.length) {
    out += `--- Broker steps ---\n`;
    config.brokerSteps.forEach((s, i) => {
      out += `[${i}] label: ${s.label}\n    detail: ${s.detail}\n`;
    });
    out += `\n`;
  }

  out += emitBlock("ctaEyebrow", config.ctaEyebrow);
  out += emitBlock("ctaHeading", config.ctaHeading);
  out += emitBlock("ctaSubhead", config.ctaSubhead);
  out += emitBlock("ctaQuoteLabel", config.ctaQuoteLabel);
  out += emitBlock("serviceName", config.jsonLd?.name as string | undefined);

  return out;
}

function main() {
  let out = `GRADE C BATCH B — LITERAL CLAIM DUMP (SOURCE DATA)
Date: 2026-09-09
Branch: cursor/coverage-explorer-ux-v2-2026-09-07
Implementation commit: 3b6366e
Research commit: 927f447
Extraction: getPilotCommercialConfig() — resolved source data, not DOM scrape
NOTE: Values are complete current source strings. Do NOT paraphrase.
FAQ entries include full Q and A. Considerations include full title and body.

`;

  let faqCount = 0;
  let consCount = 0;
  let explorerCount = 0;
  let blankFaqAnswers = 0;

  for (const slug of SLUGS) {
    out += dumpRoute(slug);
    const config = getPilotCommercialConfig(slug);
    faqCount += config.faqItems.length;
    consCount += (config.considerations ?? []).length;
    explorerCount += config.coverageItems.length;
    blankFaqAnswers += config.faqItems.filter(
      (f) => !f.answer || f.answer.trim() === "",
    ).length;
  }

  out += `\n======== SUMMARY ========\n`;
  out += `Routes: ${SLUGS.length}\n`;
  out += `Total FAQs: ${faqCount}\n`;
  out += `Total considerations: ${consCount}\n`;
  out += `Total Explorer states: ${explorerCount}\n`;
  out += `Blank FAQ answers: ${blankFaqAnswers}\n`;
  out += `Total characters: ${out.length}\n`;
  out += `Truncation: None\n`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out);

  console.log(
    JSON.stringify(
      {
        out: OUT,
        routes: SLUGS.length,
        faqCount,
        consCount,
        explorerCount,
        blankFaqAnswers,
        chars: out.length,
        truncation: "None",
      },
      null,
      2,
    ),
  );
}

main();
