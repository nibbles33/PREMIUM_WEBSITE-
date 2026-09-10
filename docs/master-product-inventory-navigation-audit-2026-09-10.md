# Master Product Inventory + Navigation Reconciliation

**Phase:** 1 — Site-wide discovery audit + canonical taxonomy proposal  
**Date:** 2026-09-10  
**Branch:** `cursor/coverage-explorer-ux-v2-2026-09-07`  
**Worktree:** `/tmp/PREMIUM_WEBSITE-d3-transportation`  
**Cannabis content freeze:** `d8bf75d`  
**Cannabis visual freeze:** `479a0c8`  
**Content audit at time of this report:** A44 / B16 / C0 / D0  

**Status:** AUDIT + TAXONOMY PROPOSAL ONLY. No production source, navigation, product copy, routes, images, Explorer, scanner, carrier data, Partners, or Claims were modified.

---

## Safety confirmation

| Check | Result |
|-------|--------|
| PRODUCTION FILES CHANGED | **NO** |
| PRODUCT COPY CHANGED | **NO** |
| NAVIGATION CHANGED | **NO** |
| ROUTES CHANGED | **NO** |
| IMAGES CHANGED | **NO** |
| FROZEN 60 CHANGED | **NO** |
| CANNABIS CONTENT / VISUALS TOUCHED | **NO** |
| THIS DELIVERABLE | `docs/master-product-inventory-navigation-audit-2026-09-10.md` only |

Authority used for inventory: implemented `src/app/*-insurance/page.tsx` routes (60 files), commercial + personal registries, and sitemap static routes. **Menus were not used as the source of the 60-route list.**

---

## A. Executive summary

The site now has a complete **60-route** product inventory. Desktop mega-menu and mobile navigation already expose **58 of 60** routes. The two missing routes are the frozen Cannabis products:

- `/cannabis-retail-insurance/`
- `/cannabis-producer-insurance/`

Those two routes exist, are indexed in `src/app/sitemap.ts`, and build as product pages. They have outbound related-product links, but **no inbound visitor discovery path** from header, mobile, homepage, Commercial Hub, footer, or other product related-link graphs. They are the only **zero-discovery** routes.

The larger problem is not missing routes in the mega-menu. It is **stale category membership and inconsistent labels** created before the inventory was complete:

- Homepage “Whatever kind of business you run” is a curated 10-tab explorer (`src/data/pilot-home.ts`) and does not match mega-menu groupings.
- Hospitality (homepage) and “Hospitality & Retail” (mega-menu) are **intentionally different lists**, and they should not be forced identical.
- Grocery is in the mega-menu only. It is absent from both homepage Hospitality and homepage Retail.
- Garage / Dealership is Transportation in the mega-menu and Retail on the homepage.
- Salon is mega-only. Real Estate is mega-only. Cannabis is nowhere.
- Commercial Hub remains a curated orientation page (10 coverage categories, 12 industry tiles, 6 specialty related links). That posture is correct. It does not yet represent Cannabis, and one hub category (“Equipment Breakdown”) has no standalone route.
- Desktop and mobile **share the same data sources**. Mobile is not a separate inventory; it inherits the same gaps and the same 11-link “Specialty & Community” cluster.
- There is **no on-site product search**. Sitemap + navigation + related links are the discovery system.
- Footer is a short curated list, not a product directory.
- Personal navigation is complete in mega-menu and mobile. Do not let commercial reconciliation regress it.

**Recommended posture for Phase 2:** smallest effective change. Keep the 10 homepage industry tabs. Keep the 7 business mega-menu clusters. Keep Commercial Hub curated. Add Cannabis in two places (Retail + Specialty; Manufacturing + Specialty). Standardize visitor labels. Fix a handful of misplacements. Do not turn any surface into an exhaustive 46-product directory.

**Ready for navigation implementation:** **NO** until the owner answers decisions A–O in section AA. Recommended answers are provided.

---

## B. 60-route canonical inventory

### Count reconciliation

| Source | Count |
|--------|------:|
| `src/app/*-insurance/page.tsx` | 60 |
| Commercial registry (`getPilotCommercialSlugs`) | 46 |
| Personal registry (`getPilotPersonalSlugs`) | 13 |
| Standalone Auto page (`PilotAutoPage`) | 1 |
| Sitemap static insurance routes | 60 |
| **TOTAL ROUTES** | **60** |

**Discrepancy:** none. 46 commercial + 13 personal-registry + 1 auto = 60.

Commercial registry composition:

- Inline: `commercial-insurance`, `bonding-insurance`, `farm-insurance`, `greenhouse-agribusiness-insurance` (4)
- Batch B industry (8)
- Batch B product (28)
- Batch C: `food-truck-insurance` (1)
- Batch D transportation (3)
- Cannabis (2)

Non-routes that appear in discovery copy but are **not** among the 60:

- Equipment Breakdown — hub category only; href is `/commercial-property-insurance/`
- Wrap-Up / OCIP — Explorer coverage concept on contractors / builders pages
- Commercial Landlord / Property Owner — Explorer coverage concept on commercial property
- General Liability — hub category; href is `/small-business-insurance/`

### Inventory key

- **Type:** Personal / Commercial / Hub
- **Kind:** Industry product / Specialty coverage / Core product / Hub
- **Discoverable:** Yes / Partial / No
- **Surfaces:** Mega = desktop business/personal/agriculture menu; Mobile = same data; Home = homepage industry explorer tab; Hub = Commercial Hub categories, tiles, or related; Related = inbound related-product link from another product; Other = footer, homepage filmstrip / Yep / breadth, Agriculture menu, sitemap

---

### Personal (14)

**1. `/auto-insurance/`**  
VISITOR TITLE: Auto Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY INDUSTRY/CATEGORY: Auto / Mobility  
SECONDARY DISCOVERY CATEGORY: —  
SPECIALTY / INDUSTRY / CORE: Core product  
CURRENTLY DISCOVERABLE: Yes  
DISCOVERY SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth, Footer, Related  
RELATED PRODUCTS: Home, Condo, Tenant, Motorcycle, Boat, Cottage, Personal Umbrella  
NOTES: Standalone `PilotAutoPage`; not in personal registry map. Personal hub href.

**2. `/home-insurance/`**  
VISITOR TITLE: Home Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Property  
SECONDARY: —  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth, Footer, Related  
RELATED: Condo, Personal Umbrella, Cottage  
NOTES: Strong inbound graph.

**3. `/condo-insurance/`**  
VISITOR TITLE: Condo Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Property  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth, Footer, Related  
RELATED: Home, Tenant, Landlord, Cottage  
NOTES: Also inbound from condominium corporation (unit-owner distinction). Label is consistent.

**4. `/tenant-insurance/`**  
VISITOR TITLE: Tenant Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Property  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth, Footer, Related  
RELATED: Home, Condo, Landlord

**5. `/landlord-insurance/`**  
VISITOR TITLE: Landlord Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Property  
SECONDARY: Commercial Real Estate (cross)  
KIND: Core product  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega, Mobile, Home Yep/breadth specialty lane, Related  
RELATED: Home, Condo, Tenant, Cottage  
NOTES: Not in personal filmstrip. Real-estate commercial page links here. This is personal rental-property coverage, not a commercial landlord route.

**6. `/motorcycle-insurance/`**  
VISITOR TITLE: Motorcycle Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Auto / Mobility  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth, Related  
RELATED: Auto, Boat

**7. `/boat-insurance/`**  
VISITOR TITLE: Boat Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Auto / Mobility  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth, Related  
RELATED: Auto, Motorcycle, Cottage

**8. `/cottage-insurance/`**  
VISITOR TITLE: Cottage Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Property  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth, Related  
RELATED: Home, Condo, Boat, Landlord

**9. `/travel-insurance/`**  
VISITOR TITLE: Travel Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Auto / Mobility (current nav)  
KIND: Specialty / core hybrid  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home filmstrip / Yep / breadth  
RELATED: Auto, Contact Us  
NOTES: Nav group “Auto / Mobility” is a stretch. Related includes a non-product Contact link.

**10. `/mobile-home-insurance/`**  
VISITOR TITLE: Mobile & Manufactured Home Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Property  
KIND: Specialty  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega, Mobile, Related  
RELATED: Home, Tenant, Landlord  
NOTES: Absent from homepage filmstrip / Yep. Mega label “Mobile / Manufactured Home”.

**11. `/personal-umbrella-insurance/`**  
VISITOR TITLE: Personal Umbrella Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Specialty  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Yep / breadth (sometimes labeled “Personal Valuables”), Related  
RELATED: Home, Auto, Landlord, Boat  
NOTES: Homepage breadth slot label “Personal Valuables” is a label inconsistency.

**12. `/home-sharing-insurance/`**  
VISITOR TITLE: Home & Ride Sharing Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Specialty (recommended)  
SECONDARY: Auto / Mobility, Property  
KIND: Specialty  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega (under Auto / Mobility as “Ride / Car / Home Sharing”), Mobile, Related  
RELATED: Home, Landlord, Auto, Cottage  
NOTES: Misgrouped in Auto / Mobility. Absent from homepage filmstrip.

**13. `/life-insurance/`**  
VISITOR TITLE: Life Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Specialty  
KIND: Specialty / inquiry route  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega, Mobile, Related  
RELATED: Group Home & Auto, Contact, Home  
NOTES: Inquiry-coordination page. Not on homepage. Related includes Contact.

**14. `/group-home-auto-insurance/`**  
VISITOR TITLE: Group Home & Auto Insurance  
PERSONAL / COMMERCIAL: Personal  
PRIMARY: Specialty  
KIND: Specialty / program  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega, Mobile, Related  
RELATED: Life, Auto, Home, Contact  
NOTES: Not on homepage. Acceptable as specialty-only nav.

---

### Commercial hub (1)

**15. `/commercial-insurance/`**  
VISITOR TITLE: Commercial insurance, built for your industry  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Commercial Hub  
KIND: Hub  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Header Business, Mega, Mobile, Footer, many related links  
RELATED (hub “Specialty & program routes”): Small Business, Manufacturing, Product Recall, Pollution, Crime & Fidelity, Directors & Officers  
NOTES: Orientation page. 10 coverage categories + 12 industry tiles + 6 specialty related links. Not a product directory.

---

### Agriculture (2)

