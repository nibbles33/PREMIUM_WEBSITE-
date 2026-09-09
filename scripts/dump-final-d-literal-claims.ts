#!/usr/bin/env npx tsx
/**
 * QA-only: regenerate Final D literal claim dump from SOURCE product data.
 * Does not modify production copy — read-only extraction.
 */
import fs from "fs";
import path from "path";
import { getProductPage } from "../src/data/product-pages/index";

const OUT = path.join(
  __dirname,
  "../docs/qa-screenshots/final-d-batch-2026-09-09/literal-claim-dump.txt",
);

type Field = { path: string; value: string };

const ROUTES: Record<string, string[]> = {
  "crime-fidelity-insurance": [
    "employee dishonesty",
    "employee",
    "computer fraud",
    "social engineering",
    "fraudulent instruction",
    "funds transfer",
    "cyber",
    "client property",
    "discovery",
    "reporting",
  ],
  "directors-officers-insurance": [
    "Side A",
    "Side B",
    "Side C",
    "entity coverage",
    "defence costs",
    "claims-made",
    "reporting",
    "prior/pending",
    "insured-vs-insured",
    "M&A",
    "change in control",
    "runoff",
  ],
  "employment-practices-liability-insurance": [
    "termination",
    "severance",
    "wages",
    "discrimination",
    "harassment",
    "retaliation",
    "reprisal",
    "defence costs",
    "claims-made",
    "ESA",
    "Human Rights Code",
    "OHSA",
    "fines/penalties",
  ],
  "product-recall-insurance": [
    "product liability",
    "recall",
    "withdrawal",
    "voluntary recall",
    "government",
    "replacement",
    "lab/testing",
    "consultant",
    "brand rehabilitation",
    "business interruption",
    "contamination",
    "tampering",
    "traceability",
  ],
};

function normalize(s: string): string {
  return s.toLowerCase().replace(/[–—]/g, "-");
}

function keywordMatches(keyword: string, text: string): boolean {
  const t = normalize(text);
  const k = normalize(keyword);

  if (keyword === "prior/pending") {
    return /\bprior\b/.test(t) || /\bpending\b/.test(t);
  }
  if (keyword === "insured-vs-insured") {
    return (
      t.includes("insured-versus-insured") ||
      t.includes("insured versus insured") ||
      t.includes("insured-vs-insured") ||
      t.includes("insured vs insured")
    );
  }
  if (keyword === "M&A") {
    return (
      t.includes("m&a") ||
      t.includes("merger") ||
      t.includes("ownership change") ||
      t.includes("change-in-control") ||
      t.includes("change in control")
    );
  }
  if (keyword === "ESA") {
    return t.includes("employment standards act") || /\besa\b/.test(t);
  }
  if (keyword === "OHSA") {
    return t.includes("ohsa") || t.includes("occupational health and safety");
  }
  if (keyword === "Human Rights Code") {
    return t.includes("human rights code");
  }
  if (keyword === "fines/penalties") {
    return t.includes("fine") || t.includes("penalty") || t.includes("penalties");
  }
  if (keyword === "lab/testing") {
    return (
      t.includes("lab") ||
      t.includes("laboratory") ||
      t.includes("testing")
    );
  }
  if (keyword === "fraudulent instruction") {
    return (
      t.includes("fraudulent-instruction") ||
      t.includes("fraudulent instruction")
    );
  }
  if (keyword === "funds transfer") {
    return t.includes("funds-transfer") || t.includes("funds transfer");
  }
  if (keyword === "social engineering") {
    return t.includes("social-engineering") || t.includes("social engineering");
  }
  if (keyword === "computer fraud") {
    return t.includes("computer fraud") || t.includes("computer-fraud");
  }
  if (keyword === "employee dishonesty") {
    return t.includes("employee dishonesty") || t.includes("employee-dishonesty");
  }
  if (keyword === "claims-made") {
    return t.includes("claims-made") || t.includes("claims made");
  }
  if (keyword === "defence costs") {
    return t.includes("defence cost");
  }
  if (keyword === "entity coverage") {
    return (
      t.includes("entity coverage") ||
      t.includes("side c") ||
      t.includes("organization itself")
    );
  }
  if (keyword === "change in control") {
    return t.includes("change in control") || t.includes("change-in-control");
  }
  if (keyword === "voluntary recall") {
    return t.includes("voluntary") && t.includes("recall");
  }
  if (keyword === "brand rehabilitation") {
    return (
      t.includes("brand rehabilitation") ||
      t.includes("brand-restoration") ||
      t.includes("brand rehab") ||
      t.includes("brand-restoration") ||
      t.includes("brand restoration")
    );
  }
  if (keyword === "business interruption") {
    return (
      t.includes("business interruption") ||
      t.includes("lost profit") ||
      t.includes("lost profits")
    );
  }
  if (keyword === "product liability") {
    return t.includes("product liability");
  }
  if (keyword === "Side A") return t.includes("side a");
  if (keyword === "Side B") return t.includes("side b");
  if (keyword === "Side C") return t.includes("side c");

  return t.includes(k);
}

