# Grade C Batch C — Auto / Garage / Environmental / Farm — Phase 3 Factual Gate

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Implementation commit:** `1e61c5d`  
**Research commit:** `b96c774`  
**Factual gate date:** 2026-09-09  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

---

## A. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `1e61c5d` (contains implementation commit) |
| **STATUS** | Pre-existing dirty QA screenshots + `docs/product-content-audit-2026-09-07.md` (not touched). No unexpected `src/` modifications beyond Phase 2 commit. |
| **Primary carrier worktree** | Untouched |

---

## B. Build / TSC root cause + fix

### Reproduction (before fix)

```
FILE: scripts/dump-grade-c-batch-b-literal-claims.ts
LINE: 90
COLUMN: 33, 62
TS ERROR: TS2339
PROPERTY: title, description (accessed)
INFERRED TYPE: ProductBrokerStep
```

**Root cause:** The Batch B QA dump script was written using property names `title` and `description` on broker steps. Production type `ProductBrokerStep` (in `src/types/pilot-product.ts`) defines `{ id, label, detail }` — not `title`/`description`. This was a **script authoring error at Batch B factual gate**, not a production type evolution or route-data shape change.

**Why it surfaced now:** Next.js 16 build runs full-project `tsc`; the script had never been corrected after `ProductBrokerStep` was defined with `label`/`detail`.

### Fix applied

```typescript
// Before (line 90):
out += `[${i}] title: ${s.title}\n    description: ${s.description}\n`;

// After:
out += `[${i}] label: ${s.label}\n    detail: ${s.detail}\n`;
```

**Production impact:** NONE — QA script only.

### Post-fix validation

| Check | Result |
|-------|--------|
| **TSC** | **PASS** (`npx tsc --noEmit`) |
| **BUILD** | **PASS** (`npm run build`) |

---

## C. Commit `1e61c5d` file-scope audit

### Files by category

| Category | Count | Files |
|----------|------:|-------|
| **PRODUCTION DATA** | 3 | `commercial-industries.ts`, `commercial-products-industry.ts`, `pilot-commercial-inline.ts` |
| **SHARED PRODUCTION HELPER** | 2 | `buildPilotProductConfig.ts`, `createPilotCommercialPage.tsx` |
| **VERIFIER** | 1 | `scripts/verify-grade-c-batch-c.cjs` |
| **REPORT** | 1 | `docs/grade-c-batch-c-auto-garage-environmental-farm-implementation-2026-09-09.md` |
| **QA SCREENSHOTS** | 37 | `docs/qa-screenshots/grade-c-batch-c-2026-09-09/**` |
| **OTHER** | 0 | — |

### Production / shared file justification

| FILE | TARGET BATCH C ROUTE(S) | WHY CHANGE REQUIRED | UNRELATED ROUTES MODIFIED |
|------|-------------------------|---------------------|---------------------------|
| `commercial-industries.ts` | `/commercial-auto-insurance/` | Phase 2 content: hero, V2 pairs, 8 considerations, 5 FAQs, explicit Explorer IDs | **NO** — diff confined to `commercial-auto-insurance` block (~151–285) |
| `commercial-products-industry.ts` | `/garage-dealership-insurance/`, `/pollution-liability-insurance/` | Phase 2 content for both routes | **NO** — diff confined to those two slug blocks |
| `pilot-commercial-inline.ts` | `/farm-insurance/` | Phase 2 farm package content | **NO** — diff confined to `farm-insurance` config block |
| `buildPilotProductConfig.ts` | Commercial Auto, Garage, Pollution | Slug-conditional: expandable considerations for garage/pollution; trust band + expandable for commercial auto; related links for commercial auto | **NO content change** to other routes — only `commercial-auto-insurance` related-link labels/entries and slug-conditional branches |
| `createPilotCommercialPage.tsx` | `/farm-insurance/` (metadata only) | Align Next.js `Metadata.description` with new farm meta positioning (Agricorp/greenhouse distinction) | **NO rendering change** — metadata string only; farm page body comes from `pilot-commercial-inline.ts` |

### `createPilotCommercialPage.tsx` — shared helper analysis

**Exact change:** One line in `farmMetadata.description` — machinery wording + Agricorp/greenhouse distinction.

**Effect on frozen routes:** None. `metadataForSlug()` returns route-specific metadata; only `farm-insurance` reads `farmMetadata`. No component logic, layout, or Explorer runtime changed.

