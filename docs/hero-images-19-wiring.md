# Hero Images — 19 Production Assets Wired

**Branch:** `cursor/hero-images-19-7402`  
**Status:** STOP for owner review — do not merge or deploy

---

## Summary

- **19 PNG sources** converted to **WebP** (quality 85, native 1672×941 — matches existing photography masters)
- **20 placement entries** updated/added in `placements.ts` (condo scene shared by two routes)
- **Format:** `.webp` in `public/images/photography/{personal|commercial}/` — matches established system
- **Scope:** Hero asset swap only — no layout, typography, crop, or content changes

---

## Old → New (all 19 routes)

| Route | Previous asset | New asset |
|---|---|---|
| `/garage-dealership-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/garage-dealership-insurance.webp` |
| `/builders-risk-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/builders-risk-insurance.webp` |
| `/cargo-freight-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/cargo-freight-insurance.webp` |
| `/condominium-corporation-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/condo-property-management.webp` |
| `/property-management-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/condo-property-management.webp` |
| `/convenience-store-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/convenience-store-insurance.webp` |
| `/daycare-private-school-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/daycare-private-school-insurance.webp` |
| `/grocery-specialty-food-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/grocery-specialty-food-insurance.webp` |
| `/fitness-gym-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/fitness-gym-insurance.webp` |
| `/hotel-motel-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/hotel-motel-insurance.webp` |
| `/landscaping-snow-removal-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/landscaping-snow-removal-insurance.webp` |
| `/medical-dental-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/medical-dental-insurance.webp` |
| `/pharmacy-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/pharmacy-insurance.webp` |
| `/religious-organizations-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/religious-organizations-insurance.webp` |
| `/salon-barber-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/salon-barber-insurance.webp` |
| `/warehousing-insurance/` | `/images/photography/commercial/commercial-insurance.webp` | `/images/photography/commercial/warehousing-insurance.webp` |
| `/mobile-home-insurance/` | `/images/photography/personal/landlord.webp` | `/images/photography/personal/mobile-home-insurance.webp` |
| `/personal-umbrella-insurance/` | `/images/photography/personal/home-insurance.webp` | `/images/photography/personal/personal-umbrella-insurance.webp` |
| `/life-insurance/` | `/images/photography/special/contact.webp` | `/images/photography/personal/life-insurance.webp` |
| `/group-home-auto-insurance/` | `/images/photography/special/team.webp` (temporary) | `/images/photography/personal/group-home-auto-insurance.webp` |

---

## Remaining fallback / shared-reuse gap (after this change)

**12 commercial routes** still on `commercial-insurance.webp` fallback:

1. `/business-interruption-insurance/`
2. `/crime-fidelity-insurance/`
3. `/cyber-insurance/`
4. `/directors-officers-insurance/`
5. `/employment-practices-liability-insurance/`
6. `/event-liability-insurance/`
7. `/liquor-liability-insurance/`
8. `/non-profit-insurance/`
9. `/pollution-liability-insurance/`
10. `/product-recall-insurance/`
11. `/professional-liability-insurance/`
12. `/small-business-insurance/`

*(Original audit: 28 fallback routes − 16 commercial routes wired here = 12 remaining.)*

No personal routes remain on cross-borrow reuse after this change.

---

## Validation

| Check | Result |
|---|---|
| `npm run build` | PASS |
| All 20 route targets (19 files, 1 shared) HTTP 200 | PASS |
| Dedicated hero asset confirmed (no fallback/reuse) | PASS |
| Condo Corp + Property Management share `condo-property-management.webp` | PASS |
| Homepage `/` regression | PASS |
| Auto `/auto-insurance/` regression | PASS |

Report: `docs/qa-screenshots/hero-images-19/validation-report.json`

### Screenshots (people-heavy routes)

- `docs/qa-screenshots/hero-images-19/daycare-private-school-insurance/`
- `docs/qa-screenshots/hero-images-19/personal-umbrella-insurance/`
- `docs/qa-screenshots/hero-images-19/life-insurance/`
