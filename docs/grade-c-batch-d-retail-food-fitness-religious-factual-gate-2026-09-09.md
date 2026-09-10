# Grade C Batch D — Retail / Grocery / Fitness / Religious — Phase 3 Factual Gate

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Implementation commit:** `664c9d4`  
**Research commit:** `ea6a05b`  
**Factual gate date:** 2026-09-09  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `664c9d4` (contains Batch D implementation commit) |
| **STATUS** | Pre-existing dirty QA screenshots + `docs/product-content-audit-2026-09-07.md` (not touched). **No unexpected `src/` modifications.** |
| **Primary carrier worktree** | Untouched |

---

## B. Literal dump stats

**Script:** `scripts/dump-grade-c-batch-d-literal-claims.ts`  
**Output:** `docs/qa-screenshots/grade-c-batch-d-2026-09-09/literal-claim-dump.txt`

| Metric | Expected | Actual |
|--------|----------|--------|
| **CHAR COUNT** | — | **84,152** |
| **ROUTES** | 4 | **4** |
| **FAQ COUNT** | 20 | **20** |
| **CONSIDERATION COUNT** | 32 | **32** |
| **EXPLORER STATE COUNT** | 16 | **16** |
| **TRUNCATION** | None | **None** |
| **BLANK FAQ ANSWERS** | 0 | **0** |

Extraction source: `getPilotCommercialConfig()` — resolved source strings identical to rendered pages.

---

## C. Retail factual gate

**Verdict: CLEAN**

### Property / inventory / valuation

| Check | Result |
|-------|--------|
| Property response policy-dependent ("May help cover… subject to") | **PASS** |
| Employee dishonesty distinguished from external theft | **PASS** — crime/fidelity endorsement noted |
| No automatic selling-price valuation | **PASS** — "only where that valuation condition applies" |
| BI requires covered physical-loss trigger | **PASS** — "covered direct physical loss" |
| E-commerce/cyber not automatic in base retail | **PASS** — separate commercial product |
| Product liability not guaranteed | **PASS** — "may help address certain claims" |
| Delivery auto/HNOA separate from premises | **PASS** |

### Explorer (4/4)

| ID | Assessment |
|----|------------|
| `general-liability` | **CLEAN** — premises vs products framing |
| `property-inventory-coverage` | **CLEAN** — RC/ACV/sold stock hedged; crime distinction |
| `business-interruption` | **CLEAN** — covered physical-loss trigger |
| `product-liability` | **CLEAN** — recall expense cross-link; not automatic |

### Issues found

**Blocking:** 0  
**Optional LOW (non-blocking):** metaDescription lists component coverages without "optional/where purchased" — acceptable SEO compression; hero and body carry full hedges.

---

## D. Grocery / Specialty Food factual gate (highest precision)

**Verdict: CLEAN**

### Spoilage / refrigeration sentence register

| FIELD | EXACT WORDING (excerpt) | TRIGGER IMPLIED | POLICY-DEPENDENT | SAFE | ACTION |
|-------|-------------------------|-----------------|------------------|------|--------|
| heroLead | "Spoilage does not automatically respond because food became unusable" | Denies automatic spoilage | Yes | **YES** | KEEP |
| heroLead | "equipment breakdown, utility interruption, and off-premises power failure follow different triggers" | Distinct triggers | Yes | **YES** | KEEP |
| spoilage RIGHT | "Where purchased as a spoilage or equipment-breakdown endorsement, may address certain loss…" | Endorsement required | Yes | **YES** | KEEP |
| spoilage LEFT | "Perishable inventory loss does not automatically respond under base property" | Denies automatic | Yes | **YES** | KEEP |
| spoilage LEFT | "Spoilage endorsements… typically cover named perishable stock only" | When endorsement purchased | Yes | **YES** | KEEP — optional LOW: "may cover" instead of "typically cover" |
| spoilage LEFT | "on-premises power interruption may be covered only where the spoilage endorsement schedules that cause" | Scheduled cause only | Yes | **YES** | KEEP |
| spoilage LEFT | "Off-premises utility failure often requires separate utility-services… endorsements" | Separate endorsement | Yes | **YES** | KEEP |
| property RIGHT | "Mechanical refrigeration failure and spoilage typically require separate endorsements" | Separate from base property | Yes | **YES** | KEEP |
| FAQ spoilage | "Perishable stock loss is not automatic because food became unusable" | Denies automatic | Yes | **YES** | KEEP |
| FAQ spoilage | "Equipment breakdown and off-premises utility failure follow different triggers" | Distinct | Yes | **YES** | KEEP |

