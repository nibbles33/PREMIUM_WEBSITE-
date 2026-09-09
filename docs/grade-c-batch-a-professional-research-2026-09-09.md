# Grade C Batch A — Professional & Advisory Liability — Phase 1 Research

**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Frozen HEAD:** `15ecf15`  
**Research date:** 2026-09-09  
**Phase:** RESEARCH ONLY — no page copy implementation  
**Isolated worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Site audit at research start:** A24 / B16 / C18 / D0

**Routes:**
- `/professional-liability-insurance/`
- `/professional-offices-insurance/`
- `/real-estate-insurance/`
- `/medical-dental-insurance/`

**Status:** **STOP FOR OWNER REVIEW** — do not implement copy until approved

---

## Worktree verification (Step 0)

| Check | Result |
|-------|--------|
| **WORKTREE** | `/tmp/PREMIUM_WEBSITE-d3-transportation` |
| **BRANCH** | `cursor/coverage-explorer-ux-v2-2026-09-07` |
| **HEAD** | `15ecf1548e1cf8ceee69f7fd6c1fa3d66741587c` (contains `15ecf15`) |
| **STATUS** | Pre-existing dirty QA screenshots only (not modified/restored/staged/committed): `docs/qa-screenshots/coverage-explorer-ux-v2-2026-09-07/daycare-mobile_390.png`, `restaurant-desktop_1440.png`, `docs/qa-screenshots/daycare-content-2026-09-07/mobile_390.png` |
| **Unexpected SOURCE modifications** | None |
| **Primary carrier worktree** | Untouched |

---

## Category legend

| Tag | Meaning |
|-----|---------|
| **[COVERAGE]** | Insurance product or policy coverage a customer could purchase |
| **[UNDERWRITING]** | Insurer evaluation input — not itself a coverage |
| **[REGULATORY]** | Ontario statute, regulator, or compliance obligation |
| **[LEGAL]** | Legal liability exposure or statutory duty — not an insurance product |
| **[CONTRACTUAL]** | Contract, lease, or certificate requirement |
| **[EXPOSURE]** | Operational risk — may or may not map to a purchasable coverage |

---

## A. Current-state audit

Audit basis: `docs/product-content-audit-2026-09-07.md` + source extraction @ HEAD `15ecf15`.

### Summary

| Route | Grade | Words | HIGH | MED | LOW | Explorer states | Considerations | FAQs | V2 detail pairs |
|-------|-------|------:|-----:|----:|----:|----------------:|---------------:|-----:|-----------------|
| `/professional-liability-insurance/` | **C** | 391 | 0 | 0 | **1** | 4 (profession segments) | 3 (thin ~66w) | 4 | **None** |
| `/professional-offices-insurance/` | **C** | 325 | 0 | 0 | 0 | 4 (coverage types) | **0** | 4 | **None** |
| `/real-estate-insurance/` | **C** | 283 | 0 | 0 | 0 | 4 (mixed audiences) | **0** | 4 | **None** |
| `/medical-dental-insurance/` | **C** | 242 | 0 | 0 | 0 | 4 (clinic package) | **0** | 4 | **None** |

**Grade C drivers:** All four below 400 substantive words; no Explorer V2 left/right detail pairs; three routes have zero practical considerations; card descriptions average ~23–31 words without detail copy.

**Only LOW flag in entire Grade C inventory:** Professional Liability FAQ dollar-range claim (see §B and Claim Register).

**Benchmark (do not copy regulatory content):** `/pharmacy-insurance/` — A-grade (1430w, 553w considerations, V2 detail pairs, hedged entity vs registrant separation).

---

### A1. `/professional-liability-insurance/`

**Source:** `src/data/product-pages/commercial-products-core.ts` (~526–616)  
**Explorer manifest:** `professional-liability-insurance` · archetype `office-suite`

| Item | Current |
|------|---------|
| **Hero** | Professional Liability (E&O) Insurance — errors and omissions when clients claim professional advice, design, or service caused financial loss |
| **Coverage intro** | Responds when clients allege negligent advice or services — distinct from slip-and-fall GL |
| **whoItIsFor** | Accountants, consultants, engineers, architects, financial advisors, IT consultants, regulated/credentialed occupations |
| **Considerations** | 3 thin: claims-made vs occurrence; contractual liability; regulatory/association minimums |
| **LOW flag** | FAQ: *"Contract requirements vary — $1M to $5M per occurrence is common for mid-size engagements."* |

| State ID | Title | description (RIGHT) |
|----------|-------|---------------------|
| `accountants-bookkeepers` | Accountants & Bookkeepers | Tax/audit/financial statement errors |
| `consultants-advisors` | Consultants & Advisors | Management/HR/marketing recommendations |
| `engineers-architects` | Engineers & Architects | Design/specification/inspection errors |
| `financial-advisors-it-consultants` | Financial Advisors & IT Consultants | Investment advice / IT implementation failures |

**Issues for implementation:** No V2 detail pairs; engineers/architects card implies property damage/project delays without explaining BI/PD exclusion coordination; IT/cyber overlap mentioned only in FAQ; `$1M–$5M` claim unsupported (see §B); terminology treats E&O as universal label.

---

### A2. `/professional-offices-insurance/`

**Source:** `src/data/commercial-industries.ts` (~766–832)  
**Explorer manifest:** `professional-offices-insurance` · archetype `office-suite`

| Item | Current |
|------|---------|
| **Hero** | Coverage for professional service businesses — liability to equipment |
| **Coverage intro** | Client-facing liability, advice risk, office property, digital exposures |
| **Considerations** | **0** |
| **FAQs** | GL vs PL; cyber need; data breach; quote info |

| State ID | Title |
|----------|-------|
| `general-liability` | General Liability |
| `professional-liability-errors-omissions` | Professional Liability (E&O) |
| `commercial-property` | Commercial Property |
| `cyber-liability` | Cyber Liability |

**Issues:** Package page reads like four standalone product blurbs; no coordination guidance (what belongs in package vs separate PL policy); no leased-premises, tenant improvements, or BI depth; cyber zones mapped to visitor-area/exterior-signage (weak visual logic).

---

### A3. `/real-estate-insurance/`

**Source:** `src/data/commercial-industries.ts` (~834–898)  
**Explorer manifest:** `real-estate-insurance` · archetype `office-suite`

| Item | Current |
|------|---------|
| **Hero subhead** | *"Coverage for real estate professionals and property portfolios — from brokerages to rental properties."* |
| **Coverage intro** | Brokerage liability, owned property, landlord exposures |
| **Considerations** | **0** |

| State ID | Title | Audience tension |
|----------|-------|------------------|
| `errors-omissions-e-o` | Errors & Omissions (E&O) | **Brokerage/agent** |
| `commercial-property` | Commercial Property | **Brokerage office** (and ambiguous) |
| `general-liability` | General Liability | **Brokerage office** |
| `landlord-coverage` | Landlord Coverage | **Property owner/investor** |

**Issues:** **FLAG — materially different customers mixed on one page** (see Owner Decision A); FAQ *"Yes in practice — and many brokerages and boards require it"* understates Ontario **mandatory RECO program** for registrants; no Commission Protection / Consumer Deposit context; `landlord-coverage` zone mapped to exterior-signage/reception-lobby (office archetype mismatch).

