# Grade C Batch E — Manufacturing / Commercial Hub — Literal Factual Gate + Hub Density + Regression Flake

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Implementation commit:** `086e7c7`  
**Research commit:** `f689575`  
**Gate date:** 2026-09-10  
**Site at gate:** A42 / B16 / C0 / D0  

**Status:** **STOP FOR OWNER REVIEW** — Manufacturing clean; Commercial Hub condensation recommended before freeze; Fitness Explorer failure is a QA flake (not a production regression).

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `086e7c7` (`086e7c7a5367f21b2982284e10447b8aadc0269a`) |
| **CONTAINS 086e7c7** | **YES** |
| **STATUS** | Pre-existing dirty QA screenshots only. **No unexpected `src/` modifications at gate start.** |
| **PRODUCTION COPY CHANGED THIS GATE** | **NO** |
| **FROZEN ROUTES CHANGED** | **NO** |
| **FITNESS SOURCE CHANGED** | **NO** |
| **EXPLORER RUNTIME CHANGED** | **NO** |
| **IMAGES CHANGED** | **NO** |
| **SCANNER CHANGED** | **NO** |

---

## B. Literal dump stats

**Script:** `scripts/dump-grade-c-batch-e-literal-claims.ts`  
**Output:** `docs/qa-screenshots/grade-c-batch-e-2026-09-09/literal-claim-dump.txt`  
**Extraction:** `getPilotCommercialConfig()` — complete source strings (not DOM scrape).

| Metric | Value |
|--------|------:|
| **CHAR COUNT** (dump body) | 46,008 |
| **ROUTES** | 2 |
| **MANUFACTURING FAQ COUNT** | 5 |
| **MANUFACTURING CONSIDERATION COUNT** | 8 |
| **MANUFACTURING EXPLORER STATE COUNT** | 5 |
| **HUB CATEGORY COUNT** | 10 |
| **HUB CONSIDERATION COUNT** | 4 |
| **HUB SPECIALTY LINK COUNT** | 6 |
| **HUB INDUSTRY TILE COUNT** | 12 |
| **TRUNCATION** | **NO** |
| **BLANK CONTENT** | **NONE** |

Section word sums (source fields, for density analysis — not identical to audit grader):

| Route | Section word sum |
|-------|-----------------:|
| Manufacturing | ~1,809 |
| Commercial Hub | ~1,441 |
| Hub category cards alone | ~606 |

Content audit grader (site): Manufacturing **A / ~1424w**; Hub **A / ~1292w**.

---

## C. Manufacturing factual gate

Reviewed all visitor-facing Manufacturing copy (hero, Explorer RIGHT/LEFT, considerations, FAQs, related, CTA, meta) against property / EB / BI / recall / pollution / crime / cyber criteria.

### PROPERTY — PASS
- No categorical “covers all machinery/stock.”
- Card: *“May help address direct physical loss…”* with causes of loss, valuation, limits, deductibles.
- Valuation explicitly policy-dependent (cost / RC / selling price; coinsurance; peak values).

### EQUIPMENT BREAKDOWN — PASS
- Card: *“Where purchased… — not automatic on standard property forms.”*
- LEFT copy distinguishes fire/external perils vs internal mechanical/electrical/pressure failure.
- Explicit: EB does **not** automatically cover wear/tear, lack of maintenance, or every resulting BI/spoilage loss.

### BUSINESS INTERRUPTION — PASS
- Requires covered **direct physical loss** to insured property.
- Explicitly not market slowdowns, utility outages without physical damage, or supplier delays unless contingent BI applies to a named dependent property with covered damage.
- Waiting / restoration periods noted.

### PRODUCT LIABILITY / RECALL — PASS
- Distinct throughout Explorer, consideration, and FAQ.
- CGL **does not automatically** pay recall/withdrawal expense; cross-link to product recall route.

### POLLUTION — PASS
- Supporting consideration only: CGL pollution exclusions **restrict**; pollution liability **may be reviewed**.
- No “CGL never covers pollution.”

### CRIME / CYBER — PASS
- Supporting consideration: employee theft / ransomware may need crime or cyber rather than standard property alone.
- No implication ordinary property automatically covers cyber/OT.

### Absolute / categorical findings (material)
**None requiring production fix.** Occurrences of *automatically*, *breakdown*, *recall*, *pollution* appear in **negated or definitional** contexts.

**MANUFACTURING VERDICT: CLEAN**

---

## D. Manufacturing Explorer review

