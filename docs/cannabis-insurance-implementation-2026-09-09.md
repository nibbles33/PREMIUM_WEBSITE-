# Cannabis Insurance — Phase 2 Implementation Report

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Research commit:** `5b1b3d2`  
**Research report:** `docs/cannabis-insurance-research-architecture-2026-09-09.md`  
**Owner decisions A–O:** APPROVED (architecture Option B — two routes, no hub, no nav this phase)

---

## A. Implementation base

- Reused existing pilot commercial industry page factory (`createPilotCommercialPageExports` / `adaptCommercialIndustryContent`).
- Appended **new** industry page objects only; did **not** rewrite frozen industry page bodies.
- Registered slugs in `CANNABIS_INDUSTRY_SLUGS` inside `pilot-commercial-registry.ts` (named to avoid collision with Grade C “Batch E” manufacturing remediation docs).
- Sitemap entries added for direct routing/SEO discovery only.
- Coverage Explorer V2 fields (`shortLabel`, `detailTitle`, `detailDescription`) supplied on every cannabis card.

**Frozen 58-route baseline:** A42 / B16 / C0 / D0 — **UNCHANGED** (visitor-facing copy on existing product routes not modified).

---

## B. Files changed

| File | Role |
|------|------|
| `src/data/cannabis-industries.ts` | **NEW** — Retail + Producer page content |
| `src/app/cannabis-retail-insurance/page.tsx` | **NEW** route |
| `src/app/cannabis-producer-insurance/page.tsx` | **NEW** route |
| `src/data/commercial-industries.ts` | Import + `...cannabisIndustryPages` append only |
| `src/data/pilot-commercial-registry.ts` | `CANNABIS_INDUSTRY_SLUGS` registration |
| `src/app/sitemap.ts` | Two new absolute paths |
| `src/lib/buildPilotProductConfig.ts` | Related links + trust statements + expandable considerations for cannabis slugs only |
| `src/data/coverage-explorer/interactive-master-assets.ts` | Route → master map + TEMPORARY TODOs |
| `src/data/coverage-explorer/registry.ts` | Visual family mapping |
| `src/data/coverage-explorer/interaction-manifest/routes.ts` | Zone wiring for Explorer IDs |
| `src/data/photography/placements.ts` | TEMPORARY hero placements (`isTemporary: true`) |
| `scripts/verify-cannabis-products.cjs` | **NEW** Cannabis verifier |
| `docs/cannabis-insurance-implementation-2026-09-09.md` | This report |
| `docs/qa-screenshots/cannabis-phase-2-2026-09-10/` | Verifier screenshots + `verification.json` |
| `docs/product-content-audit-2026-09-07.md` | Regenerated audit reflecting 60 routes |

**Not changed:** homepage discovery, mega-menu, mobile nav, Commercial Hub categories, master product navigation, scanner rules, Explorer runtime components, frozen product page bodies, no new generated artwork.

---

## C. Route architecture

| Route | Audience | Hub |
|-------|----------|-----|
| `/cannabis-retail-insurance/` | Ontario AGCO-authorized cannabis retail stores | **No** Cannabis hub |
| `/cannabis-producer-insurance/` | Health Canada–licensed cultivation / nursery / processing (incl. micro where applicable) | **No** Cannabis hub |

Both use the standard product composition: Hero → Coverage Explorer → considerations → FAQs → related products → CTA.

---

## D. Cannabis Retail implementation

- **Primary SEO:** Cannabis Retail Insurance (+ Windsor-Essex naturally).
- **Explorer (5/5 V2):**
  1. `general-liability` — Premises & General Liability  
  2. `cannabis-property-stock` — Property & Cannabis Stock  
  3. `cannabis-product-liability` — Cannabis Product Liability  
  4. `cannabis-crime-theft` — Crime, Theft & Cash  
  5. `business-interruption` — Business Interruption  
- **Considerations:** 8  
- **FAQs:** 5  
- **Substantive words (audit):** ~1,205 (Grade **A**)  
- Crop / living plants: **ABSENT** from Retail Explorer (by design).  
- Product recall: supporting consideration + FAQ + related link only (not a core Explorer state).

---

## E. Cannabis Producer implementation

- **Primary SEO:** Cannabis Producer Insurance.
- **Explorer (6/6 V2):**
  1. `cannabis-property-infrastructure` — Property & Production Infrastructure  
  2. `cannabis-crop-stock` — Living Plants, Crop & Stock  
  3. `equipment-breakdown` — Equipment Breakdown  
  4. `cannabis-product-liability` — Product Liability  
  5. `cannabis-product-recall` — Product Recall Expense  
  6. `business-interruption` — Business Interruption  
- **Considerations:** 9  
- **FAQs:** 5  
- **Substantive words (audit):** ~1,275 (Grade **A**)  
- Licence-class language hedged (standard / micro / nursery / processing not identical).

---

## F. Explorer architecture

- RIGHT column = WHAT (card `description`)  
- LEFT detail = WHY IT MATTERS (`detailTitle` + `detailDescription`)  
- Policy-dependent hedging throughout (`may`, `where purchased`, `subject to`).  
- Interaction-manifest zone maps reuse retail / factory-industrial archetypes temporarily (acceptable until dedicated Cannabis scenes exist).

