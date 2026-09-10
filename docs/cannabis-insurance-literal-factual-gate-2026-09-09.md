# Cannabis Insurance — Phase 3 Literal Factual Gate

**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Research commit:** `5b1b3d2`  
**Implementation commit:** `382b6d9`  
**Dump:** `docs/cannabis-literal-factual-dump-2026-09-09.txt`  
**Dump script:** `scripts/dump-cannabis-literal-claims.ts`

This gate is **not a rewrite**. Copy was changed only where blocking visitor-facing precision issues existed.

---

## A. Gate base

| Item | Value |
|------|--------|
| Routes | `/cannabis-retail-insurance/`, `/cannabis-producer-insurance/` |
| Frozen 58 | Unchanged (A42 / B16 / C0 / D0) |
| Site inventory | 60 routes |
| Extraction | Resolved `getPilotCommercialConfig()` + photography alt + jsonLd |
| Authoritative sources re-checked | OCS Wholesale Authorized Cannabis Retailers Handbook (Feb 2026); *Cannabis Act* s. 76 (current to 2026-06-21); *Cannabis Regulations* s. 46 (current to 2026-06-21; last amended 2026-06-04); Health Canada licence-class pages; Phase 1 research register |

---

## B. Literal dump summary

| Route | Explorer | Considerations | FAQs | Dump section-word sum |
|-------|----------|----------------|------|------------------------|
| Retail | 5 | 8 | 5 | 1,485 |
| Producer | 6 | 9 | 5 | 1,560 |

- Truncation: **NO**
- Blank visitor fields: **NONE**
- Dump includes: meta, composed eyebrow (`Commercial Insurance · Windsor-Essex`), H1, hero, trust band, coverage intro, RIGHT/LEFT Explorer, visual captions, considerations, shared commercial broker steps, related-product labels/hrefs, FAQs, CTA, jsonLd, hero alt text
- Source `whoItIsFor` is dumped as unused industry-data (page renders the shorter trust-band override)

---

## C. Cannabis Retail verdict

**CLEAN after 3 blocking precision fixes.**  
Coverage, AGCO/OCS distinction, crime split, BI trigger, and product-liability vs recall are factually supportable.

Remaining flags are **LOW** (supported OCS $5M numeric citations caught by the scanner; not blocking).

**FREEZE** (content). Visuals remain temporary and are a **separate** gate.

---

## D. Cannabis Producer verdict

**CLEAN after 1 blocking precision fix** (internal “Explorer state” jargon removed from pollution consideration).

Licence-class language, living-plant vs property, EB, recall vs liability, and BI triggers are factually supportable. One **LOW** vernacular use of “Licensed producers” remains (not presented as the current federal licence-class name; same FAQ hedges by licence class).

**FREEZE** (content). Visuals remain temporary.

---

## E. OCS $5M special gate

### Visitor-facing occurrences of $5M / additional insured / COI

#### Occurrence 1

| Field | Value |
|-------|--------|
| **EXACT VISITOR COPY** | “The Cannabis Licence Act and O. Reg. 468/18 do not impose a statutory minimum insurance dollar limit. Separately, OCS retailer agreements commonly require commercial general liability of at least $5 million per occurrence, with specified coverages and OCS named as an additional insured, before wholesale ordering — confirm the current agreement and certificate form rather than assuming every policy automatically matches.” |
| **LOCATION** | Retail consideration: “OCS contractual insurance vs statutory insurance” |
| **SOURCE** | OCS Wholesale Authorized Cannabis Retailers Handbook (February 2026), insurance-requirements section citing Retailer Agreement s. 16.1; OCS Licensed Retailers COI form / onboarding materials |
| **SOURCE DATE** | Handbook Feb 2026; COI form family 2024–; re-verified 2026-09-10 |
| **EXACT SOURCE SUPPORT** | Handbook: CGL “not less than five million dollars ($5,000,000) per occurrence, including non-owned automobile, as well as products and completed operations, employer’s liability, personal and advertising liability, and severability of interests and cross liability”; OCS named additional insured and certificate holder; documents required before placing orders |
| **CONTRACTUAL / STATUTORY / REGULATORY** | **Contractual** (OCS retailer agreement / handbook) — **not** AGCO/CLA statute |
| **CURRENT** | Yes (Feb 2026 handbook still published) |
| **WORDING ACCURATE** | **YES** — “commonly require” + “at least $5 million” + additional insured + before ordering; list of other coverages not overstated here |
| **HEDGE SUFFICIENT** | **YES** — confirm current agreement/COI; not every policy automatically matches |
| **BLOCKING FIX REQUIRED** | **NO** (numeric claim retained) |

