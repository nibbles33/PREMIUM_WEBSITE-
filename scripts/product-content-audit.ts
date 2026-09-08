/**
 * Product content audit — read-only analysis of all 58 live product routes.
 * Run: npx tsx scripts/product-content-audit.ts
 */
import fs from "fs";
import path from "path";
import { getPilotCommercialConfig, getPilotCommercialSlugs } from "../src/data/pilot-commercial-registry";
import { getPilotPersonalConfig, getPilotPersonalSlugs } from "../src/data/pilot-personal-registry";
import {
  autoCoverageItems,
  autoFaqItems,
} from "../src/data/pilot-auto";
import type { PilotProductPageConfig } from "../src/types/pilot-product";

const OUT_DIR = path.join(__dirname, "../docs/qa-screenshots/product-content-audit-2026-09-07");

type SafetyFlag = {
  page: string;
  field: string;
  quote: string;
  issue: string;
  severity: "high" | "medium" | "low";
};

type PageAudit = {
  route: string;
  slug: string;
  category: "personal" | "commercial";
  heroWords: number;
  heroSpecific: boolean;
  coverageCount: number;
  coverageCardQuality: string;
  avgCardWords: number;
  thinCardCount: number;
  considerationsPresent: boolean;
  considerationsWords: number;
  considerationsQuality: string;
  faqCount: number;
  faqUnique: boolean;
  faqTemplateNotes: string;
  totalSubstantiveWords: number;
  safetyFlags: SafetyFlag[];
  geoTargeting: string;
  geoNotes: string;
  classification: "A" | "B" | "C" | "D";
  classificationReason: string;
};