---

## G. Regulatory implementation

| Topic | Treatment |
|-------|-----------|
| AGCO retail licensing (ROL / RSA / CRM) | Described as **licensing/regulation**, not insurance coverage |
| OCS retailer agreement insurance | Described as **contractual**, not AGCO/CLA statute |
| Health Canada / Cannabis Act / Cannabis Regulations | Producer compliance context; not turned into coverage guarantees |
| Recall control systems | Distinguished from Product Recall **insurance** |

---

## H. OCS vs AGCO treatment

- **Do not say:** “Ontario law requires $5 million liability insurance.”  
- **Do say (implemented):** research found no AGCO / CLA / O. Reg. 468/18 statutory minimum insurance dollar limit; OCS retailer agreements commonly/contractually require CGL of at least $5M per occurrence with specified coverages and OCS as additional insured — confirm live agreement/COI; policies do not automatically satisfy paperwork.  
- Verifier asserts AGCO + OCS + `contractual` presence and forbids statutory $5M framing.

---

## I. Property / stock / crop treatment

- **Retail:** packaged cannabis stock may need specialty appetite / sublimits / security conditions; ordinary contents not assumed sufficient.  
- **Producer:** living plants / seedlings / crop / harvested / WIP / finished goods distinguished; ordinary property not assumed to cover living plants; no universal valuation method stated.

---

## J. Product Liability vs Recall

- Liability = potential third-party injury/property-damage allegations (hedged).  
- Recall expense = first-party withdrawal costs where purchased; not automatic with CGL.  
- Cross-link frozen `/product-recall-insurance/`.  
- Producer: recall is a **core** Explorer state. Retail: supporting only.

---

## K. Equipment Breakdown / BI

- EB is **core** on Producer; explicitly “where purchased,” not automatic on property.  
- EB failure does not automatically equal crop / spoilage / BI response.  
- BI tied to covered direct physical loss / applicable form triggers.  
- Explicitly **not** automatic for licence suspension, regulatory shutdown alone, OCS supply delay, contamination without insured damage, or recall decisions alone.  
- Cross-link frozen `/business-interruption-insurance/`.

---

## L. Crime / Cyber / Pollution

| Topic | Retail | Producer |
|-------|--------|----------|
| Crime / theft / cash / employee dishonesty / social engineering | **Core** Explorer state | Supporting consideration |
| Cyber / POS / OT | Supporting consideration + related where useful | Supporting consideration |
| Pollution | Supporting consideration + cross-link | Supporting consideration + cross-link `/pollution-liability-insurance/` |

---

## M. Cross-links

Verified existing routes only (not modified):

- Retail page → Retail, Commercial Property, Crime/Fidelity, Product Recall, Business Interruption  
- Producer page → Manufacturing, Greenhouse & Agribusiness, Product Recall, Pollution Liability, Business Interruption  

---

## N. SEO

| Route | Meta focus |
|-------|------------|
| Retail | Cannabis Retail Insurance · Windsor-Essex · Ontario authorized stores |
| Producer | Cannabis Producer Insurance · licensed cultivation/processing · Windsor-Essex |

Avoided: “dispensary” as primary Ontario term; invented savings/quote speed/carrier counts/market leadership/cannabis expertise history.

---

## O. Claim register

| ROUTE | FIELD | CLAIM | SOURCE | SOURCE DATE | EXACT SUPPORT | TYPE | HEDGE | SAFE |
|-------|-------|-------|--------|-------------|---------------|------|-------|------|
| Retail | considerations + FAQ | No AGCO / CLA / O. Reg. 468/18 statutory minimum insurance dollar limit located in Phase 1 research | Research report / CLA & O. Reg. search notes | 2026-09-09/10 | Research factual-risk register row: statutory $5M **NO** | Regulatory (negative finding) | Framed as research finding; licensing ≠ insurance | YES |
| Retail | considerations + FAQ | OCS retailer agreements commonly require CGL ≥ $5M per occurrence, specified coverages, OCS additional insured / COI before ordering | OCS Wholesale Authorized Cannabis Retailers Handbook; OCS COI materials (via research report) | Handbook Feb 2026; COI forms 2024–; research 2026-09-10 | Research register: contractual **YES with hedge** | Contractual | “commonly / current handbook materials / confirm live agreement”; not every policy automatically matches | YES with hedge |
| Retail | subhead / considerations | AGCO licensing may include ROL, RSA, CRM where applicable | AGCO cannabis retail licensing materials | Research 2026-09-09/10 | Research licensing inventory | Regulatory | “where required”; not framed as insurance | YES |
| Producer | subhead / considerations | Federal licence classes may include cultivation, nursery, processing, including micro classes | Health Canada / Cannabis Act licensing | Research 2026-09-09/10 | Research producer licence inventory | Regulatory | “depending on licence class”; not identical requirements | YES |
| Producer | Explorer recall + FAQ | Licence holders maintain recall controls; regulatory recall duties exist independently of insurance | Cannabis Regulations recall provisions (via research) | Research 2026-09-09/10 | Research register: recall duty ≠ insurance | Regulatory | Distinguished from Product Recall insurance response | YES |
| Both | BI / property copy | BI / property / EB / liability response is policy- and trigger-dependent | General Canadian commercial practice + Premium frozen specialty pages | n/a | Architecture safety rules | Underwriting/practice | `may` / `where purchased` / `subject to` | YES |

