#!/usr/bin/env npx tsx
/**
 * QA-only: Cannabis Phase 3 literal claim dump from resolved visitor-facing source data.
 * Does not modify production copy.
 */
import fs from "fs";
import path from "path";
import { getPilotCommercialConfig } from "../src/data/pilot-commercial-registry";
import { cannabisIndustryPages } from "../src/data/cannabis-industries";
import { getPageHeroPhotography } from "../src/data/photography";

const OUT = path.join(
  __dirname,
  "../docs/cannabis-literal-factual-dump-2026-09-09.txt",
);

const SLUGS = [
  "cannabis-retail-insurance",
  "cannabis-producer-insurance",
] as const;

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
  const source = cannabisIndustryPages.find((p) => p.slug === slug);
  const photo = getPageHeroPhotography(slug);
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
  out += emitBlock("eyebrow (config)", config.eyebrow);
  out += emitBlock(
    "eyebrow (composed visitor text: eyebrow · Windsor-Essex)",
    `${config.eyebrow} · Windsor-Essex`,
  );
  out += emitBlock("headline (H1)", config.headline);
  out += emitBlock("heroLead (hero description)", config.heroLead);
  out += emitBlock("heroSupporting", config.heroSupporting);
  out += emitBlock("quoteLabel (hero CTA)", config.quoteLabel);
  out += emitBlock(
    "secondaryCta / talk-to-a-broker label",
    config.secondaryCta?.label ?? "Talk to a Broker",
  );
  out += emitBlock(
    "trustStatement (whoItIsFor / trust band — visitor-facing)",
    config.trustStatement,
  );
  out += emitBlock(
    "source whoItIsFor (industry data; unused on page when trustStatement override exists)",
    source?.whoItIsFor,
  );
  out += emitBlock("coverageHeading", config.coverageHeading);
  out += emitBlock("coverageIntro (introductory copy)", config.coverageIntro);
  out += emitBlock("coverageExplorerLabel", config.coverageExplorerLabel);

  sectionWords.hero = wordCount(
    [config.headline, config.heroLead, config.heroSupporting]
      .filter(Boolean)
      .join(" "),
  );
  sectionWords.trust = wordCount(config.trustStatement ?? "");
  sectionWords.coverageIntro = wordCount(config.coverageIntro ?? "");

  config.coverageItems.forEach((item, i) => {
    out += `--- Coverage / Explorer [${i}] ---\n`;
    out += emitBlock("id", item.id);
    out += emitBlock("title", item.title);
    out += emitBlock("shortLabel", item.shortLabel);
    out += emitBlock("description (RIGHT / WHAT)", item.description);
    out += emitBlock("detailTitle (LEFT V2)", item.detailTitle);
    out += emitBlock("detailDescription (LEFT V2 / WHY)", item.detailDescription);
    out += emitBlock("visualEyebrow", item.visualEyebrow);
    out += emitBlock("visualCaption", item.visualCaption);
    out += emitBlock("visualSubcaption", item.visualSubcaption);
    sectionWords[`coverage_${item.id}`] = wordCount(
      [
        item.title,
        item.description,
        item.detailTitle,
        item.detailDescription,
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

  if (config.brokerSteps?.length) {
    out += `--- Broker / process steps ---\n`;
    config.brokerSteps.forEach((s, i) => {
      out += `[${i}] label: ${s.label}\n    detail: ${s.detail}\n`;
    });
    out += `\n`;
    sectionWords.brokerSteps = wordCount(
      config.brokerSteps.map((s) => `${s.label} ${s.detail}`).join(" "),
    );
  }

  out += emitBlock("relatedHeading", config.relatedHeading);
  out += emitBlock("relatedIntro", config.relatedIntro);
  out += `--- Related products ---\n`;
  config.relatedProducts.forEach((r, i) => {
    out += `[${i}] label: ${r.label}\n    href: ${r.href}\n`;
  });
  out += `\n`;

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

  out += emitBlock("ctaEyebrow", config.ctaEyebrow);
  out += emitBlock("ctaHeading", config.ctaHeading);
  out += emitBlock("ctaSubhead (CTA body)", config.ctaSubhead);
  out += emitBlock("ctaQuoteLabel", config.ctaQuoteLabel);
  out += emitBlock("serviceName", config.jsonLd?.name as string | undefined);

  out += `--- Structured data (jsonLd, generated from route content) ---\n`;
  out += `${JSON.stringify(config.jsonLd, null, 2)}\n\n`;

  out += `--- Photography / accessible image text ---\n`;
  out += emitBlock("hero photography src", photo?.src);
  out += emitBlock("hero photography alt (visitor-facing)", photo?.alt);
  out += emitBlock(
    "hero photography temporaryNote (source documentation; not displayed as body copy)",
    photo?.temporaryNote,
  );
  out += emitBlock(
    "hero photography isTemporary",
    photo?.isTemporary ? "true" : "false",
  );

  sectionWords.cta = wordCount(
    [config.ctaHeading, config.ctaSubhead].filter(Boolean).join(" "),
  );

  return {
    text: out,
    faqCount: config.faqItems.length,
    considerationCount: config.considerations?.length ?? 0,
    explorerCount: config.coverageItems.length,
    blankFields,
    sectionWords,
  };
}

function main() {
  let out = `CANNABIS INSURANCE — LITERAL FACTUAL DUMP (RESOLVED VISITOR-FACING SOURCE)
Date: 2026-09-10
Branch: cursor/coverage-explorer-ux-v2-2026-09-07
Implementation commit: 382b6d9
Research commit: 5b1b3d2
Phase 3 precision fixes applied before freeze dump (see factual-gate report §P).
Extraction: getPilotCommercialConfig() + photography placements + cannabisIndustryPages whoItIsFor
NOTE: Values are complete current source strings. Do NOT paraphrase.
FAQ entries include full Q and A. Considerations include full title and body.
Hero eyebrow is dumped both as config and as composed visitor text ("eyebrow · Windsor-Essex").

`;

  let totalChars = 0;
  const blanks: string[] = [];
  const stats: Record<string, unknown> = {};

  for (const slug of SLUGS) {
    const dumped = dumpRoute(slug);
    out += dumped.text;
    totalChars += dumped.text.length;
    blanks.push(...dumped.blankFields);
    stats[slug] = {
      faqCount: dumped.faqCount,
      considerationCount: dumped.considerationCount,
      explorerCount: dumped.explorerCount,
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
  out += `RETAIL FAQ COUNT: ${(stats["cannabis-retail-insurance"] as { faqCount: number }).faqCount}\n`;
  out += `RETAIL CONSIDERATION COUNT: ${(stats["cannabis-retail-insurance"] as { considerationCount: number }).considerationCount}\n`;
  out += `RETAIL EXPLORER STATE COUNT: ${(stats["cannabis-retail-insurance"] as { explorerCount: number }).explorerCount}\n`;
  out += `PRODUCER FAQ COUNT: ${(stats["cannabis-producer-insurance"] as { faqCount: number }).faqCount}\n`;
  out += `PRODUCER CONSIDERATION COUNT: ${(stats["cannabis-producer-insurance"] as { considerationCount: number }).considerationCount}\n`;
  out += `PRODUCER EXPLORER STATE COUNT: ${(stats["cannabis-producer-insurance"] as { explorerCount: number }).explorerCount}\n`;
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