**Global behaviour:** Unchanged. Other slugs resolve metadata from `industryPages`, `getProductPage()`, or other static metadata objects — untouched.

---

## D. Literal dump stats

**Script:** `scripts/dump-grade-c-batch-c-literal-claims.ts`  
**Output:** `docs/qa-screenshots/grade-c-batch-c-2026-09-09/literal-claim-dump.txt`

| Metric | Value |
|--------|------:|
| **CHAR COUNT** | 83,493 |
| **ROUTES** | 4 |
| **FAQ COUNT** | 20 |
| **CONSIDERATION COUNT** | 32 |
| **EXPLORER STATE COUNT** | 16 |
| **TRUNCATION** | None |
| **BLANK FAQ ANSWERS** | 0 |

---

## E. Commercial Auto factual gate

**Verdict: CLEAN**

### Mandatory coverage / statutory statements

| FIELD | EXACT WORDING (summary) | SAFE | NOTES |
|-------|-------------------------|------|-------|
| heroLead | $200k TPL min; UM; DCPD unless OPCF 49; Jul 2026 med/rehab/attendant care mandatory | **YES** | Statutory/regulatory; Ins Act s.251; FSRA 2026 |
| heroLead | Collision/comp/HNOA "not automatic" | **YES** | Correct optional treatment |
| liability V2 | $200k statutory min + higher limits common | **YES** | Minimum framed, not recommended |
| FAQ mandatory | Same statutory list + optional PD | **YES** | |

### July 1, 2026 reform register

| FIELD | EXACT WORDING | APPLIES TO COMMERCIAL AUTO | CURRENT | STATUTORY/FSRA SUPPORT | SAFE |
|-------|---------------|----------------------------|---------|------------------------|------|
| heroLead | "As of July 1, 2026, standard medical, rehabilitation, and attendant care accident benefits remain mandatory; other statutory accident benefits may be optional where your policy form allows." | **QUALIFIED YES** | **YES** | FSRA SABS page; O. Reg. 34/10 | **YES** |
| liability V2 | "As of July 1, 2026, optional accident benefits apply only to named insureds, spouses, dependants, and listed drivers…" | **QUALIFIED YES** | **YES** | FSRA fact sheet 29826 | **YES** |
| FAQ mandatory | Same Jul 2026 mandatory/optional split | **QUALIFIED YES** | **YES** | FSRA | **YES** |

No pre-July-2026 "all accident benefits mandatory" language found elsewhere on route.

### $200,000 liability

- Described as **statutory minimum** ("at least $200,000 per accident").
- Immediately followed by adequacy framing ("exceed that quickly"; "$1 million or $2 million" commonly purchased).
- **NOT** described as recommended or sufficient for business. **SAFE.**

### DCPD / OPCF 49

- DCPD standard unless OPCF 49 opt-out — **accurate**.
- Opt-out described as **uncommon for business fleets** — supported hedge; not presented as advisable.
- No unsupported fleet prevalence claim. **SAFE.**

### HNOA

- "where purchased", "not automatic", "may not respond", "may address certain liability".
- Employee personal policy exclusion noted; HNOA does not replace employee PD coverage.
- **SAFE.**

### Facility / CVOR search

| Term | Found on route? | Assessment |
|------|-----------------|------------|
| 75% | **NO** | — |
| Facility | **NO** | — |
| Rule 228/239/241/242/243 | **NO** | — |
| 10 or more | **YES** (consideration) | Hedged: "Some insurers… thresholds vary… not universal rules" |
| CVOR | **YES** (FAQ + fleet V2) | Cross-link only to trucking/dump; not universal requirement |

**FACILITY-SPECIFIC CLAIMS USED:** NONE

---

## F. 2026 auto-reform register (extracted sentences)

See Section E table. All Jul 2026 sentences are current post-reform wording with commercial hedge ("where your policy form allows"). **PASS.**

---

## G. Garage / Dealership factual gate

**Verdict: CLEAN**

### Customer vehicles

| Search | Result |
|--------|--------|
| "Covers customer vehicles" | **NOT FOUND** |
| "Protects customer vehicles" | **NOT FOUND** |
| Categorical guarantee | **NOT FOUND** |

Explorer + body use **legal liability / may respond / subject to policy wording**. **PASS.**