function collectFields(slug: string): Field[] {
  const page = getProductPage(slug);
  if (!page) throw new Error(`Unknown slug: ${slug}`);

  const fields: Field[] = [
    { path: "metaTitle", value: page.metaTitle },
    { path: "metaDescription", value: page.metaDescription },
    { path: "headline", value: page.headline },
    { path: "hero.subhead", value: page.subhead },
    { path: "coverageIntro", value: page.coverageIntro },
  ];

  if (page.whoItIsFor) {
    fields.push({ path: "whoItIsFor", value: page.whoItIsFor });
  }

  page.coverageTypes.forEach((card, i) => {
    const idHint = card.title;
    fields.push({
      path: `coverageTypes[${i}].title`,
      value: card.title,
    });
    if (card.shortLabel) {
      fields.push({
        path: `coverageTypes[${i}].shortLabel`,
        value: card.shortLabel,
      });
    }
    fields.push({
      path: `coverageTypes[${i}].description (RIGHT / WHAT)`,
      value: card.description,
    });
    if (card.detailTitle) {
      fields.push({
        path: `coverageTypes[${i}].detailTitle (LEFT)`,
        value: card.detailTitle,
      });
    }
    if (card.detailDescription) {
      fields.push({
        path: `coverageTypes[${i}].detailDescription (LEFT / WHY)`,
        value: card.detailDescription,
      });
    }
    // combined explorer pair for keyword search convenience — still literal
    if (card.detailTitle && card.detailDescription) {
      fields.push({
        path: `coverageTypes[${i}].explorerPair (${idHint})`,
        value: `RIGHT (description):\n${card.description}\n\nLEFT (detailTitle):\n${card.detailTitle}\n\nLEFT (detailDescription):\n${card.detailDescription}`,
      });
    }
  });

  (page.considerations || []).forEach((c, i) => {
    fields.push({
      path: `considerations[${i}].title`,
      value: c.title,
    });
    fields.push({
      path: `considerations[${i}].description`,
      value: c.description,
    });
    fields.push({
      path: `considerations[${i}].title+body`,
      value: `TITLE:\n${c.title}\n\nBODY:\n${c.description}`,
    });
  });

  page.faqItems.forEach((f, i) => {
    fields.push({
      path: `faqItems[${i}].question`,
      value: f.question,
    });
    fields.push({
      path: `faqItems[${i}].answer`,
      value: f.answer,
    });
    fields.push({
      path: `faqItems[${i}].q+a`,
      value: `Q: ${f.question}\nA: ${f.answer}`,
    });
  });

  fields.push({ path: "ctaHeading", value: page.ctaHeading });
  fields.push({ path: "ctaSubhead", value: page.ctaSubhead });
  fields.push({ path: "serviceName", value: page.serviceName });

  return fields;
}