| Technical ID | Visitor title | RIGHT (WHAT) | LEFT (WHY) | Verdict |
|--------------|---------------|--------------|------------|---------|
| `product-liability` | Product Liability | Hedged CGL products-completed ops | Defective part after dock; recall separate | **CLEAN** |
| `commercial-property` | Commercial Property | May help / valuation / limits | Landlord ≠ CNC line; WIP valuation | **CLEAN** |
| `business-interruption` | Business Interruption | Where purchased; physical-loss trigger | Rent/payroll; not every shutdown | **CLEAN** |
| `equipment-breakdown` | Equipment Breakdown | Where purchased; not automatic | Fire vs breakdown; no auto BI/spoilage | **CLEAN** |
| `machine-shop-tool-die` | Job Shop & Tool & Die | Exposure segment disclosure | Custom WIP hard to replace | **CLEAN** |

**5/5 IDs preserved. 5/5 V2 pairs present. RIGHT=WHAT / LEFT=WHY consistent. Short copy not more categorical than body.**

**Explorer review: 5/5 CLEAN**

---

## E. Commercial Hub architecture review

### Why ~1292 words (not ~500–700)

| SECTION | APPROX WORDS | PURPOSE | UNIQUE VALUE | DUPLICATES CHILD DEPTH | KEEP / CONDENSE / REMOVE |
|---------|-------------:|---------|--------------|------------------------|--------------------------|
| Hero + supporting | ~116 | Orientation + hub vs SMB | High — defines hub job | NO | **KEEP** (minor tighten OK) |
| Trust band | ~24 | Broker positioning | High | NO | **KEEP** |
| Coverage intro | ~39 | Anti-bundle framing | High | NO | **KEEP** |
| **10 category cards** | **~606** | Route discovery | High as **labels+links**; blurbs longer than needed | Soft — each card restates child opener in 1–2 sentences | **CONDENSE** blurbs to ~20–28w each |
| Industry grid labels | ~24 | Industry nav | High | NO | **KEEP** |
| 4 considerations | ~194 | Certificates / personal vs commercial / specialty | Medium-high | Partial overlap with SMB themes | **CONDENSE** slightly |
| Broker steps | ~50 | Process | Medium | Shared pattern | **KEEP** |
| Specialty links + intro | ~43 | Specialty nav | High | NO | **KEEP** |
| 5 FAQs | ~319 | Orientation Q&A | Medium — useful but long | Some overlap with SMB FAQ themes | **CONDENSE** answers |
| CTA | ~26 | Non-absolute review CTA | High | NO | **KEEP** |

**Root cause of density:** Ten category orientation cards contribute ~606 words (~47% of hub section sum). Research intended orientation/navigation; implementation delivered orientation **paragraphs** per category rather than short nav blurbs. FAQs + considerations add ~500w more of useful but compressible copy.

**Hub still has no Explorer** and does not teach full child-route mechanics (valuation coinsurance treatises, BI indemnity math, pollution claims-made triggers, etc.).

---

## F. Hub duplication test

Compared hub category blurbs / FAQs against child routes (Commercial Property, GL/SMB, Commercial Auto, Professional Liability, Cyber, Crime, D&O, BI, Pollution, Equipment Breakdown via property, Manufacturing, Small Business).

| Finding | Assessment |
|---------|------------|
| Explains categories at orientation level? | **YES** — hedged “may help / where purchased / separate from…” |
| Starts teaching child-route detail? | **MOSTLY NO** — no deep triggers/limits schedules; cards are 1–2 sentence summaries |
| Repeats policy mechanics? | **LIGHT** — BI “direct physical loss”, EB “where purchased” are orientation-appropriate, not full BI page |
| False all-in-one package? | **NO** — explicit anti-bundle language in hero, intro, FAQ |
| SEO filler without nav value? | **PARTIAL** — category blurbs could be shorter without losing nav value |

**HUB ROLE PRESERVED:** **YES**  
**HUB OVER-DENSE:** **YES** (relative to approved 500–700 useful-word target)  
**TARGETED CONDENSATION RECOMMENDED:** **YES**

---

## G. Hub factual gate

| Check | Result |
|-------|--------|
| Implies every business needs every coverage? | **NO** — FAQ + intro contradict |
| Implies all coverages bundled automatically? | **NO** |
| Fabricated carrier counts / savings / quote speed / market share / awards? | **NO** |
| Guarantee-style “protect your business”? | **NO** — CTA is *“Ready to review your business insurance?”* |
| Category language hedged? | **YES** |
| Explorer present? | **NO** |
| Layout `commercial-hub`? | **YES** |

**Hub factual issues requiring production fix:** **NONE** (density is architectural/scope, not factual falsehood).

---

## H. Hub word-count decision

### Decision: **B. CONDENSE**

Hub remains navigation-led and factually clean, but exceeds the approved research budget (~500–700 useful words) primarily because category card descriptions are multi-sentence.

