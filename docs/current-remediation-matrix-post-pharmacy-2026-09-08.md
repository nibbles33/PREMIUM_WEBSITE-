# Current Product Content Remediation Matrix — Post-Pharmacy

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-08  
**Scope:** CURRENT-STATE PLANNING AUDIT ONLY — no copy, code, scanner, or Explorer changes  
**Source:** Fresh `npx tsx scripts/product-content-audit.ts` run + live source inspection in `src/data/`

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO CONTENT REMEDIATION STARTED**
- Report only — **STOP FOR OWNER REVIEW**

---

## 1. Fresh A/B/C/D totals

Fresh audit run confirmed:

| Grade | Count |
|------:|------:|
| **A** | **13** |
| **B** | **16** |
| **C** | **18** |
| **D** | **11** |
| **Total** | **58** |

**Expected baseline matched exactly:** A 13 / B 16 / C 18 / D 11.

No unexplained drift. Pharmacy (`/pharmacy-insurance/`) is the only route that moved since the post–D2-precision baseline: **D → A** (205w → 1,430w; HIGH 1 → 0).

### Current A routes (13)

| Route | Words |
|-------|------:|
| `/convenience-store-insurance/` | 1,141 |
| `/daycare-private-school-insurance/` | 956 |
| `/event-liability-insurance/` | 1,094 |
| `/food-truck-insurance/` | 1,624 |
| `/greenhouse-agribusiness-insurance/` | 757 |
| `/hotel-motel-insurance/` | 1,252 |
| `/liquor-liability-insurance/` | 2,005 |
| `/non-profit-insurance/` | 1,088 |
| `/pharmacy-insurance/` | 1,430 |
| `/property-management-insurance/` | 1,174 |
| `/restaurant-insurance/` | 1,614 |
| `/salon-barber-insurance/` | 1,072 |
| `/warehousing-insurance/` | 1,034 |

### Current B routes (16) — not in active remediation queue

`/auto-insurance/`, `/boat-insurance/`, `/condo-insurance/`, `/cottage-insurance/`, `/cyber-insurance/`, `/group-home-auto-insurance/`, `/home-insurance/`, `/home-sharing-insurance/`, `/landlord-insurance/`, `/landscaping-snow-removal-insurance/`, `/life-insurance/`, `/mobile-home-insurance/`, `/motorcycle-insurance/`, `/personal-umbrella-insurance/`, `/tenant-insurance/`, `/travel-insurance/`

---

## 2. Work-planning bucket definitions

| Bucket | Meaning |
|--------|---------|
| **D1** | Wording/safety correction only; adequate underlying depth already present |
| **D2** | Thin + wording problems; ordinary commercial/personal complexity |
| **D3** | Specialized/high-risk; requires independent primary-source research |
| **C1** | Modest incremental depth; structurally sound, no safety flags |
| **C2** | Substantial researched expansion needed; thin across sections |

*Buckets are work assignments, not audit grades.*

---

## 3. Complete current C/D route inventory (29 routes)

### D routes (11)

#### `/bonding-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 448 |
| Explorer states | 5 |
| Considerations | 0 |
| FAQ count | 5 |
| HIGH / MEDIUM / LOW | 0 / 3 / 1 |

**Reason for D:** Safety flags only — MEDIUM guarantee language on bid/performance bond cards + unhedged FAQ “Insurance protects you against covered losses.” No HIGH flags, but surety terminology requires careful primary-source review.

**Primary drivers:** unsafe wording only · specialized technical insurance risk · combination (surety ≠ insurance)

**Work bucket:** **D3**

---

#### `/builders-developers-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 380 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 5 |
| HIGH / MEDIUM / LOW | 1 / 0 / 0 |

**Reason for D:** HIGH flat FAQ — “Builder's risk covers the structure and materials…”

