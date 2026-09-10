#!/usr/bin/env node
/**
 * Generate remediation matrix from audit-data.json — classification only.
 * Run: node scripts/generate-remediation-matrix.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const auditPath = path.join(
  __dirname,
  "../docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json",
);

/** @type {Record<string, { family: string; bucket: string; depth: boolean; treatment: string; notes?: string }>} */
const ASSIGNMENTS = {
  "/auto-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "Hedging pass on collision/comprehensive/accident-benefits card + FAQ wording; retain Ontario-mandatory framing where verifiable; no length expansion.",
  },
  "/bonding-insurance/": {
    family: "Construction (Bonding/Surety)",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated surety research pass; separate bond-type accuracy from GL; fix unhedged FAQ; do not treat as generic wording-only.",
  },
  "/builders-developers-insurance/": {
    family: "Construction",
    bucket: "D3",
    depth: true,
    treatment:
      "Researched expansion + hedging; builder's risk / CGL overlap needs technical review, not card rephrase alone.",
  },
  "/builders-risk-insurance/": {
    family: "Construction",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated builders-risk research (policy period, who buys, vs CGL); replace flat 'covers structure' intro/cards with hedged, accurate framing.",
  },
  "/business-interruption-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "C1",
    depth: true,
    treatment:
      "Incremental: deepen 4 card descriptions, add 1–2 BI-specific FAQs; considerations exist — extend, don't rebuild.",
  },
  "/cargo-freight-insurance/": {
    family: "Transportation",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated motor-cargo research (cargo vs liability vs contingent); fix flat 'covers' intro/FAQ; thin page needs substance + hedging.",
  },
  "/commercial-auto-insurance/": {
    family: "Transportation",
    bucket: "C1",
    depth: true,
    treatment:
      "Add practical considerations (fleet disclosures, hired/non-owned); modest FAQ expansion; cards already hedged.",
  },
  "/commercial-insurance/": {
    family: "Industrial/Coverage-Types (Hub)",
    bucket: "C2",
    depth: true,
    treatment:
      "Hub page rebuild: intro/trust depth for Windsor-Essex commercial entry; not a coverage-card page — focus wayfinding copy, not Greenhouse-length target.",
  },
  "/commercial-property-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "C1",
    depth: true,
    treatment:
      "Add practical considerations; deepen property-valuation/co-insurance FAQ; no safety flags — modest pass only.",
  },
  "/condo-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "Hedging pass on unit-contents card + corporation-assessment consideration; depth adequate for personal condo — no length chase.",
  },
  "/condominium-corporation-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "C2",
    depth: true,
    treatment:
      "Substantial researched expansion (master policy, deductibles, unit-owner vs corp); thin corp-specific content missing.",
  },
  "/contractors-insurance/": {
    family: "Construction",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated construction research despite explorer visuals; fix builder's-risk FAQ flat claim; add considerations for subs/tools/wrap-up.",
  },
  "/convenience-store-insurance/": {
    family: "Hospitality/Food",
    bucket: "D2",
    depth: true,
    treatment:
      "Hospitality-family research batch + hedging; thin (214w) with flat property card; add considerations ( tobacco/lottery, hours).",
  },
  "/cottage-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "Single liability-card hedging fix; seasonal/vacant considerations already present — accuracy over expansion.",
  },
  "/crime-fidelity-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "D3",
    depth: true,
    treatment:
      "Specialized crime/fidelity research; flat employee-dishonesty card; thin page needs researched expansion, not wording-only.",
  },
  "/daycare-private-school-insurance/": {
    family: "Professional/Institutional",
    bucket: "D2",
    depth: true,
    treatment:
      "Audit snapshot: thin + 2 high flags. NOTE: owner-approved rewrite exists on cursor/daycare-content-2026-09-07 — verify before re-work.",
    notes: "Audit predates approved daycare implementation branch.",
  },
  "/directors-officers-insurance/": {
    family: "Professional/Institutional",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated D&O research; fix GL-vs-D&O FAQ flat claim; extend considerations for side-A/B/C if accurate.",
  },
  "/dump-truck-insurance/": {
    family: "Transportation",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated heavy-commercial auto/cargo research; fix liability/cargo FAQ flat split; add hauling/disclosure considerations.",
  },
  "/employment-practices-liability-insurance/": {
    family: "Professional/Institutional",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated EPL research (Ontario employment context); thin + flat wrongful-termination card; needs researched expansion.",
  },
  "/event-liability-insurance/": {
    family: "Hospitality/Food (adjacent — events)",
    bucket: "D2",
    depth: true,
    treatment:
      "Event-specific research within hospitality batch where possible; hedging on injury card; add venue/permit considerations.",
    notes: "Best-fit: Hospitality/Food batch for shared event/permit patterns; distinct from restaurant property.",
  },
  "/farm-insurance/": {
    family: "Agriculture",
    bucket: "C2",
    depth: true,
    treatment:
      "Agriculture research pass (distinct from Greenhouse reference); Essex County local framing; add considerations — not word-count parity with Greenhouse.",
  },
  "/fitness-gym-insurance/": {
    family: "Retail/Services",
    bucket: "C2",
    depth: true,
    treatment:
      "Substantial expansion: waivers, equipment, participant injury; add considerations + deeper cards; no safety flags yet but thin.",
  },
  "/food-truck-insurance/": {
    family: "Hospitality/Food",
    bucket: "D2",
    depth: true,
    treatment:
      "Hospitality batch research; fix commercial-auto flat card; add commissary/liquor/permit considerations.",
  },
  "/garage-dealership-insurance/": {
    family: "Transportation",
    bucket: "C1",
    depth: true,
    treatment:
      "Modest depth: garagekeepers/dealer open-lot considerations; FAQ expansion; no safety flags.",
  },
  "/grocery-specialty-food-insurance/": {
    family: "Hospitality/Food",
    bucket: "C2",
    depth: true,
    treatment:
      "Hospitality batch research; spoilage/refrigeration considerations; thin across sections — not D yet but shallow.",
  },
  "/home-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "Single medium FAQ hedging fix (legal requirement framing); otherwise adequate depth — no expansion for length.",
  },
  "/hotel-motel-insurance/": {
    family: "Hospitality/Food",
    bucket: "D2",
    depth: true,
    treatment:
      "Hospitality batch; fix property flat card; add pool/guest-belongings/BI considerations.",
  },
  "/landlord-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "FAQ hedging on eviction/guarantee products; core landlord depth adequate — specificity over length.",
  },
  "/liquor-liability-insurance/": {
    family: "Hospitality/Food",
    bucket: "D2",
    depth: true,
    treatment:
      "Dedicated liquor-liability research within hospitality batch; fix patron-injury flat card; regulatory context if verified.",
  },
  "/manufacturing-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "C1",
    depth: true,
    treatment:
      "Modest: add considerations (products/completed ops, supply chain); 5 cards present — incremental only.",
  },
  "/medical-dental-insurance/": {
    family: "Retail/Services",
    bucket: "C2",
    depth: true,
    treatment:
      "Regulated-professional research (malpractice coordination, privacy); thin — needs substance before hedging-only pass.",
    notes: "Regulated exposure — research depth closer to D3 but no safety flags in audit.",
  },
  "/motorcycle-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "Hedge mandatory-liability card (Ontario context is verifiable — keep factual, remove flat 'covers'); no length expansion.",
  },
  "/non-profit-insurance/": {
    family: "Professional/Institutional",
    bucket: "D2",
    depth: true,
    treatment:
      "Institutional batch; fix GL flat card; add board/volunteer/D&O cross-reference considerations.",
  },
  "/pharmacy-insurance/": {
    family: "Retail/Services",
    bucket: "D2",
    depth: true,
    treatment:
      "Regulated retail research; thinnest D page (205w); fix property flat card; narcotics/compounding disclosures.",
  },
  "/pollution-liability-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "C2",
    depth: true,
    treatment:
      "Dedicated pollution research despite C class — high-stakes technical exposure; add considerations + hedged cards proactively.",
    notes: "No audit safety flags; classify C2 with D3-equivalent research rigor.",
  },
  "/product-recall-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated recall vs product-liability research; fix two flat FAQ claims; thin page.",
  },
  "/professional-liability-insurance/": {
    family: "Professional/Institutional",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated E&O research; remove/unverify $1M–$5M FAQ claim; hedging pass on profession-specific scope.",
  },
  "/professional-offices-insurance/": {
    family: "Professional/Institutional",
    bucket: "C1",
    depth: true,
    treatment:
      "Modest: add considerations (client records, hybrid work); FAQ de-templating from auto; no safety flags.",
  },
  "/property-management-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "D2",
    depth: true,
    treatment:
      "Property-mgmt research; fix GL flat card; add tenant/legal-expense/pool considerations.",
  },
  "/real-estate-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "C2",
    depth: true,
    treatment:
      "Substantial: E&O vs GL for agents/brokers; thin; FAQ templated with food-truck — needs researched rewrite.",
  },
  "/religious-organizations-insurance/": {
    family: "Professional/Institutional",
    bucket: "C2",
    depth: true,
    treatment:
      "Institutional batch; thin (215w); add abuse/counselling/property considerations — no audit flags but shallow.",
  },
  "/restaurant-insurance/": {
    family: "Hospitality/Food",
    bucket: "D2",
    depth: true,
    treatment:
      "Hospitality batch priority; fix property flat card despite hedged family label; add spoilage/liquor/delivery considerations.",
  },
  "/retail-insurance/": {
    family: "Retail/Services",
    bucket: "C1",
    depth: true,
    treatment:
      "Modest: add considerations (inventory valuation, online sales); incremental card/FAQ depth.",
  },
  "/salon-barber-insurance/": {
    family: "Retail/Services",
    bucket: "D2",
    depth: true,
    treatment:
      "Retail/services batch; fix product-liability flat card; add professional/beauty-service considerations.",
  },
  "/small-business-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "D1",
    depth: false,
    treatment:
      "Single commercial-property card hedging; considerations exist — wording-only pass, not Greenhouse-length expansion.",
  },
  "/tenant-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "FAQ hedging pass ('protects your belongings', household coverage scope); adequate for simpler personal line — resist length expansion.",
    notes: "Explicit: quality bar met with accuracy/specificity at lower word count than Greenhouse/Daycare.",
  },
  "/travel-insurance/": {
    family: "Personal",
    bucket: "D1",
    depth: false,
    treatment:
      "Single baggage/personal-effects card hedging; strong considerations already — wording fix only.",
  },
  "/trucking-insurance/": {
    family: "Transportation",
    bucket: "D3",
    depth: true,
    treatment:
      "Dedicated trucking research (MCS-90, cargo, bobtail, jurisdiction); fix liability/cargo FAQ; never wording-only.",
  },
  "/warehousing-insurance/": {
    family: "Industrial/Coverage-Types",
    bucket: "D2",
    depth: true,
    treatment:
      "Warehouse/bailee research; fix property flat card; add bailee/legal-liability considerations.",
  },
};

