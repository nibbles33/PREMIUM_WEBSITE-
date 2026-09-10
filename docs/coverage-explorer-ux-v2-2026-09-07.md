# Coverage Explorer UX V2 + Daycare Pilot — Implementation Report

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07` (from `cursor/daycare-content-2026-09-07`)  
**Status:** Implementation complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE**
- **NO DEPLOY**
- **NO VERCEL PROMOTION**

---

## 1. Daycare re-audit result

Re-ran `scripts/product-content-audit.ts` against implemented Daycare content on this branch.

| Metric | Pre-implementation (audit snapshot) | Post-implementation (this branch) |
|--------|--------------------------------------:|----------------------------------:|
| Substantive words | 214 | **956** |
| Coverage cards | 4 | **6** |
| Practical considerations | 0 | **9** (186 words) |
| FAQ items | 4 | **5** |
| Coverage card quality | thin/generic | **specific/hedged (strong)** |
| Hero words | — | **83** (Ontario Reg 137/15 specific) |
| HIGH safety flags | 2 | **1** |
| MEDIUM safety flags | — | **0** |
| **Classification** | **D** | **D** |

### Remaining HIGH flag (exact — for owner review)

**Update (2026-09-07):** Audit script negation-skip fix applied — see `docs/audit-script-negation-fix-2026-09-07.md`. Daycare re-audit result:

| Metric | Value |
|--------|------:|
| HIGH/MEDIUM flags | **0** |
| Classification | **A** |
| Reason | Substantive (956w), 6 cards avg 57.7w, considerations yes, FAQ unique |

The prior HIGH flag on FAQ *"shouldn't be assumed to be automatically included"* was a script gap (no negation skip on `automatically included`). Daycare content was not changed.

<details>
<summary>Pre-fix flag (historical — cleared by script fix)</summary>

| Audit field | `faq` |
|-------------|-------|
| Issue label | Automatic inclusion claim |
| Severity | **high** |
| **Exact flagged sentence (verbatim):** | *"Abuse and molestation liability is typically its own distinct coverage, separate from general liability — it shouldn't be assumed to be automatically included."* |

</details>

**Base page content (excluding new Explorer detail copy):** ~765 substantive words — matching the Daycare implementation target. The audit total of 956 includes ~191 words from the six new optional `detailDescription` fields added in this UX task.

---

## 2. Daycare visual review result

Reviewed pre-UX screenshots and captured post-UX screenshots on this branch.

| Check | Finding |
|-------|---------|
| Regulatory hero/intro density | **Acceptable** — long but readable; appropriate for licensed-operator context. Desktop line length is controlled; mobile stacks cleanly. |
| Practical Considerations layout | **Clean** — 9 cards in responsive grid; lead disclosure card + sub-items + footnote read logically. |
| FAQ layout | **Clean** — accordion spacing consistent; no overlap or truncation. |
| Section heights / whitespace | **No awkward gaps** — Explorer, considerations, FAQ, and related products flow naturally. |
| Mobile readability (390px) | **Strong** — no text clipping; cards and Explorer stack correctly. |
| Horizontal overflow | **None** — `overflow delta = 0` at all tested viewports. |

**Rendering defect:** Pre-UX screenshots showed the Coverage Explorer section collapsed/missing — caused by a stale dev-server process serving broken chunks, not a content defect. Post-implementation screenshots confirm Explorer renders correctly with UX v2 detail split.

**Screenshots:**

| Viewport | Path |
|----------|------|
| Desktop 1440 | `docs/qa-screenshots/daycare-content-2026-09-07/desktop_1440.png` |
| Mobile 390 | `docs/qa-screenshots/daycare-content-2026-09-07/mobile_390.png` |
| UX v2 regression set | `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/` |

---

## 3. Current Explorer architecture

### Shared components

| Component | Role |
|-----------|------|
| `ProductCoverageExplorer.tsx` | Product-page shell: LEFT stage + detail card; RIGHT tab selector |
| `AutoCoverageExplorer.tsx` | Auto-page clone (same layout pattern) |
| `ProductCoverageVisualStage.tsx` | Adapter → `CoverageVisualStage`; passes `showStageEyebrow={false}` when explorer present |
| `CoverageVisualStage.tsx` | Core image renderer (interactive-master, state-images, cutaway, photo, css) |
| `CoverageStateImageStage.tsx` | Restaurant/Contractors multi-image stage + magnifier |
| `buildPilotProductConfig.ts` | `toCoverageItems()` maps source cards → runtime `ProductCoverageItem[]` |
| `buildRouteExplorerConfig.ts` | Per-route explorer visual config (scene mode, assets, zones) |
| `interactive-master-assets.ts` | 58-route asset registry |

### Data flow

```
ProductPageContent.coverageTypes (CoverageCard[])
  → adaptCommercialProductContent / buildPilotProductConfig
  → toCoverageItems() → ProductCoverageItem[]
  → ProductCoverageExplorer (active state)