**Not A (KEEP 1292):** Owner approved structural Grade A without product-page padding; 1292 is denser than agreed.

**Not C (REWORK):** Hub has not become a deep product page; no Explorer; anti-bundle framing intact.

### Recommended condensation (future Phase — **do not edit in this gate**)

| Exact sections | Current approx | Target approx | Remove / shorten | Preserve |
|----------------|---------------:|--------------:|------------------|----------|
| 10 category card descriptions | ~606 | ~220–280 | Cut each to **one orientation sentence** + keep link | Labels, hrefs, hedge words |
| 5 FAQ answers | ~319 | ~200–240 | Trim examples; keep anti-bundle / hub-vs-SMB | Questions + core distinctions |
| 4 considerations | ~194 | ~140–160 | Slight tighten; keep certificate / personal-vs-commercial | All four themes |
| Hero supporting | ~part of 116 | keep ~90–100 | Optional one-clause trim | Hub job statement |

**Post-condensation target:** ~**700–900** audit words (still Grade A via structure if cards/FAQs/nav remain), or ~**550–700** if industry-grid intro stays compact and category blurbs are minimal.

---

## I. Fitness regression-flake diagnosis

### Diagnostic artifacts
- `scripts/diagnose-fitness-explorer-flake.cjs` → `fitness-flake-diagnostic.json`
- `scripts/diagnose-fitness-regression-pattern.cjs` → `fitness-full-regression-pattern-runs.json`

### Requery strategy (re-find tabs each click) — Fitness @ mobile-390 + desktop-1440

| Run | mobile-390 | desktop-1440 |
|-----|------------|--------------|
| 1 | **PASS** | **PASS** |
| 2 | **PASS** | **PASS** |
| 3 | **PASS** | **PASS** |

**No layout clip. No missing image. Explorer functional.**

### Full-regression click pattern (`page.$$` once → click stale ElementHandles)

| Run | desktop-1440 | desktop-1280 | desktop-1024 | mobile-390 |
|-----|--------------|--------------|--------------|------------|
| 1 | PASS | PASS | **FAIL** — `Node is detached from document` | PASS |
| 2 | PASS | PASS | **FAIL** — same | PASS |
| 3 | PASS | PASS | **FAIL** — same | PASS |

**Exact failure:** Puppeteer `ElementHandle.click` after React re-render invalidates the NodeList captured by `page.$$` in `scripts/site-integration-explorer-regression.cjs` (`auditRouteViewport` loop). Failure observed on **desktop-1024**, not mobile-390, in controlled reproduction.

### Verdict

| Question | Answer |
|----------|--------|
| **FITNESS FAILURE REPRODUCIBLE** | **YES** — with stale-handle pattern; **NO** as a layout/content defect |
| **REAL PRODUCTION REGRESSION** | **NO** |
| **QA FLAKE** | **YES** — script ElementHandle lifetime / React re-render race |
| **SOURCE CHANGE REQUIRED** | **NO** (do not touch frozen Fitness production) |

**Recommended QA follow-up (not this commit):** Update regression helper to re-query tabs each click (`page.evaluate` click or `$$` inside loop). Out of Batch E production scope.

---

## J. Absolute-language review

Searched Manufacturing + Hub for: always / never / must / required / mandatory / automatically / included / covers / protects / will cover / will pay / pays / guarantee / all / every / any / fully / shutdown / breakdown / recall / pollution.

**Material issues:** **NONE.**

Notes:
- *automatically* appears only in negatives (“does not automatically…”).
- *breakdown / recall / pollution* used as topic labels or hedged distinctions.
- Hub CTA uses **review**, not protect/guarantee.
- Manufacturing CTA: *“Ready to review your manufacturing program?”*

---

## K. Numeric / legal / regulatory register

| ROUTE | FIELD | CLAIM | TYPE | SOURCE | SOURCE DATE | EXACT SUPPORT | SAFE | HEDGE | KEEP / TIGHTEN / REMOVE |
|-------|-------|-------|------|--------|-------------|---------------|------|-------|-------------------------|
| Manufacturing | Hero / FAQ | No fixed $ limits stated | — | — | — | None found | YES | — | **KEEP** |
| Manufacturing | BI copy | Waiting / restoration periods vary | Coverage mechanic | Frozen BI route; common forms | 2026 site freeze | Directional | YES | “vary” | **KEEP** |
| Manufacturing | Pollution consideration | CGL pollution exclusions may restrict | Common policy structure | Frozen pollution page | Frozen | Aligns | YES | “may / restrict” | **KEEP** |
| Manufacturing | Recall FAQ | Recall expense typically separate from CGL | Common policy structure | Frozen recall page | Frozen | Aligns | YES | “generally / typically” | **KEEP** |
| Hub | FAQ pricing | Carriers review classification, revenue/payroll, etc. | Underwriting | Common practice | — | Orientation | YES | — | **KEEP** |
| Hub | Categories | “Where purchased / may help / subject to” | Coverage orientation | — | — | Hedged | YES | — | **KEEP** |
| Hub | Statutory mandates | None invented | — | — | — | — | YES | — | **KEEP** |