#### Occurrence 2

| Field | Value |
|-------|--------|
| **EXACT VISITOR COPY** | “OCS retailer agreements are contractual. Current OCS retailer handbook materials describe commercial general liability of not less than $5 million per occurrence, including specified coverages such as non-owned automobile and products/completed operations, with OCS named as an additional insured / certificate holder before ordering. Confirm the live agreement and COI form — meeting OCS paperwork is not the same as proving every cannabis claim is covered.” |
| **LOCATION** | Retail FAQ: “What is the OCS insurance requirement?” |
| **SOURCE** | Same Feb 2026 handbook |
| **SOURCE DATE** | Feb 2026 / re-verified 2026-09-10 |
| **EXACT SOURCE SUPPORT** | Same as above. “Such as” correctly avoids claiming the handbook list is exhaustive in visitor copy (handbook also names employer’s liability, personal/advertising, severability/cross liability). |
| **CONTRACTUAL / STATUTORY / REGULATORY** | **Contractual** |
| **CURRENT** | Yes |
| **WORDING ACCURATE** | **YES** |
| **HEDGE SUFFICIENT** | **YES** |
| **BLOCKING FIX REQUIRED** | **NO** |

### Adjacent additional-insured / certificate copy (no $5M)

| Location | Copy function | Verdict |
|----------|---------------|---------|
| Retail GL LEFT | Additional-insured requests must match what the policy can support | **CLEAN** — does not claim AI is automatic |
| Retail landlord consideration | Certificate does not expand coverage | **CLEAN** |
| Retail FAQ “typically need” | Landlord and OCS schedules *may* add limits/AI | **CLEAN** |

### Forbidden implications — confirmed absent

| Forbidden implication | Present? |
|-----------------------|----------|
| AGCO requires $5M CGL | **NO** |
| Ontario statute requires $5M CGL | **NO** — CLA / O. Reg. 468/18 explicitly distinguished |
| Cannabis Licence Act itself imposes the OCS contractual requirement | **NO** |
| Every cannabis policy automatically satisfies the OCS agreement | **NO** — opposite is stated |
| $5M is universally sufficient for every retailer | **NO** |
| Additional-insured wording is automatic | **NO** |

**OCS $5M: SUPPORTED** (retained; scanner LOW flags remain by design).

---

## F. AGCO / OCS distinction

| Statement class | Verdict |
|-----------------|---------|
| AGCO licensing ≠ insurance policy | **CLEAN** |
| ROL / RSA / CRM “where required” | **CLEAN** — does not imply every individual needs every licence |
| CLA / O. Reg. 468/18 do not impose a statutory insurance dollar minimum | **CLEAN** after removing “research for this site / this implementation’s research” process language |
| OCS requirement framed as contractual | **CLEAN** |
| CGL does not automatically satisfy OCS/landlord schedules | **CLEAN** |

**AGCO vs OCS: CLEAN**

---

## G. Retail regulatory claims