```

### Render locations

| Area | Fields rendered |
|------|-----------------|
| **RIGHT selector** (tab button) | `shortLabel` + `description` |
| **LEFT detail card** (under image) | `detailTitle ?? title` + `detailDescription ?? detail` |
| **Stage eyebrow** (above image) | `visualEyebrow` — **hidden** when explorer present |
| **SR-only announce** | `${detailTitle}: ${detailDescription}` |

### Selected state

- `activeId` state in `ProductCoverageExplorer` / `AutoCoverageExplorer`
- Passed to `ProductCoverageVisualStage` as `active` item
- Tab panel uses `aria-labelledby={`${baseId}-tab-${activeId}`}` for accessible state

### Special implementations

| Route | Scene mode | Notes |
|-------|------------|-------|
| **Restaurant** | `coverage-state-images` | Crossfade, preloading, interaction gate, desktop magnifier, reduced-motion |
| **Contractors** | `coverage-state-images` | Static state images only; `alwaysUseStateImages`; no magnifier; no motion overlay |
| **Auto** | `interactive-master` | Separate `AutoCoverageExplorer`; same detail/selector split |
| **All others** | `interactive-master` | Standard diorama + zone dim; contain/no-crop geometry |

### Custom rendering

No route overrides the shared Explorer shell. Commercial Insurance Hub (`/commercial-insurance/`) has registry entry but **no mounted Explorer UI** (hub layout).

---

## 4. Active Explorer route count

| Count | Value |
|-------|------:|
| Registry entries (`ROUTE_TO_INTERACTIVE_MASTER_FILE`) | **58** |
| UI-mounted Explorers (excludes commercial hub) | **57** |
| `interactive-master` mode | **55** product + **1** auto = **56** |
| `coverage-state-images` mode | **2** (Restaurant, Contractors) |

Previous count of 57 UI-mounted routes **still correct** on this branch.

---

## 5. Files changed

| File | Change |
|------|--------|
| `src/components/LineInsurancePage.tsx` | Optional `detailTitle?`, `detailDescription?` on `CoverageCard` |
| `src/types/pilot-product.ts` | Same optional fields on `ProductCoverageItem` |
| `src/data/pilot-auto.ts` | Optional fields on `AutoCoverageItem` (type parity) |
| `src/lib/buildPilotProductConfig.ts` | Pass-through in `toCoverageItems()` |
| `src/components/pilot/product/ProductCoverageExplorer.tsx` | Detail fallback rendering |
| `src/components/pilot/product/ProductCoverageVisualStage.tsx` | `showStageEyebrow={false}`; SR detail uses rich copy |
| `src/components/pilot/coverage-explorer/CoverageVisualStage.tsx` | `showStageEyebrow` prop (default `true`) |
| `src/components/pilot/auto/AutoCoverageExplorer.tsx` | Detail fallback + eyebrow hidden (parity) |
| `src/data/product-pages/commercial-products-specialty.ts` | Daycare detail copy only (6 cards) |
| `scripts/verify-coverage-explorer-ux-v2.cjs` | Regression script (new) |
| `scripts/product-content-audit.ts` | Copied from content-audit branch for re-audit |

---

## 6. Type / data-model change

```typescript
// CoverageCard (source data)
detailTitle?: string;
detailDescription?: string;