**Primary drivers:** unsafe wording · shallow content · specialized technical insurance risk (builder's risk vs CGL vs wrap-up)

**Work bucket:** **D3**

---

#### `/builders-risk-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 292 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 2 / 0 / 0 |

**Reason for D:** Two HIGH flat guarantees — `coverageIntro` and Work in Progress card (“Covers the structure…”).

**Primary drivers:** unsafe wording · shallow content (292w) · specialized technical insurance risk

**Work bucket:** **D3**

---

#### `/cargo-freight-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 286 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 2 / 0 / 0 |

**Reason for D:** HIGH flat guarantees in intro and FAQ (liability vs cargo split stated as automatic coverage).

**Primary drivers:** unsafe wording · shallow content · specialized technical insurance risk (motor cargo)

**Work bucket:** **D3**

---

#### `/contractors-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 345 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 5 |
| HIGH / MEDIUM / LOW | 1 / 0 / 0 |

**Reason for D:** HIGH flat FAQ on builder's risk. Cards otherwise “specific (good)” but body remains thin.

**Primary drivers:** unsafe wording · shallow content · specialized technical insurance risk · **architectural complexity** (custom multi-state Coverage Explorer with dedicated state images — visual investment ≠ content complete; **no V2 `detailTitle`/`detailDescription` pairs**)

**Work bucket:** **D3**

---

#### `/crime-fidelity-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 253 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 1 / 0 / 0 |

**Reason for D:** HIGH flat Employee Dishonesty card — “Covers theft of money, securities, or property…”

**Primary drivers:** unsafe wording · shallow content · specialized technical insurance risk (crime vs fidelity vs cyber fraud)

**Work bucket:** **D3**

---

#### `/directors-officers-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 331 |
| Explorer states | 4 |
| Considerations | 70 (moderate) |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 1 / 0 / 0 |

**Reason for D:** HIGH flat FAQ — “GL covers the organization's operational liability…” Cards are hedged; considerations exist but thin.

**Primary drivers:** unsafe wording · specialized technical insurance risk (Side A/B/C, securities) · combination

**Work bucket:** **D3**

---

#### `/dump-truck-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 326 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 1 / 0 / 0 |

**Reason for D:** HIGH flat FAQ — liability/cargo split stated as automatic coverage.

**Primary drivers:** unsafe wording · specialized technical insurance risk (heavy commercial auto, hauling)

**Work bucket:** **D3**

---

#### `/employment-practices-liability-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 227 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 1 / 0 / 0 |

**Reason for D:** HIGH flat Wrongful Termination card. Thinnest D page by word count.

**Primary drivers:** unsafe wording · shallow content · specialized regulatory risk (Ontario employment / human rights context)

**Work bucket:** **D3**

---

#### `/product-recall-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 252 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 2 / 0 / 0 |

**Reason for D:** Two HIGH flat FAQ claims — product liability vs recall dichotomy stated as automatic coverage.

**Primary drivers:** unsafe wording · shallow content · specialized technical insurance risk

**Work bucket:** **D3**

---

#### `/trucking-insurance/` — **D**

| Field | Value |
|-------|-------|
| Substantive words | 293 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 1 / 0 / 0 |

**Reason for D:** HIGH flat FAQ — liability/cargo split. Some Windsor–Essex corridor specificity in hero but FAQ remains flat.

**Primary drivers:** unsafe wording · specialized technical insurance risk (motor carrier, cross-border, cargo)

**Work bucket:** **D3**

---

### C routes (18)

#### `/business-interruption-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 395 |
| Explorer states | 4 |
| Considerations | 66 (moderate) |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Shallow overall depth despite hedged cards and existing considerations.

**Primary drivers:** shallow content · missing depth in considerations/FAQs

**Work bucket:** **C1**

---

#### `/commercial-auto-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 323 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Shallow depth; cards hedged; no considerations.

**Primary drivers:** shallow content · missing considerations · generic copy

**Work bucket:** **C1**

---

#### `/commercial-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 283 |
| Explorer states | 0 |
| Considerations | 0 |
| FAQ count | 5 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Hub page — no coverage cards; shallow wayfinding copy; FAQ templated with auto.

**Primary drivers:** shallow content · generic copy · weak FAQs

**Work bucket:** **C2**

---

#### `/commercial-property-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 367 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 6 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Shallow depth; no safety flags; cards “specific (good).”

**Primary drivers:** shallow content · missing considerations

**Work bucket:** **C1**

---

#### `/condominium-corporation-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 277 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Thin corp-specific content; flat “Covers…” card language in source (not flagged HIGH).

**Primary drivers:** shallow content · specialized regulatory risk (master policy, corp vs unit-owner) · generic copy

**Work bucket:** **C2**

---

#### `/farm-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 332 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Shallow; some Essex County local framing but no considerations.

**Primary drivers:** shallow content · specialized technical risk (agritourism, equipment)

**Work bucket:** **C2**

---

#### `/fitness-gym-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 240 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Thin generic gym template; flat card language in source.

**Primary drivers:** shallow content · generic copy · specialized risk (waivers, trainer E&O, abuse)

**Work bucket:** **C2**

---

#### `/garage-dealership-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 283 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Industry terms present (garagekeepers) but thin overall.

**Primary drivers:** shallow content · missing considerations

**Work bucket:** **C1**

---

#### `/grocery-specialty-food-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 251 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Thin food-retail template; no spoilage/refrigeration depth (contrast with completed convenience/pharmacy work).

**Primary drivers:** shallow content · generic copy · combination (food retail + refrigeration exposure)

**Work bucket:** **C2**

---

#### `/manufacturing-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 399 |
| Explorer states | 5 |
| Considerations | 0 |
| FAQ count | 5 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Highest word count among C routes; some Windsor CNC/tool-die specificity; still no considerations.

**Primary drivers:** shallow content · missing considerations

**Work bucket:** **C1**

---

#### `/medical-dental-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 242 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Very thin; mentions malpractice/PHIPA split but lacks depth.

**Primary drivers:** shallow content · specialized regulatory risk (malpractice, PHIPA, WSIB) · generic copy

**Work bucket:** **C2** *(research rigor: D3-equivalent — regulated health professional context)*

---

#### `/pollution-liability-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 252 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** No audit flags but critically shallow; flat “Covers…” cards throughout source.

**Primary drivers:** shallow content · specialized technical insurance risk · generic copy

**Work bucket:** **C2** *(research rigor: D3-equivalent — pollution exclusion / gradual vs sudden release)*

---

#### `/professional-liability-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 391 |
| Explorer states | 4 |
| Considerations | 66 (moderate) |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 1 |

**Reason for C:** Shallow overall despite profession-segmented cards; LOW flag on unverified $1M–$5M FAQ claim.

**Primary drivers:** shallow content · unresolved numeric/regulatory claim · specialized technical insurance risk

**Work bucket:** **D3** *(audit grade C, but work requires dedicated E&O research — not C1 incremental)*

---

#### `/professional-offices-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 325 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Shallow; FAQ templated with auto-insurance pattern.

**Primary drivers:** shallow content · weak FAQs · generic copy

**Work bucket:** **C1**

---

#### `/real-estate-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 283 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Thin; agent E&O vs brokerage vs landlord boundaries absent; FAQ templated.

**Primary drivers:** shallow content · specialized technical insurance risk · weak FAQs

**Work bucket:** **C2**

---

#### `/religious-organizations-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 215 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Thinnest C route; generic institutional template.

**Primary drivers:** shallow content · specialized risk (pastoral counselling, abuse/youth programs)

**Work bucket:** **C2**

---

#### `/retail-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 292 |
| Explorer states | 4 |
| Considerations | 0 |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Generic retail template; no considerations.

**Primary drivers:** shallow content · generic copy

**Work bucket:** **C1**

---

#### `/small-business-insurance/` — **C**

| Field | Value |
|-------|-------|
| Substantive words | 399 |
| Explorer states | 4 |
| Considerations | 63 (moderate) |
| FAQ count | 4 |
| HIGH / MEDIUM / LOW | 0 / 0 / 0 |

**Reason for C:** Audit classifies as shallow, but source has hedged property card + existing considerations — depth problem is modest.

**Primary drivers:** shallow content (borderline) · one remaining flat card in source (landscaping/snow line in related content file — verify scope)

**Work bucket:** **D1** *(wording pass only; lowest-effort route in queue)*

---

## 4. Work-planning bucket summary (29 remaining routes)

| Bucket | Count | Routes |
|:------:|:-----:|--------|
| **D1** | 1 | small-business |
| **D2** | **0** | *(none — all former D2 hospitality/institutional routes now A)* |
| **D3** | 12 | bonding, builders-developers, builders-risk, cargo-freight, contractors, crime-fidelity, D&O, dump-truck, EPL, product-recall, professional-liability, trucking |
| **C1** | 7 | business-interruption, commercial-auto, commercial-property, garage-dealership, manufacturing, professional-offices, retail |
| **C2** | 9 | commercial-insurance (hub), condo corporation, farm, fitness-gym, grocery, medical-dental, pollution, real-estate, religious-orgs |

---

## 5. Specialty route check (current source)

| Route | Audit | Work bucket | Current state (inspected) |
|-------|:-----:|:-----------:|---------------------------|
| **Trucking** | D | D3 | Corridor-local hero; HIGH flat liability/cargo FAQ; no considerations; no V2 detail pairs |
| **Dump Truck** | D | D3 | Hedged cards; HIGH flat FAQ; shares transport defect pattern with trucking/cargo |
| **Builders Risk** | D | D3 | 2 HIGH flags; thinnest substantive D content (292w); flat intro + card |
| **Builders & Developers** | D | D3 | 1 HIGH FAQ; generic construction bundle |
| **Bonding / Surety** | D | D3 | 0 HIGH but 3 MEDIUM guarantee flags; surety terminology needs primary-source precision |
| **Cargo / Freight** | D | D3 | 2 HIGH flags; same liability/cargo split pattern as trucking |
| **Contractors** | D | D3 | Custom explorer visuals invested; body still thin; 1 HIGH FAQ; **no V2 detail pairs** |
| **Professional Liability / E&O** | C | **D3** | Profession cards present; LOW numeric FAQ flag; needs dedicated research despite C grade |
| **Directors & Officers** | D | D3 | Side A/B/C cards hedged; HIGH flat GL-vs-D&O FAQ |
| **Employment Practices (EPL)** | D | D3 | Thinnest D page; HIGH flat wrongful-termination card |
| **Product Recall** | D | D3 | 2 HIGH FAQ flags; recall vs PL boundary needs research |
| **Crime / Fidelity** | D | D3 | HIGH flat employee-dishonesty card; 253w |
| **Pollution Liability** | C | **C2 (D3 rigor)** | No audit flags but flat cards; high-stakes technical exposure |

---

## 6. Frozen / completed routes

These routes must **NOT** enter future remediation batches unless a new factual defect is discovered.

### A-grade remediated (13)

Daycare · Greenhouse · Restaurant · Liquor Liability · Food Truck · Hotel/Motel · Event Liability · Convenience Store · Salon/Barber · Non-Profit · Warehousing · Property Management · **Pharmacy**

### Owner-listed freeze (B-grade personal lines — do not modify)

Auto · Condo · Cottage · Home · Landlord · Motorcycle · Tenant · Travel

*These remain B-grade. Frozen for batch scheduling, not re-opened for depth expansion unless owner directs.*

### Explicit non-candidates

All 13 A routes above + 9 listed B personal routes = **22 frozen routes**.

---

## 7. Inconsistencies vs old matrix (2026-09-07)

| Issue | Old matrix | Current state |
|-------|-----------|---------------|
| **Site totals** | Pre-remediation snapshot (A 8–12 range across batches) | **A 13 / B 16 / C 18 / D 11** — confirmed |
| **D2 bucket** | 10 routes (mostly hospitality/institutional) | **0 routes** — all completed to A |
| **Pharmacy** | D2, 205w, HIGH property flag | **A**, 1,430w, independent D3 remediation complete |
| **Hospitality batch** | 7 D/D2 routes queued | **All A** (restaurant, liquor, food truck, hotel, event, convenience + salon) |
| **D2 Batch 2** | 4 D routes queued | **All A** (salon, non-profit, warehousing, property management) |
| **Daycare** | Noted as “pre-implementation snapshot” | **A**, 956w — do not re-schedule |
| **D route count** | Higher (included completed routes) | **11 remaining** (all assigned D3) |
| **Bonding severity** | D3 assigned | Still D3 — now **0 HIGH, 3 MEDIUM** (not wording-only) |
| **Professional liability** | C grade, D3 work bucket | Unchanged assignment — still **C grade, D3 work** |
| **Small business** | C grade, D1 work bucket | Unchanged — still lowest-effort route |
| **Contractors explorer** | Flagged as visual ≠ content | Still true — custom state images, no V2 detail pairs, still D |
| **Pollution** | C2 with D3 rigor, no flags | Unchanged — proactive hedging still needed |
| **Visual explorer ≠ V2 content** | Noted for contractors | Still applies to all 29 C/D routes — **none have V2 detail pairs** except the 13 A remediated routes |

---

## 8. Proposed batch order (remaining 29 routes)

| Order | Batch name | Routes | Count | Work type |
|------:|------------|--------|------:|-----------|
| 0 *(optional)* | **D1 Quick Win** | small-business | 1 | D1 |
| **1** | **Transportation — Motor Freight & Heavy Auto** | trucking, dump-truck, cargo-freight | 3 | D3 |
| 2 | **Construction — Builder's Risk & Contractors** | builders-risk, builders-developers, contractors | 3 | D3 |
| 3 | **Management & Fidelity Liability** | directors-officers, employment-practices-liability, crime-fidelity | 3 | D3 |
| 4 | **Bonding & Surety** *(independent)* | bonding | 1 | D3 |
| 5 | **Product & Professional Specialty** | product-recall, professional-liability | 2 | D3 |
| 6 | **Commercial Core Incremental** | business-interruption, commercial-auto, commercial-property, manufacturing, retail, professional-offices, garage-dealership | 7 | C1 |
| 7 | **Commercial Hub** | commercial-insurance | 1 | C2 |
| 8 | **Regulated & Institutional Expansion** | medical-dental, pollution-liability, condominium-corporation, religious-organizations | 4 | C2 |
| 9 | **Retail & Food Services Expansion** | fitness-gym, grocery-specialty-food, real-estate | 3 | C2 |
| 10 | **Agriculture** *(independent from Greenhouse)* | farm | 1 | C2 |

---

## 9. Proposed batch detail

### BATCH 0 *(optional quick win)* — D1 Quick Win

**ROUTES:** `/small-business-insurance/`  
**WHY:** Hedged property card + considerations already exist; lowest effort; no HIGH flags.  
**RESEARCH RIGOR:** D1 — validate remaining flat wording only.  
**ARCHITECTURAL RISK:** Low — standard 4-state explorer.  
**OWNER REVIEW:** Confirm whether one remaining flat card line needs hedging or removal.

---

### BATCH 1 — Transportation: Motor Freight & Heavy Auto *(RECOMMENDED NEXT)*

**ROUTES:**
- `/trucking-insurance/`
- `/dump-truck-insurance/`
- `/cargo-freight-insurance/`

**WHY THEY BELONG TOGETHER:** Shared motor-transport DNA — commercial auto, cargo vs liability boundary, fleet/disclosure underwriting. All three carry the same HIGH defect pattern (flat liability/cargo FAQ and/or intro). Windsor–Essex corridor commerce context applies across routes.

**RESEARCH RIGOR:** D3 — independent primary research per route for motor carrier rules, cargo forms, heavy-auto classifications, contingent cargo, bobtail/non-trucking liability (dump truck). Do not treat as wording-only.

**EXPECTED ARCHITECTURAL RISK:** **Low–medium** — standard 4-state explorers on shared transport family images; no custom state-image engineering like contractors. Preserve existing zone mappings.

**OWNER REVIEW POINT:** Liability vs cargo vs auto physical damage boundaries; cross-border/US exposure; MCS-90 or regulatory references only if verified from primary sources; delivery/hired-auto disclosure patterns.

---

### BATCH 2 — Construction: Builder's Risk & Contractors

**ROUTES:** builders-risk, builders-developers, contractors  
**WHY:** Shared construction purchasing context; builder's risk vs CGL vs wrap-up/OCIP overlap.  
**RESEARCH RIGOR:** D3 — separate builder's risk policy mechanics from contractor ongoing operations.  
**ARCHITECTURAL RISK:** **High for contractors** — custom explorer state images already deployed; content upgrade must not alter state IDs or manifest without stop gate.  
**OWNER REVIEW:** Builder's risk policy period/buyer; contractors FAQ flat claim; wrap-up disclosure.

---

### BATCH 3 — Management & Fidelity Liability

**ROUTES:** directors-officers, employment-practices-liability, crime-fidelity  
**WHY:** Executive/employee/fiduciary claim types — distinct from premises GL but often confused by buyers.  
**RESEARCH RIGOR:** D3 — Side A/B/C, Ontario employment context, crime vs fidelity vs cyber wire fraud.  
**ARCHITECTURAL RISK:** Low.  
**OWNER REVIEW:** GL vs D&O FAQ; EPL wrongful termination card; crime coverage triggers.

---

### BATCH 4 — Bonding & Surety *(independent)*

**ROUTES:** bonding  
**WHY:** Surety is not insurance — must remain independent; cannot batch with GL/property routes.  
**RESEARCH RIGOR:** D3 — OCP/industry surety primary sources for bond-type accuracy.  
**ARCHITECTURAL RISK:** Low — 5-state explorer already wired.  
**OWNER REVIEW:** Guarantee language — industry term vs overstatement; bid/performance/payment bond distinctions.

---

### BATCH 5 — Product & Professional Specialty

**ROUTES:** product-recall, professional-liability  
**WHY:** Product withdrawal vs liability boundary; E&O claims-made mechanics — both need dedicated research, not hospitality/transport patterns.  
**RESEARCH RIGOR:** D3.  
**ARCHITECTURAL RISK:** Low.  
**OWNER REVIEW:** Recall vs PL FAQ claims; $1M–$5M E&O FAQ numeric — verify or remove.

---

### BATCH 6 — Commercial Core Incremental (C1)

**ROUTES:** business-interruption, commercial-auto, commercial-property, manufacturing, retail, professional-offices, garage-dealership  
**WHY:** No safety flags; shared generic commercial property/GL/BI patterns; incremental considerations + FAQ depth.  
**RESEARCH RIGOR:** C1 — moderate; no primary-source statute work unless a specific claim emerges.  
**ARCHITECTURAL RISK:** Low.  
**OWNER REVIEW:** Depth proportional to exposure — avoid Greenhouse-length targets on simple coverage-type pages.

---

### BATCH 7–10 — C2 expansion batches

See batch order table. Medical-dental, pollution, and condo corporation warrant D3-equivalent research rigor despite C audit grades.

---

## 10. Exact recommendation — NEXT batch only

### ✅ Recommend: **Batch 1 — Transportation: Motor Freight & Heavy Auto (D3)**

**Routes (3):**
1. `/trucking-insurance/`
2. `/dump-truck-insurance/`
3. `/cargo-freight-insurance/`

**Rationale:**
- All three are current **D-grade** with **HIGH safety flags** — highest-priority audit class
- Shared defect pattern (flat liability/cargo/auto split language) enables efficient factual review without obscuring route-specific differences
- Specialty check explicitly calls out trucking, dump truck, and cargo
- **Lower architectural risk** than contractors (no custom state-image explorer)
- **Independent** from construction, surety, and regulated-professional tracks — avoids batching unrelated high-stakes domains
- Completing this batch would move site totals toward **A 13 / B 16 / C 18 / D 8**

**Do NOT implement in this pass.** Await owner approval.

**Alternative if owner prefers lowest-effort first:** Batch 0 (small-business D1 only, 1 route) — does not reduce D-count.

---

## 11. Validation performed

| Check | Result |
|-------|--------|
| Fresh audit run | ✅ A 13 / B 16 / C 18 / D 11 |
| Source inspection (29 C/D routes) | ✅ |
| Frozen route confirmation | ✅ 22 routes frozen |
| Old matrix comparison | ✅ Documented |
| Content/copy changes | ❌ None |
| Scanner changes | ❌ None |

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- **NO CONTENT REMEDIATION STARTED**
- **STOP FOR OWNER REVIEW**
