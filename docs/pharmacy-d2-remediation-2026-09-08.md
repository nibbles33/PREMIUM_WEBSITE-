# Pharmacy Insurance — D2 Remediation (Independent Route)

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Date:** 2026-09-08  
**Route:** `/pharmacy-insurance/`  
**Prior site baseline:** A 12 / B 16 / C 18 / D 12 (post D2 Precision Fix)  
**Status:** Pharmacy complete — **STOP FOR OWNER REVIEW**

---

## Stop gates

- **NO MERGE · NO DEPLOY · NO VERCEL PROMOTION**
- Committed to feature branch only
- Eleven frozen routes **unchanged** (Restaurant through Greenhouse)

---

## 1. Executive summary

Independent D2 remediation for `/pharmacy-insurance/` with D3-level primary-source research. Pharmacy operations have professional dispensing, regulatory, privacy, drug-storage, and high-value inventory exposures materially different from ordinary retail — the page now reflects that distinction.

| Metric | Before | After |
|--------|--------|-------|
| Classification | **D** | **A** |
| Substantive words | 205 | **1,430** |
| Explorer states | 4 (thin cards, no V2 detail) | **4** (V2 detail pairs preserved) |
| Considerations | 0 | **7** (553w, expandable) |
| FAQs | 4 | **5** |
| HIGH flags | 1 | **0** |
| MEDIUM flags | 0 | 0 |
| LOW flags | 0 | **1** (OCP $2M/$4M — verified regulatory basis) |

**Site-wide delta:** A **12 → 13** (+1) · D **12 → 11** (−1) · B/C unchanged.

**Validation:** `npm run build` ✅ · `npx tsc --noEmit` ✅ · product-content audit ✅ · Explorer UX v2 regression ✅ · route QA ✅ (390 / 768 / 1024 / 1440).

---

## 2. Current-page problems (before)

- Hero read like generic retail — no professional dispensing, cold-chain, or PHIPA distinction
- **HIGH:** Commercial Property card — flat `"Covers inventory, fixtures… including narcotics storage security requirements"`
- Cyber card — flat `"Covers patient data breaches"` (removed in rewrite)
- No V2 Explorer `detailTitle` / `detailDescription` pairs — RIGHT/LEFT distinction absent
- No considerations section
- FAQs did not directly address CGL vs dispensing errors, OCP PPLI vs business insurance, refrigerated spoilage, or PHIPA vs cyber
- Conflated regulatory storage requirements with insurance coverage
- Implied narcotics security requirements as an insurance coverage feature

---

## 3. Research / source table