**16. `/farm-insurance/`**  
VISITOR TITLE: Farm Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Agriculture  
SECONDARY: Specialty Risks (not recommended as primary)  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Agriculture mega + mobile, Home Yep, Footer  
RELATED: Greenhouse & Agribusiness, Commercial Auto, Commercial Hub  
NOTES: Correctly separated from Business mega-menu. Homepage industry explorer has no Agriculture tab.

**17. `/greenhouse-agribusiness-insurance/`**  
VISITOR TITLE: Greenhouse & Agribusiness Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Agriculture  
SECONDARY: Manufacturing (cross for indoor production); Cannabis Producer (related only)  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Agriculture mega + mobile, Home Yep / breadth  
RELATED: Farm, Commercial Hub  
NOTES: Does not yet inbound-link Cannabis Producer. Related graph is thin.

---

### Transportation (5)

**18. `/commercial-auto-insurance/`**  
VISITOR TITLE: Commercial Auto & Fleet Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Transportation  
KIND: Core / industry  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Transportation, Hub category + tile, Footer, Related  
RELATED: Hub, Trucking, Dump Truck, Cargo & Freight  
NOTES: Labels vary: “Commercial Auto”, “Commercial Auto / Fleet”, “Commercial Auto & Fleets”, “Commercial Auto & Fleet”.

**19. `/trucking-insurance/`**  
VISITOR TITLE: Trucking Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Transportation  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Transportation, Hub tile, Home Yep / breadth, Related  
RELATED: Commercial Auto, Dump Trucks, Cargo & Freight

**20. `/dump-truck-insurance/`**  
VISITOR TITLE: Dump Truck Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Transportation  
SECONDARY: Construction (cross)  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Transportation, Hub tile, Home specialty lane  
RELATED: Hub, Trucking, Commercial Auto  
NOTES: Labels: “Dump Truck” vs “Dump Trucks”.

**21. `/cargo-freight-insurance/`**  
VISITOR TITLE: Cargo & Freight Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Transportation  
KIND: Specialty coverage (cargo) sitting in a transportation industry group  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Transportation, Related  
RELATED: Trucking, Commercial Auto, Warehousing  
NOTES: Not a hub industry tile. Labels: “Cargo / Freight” vs “Cargo & Freight”.

**22. `/garage-dealership-insurance/`**  
VISITOR TITLE: Garage & Dealership Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Transportation (recommended)  
SECONDARY: Retail (current homepage only)  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes — **misclassified on homepage**  
SURFACES: Mega Transportation, Mobile, Home Retail, Related  
RELATED: Commercial Auto, Commercial Property, Pollution  
NOTES: Auto service / dealer operations are not storefront retail. Do not create a new Automotive category.

---

### Construction (4 including surety)

**23. `/contractors-insurance/`**  
VISITOR TITLE: Contractors Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Construction  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Construction, Hub tile, Footer, Home Yep / breadth, Related  
RELATED: Hub, Surety Bonds, Builder's Risk

**24. `/builders-developers-insurance/`**  
VISITOR TITLE: Builders & Developers Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Construction  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Construction, Hub tile, Home specialty lane, Related  
RELATED: Hub, Contractors, Builder's Risk  
NOTES: Wrap-Up is an Explorer concept on this page, not a separate route.

**25. `/builders-risk-insurance/`**  
VISITOR TITLE: Builder's Risk Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Construction  
KIND: Specialty / project coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Construction, Related  
RELATED: Contractors, Builders & Developers, Surety Bonds  
NOTES: Labels: “Builders Risk” vs “Builder's Risk”.

**26. `/bonding-insurance/`**  
VISITOR TITLE: Surety Bonds  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty Risks  
SECONDARY: Construction  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Commercial Hub cluster, Mobile, Home Specialty Risks, Footer, Related  
RELATED: Contractors, Builder's Risk, Crime & Fidelity  
NOTES: Route slug is `bonding-insurance`; visitor title is Surety Bonds. Highest-priority label inconsistency.

---

### Property (5)

**27. `/commercial-property-insurance/`**  
VISITOR TITLE: Commercial Property Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Property  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Property, Hub category + tile, Related  
RELATED: Hub, Business Interruption, Small Business  
NOTES: Also destination for hub “Equipment Breakdown” category.

**28. `/warehousing-insurance/`**  
VISITOR TITLE: Warehousing & Logistics Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Property (current mega: Construction & Property)  
SECONDARY: Transportation  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega Construction & Property, Mobile, Home Yep / breadth, Related  
RELATED: Commercial Property, Cargo & Freight  
NOTES: Not on homepage Property tab. Thin related graph. Mega grouping under Construction is slightly forced.

**29. `/property-management-insurance/`**  
VISITOR TITLE: Property Management Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Property  
SECONDARY: Professional  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Property, Related  
RELATED: Real Estate, Condo Corporation, Commercial Property

**30. `/condominium-corporation-insurance/`**  
VISITOR TITLE: Condominium Corporation Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Property  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Property, Related  
RELATED: Property Management, Commercial Property, Condo (unit owners)  
NOTES: Labels: “Condo Corp”, “Condominium Corporation”, “Condominium Corporations”.

**31. `/business-interruption-insurance/`**  
VISITOR TITLE: Business Interruption Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty coverage  
SECONDARY: Property  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Commercial Hub cluster, Mobile, Hub category, Related  
RELATED: Commercial Property, Small Business, Manufacturing  
NOTES: Correctly not treated as an industry. Absent from homepage Property (acceptable if Specialty or Property secondary).

---

### Manufacturing (3 + cannabis producer as cross)

**32. `/manufacturing-insurance/`**  
VISITOR TITLE: Manufacturing Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Manufacturing  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Manufacturing, Hub tile, Home Yep, Related  
RELATED: Hub, Commercial Property, Business Interruption, Product Recall  
NOTES: Does not inbound-link Cannabis Producer or Pollution (Pollution is homepage sibling, not related).

**33. `/product-recall-insurance/`**  
VISITOR TITLE: Product Recall Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty coverage  
SECONDARY: Manufacturing, Retail / Grocery  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Manufacturing, Mobile, Home Manufacturing, Hub related, Related  
RELATED: Manufacturing, “Product Liability (Retail)” → retail, Grocery  
NOTES: Related label “Product Liability (Retail)” is misleading; destination is ordinary retail.

**34. `/pollution-liability-insurance/`**  
VISITOR TITLE: Pollution Liability Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty coverage  
SECONDARY: Manufacturing, Construction, Garage / fuel  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Manufacturing, Mobile, Home Manufacturing, Hub category + related, Related  
RELATED: Contractors, Manufacturing, Commercial Property

---

### Hospitality (4)

**35. `/restaurant-insurance/`**  
VISITOR TITLE: Restaurant Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Hospitality  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Hospitality & Retail, Mobile, Home Hospitality, Hub tile, Home Yep / breadth, Related  
RELATED: Hub, Liquor Liability, Business Interruption

**36. `/food-truck-insurance/`**  
VISITOR TITLE: Food Truck & Trailer Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Hospitality  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Hospitality, Hub tile, Related  
RELATED: Hub, Restaurant, Liquor Liability  
NOTES: Labels: “Food Trucks”, “Food Truck / Trailer”, “Food Trucks & Trailers”, “Food Truck & Trailer”.

**37. `/hotel-motel-insurance/`**  
VISITOR TITLE: Hotel & Motel Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Hospitality  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Hospitality & Retail, Mobile, Home Hospitality, Related  
RELATED: Restaurant, Liquor Liability, Business Interruption  
NOTES: Not a hub industry tile. Labels: “Hotels & Motels”, “Hotel / Motel”, “Hotel & Motel”.

**38. `/liquor-liability-insurance/`**  
VISITOR TITLE: Liquor Liability Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty coverage  
SECONDARY: Hospitality  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Specialty & Community, Mobile, Home Hospitality, Related  
RELATED: Restaurant, Event Liability, Hotel / Motel  
NOTES: Homepage Hospitality placement is correct as cross-discovery. Mega places it in Specialty, which is also defensible.

---

### Retail (4 including cannabis retail)

**39. `/retail-insurance/`**  
VISITOR TITLE: Retail Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Retail  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Hospitality & Retail, Mobile, Home Retail, Hub tile, Home Yep / breadth, Related  
RELATED: Small Business, Commercial Property, Grocery, Convenience, Pharmacy  
NOTES: Related graph is one of the best on the site. Does **not** link Cannabis Retail.

**40. `/convenience-store-insurance/`**  
VISITOR TITLE: Convenience Store & Gas Station Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Retail  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Hospitality & Retail, Mobile, Home Retail, Related  
RELATED: Retail, Pollution, Crime / Fidelity  
NOTES: Labels: “Convenience / Gas”, “Convenience Stores”, “Convenience Store & Gas Station”. Not hospitality.

**41. `/grocery-specialty-food-insurance/`**  
VISITOR TITLE: Grocery, Specialty Food & Bakery Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Retail (recommended)  
SECONDARY: Hospitality (food-retail overlap)  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega Hospitality & Retail, Mobile, Related (from Retail and Product Recall)  
RELATED: Retail, Product Recall, Restaurant  
NOTES: **Missing from both homepage Hospitality and homepage Retail.** Highest homepage gap after Cannabis.

**42. `/cannabis-retail-insurance/`**  
VISITOR TITLE: Cannabis Retail Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Retail  
SECONDARY: Specialty Risks  
KIND: Industry product  
CURRENTLY DISCOVERABLE: **No**  
SURFACES: Sitemap only (plus its own outbound related)  
RELATED (outbound): Retail, Commercial Property, Crime / Fidelity, Product Recall, Business Interruption  
NOTES: **ZERO-DISCOVERY.** Content and visuals frozen. Do not rewrite page copy. Discovery wiring is Phase 2.

---

### Professional (7)

**43. `/professional-offices-insurance/`**  
VISITOR TITLE: Professional Offices Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Professional  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Professional, Hub tile, Related  
RELATED: Hub, Professional Liability, Cyber

**44. `/real-estate-insurance/`**  
VISITOR TITLE: Real Estate Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Professional  
SECONDARY: Property  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega Professional, Mobile, Hub tile, Home specialty lane, Related  
RELATED: Hub, Property Management, Landlord  
NOTES: Missing from homepage Professional tab despite being a hub industry tile.