**Confirmed absent:** automatic spoilage on cooler failure; EB automatically includes spoilage; utility/off-premises power automatically covers stock; CGL pays recall expense; AGCO liquor-liability insurance mandate; delivery covered under property/CGL.

### Product liability vs recall

| Location | Distinction clear? |
|----------|-------------------|
| Explorer `product-liability` | **YES** — recall on product recall page |
| Consideration | **YES** — first-party recall separate |
| FAQ #3 | **YES** — "No — product recall… separate first-party coverage" |
| Body copy | **YES** — "does not automatically pay recall costs" |

### AGCO / delivery

| Claim | Safe? |
|-------|-------|
| AGCO Grocery Store Licence may exist | **YES** — regulatory |
| AGCO does not prescribe named liquor-liability insurance product | **YES** — matches restaurant standard |
| Delivery needs commercial auto | **YES** — separate from store liability |

### Explorer (4/4)

| ID | Assessment |
|----|------------|
| `commercial-property-inventory` | **CLEAN** — EB/spoilage separate from base property |
| `spoilage-refrigeration-breakdown` | **CLEAN** — highest scrutiny; endorsement/trigger precision adequate |
| `product-liability` | **CLEAN** — illness/allergen hedged; recall distinct |
| `general-liability` | **CLEAN** — premises vs products; AGCO hedged |

### Issues found

**Blocking:** 0  
**Optional LOW:** metaDescription lists "spoilage and refrigeration endorsements" without "optional" — heroLead compensates.

---

## E. Fitness / Gym factual gate

**Verdict: CLEAN**

| Check | Result |
|-------|--------|
| GL does not absorb professional/instruction allegations | **PASS** — repeated in hero, GL LEFT, professional RIGHT/LEFT, FAQ |
| Professional liability policy-dependent | **PASS** — "May help address certain claims… subject to" |
| Waivers do not prevent lawsuits | **PASS** — hero, consideration, FAQ |
| Waivers do not replace insurance | **PASS** |
| Waivers enforceability not guaranteed | **PASS** — "do not guarantee enforceability" |
| Occupiers' Liability Act reference | **PASS** — "principles under" / risk-management context; no legal advice |
| Abuse/molestation not automatic on CGL | **PASS** — "Not automatic on general liability" |
| Intentional criminal conduct not insured | **PASS** — organizational response vs perpetrator indemnification |

### Explorer (4/4)

| ID | Assessment |
|----|------------|
| `general-liability` | **CLEAN** — premises vs instruction split |
| `professional-liability` | **CLEAN** — core concept; GL ≠ professional explicit |
| `commercial-property` | **CLEAN** — optional causes of loss |
| `sexual-abuse-misconduct` | **CLEAN** — "Where Available"; not automatic; perpetrator carve-out in LEFT |

### Issues found

**Blocking:** 0

---

## F. Religious Organizations factual gate

**Verdict: CLEAN**

| Check | Result |
|-------|--------|
| "Critical coverage" absent | **PASS** |
| "typically require" mandatory abuse tone absent | **PASS** |
| Abuse not automatic on CGL | **PASS** |
| Not described as mandatory | **PASS** — "not a statutory insurance requirement" |
| Intentional criminal conduct not insured | **PASS** — abuse LEFT explicit |
| Volunteers not automatically insured | **PASS** — hero, consideration, FAQ |
| No universal WSIB statement | **PASS** — "depends on… classification"; "generally not WSIB-covered" |
| Pastoral counselling distinct from GL | **PASS** — "Where Included"; professional vs premises |
| D&O cross-link without Side A/B/C duplication | **PASS** — consideration mentions + link to D&O route |
| Hall rentals not universally included | **PASS** — renter liability; certificates contractual |
| Faith-neutral framing | **PASS** — churches, mosques, synagogues, temples |

### Explorer (4/4)

| ID | Assessment |
|----|------------|
| `commercial-property` | **CLEAN** — heritage/RC assumptions hedged |
| `general-liability` | **CLEAN** — events/rentals hedged |
| `pastoral-counselling-liability` | **CLEAN** — credentials/wording conditional |
| `abuse-molestation` | **CLEAN** — "Where Available"; perpetrator carve-out |

