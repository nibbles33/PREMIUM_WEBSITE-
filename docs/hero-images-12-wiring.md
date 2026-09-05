# Hero Images — Final 12 Commercial Routes Wired

**Branch:** `cursor/hero-images-12-7402`  
**Status:** STOP for owner review — do not merge or deploy

---

## Summary

- **7 PNG sources** converted to **WebP** (quality 85, native 1672×941 — matches hero-images-19 pipeline, no upscaling)
- **13 placement entries** added in `placements.ts` (12 routes: 9 from 7 new files + 2 shared pairs + 3 intentional reuses)
- **Format:** `.webp` in `public/images/photography/commercial/` — matches established system
- **Scope:** Photography registry/config only — no layout, typography, crop, or content changes

---

## Old → New (all 12 routes)

| Route | Previous asset | New asset |
|---|---|---|
| `/directors-officers-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/executive-leadership.webp` |
| `/employment-practices-liability-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/executive-leadership.webp` |
| `/cyber-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/cyber-insurance.webp` |
| `/small-business-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/small-business-insurance.webp` |
| `/non-profit-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/non-profit-insurance.webp` |
| `/event-liability-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/event-venue.webp` |
| `/liquor-liability-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/event-venue.webp` |
| `/business-interruption-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/business-interruption-insurance.webp` |
| `/crime-fidelity-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/crime-fidelity-insurance.webp` |
| `/professional-liability-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/professional-offices-insurance.webp` *(reuse)* |
| `/pollution-liability-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/manufacturing-insurance.webp` *(reuse)* |
| `/product-recall-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/manufacturing-insurance.webp` *(reuse)* |

---

## Shared pairs (same file, two routes)

| Shared asset | Routes |
|---|---|
| `executive-leadership.webp` | `/directors-officers-insurance/` + `/employment-practices-liability-insurance/` |
| `event-venue.webp` | `/event-liability-insurance/` + `/liquor-liability-insurance/` |

Same pattern as `condo-property-management.webp` (Condo Corp + Property Management) from hero-images-19 PR.

---

## Confirmation

**Zero commercial routes remain on unintentional `commercial-insurance.webp` fallback.**

Only `/commercial-insurance/` (Commercial Insurance Hub) legitimately uses `commercial-insurance.webp` as its canonical owner.

---

## Validation

| Check | Result |
|---|---|
| `npm run build` | PASS |
| All 12 touched routes HTTP 200 + dedicated hero asset | PASS |
| D&O + EPLI share `executive-leadership.webp` | PASS |
| Event Liability + Liquor Liability share `event-venue.webp` | PASS |
| Full commercial route audit (43 routes) — zero unintentional fallback | PASS |
| Homepage `/` regression | PASS |
| Auto `/auto-insurance/` regression | PASS |

Report: `docs/qa-screenshots/hero-images-12/validation-report.json`

### Screenshots (3 routes, desktop + mobile)

- `docs/qa-screenshots/hero-images-12/directors-officers-insurance/`
- `docs/qa-screenshots/hero-images-12/cyber-insurance/`
- `docs/qa-screenshots/hero-images-12/non-profit-insurance/`

---

## Source PNG mapping (Part A — 7 new images)

| Concept | Source PNG | Output WebP |
|---|---|---|
| Executive boardroom / leadership | `ChatGPT Image Sep 1, 2026, 09_43_53 PM (35).png` | `executive-leadership.webp` |
| Cybersecurity / modern business technology | `ChatGPT Image Sep 1, 2026, 09_43_49 PM (25).png` | `cyber-insurance.webp` |
| Professional consultation / advisory office | `ChatGPT Image Sep 1, 2026, 09_44_01 PM (54).png` | `small-business-insurance.webp` |
| Community / volunteer organization | `ChatGPT Image Sep 1, 2026, 09_43_55 PM (39).png` | `non-profit-insurance.webp` |
| Event venue setting | `ChatGPT Image Sep 1, 2026, 09_44_04 PM (58).png` | `event-venue.webp` |
| Business disruption / paused operations | `ChatGPT Image Sep 1, 2026, 09_43_57 PM (45).png` | `business-interruption-insurance.webp` |
| Financial integrity / security detail | `ChatGPT Image Sep 1, 2026, 09_44_01 PM (55).png` | `crime-fidelity-insurance.webp` |

Sources from `assets-source/website-photography/_inbox/` — converted via `scripts/hero-images-12-convert.cjs`.