### OAP 4 vs CGL

- OAP 4 and CGL explicitly distinguished in hero, Explorer `garage-liability`, FAQ.
- Property/tools on commercial property — not OAP 4. **PASS.**

### MTO / OMVIC register

| FIELD | CLAIM | AUTHORITY | EXACT SUPPORT | SAFE | ACTION |
|-------|-------|-----------|---------------|------|--------|
| heroLead | Licensed garages typically must evidence standard garage automobile policy for MTO licensing | MTO SR-LV-053E | Certificate of garage policy field | **YES** | KEEP |
| heroLead | OMVIC expects appropriate insurance without prescribing specific limit in every case | OMVIC guideline | "Appropriate insurance" — not product/limit mandate | **YES** | KEEP |
| FAQ [0] | MTO garage licensing expects evidence of standard garage automobile policy | MTO | Licensing evidence | **YES** | KEEP |

**OMVIC unsupported mandate:** NOT present.

### Optional precision note (non-blocking)

| ROUTE | FIELD | WORDING | ISSUE | SEVERITY | RECOMMENDED FIX |
|-------|-------|---------|-------|----------|-----------------|
| Garage | consideration "Test drives" | "automobile sections and limits must respond" | Broker-placement idiom ("must be in place") could be misread as coverage guarantee | **LOW** | Optional: "should be in place to address covered incidents" — **not required for freeze** |

---

## H. Pollution factual gate

**Verdict: CLEAN**

### CGL relationship

- FAQ explicitly rejects "GL never covers pollution or always covers sudden spills".
- Uses "most CGL forms contain pollution exclusions" + policy-wording dependency.
- **PASS** — no categorical CGL/pollution gap-fill language.

### Policy trigger register

| STATEMENT | CLAIMS-MADE | OCCURRENCE | RETROACTIVE | DISCOVERY/REPORTING |
|-----------|-------------|------------|-------------|---------------------|
| CPL card | **YES** ("typically claims-made") | — | Mentioned in V2 | — |
| Site card | Both possible | "gradual or sudden" | Known-condition exclusion | Discovery reporting in description |
| Transportation | Where included | — | — | — |
| Cleanup | Policy-dependent | — | — | — |
| Considerations | "claim must be reported during policy period" | Occurrence forms "exist but less common" | Retroactive dates | ERP noted |

**No single trigger presented as universal.** **PASS.**

### Known conditions

- Pre-inception exclusion, disclosure, "cannot retroactively erase known conditions" — FAQ, considerations, site V2.
- **PASS.**

### Cleanup / orders / fines

- "Regulatory fines and penalties are generally excluded or uninsurable"
- "do not assume a cleanup order automatically creates insured coverage"
- Statutory duties continue regardless of insurance
- **PASS.**

### Optional precision note (non-blocking)

| ROUTE | FIELD | WORDING | ISSUE | SEVERITY |
|-------|-------|---------|-------|----------|
| Pollution | CPL V2 detailDescription | "claim must be made during the policy period" | Some forms use made-and-reported; consideration uses "reported" | **LOW** — not blocking |

---

## I. Ontario EPA register

| FIELD | EXACT CLAIM | SECTION | INSURANCE RELEVANCE | SAFE |
|-------|-------------|---------|---------------------|------|
| cleanup V2 | "Environmental Protection Act imposes duties to report spills and mitigate harm — those statutory obligations apply whether or not insurance responds" | ss. 92–93 area (reporting/mitigation) | Statutory duty ≠ insured coverage | **YES** |
| FAQ cleanup | "Statutory duties under Ontario environmental law continue regardless of insurance; fines and penalties are generally not insurable" | General EPA framework | Correct separation | **YES** |
| consideration "Regulatory cleanup" | Spill reporting, mitigation, remediation under EPA — independent of insurance | EPA | Correct | **YES** |

No overstatement that insurance satisfies statutory orders. **PASS.**

---

## J. Farm factual gate

**Verdict: CLEAN**

### Farm package inclusions

- "where purchased", "subject to…", "Not every farm program covers every item or peril automatically".
- BI, equipment breakdown, agritourism as optional extensions "where available".
- **PASS** — no universal inclusion claims.

### Vehicles vs machinery

- Licensed road vehicles → Ontario automobile insurance (statutory/compulsory framework).
- Unlicensed tractors/implements → farm property scheduling.
- No categorical "all tractors" statement without qualification.
- **PASS.**

