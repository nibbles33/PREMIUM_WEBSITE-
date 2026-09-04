# Card Navigation Fix — Owner Review Pack

**Branch:** `cursor/card-navigation-fix-7402`  
**Status:** STOP for owner review — do not merge or deploy

---

## 1. Root cause

Both drag-enabled rails called **`setPointerCapture()` immediately on `pointerdown`**, before determining whether the user intended to click or drag.

That capture steals the pointer from child `<Link>` elements, so the browser never completes a normal click on product cards — cards looked interactive (cursor, hover) but did not navigate.

**Affected surfaces:**
- Homepage Personal Insurance carousel (`PilotPersonalFilmstrip`)
- Product-page related-products rail (`RelatedProductsScrollRail` → `ProductRelatedProducts`, `AutoRelatedProducts`)

**Not affected (already used plain `Link`, no capture):**
- “Yep. We insure that too.” tiles (`PilotBreadthUniverse` / `YepMediaTile`)
- Commercial discovery product rows (`PilotCommercialDiscovery`)

---

## 2. Shared component(s) responsible

| Component | Role |
|---|---|
| `src/lib/pointerDragGuard.ts` | **New** — drag threshold + post-drag click suppression |
| `src/components/pilot/RelatedProductsScrollRail.tsx` | Shared scroll/drag shell for product + auto related rails |
| `src/components/pilot/PilotPersonalFilmstrip.tsx` | Homepage personal insurance carousel |

Card markup (`Link` wrapping entire card) was already correct — the drag layer was blocking navigation.

---

## 3. Files changed

| File | Change |
|---|---|
| `src/lib/pointerDragGuard.ts` | New — 8px movement threshold before drag activation |
| `src/components/pilot/RelatedProductsScrollRail.tsx` | Defer pointer capture until drag threshold crossed |
| `src/components/pilot/PilotPersonalFilmstrip.tsx` | Same threshold pattern for transform-based carousel |
| `src/styles/pilot.css` | `.is-dragging` cursor on related rail track |
| `scripts/card-navigation-hrefs.cjs` | **New** — extracts all 56 configured hrefs from source data |
| `scripts/card-navigation-validate.cjs` | Full click-test + family + mobile touch validation |
| `docs/qa-screenshots/card-navigation-fix/validation-report.json` | Runtime proof (full href-by-href results) |

---

## 4. Drag/click suppression involved?

**Yes.** Immediate `setPointerCapture` on pointerdown was the bug.

**Fix:** Pointer capture activates only after **8px** of movement (`POINTER_DRAG_THRESHOLD_PX`). Tap/click without meaningful movement leaves the link’s native click intact. After a completed drag, a one-shot capture-phase listener suppresses the synthetic click.

---

## 5. Full validation coverage (not a sample)

Automated run against `next start` — **`scripts/card-navigation-validate.cjs`**

| Metric | Result |
|---|---|
| Unique configured hrefs | **56** |
| Click targets extracted from source | **235** (same href may appear on multiple surfaces) |
| Click tests run | **235 / 235 PASS** |
| Href aggregated results | **56 / 56 PASS** |
| HTTP fetch audit | **56 / 56 HTTP 200** |
| Related-rail visual family pages | **16 families, 51 card clicks PASS** |
| Desktop drag tests (120–150px) | **3 / 3 PASS** (no navigation) |
| Mobile touch tests (390px viewport) | **6 / 6 PASS** (3 tap + 3 swipe) |

**Surfaces click-tested:**
- `personalFilmstrip` (8 cards)
- `yepCarousel` (16 tiles)
- `commercialDiscoveryProduct` (31 product rows)
- `commercialDiscoveryCategory` (10 category CTAs)
- `commercialDiscoveryHub` (All Commercial CTA)
- `autoRelatedRail` (7 cards on `/auto-insurance/`)
- `productRelatedRail` (all configured related cards across 55 product pages)

**Related-rail visual families exercised:**

personal-inline, personal-specialty, auto-related, commercial-property, commercial-transportation, commercial-agriculture, commercial-greenhouse, commercial-construction, commercial-hospitality, commercial-food-truck, commercial-professional, commercial-retail, commercial-manufacturing, commercial-real-estate, commercial-product-batch-b, commercial-cyber

Full per-href pass/fail list: `docs/qa-screenshots/card-navigation-fix/validation-report.json` → `hrefResults[]`

---

## 6. Mobile verification (real touch simulation)

Viewport: **390×844**, mobile UA, Puppeteer `touchscreen.tap()` / `touchStart→touchMove→touchEnd`

| Page | Test | Distance | Result |
|---|---|---|---|
| `/` (personal filmstrip) | tap visible card | — | PASS → navigated |
| `/` (personal filmstrip) | swipe | 150px | PASS → stayed on `/` |
| `/commercial-property-insurance/` (related rail) | tap | — | PASS → navigated |
| `/commercial-property-insurance/` (related rail) | swipe | 150px | PASS → stayed on page |
| `/auto-insurance/` (auto related rail) | tap | — | PASS → navigated |
| `/auto-insurance/` (auto related rail) | swipe | 150px | PASS → stayed on page |

---

## 7. Broken/dead hrefs discovered

**None.** All 56 configured discovery/related hrefs return HTTP 200 and click-navigate successfully.

---

## 8. Build result

`npm run build` — **PASS**

---

## Re-run validation

```bash
npm run build
npx next start -p 3016 &
node scripts/card-navigation-hrefs.cjs      # inventory only
node scripts/card-navigation-validate.cjs # full suite (~4 min)
```