| Topic | Source | Use in copy |
|-------|--------|-------------|
| OCP personal professional liability (PPLI) | [OCP — Professional Liability Insurance](https://www.ocpinfo.com/practice-education/professional-liability-insurance/) | Individual registrant requirement; corporate policies do not meet registration requirements; $2M/$4M minimums |
| OCP By-Law No. 7 | OCP primary material (referenced via OCP PPLI page) | PPLI limits, prior-acts, registrant categories |
| PHIPA — health information custodians | [IPC Ontario — PHIPA](https://www.ipc.on.ca/privacy-laws/privacy-act/) | Pharmacies as custodians; regulatory safeguards separate from insurance |
| Personal health information safeguards | PHIPA, 2004, S.O. 2004, c. 3 | Reasonable safeguards obligation — not satisfied by purchasing cyber insurance |
| Dispensing vs premises liability | Insurance market / professional liability structure | CGL does not standardly cover dispensing-error allegations |
| Temperature-sensitive inventory | Commercial property / equipment breakdown market practice | Spoilage, utility interruption, equipment breakdown often need endorsements |
| Crime / theft / controlled substances | Property and crime endorsement practice | Scheduling, security conditions, separate from regulatory storage rules |
| Business interruption | Standard BI trigger (direct physical loss) | Licence suspension / non-covered breakdown may not trigger |
| Prescription delivery | Ontario automobile insurance framework | Auto coverage separate from CGL; delivery disclosure for underwriting |
| Designated manager / accreditation | OCP pharmacy accreditation (DPRA) | Referenced lightly — regulatory context, not coverage guarantee |

**Not used:** Broker SEO pages for regulatory claims.

---

## 4. Regulatory vs insurance boundaries

| Area | Regulatory (OCP / PHIPA / IPC) | Insurance (policy-dependent) |
|------|-------------------------------|------------------------------|
| Professional dispensing | OCP PPLI required in registrant's own name | Business E&O / professional liability where purchased |
| Patient records | PHIPA safeguards, custodian obligations | Cyber / privacy coverage where purchased |
| Narcotics storage | OCP / federal operational requirements | Crime / property subject to policy terms and security conditions |
| Refrigerated stock | Operational cold-chain protocols | Property + possible equipment breakdown / spoilage endorsements |
| Delivery | Highway Traffic Act / auto insurance regulation | Commercial auto, non-owned/hired auto where applicable |

Copy keeps these lanes separate — regulatory obligations are never stated as automatically insured.

---

## 5. Claims removed or softened

| Removed / softened | Classification | Action |
|--------------------|----------------|--------|
| `"Covers inventory, fixtures, and dispensing equipment including narcotics storage security requirements"` | UNVERIFIED as flat coverage | Replaced with hedged property description; security referenced as underwriting factor only |
| `"Covers patient data breaches"` | UNVERIFIED flat guarantee | Replaced with `"May help address certain costs… where purchased"` |
| Narcotics storage security as coverage feature | REGULATORY ≠ COVERAGE | Moved to considerations as operational/security disclosure context |
| Implied CGL covers dispensing errors | POLICY-DEPENDENT | Explicit FAQ + GL detail: professional claims evaluated under E&O |
| Implied cyber satisfies PHIPA | REGULATORY | Explicit FAQ + cyber detail: compliance separate from insurance |
| Implied refrigerated stock automatically covered | POLICY-DEPENDENT | Endorsement/trigger language in property card, consideration, FAQ |
| `"Ontario pharmacists must maintain personal professional liability insurance under OCP requirements"` | VERIFIED (REGULATORY) | Retained — sourced from OCP primary material |
| OCP $2M/$4M minimums | VERIFIED (REGULATORY) | Retained — audit flags LOW for dollar citation with verified basis |

---

## 6. Internal claim review (material propositions)

| Proposition | Tag |
|-------------|-----|
| Pharmacies combine professional dispensing, inventory, refrigeration, PHI | VERIFIED (operations) |
| Commercial property may cover fixtures/stock subject to terms | POLICY-DEPENDENT |
| Temperature spoilage often needs endorsements | POLICY-DEPENDENT / UNDERWRITING PRACTICE |
| CGL may address premises injury, not dispensing errors | POLICY-DEPENDENT |
| Business E&O may address entity-level professional claims | POLICY-DEPENDENT |
| Part A registrants must maintain PPLI in own name | REGULATORY (OCP) |
| Corporate employer policies do not meet OCP registration requirements | REGULATORY (OCP) |
| $2M per claim / $4M aggregate PPLI minimums | REGULATORY (OCP By-Law) |
| Pharmacies are PHIPA health information custodians | REGULATORY |
| Cyber does not satisfy PHIPA compliance | REGULATORY vs POLICY-DEPENDENT |
| Crime/hold-up may need endorsements | POLICY-DEPENDENT |
| BI responds after covered direct physical loss | POLICY-DEPENDENT |
| Delivery creates separate auto exposure | REGULATORY / POLICY-DEPENDENT |
| Backup power affects underwriting | UNDERWRITING PRACTICE |

**No UNVERIFIED proposition in visitor-facing copy.**

---

## 7. Explorer architecture (unchanged)

| Property | Value |
|----------|-------|
| State count | **4** |
| Archetype | `pharmacy-retail` |
| Image | `pharmacy-insurance-interactive-master.png` |
| Default state | `commercial-property` |

| State ID | Title | shortLabel | Zone mapping |
|----------|-------|------------|--------------|
| `commercial-property` | Commercial Property | Property | dispensary-counter, retail-aisle, cold-chain |
| `general-liability` | General Liability | Liability | storefront, consult-booth, retail-aisle |
| `professional-liability` | Professional Liability | Professional | compounding-lab, consult-booth, dispensary-counter |
| `cyber-privacy` | Cyber & Privacy | Cyber | compounding-lab, dispensary-counter |

**V2 detail pairs (RIGHT = coverage / LEFT = pharmacy-specific):**

1. **Property** — card: may help cover building/stock · detail: cold-chain value + endorsement triggers
2. **Liability** — card: premises injury · detail: slip ≠ dispensing-error claim
3. **Professional** — card: dispensing/counselling errors at business level · detail: OCP PPLI separate from business E&O
4. **Cyber** — card: breach/ransomware costs where purchased · detail: PHIPA custodian obligations separate

No new images. No manifest or zone ID changes.

---

## 8. Final consideration structure (7, expandable)

1. OCP personal professional liability vs. pharmacy business insurance
2. Dispensing errors, counselling, and clinical services
3. Refrigerated, high-value, and temperature-sensitive inventory
4. PHIPA, privacy, and cyber exposure
5. Theft, robbery, and controlled substances
6. Business interruption and cold-chain dependency
7. Prescription delivery and off-premises exposure

---

## 9. FAQ structure (5)

1. Does general liability cover dispensing errors?
2. Is pharmacist professional liability the same as pharmacy business insurance?
3. What happens if refrigerated medication is spoiled after equipment or power failure?
4. Does pharmacy insurance cover theft of prescription inventory?
5. Does cyber insurance replace PHIPA compliance?

---

## 10. Before / after audit

### Pharmacy route

| Field | Before | After |
|-------|--------|-------|
| Classification | D | **A** |
| Substantive words | 205 | **1,430** |
| Avg card words | 21 | **70** |
| Considerations | absent (0w) | **specific/useful (553w)** |
| FAQs | 4 | **5** |
| HIGH | 1 | **0** |
| MEDIUM | 0 | 0 |
| LOW | 0 | **1** |

### Site-wide

| Grade | Before | After | Delta |
|-------|--------|-------|-------|
| A | 12 | **13** | +1 |
| B | 16 | 16 | — |
| C | 18 | 18 | — |
| D | 12 | **11** | −1 |

---

## 11. Responsive QA

Screenshots: `docs/qa-screenshots/pharmacy-d2-remediation-2026-09-08/`

| Viewport | Overflow | Explorer | Hero | Notes |
|----------|----------|----------|------|-------|
| 390 | 0 | ✅ | ✅ | Mobile hero + explorer |
| 768 | 0 | ✅ | — | |
| 1024 | 0 | ✅ | — | |
| 1440 | 0 | ✅ | ✅ | All 4 explorer states captured |

**Verified:**
- Hero communicates pharmacy ≠ ordinary retail
- Trust band distinct from hero
- All 4 Explorer states switch correctly (detail titles match)
- RIGHT/LEFT copy not duplicated (`duplicateDesc: false` all states)
- 7 considerations, expandable, one-open-at-a-time ✅
- 5 FAQs present
- Forbidden legacy phrases absent
- No console errors
- Explorer image present all states

**Note:** Initial QA failed because production server on `:3018` served a stale build (JS 404s, React not hydrating). Rebuilt (`npm run build`) and restarted server — tab interaction then passed.

---

## 12. Regression results

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Pass |
| `npx tsc --noEmit` | ✅ Pass |
| `npx tsx scripts/product-content-audit.ts` | ✅ A 13 / B 16 / C 18 / D 11 |
| `node scripts/verify-coverage-explorer-ux-v2.cjs` | ✅ Pass (daycare, restaurant, contractors) |
| `node scripts/verify-pharmacy-d2.cjs` | ✅ Pass |
| Frozen routes content diff | ✅ No changes to 11 frozen routes |

---

## 13. Remaining concerns

1. **OCP dollar amounts (LOW flag):** $2M/$4M PPLI minimums are current per OCP primary material — retained as verified regulatory fact; monitor if OCP By-Law amendments change limits.
2. **Business E&O availability:** Copy hedges that entity-level professional coverage is "where purchased" — actual market availability and wording vary by insurer; buyers should confirm with broker.
3. **Compounding / clinical services:** Expanded services (injections, POC testing) need full disclosure — standard retail wording may not fit every activity.
4. **Delivery:** Included as consideration only where material; pharmacies without delivery can ignore — no standalone auto card added (auto only where delivery applies).
5. **Product liability:** Not added as Explorer state — not verified as a standard standalone pharmacy card in current architecture; product-related claims folded into professional/premises discussion where relevant.

---

## Files changed

| File | Change |
|------|--------|
| `src/data/product-pages/commercial-products-specialty.ts` | Pharmacy D2 content rewrite |
| `src/lib/buildPilotProductConfig.ts` | `pharmacy-insurance` → expandable considerations |
| `scripts/verify-pharmacy-d2.cjs` | Route verification + screenshots (new) |
| `docs/pharmacy-d2-remediation-2026-09-08.md` | This report |
| `docs/qa-screenshots/pharmacy-d2-remediation-2026-09-08/` | QA screenshots + verification JSON |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated audit baseline |
| `docs/product-content-audit-2026-09-07.md` | Regenerated audit report |

**Not touched:** Explorer manifest, zone mappings, images, audit scanner logic, frozen routes.
