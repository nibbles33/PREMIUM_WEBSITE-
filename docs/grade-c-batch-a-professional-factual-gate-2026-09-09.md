# Grade C Batch A — Professional & Advisory Liability — Phase 3 Factual Gate

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Research commit:** `ca2d79c`  
**Implementation commit:** `43cece3`  
**Gate date:** 2026-09-09  
**Phase:** LITERAL-COPY FACTUAL GATE — no production copy changes  
**Site audit:** A28 / B16 / C14 / D0

**Artifacts:**
- `scripts/dump-grade-c-batch-a-literal-claims.ts`
- `docs/qa-screenshots/grade-c-batch-a-professional-2026-09-09/literal-claim-dump.txt`

---

## 0. Worktree safety

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `43cece38b2bc8647f8f0b2cbb5a1952aa6aa9d7c` (contains `43cece3`) |
| **STATUS** | Pre-existing dirty QA screenshots only (`daycare-mobile_390.png`, `restaurant-desktop_1440.png`, `daycare-content mobile_390.png`). New untracked QA artifacts for this gate. **No unexpected SOURCE modifications.** |

---

## 1. Literal claim dump

**Script:** `scripts/dump-grade-c-batch-a-literal-claims.ts`  
**Output:** `docs/qa-screenshots/grade-c-batch-a-professional-2026-09-09/literal-claim-dump.txt`

| Metric | Value |
|--------|------:|
| Routes | 4 |
| FAQs | 20 (all answers complete) |
| Considerations | 32 |
| Characters | 85,852 |
| Truncation | None |
| Extraction method | `getPilotCommercialConfig()` — resolved source strings, not DOM scrape |

---

## 2. Professional Liability — factual gate

**Review scope:** E&O mechanics, claims-made, retroactive date, prior acts/knowledge, reporting, extended reporting, defence costs, contractual liability, subcontractors, CGL distinction, cyber/D&O overlap, territorial/jurisdiction, professional-services definition, profession-specific minimums.

| Check | Result |
|-------|--------|
| All PL forms claims-made | **Not stated.** Body/FAQ use "Most commercial… claims-made"; occurrence forms acknowledged. |
| Universal retroactive-date structure | **Not stated.** Retro date explained as policy-specific. |
| Defence costs always erode limits | **Not stated.** Consideration [6] says "may be… inside… or outside… depending on form and carrier." |
| Subcontractors automatically covered | **Not stated.** FAQ and consideration require disclosure and policy confirmation. |
| Contractual liability always excluded | **Not stated.** "May not cover all contractual undertakings." |
| Cyber covered by E&O | **Not stated.** Separate cyber required for breach response; IT explorer splits advice vs ransomware. |
| D&O and E&O interchangeable | **Not stated.** Hero and consideration [7] distinguish. |
| Same minimum limits all professions | **Not stated.** CPA, PEO, OAA, FSRA each profession-scoped; FSRA $1M scoped to life agents only. |
| Generic contract limits generalized | **Not stated.** FAQ [4]: "contract-specific." |
| Removed `$1M to $5M per occurrence` | **Absent** from dump (confirmed). No equivalent generic numerical range. |

**Profession-specific minimums in copy:**
- **CPA Ontario / Reg. 14-1:** Referenced by firm size; dollar tiers not listed in visitor copy (research: $1M / $1.5M / $2M) — **safe omission**, no misstatement.
- **PEO Reg. 941 s. 74:** Referenced with exemption caveat; amounts not listed (research: $250K / $500K) — **safe omission**.
- **OAA / Pro-Demnity:** Separate mandatory rules noted — **safe**.
- **FSRA O. Reg. 347/04:** `$1 million per occurrence` — **matches research**; scoped to licensed life insurance agents.

**Issue found (LOW):** `metaDescription` states "claims-made coverage" without the "most commercial" hedge used in hero, FAQ, and considerations.

---

## 3. Professional Offices — factual gate