### Issues found

**Blocking:** 0

---

## G. Absolute-language review

Manual review of: always, never, must, required, mandatory, automatically, included, covers, protects, will cover, will pay, pays, guarantees, all, every, any, fully, prevents, ensures.

### Material occurrences (all safe in context)

| ROUTE | FIELD | WORDING | SAFE | HEDGED | ACTION |
|-------|-------|---------|------|--------|--------|
| Retail | property LEFT | "typically requires a crime or fidelity endorsement" | **YES** | Refers to product structure for employee dishonesty, not statutory mandate | KEEP |
| Retail | crime consideration | "typically require crime or fidelity coverage" | **YES** | Same — product distinction | KEEP |
| Grocery | spoilage LEFT | "typically cover named perishable stock only" | **YES** | Scoped to purchased spoilage endorsement after automatic-denial lead | KEEP (optional LOW tighten) |
| Grocery | GL LEFT | "typically fall under products liability" | **YES** | Claim-framing hedge | KEEP |
| Fitness | hero | "do not prevent lawsuits" | **YES** | Correct waiver limitation | KEEP |
| Fitness | hero | "do not guarantee enforceability" | **YES** | Correct waiver limitation | KEEP |
| Religious | hero | "not a statutory insurance requirement" | **YES** | Denies mandatory abuse coverage | KEEP |
| Religious | volunteer FAQ | "may require WSIB registration depending on…" | **YES** | Conditional on classification | KEEP |

**Mechanical flags avoided:** "May help cover" card openings; "where purchased"; "subject to policy terms" throughout.

**Categorical "Covers/Protects/Critical/typically require abuse":** **ABSENT** (Phase 2 fixes verified).

---

## H. Numeric / legal / regulatory register

| ROUTE | FIELD | CLAIM | TYPE | SOURCE | HEDGE | SAFE | KEEP/TIGHTEN |
|-------|-------|-------|------|--------|-------|------|--------------|
| Grocery | consideration | O. Reg. 493/17 may apply where food prepared/served | REGULATORY | HPPA; O. Reg. 493/17 | Regulatory ≠ insurance | **YES** | KEEP |
| Grocery | spoilage LEFT | CP 04 40 pattern reference | POLICY-MECHANICS | Common commercial property endorsement | Form-specific | **YES** | KEEP |
| Grocery | GL LEFT / consideration | AGCO Grocery Store Licence; no named liquor-liability insurance product | REGULATORY | AGCO grocery guides | No insurance mandate | **YES** | KEEP |
| Fitness | hero / consideration / FAQ | Occupiers' Liability Act principles | LEGAL | OLA R.S.O. 1990 c. O.2 | "principles"; no legal advice | **YES** | KEEP |
| Fitness | hero / FAQ | Waivers do not prevent lawsuits / guarantee enforceability | LEGAL | OLA + case law context | Explicit negation | **YES** | KEEP |
| Religious | hero / consideration / FAQ | Volunteers generally not WSIB-covered; paid staff may require registration | REGULATORY | WSIA; WSIB guidance | "generally"; "depending on" | **YES** | KEEP |
| Religious | hero | Abuse not statutory insurance requirement | REGULATORY | No Ontario faith-community insurance mandate | Explicit denial | **YES** | KEEP |
| Retail | property LEFT / consideration | RC/ACV/selling price valuation | POLICY-MECHANICS | Commercial property forms | Form/endorsement dependent | **YES** | KEEP |

**Dollar amounts / percentages:** **NONE** on Batch D routes. **SAFE.**

---

## I. Meta / SEO precision

| Route | metaDescription concern | Verdict |
|-------|------------------------|---------|
| Retail | Lists liability/property/BI/products without "optional" | **LOW** — hero carries full hedges; not blocking |
| Grocery | Lists spoilage endorsements without "optional" | **LOW** — hero denies automatic spoilage |
| Fitness | Lists GL/professional/property/abuse | **ACCEPTABLE** — "where available" for abuse in meta |
| Religious | Lists worship property/liability/counselling/abuse | **ACCEPTABLE** — "where available" for abuse in meta |

**Blocking meta issues:** 0

---

## J. Explorer V2 literal review