**Related routes:** `/property-management-insurance/` (A-grade — manager vs owner distinction), `/landlord-insurance/` (personal/commercial landlord — separate nav item).

---

### A4. `/medical-dental-insurance/`

**Source:** `src/data/product-pages/commercial-products-specialty.ts` (~360–433)  
**Explorer manifest:** `medical-dental-insurance` · archetype `office-suite`

| Item | Current |
|------|---------|
| **Hero** | Commercial coverage for clinics — premises, property, cyber, malpractice coordination |
| **Coverage intro** | Offices need commercial property and liability alongside profession-specific malpractice |
| **Considerations** | **0** |

| State ID | Title | Risk notes |
|----------|-------|------------|
| `commercial-general-liability` | Commercial General Liability | *"Covers patient slip-and-fall"* — absolute verb |
| `commercial-property` | Commercial Property | Equipment, furniture, leasehold improvements |
| `cyber-privacy` | Cyber & Privacy | *"Addresses patient data breaches… under PHIPA"* — conflates insurance with statutory compliance |
| `malpractice-coordination` | Malpractice Coordination | Broker coordinates; malpractice through professional markets |

**Issues:** Highest precision-risk route in batch; no entity vs individual distinction at card level; no CPSO/CMPA vs RCDSO/PLP separation; no equipment breakdown, BI, locum/contractor, or crime depth; pharmacy page is the architectural model.

---

## B. Professional Liability (E&O) research

### B1. What this product is

**[COVERAGE]** Professional liability insurance (also marketed as errors & omissions, professional indemnity, or — in regulated health/legal contexts — malpractice) generally responds to **claims alleging financial loss** caused by **negligent acts, errors, or omissions** in the performance of **professional services**, subject to policy wording. **[LEGAL]** The allegation is typically economic harm from advice, design, analysis, or service — not ordinary premises injury.

**[COVERAGE]** Most commercial professional liability policies are **claims-made**: coverage applies when a **claim is first made and reported** during the policy period (and after any **retroactive date**), not necessarily when the original act occurred. **[UNDERWRITING]** **Prior acts**, **prior knowledge**, **extended reporting periods (tail)**, and **carrier changes** are central underwriting and renewal topics.

**[COVERAGE]** Policies commonly include **defence costs** — either **inside** the limit (eroding indemnity) or **outside** (preserving limit for damages). This materially affects effective capacity.

**[LEGAL]** Standard exclusions often include **bodily injury** and **property damage** (sometimes with exceptions for certain professional contexts), **intentional/criminal acts**, **contractual liability beyond legal liability**, **guarantees/warranties of performance**, **pollution**, and **employer/EPL** matters — each subject to endorsements.

**[EXPOSURE]** **Cyber/privacy** incidents may overlap where IT/security advice fails, but data-breach response costs often require **separate cyber/privacy coverage**. **D&O** addresses management/governance allegations — distinct from client-facing professional services. **CGL** addresses premises/operations BI/PD — not client financial loss from professional advice.

**[CONTRACTUAL]** Clients, lenders, and project owners frequently require **certificates**, **additional insured** status (more common on CGL than PL), **minimum limits**, and **tail coverage** on termination — limits are **contract-specific**, not universal.

**[UNDERWRITING]** Typical quote inputs: profession and services; revenue/fees; staff count; client types; largest contracts; subcontractor use; prior claims; current policy retro date and limits; jurisdictions served.

---

### B2. Terminology — not universally interchangeable

| Term | Typical usage | Notes for copy |
|------|---------------|----------------|
| **Professional liability** | Broad commercial label for advice/design/service firms | Safe umbrella term on product page |
| **Errors & omissions (E&O)** | Common in consulting, IT, real estate, some financial lines | Appropriate for non-health professions |
| **Malpractice** | Regulated health and legal professions | Use for physicians/dentists/lawyers — not as synonym for accountant E&O |
| **Professional indemnity** | Common UK/Canadian legal phrasing | Acceptable synonym in body copy with context |

**Do not** tell visitors that malpractice, E&O, and professional liability are identical in **coverage scope** or **regulatory meaning** across every profession.

---

### B3. Profession-specific regulatory architecture (Ontario)

Use only where the visitor segment matches — do not force onto unrelated professions.

| Profession segment | Regulator / program | Mandatory PL? | Documented minimums | Tag |
|--------------------|---------------------|---------------|---------------------|-----|
| **Accountants / public accounting firms** | CPA Ontario — Reg. 14-1 | Yes, for firms in public accounting or providing accounting services to the public | **$1M** (1 member); **$1.5M** (2–3); **$2M** (4+) per claim; discovery/ERP **6 years** after ceasing practice | [REGULATORY] |
| **Professional engineers (public)** | PEO — R.R.O. 1990, Reg. 941 s. 74 | Yes for Certificate of Authorization holders (with exemptions) | **$250K** per claim; **$500K** aggregate or reinstatement; max deductible greater of **$5K** or **5%** of prior-year fees | [REGULATORY] |
| **Architects (Certificate of Practice)** | OAA — O. Reg. 386/15 | Yes (via Pro-Demnity for most) | **$250K / $500K / $1M** per claim based on prior-year gross fees tiers | [REGULATORY] |
| **Lawyers (private practice)** | Law Society / LAWPRO | Yes for private practice | LAWPRO program limits — not a generic commercial E&O market | [REGULATORY] |
| **Life insurance agents** | FSRA — O. Reg. 347/04 s. 13 | Yes | **$1M** per occurrence + fraudulent acts extension | [REGULATORY] |
| **Real estate registrants** | RECO program under TRESA | Yes — **separate mandatory program**, not generic broker-placed E&O | **$2M** per claim E&O; **$4M** annual aggregate (RECO program) | [REGULATORY] |
| **Management/IT consultants (unregulated)** | — | No statutory minimum | Contract-driven | [CONTRACTUAL] |

**Bookkeepers (non-CPA public accounting):** CPA Ontario Reg. 14-1 applies to **firms** meeting public accounting/accounting-services-to-the-public definitions — not every bookkeeper. **[UNDERWRITING]** Still may need E&O based on client contracts and services.

**Lawyers:** Not a target segment on current page — do not add LSO/LAWPRO depth unless owner expands scope.

---

### B4. Insurance architecture topics (implementation depth)