| Topic | Visitor treatment | Primary support | Verdict |
|-------|-------------------|-----------------|---------|
| ROL / RSA / CRM | Named as licences that “regulate who may operate a store and how”; CRM “where required” | AGCO cannabis retail licensing | **CLEAN** |
| Security / storage / advertising / age controls | Named as licensing topics, not insurance grants; **no 19+ or 30-day retention dump** | Registrar’s Standards (research rows 14–15) | **CLEAN** — exact numeric regulatory details omitted (preferable; avoids avoidable precision risk) |
| Surveillance | Underwriting/security context only | Registrar’s Standards 2.0 | **CLEAN** |
| OCS sourcing | “products arrive through OCS” (conditional); not a cargo myth | CLA s. 19 | **CLEAN** |
| Delivery | “Where lawful delivery… commercial auto or HNOA may be needed” | CLA s. 20 (delivery permitted subject to rules) | **CLEAN** |
| 19+ / 30-day CCTV | Not stated in visitor copy | — | **CLEAN** (not dumped) |

---

## H. Producer federal regulatory claims

| Topic | Visitor treatment | Primary support | Verdict |
|-------|-------------------|-----------------|---------|
| Page title “Cannabis Producer Insurance” | Insurance product name, not a licence class | Owner decision N; research SEO | **CLEAN** |
| Licence classes: standard/micro cultivation, nursery, standard/micro processing | Named as classes that are **not identical** | Health Canada “Types of cannabis licences” | **CLEAN** |
| “Health Canada–licensed cultivators, nursery operators, and processors” | Matches current class vocabulary | Same | **CLEAN** |
| “Licensed producers commonly review…” (FAQ) | Insurance vernacular; same answer says needs vary by licence class | Legacy “LP” term is **not** the current class name | **LOW** — not blocking; does not assert LP is the licence class |
| Good Production Practices = compliance, not coverage | Explicit | Cannabis Regulations GPP framework | **CLEAN** |
| Recall control systems + simulations | Stated as regulatory duty | *Cannabis Regulations* s. 46(1)–(2) (simulation at least once every 12 months) | **CLEAN** — copy does not over-specify the 12-month interval |
| Minister may order a recall | Stated | *Cannabis Act* s. 76 (current to 2026-06-21) | **CLEAN** |
| Physical-security matrices differ by class | Hedged “do not share identical…” | HC physical-security comparison tables | **CLEAN** |

---

## I. Property / stock / crop

| Claim | Verdict |
|-------|---------|
| Ordinary property does not automatically treat retail cannabis inventory like general merchandise | **CLEAN** |
| No universal valuation / coinsurance hedge on retail stock | **CLEAN** |
| Living plants / seedlings / harvested / WIP / finished goods distinguished on Producer | **CLEAN** |
| Ordinary property not assumed to cover living plants | **CLEAN** |
| “Specialty cannabis or crop-oriented terms — where offered” | **LOW** — hedged; does **not** say agricultural crop-insurance programs automatically apply |
| No selling-price / ACV / agreed-value universal method | **CLEAN** |

---

## J. Equipment Breakdown

Producer EB is **where purchased / typically not automatic**. Copy excludes wear/tear, poor maintenance, and “every consequential crop loss”; spoilage/crop/BI after breakdown “often need explicit extensions.”

**CLEAN.** No implication that EB is included, or that it automatically pays crop, spoilage, or BI.

Retail: EB is not a core Explorer state (correct).

---

## K. Product Liability / Recall

| Page | Treatment | Verdict |
|------|-----------|---------|
| Retail | Products-completed ops **may** respond to allegations; not every allegation; **not** recall expense | **CLEAN** |
| Producer | Same liability hedge; extracts/edibles tighter appetite (insurer-specific, hedged) | **CLEAN** |
| Producer recall Explorer | First-party expense **where purchased**; distinct from Health Canada duties and from CGL | **CLEAN** |
| Regulatory recall ≠ insurance cheque | Explicit | **CLEAN** |
| CGL automatic withdrawal/disposal/replacement | Explicitly **not** | **CLEAN** |

---

## L. Business Interruption

Both pages tie BI to a **covered direct physical loss** / purchased form, with waiting periods.

Explicitly **not** automatic for: licence suspension, regulatory shutdown alone, OCS supply delay (Retail), contamination without insured damage, recall decisions, equipment failure without the right forms, supplier interruption unless a contingent endorsement applies.

**CLEAN.**

---