function preferFieldsForKeyword(keyword: string, matches: Field[]): Field[] {
  // Prefer complete FAQ q+a and consideration title+body over fragments when both match
  const preferred: Field[] = [];
  const seenFaq = new Set<number>();
  const seenCons = new Set<number>();

  for (const m of matches) {
    const faqQa = m.path.match(/^faqItems\[(\d+)\]\.q\+a$/);
    const consCombo = m.path.match(/^considerations\[(\d+)\]\.title\+body$/);
    const explorerPair = m.path.match(/^coverageTypes\[(\d+)\]\.explorerPair/);

    if (faqQa) {
      seenFaq.add(Number(faqQa[1]));
      preferred.push(m);
      continue;
    }
    if (consCombo) {
      seenCons.add(Number(consCombo[1]));
      preferred.push(m);
      continue;
    }
    if (explorerPair) {
      preferred.push(m);
      continue;
    }
  }

  for (const m of matches) {
    const faqQ = m.path.match(/^faqItems\[(\d+)\]\.question$/);
    const faqA = m.path.match(/^faqItems\[(\d+)\]\.answer$/);
    const consT = m.path.match(/^considerations\[(\d+)\]\.title$/);
    const consD = m.path.match(/^considerations\[(\d+)\]\.description$/);
    const cardDesc = m.path.match(/^coverageTypes\[(\d+)\]\.description/);
    const cardLeftT = m.path.match(/^coverageTypes\[(\d+)\]\.detailTitle/);
    const cardLeftD = m.path.match(/^coverageTypes\[(\d+)\]\.detailDescription/);

    if (faqQ || faqA) {
      const idx = Number((faqQ || faqA)![1]);
      if (seenFaq.has(idx)) continue;
      // If only Q or A matched individually, still emit full q+a from sibling if available
      continue;
    }
    if (consT || consD) {
      const idx = Number((consT || consD)![1]);
      if (seenCons.has(idx)) continue;
      continue;
    }
    if (cardDesc || cardLeftT || cardLeftD) {
      // covered by explorerPair if present
      const hasPair = preferred.some((p) =>
        p.path.startsWith(`coverageTypes[${(cardDesc || cardLeftT || cardLeftD)![1]}].explorerPair`),
      );
      if (hasPair) continue;
    }
    if (
      m.path.includes(".q+a") ||
      m.path.includes("title+body") ||
      m.path.includes("explorerPair")
    ) {
      continue;
    }
    preferred.push(m);
  }

  // Ensure any FAQ that matched via question/answer alone still emits full Q+A
  for (const m of matches) {
    const faqQ = m.path.match(/^faqItems\[(\d+)\]\.question$/);
    const faqA = m.path.match(/^faqItems\[(\d+)\]\.answer$/);
    if (!faqQ && !faqA) continue;
    const idx = Number((faqQ || faqA)![1]);
    if (seenFaq.has(idx)) continue;
    const full = matches.find((x) => x.path === `faqItems[${idx}].q+a`);
    if (full) {
      preferred.push(full);
      seenFaq.add(idx);
    }
  }

  // Ensure considerations matched via title/description alone emit title+body
  for (const m of matches) {
    const consT = m.path.match(/^considerations\[(\d+)\]\.title$/);
    const consD = m.path.match(/^considerations\[(\d+)\]\.description$/);
    if (!consT && !consD) continue;
    const idx = Number((consT || consD)![1]);
    if (seenCons.has(idx)) continue;
    const full = matches.find((x) => x.path === `considerations[${idx}].title+body`);
    if (full) {
      preferred.push(full);
      seenCons.add(idx);
    }
  }

  // Deduplicate by path
  const out: Field[] = [];
  const seen = new Set<string>();
  for (const p of preferred) {
    if (seen.has(p.path)) continue;
    seen.add(p.path);
    out.push(p);
  }
  return out;
}

function main() {
  let out = `FINAL D BATCH — LITERAL CLAIM DUMP (SOURCE DATA)
Date: 2026-09-09
Branch: cursor/coverage-explorer-ux-v2-2026-09-07
Implementation commit: 88dbea7
Extraction: SOURCE product-page data (getProductPage) — not DOM scrape
NOTE: Values are complete current source strings. Do NOT paraphrase.
FAQ entries always include both Q: and A: from source.
Considerations emit TITLE: and BODY: on separate lines.

`;

  let faqIncomplete = 0;
  let faqChecked = 0;
  let consBadFormat = 0;
  let consChecked = 0;

  for (const [slug, keywords] of Object.entries(ROUTES)) {
    const fields = collectFields(slug);
    out += `\n======== ROUTE: /${slug}/ ========\n\n`;

    for (const keyword of keywords) {
      const matches = fields.filter((f) => keywordMatches(keyword, f.value));
      const preferred = preferFieldsForKeyword(keyword, matches);

      out += `ROUTE: /${slug}/\n`;
      out += `KEYWORD: ${keyword}\n`;

      if (!preferred.length) {
        out += `FIELD PATH: (no source match found)\n`;
        out += `COMPLETE CURRENT VALUE: (none)\n\n`;
        out += `---\n`;
        continue;
      }

      for (const m of preferred) {
        out += `FIELD PATH: ${m.path}\n`;
        out += `COMPLETE CURRENT VALUE:\n${m.value}\n\n`;

        if (m.path.endsWith(".q+a")) {
          faqChecked++;
          if (!/^Q: .+\nA: .+/s.test(m.value) || /\nA:\s*$/m.test(m.value)) {
            faqIncomplete++;
          }
        }
        if (m.path.endsWith("title+body")) {
          consChecked++;
          if (!m.value.startsWith("TITLE:\n") || !m.value.includes("\n\nBODY:\n")) {
            consBadFormat++;
          }
        }
      }
      out += `---\n`;
    }
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out);

  console.log(
    JSON.stringify(
      {
        out: OUT,
        chars: out.length,
        faqChecked,
        faqIncomplete,
        faqAnswersComplete: faqIncomplete === 0 && faqChecked > 0,
        consChecked,
        consBadFormat,
        considerationsSeparated: consBadFormat === 0 && consChecked > 0,
      },
      null,
      2,
    ),
  );
}

main();