| Topic | Research summary | Tag |
|-------|------------------|-----|
| **Professional services definition** | Policy defines covered services; undisclosed services (e.g., investment advice by an IT firm) may fall outside scope | [COVERAGE] / [UNDERWRITING] |
| **Financial loss trigger** | Core PL trigger vs CGL BI/PD vs cyber first-party costs | [COVERAGE] |
| **Claims-made / retroactive date** | Work before retro date excluded unless tail purchased | [COVERAGE] |
| **Prior knowledge** | Known circumstances before policy inception often excluded | [COVERAGE] |
| **Reporting obligations** | Late reporting can void coverage — emphasize prompt notice | [COVERAGE] |
| **Extended reporting period (tail)** | Needed on retirement, carrier change, or contract requirement | [COVERAGE] / [CONTRACTUAL] |
| **Contractual liability** | Broad indemnities may exceed insuring agreement; OAA warns additional indemnities may be uninsured | [CONTRACTUAL] / [LEGAL] |
| **BI/PD exclusions** | Engineers/architects may see property damage allegations — may fall under CGL, PL, or neither depending on wording | [COVERAGE] |
| **Subcontractors** | Professional work delegated to subs may still create vicarious exposure; disclose sub use | [UNDERWRITING] / [EXPOSURE] |
| **Territorial/jurisdiction** | Cross-border clients or virtual delivery may trigger foreign jurisdiction exclusions | [UNDERWRITING] |
| **Cyber overlap** | Security advice errors may be PL; breach response costs typically cyber | [EXPOSURE] |
| **D&O overlap** | Management decisions vs professional services to clients | [EXPOSURE] |

---

### B5. `$1M to $5M per occurrence` FAQ claim — research verdict

**Current text:** *"Contract requirements vary — $1M to $5M per occurrence is common for mid-size engagements."*

| Criterion | Finding |
|-----------|---------|
| **Authoritative Ontario/regulator support for $1M–$5M as "common for mid-size engagements"** | **Not found.** Regulators cite **specific minimums** (CPA $1M–$2M; FSRA $1M; PEO $250K; OAA fee-tiered $250K–$1M; RECO $2M fixed program) — not a universal mid-market band. |
| **Terminology** | Many PL policies use **"per claim"** not **"per occurrence"** — term mismatch |
| **Industry sources** | US-heavy broker blogs cite $1M baseline and $2M–$5M for enterprise/government contracts — **not acceptable as primary source** for this site |
| **Conceptual validity** | Contract-driven limits are real; some large contracts require higher limits | [CONTRACTUAL] — hedged, no numbers |

**Recommendation:** **REMOVE** the dollar range from planned FAQ copy. Replace with contract-review guidance: compare **contractual minimums** to **current limits and retro date**; confirm **regulatory minimums** where applicable; consider **excess layers** if a single primary limit cannot satisfy a certificate requirement. **Do not preserve the range merely because it exists.**

---

### B6. Explorer architecture note (Owner Decision B)

Current states are **profession segments**, not coverage concepts. This works for visitor self-identification but obscures shared mechanics (claims-made, retro date, defence costs, contractual liability). **Recommendation:** **Keep profession segments** for Phase 2 unless owner prefers re-architecture — add V2 detail copy that teaches **coverage concepts** within each profession's context (see §H).

---

## C. Professional Offices research

### C1. What this page is

**[COVERAGE]** An **office package page** for professional service **businesses** — typically coordinating:

- **Commercial general liability** — client/visitor premises and operations BI/PD  
- **Commercial property** — contents, equipment, tenant improvements, leased premises interest  
- **Professional liability / E&O** — where the office **provides professional advice or services** (may be same or separate policy from standalone PL page)  
- **Cyber / privacy** — where client data, cloud systems, or payment processing create exposure  

**[EXPOSURE]** Optional adjacent products (not universal): **business interruption**, **crime/fidelity** (client funds, employee dishonesty), **equipment breakdown**, **hired/non-owned auto**.

### C2. Package vs standalone professional liability

| Topic | Office package page | Standalone `/professional-liability-insurance/` |
|-------|---------------------|--------------------------------------------------|
| **Primary job** | Coordinate **business premises + operations + office property** with optional PL/cyber | Deep **professional services liability** mechanics |
| **PL depth** | Explain **when an office that gives advice still needs E&O** and how it coordinates with GL | Profession segments, claims-made, retro, contracts, regulatory minimums |
| **Property/CGL** | **Lead topics** — lease, contents, client visits | Mention only as distinctions |
| **Audience** | Law firms, consulting firms, accounting offices, design studios, financial offices | Same professions but **service liability-first** mindset |

**Do not duplicate** the standalone PL page's profession-segment architecture here.

### C3. Coordination topics

| Coordination | Research summary | Tag |
|--------------|------------------|-----|
| **GL vs PL** | Slip-and-fall at office = GL; bad advice causing client loss = PL | [COVERAGE] |
| **Property vs lease** | Tenant improvements and betterments may need scheduling; landlord's policy insures building | [CONTRACTUAL] / [COVERAGE] |
| **Cyber vs GL/PL** | Breach response, ransomware, notification often excluded from GL/PL | [COVERAGE] |
| **BI** | Income loss after **covered direct physical loss** to insured property — not every closure | [COVERAGE] |
| **Crime** | Client trust accounts, wire fraud — often excluded from property/GL | [EXPOSURE] |
| **Contractual insurance** | Leases and client MSAs may require GL, PL, cyber certificates | [CONTRACTUAL] |

### C4. Who needs what (avoid universal mandates)

| Office profile | Typical core | Often added | May not need |
|----------------|-------------|-------------|--------------|
| **Administrative/back-office only** | GL, property | Cyber if data | PL if no professional services to clients |
| **Consulting/advisory office** | GL, property, **PL**, cyber | BI, crime if client funds | — |
| **Design/engineering office** | GL, property, **PL**, cyber | Project-specific excess | Treating PL as optional if public services |
| **Co-working / virtual office** | GL (if clients visit), cyber | Property for equipment | Full property if no contents |

---

## D. Real Estate research

### D1. Audience segmentation (critical)

Four materially different customers appear in current copy and Explorer:

| Segment | Primary exposures | Primary products | Regulatory touchpoint |
|---------|-----------------|------------------|------------------------|
| **A. Real estate registrants (agents/brokers)** | Transaction errors, deposit/trust issues, commission disputes | **RECO mandatory PL program** (E&O, Commission Protection, Consumer Deposit) + brokerage **GL/property/cyber** | RECO / TRESA |
| **B. Brokerage office operations** | Client visits, office property, data/privacy, open houses | **CGL, commercial property, cyber** — PL via RECO program for registrants | RECO |
| **C. Property owners / landlords (investors)** | Building damage, landlord liability, rental income, vacancy | **Commercial lessor's risk / landlord package** — **not brokerage E&O** | RTA context for tenancies — not insurance mandate |
| **D. Property managers** | Management negligence, premises at managed sites | **`/property-management-insurance/`** (separate A-grade route) | CMRAO if condominium management |

**Current page mixes A/B with C** via subhead and `landlord-coverage` Explorer state.

### D2. RECO mandatory program (authoritative)

**[REGULATORY]** Under TRESA, **all registrants must participate** in RECO's professional liability insurance program — not optional "brokerage/board" coverage.

**[REGULATORY] RECO program limits (2026–2027 policy period):**

| Coverage | Per claim | Annual / event limits | Deductible |
|----------|-----------|----------------------|------------|
| **Errors & Omissions** | **$2,000,000** | **$4,000,000** annual aggregate | **$2,500** (damages only; increases with repeat paid claims) |
| **Commission Protection** | **$200,000** | **$4,000,000** per event | **$250** |
| **Consumer Deposit** | **$200,000** | **$4,000,000** per event | **$0** |