| Risk pattern | Result |
|--------------|--------|
| Office package automatically includes E&O | **Denied explicitly** (consideration [2], FAQ [1]). |
| Office package automatically includes cyber | **Denied.** Cyber "where purchased"; FAQ [3] "not a universal mandate." |
| Property covers professional mistakes | **Denied.** GL/E&O split throughout. |
| CGL covers professional errors | **Denied.** Explorer [0]/[1], FAQ [1]. |
| Cyber equals privacy-law compliance | **Denied.** Cyber consideration: controls "do not replace coverage review." |
| BI without covered/direct damage trigger | **Denied.** Consideration [5]: "after a covered direct physical loss." |
| Crime automatically applies to client funds | **Denied.** "Crime or fidelity endorsements, where available… subject to limits." |
| Leased premises / TIs automatically insured | **Denied.** Lease requires tenant to insure; "Confirm who insures the building." |

**Verdict:** Page coordinates products; does not imply default bundling. **CLEAN.**

---

## 4. Real Estate — factual gate

| Check | Result |
|-------|--------|
| RECO described as RECO's program | **Yes** — hero, Explorer [0], consideration [0], FAQs. |
| PIB does not replace/administer/sell RECO program | **Explicit:** "does not replace or sell this program." |
| RECO limits not presented as generic market E&O | **Correct** — $2M/$4M tied to RECO program + 2026–2027 period. |
| Brokerage commercial separate from RECO | **Clear** throughout. |
| Landlord not core brokerage coverage | **Removed from Explorer visitor title;** cross-links to Landlord Insurance. |
| Property management separated | **Consideration [4], FAQ [3], related link.** |
| Cyber does not imply privacy compliance | **Hedged** — incident costs "where purchased," verification protocols operational. |
| Wire fraud not automatically cyber | **Hedged** — "may address certain incident costs subject to exclusions and sublimits." |

**Explorer ID `landlord-coverage`:** Unchanged. Visitor-facing title/shortLabel: **Cyber & Privacy**.

### REAL ESTATE IMAGE SEMANTIC MATCH: **ACCEPTABLE**

**Why:** Manifest zones for `landlord-coverage` on `office-suite` archetype are `exterior-signage` and `reception-lobby`. Visitor copy for Cyber & Privacy focuses on client contact lists, transaction files, phishing, and wire-fraud schemes at the brokerage office. **Reception-lobby** reasonably supports client-data / front-desk cyber exposure; **exterior-signage** is generic office premises context and does not strongly signal cyber (no server/IT zone). The underlying image was not retitled for landlord/rental property in visitor UI — legacy ID only. **Not MISLEADING** (visitors see Cyber & Privacy labels, not landlord imagery). **Not GOOD** (no data-system visual anchor). Flag for optional future zone remap only; out of scope for this gate per owner instruction.

**Verdict:** **CLEAN** on copy. Image semantic match noted as ACCEPTABLE for owner visual review.

---

## 5. Medical & Dental — factual gate

| Risk pattern | Result |
|--------------|--------|
| CMPA is insurance / insurance policy | **Denied.** Hero: "mutual medical defence organization — not an insurance company." Explorer/considerations repeat. |
| CMPA automatically covers clinic entities | **Denied.** "Discretionary," "conditional," "may extend… when all physician owners are members." |
| Clinic commercial replaces physician/dentist PL | **Denied.** FAQ [0], hero, considerations [0]–[2]. |
| Individual PL automatically covers clinic | **Denied.** FAQ [1]: "Not automatically." |
| Physician rules applied to dentists / vice versa | **Denied.** Separate "For physicians" / "For dentists" blocks. |
| Cyber satisfies PHIPA | **Denied.** PHIPA "separate from purchasing insurance"; "does not equal PHIPA compliance." |
| PHIPA creates insurance coverage | **Denied.** Regulatory obligation framed separately. |
| RCDSO minimums on physicians / CPSO on dentists | **Not crossed.** |
| CGL / property covers malpractice | **Denied.** Waiting-room fall vs treatment-error distinction. |
| Equipment breakdown automatically included | **Denied.** "May need an equipment breakdown endorsement." |
| BI regardless of trigger | **Denied.** "Responds after a covered direct physical loss." |

**Numeric verification (research §E3):**
- RCDSO: `$2,000,000 per occurrence` / `$6,000,000 annual aggregate` — **matches research**; time-bound to "2026 program transition" / "current program framework."
- "Unlimited investigative and defence cost coverage as defined under the program" — **matches research** framing.

**Verdict:** **CLEAN.**

---

## 6. Regulatory / numeric claim register