**No dollar amounts, percentages, or unsupported mandatory-insurance statutes on either Batch E route.**

---

## L. Meta / SEO review

| Route | Meta | Assessment |
|-------|------|------------|
| Manufacturing | Title/description list property, product liability, BI, EB, job-shop via independent broker | **SAFE** — inventory of topics, not guarantees |
| Commercial Hub | “hub… discover industry routes, core coverage categories, and specialty lines through an independent broker” | **SAFE** — navigation role; no universal bundle |

---

## M. Cross-page consistency

| Pair | Result |
|------|--------|
| Manufacturing vs Commercial Property / EB | Aligned — EB optional; property ≠ internal breakdown |
| Manufacturing vs BI | Aligned — physical-loss trigger; contingent BI endorsement-dependent |
| Manufacturing vs Product Recall | Aligned — liability ≠ recall expense; cross-link present |
| Manufacturing vs Pollution | Aligned — supporting only; no “never covers” |
| Manufacturing vs Crime | Aligned — crime/cyber separate from property |
| Hub vs Small Business | Explicit distinction in hero supporting + FAQ |
| Hub vs child categories | Orientation summaries; no contradictory guarantees |

**Exact contradictions:** **NONE.**  
**Meaningful duplication:** Hub category blurbs lightly restate child openers — condensation target, not factual conflict.

---

## N. Route verdicts

### MANUFACTURING: **CLEAN**

No production wording issues requiring a precision fix before freeze.

### COMMERCIAL HUB: **CONDENSATION REQUIRED**

| ROUTE | SECTION | CURRENT | WHY | RECOMMENDED NARROW ACTION |
|-------|---------|---------|-----|---------------------------|
| Commercial Hub | 10 category card descriptions (~606w) | Multi-sentence orientation | Exceeds approved density; nav value is in links | Shorten each to one hedged sentence |
| Commercial Hub | FAQ answers (~319w) | Thorough but long | Compressible without losing hub role | Trim to orientation-only answers |
| Commercial Hub | Considerations (~194w) | Four solid themes | Slight overlap with SMB | Light tighten; keep themes |

**No factual / absolute-language production fixes required on hub.**

---

## O. Freeze decision

| Item | Decision |
|------|----------|
| **MANUFACTURING** | **FREEZE** (factually clean; 5/5 Explorer clean) |
| **COMMERCIAL HUB** | **CONDENSE** before freeze (architecture OK; density over approved target) |
| **BATCH E READY TO FREEZE** | **NO** |
| **GRADE C BACKLOG FULLY CLOSED** | **NO** — hub condensation pass remains |
| **SITE** | **A42 / B16 / C0 / D0** |

---

## Validation (this gate)

| Check | Result |
|-------|--------|
| **BUILD** | **PASS** (`npm run build`) |
| **TSC** | **PASS** (`npx tsc --noEmit`) |
| **CONTENT AUDIT** | **A42 / B16 / C0 / D0** |
| **BATCH VERIFIER** | **PASS** (`scripts/verify-grade-c-batch-e.cjs`) |
| **EXPLORER REGRESSION** | Fitness failure = **confirmed QA flake** (stale ElementHandle). Production Fitness Explorer **PASS** with requery strategy; mobile-390 **PASS** ×3 even on stale pattern. **No Fitness source change.** |

---

## Commit scope (this gate only)

- `scripts/dump-grade-c-batch-e-literal-claims.ts`
- `scripts/diagnose-fitness-explorer-flake.cjs`
- `scripts/diagnose-fitness-regression-pattern.cjs`
- `docs/qa-screenshots/grade-c-batch-e-2026-09-09/literal-claim-dump.txt`
- `docs/qa-screenshots/grade-c-batch-e-2026-09-09/fitness-flake-diagnostic.json`
- `docs/qa-screenshots/grade-c-batch-e-2026-09-09/fitness-full-regression-pattern-runs.json`
- `docs/grade-c-batch-e-manufacturing-commercial-hub-factual-gate-2026-09-09.md`

**NO production copy / hub / Fitness / Explorer runtime / image / scanner edits.**

---

**STOP FOR OWNER REVIEW.**
