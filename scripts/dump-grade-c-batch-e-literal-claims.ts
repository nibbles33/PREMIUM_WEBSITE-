#!/usr/bin/env npx tsx
/**
 * QA-only: Grade C Batch E literal claim dump from SOURCE product data.
 * Does not modify production copy.
 */
import fs from "fs";
import path from "path";
import { getPilotCommercialConfig } from "../src/data/pilot-commercial-registry";
import {
  commercialHubCategories,
  commercialIndustryTiles,
} from "../src/data/commercial-industries";

const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/grade-c-batch-e-2026-09-09/literal-claim-dump.txt",
);

const SLUGS = ["manufacturing-insurance", "commercial-insurance"] as const;

function emitBlock(label: string, value: string | undefined | null): string {
  if (value == null || value === "") {
    return `${label}:\n(empty)\n\n`;
  }
  return `${label}:\n${value}\n\n`;
}

function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function dumpRoute(slug: string): {
  text: string;
  faqCount: number;
  considerationCount: number;
  explorerCount: number;
  blankFields: string[];
  sectionWords: Record<string, number>;
} {
  const config = getPilotCommercialConfig(slug);
  const blankFields: string[] = [];
  const sectionWords: Record<string, number> = {};
  let out = `======== ROUTE: /${slug}/ ========\n\n`;
  out += `layout: ${config.layout ?? "standard"}\n\n`;

  const noteBlank = (label: string, value: string | undefined | null) => {
    if (value == null || value === "") blankFields.push(`${slug}:${label}`);
  };

  noteBlank("metaTitle", config.metaTitle);
  noteBlank("metaDescription", config.metaDescription);
  noteBlank("headline", config.headline);
  noteBlank("heroLead", config.heroLead);

  out += emitBlock("metaTitle (page title)", config.metaTitle);
  out += emitBlock("metaDescription", config.metaDescription);
  out += emitBlock("eyebrow", config.eyebrow);
  out += emitBlock("headline (H1)", config.headline);
  out += emitBlock("heroLead (hero subhead)", config.heroLead);
  if (config.heroSupporting) {
    out += emitBlock("heroSupporting", config.heroSupporting);
  }
  out += emitBlock(
    "trustStatement (whoItIsFor / trust band)",
    config.trustStatement,
  );
  out += emitBlock("coverageHeading", config.coverageHeading);
  out += emitBlock("coverageIntro", config.coverageIntro);

  sectionWords.hero = wordCount(
    [config.headline, config.heroLead, config.heroSupporting]
      .filter(Boolean)
      .join(" "),
  );
  sectionWords.trust = wordCount(config.trustStatement ?? "");
  sectionWords.coverageIntro = wordCount(config.coverageIntro ?? "");

  config.coverageItems.forEach((item, i) => {
    out += `--- Coverage / Explorer / Hub category [${i}] ---\n`;
    out += emitBlock("id", item.id);
    out += emitBlock("title", item.title);
    out += emitBlock("shortLabel", item.shortLabel);
    out += emitBlock("description (RIGHT / WHAT or hub card)", item.description);
    out += emitBlock(
      "detailTitle (LEFT)",
      item.detailTitle ?? "(none — hub cards may omit)",
    );
    out += emitBlock(
      "detailDescription (LEFT / WHY)",
      item.detailDescription ?? item.detail ?? "(none)",
    );
    if (item.href) out += emitBlock("href (hub category link)", item.href);
    out += emitBlock("visualCaption", item.visualCaption);
    out += emitBlock("visualSubcaption", item.visualSubcaption);
    sectionWords[`coverage_${item.id}`] = wordCount(
      [
        item.title,
        item.description,
        item.detailTitle,
        item.detailDescription ?? item.detail,
      ]
        .filter(Boolean)
        .join(" "),
    );
  });

  (config.considerations ?? []).forEach((c, i) => {
    out += `--- Consideration [${i}] ---\n`;
    out += emitBlock("title", c.title);
    out += emitBlock("description (complete body)", c.description);
    out += `TITLE+BODY COMBINED:\nTITLE:\n${c.title}\n\nBODY:\n${c.description}\n\n`;
    sectionWords[`consideration_${i}`] = wordCount(
      `${c.title} ${c.description}`,
    );
  });

  out += emitBlock("faqTitle", config.faqTitle);
  out += emitBlock("faqIntro", config.faqIntro);

  config.faqItems.forEach((f, i) => {
    out += `--- FAQ [${i}] ---\n`;
    out += emitBlock("question", f.question);
    out += emitBlock("answer (complete)", f.answer);
    out += `Q+A COMBINED:\nQ: ${f.question}\nA: ${f.answer}\n\n`;
    if (!f.answer?.trim()) blankFields.push(`${slug}:faq[${i}].answer`);
    sectionWords[`faq_${i}`] = wordCount(`${f.question} ${f.answer}`);
  });

  if (config.relatedProducts.length) {
    out += `--- Related products / specialty links ---\n`;
    out += emitBlock("relatedHeading", config.relatedHeading);
    out += emitBlock("relatedIntro", config.relatedIntro);
    config.relatedProducts.forEach((r, i) => {
      out += `[${i}] label: ${r.label}\n    href: ${r.href}\n`;
    });
    out += `\n`;
    sectionWords.related = wordCount(
      [
        config.relatedHeading,
        config.relatedIntro,
        ...config.relatedProducts.map((r) => r.label),
      ]
        .filter(Boolean)
        .join(" "),
    );
  }

  if (config.brokerSteps?.length) {
    out += `--- Broker steps ---\n`;
    config.brokerSteps.forEach((s, i) => {
      out += `[${i}] label: ${s.label}\n    detail: ${s.detail}\n`;
    });
    out += `\n`;
    sectionWords.brokerSteps = wordCount(
      config.brokerSteps.map((s) => `${s.label} ${s.detail}`).join(" "),
    );
  }

  out += emitBlock("ctaEyebrow", config.ctaEyebrow);
  out += emitBlock("ctaHeading", config.ctaHeading);
  out += emitBlock("ctaSubhead", config.ctaSubhead);
  out += emitBlock("ctaQuoteLabel", config.ctaQuoteLabel);
  out += emitBlock("serviceName", config.jsonLd?.name as string | undefined);
  sectionWords.cta = wordCount(
    [config.ctaHeading, config.ctaSubhead].filter(Boolean).join(" "),
  );

  if (slug === "commercial-insurance") {
    out += `--- Industry grid tiles (from commercialIndustryTiles) ---\n`;
    commercialIndustryTiles.forEach((t, i) => {
      out += `[${i}] label: ${t.label}\n    href: ${t.href}\n`;
    });
    out += `\n--- Hub category source count ---\n`;
    out += `commercialHubCategories.length: ${commercialHubCategories.length}\n\n`;
    sectionWords.industryTileLabels = wordCount(
      commercialIndustryTiles.map((t) => t.label).join(" "),
    );
  }

  return {
    text: out,
    faqCount: config.faqItems.length,
    considerationCount: config.considerations?.length ?? 0,
    explorerCount:
      config.layout === "commercial-hub" ? 0 : config.coverageItems.length,
    blankFields,
    sectionWords,
  };
}

