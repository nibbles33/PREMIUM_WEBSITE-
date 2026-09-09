# Grade C Batch A — Professional & Advisory Liability — Phase 2 Implementation

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Implementation base:** `ca2d79c` (research commit)  
**Implementation date:** 2026-09-09  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`

**Status:** **STOP FOR OWNER REVIEW** — do not merge or deploy

---

## IMPLEMENTATION BASE

| Item | Value |
|------|-------|
| Frozen content base | `15ecf15` |
| Research commit | `ca2d79c` |
| Research doc | `docs/grade-c-batch-a-professional-research-2026-09-09.md` |

---

## FILES CHANGED

| File | Change |
|------|--------|
| `src/data/product-pages/commercial-products-core.ts` | Professional Liability — full copy, V2, considerations, FAQs |
| `src/data/commercial-industries.ts` | Professional Offices + Real Estate — full copy, V2, considerations, FAQs; `whoItIsFor?` type field |
| `src/data/product-pages/commercial-products-specialty.ts` | Medical & Dental — full copy, V2, considerations, FAQs |
| `src/lib/buildPilotProductConfig.ts` | Expandable considerations for batch routes; real-estate related link → Landlord Insurance; trust-band copy for offices/real estate |
| `scripts/verify-grade-c-batch-a.cjs` | **NEW** — Batch A puppeteer verifier |
| `docs/product-content-audit-2026-09-07.md` | Regenerated |
| `docs/qa-screenshots/product-content-audit-2026-09-07/audit-data.json` | Regenerated |
| `docs/qa-screenshots/grade-c-batch-a-2026-09-09/` | **NEW** — visual QA screenshots + verification JSON |
| `docs/qa-screenshots/site-integration-final-7402/explorer-full-regression.json` | Regenerated (228/228 pass) |

**Not changed:** Explorer runtime, images, manifest IDs, scanner rules, unrelated routes, navigation, homepage, carriers.

---

## BEFORE / AFTER BY ROUTE

### Professional Liability

| Metric | Before | After |
|--------|-------:|------:|
| **Words** | 391 | **1371** |
| **Grade** | C | **A** |
| **Flags** | 1 LOW | **0** |
| **Explorer V2** | No | **Yes — 4/4 states** |
| **Considerations** | 3 thin (~66w) | **8 expandable (~463w)** |
| **FAQs** | 4 | **5** |

**Key changes:** Removed unsupported `$1M–$5M per occurrence` FAQ claim; hedged all coverage cards; profession-segment Explorer preserved with full V2 pairs; claims-made/retro/contract/subcontractor depth in considerations.

---

### Professional Offices

| Metric | Before | After |
|--------|-------:|------:|
| **Words** | 325 | **1299** |
| **Grade** | C | **A** |
| **Flags** | 0 | **0** |
| **Explorer V2** | No | **Yes — 4/4 states** |
| **Considerations** | 0 | **8 expandable (~437w)** |
| **FAQs** | 4 | **5** |

**Key changes:** Office package coordination (GL + property + optional E&O + cyber); cross-link to standalone Professional Liability in Explorer/FAQ; no duplicate E&O mechanics.

---

### Real Estate

| Metric | Before | After |
|--------|-------:|------:|
| **Words** | 283 | **1250** |
| **Grade** | C | **A** |
| **Flags** | 0 | **2 LOW** (regulatory wording — verified) |
| **Explorer V2** | No | **Yes — 4/4 states** |
| **Considerations** | 0 | **8 expandable (~420w)** |
| **FAQs** | 4 | **5** |

**Key changes:** **Brokerage/registrant-primary** audience; RECO mandatory program explained with exact limits; `landlord-coverage` **ID preserved** — visitor-facing state is **Cyber & Privacy**; landlord FAQ removed; cross-links to `/landlord-insurance/` and `/property-management-insurance/`.

**Explorer image note:** Underlying interactive master image unchanged per owner instruction. `landlord-coverage` manifest zones (`exterior-signage`, `reception-lobby`) remain mapped — visual semantics for cyber are imperfect but not changed. **Flag for owner visual review** if zone highlighting feels misleading.

---

### Medical & Dental

| Metric | Before | After |
|--------|-------:|------:|
| **Words** | 242 | **1301** |
| **Grade** | C | **A** |
| **Flags** | 0 | **1 LOW** (RCDSO dollar minimums — verified) |
| **Explorer V2** | No | **Yes — 4/4 states** |
| **Considerations** | 0 | **8 expandable (~472w)** |
| **FAQs** | 4 | **5** |

**Key changes:** Clinic entity vs individual professional protection; separate **For physicians** / **For dentists** consideration blocks; CMPA described as mutual defence org (not insurance); PHIPA separated from cyber coverage; pharmacy architectural pattern without OCP content.

---

## OWNER DECISIONS IMPLEMENTED

### A — Real Estate (brokerage-primary)

- Hero, intro, FAQs, and considerations focus on **brokerages / office operations / registrants**
- Landlord investor content **removed** from core page; cross-linked to `/landlord-insurance/`
- Property management cross-linked to `/property-management-insurance/`
- Technical ID `landlord-coverage` **preserved**; visitor title **Cyber & Privacy**
- RECO program attributed correctly; broker does **not** replace RECO program

### B — Professional Liability (profession segments)

- IDs preserved: `accountants-bookkeepers`, `consultants-advisors`, `engineers-architects`, `financial-advisors-it-consultants`
- V2 detail copy teaches profession-specific E&O exposure + why it matters

### C — Medical & Dental (combined route)

- Single route with clearly separated physician (CPSO/CMPA) and dentist (RCDSO) regulatory blocks
- Clinic commercial vs individual malpractice distinction throughout

---

## REGULATORY CLAIM REGISTER (visitor-facing)

| ROUTE | CLAIM | RESEARCH SUPPORT | SAFE | HEDGE | FINAL WORDING (summary) |
|-------|-------|------------------|------|-------|-------------------------|
| PL | CPA Reg. 14-1 minimums by firm size | CPA Ontario Reg. 14-1 | YES | Scope to public accounting firms | In accountants Explorer LEFT + considerations |
| PL | PEO Reg. 941 s. 74 $250K/$500K minimums | ontario.ca regulation | YES | Exemptions noted | Engineers Explorer LEFT |
| PL | FSRA life agent $1M E&O | O. Reg. 347/04 s. 13 | YES | Life/A&S agents only | Finance/IT Explorer LEFT |
| PL | Claims-made structure | Industry standard | YES | "Most commercial…" | Hero, considerations, FAQ |
| Real Estate | RECO mandatory program under TRESA | reco.on.ca | YES | Program terms apply | Hero, E&O Explorer, considerations |
| Real Estate | E&O $2M per claim / $4M aggregate | RECO program page 2026–2027 | YES | Subject to program wording | E&O Explorer LEFT |
| Medical/Dental | CPSO appropriate PL requirement | CPSO renewal FAQs | YES | Typically CMPA | Considerations + FAQ |
| Medical/Dental | CMPA not an insurance company | cmpa-acpm.ca | YES | Mutual defence org | Hero, malpractice Explorer |
| Medical/Dental | RCDSO $2M / $6M minimums | RCDSO PLP FAQ 2026 | YES | Program framework | Dentist consideration block |
| Medical/Dental | PHIPA custodian duties | IPC materials | YES | Separate from insurance | Cyber Explorer LEFT, considerations |

---

## UNSUPPORTED CLAIMS REMOVED

| Claim | Route | Action |
|-------|-------|--------|
| `$1M to $5M per occurrence is common for mid-size engagements` | Professional Liability FAQ | **Removed** |
| `Yes in practice — and many brokerages and boards require it` (understates RECO) | Real Estate FAQ | **Replaced** with TRESA/RECO mandatory language |
| `Covers patient slip-and-fall` (absolute) | Medical/Dental CGL card | **Replaced** with hedged `May help respond…` |
| `Addresses patient data breaches… under PHIPA` (conflates law + insurance) | Medical/Dental cyber card | **Replaced** — PHIPA as regulatory context, cyber as optional coverage |
| Landlord Coverage visitor copy | Real Estate Explorer | **Replaced** with Cyber & Privacy (ID unchanged) |
| `guarantees of outcome` (triggered MEDIUM scanner) | PL considerations | **Replaced** with `promises of a specific result` |

---

## V2 VALIDATION

| Route | IDs preserved | V2 detail pairs | Duplicate desc | Verifier |
|-------|:-------------:|:---------------:|:----------------:|:--------:|
| Professional Liability | 4/4 | 4/4 | None | PASS |
| Professional Offices | 4/4 | 4/4 | None | PASS |
| Real Estate | 4/4 (incl. `landlord-coverage`) | 4/4 | None | PASS |
| Medical & Dental | 4/4 | 4/4 | None | PASS |

**Total:** 16/16 IDs preserved · 16/16 V2 detail pairs

---

## VISUAL QA

Screenshots: `docs/qa-screenshots/grade-c-batch-a-2026-09-09/{route}/`

| Route | 390 | 768 | 1024 | 1440 | Overflow | Explorer states |
|-------|:---:|:---:|:----:|:----:|:--------:|:-----------------|
| Professional Liability | ✓ | ✓ | ✓ | ✓ | 0 | 4/4 |
| Professional Offices | ✓ | ✓ | ✓ | ✓ | 0 | 4/4 |
| Real Estate | ✓ | ✓ | ✓ | ✓ | 0 | 4/4 |
| Medical & Dental | ✓ | ✓ | ✓ | ✓ | 0 | 4/4 |

Considerations expand correctly (expandable variant). FAQs render 5 each. No horizontal overflow at tested viewports.

---

## BUILD / VALIDATION

| Check | Result |
|-------|--------|
| **BUILD** | PASS (`npm run build`) |
| **TSC** | PASS (`npx tsc --noEmit`) |
| **CONTENT AUDIT** | PASS — see site totals below |
| **EXPLORER REGRESSION** | PASS — 228/228 checks, 0 failures |
| **BATCH VERIFIER** | PASS — `node scripts/verify-grade-c-batch-a.cjs` |

---

## SITE TOTAL (post-implementation)

| Grade | Before | After |
|-------|-------:|------:|
| **A** | 24 | **28** |
| **B** | 16 | 16 |
| **C** | 18 | **14** |
| **D** | 0 | **0** |

All four Batch A routes: **A**

---

## READY FOR LITERAL FACTUAL GATE

**YES** — pending owner review of:

1. Real Estate Explorer image zones for `landlord-coverage` / Cyber & Privacy visitor state (image unchanged by design)
2. Residual LOW audit flags on Real Estate (mandatory RECO wording) and Medical/Dental (RCDSO dollar minimums) — all research-verified

---

## STOP FOR OWNER REVIEW

Do not merge. Do not deploy. Do not promote Vercel preview to production.

---

## FINAL PRECISION FIX

**PRECISION BASE:** `67f7738`  
**ROUTE:** `professional-liability-insurance`  
**FIELD:** `metaDescription`

**OLD:**
Professional liability and E&O insurance for accountants, consultants, engineers, architects, financial advisors, and IT professionals in Windsor-Essex — claims-made coverage, retroactive dates, and contract coordination.

**NEW:**
Professional liability and E&O insurance for Windsor-Essex businesses and professionals — most commercial E&O is claims-made, so retroactive dates, reporting, and contract coordination matter.

| Check | Result |
|-------|--------|
| **BUILD** | PASS (`npm run build`) |
| **TSC** | PASS (`npx tsc --noEmit`) |
| **CONTENT AUDIT** | PASS — A28 / B16 / C14 / D0 |
| **EXPLORER REGRESSION** | PASS — 228/228 checks, 0 failures |
| **BATCH VERIFIER** | PASS — `node scripts/verify-grade-c-batch-a.cjs` |

**SITE TOTAL:** A28 / B16 / C14 / D0

**Professional Liability:** A / 0 HIGH / 0 MEDIUM  
**Professional Offices:** A / unchanged  
**Real Estate:** A / unchanged  
**Medical & Dental:** A / unchanged  

**BATCH A READY TO FREEZE:** **YES**