function main() {
  const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
  const pages = audit.pages
    .filter((p) => p.classification === "C" || p.classification === "D")
    .sort((a, b) => a.route.localeCompare(b.route));

  const rows = pages.map((p) => {
    const a = ASSIGNMENTS[p.route];
    if (!a) throw new Error(`Missing assignment: ${p.route}`);
    const hm = p.safetyFlags.filter((f) => f.severity !== "low");
    const flagsList = hm.length
      ? hm
          .map((f) => `[${f.severity.toUpperCase()}] ${f.field} — ${f.issue}`)
          .join("; ")
      : "None";
    const severity = hm.length
      ? [...new Set(hm.map((f) => f.severity))].join(", ")
      : "—";
    return {
      route: p.route,
      class: p.classification,
      words: p.totalSubstantiveWords,
      flagsList,
      severity,
      depth: a.depth ? "Yes" : "No",
      bucket: a.bucket,
      family: a.family,
      treatment: a.treatment,
      notes: a.notes ?? "",
    };
  });

  const bucketCounts = { D1: 0, D2: 0, D3: 0, C1: 0, C2: 0 };
  for (const r of rows) bucketCounts[r.bucket]++;

  const families = {};
  for (const r of rows) {
    if (!families[r.family]) families[r.family] = {};
    families[r.family][r.bucket] = (families[r.family][r.bucket] || 0) + 1;
  }

  const table = rows
    .map(
      (r) =>
        `| ${r.route} | ${r.class} | ${r.words} | ${r.flagsList.replace(/\|/g, "\\|")} | ${r.severity} | ${r.depth} | **${r.bucket}** | ${r.family} | ${r.treatment.replace(/\|/g, "\\|")}${r.notes ? ` *(Note: ${r.notes})*` : ""} |`,
    )
    .join("\n");

  const fullFlags = rows
    .filter((r) => r.severity !== "—")
    .map((r) => `#### ${r.route}\n${audit.pages.find((p) => p.route === r.route).safetyFlags.filter((f) => f.severity !== "low").map((f) => `- **[${f.severity.toUpperCase()}]** \`${f.field}\`: "${f.quote}"`).join("\n")}`)
    .join("\n\n");

  const familyBlocks = Object.entries(families)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([fam, buckets]) =>
        `- **${fam}:** ${Object.entries(buckets)
          .map(([b, n]) => `${b}×${n}`)
          .join(", ")}`,
    )
    .join("\n");

  const md = `# Product Content Remediation Matrix — 2026-09-07