**45. `/professional-liability-insurance/`**  
VISITOR TITLE: Professional Liability (E&O) Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Professional  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Professional, Hub category, Related  
RELATED: Professional Offices, Cyber, D&O

**46. `/directors-officers-insurance/`**  
VISITOR TITLE: Directors & Officers (D&O) Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty coverage  
SECONDARY: Professional, Community  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Professional, Mobile, Home Professional, Hub category + related, Related  
RELATED: EPL, Non-Profit, Professional Liability  
NOTES: Homepage Professional placement is acceptable; also belongs in Specialty as secondary.

**47. `/cyber-insurance/`**  
VISITOR TITLE: Cyber Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty Risks  
SECONDARY: Professional  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Professional, Mobile, Home Specialty Risks, Hub category, Related  
RELATED: Professional Offices, Professional Liability, Crime / Fidelity  
NOTES: Split placement (mega Professional, homepage Specialty) is coherent, not a defect.

**48. `/landscaping-snow-removal-insurance/`**  
VISITOR TITLE: Landscaping & Snow Removal Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Construction (recommended)  
SECONDARY: Professional (current mega)  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Partial — **misgrouped**  
SURFACES: Mega Professional & Real Estate, Mobile, Related  
RELATED: Contractors, Commercial Auto, Small Business  
NOTES: Trade contractor, not a professional office. Absent from homepage Construction.

**49. `/small-business-insurance/`**  
VISITOR TITLE: Small Business Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Commercial Hub / core package  
KIND: Core product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Commercial Hub cluster, Mobile, Hub “General Liability” category, Related  
RELATED: Hub, Commercial Property, Cyber  
NOTES: Hub uses this page as the General Liability orientation target. Not an industry tab, correctly.

---

### Health & Wellness (4)

**50. `/medical-dental-insurance/`**  
VISITOR TITLE: Medical & Dental Office Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Health & Wellness  
SECONDARY: Professional  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Specialty & Community, Mobile, Home Health & Wellness, Related  
RELATED: Professional Liability, Cyber, Pharmacy  
NOTES: Mega cluster name “Specialty & Community” hides a health industry.

**51. `/pharmacy-insurance/`**  
VISITOR TITLE: Pharmacy Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Health & Wellness  
SECONDARY: Retail  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Specialty & Community, Mobile, Home Health & Wellness, Related (Retail → Pharmacy)  
RELATED: Medical / Dental, Cyber, Retail  
NOTES: Recommend BOTH Health and Retail. Homepage Retail does not include it.

**52. `/fitness-gym-insurance/`**  
VISITOR TITLE: Fitness & Gym Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Health & Wellness  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Health & Wellness, Related  
RELATED: Professional Liability, Event Liability, Small Business

**53. `/salon-barber-insurance/`**  
VISITOR TITLE: Salon & Barber Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Health & Wellness  
SECONDARY: Retail  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega Specialty & Community, Mobile, Related  
RELATED: Fitness / Gym, Retail, Small Business  
NOTES: Missing from homepage Health & Wellness. Clear homepage gap.

---

### Community (4)

**54. `/non-profit-insurance/`**  
VISITOR TITLE: Non-Profit Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Community  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Community, Related  
RELATED: D&O, Event Liability, Religious Organizations

**55. `/religious-organizations-insurance/`**  
VISITOR TITLE: Religious Organization Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Community  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Community, Related  
RELATED: Non-Profit, D&O, Event Liability  
NOTES: Mega label “Religious Organizations”; page title singular “Organization”.

**56. `/daycare-private-school-insurance/`**  
VISITOR TITLE: Daycare & Private School Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Community  
KIND: Industry product  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega, Mobile, Home Community, Related  
RELATED: Non-Profit, Event Liability, EPL  
NOTES: Not Health & Wellness. Childcare / education institution.

**57. `/event-liability-insurance/`**  
VISITOR TITLE: Event Liability Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty coverage  
SECONDARY: Community, Hospitality, Personal (wedding/event teaser)  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Specialty & Community, Mobile, Home Yep / breadth (“Events”, “Wedding / Event”), Related  
RELATED: Liquor Liability, Non-Profit, Restaurant  
NOTES: Not on homepage Community or Specialty tabs. Personal homepage uses it as an event teaser.

---

### Remaining specialty (3)

**58. `/crime-fidelity-insurance/`**  
VISITOR TITLE: Crime & Fidelity Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty Risks  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Yes  
SURFACES: Mega Specialty & Community, Mobile, Home Specialty Risks, Hub category + related, Related  
RELATED: Cyber, Surety Bonds, Retail

**59. `/employment-practices-liability-insurance/`**  
VISITOR TITLE: Employment Practices Liability (EPL)  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Specialty Risks  
SECONDARY: Professional, Community  
KIND: Specialty coverage  
CURRENTLY DISCOVERABLE: Partial  
SURFACES: Mega Specialty & Community, Mobile, Related  
RELATED: D&O, Small Business, Professional Liability  
NOTES: Long mega label. Missing from homepage Specialty Risks. Recommend homepage Specialty or leave mega-only.

**60. `/cannabis-producer-insurance/`**  
VISITOR TITLE: Cannabis Producer Insurance  
PERSONAL / COMMERCIAL: Commercial  
PRIMARY: Manufacturing  
SECONDARY: Specialty Risks; Agriculture / Greenhouse (related only)  
KIND: Industry product  
CURRENTLY DISCOVERABLE: **No**  
SURFACES: Sitemap only (plus its own outbound related)  
RELATED (outbound): Manufacturing, Greenhouse & Agribusiness, Product Recall, Pollution, Business Interruption  
NOTES: **ZERO-DISCOVERY.** Licensed producer is not an ordinary greenhouse and not ordinary manufacturing, but both are valid discovery doors. Do not put this in Agriculture mega as a peer of Farm.

---

## C. Discovery matrix

Legend: Y = present on that surface as a product link. Home = homepage industry-explorer tab (not Yep/filmstrip). Hub = Commercial Hub category, industry tile, or hub related list.

| # | Product | Route | Mega | Mobile | Home cat | Hub | Related in | Other | Status |
|---|---------|-------|:----:|:------:|:--------:|:---:|:----------:|-------|--------|
| 1 | Auto Insurance | `/auto-insurance/` | Y | Y | — | — | Y | Filmstrip, footer | GOOD |
| 2 | Home Insurance | `/home-insurance/` | Y | Y | — | — | Y | Filmstrip, footer | GOOD |
| 3 | Condo Insurance | `/condo-insurance/` | Y | Y | — | — | Y | Filmstrip, footer | GOOD |
| 4 | Tenant Insurance | `/tenant-insurance/` | Y | Y | — | — | Y | Filmstrip, footer | GOOD |
| 5 | Landlord Insurance | `/landlord-insurance/` | Y | Y | — | — | Y | Yep lane | UNDEREXPOSED |
| 6 | Motorcycle Insurance | `/motorcycle-insurance/` | Y | Y | — | — | Y | Filmstrip | GOOD |
| 7 | Boat Insurance | `/boat-insurance/` | Y | Y | — | — | Y | Filmstrip | GOOD |
| 8 | Cottage Insurance | `/cottage-insurance/` | Y | Y | — | — | Y | Filmstrip | GOOD |
| 9 | Travel Insurance | `/travel-insurance/` | Y | Y | — | — | Y | Filmstrip | GOOD |
| 10 | Mobile / Manufactured Home | `/mobile-home-insurance/` | Y | Y | — | — | Y | — | UNDEREXPOSED |
| 11 | Personal Umbrella | `/personal-umbrella-insurance/` | Y | Y | — | — | Y | Yep / breadth | GOOD |
| 12 | Home & Ride Sharing | `/home-sharing-insurance/` | Y | Y | — | — | Y | — | MISCLASSIFIED |
| 13 | Life Insurance | `/life-insurance/` | Y | Y | — | — | Y | — | UNDEREXPOSED |
| 14 | Group Home & Auto | `/group-home-auto-insurance/` | Y | Y | — | — | Y | — | UNDEREXPOSED |
| 15 | Commercial Insurance Hub | `/commercial-insurance/` | Y | Y | — | Hub itself | Y | Footer, header | GOOD |
| 16 | Farm Insurance | `/farm-insurance/` | Y (Ag) | Y | — | — | Y | Yep, footer | GOOD |
| 17 | Greenhouse / Agribusiness | `/greenhouse-agribusiness-insurance/` | Y (Ag) | Y | — | — | Y | Yep / breadth | GOOD |
| 18 | Commercial Auto / Fleet | `/commercial-auto-insurance/` | Y | Y | Transportation | Y | Y | Footer | GOOD |
| 19 | Trucking | `/trucking-insurance/` | Y | Y | Transportation | Y | Y | Yep | GOOD |
| 20 | Dump Truck | `/dump-truck-insurance/` | Y | Y | Transportation | Y | Y | Yep lane | GOOD |
| 21 | Cargo / Freight | `/cargo-freight-insurance/` | Y | Y | Transportation | — | Y | — | GOOD |
| 22 | Garage / Dealership | `/garage-dealership-insurance/` | Y | Y | Retail | — | Y | — | MISCLASSIFIED |
| 23 | Contractors | `/contractors-insurance/` | Y | Y | Construction | Y | Y | Footer, Yep | GOOD |
| 24 | Builders & Developers | `/builders-developers-insurance/` | Y | Y | Construction | Y | Y | Yep lane | GOOD |
| 25 | Builder's Risk | `/builders-risk-insurance/` | Y | Y | Construction | — | Y | — | GOOD |
| 26 | Surety Bonds | `/bonding-insurance/` | Y | Y | Specialty Risks | — | Y | Footer | GOOD + LABEL |
| 27 | Commercial Property | `/commercial-property-insurance/` | Y | Y | Property | Y | Y | — | GOOD |
| 28 | Warehousing | `/warehousing-insurance/` | Y | Y | — | — | Y | Yep / breadth | UNDEREXPOSED |
| 29 | Property Management | `/property-management-insurance/` | Y | Y | Property | — | Y | — | GOOD |
| 30 | Condominium Corporation | `/condominium-corporation-insurance/` | Y | Y | Property | — | Y | — | GOOD + LABEL |
| 31 | Business Interruption | `/business-interruption-insurance/` | Y | Y | — | Y | Y | — | GOOD |
| 32 | Manufacturing | `/manufacturing-insurance/` | Y | Y | Manufacturing | Y | Y | Yep | GOOD |
| 33 | Product Recall | `/product-recall-insurance/` | Y | Y | Manufacturing | Y | Y | — | GOOD |
| 34 | Pollution Liability | `/pollution-liability-insurance/` | Y | Y | Manufacturing | Y | Y | — | GOOD |
| 35 | Restaurants | `/restaurant-insurance/` | Y | Y | Hospitality | Y | Y | Yep | GOOD |
| 36 | Food Truck / Trailer | `/food-truck-insurance/` | Y | Y | Hospitality | Y | Y | — | GOOD + LABEL |
| 37 | Hotel / Motel | `/hotel-motel-insurance/` | Y | Y | Hospitality | — | Y | — | GOOD + LABEL |
| 38 | Liquor Liability | `/liquor-liability-insurance/` | Y | Y | Hospitality | — | Y | — | GOOD |
| 39 | Retail | `/retail-insurance/` | Y | Y | Retail | Y | Y | Yep | GOOD |
| 40 | Convenience / Gas | `/convenience-store-insurance/` | Y | Y | Retail | — | Y | — | GOOD + LABEL |
| 41 | Grocery / Specialty Food / Bakery | `/grocery-specialty-food-insurance/` | Y | Y | — | — | Y | — | UNDEREXPOSED + LABEL |
| 42 | Cannabis Retail | `/cannabis-retail-insurance/` | — | — | — | — | — | Sitemap | **MISSING** |
| 43 | Professional Offices | `/professional-offices-insurance/` | Y | Y | Professional | Y | Y | — | GOOD |
| 44 | Real Estate | `/real-estate-insurance/` | Y | Y | — | Y | Y | Yep lane | UNDEREXPOSED |
| 45 | Professional Liability / E&O | `/professional-liability-insurance/` | Y | Y | Professional | Y | Y | — | GOOD |
| 46 | Directors & Officers | `/directors-officers-insurance/` | Y | Y | Professional | Y | Y | — | GOOD |
| 47 | Cyber | `/cyber-insurance/` | Y | Y | Specialty Risks | Y | Y | — | GOOD |
| 48 | Landscaping & Snow Removal | `/landscaping-snow-removal-insurance/` | Y | Y | — | — | Y | — | MISCLASSIFIED |
| 49 | Small Business | `/small-business-insurance/` | Y | Y | — | Y | Y | — | GOOD |
| 50 | Medical / Dental | `/medical-dental-insurance/` | Y | Y | Health & Wellness | — | Y | — | GOOD |
| 51 | Pharmacy | `/pharmacy-insurance/` | Y | Y | Health & Wellness | — | Y | — | GOOD |
| 52 | Fitness / Gym | `/fitness-gym-insurance/` | Y | Y | Health & Wellness | — | Y | — | GOOD |
| 53 | Salon / Barber | `/salon-barber-insurance/` | Y | Y | — | — | Y | — | UNDEREXPOSED |
| 54 | Non-Profit | `/non-profit-insurance/` | Y | Y | Community | — | Y | — | GOOD |
| 55 | Religious Organizations | `/religious-organizations-insurance/` | Y | Y | Community | — | Y | — | GOOD |
| 56 | Daycare / School | `/daycare-private-school-insurance/` | Y | Y | Community | — | Y | — | GOOD |
| 57 | Event Liability | `/event-liability-insurance/` | Y | Y | — | — | Y | Yep “Events” | UNDEREXPOSED |
| 58 | Crime / Fidelity | `/crime-fidelity-insurance/` | Y | Y | Specialty Risks | Y | Y | — | GOOD |
| 59 | Employment Practices Liability | `/employment-practices-liability-insurance/` | Y | Y | — | — | Y | — | UNDEREXPOSED |
| 60 | Cannabis Producer | `/cannabis-producer-insurance/` | — | — | — | — | — | Sitemap | **MISSING** |

