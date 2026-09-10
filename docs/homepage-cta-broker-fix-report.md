# Homepage Final CTA — Broker Button Visibility Fix

**Branch:** `cursor/homepage-cta-broker-visibility-7402`  
**Status:** STOP for owner review — do not merge or deploy

---

## Audit conclusion: (b) separate implementation, same root cause

| Layer | Finding |
|---|---|
| **Shared component** | Yes — all use `PremiumPilotButton` with `variant="secondary"` → `.pilot-btn-secondary` |
| **Auto final CTA (previously fixed)** | Used dedicated CSS class `pilot-auto-final-broker-btn` — **not regressing** |
| **Product final CTAs (previously fixed)** | Used dedicated CSS class `pilot-product-final-broker-btn` — **not regressing** |
| **Homepage final CTA (this bug)** | **Separate implementation** — used inline Tailwind `border-white/40 text-white hover:…` instead of the fixed CSS class |

**Root cause:** Base `.pilot-btn-secondary` sets `color: var(--pilot-charcoal)` and a dark border — correct on light backgrounds, invisible on charcoal. Inline Tailwind utilities lose the cascade fight to `.pilot-btn-secondary` in `pilot.css`, so resting state shows dark-on-dark text. Hover applies `.pilot-btn-secondary:hover { color: var(--pilot-gold-dark) }` which finally makes the label visible.

This is **not** the Auto component regressing — it is the **same class of bug** on a **different surface** that never received the Auto/Product CSS fix.

---

## Fix

Introduced shared modifier **`.pilot-charcoal-secondary-btn`** consolidating the Auto/Product charcoal-secondary pattern:

- Resting: white text, gold/champagne border (`rgba(208, 173, 38, 0.65)`)
- Hover/focus: gold text + border, subtle gold background wash
- No hover dependency for baseline visibility

**Also fixed** (same faulty Tailwind pattern on dark backgrounds):
- `PilotHomeHero` — hero broker CTA
- `PilotCommercialDiscovery` — “All Commercial” secondary button
- `PilotTruckingPage` — 2 broker CTAs

Auto/Product final CTAs migrated to the shared class name (legacy alias selectors retained in CSS).

---

## Files changed

| File | Change |
|---|---|
| `src/styles/pilot.css` | Add `.pilot-charcoal-secondary-btn`; consolidate auto/product rules |
| `src/components/pilot/PilotFinalCta.tsx` | Homepage final CTA — use shared class |
| `src/components/pilot/PilotHomeHero.tsx` | Hero broker CTA |
| `src/components/pilot/PilotCommercialDiscovery.tsx` | All Commercial button |
| `src/components/pilot/PilotTruckingPage.tsx` | 2 broker buttons |
| `src/components/pilot/auto/AutoFinalCta.tsx` | Migrate to shared class |
| `src/components/pilot/product/ProductFinalCta.tsx` | Migrate to shared class |
| `scripts/homepage-cta-broker-validate.cjs` | Visibility + navigation validation |

---

## Talk to a Broker destination

**`/talk-to-a-broker/`** — HTTP 200, click navigation confirmed on all tested surfaces.

---

## Verification results

| Surface | Viewport | Resting | Hover | Focus | Click |
|---|---|---|---|---|---|
| Homepage final CTA | 1440px desktop | PASS (white text, gold border) | PASS | PASS | PASS → `/talk-to-a-broker/` |
| Homepage final CTA | 390px mobile | PASS | — | — | PASS → `/talk-to-a-broker/` |
| Auto final CTA | 1440px | PASS | PASS | PASS | PASS |
| Home insurance final CTA | 1440px | PASS | PASS | PASS | PASS |
| Commercial property final CTA | 1440px | PASS | PASS | PASS | PASS |

Runtime proof: `docs/qa-screenshots/homepage-cta-broker-fix/validation-report.json`

---

## Build result

`npm run build` — **PASS**

---

## Re-run validation

```bash
npm run build && npx next start -p 3017 &
node scripts/homepage-cta-broker-validate.cjs
```