**[REGULATORY]** Annual fee: **$500** per registrant (2026–2027 term). Program term: **September 1 – August 31**.

**[COVERAGE]** This is **not** the same product as a broker-placed commercial E&O policy for non-registrant businesses. Visitor copy must not imply Premium places RECO program coverage.

### D3. Landlord vs brokerage — do not conflate

**[COVERAGE]** **Landlord / lessor's risk** insurance protects **owned rental property** — building, landlord liability, loss of rental income (where purchased). **[EXPOSURE]** Tenant belongings are generally the tenant's responsibility.

**[COVERAGE]** **Brokerage E&O** (RECO program) protects **professional real estate services** — failed transactions, deposit handling allegations, commission issues.

**These are different customers and different products.** Current Explorer state `landlord-coverage` on an office-suite archetype **FLAG FOR OWNER REVIEW**.

### D4. Property management overlap

**[EXPOSURE]** Brokerages that **manage properties for others** may need management E&O and operational GL — closer to `/property-management-insurance/` than to registrant RECO E&O.

**Cross-link candidates:** `/property-management-insurance/`, `/landlord-insurance/`, `/commercial-property-insurance/`.

### D5. Vacancy, owned brokerage building, cyber

| Topic | Summary | Tag |
|-------|---------|-----|
| **Vacant rental units** | Standard property policies may restrict vacancy after set period | [UNDERWRITING] |
| **Brokerage owns its office building** | May need **commercial property** on building + **GL** + registrant RECO program — still separate coverages | [COVERAGE] |
| **Client data / digital transactions** | Cyber/privacy may supplement RECO program for **office systems** — confirm scope with broker | [EXPOSURE] |

---

## E. Medical & Dental research

### E1. Two-layer architecture (non-negotiable precision)

| Layer | What it protects | Typical products / programs | Tag |
|-------|------------------|------------------------------|-----|
| **A. Individual professional malpractice / PL** | Treatment errors, professional dental/medical services | **Physicians:** CPSO requires appropriate PL — typically **CMPA membership** (mutual defence org, **not an insurance company**). **Dentists:** RCDSO requires PL — **RCDSO-arranged program / Navacord** (2026+) with **$2M per occurrence / $6M aggregate** minimums | [REGULATORY] / [COVERAGE] |
| **B. Clinic / office business entity** | Premises, property, cyber, BI, crime, entity-level allegations | **Commercial GL, commercial property, cyber/privacy, clinic entity PL** where available | [COVERAGE] |

**Critical distinctions for copy:**

1. **Clinic commercial package does NOT replace** individual physician/dentist malpractice requirements.  
2. **Individual malpractice does NOT automatically protect** the clinic entity, non-physician staff, or independent contractors.  
3. **CMPA assistance to clinics** is **discretionary** and conditional — CMPA urges separate commercial protection where principles do not apply.  
4. **Do not generalize** CPSO/CMPA rules onto dentists or RCDSO rules onto physicians.

### E2. Physician context (CPSO / CMPA)

**[REGULATORY]** CPSO General By-Law requires registrants to maintain **appropriate professional liability coverage** (s.22.1 / s.50.2 depending on document version).

**[REGULATORY]** CMPA is a **mutual medical defence organization** — **not an insurance company**. Coverage is **discretionary assistance**, not a guaranteed indemnity contract.

**[REGULATORY]** CMPA **clinic assistance principles:** entity may receive assistance when **all physician owners are CMPA members** and conditions met; **independent non-physician practitioners** must carry **their own adequate PL**; CMPA urges **alternative commercial liability protection** for structures outside principles.

**[REGULATORY]** Ontario **Medical Liability Protection Reimbursement Program** refunds portion of CMPA fees for eligible practising physicians — **not** clinic insurance.

### E3. Dental context (RCDSO)

**[REGULATORY]** RCDSO By-Law s.22.1.2: every member must maintain professional liability coverage for professional dental services in Ontario.

**[REGULATORY]** Minimums (2026+): **$2,000,000 per occurrence**, **$6,000,000 annual aggregate**, plus unlimited investigative/defence costs per by-law framework.

**[REGULATORY]** 2026: coverage arranged through college program transition to **Navacord/Jones DesLauriers**; 2029+ path may require individual policies meeting minimums.

**[REGULATORY]** Employer/corporate policies may satisfy member coverage **only if** structured as permitted under by-law s.22.1.3 — do not simplify to "clinic policy covers all dentists."

### E4. Clinic / office commercial coverages

| Coverage | Clinic relevance | Tag |
|----------|------------------|-----|
| **CGL** | Patient/visitor slip-and-fall, waiting room incidents — **not treatment error** | [COVERAGE] |
| **Commercial property** | Medical/dental equipment, furniture, leasehold improvements | [COVERAGE] |
| **Equipment breakdown** | Diagnostic chairs, sterilizers, HVAC — may differ from standard property | [COVERAGE] / [UNDERWRITING] |
| **Business interruption** | After **covered direct physical loss** — subject to waiting periods | [COVERAGE] |
| **Cyber / privacy** | EMR, scheduling, billing systems — **breach response** where purchased | [COVERAGE] |
| **PHIPA** | Custodian must implement **reasonable safeguards** — **regulatory obligation separate from insurance** | [REGULATORY] |
| **Crime / employee dishonesty** | Payment fraud, theft — where purchased | [EXPOSURE] |
| **Locums / associates / contractors** | Must be disclosed; individual PL and clinic policies must reflect who provides care | [UNDERWRITING] |

### E5. PHIPA (authoritative framing)

**[REGULATORY]** Clinics are typically **health information custodians** under PHIPA with duties to:

- Implement reasonable safeguards against theft, loss, unauthorized access  
- Notify affected individuals at **first reasonable opportunity** after certain breaches  
- Report **specific breach categories** to IPC at first reasonable opportunity  
- Maintain breach protocols and annual statistics reporting  

**[COVERAGE]** Cyber/privacy insurance, **where purchased**, may help with **certain** breach-response costs — **does not satisfy PHIPA compliance** and does not mean every incident is covered.

**Do not copy** OCP pharmacy PPLI dollar minimums onto medical/dental.

### E6. Combined medical + dental page feasibility (Owner Decision C)

**Yes, with structure** — one route can serve both **if**:

- Hero/intro uses **shared clinic/entity** framing (premises, property, cyber, coordination)  
- **Regulatory claims are profession-specific** and clearly labeled ("Physicians / CPSO…" vs "Dentists / RCDSO…")  
- **Malpractice section** explains parallel but **separate** systems (CMPA vs RCDSO PLP)  
- Avoids universal "health professionals must carry $X" statements  

**Risk if not structured:** Over-broad regulatory statements → **D-grade content safety flags**.

---

## F. Authoritative sources