**Source:** \`docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json\` + \`docs/product-content-audit-2026-09-07.md\`  
**Branch:** \`cursor/content-audit-7402\` (audit snapshot)  
**Scope:** Triage/classification only — **no research, drafting, or fixes performed**

---

## Stop gates

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**
- **NO CONTENT WORK STARTED**

**STOP FOR OWNER REVIEW.** Proceed only after matrix review and batch approval.

---

## Classification standard (explicit)

**Greenhouse (757w) and Daycare (765w) are quality-bar references, not word-count targets.** Buckets prioritize accuracy, specificity, and appropriate hedging for each subject matter. Pages with lower legitimate complexity (e.g. Tenant, Travel) were **not** pushed toward C2/D2 solely for being below 700 words. Where a page has adequate depth but flat wording, it lands in **D1** regardless of word count.

---

## Bucket definitions (applied)

| Bucket | Meaning |
|--------|---------|
| **D1** | Safety wording only — validate existing assertions, hedge flat "Covers…" language; no research expansion |
| **D2** | Safety + thin — both unhedged wording and inadequate substance |
| **D3** | Specialized/high-risk — dedicated research required even if moderate length |
| **C1** | Modest depth improvement — incremental considerations/FAQ/card depth |
| **C2** | Substantial researched expansion — thin across sections, Greenhouse/Daycare-style investment |

---

## Bucket counts (49 C/D pages)

| Bucket | Count |
|--------|------:|
| D1 | ${bucketCounts.D1} |
| D2 | ${bucketCounts.D2} |
| D3 | ${bucketCounts.D3} |
| C1 | ${bucketCounts.C1} |
| C2 | ${bucketCounts.C2} |
| **Total** | **${rows.length}** |

---

## Full remediation matrix (49 rows)

| Route | Class | Words | Safety flags (summary) | Severity | Depth problem? | Bucket | Risk family | Recommended treatment |
|-------|------:|------:|------------------------|----------|----------------|--------|-------------|----------------------|
${table}

> **Full flag quotes** for all D pages are listed in [Appendix A](#appendix-a-full-safety-flag-quotes).

---

## Risk family distribution

${familyBlocks}

### Shared research pass feasibility

| Risk family | Shared research pass? | Rationale |
|-------------|----------------------|-----------|
| **Hospitality/Food** | **Yes — one pass, multiple pages** | Restaurant, food truck, grocery, convenience, hotel, liquor, event share premises/GL/property/liquor patterns. Event-liability is adjacent — shared permit/venue context, distinct short-term policy mechanics. |
| **Construction** | **Partial** | Contractors + builders-developers + landscaping can share construction CGL/wrap-up context. **Builders risk** and **bonding/surety** need **separate** research tracks (different products, different buyers). |
| **Transportation** | **Partial** | Commercial auto + dump truck + cargo share fleet/auto DNA. **Trucking** needs its own pass (federal/provincial, MCS-90, motor carrier). Garage/dealership is separate (garagekeepers, SEF 4). |
| **Professional/Institutional** | **Partial** | Non-profit + religious orgs share institutional/board/volunteer patterns. **D&O**, **EPL**, **professional liability**, and **daycare/education** each need **dedicated** research — high stakes, different policy forms. |
| **Retail/Services** | **Partial** | Retail + salon can share general retail GL/property patterns. **Medical/dental** and **pharmacy** need **separate** regulated-professional research. Fitness/gym shares retail batch for premises/waivers only. |
| **Agriculture** | **Separate from other families** | Farm pass distinct from Greenhouse (already STRONG reference). Do not batch with hospitality or industrial. |
| **Industrial/Coverage-Types** | **Partial** | Small business + commercial property + BI can share generic commercial core. **Pollution**, **product recall**, **crime/fidelity**, **condo corporation**, **real estate E&O**, **warehousing/bailee**, and **commercial hub** each need **separate** tracks. |
| **Personal** | **Partial — mostly D1 wording passes** | Auto/home/condo/tenant/motorcycle/travel/landlord/cottage share personal-lines hedging conventions. Tenant/travel need **minimal** expansion only — accuracy over length. Auto Ontario mandatory language is verifiable — preserve facts, hedge coverage-type descriptions. |

---

## Appendix A: Full safety flag quotes

${fullFlags}

---

## Audit notes

- **Daycare** row reflects **pre-implementation audit snapshot** (214w, 2 high flags). Owner-approved content landed on \`cursor/daycare-content-2026-09-07\` after audit — **re-classify after baseline merge**, do not schedule duplicate work.
- **Greenhouse** excluded (Class A reference).
- **Pollution liability** is Class C with **no audit flags** but assigned **C2 with D3-equivalent research** due to technical exposure risk.

---

## Stop gates (repeat)

- **NO MERGE**
- **NO DEPLOY**
- **NO CONTENT WORK STARTED**

**STOP FOR OWNER REVIEW.**
`;

  const out = path.join(__dirname, "../docs/product-content-remediation-matrix-2026-09-07.md");
  fs.writeFileSync(out, md);
  console.log(JSON.stringify({ out, rows: rows.length, bucketCounts }, null, 2));
}

main();