// ProductCoverageItem (runtime)
detailTitle?: string;
detailDescription?: string;
```

Mapped in `toCoverageItems()`:

```typescript
detailTitle: item.detailTitle,
detailDescription: item.detailDescription,
```

---

## 7. Fallback behavior

**RIGHT selector:** unchanged — always `shortLabel` + `description`.

**LEFT detail area:**

```typescript
const detailTitle = active.detailTitle ?? active.title;
const detailDescription = active.detailDescription ?? active.detail;
// detail defaults to description via: detail = item.detail ?? item.description
```

All routes without `detailTitle`/`detailDescription` continue showing title + description under the image — identical to pre-change behavior.

---

## 8. Daycare detail content added

Populated for `/daycare-private-school-insurance/` only:

| Coverage | detailTitle | Words (desc) |
|----------|-------------|-------------:|
| General Liability | When everyday accidents become liability claims | ~49 |
| Property | Protecting the spaces children learn and play in | ~48 |
| Abuse & Molestation Liability | A coverage that needs to be addressed specifically | ~47 |
| Professional Liability | Protection for professional and care-related decisions | ~44 |
| Directors & Officers | Protection for the people making governance decisions | ~47 |
| Business Interruption | When a covered loss forces operations to stop | ~46 |

All copy is hedged, derived from approved Daycare content. No new insurance assertions, limits, or guarantees.

---

## 9. Redundant top-label decision

**Removed** the uppercase `pilot-ce-stage-eyebrow` label above the Explorer image when a visual explorer is present.

| Concern | Resolution |
|---------|------------|
| Accessibility | Tab panel retains `aria-labelledby` pointing to active tab; `aria-live="polite"` + SR-only detail text announces state changes |
| Icon-only fallback | Eyebrow **preserved** on `.pilot-product-coverage-stage--icon-only` routes without explorer assets |
| Default behavior | `showStageEyebrow` defaults to `true` in `CoverageVisualStage` for any direct consumers |

---

## 10. Restaurant regression results

| Check | Result |
|-------|--------|
| All 4 states | **PASS** |
| Crossfade / state images | **PASS** |
| Desktop magnifier (fine pointer) | **PASS** — hint/lens present |
| Mobile magnifier hidden | **PASS** — not rendered without fine pointer |
| Fallback detail rendering | **PASS** — title/description under image |
| Eyebrow removed | **PASS** |
| object-fit: contain / no crop | **PASS** |

Screenshot: `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/restaurant-desktop_1440.png`

---

## 11. Contractors regression results

| Check | Result |
|-------|--------|
| All 4 states | **PASS** |
| Static state images only | **PASS** |
| No animation/motion prototype | **PASS** |
| Fallback detail rendering | **PASS** |
| Eyebrow removed | **PASS** |
| object-fit: contain | **PASS** |

Screenshot: `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/contractors-desktop_1440.png`

---

## 12. Normal-route regression results

Tested: `/home-insurance/`, `/cyber-insurance/`, `/greenhouse-agribusiness-insurance/`

| Check | Result |
|-------|--------|
| Explorer renders | **PASS** |
| Selector works | **PASS** |
| Fallback title/description under image | **PASS** (expected duplicateDesc=true — no detail fields populated) |
| No content disappeared | **PASS** |
| Eyebrow removed | **PASS** |
| No overflow | **PASS** |

Screenshot: `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/home-insurance-desktop_1440.png`

---

## 13. Viewport results (Daycare)

| Viewport | Overflow | Explorer present |
|----------|----------|------------------|
| 390 | 0 | ✅ |
| 768 | 0 | ✅ |
| 1024 | 0 | ✅ |
| 1280 | 0 | ✅ |
| 1440 | 0 | ✅ |

Keyboard navigation on Daycare tabs: **PASS**  
Touch/tab click on all 6 Daycare states: **PASS**

---

## 14. Build / typecheck results

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** |
| `npx tsc --noEmit` | **PASS** |
| Console errors (UX v2 regression) | **0** |
| `scripts/verify-coverage-explorer-ux-v2.cjs` | **PASS** |

---

## 15. Remaining gaps

1. **Detail copy populated for Daycare only** — other 56 routes retain fallback behavior until individually authored.
2. **Daycare classification** — post-fix audit: **Class A** (0 high/med flags); see `docs/audit-script-negation-fix-2026-09-07.md`.
3. **Normal routes still show selector/detail duplication** — by design until detail fields are populated per route.
4. **Unrelated repo noise** — working tree contains pre-existing untracked/modified files outside this task scope (contractors experiments, deployment scripts); not touched.

---

## Verification commands

```bash
npm run build
npx tsc --noEmit
npx tsx scripts/product-content-audit.ts
BASE_URL=http://localhost:3018 node scripts/verify-coverage-explorer-ux-v2.cjs
```

**Regression artifact:** `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/regression.json`