| Source | URL / reference | Used for |
|--------|-----------------|----------|
| **CPA Ontario — Reg. 14-1** | https://assets.cpaontario.ca/protecting-the-public/governance/pdfs/Regulation-14-1.pdf | Accountant firm PL minimums |
| **CPA Ontario — PLI requirements** | https://www.cpaontario.ca/members/regulations-guidance/accounting-firms/professional-liability-insurance | Firm reporting, discovery |
| **PEO — Reg. 941 s. 74** | https://www.ontario.ca/laws/regulation/900941 | Engineer C of A PL minimums |
| **PEO — Offering services to the public** | https://www.peo.on.ca/licence-holders/offering-services-public | C of A + insurance exemptions |
| **OAA — O. Reg. 386/15** | https://www.ontario.ca/laws/regulation/r15386 | Architect PL fee-tier minimums |
| **Pro-Demnity / OAA** | https://prodemnity.com/insurance-solutions/professional-liability-insurance/ | Mandatory architect PL program |
| **OAA Practice Tip PT.39.1** | OAA contract/indemnity guidance | Contractual liability vs PL |
| **FSRA — O. Reg. 347/04 s. 13** | https://www.fsrao.ca/industry/life-and-health-insurance/... | Life agent E&O $1M |
| **FSRA E&O FAQs** | https://www.fsrao.ca/media/9171/download | Agent E&O duty |
| **RECO — Insurance** | https://www.reco.on.ca/agents-and-brokerages/insurance/ | Mandatory program overview |
| **RECO — PL program details** | https://www.reco.on.ca/agents-and-brokerages/insurance/professional-liability-insurance | E&O $2M/$4M, deposits, commissions |
| **TRESA** | Trust in Real Estate Services Act, 2002 | Registration insurance requirement |
| **CPSO — Registration FAQs** | https://www.cpso.on.ca/physicians/your-practice/registration-renewals-and-incorporation/annual-membership-renewal/annual-registration-renewal-faqs | Physician PL requirement |
| **CMPA — Assistance to clinics** | https://www.cmpa-acpm.ca/en/membership/protection-for-members/principles-of-assistance/assistance-to-clinics-and-facilities | Entity vs individual |
| **CMPA — Not insurance** | https://www.cmpa-acpm.ca/en/home | Mutual defence org |
| **RCDSO — PLP FAQ** | https://www.rcdso.org/en-ca/about-rcdso/professional-liability-program-/frequently-asked-questions | Dental minimums, 2026 transition |
| **Ontario — MLP Reimbursement** | https://www.ontario.ca/document/medical-liability-protection-reimbursement-program | CMPA fee reimbursement (not coverage) |
| **IPC — PHIPA overview** | https://www.ipc.on.ca/sites/default/files/documents/PHIPA-01-Overview-and-Focus.pdf | Custodian obligations |
| **IPC — Breach guidelines** | https://www.ipc.on.ca/sites/default/files/legacy/2018/10/health-privacy-breach-guidelines.pdf | Notification/reporting |
| **IPC — Report a breach** | https://www.ipc.on.ca/en/health-organizations/report-a-privacy-breach | IPC notification categories |
| **Pharmacy page (internal benchmark)** | `commercial-products-specialty.ts` pharmacy slug | Entity vs registrant architecture |
| **Property management page (internal)** | `commercial-products-industry.ts` property-management slug | Manager vs owner distinction |

**Secondary (structure only — not for numeric claims):** IBC commercial insurance concepts; broker educational materials for claims-made mechanics.

---

## G. Cross-page differentiation matrix

| Row | Professional Liability | Professional Offices | Real Estate | Medical & Dental |
|-----|------------------------|----------------------|-------------|------------------|
| **PRIMARY CUSTOMER** | Professionals/firms selling **advice, design, or specialized services** | **Professional service businesses** operating from an office | **FLAG:** Currently mixes **RECO registrants/brokerages** and **property owners/landlords** | **Medical/dental clinic entities** (and owners/operators of premises) |
| **CORE EXPOSURE** | Client **financial loss** from professional error | **Premises + office property + optional advice/data** | **A:** transaction/deposit errors · **C:** building/tenant/landlord liability | **Premises injury + equipment + patient data** separate from **treatment error** |
| **PRIMARY INSURANCE PRODUCT** | **Standalone professional liability / E&O** | **Commercial package** (GL + property ± PL ± cyber) | **A:** RECO program + brokerage GL/property · **C:** landlord/lessor's risk | **Commercial GL + property + cyber** |
| **ADJACENT PRODUCTS** | Cyber, D&O, excess PL | BI, crime, equipment breakdown, hired/non-owned auto | Property management E&O, commercial property, cyber; **not** RECO program placement | Equipment breakdown, BI, crime, entity PL |
| **PROFESSIONAL LIABILITY ROLE** | **Hero product** — claims-made mechanics, retro, contracts | **One line in package** — when office still needs E&O; link to standalone PL | **Registrant RECO E&O** (mandatory program) vs **not** landlord coverage | **Coordination only** — individual malpractice via CMPA/RCDSO |
| **PROPERTY/CGL ROLE** | Mention as **distinction** (not covered) | **Lead** — lease, contents, client visits | Brokerage office property/GL; landlord building policy for owners | **Lead** — waiting room, equipment, leasehold improvements |
| **CYBER/PRIVACY ROLE** | IT advice overlap; link out | Client data / cloud systems | Client records, transaction data | **PHIPA custodian** exposure — insurance ≠ compliance |
| **REGULATORY COMPONENT** | Profession-specific (CPA, PEO, OAA, FSRA) where segment matches | Generally **contract/lease-driven** unless regulated profession | **RECO/TRESA mandatory insurance** for registrants | **CPSO + CMPA** (physicians) · **RCDSO PLP** (dentists) · **PHIPA** |
| **WHAT DOES NOT BELONG** | Office contents, landlord rental income, RECO program details | Deep profession-regulatory tables | Landlord investment thesis on brokerage page; implying broker places RECO coverage | Replacing malpractice; PHIPA compliance checklist; pharmacy OCP rules |
| **QUOTE/UNDERWRITING INPUTS** | Profession, services, revenue, contracts, retro date, claims | Office type, lease/own, headcount, data, services, certificates | Registrant vs landlord; addresses; occupancy; RECO status; portfolio size | Clinic type, equipment values, practitioners, EMR, ownership structure |
| **EXPLORER PURPOSE** | **Who are you?** (profession segment) | **Which office coverages apply?** | **FLAG:** Mixed — brokerage operations vs landlord | **Clinic layer** vs malpractice coordination |

---

## H. Explorer V2 research plan

**Rules:** Preserve all state IDs. RIGHT = WHAT the coverage/issue is. LEFT (detailDescription) = WHY it matters to this customer. No duplication across pages.

### H1. `/professional-liability-insurance/`