### Agricorp

- Hero + FAQ distinguish Agricorp Production Insurance / AgriInsurance as **government crop programs**, not private P&C substitutes.
- **PASS.**

### Greenhouse

- Cross-link only; no greenhouse BI/EB duplication.
- **PASS.**

---

## K. Numeric / regulatory register (all four routes)

| ROUTE | FIELD | CLAIM | TYPE | SOURCE | ONTARIO/FACILITY/INSURER | HEDGE | SAFE | ACTION |
|-------|-------|-------|------|--------|--------------------------|-------|------|--------|
| Commercial Auto | hero, FAQ, V2 | $200,000 TPL minimum | Statutory | Ins Act s.251 | Ontario-wide | "at least"; higher common | **YES** | KEEP |
| Commercial Auto | hero, FAQ | UM mandatory | Statutory | CAIA; Ins Act | Ontario-wide | — | **YES** | KEEP |
| Commercial Auto | hero, FAQ | DCPD unless OPCF 49 | Regulatory | FSRA 2024 | Ontario-wide | opt-out uncommon | **YES** | KEEP |
| Commercial Auto | hero, FAQ, V2 | Jul 2026 mandatory med/rehab/attendant care | Regulatory | FSRA 2026 | Ontario-wide | optional AB qualified | **YES** | KEEP |
| Commercial Auto | V2, FAQ | $1M / $2M common | Market | Broker practice | Common | "Many businesses purchase" | **YES** | KEEP |
| Commercial Auto | consideration | 10+ power units fleet | Underwriting | Market (not FA Rule 239) | Insurer-specific | "Some insurers… not universal" | **YES** | KEEP |
| Garage | hero, FAQ | MTO garage policy evidence | Regulatory | MTO SR-LV-053E | Ontario licensing | "typically must evidence" | **YES** | KEEP |
| Garage | hero | OMVIC appropriate insurance | Regulatory | OMVIC | Ontario-wide | no limit mandate | **YES** | KEEP |
| Pollution | cleanup V2, FAQ | EPA reporting/mitigation duties | Statutory | EPA ss. 92–93 | Ontario-wide | regardless of insurance | **YES** | KEEP |
| Pollution | multiple | Fines/penalties not insurable | Legal/policy | Public policy | Ontario-wide | "generally" | **YES** | KEEP |
| Farm | hero, FAQ | Compulsory automobile for licensed road vehicles | Statutory | CAIA | Ontario-wide | — | **YES** | KEEP |
| Farm | hero, FAQ | Agricorp = government program | Program | Ontario.ca | Ontario-wide | explicit distinction | **YES** | KEEP |

**Unsupported claims removed in Phase 2:** Facility 75%, universal fleet rules, "Covers customer vehicles", "CGL never covers pollution", universal pollution triggers, universal farm inclusions.

---

## L. Absolute-language review (material occurrences)

| ROUTE | FIELD | WORDING | SAFE | HEDGED | ACTION |
|-------|-------|---------|------|--------|--------|
| Commercial Auto | heroLead | "must include" (statutory TPL/UM/DCPD) | **YES** | Statutory fact | KEEP |
| Commercial Auto | heroLead | "remain mandatory" (med/rehab/attendant care AB) | **YES** | Jul 2026 regulatory | KEEP |
| Commercial Auto | FAQ CVOR | "CVOR-regulated hauling" → trucking page | **YES** | Scoped cross-link | KEEP |
| Garage | heroLead | "typically must evidence" (MTO) | **YES** | Licensing context | KEEP |
| Garage | consideration | "must respond" (test drives) | **QUALIFIED** | Placement advice | OPTIONAL TIGHTEN — non-blocking |
| Pollution | FAQ | "not on a simple rule that GL never covers pollution" | **YES** | Explicit negation of bad claim | KEEP |
| Farm | heroLead | "still require Ontario automobile insurance" | **YES** | Statutory/compulsory | KEEP |

No material unhedged coverage guarantees found.

---

## M. Meta / SEO review

| ROUTE | FIELD | ISSUE | SEVERITY |
|-------|-------|-------|----------|
| Commercial Auto | metaDescription | Lists TPL, AB, UM, DCPD, optional PD, HNOA — no false mandatory claims | **NONE** |
| Garage | metaDescription | "customer-vehicle legal liability" — qualified, not "covers customer vehicles" | **NONE** |
| Pollution | metaDescription | "subject to policy triggers and wording" | **NONE** |
| Farm | metaDescription | "distinct from greenhouse agribusiness and government crop programs" | **NONE** |

