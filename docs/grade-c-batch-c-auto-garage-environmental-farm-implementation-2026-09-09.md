# Grade C Batch C — Auto / Garage / Environmental / Farm — Phase 2 Implementation

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Implementation base:** `b96c774` (research commit)  
**Implementation date:** 2026-09-09  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

---

## IMPLEMENTATION BASE

| Item | Value |
|------|-------|
| Frozen base | `d280ee5` |
| Research commit | `b96c774` |
| Research report | `docs/grade-c-batch-c-auto-garage-environmental-farm-research-2026-09-09.md` |

---

## FILES CHANGED

| File | Purpose |
|------|---------|
| `src/data/commercial-industries.ts` | Commercial Auto content + V2 pairs + considerations + FAQs |
| `src/data/product-pages/commercial-products-industry.ts` | Garage/Dealership + Pollution Liability |
| `src/data/pilot-commercial-inline.ts` | Farm insurance |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations + trust band + related links |
| `src/lib/createPilotCommercialPage.tsx` | Farm metadata description alignment |
| `scripts/verify-grade-c-batch-c.cjs` | Batch C visual/structural verifier (new) |
| `docs/grade-c-batch-c-auto-garage-environmental-farm-implementation-2026-09-09.md` | This report |
| `docs/qa-screenshots/grade-c-batch-c-2026-09-09/` | Visual QA artifacts (4 routes × 4 viewports + state shots) |

**Not changed:** Explorer runtime, manifest, images, scanner rules, navigation, Batch A/B routes, frozen A-grade routes.

---

## BEFORE / AFTER BY ROUTE

### Commercial Auto (`/commercial-auto-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 323 | **1354** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 3 (low)** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `liability-coverage`, `physical-damage-coverage`, `hired-non-owned-auto`, `fleet-discounts-multi-vehicle-management`

**Visitor retitles:** Third-Party Auto Liability · Collision & Comprehensive (Optional) · Hired & Non-Owned Auto · Fleet & Multi-Vehicle Programs

**Low flags:** Hero/FAQ cite $200,000 statutory minimum and July 1, 2026 mandatory accident benefits — informational scanner prompts; claims verified against research register.

---

### Garage / Dealership (`/garage-dealership-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 283 | **1338** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `garagekeepers-liability`, `dealer-open-lot`, `garage-liability`, `physical-damage-on-inventory`

**Visitor retitles:** Customer Vehicles (Legal Liability) · Dealer Inventory & Open Lot · Garage Operations Liability · Owned-Unit Physical Damage

---

### Pollution Liability (`/pollution-liability-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 252 | **1288** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `contractors-pollution-liability`, `site-pollution`, `transportation-pollution`, `cleanup-defence-costs`

---

### Farm (`/farm-insurance/`)

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | 332 | **1123** |
| Grade | C | **A** |
| HIGH / MED / LOW flags | 0 / 0 / 0 | **0 / 0 / 0** |
| Explorer V2 pairs | 0 | **4 / 4** |
| Considerations | 0 | **8** (expandable) |
| FAQs | 4 | **5** |

**Explorer IDs preserved:** `farm-property-coverage`, `equipment-machinery`, `farm-liability`, `livestock-coverage`

---

## OWNER DECISIONS IMPLEMENTED

| Decision | Implementation |
|----------|----------------|
| **A.** Commercial Auto — keep four Explorer IDs; broad Ontario commercial auto; HNOA core; no trucking page | **YES** — all four IDs preserved; hero/subhead scoped to service/contractor/local fleet; trucking/dump/cargo cross-linked in copy and related links; CVOR not presented as general requirement |
| **B.** Garage/Dealership — combined route; distinguish repair vs dealer | **YES** — whoItIsFor, considerations, and FAQs segment customer vehicles, inventory, test drives, tools; OAP 4 distinguished from CGL |
| **C.** Pollution — broad route; CPL major use case | **YES** — contractors, manufacturers, property owners, fuel/storage, waste, transporters in whoItIsFor; no contractors-only narrowing |
| **D.** Farm — broad working farm; Greenhouse cross-link | **YES** — Agricorp distinction; related link to `/greenhouse-agribusiness-insurance/`; no greenhouse duplication |
| **E.** Explorer — all 16 IDs; visitor retitles; no image changes | **YES** — 16/16 IDs; 16/16 V2 pairs; images untouched |

---

## 2026 AUTO REFORM VALIDATION