Every one of the 60 routes appears in the matrix.

---

## D. Zero-discovery routes

**ZERO-DISCOVERY ROUTES: 2**

1. `/cannabis-retail-insurance/` — implemented, sitemap-indexed, Explorer-wired, frozen copy/visuals; no header, mobile, homepage, hub, footer, or inbound related-product path.
2. `/cannabis-producer-insurance/` — same.

These are **HIGH priority** for Phase 2 discovery wiring only. Do not reopen frozen page body copy.

No other implemented product route is sitemap-only. Personal specialty routes (Life, Group, Mobile Home, Home Sharing) are in mega-menu and mobile, so they are underexposed, not zero-discovery.

---

## E. Desktop mega-menu audit

**Sources (actual):**

- Header items: `src/data/nav.ts` — Personal, Business, Agriculture, About, Resources
- Personal groups: `src/data/nav-personal.ts`
- Business clusters: `src/data/nav-business.ts`
- Agriculture links: `src/data/nav-agriculture.ts`

### What works

- Personal mega-menu is complete: all 14 personal routes.
- Business mega-menu is nearly complete: 42 of 44 commercial product/hub routes (missing only the two Cannabis routes). Farm and Greenhouse correctly live under Agriculture, not Business.
- Cluster sizes are mostly usable (5–6 links) except Specialty & Community (11).
- Commercial Hub cluster is a good orientation door (hub + property + bonds + small business + BI).

### Categories too large

- **Specialty & Community (11 links)** mixes health industries, community institutions, and true specialty coverages. Usable on desktop width; the heading is the problem more than the count.

### Categories too small

- **Manufacturing & Industry (3)** is tight and can take Cannabis Producer without becoming large.
- **Agriculture (2)** is correct; do not dump Cannabis Producer here as a third peer of Farm.

### Confusing combined headings

- **Hospitality & Retail** is a combined heading. It works as a mega-menu space-saver. It is not a claim that grocery and hotels are the same industry.
- **Construction & Property** mixes trades, project property, warehouses, and condo corporations.
- **Professional & Real Estate** then includes Landscaping and Cyber.
- **Specialty & Community** is the least coherent heading.

### Missing products

- Cannabis Retail
- Cannabis Producer

### Possible overlap (acceptable)

- Cyber in Professional mega vs Specialty homepage
- Liquor in Specialty mega vs Hospitality homepage
- Garage in Transportation mega vs Retail homepage (this one is **not** acceptable)

### Smallest effective structural change

**Do not redesign the mega-menu.** Keep 7 business clusters + Agriculture.

1. Add **Cannabis Retail** to Hospitality & Retail.
2. Add **Cannabis Producer** to Manufacturing & Industry.
3. Optionally add both Cannabis routes as secondary links under Specialty & Community only if that cluster is split or shortened; do not add them there while it still has 11 items.
4. Do not split Hospitality & Retail in Phase 2.
5. Consider moving Landscaping to Construction & Property (small, justified).
6. Standardize labels in place.

---

## F. Mobile audit

**Source:** `src/components/Header.tsx` + `src/components/nav/NavDropdowns.tsx`

Mobile is **not a separate inventory**. It renders:

- `personalNavGroups`
- `businessNavClusters`
- `agricultureNavLinks`

Parity with desktop product universe is complete. Cannabis gaps are identical.

### Structure

- Top-level accordions: Personal, Business, Agriculture, About, Resources
- Business expands into 7 labeled clusters, each with its full desktop link list
- Personal expands into 3 groups

### UX findings

- Business accordion then reveals **42 links** in one panel. That is heavy but currently works because clusters are visually grouped.
- Specialty & Community’s 11 links make the longest mobile list.
- Product tap targets are `py-1.5` / `py-2` at `text-[15px]`. Accordion headers are `py-4` and are fine. Product rows are slightly tight versus a 44px target.
- Nesting is two levels (top accordion → cluster heading → links). Do not add a third level.
- Labels inherit desktop inconsistencies.

### Recommended mobile structure

Keep shared data with desktop. Do not create a shortened mobile-only product list that hides Cannabis or Grocery. If Phase 2 needs relief:

- Keep current two-level accordion
- Increase product row padding to `py-2.5` or `py-3`
- After adding Cannabis, still do not split clusters on mobile
- Do not add a searchable mobile product index before launch

---

## G. Homepage category audit

**Surface:** “Whatever kind of business you run”  
**Source:** `src/data/pilot-home.ts` → `commercialCategories` → `PilotCommercialDiscovery`

Personal homepage discovery is separate: `personalFilmstripItems` (8), Yep / breadth lanes (curated teasers). Those are not the industry explorer.

Homepage industry explorer is **curated**, 3–4 products per tab, 10 tabs. That is the correct capacity. Several tabs are stale relative to the 60-route inventory.

### Transportation

CURRENT PRODUCTS: Trucking, Commercial Auto, Dump Trucks, Cargo & Freight  
MISSING PRODUCTS: Garage / Dealership (currently in Retail)  
WRONG PRODUCTS: none  
OVERLAPPING PRODUCTS: Dump Truck also construction-adjacent  
LABEL ISSUES: “Commercial Auto” vs page “Commercial Auto & Fleet”; “Dump Trucks” vs “Dump Truck”  
RECOMMENDED PRODUCTS: Commercial Auto, Trucking, Dump Truck, Cargo & Freight; add Garage **or** move Garage here and drop none (5 is acceptable). Prefer replacing nothing — add Garage as fifth only if owner wants it on the homepage; otherwise mega-only after correcting Retail.

### Construction

CURRENT: Contractors, Builders & Developers, Builder's Risk  
MISSING: Landscaping (mega-only, misgrouped); Bonding as secondary  
WRONG: none  
OVERLAP: Builder's Risk is specialty/project coverage, correctly shown beside industries  
LABEL: “Builder's Risk” here vs “Builders Risk” in mega  
RECOMMENDED: keep current 3; Bonding stays on Specialty tab; consider Landscaping only if Construction must grow

### Property

CURRENT: Commercial Property, Property Management, Condominium Corporations  
MISSING: Warehousing (Yep only), Business Interruption (specialty)  
WRONG: none  
OVERLAP: Condo corporation vs personal condo  
RECOMMENDED: keep current 3. Warehousing can be a 4th if Property needs a logistics door; BI should stay Specialty / hub.

### Manufacturing

