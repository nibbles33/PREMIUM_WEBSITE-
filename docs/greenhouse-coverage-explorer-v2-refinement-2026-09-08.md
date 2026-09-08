# Greenhouse Coverage Explorer V2 Copy Refinement

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Route:** `/greenhouse-agribusiness-insurance/` only  
**Date:** 2026-09-08  
**Status:** Implementation complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Explorer engineering, images, state IDs, and image mappings **unchanged**
- No other routes modified
- **No audit scanner changes**

---

## Current Explorer state inventory (pre-change audit)

**Source:** `src/data/pilot-commercial-inline.ts` → `coverageItems`  
**Explorer states:** **6**  
**Image asset:** `greenhouse-insurance-interactive-master.png` (interactive-master, zone highlighting via `ROUTE_MANIFEST`)

| # | State ID (slugified title) | Title | shortLabel (before) | detailTitle (before) | detailDescription (before) | Mapped zones |
|---|---------------------------|-------|---------------------|----------------------|------------------------------|--------------|
| 1 | `greenhouse-buildings-structures` | Greenhouse Buildings & Structures | Greenhouse *(first word default)* | — *(fallback: title)* | — *(fallback: description)* | glass-bays, climate-zone, grow-rows |
| 2 | `equipment-machinery` | Equipment & Machinery | Equipment | — | — | irrigation-runs, climate-zone, grow-rows |
| 3 | `business-property-stock` | Business Property & Stock | Business | — | — | grow-rows, packing-shed, glass-bays |
| 4 | `business-interruption` | Business Interruption | Business *(duplicate)* | — | — | climate-zone, packing-shed, grow-rows |
| 5 | `commercial-liability` | Commercial Liability | Commercial | — | — | loading-bay, glass-bays, packing-shed |
| 6 | `equipment-breakdown` | Equipment Breakdown | Equipment *(duplicate)* | — | — | irrigation-runs, climate-zone, grow-rows |

**Pre-change V2 behavior:** Fallback mode — LEFT detail panel repeated RIGHT selector content (`detailTitle` → `title`, `detailDescription` → `description`).

**Display label issues identified:**
- Duplicate shortLabels: Business (×2), Equipment (×2)
- Generic first-word defaults: Greenhouse, Commercial

**Titles preserved:** All six `title` values unchanged to preserve slugified state IDs and `ROUTE_MANIFEST` / `greenhouse.ts` coverageId mapping.

---

## Files changed

| File | Change |
|------|--------|
| `src/data/pilot-commercial-inline.ts` | Added `shortLabel`, `detailTitle`, `detailDescription` to all 6 Greenhouse coverage items |
| `scripts/verify-greenhouse-explorer-v2.cjs` | New verification harness + screenshots |
| `docs/qa-screenshots/greenhouse-coverage-explorer-v2-2026-09-08/*` | Screenshots + `verification.json` |

**Not changed:** Explorer components, PNG assets, registry, interaction manifest, hero, considerations, FAQs, SEO, CTA, other routes.

---

## Display label changes

| State ID | title (unchanged) | shortLabel before | shortLabel after |
|----------|-------------------|-------------------|------------------|
| `greenhouse-buildings-structures` | Greenhouse Buildings & Structures | Greenhouse | **Greenhouse Property** |
| `equipment-machinery` | Equipment & Machinery | Equipment | Equipment *(unchanged — already distinct from Breakdown)* |
| `business-property-stock` | Business Property & Stock | Business | **Stock & Property** |
| `business-interruption` | Business Interruption | Business | **Interruption** |
| `commercial-liability` | Commercial Liability | Commercial | **Liability** |
| `equipment-breakdown` | Equipment Breakdown | Equipment | **Breakdown** |

**Identifiers that could not be renamed:** All six `title` values — slugified IDs drive `ROUTE_MANIFEST.coverageZones` and `greenhouse.ts` `coverageStates[].coverageId`. Only display-facing `shortLabel` was changed.