**16/16 technical IDs preserved.** RIGHT = WHAT · LEFT = WHY structure correct on all states.

| Route | Result |
|-------|--------|
| **RETAIL** | **4/4 CLEAN** |
| **GROCERY** | **4/4 CLEAN** — `spoilage-refrigeration-breakdown` passes highest-precision gate |
| **FITNESS** | **4/4 CLEAN** — GL/professional/abuse scrutiny passed |
| **RELIGIOUS** | **4/4 CLEAN** — abuse/pastoral scrutiny passed |

Short Explorer card copy is **not more categorical** than body copy — cards use "May help… subject to" pattern throughout.

---

## K. Cross-page consistency

| Comparison | Contradiction? |
|------------|----------------|
| Retail vs Small Business | **NO** — SMB hub; retail storefront/inventory focus |
| Retail vs Commercial Property | **NO** — CP deep-dive; retail package entry |
| Retail vs Convenience Store | **NO** — c-store fuel/crime; retail general merchandise |
| Grocery vs Restaurant | **NO** — limited prep vs prepared-food/service; AGCO standards aligned |
| Grocery vs Product Recall | **NO** — PL third-party vs recall first-party expense |
| Grocery vs Retail | **NO** — perishable/spoilage vs general merchandise |
| Fitness vs Professional Liability | **NO** — PL broad E&O; fitness instruction/participant context |
| Fitness vs Commercial Property | **NO** — equipment as one Explorer state |
| Religious vs Non-Profit | **NO** — worship/faith vs charitable governance |
| Religious vs D&O | **NO** — cross-link only; no Side A/B/C duplication |
| Religious vs Crime/Fidelity | **NO** — donations/dishonesty mention; crime route for deep-dive |

**Exact contradictions:** None.

---

## L. Visual-semantic review

| Route | Archetype / family | Rating | Blocks freeze? |
|-------|-------------------|--------|----------------|
| Retail | `retail-cutaway` / `retail` | **GOOD** | No |
| Grocery | `retail-cutaway` / `restaurant-hospitality` | **ACCEPTABLE** | No — owner pre-approved |
| Fitness | `gym-studio` + dedicated master | **GOOD** | No |
| Religious | `church-campus` + dedicated master | **GOOD** | No |

**MISLEADING states:** None. Grocery visual remains future polish item only.

---

## M. Route verdicts

| Route | Verdict | Blocking fixes |
|-------|---------|----------------|
| **RETAIL** | **CLEAN** | 0 |
| **GROCERY** | **CLEAN** | 0 |
| **FITNESS** | **CLEAN** | 0 |
| **RELIGIOUS** | **CLEAN** | 0 |

### Optional non-blocking precision notes (2)

| ROUTE | FIELD | EXACT WORDING | WHY | RECOMMENDED NARROW FIX |
|-------|-------|---------------|-----|------------------------|
| Grocery | spoilage LEFT | "typically cover named perishable stock only" | Slightly stronger than surrounding "may" pattern | Optional: "may cover… when purchased" |
| Grocery | metaDescription | Lists spoilage endorsements without "optional" | SEO compression | Optional: add "optional" if meta retouched later |

**Owner decision required for optional notes:** No — not blocking freeze.

---

## N. Freeze decision

| Route | Decision |
|-------|----------|
| Retail | **FREEZE** |
| Grocery / Specialty Food | **FREEZE** |
| Fitness / Gym | **FREEZE** |
| Religious Organizations | **FREEZE** |

| Gate | Result |
|------|--------|
| **BATCH D READY TO FREEZE** | **YES** |
| **FIELDS REQUIRING FIX** | **0** |
| **BUILD** | **PASS** |
| **TSC** | **PASS** |
| **CONTENT AUDIT** | **A40 / B16 / C2 / D0** — Batch D routes 4/4 Grade A, 0 HIGH, 0 MED |
| **EXPLORER REGRESSION** | **228/228 PASS** |
| **BATCH VERIFIER** | **4/4 PASS** |

### Pre-commit confirmation

| Check | Result |
|-------|--------|
| PRODUCTION COPY CHANGED | **NO** |
| EXPLORER RUNTIME CHANGED | **NO** |
| IMAGES CHANGED | **NO** |
| SCANNER CHANGED | **NO** |
| FROZEN ROUTES CHANGED | **NO** |

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or promote preview to production.