| ROUTE | EXACT CLAIM | TYPE | RESEARCH SOURCE | CURRENT/VERIFIED | SAFE AS WRITTEN | HEDGE REQUIRED | ACTION |
|-------|-------------|------|-----------------|------------------|-----------------|----------------|--------|
| PL | `$1 million per occurrence` (FSRA life agents) | Regulator minimum | O. Reg. 347/04 s. 13 | Verified | Yes — scoped to licence class | No | **KEEP** |
| PL | CPA Reg. 14-1 minimum limits by firm size | Regulator minimum | CPA Ontario Reg. 14-1 ($1M/$1.5M/$2M) | Verified (tiers not spelled out in copy) | Yes — profession-scoped, no wrong numbers | No | **KEEP** |
| PL | PEO Reg. 941 s. 74 minimum PL requirements | Regulator minimum | PEO ($250K/$500K) | Verified (amounts omitted) | Yes | No | **KEEP** |
| PL | OAA mandatory PL through Pro-Demnity | Regulator/program | O. Reg. 386/15 | Verified | Yes | No | **KEEP** |
| PL | Most commercial E&O policies claims-made | Policy pattern | Research §B1 | Verified | Yes | Already hedged in body/FAQ | No | **KEEP** |
| PL | claims-made coverage (metaDescription only) | SEO meta | Research §B1 | Partial hedge | No — reads as universal | Yes | **TIGHTEN** |
| Offices | (no dollar/regulatory minimums) | — | — | — | — | — | — |
| Real Estate | Registrants must participate in RECO program | Statutory/regulatory | TRESA / RECO | Verified | Yes | No | **KEEP** |
| Real Estate | `$2,000,000 limit per claim` E&O component | Program limit | RECO 2026–2027 | Verified | Yes — RECO-attributed | No | **KEEP** |
| Real Estate | `$4,000,000 annual aggregate` E&O component | Program limit | RECO 2026–2027 | Verified | Yes | No | **KEEP** |
| Real Estate | 2026–2027 policy period | Temporal qualifier | RECO program | Verified | Yes | No | **KEEP** |
| Real Estate | Commission protection + consumer deposit (no $ amounts) | Program component | RECO ($200K each) | Verified omission | Yes — no wrong numbers | No | **KEEP** |
| Medical/Dental | `$2,000,000 per occurrence` (dentists) | College minimum | RCDSO By-Law | Verified | Yes — dentist-scoped | No | **KEEP** |
| Medical/Dental | `$6,000,000 annual aggregate` (dentists) | College minimum | RCDSO By-Law | Verified | Yes | No | **KEEP** |
| Medical/Dental | Unlimited investigative/defence costs (program-defined) | Program term | RCDSO PLP | Verified | Yes — "as defined under the program" | No | **KEEP** |
| Medical/Dental | CPSO requires appropriate PL (typically CMPA) | Regulator requirement | CPSO | Verified | Yes — not called insurance | No | **KEEP** |
| Medical/Dental | PHIPA safeguard duties | Statutory | PHIPA | Verified | Yes — separate from insurance | No | **KEEP** |
| All routes | `$1M to $5M per occurrence` (removed PL FAQ) | Unsupported market band | Research §B — NOT FOUND | Absent | N/A | N/A | **REMOVED ✓** |

---

## 7. Absolute-language review (material occurrences)

| Route | Phrase / context | Assessment |
|-------|------------------|------------|
| PL | "Most commercial E&O forms are claims-made" | **FACTUAL** (hedged industry pattern) |
| PL | "must meet Ontario's minimum…" (PEO) | **REGULATORY** |
| PL | "must maintain FSRA-approved…" (life agents) | **REGULATORY** — scoped |
| PL | "confirm whether your policy covers work performed by others" | **POLICY-DEPENDENT** — appropriate |
| PL | metaDescription "claims-made coverage" | **NEEDS HEDGE** |
| Offices | "does not automatically cover your contents" | **FACTUAL** (lease norm) |
| Offices | "Do not assume… automatically includes professional liability" | **SAFE** (negative guidance) |
| Offices | "typically needs E&O" (consulting office) | **SAFE** (occupation-based, not policy guarantee) |
| Real Estate | "Every Ontario registrant must participate" | **REGULATORY** |
| Real Estate | "That program covers defined registrant professional exposures" | **REGULATORY/FACTUAL** — scoped to RECO program |
| Medical/Dental | "must implement reasonable safeguards" (PHIPA) | **REGULATORY** |
| Medical/Dental | "CMPA… not an insurance company" | **FACTUAL** |
| Medical/Dental | "Not automatically" (FAQ practitioner → clinic) | **SAFE** |
| Medical/Dental | "RCDSO members must maintain professional liability" | **REGULATORY** |