CURRENT: Manufacturing, Product Recall, Pollution Liability  
MISSING: Cannabis Producer  
WRONG: none — Recall and Pollution are specialty coverages, but they are the right manufacturing-adjacent specialties  
OVERLAP: both specialties also belong in Specialty Risks  
LABEL: none material  
RECOMMENDED: Manufacturing, Product Recall, Cannabis Producer. Move Pollution to Specialty homepage or keep as 4th. Do not show all manufacturing-adjacent specialties.

### Hospitality

CURRENT: Restaurants, Food Trucks, Hotels & Motels, Liquor Liability  
MISSING: none that are true hospitality industries (Grocery is overlap, not a miss)  
WRONG: none  
OVERLAP: Liquor is specialty; Grocery if added  
LABEL: Food Trucks / Hotels & Motels vs mega Food Truck / Trailer and Hotel / Motel  
RECOMMENDED: keep these 4. Do not add Retail, Convenience, or Grocery as primary hospitality items.

### Professional

CURRENT: Professional Offices, Directors & Officers, Professional Liability  
MISSING: Real Estate (hub tile, mega item, absent here)  
WRONG: none  
OVERLAP: D&O and E&O are specialties  
LABEL: “Professional Liability” vs “Professional Liability / E&O”  
RECOMMENDED: Professional Offices, Real Estate, Professional Liability. Keep D&O as 4th or move D&O emphasis to Specialty. Do not add Cyber here (already Specialty homepage + mega Professional).

### Retail

CURRENT: Retail, Convenience Stores, Garages & Dealerships  
MISSING: Grocery; Cannabis Retail; Pharmacy as secondary  
WRONG: Garages & Dealerships  
OVERLAP: Pharmacy, Grocery, Cannabis Retail  
LABEL: “Convenience Stores” vs “Convenience Store & Gas Station”; “Garages & Dealerships” vs “Garage & Dealership”  
RECOMMENDED: Retail, Convenience / Gas, Grocery / Specialty Food / Bakery. Add Cannabis Retail as 4th. Remove Garage.

### Health & Wellness

CURRENT: Medical & Dental, Pharmacy, Fitness & Gyms  
MISSING: Salon / Barber  
WRONG: none  
OVERLAP: Pharmacy with Retail  
LABEL: “Fitness & Gyms” vs “Fitness / Gym” vs “Fitness & Gym”  
RECOMMENDED: keep 3 and add Salon as 4th. Do not add Daycare.

### Community

CURRENT: Non-Profits, Religious Organizations, Daycare & Schools  
MISSING: Event Liability as secondary  
WRONG: none  
OVERLAP: Daycare is institutional, not clinical  
LABEL: “Non-Profits” vs “Non-Profit”; “Daycare & Schools” vs “Daycare / School”  
RECOMMENDED: keep these 3. Event stays mega + personal teaser unless Specialty tab wants it.

### Specialty Risks

CURRENT: Cyber, Crime & Fidelity, Bonding  
MISSING: Cannabis (both, as specialty doors); EPL; optionally Product Recall / Pollution if removed from Manufacturing  
WRONG: none  
OVERLAP: almost every specialty already lives elsewhere — this tab must stay a short list  
LABEL: “Bonding” vs visitor title “Surety Bonds”  
RECOMMENDED: Cyber, Crime & Fidelity, Surety Bonds, plus one Cannabis door (Cannabis Retail **or** a single “Cannabis Insurance” pair). Do not dump E&O, D&O, Pollution, Recall, Event, and Liquor here.

### Other homepage discovery (not the industry explorer)

- Personal filmstrip: Auto, Home, Condo, Tenant, Motorcycle, Boat, Cottage, Travel — good curated personal set
- Yep / breadth: mixed personal + commercial teasers; “Events” / “Wedding / Event” → Event Liability; “Personal Valuables” → Personal Umbrella; Greenhouse, Warehouse, Farm, Retail, Trucking, Contractors, Restaurant
- These teasers should remain curated. They are not a second product directory.

---

## H. Hospitality deep dive

Homepage Hospitality and mega “Hospitality & Retail” are **different on purpose**. Forcing them identical would either hide liquor (useful hospitality door) or dump retail storefronts into a hospitality tab.

### HOSPITALITY — SHOULD INCLUDE

- Restaurants — industry
- Food Truck / Trailer — industry
- Hotel / Motel — industry
- Liquor Liability — specialty cross-discovery (homepage yes; mega may stay Specialty)

### HOSPITALITY — SHOULD NOT INCLUDE

- Retail (general merchandise)
- Convenience / Gas
- Pharmacy
- Cannabis Retail as a *primary hospitality* item
- Garage / Dealership

### OVERLAP WITH RETAIL

- **Grocery / Specialty Food / Bakery — BOTH**, Retail primary, Hospitality secondary
- Food trucks are hospitality, not retail
- Hotels are hospitality, not retail
- Convenience is retail, not hospitality
- Cannabis Retail is retail + specialty, not hospitality

### RATIONALE

Hospitality is food-service and lodging. Retail is merchandise storefronts. Grocery is food retail with limited preparation — the page itself already distinguishes grocery from restaurants. A visitor looking for “restaurant / hotel / food truck” should not have to scan retail and gas stations. A visitor looking for a grocery or bakery should find it under Retail first, and may also find it under Hospitality if we later add a secondary homepage slot. The mega-menu heading “Hospitality & Retail” can remain combined as a space-saving cluster without making the two homepage tabs identical.

---

## I. Retail

Evaluate:

| Product | Retail? | Notes |
|---------|---------|-------|
| Retail Insurance | Primary | Ordinary storefronts |
| Convenience / Gas | Primary | Fuel + c-store, not hospitality |
| Grocery / Specialty Food / Bakery | Primary Retail, secondary Hospitality | Food retail, limited prep |
| Pharmacy | Secondary Retail, primary Health | Dispensing + storefront |
| Cannabis Retail | Primary Retail, secondary Specialty | Licensed store, not ordinary retail copy |
| Garage / Dealership | **Not Retail** | Auto service / dealer |
| Salon | Secondary only | Services, not merchandise |

**Grocery belongs: BOTH**, Retail primary.  
**Cannabis Retail belongs: BOTH**, Retail and Specialty Risks.

Do not change yet.

---

## J. Manufacturing

| Product | Class | Manufacturing discovery? |
|---------|-------|--------------------------|
| Manufacturing | Industry product | Primary |
| Cannabis Producer | Industry product (licensed production) | Primary + Specialty |
| Product Recall | Specialty coverage | Secondary / current homepage — keep or move to Specialty |
| Equipment Breakdown | Coverage concept, **no route** | Do not invent a product tile; keep on Commercial Property / producer Explorers |
| Pollution Liability | Specialty coverage | Secondary; also construction, fuel, waste |

Cannabis Producer may legitimately appear under Manufacturing and Specialty Risks. It is not ordinary manufacturing and not ordinary greenhouse/agribusiness. Related-link to Greenhouse is correct; Agriculture mega placement is not.

Recommended homepage Manufacturing: Manufacturing, Product Recall, Cannabis Producer. Pollution can remain as 4th or live only on Specialty + mega.

---

## K. Specialty Risks

Specialty Risks should be a **short visitor door for hard-to-place or cross-industry coverages**, not a dump of every commercial page.

### Recommended Specialty set

**Primary (visitor-facing, keep short):**

- Cyber
- Crime / Fidelity
- Surety Bonds
- Cannabis (Retail and/or Producer as specialty doors)
- Employment Practices Liability (mega; homepage optional)

**Secondary / already housed elsewhere — do not also make them Specialty homepage fixtures:**

- Professional Liability / E&O — Professional
- Directors & Officers — Professional + Community related
- Pollution — Manufacturing + Hub
- Product Recall — Manufacturing
- Liquor Liability — Hospitality
- Event Liability — Community / personal teaser
- Business Interruption — Hub / Property adjacent

**Do not put in Specialty Risks as if they were specialty coverages:**

- Ordinary industries (restaurants, retail, contractors, trucking, medical offices)
- Farm / Greenhouse (Agriculture)
- Small Business (core package)

Cannabis is the one new specialty-industry pair that deserves Specialty Risks **and** an industry home.

---

## L. Transportation

Appropriate discovery:

- Commercial Auto / Fleet — core
- Trucking — industry
- Dump Truck — industry, construction-adjacent
- Cargo / Freight — specialty coverage in this group
- Garage / Dealership — **Transportation**, not Retail

Garage is auto-service and vehicle-dealer operations. Visitors looking for “retail store” will not self-identify as a garage. Visitors looking for commercial auto / dealer / repair will look in Transportation. A new Automotive category is not justified (one product). Keep Garage in the Transportation mega cluster (already correct) and remove it from homepage Retail.

---

## M. Construction

Core construction industry routes:

- Contractors
- Builders & Developers
- Builder's Risk (project property; keep beside the two industries)

Specialty cross-discovery:

- Surety Bonds — Construction secondary, Specialty primary
- Pollution — when environmental contracting
- Landscaping & Snow Removal — trade; should live with Construction, not Professional
- Dump Truck — Transportation primary
- Wrap-Up — **no separate route**; remains Explorer / copy on contractors and builders pages

Do not create a Wrap-Up product page for launch.

---

## N. Property

Industry / audience:

- Commercial Property (core)
- Property Management (audience)
- Condominium Corporation (audience)
- Warehousing (audience / logistics)

Coverage products:

- Business Interruption
- Equipment Breakdown (no route; property endorsement / hub pointer)

There is **no** standalone Commercial Landlord / Property Owner route. Landlord Insurance is personal. Commercial landlord interest is an Explorer state on Commercial Property. Do not invent a 61st route in Phase 2.

Recommended homepage Property: keep the current 3. Add Warehousing only if the owner wants a logistics door on the homepage.

---

## O. Professional

Keep this as **offices, advice professions, and real estate brokerages** — not a specialty dump.

Primary:

- Professional Offices
- Real Estate
- Professional Liability / E&O

Secondary:

- Directors & Officers
- Cyber (mega already; homepage Specialty)

Do not keep Landscaping here. Do not move Medical / Dental into Professional as primary (Health tab exists). Do not move Cannabis here.

---

## P. Health & Wellness

Primary:

- Medical / Dental
- Fitness / Gym
- Salon / Barber
- Pharmacy (primary here)

Pharmacy belongs **BOTH**: Health & Wellness primary, Retail secondary.

Daycare does **not** belong here. It is a community / institutional care setting, not a clinical or wellness business.

---

## Q. Community

