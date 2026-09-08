# Restaurant D2 Calibration — Implementation Report

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Route:** `/restaurant-insurance/` only  
**Date:** 2026-09-08  
**Status:** Implementation complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Other 2A routes **not modified** (liquor, food-truck, hotel/motel, event, convenience store)
- **No audit scanner changes**

---

## Source documents implemented

| Document | Use |
|----------|-----|
| `docs/restaurant-final-copy-draft-2026-09-07.md` | Hero, coverage cards, considerations (9), FAQs (5) |
| `docs/restaurant-copy-ui-mapping-revised-2026-09-07.md` | 4-state Explorer mapping; Product Liability + BI in Considerations |
| `docs/2a-hospitality-food-research-2026-09-07.md` | Research lineage / AGCO framing |

---

## Files changed

| File | Change |
|------|--------|
| `src/data/commercial-industries.ts` | Optional `considerations?` on `IndustryPageContent`; Restaurant full approved copy |
| `src/lib/buildPilotProductConfig.ts` | Pass-through `considerations: content.considerations` in `adaptCommercialIndustryContent()` |
| `scripts/verify-restaurant-d2-calibration.cjs` | New verification harness |
| `docs/qa-screenshots/restaurant-d2-calibration-2026-09-08/*` | Screenshots + `verification.json` |
| `docs/product-content-audit-2026-09-07.md` | Regenerated post-implementation |
| `docs/product-content-remediation-matrix-2026-09-07.md` | Regenerated post-implementation |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated post-implementation |

**Not changed:** Explorer components, PNG assets, registry/mapping, other industry routes' data, other 2A product pages, audit script.

---

## Optional considerations plumbing

### Type extension (`IndustryPageContent`)

```typescript
import type { ConsiderationItem, CoverageCard } from "@/components/LineInsurancePage";

export type IndustryPageContent = {
  // ...existing fields...
  considerations?: ConsiderationItem[];
  // ...
};
```

### Adapter pass-through

```typescript
return buildPilotProductConfig({
  // ...
  considerations: content.considerations,
  // ...
});
```

**Backward compatibility:** Only Restaurant sets `considerations`. All other industry routes omit the field → `ProductConsiderations` does not render (unchanged behavior).

---

## Restaurant fields updated

| Field | Before | After |
|-------|--------|-------|
| `subhead` | 17-word generic intro | Approved Windsor–Essex + O. Reg. 493/17 hero (106w in audit scope) |
| `coverageIntro` | Generic one-liner | Approved licence/equipment/lease-aware intro |
| `coverageTypes` | 4 cards, no detail pairs, 1 HIGH flat *Covers* | 4 cards with `detailTitle` + `detailDescription`; hedged selector copy |
| `considerations` | *(absent — type unsupported)* | **11 cards** (9 approved + Product Liability + Business Interruption interleaved) |
| `faqItems` | 4 (AGCO inaccuracy in Q1) | **5** approved FAQs with corrected AGCO/LLCA framing |

### Explorer state count: **4** (unchanged)

| Tab | `id` (slugified) | State PNG | detailTitle |
|-----|------------------|-----------|-------------|
| General Liability | `general-liability` | `restaurant-insurance-state-general-liability.png` | When a busy dining room becomes a liability claim |
| Property Coverage | `property-coverage` | `restaurant-insurance-state-property.png` | Why kitchen equipment drives property values |
| Liquor Liability | `liquor-liability` | `restaurant-insurance-state-liquor-liability.png` | Civil liability under the Act versus the coverage on your policy |
| Equipment Breakdown & Spoilage | `equipment-breakdown-spoilage` | `restaurant-insurance-state-equipment-breakdown.png` | When the walk-in fails on a Friday night |

**Confirmed:** No new Restaurant images or asset filenames. Four unique state image URLs verified in QA.

**Product Liability / Food Illness** and **Business Interruption** → Practical Considerations cards #3 and #8 only — **not** Explorer tabs.

---

## Content audit — Restaurant

| Metric | Before | After |
|--------|-------:|------:|
| Substantive words | **306** | **1622** |
| Coverage cards (Explorer tabs) | 4 | 4 |
| Explorer state images | 4 | 4 |
| Practical Considerations | 0 | **11** (648w) |
| FAQ items | 4 | **5** |
| HIGH flags | **1** | **0** |
| MEDIUM flags | 0 | 0 |
| LOW flags | 0 | 0 |
| Classification | **D** | **A** |
| Classification reason | 1 HIGH — flat *Covers* on Property card | Substantive (1622w), 4 cards avg 89w, considerations yes, FAQ unique |

**Note:** Class A achieved through substantive depth + zero safety flags — not copy manipulation for word count alone.

---

## Full-site audit impact

| Metric | Before | After | Delta |
|--------|-------:|------:|------:|
| Class A | 2 | **3** | +1 |
| Class B | 16 | 16 | 0 |
| Class C | 18 | 18 | 0 |
| Class D | 22 | **21** | −1 |

### Routes whose classification changed