No mechanical removals recommended. One meta hedge tighten (PL) noted above.

---

## 8. Cross-page consistency

| Topic | Consistency |
|-------|-------------|
| **E&O claims-made** | PL page = deep mechanics ("Most commercial…"). Offices/Real Estate reference claims-made only where E&O is optional/commercial — **consistent.** |
| **CGL vs professional liability** | All four routes separate premises/BI-PD from financial-loss/professional-services allegations — **consistent.** |
| **Cyber** | All routes: separate product, "where purchased," not GL substitute, not compliance substitute — **consistent.** |
| **Entity vs individual protection** | Medical/Dental explicit; Real Estate RECO (registrant) vs brokerage entity; Offices coordinates lines; PL standalone — **consistent, no contradiction.** |
| **Professional protection** | Offices links to PL page for depth; Medical/Dental keeps malpractice external; Real Estate keeps RECO external to PIB — **consistent.** |
| **Regulatory requirements** | Each route keeps regulators in-segment (CPA/PEO/OAA/FSRA vs RECO vs CPSO/RCDSO) — **consistent.** |

**Contradictions found:** None material.

---

## 9. Verdict by route

### ROUTE: `/professional-liability-insurance/`

**FACTUAL STATUS:** **PRECISION FIX REQUIRED**

**HIGH-RISK ISSUES:** None.

**MEDIUM-RISK ISSUES:** None.

**LOW-RISK / PRECISION ISSUES:** 1

| Field | Current wording | Problem | Recommended narrow fix |
|-------|-----------------|---------|------------------------|
| `metaDescription` | "…Windsor-Essex — **claims-made coverage**, retroactive dates, and contract coordination." | Meta snippet implies universal claims-made; body/FAQ correctly say "Most commercial…" and note occurrence forms exist. | e.g. "…**most commercial E&O is claims-made** — retroactive dates and contract coordination matter." |

---

### ROUTE: `/professional-offices-insurance/`

**FACTUAL STATUS:** **CLEAN**

**HIGH-RISK ISSUES:** None.  
**MEDIUM-RISK ISSUES:** None.  
**LOW-RISK/PRECISION ISSUES:** None.

---

### ROUTE: `/real-estate-insurance/`

**FACTUAL STATUS:** **CLEAN**

**HIGH-RISK ISSUES:** None.  
**MEDIUM-RISK ISSUES:** None.  
**LOW-RISK/PRECISION ISSUES:** None (image semantic ACCEPTABLE — owner visual review optional, no copy change).

---

### ROUTE: `/medical-dental-insurance/`

**FACTUAL STATUS:** **CLEAN**

**HIGH-RISK ISSUES:** None.  
**MEDIUM-RISK ISSUES:** None.  
**LOW-RISK/PRECISION ISSUES:** None.

---

## 10. Freeze decision

| Route | Decision |
|-------|----------|
| **PROFESSIONAL LIABILITY** | **PRECISION FIX REQUIRED** |
| **PROFESSIONAL OFFICES** | **FREEZE** |
| **REAL ESTATE** | **FREEZE** |
| **MEDICAL & DENTAL** | **FREEZE** |

**BATCH A READY TO FREEZE:** **NO**

**Exact fields needing precision fix (only):**
1. `/professional-liability-insurance/` → `metaDescription` (see §9)

After one-line meta hedge: batch expected **READY TO FREEZE**.

---

## 11. QA commit scope

**Commit only:**
- `scripts/dump-grade-c-batch-a-literal-claims.ts`
- `docs/qa-screenshots/grade-c-batch-a-professional-2026-09-09/literal-claim-dump.txt`
- `docs/grade-c-batch-a-professional-factual-gate-2026-09-09.md`

**Do not commit:** unrelated QA screenshots, production source.

---

**STOP FOR OWNER REVIEW** — do not merge, deploy, or modify production copy in this phase.