| STATE ID | CURRENT TITLE | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT |
|----------|---------------|------------------------|-------------|---------------------------|--------------|--------------------------------|
| `accountants-bookkeepers` | Accountants & Bookkeepers | Accountants & Bookkeepers | Accounting | Claims alleging tax, audit, compilation, or advisory errors causing client financial loss | A missed filing deadline can become a client loss claim | CPA Ontario firms face **regulatory minimum PL limits** by firm size; even non-public accounting bookkeepers may face **contractual E&O** when clients rely on outputs |
| `consultants-advisors` | Consultants & Advisors | Consultants & Advisors | Consulting | Claims that recommendations, reports, or project advice caused measurable client financial harm | A strategy memo can trigger a negligence allegation | Clients often sue for **lost profits** from advice — **GL won't respond**; **claims-made** reporting matters when projects end but claims surface later |
| `engineers-architects` | Engineers & Architects | Engineers & Architects | Design | Claims alleging design, specification, or inspection errors — sometimes tied to project delay or property damage allegations | A specification error can delay an entire project | **PEO/OAA regulatory PL** may apply for public practice; **BI/PD from design** may fall outside PL — coordinate with **CGL/project policies** and **contractual indemnities** |
| `financial-advisors-it-consultants` | Financial Advisors & IT Consultants | Financial Advisors & IT Consultants | Finance / IT | Claims from investment advice errors or technology implementation/security failures alleged to cause client loss | A failed migration can shut down a client's operations | **FSRA life agents** have **$1M E&O minimum**; IT firms face **PL + cyber** split — security advice errors vs **breach response costs** |

**Explorer architecture flag:** Consider future **coverage-concept states** (claims-made, retro date, defence costs) — **Owner Decision B**. Not recommended for Phase 2 without owner approval.

---

### H2. `/professional-offices-insurance/`

| STATE ID | CURRENT TITLE | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT |
|----------|---------------|------------------------|-------------|---------------------------|--------------|--------------------------------|
| `general-liability` | General Liability | General Liability | GL | Third-party bodily injury and property damage from office operations and client visits | A client slips in your reception area | Open houses, waiting areas, and parking access create **premises exposure** distinct from **professional advice** claims |
| `professional-liability-errors-omissions` | Professional Liability (E&O) | Professional Liability (E&O) | E&O | Financial loss claims when clients allege your professional services or advice caused harm | Bad advice can cost more than a slip-and-fall | Offices that **actually provide professional services** may need E&O **in addition to GL** — see standalone PL page for depth |
| `commercial-property` | Commercial Property | Commercial Property | Property | Office contents, equipment, and tenant improvements against insured causes of loss | A fire in your suite destroys workstations | **Leased premises:** landlord insures building; you insure **contents and improvements** you funded |
| `cyber-liability` | Cyber Liability | Cyber Liability | Cyber | Costs tied to data breaches, ransomware, and certain network security incidents where purchased | A phishing attack exposes client files | Standard GL/E&O often **exclude cyber events** — relevant when you store **client records, credentials, or payment data** |

---

### H3. `/real-estate-insurance/`

| STATE ID | CURRENT TITLE | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT |
|----------|---------------|------------------------|-------------|---------------------------|--------------|--------------------------------|
| `errors-omissions-e-o` | Errors & Omissions (E&O) | Registrant E&O (RECO Program) | E&O | Professional liability for real estate services — RECO's mandatory program includes E&O, commission protection, and consumer deposit coverage | A missed clause in an APS can become a claim | **Ontario registrants must participate** in RECO's program — **$2M per claim E&O**; this is **not** generic commercial E&O |
| `commercial-property` | Commercial Property | Brokerage Office Property | Property | Office contents, equipment, and improvements for brokerage operations | Your boardroom equipment isn't covered by RECO | **Owned vs leased** office — confirm who insures the building vs your **fixtures and IT** |
| `general-liability` | General Liability | Office & Open House Liability | GL | Third-party injury or property damage tied to brokerage premises and operations | An open-house visitor injury | **Open houses and showings** create premises exposure — separate from **transaction E&O** |
| `landlord-coverage` | Landlord Coverage | Landlord / Rental Property | Landlord | Building, landlord liability, and rental income protection for **owned rental real estate** | Tenant damage and rental income loss | **FLAG FOR OWNER REVIEW** — **Different customer** from registrant/brokerage; overlaps `/landlord-insurance/`; office archetype zone mapping is weak |

---

### H4. `/medical-dental-insurance/`

| STATE ID | CURRENT TITLE | PROPOSED VISITOR TITLE | SHORT LABEL | RIGHT DESCRIPTION CONCEPT | DETAIL TITLE | LEFT DETAIL DESCRIPTION CONCEPT |
|----------|---------------|------------------------|-------------|---------------------------|--------------|--------------------------------|
| `commercial-general-liability` | Commercial General Liability | Commercial General Liability | GL | Premises-related third-party injury in waiting and common areas — not treatment errors | A patient slips in the waiting room | **Treatment allegations** belong to **malpractice/PL**, not ordinary premises GL — same separation as pharmacy page |
| `commercial-property` | Commercial Property | Commercial Property | Property | Medical/dental equipment, furniture, leasehold improvements | Sterilization equipment loss closes operatory | High-value **chairs, imaging, and leasehold buildouts** need accurate **values and causes of loss** review |
| `cyber-privacy` | Cyber & Privacy | Cyber & Privacy | Cyber | Certain breach-response and system incident costs where purchased — distinct from PHIPA compliance | Ransomware can lock patient scheduling | **PHIPA** requires **reasonable safeguards** — cyber insurance **does not equal compliance** and may not cover every privacy incident |
| `malpractice-coordination` | Malpractice Coordination | Malpractice Coordination | Malpractice | How clinic commercial lines coordinate with **individual** physician/dentist professional protection | Clinic insurance doesn't replace your college PL | **Physicians:** CPSO + **CMPA** (not insurance). **Dentists:** **RCDSO minimum PL**. Entity and individual layers are **related but not interchangeable** |

---

## I. Practical considerations plan (~6–8 per route)

### I1. Professional Liability

1. **Professional services definition** — [COVERAGE] Undisclosed services may fall outside policy scope.  
2. **Claims-made reporting and retroactive date** — [COVERAGE] Late reporting and retro gaps on carrier change.  
3. **Extended reporting period (tail)** — [COVERAGE] Retirement, contract termination, M&A.  
4. **Defence cost treatment** — [COVERAGE] Inside vs outside limits erodes effective capacity.  
5. **Contractual liability and broad indemnities** — [CONTRACTUAL] May exceed insuring agreement (OAA guidance).  
6. **Subcontractors and vicarious exposure** — [UNDERWRITING] Disclose delegated professional work.  
7. **Cyber vs professional liability overlap** — [EXPOSURE] IT/security advice vs breach costs.  
8. **Regulatory minimums where applicable** — [REGULATORY] CPA/PEO/OAA/FSRA — profession-specific, not universal.

### I2. Professional Offices

1. **Leased premises vs contents** — [CONTRACTUAL] Landlord/building vs tenant improvements.  
2. **Client visits and premises exposure** — [EXPOSURE] GL for physical incidents at office.  
3. **When the office still needs E&O** — [COVERAGE] Any billed professional advice/design.  
4. **Cyber/privacy for client data** — [EXPOSURE] Exclusions from GL/E&O base forms.  
5. **Equipment, laptops, and off-premises property** — [COVERAGE] Scheduling and sublimits.  
6. **Business interruption** — [COVERAGE] Triggered by covered direct physical loss only.  
7. **Crime / client funds** — [EXPOSURE] If office holds trust funds or processes wires.  
8. **Contractual insurance certificates** — [CONTRACTUAL] Lease and client MSA requirements.

### I3. Real Estate