| Route | Before | After |
|-------|--------|-------|
| `/restaurant-insurance/` | D | **A** |

*No other route classification changed.*

### Routes whose HIGH/MEDIUM flag count changed

| Route | Before HIGH/MED | After HIGH/MED |
|-------|-----------------|----------------|
| `/restaurant-insurance/` | 1 HIGH / 0 MED | **0 / 0** |

*No other route safety flag counts changed.*

### Remediation matrix bucket counts

| Bucket | Before | After |
|--------|-------:|------:|
| D1 | 1 | 1 |
| D2 | **11** | **10** |
| D3 | 12 | 12 |
| C1 | 7 | 7 |
| C2 | 9 | 9 |

Restaurant removed from D2 set (now Class A).

---

## AGCO / liquor liability — implementation confirmation

- Removed live copy implying AGCO / “licensing bodies” **require** liquor liability insurance.
- Explorer Liquor tab + FAQ Q1 + Consideration #4 use approved three-way distinction: civil liability under LLCA · no statutory insurance mandate · contractual/application proof may still be requested.
- SOP/event context preserved in FAQ Q1 (LCBO SOP FAQ distinction) — separate from ordinary restaurant licensing.

---

## Verification results

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |
| `scripts/verify-restaurant-d2-calibration.cjs` | **PASS** |
| `scripts/verify-coverage-explorer-ux-v2.cjs` | **PASS** (restaurant + daycare + contractors) |
| `scripts/verify-restaurant-multi-image-prototype.cjs` | **PASS** |
| `scripts/verify-restaurant-magnifier-prototype.cjs` | **PASS** |

### Restaurant functional checks

| Check | Result |
|-------|--------|
| 390 / 768 / 1024 / 1440 — no horizontal overflow | **PASS** |
| Console errors (verification run) | **0** |
| Hero / O. Reg. 493/17 subhead | **PASS** |
| 4 Explorer tabs | **PASS** |
| Each tab → correct state PNG | **PASS** (4 unique URLs) |
| RIGHT selector ≠ LEFT detail (no duplicate title/desc) | **PASS** |
| `property-coverage` → property PNG mapping | **PASS** |
| Crossfade / state switching | **PASS** |
| Desktop magnifier | **PASS** |
| Mobile magnifier hidden | **PASS** |
| 11 Practical Considerations | **PASS** |
| 5 FAQs | **PASS** |

---

## Screenshot artifacts

**Directory:** `docs/qa-screenshots/restaurant-d2-calibration-2026-09-08/`

| File | Contents |
|------|----------|
| `fullpage_390.png` | Full page mobile |
| `fullpage_1440.png` | Full page desktop |
| `explorer-general.png` | Explorer — General selected |
| `explorer-property.png` | Explorer — Property selected |
| `explorer-liquor.png` | Explorer — Liquor selected |
| `explorer-equipment.png` | Explorer — Equipment selected |
| `considerations-section.png` | Practical Considerations grid |
| `faq-section.png` | FAQ section |
| `verification.json` | Automated check results |

---

## Visual / UX notes for owner review

1. **Page length:** At 1622 substantive words, Restaurant is now the deepest hospitality route and longer than Daycare (~956w). Full-page mobile screenshot shows substantial scroll — expected given 11 consideration cards + expanded hero/FAQs. **No content was removed or consolidated** per implementation brief.

2. **11-card Considerations grid:** Renders as 2-column grid at desktop (same `ProductConsiderations` component as Daycare/Greenhouse). Visually usable at 1440px and 390px in QA — no overflow. Section is dense but scannable via card titles.

3. **Trust band duplication:** Hero `subhead` still mirrors `trustStatement` via `adaptCommercialIndustryContent()` — **pre-existing pattern**, not introduced by this task. Owner may want a shorter trust-band variant later.

4. **Information overlap:** Some liquor/regulatory themes appear in Explorer Liquor detail, Consideration #4, and FAQ Q1 — intentional reinforcement with different framing (coverage vs regulatory vs FAQ Q&A), not identical copy.

5. **No subjective redesign** applied during QA.

---

## Cross-route regression

Verified via `verify-restaurant-d2-calibration.cjs` spot-checks:

| Route | Considerations section | Result |
|-------|------------------------|--------|
| `/daycare-private-school-insurance/` | Renders (≥9 cards) | **PASS** |
| `/greenhouse-agribusiness-insurance/` | Unchanged | **PASS** |
| `/convenience-store-insurance/` | Unchanged | **PASS** |
| `/contractors-insurance/` | Unchanged | **PASS** |

Industry routes without `considerations` do **not** render an empty Practical Considerations section.

---

## Other 2A routes — confirmed untouched

No edits to:

- `/liquor-liability-insurance/`
- `/food-truck-insurance/`
- `/hotel-motel-insurance/`
- `/event-liability-insurance/`
- `/convenience-store-insurance/`

---

## Commit

*(Updated after push — see git log for hash.)*

---

## Stop gates (repeat)

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**

**STOP FOR OWNER REVIEW.**