---

## Before / after — selector copy (RIGHT)

Selector `description` text is **unchanged** on all six states (concise “what is this coverage?” role preserved).

| State | Selector description (unchanged) |
|-------|----------------------------------|
| 1 | Greenhouse structures and other insured buildings/property can represent a significant part of the operation's exposure. Coverage depends on the property insured, policy terms and selected coverages. |
| 2 | Greenhouse operations may rely on heating, ventilation, irrigation and other specialized operational equipment. Coverage for equipment and machinery depends on the policy and coverages purchased. |
| 3 | Consider business contents, supplies and eligible stock or property used in the operation. How particular property is insured varies by policy and insurer. |
| 4 | A covered property loss can also interrupt operations and affect business income. Business interruption coverage may respond to covered loss of income following an insured loss, subject to the policy terms, limits and coverage purchased. |
| 5 | Greenhouse and agribusiness operations can have liability exposures arising from their premises and business activities. The appropriate liability protection depends on the nature and scale of the operation. |
| 6 | Heating, electrical, ventilation, irrigation and other critical systems can create significant equipment-breakdown exposure. Equipment breakdown coverage may be available where purchased and remains subject to policy terms and exclusions. |

---

## Before / after — detail copy (LEFT)

### State 1 — `greenhouse-buildings-structures`

| Field | Before | After |
|-------|--------|-------|
| detailTitle | Greenhouse Buildings & Structures *(fallback)* | **Why greenhouse structures drive insurable values** |
| detailDescription | *(same as selector — duplicate)* | Glass bays, poly tunnels, and climate-controlled structures in Leamington and Essex County often represent a large share of total property values alongside tenant improvements and attached packing areas. Building types, construction, and total property values should be reviewed with your broker so limits and descriptions reflect the operation accurately — coverage depends on what is scheduled and how the policy defines insured property. |

### State 2 — `equipment-machinery`

| Field | Before | After |
|-------|--------|-------|
| detailTitle | Equipment & Machinery *(fallback)* | **When heating and irrigation systems keep the operation running** |
| detailDescription | *(same as selector — duplicate)* | Greenhouse operations depend heavily on heating, ventilation, and irrigation — systems that are often central to daily production and may sit outside a basic property form's treatment of contents. Your broker should review how these assets are described and insured, especially where equipment values or specialized machinery endorsements apply. |

### State 3 — `business-property-stock`

| Field | Before | After |
|-------|--------|-------|
| detailTitle | Business Property & Stock *(fallback)* | **How plants, supplies, and stock are treated on the policy** |
| detailDescription | *(same as selector — duplicate)* | Growing stock, plants, and seasonal inventory can be treated very differently from fixed equipment or building coverage — and should not be assumed to be included automatically. How particular property is insured varies by policy and insurer; this warrants a focused review rather than a generic contents limit. |

### State 4 — `business-interruption`

| Field | Before | After |
|-------|--------|-------|
| detailTitle | Business Interruption *(fallback)* | **When a covered loss forces a shutdown** |
| detailDescription | *(same as selector — duplicate)* | A covered fire, equipment failure, or property loss can halt production during peak growing or shipping periods — when payroll, utilities, and lease costs may continue. Business interruption coverage may help with covered loss of income following an insured loss, subject to waiting periods, limits, and the policy terms purchased. Seasonal revenue patterns in Windsor–Essex operations can affect what limits make sense. |

### State 5 — `commercial-liability`

| Field | Before | After |
|-------|--------|-------|
| detailTitle | Commercial Liability *(fallback)* | **Liability from premises, visitors, and daily operations** |
| detailDescription | *(same as selector — duplicate)* | Loading bays, customer pickup areas, contractor visits, and on-site activity create third-party injury or property-damage exposure distinct from crop or equipment losses. The appropriate liability protection depends on the nature and scale of the operation — limits and endorsements should reflect how the greenhouse actually interacts with staff, suppliers, and the public. |