Primary:

- Religious Organizations
- Non-Profit
- Daycare & Private School

Secondary:

- Event Liability
- D&O and EPL via related links (already wired)

Sensible overlap: Non-Profit ↔ Religious ↔ Daycare via events, abuse/misconduct, and board coverage. Do not also file Daycare under Health.

---

## R. Personal

All 14 personal routes are in desktop mega-menu and mobile. That must not regress.

| Route | Mega/Mobile | Homepage filmstrip | Yep/breadth | Related | Verdict |
|-------|:-----------:|:------------------:|:-----------:|:-------:|---------|
| Auto | Y | Y | Y | Y | Complete |
| Home | Y | Y | Y | Y | Complete |
| Condo | Y | Y | Y | Y | Complete |
| Tenant | Y | Y | Y | Y | Complete |
| Motorcycle | Y | Y | Y | Y | Complete |
| Boat | Y | Y | Y | Y | Complete |
| Cottage | Y | Y | Y | Y | Complete |
| Travel | Y | Y | Y | Partial | Complete enough |
| Landlord | Y | — | Y | Y | Acceptable specialty |
| Personal Umbrella | Y | — | Y | Y | Acceptable |
| Mobile Home | Y | — | — | Y | Mega-only OK |
| Home Sharing | Y | — | — | Y | Fix group, not exposure |
| Life | Y | — | — | Y | Mega-only OK |
| Group Home & Auto | Y | — | — | Y | Mega-only OK |

Footer Personal column currently includes **Business Insurance** → `/commercial-insurance/`. That is a column-placement defect, not a missing personal route.

Personal filmstrip should stay curated. Do not add all 14 personal products to the homepage.

---

## S. Label inconsistencies

Do not rename route slugs. Standardize visitor-facing labels only.

| ROUTE | CURRENT LABELS | RECOMMENDED CANONICAL VISITOR LABEL | SHORT NAV LABEL | RATIONALE |
|-------|----------------|-------------------------------------|-----------------|-----------|
| `/food-truck-insurance/` | Food Trucks; Food Truck / Trailer; Food Trucks & Trailers; Food Truck & Trailer Insurance | Food Truck & Trailer Insurance | Food Truck / Trailer | Page headline already includes trailers; homepage plural drops trailer |
| `/hotel-motel-insurance/` | Hotels & Motels; Hotel / Motel; Hotel & Motel Insurance | Hotel & Motel Insurance | Hotel / Motel | Same product; three surface spellings |
| `/grocery-specialty-food-insurance/` | Grocery / Food / Bakery; Grocery & Specialty Food; Grocery, Specialty Food & Bakery Insurance | Grocery, Specialty Food & Bakery Insurance | Grocery / Bakery | Mega drops “specialty”; related drops bakery |
| `/bonding-insurance/` | Bonding; Surety Bonds; Bonding Insurance (photo slug) | Surety Bonds | Surety Bonds | Visitor title is Surety Bonds; “Bonding” is broker jargon |
| `/commercial-auto-insurance/` | Commercial Auto; Commercial Auto / Fleet; Commercial Auto & Fleets; Commercial Auto & Fleet Insurance | Commercial Auto & Fleet Insurance | Commercial Auto / Fleet | Fleet is part of the product; keep short nav |
| `/cannabis-producer-insurance/` | Cannabis Producer Insurance (page only) | Cannabis Producer Insurance | Cannabis Producer | No nav label yet; do not add “Insurance” in short nav |
| `/cannabis-retail-insurance/` | Cannabis Retail Insurance (page only) | Cannabis Retail Insurance | Cannabis Retail | Same |
| `/dump-truck-insurance/` | Dump Truck; Dump Trucks | Dump Truck Insurance | Dump Truck | Plural is a homepage-only drift |
| `/builders-risk-insurance/` | Builders Risk; Builder's Risk; Builder's Risk Insurance | Builder's Risk Insurance | Builder's Risk | Apostrophe is the product name |
| `/convenience-store-insurance/` | Convenience / Gas; Convenience Stores; Convenience Store & Gas Station Insurance | Convenience Store & Gas Station Insurance | Convenience / Gas | Fuel is material; “Stores” hides it |
| `/garage-dealership-insurance/` | Garage / Dealership; Garages & Dealerships; Garage & Dealership Insurance | Garage & Dealership Insurance | Garage / Dealership | Homepage pluralizes unnecessarily |
| `/condominium-corporation-insurance/` | Condo Corp; Condominium Corporation; Condominium Corporations | Condominium Corporation Insurance | Condo Corporation | Match page; avoid “Corp” |
| `/fitness-gym-insurance/` | Fitness / Gym; Fitness & Gyms; Fitness & Gym Insurance | Fitness & Gym Insurance | Fitness / Gym | Minor |
| `/home-sharing-insurance/` | Ride / Car / Home Sharing; Home & Ride Sharing Insurance | Home & Ride Sharing Insurance | Home & Ride Sharing | Nav label invents “Car Sharing” |
| `/personal-umbrella-insurance/` | Personal Umbrella; Personal Valuables (breadth) | Personal Umbrella Insurance | Personal Umbrella | “Valuables” is the wrong product |
| `/religious-organizations-insurance/` | Religious Organizations; Religious Organization Insurance | Religious Organization Insurance | Religious Organizations | Plural nav is fine; keep page title |
| `/daycare-private-school-insurance/` | Daycare / School; Daycare & Schools; Daycare & Private School Insurance | Daycare & Private School Insurance | Daycare / School | “Private” is in the page title |
| `/employment-practices-liability-insurance/` | Employment Practices Liability; Employment Practices Liability (EPL) | Employment Practices Liability (EPL) | EPL | Mega is too long for mobile |
| `/professional-liability-insurance/` | Professional Liability; Professional Liability / E&O; Professional Liability (E&O) Insurance | Professional Liability (E&O) Insurance | E&O / Professional Liability | Keep E&O visible |
| `/directors-officers-insurance/` | D&O; Directors & Officers; Directors & Officers (D&O) Insurance | Directors & Officers (D&O) Insurance | D&O | Acceptable short nav |
| `/warehousing-insurance/` | Warehousing; Warehouse; Warehousing & Logistics Insurance | Warehousing & Logistics Insurance | Warehousing | Yep says “Warehouse” |
| `/cargo-freight-insurance/` | Cargo / Freight; Cargo & Freight | Cargo & Freight Insurance | Cargo / Freight | Cosmetic |
| `/non-profit-insurance/` | Non-Profit; Non-Profits | Non-Profit Insurance | Non-Profit | Homepage plural |
| `/product-recall-insurance/` | Product Recall; “Product Liability (Retail)” as related label | Product Recall Insurance | Product Recall | Related label points at Retail and names a different coverage |

---

## T. Dead / wrong links

Checked: business mega-menu, personal mega-menu, agriculture menu, mobile (same hrefs), homepage industry explorer, homepage filmstrip / Yep / breadth, Commercial Hub categories + tiles + related, footer, sitemap static insurance list, related-product hrefs in registries.

### DEAD LINKS

**None** among product-navigation hrefs. Every product href in the surfaces above resolves to an implemented `*-insurance` route or a valid non-product utility route (`/contact/`, `/claims/`, etc.).

### WRONG DESTINATIONS

1. **Hub “Equipment Breakdown” → `/commercial-property-insurance/`** — not dead, but the tile implies a standalone product that does not exist.
2. **Hub “General Liability” → `/small-business-insurance/`** — acceptable orientation, but the label does not match the destination title.
3. **Homepage Retail “Garages & Dealerships” → garage route** — destination exists; category is wrong.
4. **Homepage breadth “Personal Valuables” → `/personal-umbrella-insurance/`** — destination exists; label is wrong.
5. **Footer Personal column “Business Insurance” → `/commercial-insurance/`** — destination exists; column is wrong.
6. **Product Recall related “Product Liability (Retail)” → `/retail-insurance/`** — destination exists; label names a different coverage.

### DUPLICATE ROUTES

None. No two slugs serve the same product.

### LEGACY ROUTES

- `src/data/commercial-clusters.ts` + `CommercialSpotlight.tsx` still define a 5-cluster spotlight (Transportation, Construction, Manufacturing, Hospitality, Professional). **The component is not imported anywhere.** It is unused legacy, not a live discovery surface. Hospitality cluster there is only Restaurants + Food Trucks & Trailers.

### MISSING ROUTES (from navigation, not from the inventory)

- Cannabis Retail
- Cannabis Producer
- Equipment Breakdown as a route (should remain a non-route)
- Wrap-Up as a route (should remain a non-route)
- Commercial Landlord as a route (should remain a non-route)

### ANCHOR / SLUG MISMATCHES

- Route slug `bonding-insurance` vs visitor “Surety Bonds”
- Route slug `grocery-specialty-food-insurance` vs labels that drop bakery or specialty
- Route slug `home-sharing-insurance` vs nav “Ride / Car / Home Sharing”
- Route slug `condo-insurance` (personal unit) vs `condominium-corporation-insurance` (commercial master) — **correct distinction**, not a mismatch. Keep both labels explicit.

---

## U. Related-product graph

Related links are generally conservative and useful. They do not need to become a complete graph.

### Isolated products

- **Cannabis Retail** and **Cannabis Producer** have outbound links only. No other product points at them. True isolation.
- **Greenhouse** only links Farm + Hub. Missing Producer (and optionally Manufacturing).
- **Warehousing** only links Commercial Property + Cargo. Thin but not isolated.
- **Travel** and **Life** / **Group** mix in Contact links. Fine as conversion, weak as product graph.

### Nonsensical or misleading recommendations

- Product Recall → “Product Liability (Retail)” to `/retail-insurance/`
- Homepage/auto “Personal Valuables” → umbrella (label, not the related graph)
- Real Estate → personal Landlord is actually a good cross, not nonsense

### Excessive self-similar loops

- Transportation trio (Auto ↔ Trucking ↔ Dump) is tight and correct
- Restaurant ↔ Food Truck ↔ Liquor ↔ Hotel is tight and correct
- Non-Profit ↔ Religious ↔ Daycare ↔ Event is tight and correct
- Personal property cluster (Home / Condo / Tenant / Landlord / Cottage) is loopy but expected

No loop is harmful enough to require a rewrite before launch.

### Missing high-value relationships