## M. Crime / Cyber / Pollution / Auto

| Topic | Verdict |
|-------|---------|
| Retail crime: property theft/robbery vs employee dishonesty vs social engineering/funds-transfer | **CLEAN** — not collapsed |
| Cash as distinct exposure | **CLEAN** |
| Cyber: property/CGL typically do not fully address; cyber where purchased | **CLEAN** |
| Pollution: “CGL forms **often restrict**” — not “never covers” | **CLEAN** after removing Explorer-jargon |
| Transit: do not assume CGL/building property covers goods in transit | **CLEAN** |
| Retail delivery: lawful-delivery hedge; premises liability not auto | **CLEAN** |

---

## N. Cross-links

| From | href | Exists? |
|------|------|---------|
| Retail related | `/retail-insurance/` | YES |
| Retail related | `/commercial-property-insurance/` | YES |
| Retail related | `/crime-fidelity-insurance/` | YES |
| Retail related | `/product-recall-insurance/` | YES |
| Retail related | `/business-interruption-insurance/` | YES |
| Producer related | `/manufacturing-insurance/` | YES |
| Producer related | `/greenhouse-agribusiness-insurance/` | YES |
| Producer related | `/product-recall-insurance/` | YES |
| Producer related | `/pollution-liability-insurance/` | YES |
| Producer related | `/business-interruption-insurance/` | YES |
| Retail consideration prose | cyber insurance page (`/cyber-insurance/` exists) | YES (prose, not related-rail) |
| Shared broker CTA | `/talk-to-a-broker/`, `/get-a-quote?type=business` | YES |

**No dead/misdirected links. Destination pages not modified.**

---

## O. SEO / metadata

| Field | Retail | Producer | Verdict |
|-------|--------|----------|---------|
| metaTitle | Cannabis Retail Insurance in Windsor-Essex \| Premium Insurance Brokers | Cannabis Producer Insurance in Windsor-Essex \| … | **CLEAN** |
| metaDescription | Authorized stores; independent Windsor-Essex broker | Health Canada–licensed cultivation/nursery/processing | **CLEAN** |
| H1 | Cannabis Retail Insurance | Cannabis Producer Insurance | **CLEAN** |
| jsonLd | Service name + metaDescription + areaServed Windsor-Essex | Same pattern | **CLEAN** |
| “dispensary” / best / leading / savings / instant quote / carrier count / expertise history | Absent | Absent | **CLEAN** |

Composed eyebrow: `Commercial Insurance · Windsor-Essex` (shared commercial pattern, not a cannabis-expertise claim).

---

## P. Production fixes

Four **blocking** visitor-copy leaks/process-language issues. Smallest possible wording changes. Explorer IDs, slugs, nav, images, runtime, frozen 58: **unchanged**.

### Fix 1

| | |
|--|--|
| **ROUTE** | `/cannabis-retail-insurance/` |
| **FIELD** | considerations — OCS vs statutory |
| **BEFORE** | “Research for this site found no AGCO / Cannabis Licence Act / O. Reg. 468/18 statutory minimum insurance limit. Separately, OCS retailer agreements commonly require…” |
| **AFTER** | “The Cannabis Licence Act and O. Reg. 468/18 do not impose a statutory minimum insurance dollar limit. Separately, OCS retailer agreements commonly require…” |
| **WHY** | “Research for this site” is process language, not visitor copy. Negative statutory finding is research-supported and should be stated as such. |
| **SOURCE** | Phase 1 factual-risk register row 1; CLA / O. Reg. 468/18 insurance-minimum search |

### Fix 2

| | |
|--|--|
| **ROUTE** | `/cannabis-retail-insurance/` |
| **FIELD** | FAQ — “Does AGCO require a minimum insurance limit?” |
| **BEFORE** | “…This implementation’s research did not locate a statutory AGCO / Cannabis Licence Act / O. Reg. 468/18 minimum insurance dollar limit.…” |
| **AFTER** | “…The Cannabis Licence Act and O. Reg. 468/18 do not impose a statutory minimum insurance dollar limit.…” |
| **WHY** | “This implementation’s research” is QA/process language. Same supported negative finding, visitor-facing. |
| **SOURCE** | Same as Fix 1 |