| Check | Result |
|-------|--------|
| July 1, 2026 SABS scope stated correctly | **PASS** — mandatory med/rehab/attendant care; other AB optional where form allows |
| Optional AB limited to named insured, spouse, dependants, listed drivers | **PASS** — in liability V2 detail + FAQ |
| OPCF 49 DCPD opt-out hedged | **PASS** — "unless named insured opts out"; uncommon for business fleets |
| No obsolete pre-July-2026 boilerplate | **PASS** |
| Physical damage not mandatory | **PASS** — explicit in hero, cards, FAQ, verifier |
| HNOA not automatic | **PASS** — "not automatic" in hero; endorsement language throughout |

---

## FACILITY-SPECIFIC CLAIMS USED

**NONE** as universal market rules.

Fleet size note uses hedged insurer-variation language ("Some insurers treat ten or more power units… thresholds and formulas vary by market and are not universal rules"). Facility 75% out-of-province surcharge and Facility 10-vehicle fleet definition **omitted**.

---

## GARAGE OAP 4 VALIDATION

| Check | Result |
|-------|--------|
| OAP 4 distinguished from CGL | **PASS** — Explorer state + FAQ |
| Customer vehicle wording conditional (legal liability) | **PASS** — no unhedged "Covers customer vehicles" |
| MTO garage-licence evidence cited | **PASS** — "MTO garage licensing expects evidence of a standard garage automobile policy" |
| OMVIC not assigned unsupported insurance mandate | **PASS** — "broader expectation that dealers maintain appropriate insurance without prescribing a specific limit in every case" |
| No U.S. garagekeepers terminology without Ontario framing | **PASS** — OAP 4 Section 6 legal-liability language |

---

## POLLUTION TRIGGER VALIDATION

| Check | Result |
|-------|--------|
| No "CGL never covers pollution" | **PASS** |
| No universal pollution-policy trigger | **PASS** — claims-made vs occurrence distinguished |
| No fines/penalties guarantee | **PASS** — "generally excluded or uninsurable" |
| Known conditions handled conditionally | **PASS** — disclosure, retroactive dates, pre-inception exclusion |
| No simplified sudden/accidental universal rule | **PASS** |
| transportation-pollution explained as optional extension | **PASS** — "where included on a pollution program" |

---

## FARM PROGRAM DISTINCTION

| Check | Result |
|-------|--------|
| Agricorp / AgriInsurance distinguished from private farm property | **PASS** — hero, FAQ, considerations |
| Licensed autos distinguished from farm machinery | **PASS** — equipment V2 detail + FAQ + consideration |
| No universal farm-package inclusion claims | **PASS** — "where purchased", "not every farm program covers every item" |
| Greenhouse cross-link only | **PASS** — related product link; no greenhouse content duplication |

---

## REGULATORY / NUMERIC REGISTER

| ROUTE | FIELD | CLAIM | SOURCE | ONTARIO / FA / INSURER | SAFE | FINAL WORDING (summary) |
|-------|-------|-------|--------|------------------------|------|-------------------------|
| Commercial Auto | hero, FAQ | Min TPL **$200,000** per accident | Insurance Act s.251; CAIA | Ontario-wide statutory | Yes | Statutory minimum; higher limits commonly purchased |
| Commercial Auto | hero, FAQ | Uninsured automobile mandatory | Ins Act s.251 | Ontario-wide | Yes | Listed with other compulsory coverages |
| Commercial Auto | hero, FAQ | DCPD unless OPCF 49 opt-out | FSRA; Jan 2024 reform | Ontario-wide | Yes | Opt-out uncommon for fleets |
| Commercial Auto | hero, FAQ | Jul 1 2026 mandatory AB = med/rehab/attendant care | FSRA SABS page 2026 | Ontario-wide | Yes | Other AB optional where form allows |
| Commercial Auto | V2 detail | Optional AB categories limited | FSRA fact sheet 2026 | Ontario-wide | Yes | Named insured, spouse, dependants, listed drivers |
| Commercial Auto | considerations | $1M / $2M common limits | Market practice | Ontario-wide common | Yes | "Many businesses purchase…" |
| Garage | hero, FAQ | MTO expects standard garage automobile policy | MTO SR-LV-053E | Ontario licensing | Yes | Evidence for garage licence — separate from OMVIC limits |
| Garage | hero | OMVIC appropriate insurance | OMVIC guideline | Ontario-wide | Yes | No specific product/limit mandate |
| Pollution | hero, FAQ | EPA reporting/remediation duties | EPA ss. 92–93, 97 | Ontario-wide | Yes | Statutory duties regardless of insurance |
| Pollution | FAQ | Regulatory fines not insurable | Public policy | Ontario-wide | Yes | "Generally excluded or uninsurable" |
| Farm | hero, FAQ | Agricorp AgriInsurance = government crop program | Ontario.ca SCAP | Ontario-wide | Yes | Distinguished from private farm property |