1. **Registrant vs property owner — different customers** — [EXPOSURE] Owner decision on page focus.  
2. **RECO mandatory program structure** — [REGULATORY] E&O + commission + deposit — not broker-placed.  
3. **Brokerage office GL and property** — [COVERAGE] Open houses, office contents.  
4. **Owned rental properties / landlord coverage** — [COVERAGE] Cross-link if retained on page.  
5. **Vacant units and renovation** — [UNDERWRITING] Property policy restrictions.  
6. **Property management overlap** — [EXPOSURE] Link to property-management route.  
7. **Privacy / transaction data** — [EXPOSURE] Cyber supplement where applicable.  
8. **Contractual and lender requirements** — [CONTRACTUAL] Certificates for owned assets.

### I4. Medical & Dental

1. **Individual malpractice vs clinic entity coverage** — [REGULATORY] CMPA vs RCDSO PLP vs commercial package.  
2. **CMPA clinic assistance conditions** — [REGULATORY] Discretionary; not a substitute for commercial insurance.  
3. **Non-employed practitioners and contractors** — [UNDERWRITING] Own PL required; disclose all providers.  
4. **Medical/dental equipment values** — [UNDERWRITING] Property scheduling; equipment breakdown.  
5. **Tenant improvements and leased clinics** — [CONTRACTUAL] Who insures buildout.  
6. **PHIPA safeguards vs cyber insurance** — [REGULATORY] Compliance separate from purchased coverage.  
7. **Business interruption after covered property loss** — [COVERAGE] Waiting periods; not licence suspension.  
8. **Crime / payment fraud** — [EXPOSURE] Terminals, employee dishonesty where purchased.

---

## J. FAQ plan (~5 per route)

### J1. Professional Liability

1. **Is E&O the same as general liability?** — Financial loss from professional services vs BI/PD.  
2. **Is professional liability claims-made?** — Yes for most commercial forms; retro date and reporting.  
3. **What is a retroactive date?** — Work before date excluded unless tail/prior acts coverage.  
4. **Does professional liability cover subcontractors?** — Depends on wording; disclose sub use; vicarious exposure remains.  
5. **How do I handle contract insurance requirements?** — Review **specific contractual minimums** against current program; regulatory floors where applicable; **no universal dollar range**.

**Remove/replace:** Current FAQ #4 with `$1M–$5M` — **remove numeric range**.

### J2. Professional Offices

1. **What does professional office insurance include?** — Typically GL + property; PL and cyber when needed.  
2. **Do I still need separate E&O?** — If you provide professional services — often yes; may be packaged or standalone.  
3. **What about leased equipment and premises?** — Landlord vs tenant insurance responsibilities.  
4. **Do professional offices need cyber insurance?** — When client data/cloud systems create exposure; not universal mandate.  
5. **What information is needed for a quote?** — Profession, services, revenue, staff, lease, data, certificates, claims.

### J3. Real Estate

1. **Is brokerage E&O the same as landlord insurance?** — **No** — registrant professional program vs owned rental property coverage.  
2. **What insurance does an Ontario brokerage need?** — RECO program for registrants + office GL/property/cyber as applicable.  
3. **What if the brokerage owns its building?** — Separate building property + operations GL + RECO registrant coverage.  
4. **What about property management services?** — Point to property-management page; management E&O ≠ RECO transaction E&O.  
5. **What information is needed for a quote?** — Registrant vs landlord; addresses; occupancy; portfolio; RECO status; claims.

### J4. Medical & Dental

1. **Does clinic insurance replace malpractice insurance?** — **No** — commercial package does not replace CPSO/RCDSO professional requirements.  
2. **Does an individual's malpractice policy cover the clinic entity?** — **Not automatically** — CMPA clinic assistance is conditional; dentists need RCDSO-compliant individual coverage.  
3. **What protects medical and dental equipment?** — Commercial property; equipment breakdown where purchased.  
4. **What about patient-data incidents?** — PHIPA custodian duties; cyber/privacy may help with **certain costs** where purchased.  
5. **What information is needed for a quote?** — Clinic type, ownership, practitioners, equipment values, EMR, lease, services, claims.

---

## K. Claim register

| CLAIM | ROUTE | TYPE | SOURCE | SOURCE DATE/STATUS | EXACT SUPPORT | SAFE TO PUBLISH | HEDGE REQUIRED | NOTES |
|-------|-------|------|--------|-------------------|---------------|-----------------|----------------|-------|
| CPA firms must maintain PL: $1M / $1.5M / $2M per claim by firm size | PL (accountants segment) | [REGULATORY] | CPA Ontario Reg. 14-1 ss. 2–2.3 | Current | Firms in public accounting or providing accounting services to the public | **YES** | Scope to regulated firms | Not every bookkeeper |
| PEO C of A holders: min $250K/$500K PL | PL (engineers segment) | [REGULATORY] | R.R.O. 1990, Reg. 941 s. 74(1) | Current | Certificate of authorization holders | **YES** | Exemptions in s. 74(2) | — |
| OAA architects: $250K–$1M PL by fee tier | PL (architects segment) | [REGULATORY] | O. Reg. 386/15 s. 1 | Current | CoP holders | **YES** | Pro-Demnity mandatory program | — |
| FSRA life agents: min $1M E&O per occurrence | PL (financial advisors segment) | [REGULATORY] | O. Reg. 347/04 s. 13; FSRA guidance | Current | Licensed life agents | **YES** | Life/ A&S agents specifically | Not all financial advisors |
| RECO registrants must participate in PL program | Real Estate | [REGULATORY] | RECO insurance pages; TRESA | 2026–2027 term published | All registrants | **YES** | Premium does not place RECO program | — |
| RECO E&O: $2M per claim, $4M annual aggregate | Real Estate | [REGULATORY] | RECO PL program page | Sept 2026–Aug 2027 term | Table on reco.on.ca | **YES** | Subject to policy terms | — |
| RECO consumer deposit: $200K per claim, $4M per event | Real Estate | [REGULATORY] | RECO consumer deposit page | Current | — | **YES** | Subject to policy terms | — |
| RECO annual insurance fee $500/registrant | Real Estate | [REGULATORY] | RECO insurance renewal | 2026–2027 | — | **YES** | Plus applicable taxes | — |
| CPSO registrants must maintain appropriate PL | Medical/Dental (physicians) | [REGULATORY] | CPSO renewal FAQs; General By-Law | Current | s.22.1 / s.50.2 references | **YES** | "Appropriate" — typically CMPA | — |
| CMPA is not an insurance company | Medical/Dental | [REGULATORY] | CMPA website | Current | Mutual defence org | **YES** | Assistance discretionary | — |
| RCDSO members: min $2M per occurrence / $6M aggregate PL | Medical/Dental (dentists) | [REGULATORY] | RCDSO PLP FAQ; by-law consultation docs | Effective 2026+ | Council-passed minimums | **YES** | Transition via Navacord 2026 | — |
| PHIPA custodians must safeguard PHI | Medical/Dental | [REGULATORY] | IPC PHIPA materials | Current | Reasonable safeguards | **YES** | Do not imply cyber = compliance | — |
| PHIPA breach notification to individuals / IPC categories | Medical/Dental | [REGULATORY] | IPC breach guidelines | Current | First reasonable opportunity | **YES** | — | — |
| "$1M to $5M per occurrence common for mid-size engagements" | PL FAQ | [COVERAGE] | None authoritative | — | **Unsupported** | **NO** | **REMOVE** | Only LOW flag in Grade C set |
| "Many brokerages and boards require" real estate E&O | Real Estate FAQ | [REGULATORY] | RECO | — | Understates **mandatory** program | **NO** as written | Replace with TRESA/RECO mandatory language | — |
| "Covers patient slip-and-fall" (absolute) | Medical/Dental CGL card | [COVERAGE] | — | — | Policy-dependent | **NO** as written | Use "may help respond… subject to policy terms" | Pharmacy pattern |
| "Addresses patient data breaches under PHIPA" | Medical/Dental cyber card | [REGULATORY]/[COVERAGE] | IPC | — | Conflates law with insurance | **NO** as written | Split PHIPA duty vs optional cyber | — |
| "Yes in practice" agents need E&O | Real Estate FAQ | [REGULATORY] | RECO | — | Mandatory, not optional | **NO** as written | Replace | — |