### Fix 3

| | |
|--|--|
| **ROUTE** | `/cannabis-retail-insurance/` |
| **FIELD** | considerations — product recall |
| **BEFORE** | “…Cross-link our product recall page when expense coverage is in scope.” |
| **AFTER** | “…See our product recall insurance page when expense coverage is in scope.” |
| **WHY** | Leaked implementation instruction (“Cross-link”) is not visitor language. |
| **SOURCE** | Owner decision H (Retail recall is supporting/cross-link only) |

### Fix 4

| | |
|--|--|
| **ROUTE** | `/cannabis-producer-insurance/` |
| **FIELD** | considerations — pollution |
| **BEFORE** | “…Pollution liability may be reviewed as a supporting coverage — not every producer needs a dedicated Explorer state, but chemical and waste handling should be disclosed. See our pollution liability page.” |
| **AFTER** | “…Pollution liability may be reviewed as a supporting coverage when chemical and waste handling is material. See our pollution liability page.” |
| **WHY** | “Explorer state” is internal Coverage Explorer architecture jargon. |
| **SOURCE** | Owner decision K (pollution supporting/cross-link) |

---

## Q. Validation

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS (both cannabis routes emitted) |
| Content audit | **60 routes — A44 / B16 / C0 / D0** |
| Frozen 58 | **A42 / B16 / C0 / D0** unchanged |
| Cannabis Retail | **A** (4 scanner LOW on supported OCS $5M citations) |
| Cannabis Producer | **A** (0 scanner flags) |
| `scripts/verify-cannabis-products.cjs` | **PASS** (5/5 and 6/6 V2; nav unchanged) |
| Explorer regression | **236/236 PASS** (0 fail; 4 no-explorer checks on the same non-explorer route as historical inventory) |
| Scanner rules | **Not weakened** |

---

## R. Image status

| Route | Explorer | Hero | Status |
|-------|----------|------|--------|
| Cannabis Retail | On-disk `cannabis-retail-insurance-interactive-master.png` (Phase-2 stand-in; **not** approved final art) | TEMPORARY reuse of `retail-insurance.webp`; alt discloses stand-in | **TEMPORARY VISUAL — dedicated Explorer + hero imagery still required** |
| Cannabis Producer | TEMPORARY reuse of `manufacturing-insurance-interactive-master.png` | TEMPORARY reuse of `manufacturing-insurance.webp`; alt discloses stand-in | **TEMPORARY VISUAL — dedicated Explorer + hero imagery still required** |

**Images were not changed in this gate.**  
Content freeze ≠ launch readiness ≠ visual approval.

---

## S. Freeze decision

| Route | Factual | Content freeze | Visual | Nav |
|-------|---------|----------------|--------|-----|
| Cannabis Retail | **CLEAN** | **FREEZE** | Not approved | Not in this gate |
| Cannabis Producer | **CLEAN** | **FREEZE** | Not approved | Not in this gate |

**READY TO FREEZE CANNABIS CONTENT: YES**  
**READY FOR DEDICATED VISUALS: YES** (content is stable enough to brief/produce dedicated art)  
**READY FOR NAVIGATION RECONCILIATION: NO** (until visuals are completed/approved)

---

## Remaining non-blocking LOW items (left in place)

1. Scanner LOW ×4 on two supported OCS $5M sentences (consideration + FAQ; dollar + numeric-limit rules). Accurate contractual citations; **do not weaken scanner**.
2. Producer FAQ “Licensed producers commonly review…” — insurance vernacular on a page titled Cannabis Producer Insurance; not asserted as the current Health Canada licence-class name; same answer hedges by class.
3. Producer crop LEFT “specialty cannabis or crop-oriented terms — where offered” — hedged; does not import agri crop-insurance programs.

No HIGH. No MEDIUM remaining. No remaining BLOCKING.