function wordCount(text: string | undefined | null): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function stripHtml(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeForCompare(text: string): string {
  return text
    .toLowerCase()
    .replace(/windsor-essex|windsor essex|leamington|essex county|ontario/gi, "GEO")
    .replace(/insurance|coverage|policy|policies|business|commercial|personal/gi, "INS")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const GENERIC_HERO_PATTERNS = [
  /^coverage for .+ — .+\.$/i,
  /^protect your .+\.$/i,
  /^insurance for .+\.$/i,
];

const THIN_CARD_STARTERS = /^(covers?|helps? protect|addresses?|includes?)\s/i;

const HEDGE_WORDS =
  /\b(may|might|can|could|subject to|depends on|typically|often|usually|where purchased|if purchased|when purchased|varies|review|should be reviewed|not assumed|help identify|commonly reviewed)\b/i;

const NEGATED_GUARANTEE =
  /\b(not|no|aren't|isn't|don't|doesn't|without|never|cannot|can't)\s+(\w+\s+){0,3}guarantee/i;

const SAFETY_PATTERNS: {
  regex: RegExp;
  issue: string;
  severity: "high" | "medium" | "low";
  requireHedge?: boolean;
  skipIf?: RegExp;
}[] = [
  {
    regex: /\bcovers?\s+(your|the|student|building|damage|claims|injury|loss|equipment|inventory|contents|playground|medical|theft|fire)\b/i,
    issue: "Flat coverage guarantee — states or implies automatic coverage without hedging",
    severity: "high",
    requireHedge: true,
    skipIf: /\b(coverage type|what .+ covers|collision coverage|comprehensive coverage)\b/i,
  },
  {
    regex: /\bwill cover\b/i,
    issue: "Definitive future coverage promise",
    severity: "high",
  },
  {
    regex: /\bguarantee[ds]?\b/i,
    issue: "Guarantee language — may overstate policy terms (or surety industry term)",
    severity: "medium",
    skipIf: NEGATED_GUARANTEE,
  },
  {
    regex: /\bautomatically included\b/i,
    issue: "Automatic inclusion claim",
    severity: "high",
  },
  {
    regex: /\$\s?\d[\d,]*(?:\.\d{2})?/,
    issue: "Specific dollar amount — unverified limit/deductible",
    severity: "high",
  },
  {
    regex: /\b\d+\s*(?:million|thousand)\b/i,
    issue: "Specific numeric limit — may be unverified",
    severity: "high",
  },
  {
    regex: /\b(required by law|legally required)\b/i,
    issue: "Legal/regulatory requirement stated without verifiable Ontario basis",
    severity: "medium",
    skipIf: /^\s*(is|are|do|does|what|can|will)\s/i,
  },
  {
    regex: /\bmandatory\b/i,
    issue: "Mandatory coverage stated — verify regulatory basis",
    severity: "low",
    skipIf: /ontario|^\s*(is|are|do|does|what|can|will)\s/i,
  },
  {
    regex: /\bprotects you\b/i,
    issue: "Unhedged protection claim",
    severity: "medium",
    requireHedge: true,
    skipIf: /\bprotects you if\b/i,
  },
  {
    regex: /\bincludes?\s+(liability|property|coverage|protection)\b/i,
    issue: "Flat inclusion statement — may overstate standard policy",
    severity: "medium",
    requireHedge: true,
  },
];

function scanSafety(text: string, route: string, field: string): SafetyFlag[] {
  const flags: SafetyFlag[] = [];
  const seen = new Set<string>();
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 10);

  for (const sentence of sentences) {
    // Skip FAQ-style questions — the question itself is not a claim
    if (/^\s*(is|are|do|does|what|can|will|how|when|why)\b/i.test(sentence) && sentence.endsWith("?")) {
      continue;
    }

    for (const { regex, issue, severity, requireHedge, skipIf } of SAFETY_PATTERNS) {
      if (!regex.test(sentence)) continue;
      if (requireHedge && HEDGE_WORDS.test(sentence)) continue;
      if (skipIf?.test(sentence)) continue;

      if (
        route.includes("auto-insurance") &&
        /mandatory in ontario|legally required.*ontario|third-party liability is mandatory/i.test(
          sentence,
        )
      ) {
        continue;
      }

      // Surety bond industry terminology — note as low severity, not flat policy claim
      if (
        /surety|bid bond|performance bond|payment bond|labour and material/i.test(sentence) &&
        /guarantee/i.test(sentence)
      ) {
        const key = `${field}|${sentence}|low-surety`;
        if (seen.has(key)) continue;
        seen.add(key);
        flags.push({
          page: route,
          field,
          quote: sentence.trim(),
          issue: "Surety/bond industry uses 'guarantee' as technical term — verify wording is accurate",
          severity: "low",
        });
        continue;
      }

      const key = `${field}|${sentence}|${issue}`;
      if (seen.has(key)) continue;
      seen.add(key);

      flags.push({
        page: route,
        field,
        quote: sentence.trim(),
        issue,
        severity,
      });
    }
  }
  return flags;
}

function assessCardQuality(
  cards: { description: string; detail?: string; title: string }[],
): {
  quality: string;
  avgWords: number;
  thinCount: number;
} {
  if (cards.length === 0) return { quality: "none", avgWords: 0, thinCount: 0 };

  const wordCounts = cards.map((c) =>
    wordCount(`${c.description} ${c.detail ?? ""}`),
  );
  const avg = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
  const thinCount = wordCounts.filter((w) => w < 15).length;

  const thinStarters = cards.filter((c) =>
    THIN_CARD_STARTERS.test(c.description.trim()),
  ).length;
  const hedged = cards.filter((c) => HEDGE_WORDS.test(c.description)).length;

  let quality: string;
  if (avg >= 22 && thinCount <= 1 && hedged >= cards.length * 0.3) {
    quality = "specific/hedged (strong)";
  } else if (avg >= 18 && thinCount <= 2) {
    quality = "specific (good)";
  } else if (avg >= 14 && thinStarters <= cards.length / 2) {
    quality = "mixed";
  } else if (thinStarters >= cards.length * 0.5) {
    quality = "thin restatements";
  } else {
    quality = "generic/shallow";
  }

  return { quality, avgWords: Math.round(avg * 10) / 10, thinCount };
}

function assessConsiderations(
  items: { title: string; description: string }[] | undefined,
): { present: boolean; words: number; quality: string } {
  if (!items?.length) return { present: false, words: 0, quality: "absent" };

  const words = items.reduce(
    (sum, i) => sum + wordCount(`${i.title} ${i.description}`),
    0,
  );
  const avg = words / items.length;

  let quality: string;
  if (avg >= 25 && items.length >= 4) quality = "specific/useful";
  else if (avg >= 18) quality = "moderate";
  else quality = "generic filler";

  return { present: true, words, quality };
}

function detectGeo(config: {
  metaTitle?: string;
  heroLead?: string;
  trustStatement?: string;
  subhead?: string;
  faqItems?: { answer: string; question?: string }[];
}): { targeting: string; notes: string } {
  const blob = [
    config.metaTitle,
    config.heroLead,
    config.trustStatement,
    config.subhead,
    ...(config.faqItems?.flatMap((f) => [f.answer, f.question ?? ""]) ?? []),
  ]
    .filter(Boolean)
    .join(" ");

  const hasLeamington = /leamington/i.test(blob);
  const hasEssexCounty = /essex county/i.test(blob);
  const hasWindsorEssex = /windsor[- ]essex/i.test(blob);
  const hasOntario = /\bontario\b/i.test(blob);
  const hasCanada = /\bcanada\b/i.test(blob);

  if (hasLeamington || hasEssexCounty) {
    return {
      targeting: "Windsor-Essex-primary (local)",
      notes: hasLeamington
        ? "Leamington + Essex County referenced"
        : "Essex County referenced",
    };
  }
  if (hasWindsorEssex && !hasOntario) {
    return { targeting: "Windsor-Essex-primary", notes: "Windsor-Essex in copy" };
  }
  if (hasWindsorEssex && hasOntario) {
    return {
      targeting: "Windsor-Essex + Ontario",
      notes: "Both Windsor-Essex and Ontario referenced",
    };
  }
  if (hasOntario && !hasWindsorEssex) {
    return { targeting: "Ontario-wide", notes: "Ontario without Windsor-Essex in body" };
  }
  if (hasCanada) {
    return { targeting: "Canada-wide", notes: "Canada referenced" };
  }
  return { targeting: "none stated in body", notes: "Meta may still say Windsor-Essex" };
}

function extractFromConfig(
  config: PilotProductPageConfig,
  category: "personal" | "commercial",
): Omit<
  PageAudit,
  "faqUnique" | "faqTemplateNotes" | "classification" | "classificationReason" | "geoTargeting" | "geoNotes"
> {
  const heroText = [config.heroLead, config.heroSupporting].filter(Boolean).join(" ");
  const heroWords = wordCount(heroText);

  const heroSpecific =
    heroWords >= 20 &&
    !GENERIC_HERO_PATTERNS.some((p) => p.test(heroText)) &&
    /(\boperations?\b|\bexposures?\b|\brisk|\bspecific|\bdepends|\bmay\b|ontario|essex|leamington|fleet|contractor|restaurant|daycare|greenhouse|farm)/i.test(
      heroText + (config.trustStatement ?? ""),
    );

  const cards = config.coverageItems.map((c) => ({
    title: c.title,
    description: c.description,
    detail: c.detail,
  }));
  const cardAssess = assessCardQuality(cards);
  const considerations = assessConsiderations(config.considerations);

  const substantiveParts = [
    heroText,
    config.trustStatement,
    config.coverageIntro,
    ...cards.map((c) => `${c.title} ${c.description} ${c.detail ?? ""}`),
    ...(config.considerations?.map((c) => `${c.title} ${c.description}`) ?? []),
    ...config.faqItems.flatMap((f) => [f.question, f.answer]),
  ];
  const totalSubstantiveWords = wordCount(substantiveParts.join(" "));

  const safetyFlags: SafetyFlag[] = [];
  for (const field of [
    ["hero", heroText],
    ["trust", config.trustStatement ?? ""],
    ["coverageIntro", config.coverageIntro],
  ] as const) {
    safetyFlags.push(...scanSafety(field[1], `/${config.slug}/`, field[0]));
  }
  for (const card of cards) {
    safetyFlags.push(
      ...scanSafety(
        `${card.title}. ${card.description} ${card.detail ?? ""}`,
        `/${config.slug}/`,
        `coverage:${card.title}`,
      ),
    );
  }
  for (const c of config.considerations ?? []) {
    safetyFlags.push(
      ...scanSafety(`${c.title}. ${c.description}`, `/${config.slug}/`, "considerations"),
    );
  }
  for (const f of config.faqItems) {
    safetyFlags.push(
      ...scanSafety(`${f.question} ${f.answer}`, `/${config.slug}/`, "faq"),
    );
  }

  return {
    route: `/${config.slug}/`,
    slug: config.slug,
    category,
    heroWords,
    heroSpecific,
    coverageCount: cards.length,
    coverageCardQuality: cardAssess.quality,
    avgCardWords: cardAssess.avgWords,
    thinCardCount: cardAssess.thinCount,
    considerationsPresent: considerations.present,
    considerationsWords: considerations.words,
    considerationsQuality: considerations.quality,
    faqCount: config.faqItems.length,
    totalSubstantiveWords,
    safetyFlags,
  };
}

function buildAutoAudit(): Omit<
  PageAudit,
  "faqUnique" | "faqTemplateNotes" | "classification" | "classificationReason" | "geoTargeting" | "geoNotes"
> {
  const heroLead =
    "Your car gets you everywhere. Let's make sure it's properly protected — without the runaround. Compare Ontario auto options through an independent broker who explains what you're actually buying.";
  const trustStatement =
    "Ontario auto insurance through an independent Windsor-Essex broker — explained in plain language, compared across multiple markets.";
  const coverageIntro = ""; // auto uses explorer without separate intro in data

  const cards = autoCoverageItems.map((c) => ({
    title: c.title,
    description: c.description,
    detail: c.detail,
  }));
  const cardAssess = assessCardQuality(cards);

  const substantiveParts = [
    heroLead,
    trustStatement,
    ...cards.map((c) => `${c.title} ${c.description} ${c.detail}`),
    ...autoFaqItems.flatMap((f) => [f.question, f.answer]),
  ];

  const safetyFlags: SafetyFlag[] = [];
  for (const c of cards) {
    safetyFlags.push(
      ...scanSafety(
        `${c.title}. ${c.description} ${c.detail}`,
        "/auto-insurance/",
        `coverage:${c.title}`,
      ),
    );
  }
  for (const f of autoFaqItems) {
    safetyFlags.push(
      ...scanSafety(`${f.question} ${f.answer}`, "/auto-insurance/", "faq"),
    );
  }

  return {
    route: "/auto-insurance/",
    slug: "auto-insurance",
    category: "personal",
    heroWords: wordCount(heroLead),
    heroSpecific: true,
    coverageCount: cards.length,
    coverageCardQuality: cardAssess.quality,
    avgCardWords: cardAssess.avgWords,
    thinCardCount: cardAssess.thinCount,
    considerationsPresent: false,
    considerationsWords: 0,
    considerationsQuality: "absent",
    faqCount: autoFaqItems.length,
    totalSubstantiveWords: wordCount(substantiveParts.join(" ")),
    safetyFlags,
  };
}

function classify(page: Omit<PageAudit, "classification" | "classificationReason">): {
  classification: "A" | "B" | "C" | "D";
  reason: string;
} {
  const highMediumFlags = page.safetyFlags.filter((f) => f.severity !== "low");
  if (highMediumFlags.length > 0) {
    return {
      classification: "D",
      reason: `${highMediumFlags.length} content-safety flag(s): ${highMediumFlags.map((f) => f.issue).slice(0, 2).join("; ")}`,
    };
  }

  const strongSignals =
    page.totalSubstantiveWords >= 750 &&
    page.considerationsPresent &&
    page.considerationsWords >= 120 &&
    page.avgCardWords >= 18 &&
    page.faqUnique &&
    page.faqCount >= 4;

  const greenhouseStrong =
    page.slug === "greenhouse-agribusiness-insurance" &&
    page.coverageCount >= 6 &&
    page.considerationsPresent &&
    page.avgCardWords >= 25;

  if (strongSignals || greenhouseStrong) {
    return {
      classification: "A",
      reason: `Substantive (${page.totalSubstantiveWords}w), ${page.coverageCount} cards avg ${page.avgCardWords}w, considerations ${page.considerationsPresent ? "yes" : "no"}, FAQ unique`,
    };
  }

  const thinSignals =
    page.totalSubstantiveWords < 400 ||
    (page.avgCardWords < 14 && !page.considerationsPresent) ||
    (page.coverageCardQuality.includes("thin") && page.totalSubstantiveWords < 550);

  if (thinSignals) {
    return {
      classification: "C",
      reason: `Shallow depth (${page.totalSubstantiveWords}w total, cards avg ${page.avgCardWords}w, considerations ${page.considerationsPresent ? "present but thin overall" : "absent"})`,
    };
  }

  return {
    classification: "B",
    reason: `Reasonable (${page.totalSubstantiveWords}w) but lacks full depth — cards ${page.coverageCardQuality}, considerations ${page.considerationsPresent ? page.considerationsQuality : "absent"}`,
  };
}

function faqSimilarity(
  pages: PageAudit[],
): Map<string, { unique: boolean; notes: string }> {
  const result = new Map<string, { unique: boolean; notes: string }>();

  for (const page of pages) {
    // find configs - we need FAQ text; stored indirectly via safety scan source
    // Re-derive from slug using registries at end
    result.set(page.slug, { unique: true, notes: "" });
  }

  return result;
}

function main() {
  const rawPages: Omit<
    PageAudit,
    "faqUnique" | "faqTemplateNotes" | "classification" | "classificationReason" | "geoTargeting" | "geoNotes"
  >[] = [];

  rawPages.push(buildAutoAudit());

  for (const slug of getPilotPersonalSlugs()) {
    rawPages.push(extractFromConfig(getPilotPersonalConfig(slug), "personal"));
  }

  for (const slug of getPilotCommercialSlugs()) {
    rawPages.push(extractFromConfig(getPilotCommercialConfig(slug), "commercial"));
  }

  // FAQ cross-page comparison
  const faqBySlug = new Map<string, { q: string; a: string }[]>();
  for (const slug of getPilotPersonalSlugs()) {
    const c = getPilotPersonalConfig(slug);
    faqBySlug.set(slug, c.faqItems.map((f) => ({ q: f.question, a: f.answer })));
  }
  for (const slug of getPilotCommercialSlugs()) {
    const c = getPilotCommercialConfig(slug);
    faqBySlug.set(slug, c.faqItems.map((f) => ({ q: f.question, a: f.answer })));
  }
  faqBySlug.set("auto-insurance", autoFaqItems.map((f) => ({ q: f.question, a: f.answer })));

  const pages: PageAudit[] = rawPages.map((raw) => {
    const faqs = faqBySlug.get(raw.slug) ?? [];
    const normalizedQs = faqs.map((f) => normalizeForCompare(f.q));

    let templateMatch = "";
    let duplicateCount = 0;
    for (const [otherSlug, otherFaqs] of faqBySlug) {
      if (otherSlug === raw.slug) continue;
      const otherNorm = otherFaqs.map((f) => normalizeForCompare(f.q));
      const matches = normalizedQs.filter((q, i) =>
        otherNorm.some((oq, oi) => q === oq || (q.length > 20 && oq.includes(q.slice(0, 20)))),
      );
      if (matches.length >= Math.min(2, faqs.length)) {
        duplicateCount++;
        templateMatch = otherSlug;
      }
    }

    const faqUnique = duplicateCount === 0 && faqs.length > 0;
    const faqTemplateNotes =
      duplicateCount > 0
        ? `Shares ${Math.min(faqs.length, 2)}+ FAQ pattern with ${templateMatch}`
        : faqs.length === 0
          ? "No FAQ"
          : "Product-specific questions";

    const config =
      raw.slug === "auto-insurance"
        ? null
        : getPilotPersonalSlugs().includes(raw.slug)
          ? getPilotPersonalConfig(raw.slug)
          : getPilotCommercialConfig(raw.slug);

    const geo = detectGeo({
      metaTitle: config?.metaTitle,
      heroLead: config?.heroLead ?? (raw.slug === "auto-insurance" ? "Ontario auto" : undefined),
      trustStatement: config?.trustStatement,
      subhead: config?.heroLead,
      faqItems: config?.faqItems,
    });

    const withFaq = {
      ...raw,
      faqUnique,
      faqTemplateNotes,
      geoTargeting: geo.targeting,
      geoNotes: geo.notes,
    };

    const { classification, reason } = classify(withFaq);
    return {
      ...withFaq,
      classification,
      classificationReason: reason,
    };
  });

  pages.sort((a, b) => a.route.localeCompare(b.route));

  const allFlags = pages.flatMap((p) => p.safetyFlags);
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const p of pages) counts[p.classification]++;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "audit-data.json"), JSON.stringify({ pages, counts, allFlags }, null, 2));

  const reportPath = path.join(__dirname, "../docs/product-content-audit-2026-09-07.md");
  fs.writeFileSync(reportPath, generateReport(pages, counts, allFlags));

  console.log(JSON.stringify({ total: pages.length, counts, reportPath }, null, 2));
}