| From | Add (recommended) | Why |
|------|-------------------|-----|
| Retail | Cannabis Retail | Licensed store is the closest sibling |
| Manufacturing | Cannabis Producer | Production sibling |
| Greenhouse | Cannabis Producer | Indoor growing relationship; keep copy distinction |
| Grocery | Restaurant **already**; add Liquor only if they serve; add Cannabis Retail? **No** | Grocery related is fine; optional Hospitality inbound |
| Convenience | Cannabis Retail? **No** | Different licence / risk |
| Pharmacy | Cannabis Retail? **No** as default | Different regulator story |
| Specialty hub related | one Cannabis door | Hub specialty list is the natural 7th item |
| Landscaping | already Contractors / Auto — OK | |
| Salon | already Fitness / Retail — OK; inbound from Health homepage is the real gap | |

### Cannabis related-link placement (current, do not rewrite body copy)

- Retail page outbound: Retail, Commercial Property, Crime, Product Recall, BI — **sound**
- Producer page outbound: Manufacturing, Greenhouse, Product Recall, Pollution, BI — **sound**
- Missing piece is **inbound** from those destinations

### Outdated labels in related links

- “Product Liability (Retail)”
- Occasional “Insurance” suffix stripped at render by `relatedLinksToProducts` (labels lose “Insurance” automatically)

**Recommendation:** reconcile inbound Cannabis links and the Product Recall → Retail label before launch. Do not rebuild the whole graph. Do not rewrite frozen Cannabis page body copy; adding inbound links on other pages does not edit Cannabis copy.

---

## V. Cannabis placement

Routes are FINAL:

- `/cannabis-retail-insurance/`
- `/cannabis-producer-insurance/`

Products may appear in more than one discovery category.

### Cannabis Retail — recommended placement

| Surface | Recommendation |
|---------|----------------|
| Retail | **Yes — primary** |
| Specialty Risks | **Yes — secondary** |
| Commercial Hub | Add as industry tile **or** specialty related item, not both if hub must stay small. Prefer **specialty related + not a 13th industry tile**, unless owner wants a tile. |
| Mega-menu | Hospitality & Retail cluster |
| Mobile | Same cluster (shared data) |
| Homepage | Retail tab, 4th item |

Do not place Cannabis Retail in Hospitality as primary.

### Cannabis Producer — recommended placement

| Surface | Recommendation |
|---------|----------------|
| Manufacturing | **Yes — primary** |
| Specialty Risks | **Yes — secondary** |
| Greenhouse / Agribusiness relationship | **Related links only** (Producer already outbound; add inbound from Greenhouse). Not an Agriculture mega peer of Farm. |
| Commercial Hub | Same rule as Retail: specialty related, or one shared “Cannabis” hub mention, not a new hub category |
| Mega-menu | Manufacturing & Industry cluster |
| Mobile | Same |
| Homepage | Manufacturing tab |

---

## W. Commercial Hub

The hub is correctly an orientation page (`layout: "commercial-hub"`):

- **10 coverage categories** from `commercialHubCategories`
- **12 industry tiles** from `commercialIndustryTiles`
- **6 specialty related links** on the hub page

It must not become a 46-link directory.

### Do the current sets still represent the complete inventory?

**Categories (10):** still a valid core-coverage map, with two caveats:

1. Equipment Breakdown is not a route.
2. Cannabis is not represented as a coverage category — and should not become one. Cannabis is an industry/specialty pair, not an 11th coverage line.

**Industry tiles (12):** still a good curated set of major Windsor–Essex industries. Missing Cannabis is the only launch-blocking omission if the owner wants hub-level Cannabis. Hotel, Grocery, Medical, Farm, and Warehouse are also absent; that is acceptable curation.

**Specialty related (6):** Small Business, Manufacturing, Product Recall, Pollution, Crime, D&O. Cyber is already a category, so omitting it here is fine. Bonding is missing here but present in the mega Hub cluster. Cannabis is missing.

### Where Cannabis belongs on the hub

Minimal addition: **one specialty related card** (or two if the related rail can hold 7–8). Do not add a 13th industry tile unless the owner wants Cannabis as a featured regional industry. Do not add a hub coverage category named Cannabis.

Unused legacy: `CommercialSpotlight` / `commercialClusters` (5 clusters) is not rendered. Ignore it in Phase 2 or delete later as cleanup.

---

## X. Proposed canonical taxonomy

Principles: visitor-friendly, logical, complete, not overwhelming, expandable. Multi-category discovery is allowed. Homepage stays curated. Mega-menu may be longer than homepage. Hub stays curated.

### Transportation

CATEGORY: Transportation  
PRIMARY PRODUCTS: Commercial Auto / Fleet, Trucking, Dump Truck, Cargo / Freight, Garage / Dealership  
SECONDARY / CROSS: Dump Truck → Construction; Cargo → Warehousing  
MAX RECOMMENDED HOMEPAGE ITEMS: 4 (current set; Garage mega-only unless owner wants 5)  
MEGA-MENU ITEMS: the 5 current Transportation & Fleet links  
MOBILE ITEMS: same 5  
COMMERCIAL HUB: keep Commercial Auto + Trucking + Dump Truck tiles; Cargo remains linked from those pages

### Construction

CATEGORY: Construction  
PRIMARY: Contractors, Builders & Developers, Builder's Risk  
SECONDARY: Surety Bonds, Landscaping & Snow Removal, Pollution  
MAX HOMEPAGE: 3  
MEGA: current Construction & Property construction trio + Landscaping if moved  
MOBILE: same  
HUB: keep Contractors + Builders & Developers tiles

### Property

CATEGORY: Property  
PRIMARY: Commercial Property, Property Management, Condominium Corporation  
SECONDARY: Warehousing, Business Interruption  
MAX HOMEPAGE: 3 (optional 4th: Warehousing)  
MEGA: keep warehousing + property-management + condo corp in Construction & Property  
MOBILE: same  
HUB: Commercial Property tile + BI and Property categories

### Manufacturing

CATEGORY: Manufacturing  
PRIMARY: Manufacturing, Cannabis Producer  
SECONDARY: Product Recall, Pollution  
MAX HOMEPAGE: 3–4 (Manufacturing, Product Recall, Cannabis Producer; Pollution optional)  
MEGA: Manufacturing, Pollution, Product Recall, **Cannabis Producer**  
MOBILE: same  
HUB: Manufacturing tile; Producer via specialty related

### Hospitality

CATEGORY: Hospitality  
PRIMARY: Restaurants, Food Truck / Trailer, Hotel / Motel  
SECONDARY: Liquor Liability, Grocery (secondary only)  
MAX HOMEPAGE: 4 (current, including Liquor)  
MEGA: remain inside Hospitality & Retail: Restaurants, Food Truck / Trailer, Hotel / Motel  
MOBILE: same  
HUB: Restaurants + Food Trucks tiles

### Retail

CATEGORY: Retail  
PRIMARY: Retail, Convenience / Gas, Grocery / Specialty Food / Bakery, Cannabis Retail  
SECONDARY: Pharmacy, Salon (light)  
MAX HOMEPAGE: 4 (Retail, Convenience / Gas, Grocery, Cannabis Retail)  
MEGA: Retail, Convenience / Gas, Grocery, **Cannabis Retail** (plus hospitality siblings in the same cluster)  
MOBILE: same  
HUB: Retail tile; Cannabis via specialty related

### Professional

CATEGORY: Professional  
PRIMARY: Professional Offices, Real Estate, Professional Liability / E&O  
SECONDARY: D&O, Cyber  
MAX HOMEPAGE: 3–4 (add Real Estate; D&O optional 4th)  
MEGA: keep current Professional cluster minus Landscaping if moved  
MOBILE: same  
HUB: Professional Offices + Real Estate tiles; E&O + D&O + Cyber as categories

### Health & Wellness

CATEGORY: Health & Wellness  
PRIMARY: Medical / Dental, Pharmacy, Fitness / Gym, Salon / Barber  
SECONDARY: Pharmacy also Retail  
MAX HOMEPAGE: 4 (add Salon)  
MEGA: remain in Specialty & Community until/unless that cluster is split post-launch  
MOBILE: same  
HUB: no dedicated health tile today — acceptable

### Community

CATEGORY: Community  
PRIMARY: Non-Profit, Religious Organizations, Daycare / Private School  
SECONDARY: Event Liability, D&O, EPL  
MAX HOMEPAGE: 3  
MEGA: current community trio inside Specialty & Community  
MOBILE: same  
HUB: no community tile — acceptable

### Specialty Risks

CATEGORY: Specialty Risks  
PRIMARY: Cyber, Crime / Fidelity, Surety Bonds, Cannabis Retail, Cannabis Producer, EPL  
SECONDARY: Pollution, Product Recall, Liquor, Event, BI, D&O, E&O  
MAX HOMEPAGE: 3–4 (Cyber, Crime, Surety Bonds, plus one Cannabis entry)  
MEGA: keep specialty coverages in Specialty & Community; do not move industries out in Phase 2  
MOBILE: same  
HUB: existing specialty categories + add Cannabis to the 6-link specialty rail

### Agriculture (header, not a homepage industry tab)

CATEGORY: Agriculture  
PRIMARY: Farm, Greenhouse / Agribusiness  
SECONDARY: Cannabis Producer via Greenhouse related only  
MAX HOMEPAGE: 0 in the industry explorer; Yep teaser may remain  
MEGA / MOBILE: current 2 links  
HUB: not required

### Personal (header)

CATEGORY: Personal — Auto / Mobility, Property, Specialty  
PRIMARY: all 14 personal routes in mega/mobile  
SECONDARY: Event Liability as personal teaser only  
MAX HOMEPAGE FILMSTRIP: 8 (current)  
MEGA / MOBILE: current complete set  
HUB: n/a

### Combined mega-menu heading recommendation

Keep **Hospitality & Retail** as one mega cluster. Homepage tabs stay split. This is the smallest effective change.

---

## Y. Future expansion architecture

We will add products after launch. The current drift happened because discovery lives in at least seven uncoordinated sources:

1. `src/app/*-insurance/page.tsx` (route existence)
2. `pilot-commercial-registry.ts` / `pilot-personal-registry.ts` / inline configs
3. `nav-business.ts` / `nav-personal.ts` / `nav-agriculture.ts`
4. `pilot-home.ts` (`commercialCategories`, filmstrip, Yep)
5. `commercial-industries.ts` (hub categories + tiles)
6. Related maps (`industryRelatedLinks` + per-page `relatedLinks`)
7. `sitemap.ts` static list