function main() {
  let out = `GRADE C BATCH E — LITERAL CLAIM DUMP (SOURCE DATA)
Date: 2026-09-10
Branch: cursor/coverage-explorer-ux-v2-2026-09-07
Implementation commit: 086e7c7
Research commit: f689575
Extraction: getPilotCommercialConfig() — resolved source data, not DOM scrape
NOTE: Values are complete current source strings. Do NOT paraphrase.
FAQ entries include full Q and A. Considerations include full title and body.

`;

  let totalChars = 0;
  const blanks: string[] = [];
  const stats: Record<string, unknown> = {};

  for (const slug of SLUGS) {
    const dumped = dumpRoute(slug);
    out += dumped.text;
    totalChars += dumped.text.length;
    blanks.push(...dumped.blankFields);
    const categoryOrExplorer =
      slug === "commercial-insurance"
        ? getPilotCommercialConfig(slug).coverageItems.length
        : dumped.explorerCount;
    stats[slug] = {
      faqCount: dumped.faqCount,
      considerationCount: dumped.considerationCount,
      explorerOrCategoryCount: categoryOrExplorer,
      sectionWords: dumped.sectionWords,
      sectionWordSum: Object.values(dumped.sectionWords).reduce(
        (a, b) => a + b,
        0,
      ),
    };
  }

  out += `\n======== DUMP STATS ========\n`;
  out += `CHAR COUNT (body dump text): ${totalChars}\n`;
  out += `ROUTES: ${SLUGS.length}\n`;
  out += `MANUFACTURING FAQ COUNT: ${(stats["manufacturing-insurance"] as { faqCount: number }).faqCount}\n`;
  out += `MANUFACTURING CONSIDERATION COUNT: ${(stats["manufacturing-insurance"] as { considerationCount: number }).considerationCount}\n`;
  out += `MANUFACTURING EXPLORER STATE COUNT: ${(stats["manufacturing-insurance"] as { explorerOrCategoryCount: number }).explorerOrCategoryCount}\n`;
  out += `HUB CATEGORY COUNT: ${commercialHubCategories.length}\n`;
  out += `HUB CONSIDERATION COUNT: ${(stats["commercial-insurance"] as { considerationCount: number }).considerationCount}\n`;
  out += `HUB SPECIALTY LINK COUNT: ${getPilotCommercialConfig("commercial-insurance").relatedProducts.length}\n`;
  out += `HUB INDUSTRY TILE COUNT: ${commercialIndustryTiles.length}\n`;
  out += `TRUNCATION: NO (full source strings)\n`;
  out += `BLANK CONTENT: ${blanks.length === 0 ? "NONE" : blanks.join("; ")}\n`;
  out += `\nSECTION WORD BREAKDOWN (JSON):\n${JSON.stringify(stats, null, 2)}\n`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, "utf8");
  console.log(
    JSON.stringify({ out: OUT, charCount: totalChars, blanks, stats }, null, 2),
  );
}

main();