**Unsupported claims removed:**
- Facility 75% surcharge / 10-vehicle fleet as universal
- "Covers customer vehicles" (garage)
- "CGL never covers pollution" / "pollution fills the gap"
- "Covers regulatory-mandated remediation" (pollution)
- Simplified sudden-and-accidental CGL window
- Universal farm machinery / dwelling inclusion
- CVOR as core commercial-auto requirement

---

## UNSUPPORTED CLAIMS REMOVED

See register above. Verifier forbidden-phrase checks pass on all four routes after FAQ reword on garage CGL question.

---

## V2 VALIDATION

| Route | IDs | V2 pairs | Detail titles verified |
|-------|-----|----------|------------------------|
| Commercial Auto | 4/4 | 4/4 | Yes |
| Garage / Dealership | 4/4 | 4/4 | Yes |
| Pollution Liability | 4/4 | 4/4 | Yes |
| Farm | 4/4 | 4/4 | Yes |

**Total:** 16/16 IDs preserved · 16/16 V2 detail pairs · No image changes

---

## VISUAL QA

Batch verifier: `node scripts/verify-grade-c-batch-c.cjs` (uses `http://localhost:3018` — Next.js dev blocks `127.0.0.1` HMR/chunks)  
Screenshots: `docs/qa-screenshots/grade-c-batch-c-2026-09-09/`

| Route | 390 | 768 | 1024 | 1440 | Overflow | Verifier |
|-------|-----|-----|------|------|----------|----------|
| Commercial Auto | ✓ | ✓ | ✓ | ✓ | 0 | PASS |
| Garage / Dealership | ✓ | ✓ | ✓ | ✓ | 0 | PASS |
| Pollution Liability | ✓ | ✓ | ✓ | ✓ | 0 | PASS |
| Farm | ✓ | ✓ | ✓ | ✓ | 0 | PASS |

Explorer images fully visible at all viewports. V2 copy readable. Considerations expand. FAQs present. Mobile/desktop layout balanced.

---

## COMMERCIAL AUTO IMAGE SEMANTIC MATCH

| State ID | Assessment | Notes |
|----------|------------|-------|
| `fleet-discounts-multi-vehicle-management` (archetype `fleet-vehicles`) | **ACCEPTABLE** | Visual reads as multi-vehicle business fleet — appropriate for broad commercial auto (vans, pickups, local fleets). Not identical to for-hire trucking tractor narrative; cross-links differentiate specialized routes. |

**Not MISLEADING** — does not block freeze.

Other retitled states (`liability-coverage`, `physical-damage-coverage`, `hired-non-owned-auto`) align with visitor-facing concepts; no semantic mismatch flagged.

---

## BUILD / QA SUMMARY

| Check | Result |
|-------|--------|
| **BUILD** | **FAIL (pre-existing)** — `scripts/dump-grade-c-batch-b-literal-claims.ts` TS2339 on `ProductBrokerStep.title/description` (not introduced by Batch C) |
| **TSC** | **FAIL (pre-existing)** — same script error |
| **CONTENT AUDIT** | **A36 / B16 / C6 / D0** (all 4 batch routes → **A**) |
| **EXPLORER REGRESSION** | PASS — **228/228** checks, 0 failures |
| **BATCH VERIFIER** | PASS — 4/4 routes |

### Site totals (content audit)

| Grade | Before | After |
|-------|-------:|------:|
| A | 32 | **36** |
| B | 16 | 16 |
| C | 10 | **6** |
| D | 0 | 0 |

**Expected A36 / B16 / C6 / D0 — achieved.**

---

## READY FOR LITERAL FACTUAL GATE

**YES** — pending owner review of statutory phrasing ($200,000 minimum, July 1 2026 SABS), garage OAP 4 legal-liability wording, and pollution trigger precision before freeze.

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or promote preview to production.