**Numeric claims in visitor copy:** only the OCS **contractual** ~$5M CGL figure (hedged). No statutory $5M claim.

---

## P. Temporary image strategy

| Surface | Retail | Producer |
|---------|--------|----------|
| Explorer interactive master | `cannabis-retail-insurance-interactive-master.png` on disk — **Phase-2 stand-in**; **DEDICATED FINAL IMAGE REQUIRED BEFORE LAUNCH** | **TEMPORARY** reuse of `manufacturing-insurance-interactive-master.png` — **DEDICATED IMAGE REQUIRED BEFORE LAUNCH** |
| Hero photography | **TEMPORARY** reuse of `retail-insurance.webp` (`isTemporary: true`) | **TEMPORARY** reuse of `manufacturing-insurance.webp` (`isTemporary: true`) |

Explicit TODO markers in `interactive-master-assets.ts` and placement `temporaryNote` fields.  
**Images generated this phase:** NO.

---

## Q. Navigation deferral

Homepage product discovery, mega-menu, mobile nav, Commercial Hub categories, and master product navigation were **not** modified.  
Future placement (deferred to MASTER PRODUCT INVENTORY → NAVIGATION RECONCILIATION): Retail cluster, Manufacturing/Specialty, Commercial Hub, other legitimate discovery surfaces.

---

## R. Content audit

| Scope | Result |
|-------|--------|
| Frozen 58 | **A42 / B16 / C0 / D0** unchanged |
| Cannabis Retail | **A** (~1205 words; 4 LOW flags only — OCS $5M contractual citations) |
| Cannabis Producer | **A** (~1275 words; 0 flags) |
| Site inventory | **60 routes** → **A44 / B16 / C0 / D0** |
| Scanner rules | **Not weakened** |

---

## S. Cannabis verifier

`scripts/verify-cannabis-products.cjs` checks:

- Both routes resolve  
- Correct slugs  
- Retail 5 Explorer IDs + 5/5 V2 LEFT/RIGHT  
- Producer 6 Explorer IDs + 6/6 V2 LEFT/RIGHT  
- Required regulatory/distinction phrases; forbidden categorical/statutory phrases  
- Considerations & FAQs populated  
- Product liability vs recall signals  
- Retail OCS vs AGCO distinction  
- Producer living plant + EB signals  
- Responsive 390 / 768 / 1024 / 1440 (overflow, H1, Explorer)  
- Static check: nav files do not reference cannabis  
- TODO markers for dedicated Explorer images present  

Artifacts: `docs/qa-screenshots/cannabis-phase-2-2026-09-10/`.

---

## T. Explorer regression

| Baseline | Result |
|----------|--------|
| Historical frozen inventory | **228/228** (58-route era; 57 routes × 4 viewports with explorer) |
| Phase 2 expanded inventory | **236/236 pass**, 0 fail (`totalChecks` 240; `noExplorer` 4 = same non-explorer route × 4 VPs) |
| Cannabis Retail | 5 states × 4 viewports — **PASS** |
| Cannabis Producer | 6 states × 4 viewports — **PASS** |

Adding the two Cannabis routes to `ROUTE_TO_INTERACTIVE_MASTER_FILE` intentionally expands auto-discovered regression inventory. Historical **228/228** remains the frozen-era reference; the new expected full-suite pass count is **236/236**. Cannabis states are also verified separately by `verify-cannabis-products.cjs`.

---

## U. Responsive QA

Verifier captured full-page screenshots and asserted no horizontal overflow at 390 / 768 / 1024 / 1440 for both routes; H1 + Explorer present; CTA text present.

---

## V. Frozen baseline check

| Check | Result |
|-------|--------|
| Existing frozen product copy changed | **NO** |
| Homepage nav changed | **NO** |
| Mega-menu changed | **NO** |
| Mobile nav changed | **NO** |
| Commercial Hub changed | **NO** |
| Explorer runtime changed | **NO** |
| Images generated | **NO** |
| Scanner rules changed | **NO** |

---

## W. Remaining TODOs

1. **CANNABIS RETAIL EXPLORER IMAGE:** dedicated final artwork before launch  
2. **CANNABIS PRODUCER EXPLORER IMAGE:** dedicated final artwork before launch  
3. Dedicated hero photography for both routes  
4. Navigation reconciliation / discovery surfaces after factual approval  
5. Owner **literal factual gate** on regulatory/contractual claims (especially OCS $5M)  
6. Optional: replace temporary manufacturing Explorer master for Producer ASAP  

---

## X. Ready for literal factual gate

**YES — ready for owner literal factual gate / review.**  
**NOT ready to merge, deploy, or launch** (temporary visuals + nav still deferred; STOP for owner review).