---

## L. Unsupported / risky claims to avoid

1. **`$1M–$5M per occurrence` as common mid-size contract norm** — remove (§B5).  
2. **Treating malpractice, E&O, and professional liability as universally interchangeable.**  
3. **Implying office/clinic package replaces individual physician/dentist malpractice.**  
4. **Implying individual CMPA/RCDSO coverage automatically protects clinic entity or all staff.**  
5. **Implying cyber insurance satisfies PHIPA compliance obligations.**  
6. **Absolute "Covers…" on medical/dental CGL and cyber cards.**  
7. **Stating Premium places or renews RECO mandatory registrant coverage.**  
8. **Applying CPA/PEO/OAA/FSRA minimums to all professions on PL page without segment context.**  
9. **Mixing landlord rental property and brokerage registrant coverage without clear audience separation.**  
10. **Copying pharmacy OCP PPLI dollar minimums to medical/dental.**  
11. **Using "per occurrence" for all PL policies without confirming policy terminology.**  
12. **Generic "choose the right limit / work with a broker" without exposure-specific tie-in.**

---

## M. Owner decisions

### A. Real Estate audience (REQUIRED)

**Question:** Does `/real-estate-insurance/` successfully serve **both** brokerage/registrant operations **and** property owners/landlords?

**Research finding:** **No — not cleanly.** Current subhead, coverage intro, and `landlord-coverage` Explorer state mix materially different customers, products, and regulatory contexts (RECO mandatory program vs lessor's risk).

**Options (do not implement yet):**

| Option | Description |
|--------|-------------|
| **A1 — Brokerage primary** | Focus page on registrants/brokerages; move landlord content to `/landlord-insurance/` + cross-links |
| **A2 — Split sections** | Single route with clearly labeled sections ("If you are a registrant…" / "If you own rental property…") |
| **A3 — Dual-audience with heavy cross-linking** | Retain four Explorer states but rewrite all copy with explicit audience labels |

**Recommendation:** **A1 or A2** — prefer **brokerage/registrant primary** (matches nav label "Real Estate" in business context) with prominent cross-link to landlord route. **Flag `landlord-coverage` Explorer state** if A1 chosen.

---

### B. Professional Liability Explorer architecture (REQUIRED)

**Question:** Keep **profession segments** or switch to **coverage concepts** (claims-made, retro date, defence costs, contractual liability)?

**Research finding:** Profession segments aid self-selection; coverage concepts aid understanding. Pharmacy and property-management A-grade pages use **coverage-type states with profession-specific detail copy**.

**Recommendation:** **Keep profession segment IDs** for Phase 2; teach coverage mechanics in **V2 detailDescription** and **considerations**. Revisit concept-based Explorer only if owner wants PL page to mirror cyber/EPL depth structure.

---

### C. Medical + Dental combined page (REQUIRED)

**Question:** Can one page serve both without over-broad regulatory claims?

**Answer:** **Yes, with profession-specific regulatory labeling** and shared **clinic entity** framing (property, GL, cyber, coordination). Use pharmacy page **architecture** (entity vs individual separation) but **separate CPSO/CMPA and RCDSO/PLP content blocks**.

**If owner prefers split routes later:** `/medical-office-insurance/` and `/dental-office-insurance/` — **not proposed for Phase 2** without explicit approval.

---

## N. Proposed implementation scope (Phase 2 — NOT STARTED)

### Target grade bar (from audit methodology)

- ≥ **400** substantive words (≥ **750** for A-grade aspiration on precision routes)  
- **6–8** practical considerations (~120w+ aggregate)  
- **5** unique FAQs with hedged policy language  
- **Explorer V2** detailTitle + detailDescription for all states  
- **Zero** unsupported numeric/regulatory claims  

### Per-route scope

| Route | Primary file | Secondary |
|-------|--------------|-----------|
| `/professional-liability-insurance/` | `src/data/product-pages/commercial-products-core.ts` | Explorer manifest unchanged IDs |
| `/professional-offices-insurance/` | `src/data/commercial-industries.ts` | — |
| `/real-estate-insurance/` | `src/data/commercial-industries.ts` | Cross-links; owner decision on landlord state |
| `/medical-dental-insurance/` | `src/data/product-pages/commercial-products-specialty.ts` | — |

### Out of scope (unless owner expands)

- Explorer runtime, images, archetype changes  
- New routes or nav restructure  
- RECO program placement automation  
- Scanner rule changes  
- Frozen A-grade routes, Final D batch, homepage, carriers  

### Validation (Phase 2)

- `npx tsx scripts/product-content-audit.ts`  
- Explorer V2 regression  
- Literal claim dump for new copy  
- Confirm `$1M–$5M` FAQ removed or replaced  

---

## O. Expected files to change (Phase 2 only)

| File | Change |
|------|--------|
| `src/data/product-pages/commercial-products-core.ts` | PL copy, considerations, FAQs, V2 detail pairs |
| `src/data/commercial-industries.ts` | Professional offices + real estate copy |
| `src/data/product-pages/commercial-products-specialty.ts` | Medical/dental copy |
| `docs/product-content-audit-*.md` | Regenerated after implementation |
| `docs/qa-screenshots/product-content-audit-*/audit-data.json` | Regenerated |
| Optional: `docs/grade-c-batch-a-professional-implementation-2026-09-XX.md` | Implementation report |

**Phase 1 (this document only):** `docs/grade-c-batch-a-professional-research-2026-09-09.md`

---

## Phase 1 completion checklist

| Check | Status |
|-------|--------|
| Worktree verified @ `15ecf15` | YES |
| Production source unchanged | YES (research doc only) |
| Explorer/images unchanged | YES |
| Owner decisions documented | YES |
| Claim register complete | YES |
| `$1M–$5M` claim researched | YES — **remove** |
| Real estate audience flag | YES |
| Ready for implementation pending owner review | YES |

**STOP FOR OWNER REVIEW — DO NOT IMPLEMENT COPY UNTIL DECISIONS A/B/C ARE CONFIRMED.**