**Recommendation: yes, consolidate metadata after launch.**

A single canonical product record should own:

- route / slug
- visitor title
- short nav label
- personal vs commercial
- kind: hub / industry / specialty / core
- primary category
- secondary categories
- homepage discovery (include? tab? rank?)
- mega-menu cluster + include flag
- mobile (inherit mega unless overridden)
- Commercial Hub (category / tile / specialty rail / none)
- related product slugs
- sitemap include (default true)

Phase 2 should **not** refactor architecture. Phase 2 should edit the existing lists carefully. A post-launch `product-taxonomy.ts` (or equivalent) that the nav, homepage, hub, and sitemap read from would prevent the next 10-product expansion from requiring another manual reconciliation.

Until that exists, any new product checklist:

1. Add route + registry + sitemap  
2. Add mega/mobile cluster link  
3. Decide homepage include (default no)  
4. Decide hub tile vs specialty vs none (default none)  
5. Wire inbound + outbound related  
6. Record labels once (canonical + short)

---

## Z. Phase 2 implementation plan

### A. Factual / route defects

- No missing implemented routes.  
- Do not create Equipment Breakdown, Wrap-Up, or Commercial Landlord routes for launch.  
- Document hub Equipment Breakdown as a pointer, or relabel the hub tile.  
**REQUIRED BEFORE LAUNCH:** none (no broken routes).  
**RECOMMENDED BEFORE LAUNCH:** relabel or annotate Equipment Breakdown hub tile so it does not look like a missing page.  
**POST-LAUNCH:** delete unused `CommercialSpotlight` / `commercialClusters` if still unreferenced.

### B. Dead-link fixes

- No dead product hrefs.  
- Fix wrong-destination labels (Equipment Breakdown, General Liability naming, Personal Valuables, footer Business-in-Personal, Product Liability (Retail)).  
**REQUIRED BEFORE LAUNCH:** none for 404s.  
**RECOMMENDED BEFORE LAUNCH:** the five wrong-destination labels above.  
**POST-LAUNCH:** footer could gain Cannabis only if footer stays curated and the owner wants it; default is no.

### C. Canonical labels

- Apply the table in section S to nav, homepage, hub tiles, and related labels.  
- Do not rename slugs.  
- Do not rewrite frozen Cannabis body copy; only add short nav labels.  
**RECOMMENDED BEFORE LAUNCH:** Food Truck, Hotel / Motel, Grocery, Surety Bonds, Commercial Auto / Fleet, Dump Truck, Convenience / Gas, Garage, Condo Corporation, Home & Ride Sharing, Personal Umbrella, EPL.  
**POST-LAUNCH:** remaining cosmetic plurals.

### D. Homepage discovery

- Retail: remove Garage; add Grocery; add Cannabis Retail.  
- Manufacturing: add Cannabis Producer.  
- Health: add Salon.  
- Professional: add Real Estate.  
- Hospitality: keep current 4.  
- Specialty: add one Cannabis door; consider renaming Bonding → Surety Bonds.  
- Transportation: do not keep Garage in Retail; optional add to Transportation.  
**REQUIRED BEFORE LAUNCH:** Cannabis on Retail + Manufacturing tabs; Grocery on Retail; Garage out of Retail.  
**RECOMMENDED BEFORE LAUNCH:** Salon, Real Estate.  
**POST-LAUNCH:** Warehousing on Property; EPL on Specialty; Event on Community.

### E. Mega-menu

- Add Cannabis Retail to Hospitality & Retail.  
- Add Cannabis Producer to Manufacturing & Industry.  
- Optional: move Landscaping to Construction & Property.  
- Do not split Hospitality & Retail.  
- Do not add a Cannabis-only cluster.  
**REQUIRED BEFORE LAUNCH:** the two Cannabis mega links.  
**RECOMMENDED BEFORE LAUNCH:** Landscaping move + label pass.  
**POST-LAUNCH:** split Specialty & Community into Health / Community / Specialty if the cluster grows again.

### F. Mobile navigation

- Inherit mega data (already).  
- Same Cannabis additions.  
- Increase product row tap padding if touching the component.  
**REQUIRED BEFORE LAUNCH:** Cannabis links via shared data.  
**RECOMMENDED BEFORE LAUNCH:** tap-target padding.  
**POST-LAUNCH:** mobile search or a shorter featured list.

### G. Commercial Hub

- Keep 10 categories and 12 tiles as the default.  
- Add Cannabis to the specialty related rail (1 or 2 cards).  
- Relabel Equipment Breakdown destination or helper text.  
**REQUIRED BEFORE LAUNCH:** at least one Cannabis hub discovery action (specialty rail is enough).  
**RECOMMENDED BEFORE LAUNCH:** Equipment Breakdown clarity.  
**POST-LAUNCH:** optional Cannabis industry tile if regional demand warrants.

### H. Related-product wiring

- Inbound: Retail → Cannabis Retail; Manufacturing → Cannabis Producer; Greenhouse → Cannabis Producer.  
- Fix Product Recall → Retail label.  
- Do not rewrite Cannabis page related lists unless a factual error appears (current outbound lists are sound).  
**REQUIRED BEFORE LAUNCH:** the three inbound Cannabis links.  
**RECOMMENDED BEFORE LAUNCH:** Product Recall label.  
**POST-LAUNCH:** thicken Greenhouse and Warehousing graphs.

### I. Cannabis discovery

- Implement placements in section V.  
- Do not edit frozen Cannabis content or images.  
**REQUIRED BEFORE LAUNCH:** mega, mobile (shared), homepage Retail + Manufacturing, inbound related, hub specialty rail.  
**RECOMMENDED BEFORE LAUNCH:** homepage Specialty Cannabis door.  
**POST-LAUNCH:** Agriculture-adjacent copy/cross-links beyond Greenhouse related.

### J. Future taxonomy architecture

- Design-only in Phase 2 if time; implement a single metadata module post-launch.  
**POST-LAUNCH IMPROVEMENT:** canonical `product-taxonomy` source.  
**NOT BEFORE LAUNCH** unless it can be added as a new module that existing lists read without a risky rewrite.

---

## AA. Owner decisions A–O

These are **proposed answers** for owner approval. Phase 2 should not start until they are confirmed or amended.

**A. Keep or change “Hospitality & Retail” mega-menu grouping?**  
**Proposed: KEEP combined.** Homepage tabs stay split. Smallest effective change. Split only if the cluster exceeds ~8 links after Cannabis.

**B. Grocery: Hospitality / Retail / Both?**  
**Proposed: BOTH.** Retail primary, Hospitality secondary (mega cluster already combined; homepage Retail yes, homepage Hospitality no for launch).

**C. Pharmacy: Health & Wellness / Retail / Both?**  
**Proposed: BOTH.** Health primary (homepage + mega). Retail secondary (related already; homepage Retail no for launch).

**D. Cannabis Retail: Retail / Specialty / Both?**  
**Proposed: BOTH.** Retail primary, Specialty secondary.

**E. Cannabis Producer: Manufacturing / Specialty / Both?**  
**Proposed: BOTH.** Manufacturing primary, Specialty secondary. Greenhouse via related only.

**F. Garage / Dealership: Transportation / Retail / Other?**  
**Proposed: Transportation.** Do not create Automotive. Remove from homepage Retail.

**G. Daycare: Community / Health & Wellness / Other?**  
**Proposed: Community.** Not Health & Wellness.

**H. Should homepage categories show only curated products or all products in that category?**  
**Proposed: curated only.** Target 3–4 items per tab. Mega-menu carries the rest.

**I. Should mega-menu expose more products than homepage?**  
**Proposed: YES.**

**J. Should Commercial Hub remain curated rather than exhaustive?**  
**Proposed: YES.**

**K. Should overlapping products appear in multiple categories?**  
**Proposed: YES**, when visitor intent is genuinely dual (Grocery, Pharmacy, Cannabis, Liquor, Pollution, Recall).

**L. Should canonical navigation labels be standardized now?**  
**Proposed: YES**, at least the high-drift set in section S marked recommended-before-launch.

**M. Should related-product links be reconciled now?**  
**Proposed: YES for inbound Cannabis + the one misleading Product Recall label.** No full-graph rewrite.

**N. Should future taxonomy metadata be centralized?**  
**Proposed: YES, after launch.** Do not refactor during Phase 2.

**O. Is the proposed taxonomy approved for Phase 2 implementation?**  
**Proposed: pending owner.** The taxonomy in section X is the recommended Phase 2 spec. Implementation should not begin until A–N are accepted or amended.

---

## Source index (for Phase 2 implementers)

| Surface | File |
|---------|------|
| Route files | `src/app/*-insurance/page.tsx` (60) |
| Commercial registry | `src/data/pilot-commercial-registry.ts` |
| Personal registry | `src/data/pilot-personal-registry.ts` |
| Auto page / related | `src/app/auto-insurance/page.tsx`, `src/data/pilot-auto.ts` |
| Desktop + mobile business nav | `src/data/nav-business.ts` |
| Desktop + mobile personal nav | `src/data/nav-personal.ts` |
| Agriculture nav | `src/data/nav-agriculture.ts` |
| Header wiring | `src/data/nav.ts`, `src/components/Header.tsx` |
| Homepage industry explorer | `src/data/pilot-home.ts` → `commercialCategories` |
| Homepage personal filmstrip / Yep | `src/data/pilot-home.ts` |
| Hub categories + tiles | `src/data/commercial-industries.ts` |
| Hub specialty related | `src/data/pilot-commercial-inline.ts` (`commercial-insurance`) |
| Industry related map | `src/lib/buildPilotProductConfig.ts` → `industryRelatedLinks` |
| Product-page related | `src/data/product-pages/*.ts` |
| Footer | `src/components/Footer.tsx` |
| Sitemap | `src/app/sitemap.ts` |
| Unused cluster spotlight | `src/data/commercial-clusters.ts`, `src/components/CommercialSpotlight.tsx` |

There is no product search index.

---

## Close

This phase stops for owner review.

**Do not merge. Do not deploy. Do not promote any Vercel preview to production. Do not push to main. Do not modify production aliases.**