**Meta compression issues:** None requiring fix.

---

## N. Explorer V2 literal review

| Route | IDs | V2 pairs | Verdict |
|-------|-----|----------|---------|
| **COMMERCIAL AUTO** | 4/4 | 4/4 | **4/4 CLEAN** |
| **GARAGE** | 4/4 | 4/4 | **4/4 CLEAN** |
| **POLLUTION** | 4/4 | 4/4 | **4/4 CLEAN** |
| **FARM** | 4/4 | 4/4 | **4/4 CLEAN** |

**Special scrutiny:**

| State | Assessment |
|-------|------------|
| HNOA | Hedged; not automatic; employee PD gap noted |
| Customer vehicles (garagekeepers-liability) | Legal-liability conditional language |
| transportation-pollution | Title includes "Where Included"; not universal |
| equipment-machinery (farm) | Licensed vs unlicensed distinction clear |

RIGHT = WHAT · LEFT = WHY — structure correct on all 16 states.

---

## O. Cross-page consistency

| Comparison | Contradiction? |
|------------|----------------|
| Commercial Auto vs Trucking (CVOR) | **NO** — CA cross-links; trucking owns CVOR narrative |
| Commercial Auto vs Cargo | **NO** — cargo/freight distinguished in hero + consideration |
| Commercial Auto vs Small Business | **NO** — SMB mentions auto conditionally |
| Garage vs Commercial Auto | **NO** — OAP 4 vs OAP 1/contractor pickup |
| Garage vs Commercial Property | **NO** — tools/buildings on property |
| Pollution vs Contractors | **NO** — CPL as subset; broad route maintained |
| Farm vs Greenhouse | **NO** — distinct page jobs; cross-link only |
| Farm vs Commercial Auto | **NO** — licensed vehicles coordinated, not duplicated |

**Exact contradictions:** None.

---

## P. Visual-semantic review

| State / archetype | Rating | Notes |
|-------------------|--------|-------|
| Commercial Auto `fleet-vehicles` | **ACCEPTABLE** | Multi-vehicle business fleet visual; not for-hire trucking tractor narrative |
| Garage customer vehicles | **ACCEPTABLE** | Legal-liability concept matches retitle |
| Pollution transportation | **ACCEPTABLE** | Transit/release concept; hedged in copy |
| Farm machinery | **ACCEPTABLE** | Equipment vs road-vehicle distinction in V2 |

**MISLEADING states:** None. **Does not block freeze.**

---

## Q. Route verdicts

| Route | Verdict | Notes |
|-------|---------|-------|
| **COMMERCIAL AUTO** | **CLEAN** | Jul 2026, $200k, DCPD, HNOA, Facility/CVOR all pass |
| **GARAGE / DEALERSHIP** | **CLEAN** | OAP 4 precision; one optional LOW tighten on test-drive consideration |
| **POLLUTION LIABILITY** | **CLEAN** | Highest-precision gate passed; one optional LOW CPL trigger nuance |
| **FARM** | **CLEAN** | Agricorp, machinery/autos, package hedges all pass |

**Fields requiring fix:** **0** (blocking)  
**Optional non-blocking precision notes:** 2 (LOW)

---

## R. Freeze decision

| Route | Decision |
|-------|----------|
| Commercial Auto | **FREEZE** |
| Garage / Dealership | **FREEZE** |
| Pollution Liability | **FREEZE** |
| Farm | **FREEZE** |

| Gate | Result |
|------|--------|
| **BATCH C READY TO FREEZE** | **YES** |
| **BUILD CLEAN** | **YES** |
| **TSC CLEAN** | **YES** |
| **FIELDS REQUIRING FIX** | **0** |

### Pre-commit confirmation

| Check | Result |
|-------|--------|
| PRODUCTION COPY CHANGED | **NO** |
| PRODUCTION TYPES CHANGED | **NO** |
| EXPLORER RUNTIME CHANGED | **NO** |
| IMAGES CHANGED | **NO** |
| SCANNER CHANGED | **NO** |
| FROZEN ROUTES CHANGED | **NO** |

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or promote preview to production.