### State 6 — `equipment-breakdown`

| Field | Before | After |
|-------|--------|-------|
| detailTitle | Equipment Breakdown *(fallback)* | **Critical system failure during peak season** |
| detailDescription | *(same as selector — duplicate)* | A compressor, boiler, or irrigation controller failure can disrupt climate control and threaten crop viability — losses that base property coverage may treat differently from sudden mechanical or electrical breakdown. Equipment breakdown coverage may be available where purchased; triggers, sublimits, and exclusions require careful review because coverage depends on the policy, cause of loss, and endorsements in place. |

---

## State IDs / image mapping — confirmation

All six slugified IDs unchanged:

```
greenhouse-buildings-structures
equipment-machinery
business-property-stock
business-interruption
commercial-liability
equipment-breakdown
```

Interactive master asset unchanged: `greenhouse-insurance-interactive-master.png`  
Zone mappings in `routes.ts` and `families/greenhouse.ts` unchanged.

---

## Content audit — Greenhouse

| Metric | Before | After | Delta |
|--------|-------:|------:|------:|
| Substantive words | **757** | **757** | 0 |
| Explorer states | 6 | 6 | 0 |
| HIGH flags | 0 | 0 | 0 |
| MEDIUM flags | 0 | 0 | 0 |
| LOW flags | 0 | 0 | 0 |
| Classification | **A** | **A** | — |
| Classification reason | Substantive (757w), 6 cards avg 55.3w, considerations yes, FAQ unique | *(unchanged)* | — |

**Note:** Audit counts `title + description + detail` only — `detailTitle`/`detailDescription` are V2 presentation fields and do not affect substantive word count or classification.

### Full-site audit impact

| Metric | Before | After |
|--------|-------:|------:|
| Class A | 3 | 3 |
| Class B | 16 | 16 |
| Class C | 18 | 18 |
| Class D | 21 | 21 |

**No route classification or safety-flag count changed.**

---

## Verification results

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |
| `scripts/verify-greenhouse-explorer-v2.cjs` | **PASS** (6 states, non-duplicative, distinct labels) |
| `scripts/verify-coverage-explorer-ux-v2.cjs` | **PASS** (daycare, restaurant, contractors, normal routes incl. greenhouse) |

### Explorer functional checks

| Check | Result |
|-------|--------|
| 390 / 768 / 1024 / 1440 — no horizontal overflow | **PASS** |
| Console errors | **0** |
| 6 states render | **PASS** |
| Correct interactive-master image per state | **PASS** |
| RIGHT selector ≠ LEFT detail (no duplicate title/desc) | **PASS** |
| Distinct shortLabels (no Business×2, Equipment×2) | **PASS** |
| Keyboard interaction | **PASS** |
| Image object-fit contain / geometry | **PASS** |

---

## Screenshot artifacts

**Directory:** `docs/qa-screenshots/greenhouse-coverage-explorer-v2-2026-09-08/`

| File | Contents |
|------|----------|
| `explorer_1440.png` | Explorer at desktop |
| `explorer_390.png` | Explorer at mobile (full page) |
| `state-structures.png` | State 1 — Greenhouse Property |
| `state-equipment.png` | State 2 — Equipment |
| `state-stock.png` | State 3 — Stock & Property |
| `state-interruption.png` | State 4 — Interruption |
| `state-liability.png` | State 5 — Liability |
| `state-breakdown.png` | State 6 — Breakdown |
| `verification.json` | Automated check results |

---

## Other routes — confirmed untouched

Restaurant, Daycare, Contractors, and all other personal/commercial/agriculture routes unchanged.

---

## Commit

**Hash:** `7b8a041`  
**Message:** `feat(greenhouse): Coverage Explorer V2 detail copy refinement`

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**

**STOP FOR OWNER REVIEW.**