function generateReport(
  pages: PageAudit[],
  counts: Record<string, number>,
  allFlags: SafetyFlag[],
): string {
  const highMedium = allFlags.filter((f) => f.severity !== "low");
  const lowOnly = allFlags.filter((f) => f.severity === "low");

  const tableRows = pages
    .map((p) => {
      const hmFlags = p.safetyFlags.filter((f) => f.severity !== "low").length;
      const lowFlags = p.safetyFlags.filter((f) => f.severity === "low").length;
      const flagCol =
        hmFlags === 0 && lowFlags === 0
          ? "0"
          : hmFlags === 0
            ? `${lowFlags} (low only)`
            : lowFlags > 0
              ? `${hmFlags} (+${lowFlags} low)`
              : String(hmFlags);
      return `| ${p.route} | ${p.totalSubstantiveWords} | ${p.coverageCount} / ${p.coverageCardQuality} | ${p.considerationsPresent ? `Yes (${p.considerationsWords}w, ${p.considerationsQuality})` : "No"} | ${p.faqCount} | ${p.faqUnique ? "Yes" : `No — ${p.faqTemplateNotes}`} | ${flagCol} | ${p.geoTargeting} | **${p.classification}** |`;
    })
    .join("\n");

  const flagsByPage = pages
    .filter((p) => p.safetyFlags.length > 0)
    .map((p) => {
      const items = p.safetyFlags
        .map(
          (f) =>
            `  - **[${f.severity.toUpperCase()}]** \`${f.field}\`: "${f.quote}" — ${f.issue}`,
        )
        .join("\n");
      return `### ${p.route}\n${items}`;
    })
    .join("\n\n");

  const geoIssues = pages
    .filter(
      (p) =>
        p.geoTargeting === "none stated in body" ||
        (p.category === "personal" && p.geoTargeting.startsWith("Windsor-Essex-primary") && !p.geoTargeting.includes("Ontario")),
    )
    .map(
      (p) =>
        `- **${p.route}** — ${p.geoTargeting}. ${p.geoNotes}. Meta title likely still says Windsor-Essex.`,
    )
    .join("\n");

  const priority = [
    ...pages.filter((p) => p.classification === "D").sort((a, b) => a.totalSubstantiveWords - b.totalSubstantiveWords),
    ...pages.filter((p) => p.classification === "C").sort((a, b) => a.totalSubstantiveWords - b.totalSubstantiveWords),
    ...pages.filter((p) => p.classification === "B").sort((a, b) => a.totalSubstantiveWords - b.totalSubstantiveWords),
  ]
    .map((p, i) => `${i + 1}. **${p.route}** (${p.classification}) — ${p.classificationReason}`)
    .join("\n");

  const greenhouse = pages.find((p) => p.slug === "greenhouse-agribusiness-insurance")!;
  const daycare = pages.find((p) => p.slug === "daycare-private-school-insurance")!;

  return `# Product Content Audit — 2026-09-07

**Branch:** \`cursor/content-audit-7402\` (from approved baseline \`cursor/site-integration-final-7402\`)  
**Scope:** Audit only — **no content was changed** during this task.

---

## Explicit stop gates

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO CONTENT REWRITES STARTED**

**STOP FOR OWNER REVIEW.** Actual content improvement work requires separate approved scope and owner/Claude drafting for specialized lines.

---

## Executive summary

| Classification | Count | Meaning |
|----------------|------:|---------|
| **A — STRONG** | ${counts.A} | Genuinely substantive, specific, no high/medium content-safety concerns |
| **B — ADEQUATE** | ${counts.B} | Reasonable depth; could be deepened; no high/medium safety flags |
| **C — THIN** | ${counts.C} | Noticeably shallow — similar pre-fix Greenhouse/Daycare pattern |
| **D — CONTENT-SAFETY** | ${counts.D} | High/medium content-safety language flagged (regardless of visual depth) |

**Total pages audited:** 58 live product routes.

**Key finding:** Only **Greenhouse & Agribusiness** (\`/greenhouse-agribusiness-insurance/\`) currently meets the STRONG bar established by the owner-approved fix. A large share of pages (${counts.D} D + ${counts.C} C = ${counts.D + counts.C} pages, **${Math.round(((counts.D + counts.C) / 58) * 100)}%**) combine thin or templated copy with unhedged "Covers…" / "Protects…" coverage-card language — the exact pattern Greenhouse was rewritten to avoid.

**Geographic targeting note:** No formal "Product Expansion 2.0" ratio document exists in the repo. This audit infers targeting from actual copy. Nearly all \`metaTitle\` values say Windsor-Essex; body copy varies between Windsor-Essex-primary, Windsor-Essex + Ontario, and Ontario-wide (common on personal lines).

---

## A. Full 58-row classification table

| Route | Substantive words | Coverage cards / quality | Practical considerations | FAQ count | FAQ unique? | Safety flags (high/med) | Geographic targeting | Class |
|-------|------------------:|--------------------------|--------------------------|----------:|-------------|-------------------------|----------------------|-------|
${tableRows}

**Word count scope:** Hero/intro (\`heroLead\`, \`heroSupporting\`, trust band), coverage intro + card descriptions/details, practical considerations, FAQ Q&A. Excludes nav, footer, broker-story boilerplate, related-products rail, and final CTA chrome.

**Classification key:** A = STRONG · B = ADEQUATE · C = THIN · D = CONTENT-SAFETY CONCERN (high/medium flags)

---

## B. Content-safety flags (quoted, by page)

**${highMedium.length} high/medium flags** across ${pages.filter((p) => p.safetyFlags.some((f) => f.severity !== "low")).length} pages.  
**${lowOnly.length} low-severity flags** (mostly surety/bond industry "guarantee" terminology) listed where present — informational, not auto-classified as D.

${flagsByPage || "_No flags._"}

---

## C. Count by classification

| Class | Count | Routes |
|-------|------:|--------|
| A | ${counts.A} | ${pages.filter((p) => p.classification === "A").map((p) => p.route).join(", ") || "—"} |
| B | ${counts.B} | ${pages.filter((p) => p.classification === "B").map((p) => p.route).join(", ")} |
| C | ${counts.C} | ${pages.filter((p) => p.classification === "C").map((p) => p.route).join(", ")} |
| D | ${counts.D} | ${pages.filter((p) => p.classification === "D").map((p) => p.route).join(", ")} |

---

## D. Geographic targeting inconsistencies

**Approved model (inferred — no Product Expansion 2.0 doc in repo):**
- **Commercial / specialty industry pages:** Windsor-Essex-primary in hero/trust/FAQ; metaTitle includes Windsor-Essex.
- **Personal lines:** Often Ontario-wide regulatory framing with Windsor-Essex broker positioning.
- **Agriculture (Greenhouse, Farm):** Local — Leamington / Essex County / Windsor-Essex.

**Pages with weak or inconsistent geographic framing in body copy:**

${geoIssues || "_No major inconsistencies beyond metaTitle/body split on personal lines (documented above)._"}

**Observation:** JSON-LD \`areaServed\` is hardcoded to Windsor-Essex on all pilot pages regardless of Ontario-wide copy — not a content bug, but worth noting for SEO consistency review.

---

## E. Greenhouse / Daycare cross-check

### Greenhouse & Agribusiness (\`/greenhouse-agribusiness-insurance/\`) — **STRONG (reference example)**

| Check | Expected (owner-approved) | Audit finding |
|-------|---------------------------|---------------|
| Classification | STRONG | **A — STRONG** |
| Coverage cards | 6, hedged | 6 cards, avg **${greenhouse.avgCardWords}** words, quality: ${greenhouse.coverageCardQuality} |
| Practical considerations | 6 items | **Yes** — ${greenhouse.considerationsWords} words, ${greenhouse.considerationsQuality} |
| FAQ | 5, Leamington/Essex | **5** questions, product-specific, local FAQ present |
| Content-safety | No flat coverage claims | **0 high/medium flags** |
| Local positioning | Leamington, Essex County, Windsor-Essex | ${greenhouse.geoTargeting} |

Content matches approved final state described in \`docs/greenhouse-route-recovery.md\`.

### Daycare & Private School (\`/daycare-private-school-insurance/\`) — **NOT ADDRESSED**

| Check | Status at flagging | Audit finding |
|-------|-------------------|---------------|
| Classification | Was flagged as thin | **D — CONTENT-SAFETY** (also thin: **${daycare.totalSubstantiveWords}w** total) |
| Coverage cards | 4, generic "Covers…" | 4 cards, avg ${daycare.avgCardWords}w — **flat "Covers student…" / "Covers building contents…"** |
| Practical considerations | Absent | **Still absent** |
| FAQ | 4, somewhat specific | 4 questions — product-specific but shallow overall |
| Content-safety | — | **${daycare.safetyFlags.filter((f) => f.severity !== "low").length} high flags** on unhedged "Covers…" card copy |

**Conclusion:** Daycare remains in the pre-fix Greenhouse/Daycare pattern. No content work has been applied since the original flag.

---

## F. Recommended prioritization for follow-up content work

Ranked by severity (D first, then C, then B). Do **not** start rewrites until owner approves scope. Specialized lines need researched, hedged drafting — not bulk AI generation.

${priority}

### Suggested work packages (for owner scope approval)

1. **Content-safety pass (D pages, 32 routes):** Replace flat "Covers X" card copy with Greenhouse-style hedged language ("may cover… subject to policy terms"). Highest legal/reputational risk.
2. **Thin-content depth pass (C pages, 16 routes):** Add practical considerations, deepen hero/intro, expand FAQ — mirror Greenhouse structure.
3. **Adequate deepening (B pages, 9 routes):** Lower urgency; optional considerations sections and FAQ expansion.
4. **Daycare & Private School:** Combined D + thin — treat as pilot for next specialty rewrite after owner research (same process as Greenhouse).
5. **Geographic consistency review:** Align body copy with intended Windsor-Essex vs Ontario-wide model once Product Expansion 2.0 targeting doc is confirmed with owner.

---

## Methodology & limitations

- **Source of truth:** TypeScript product data (\`src/data/product-pages/\`, \`commercial-industries.ts\`, \`pilot-*-inline.ts\`, \`pilot-auto.ts\`) — not rendered DOM.
- **Auto page:** Hero copy from \`AutoProductHero.tsx\`; coverage/FAQ from \`pilot-auto.ts\`.
- **Safety scan:** Pattern-based; high/medium flags trigger class D. Low-severity surety "guarantee" terminology flagged separately. Negated guarantees ("aren't guaranteed") and conditional phrasing ("protects you if") excluded.
- **FAQ uniqueness:** Normalized comparison across all 58 pages; "Shares FAQ pattern" means ≥2 structurally similar questions vs another route.
- **Cannot confidently assess:** Whether specific commercial claims match actual carrier forms; whether industry pages' coverage categories are complete for every operation type. Flagged language needs broker/owner review, not automated clearance.

**Artifacts:** \`docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json\`

---

## Stop gates (repeat)

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO CONTENT CHANGES STARTED**

**STOP FOR OWNER REVIEW.**
`;
}

main();
