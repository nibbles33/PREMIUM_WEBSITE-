# Batch A — Photography Requirements List

**Status:** Requirements only. Existing photography files were **not** overwritten.  
**Date:** Batch A implementation branch.

All ten pages currently use **temporary placeholders** (`isTemporary: true` in `src/data/photography/placements.ts`) that reuse existing commercial WebPs.

| Page / route | Required dedicated shot | Intended placement | Current temporary placeholder |
|---|---|---|---|
| Roofing Contractors `/roofing-contractors-insurance/` | Roofing crew on a steep or flat commercial/residential roof (Windsor-Essex or Ontario context); height/safety gear visible; no logos of competitors | Product hero | `contractors-insurance.webp` |
| Electrical Contractors `/electrical-contractors-insurance/` | Electrician at a panel or jobsite with conduit/tools; live-work safety context preferred | Product hero | `contractors-insurance.webp` |
| Plumbing & HVAC `/plumbing-hvac-insurance/` | Plumber or HVAC tech with mechanical equipment / service van staging | Product hero | `contractors-insurance.webp` |
| Excavation / Concrete / Sewer-Watermain `/excavation-contractors-insurance/` | Excavator or concrete crew on an earthwork/underground site (not solely a dump truck) | Product hero | `dump-truck-insurance.webp` |
| Commercial Landlord `/commercial-landlord-insurance/` | Exterior of a commercial rental building (retail/office/industrial bays) | Product hero | `commercial-property-insurance.webp` |
| Apartment Building `/apartment-building-insurance/` | Multi-unit apartment building exterior (walk-up or mid-rise) | Product hero | `property-management-insurance.webp` |
| Mixed-Use Property `/mixed-use-property-insurance/` | Street-level retail/office with residential above (true mixed-use façade) | Product hero | `retail-insurance.webp` |
| Tow Truck Operators `/tow-truck-insurance/` | Tow truck performing or staged for recovery (wrecker/boom visible); storage yard optional secondary | Product hero | `commercial-auto-insurance.webp` |
| Commercial Umbrella `/commercial-umbrella-insurance/` | Optional — abstract/professional office or leadership still; lowest priority | Product hero (optional) | `professional-offices-insurance.webp` |
| Equipment Breakdown `/equipment-breakdown-insurance/` | Mechanical room, boiler plant, or industrial electrical/mechanical equipment (not a generic office) | Product hero | `manufacturing-insurance.webp` |

## Notes

- Register new files under `public/images/photography/commercial/<slug>.webp` and update `placements.ts` (`src`, `alt`, clear `isTemporary` / `temporaryNote`, set `confidence: "HIGH"` when approved).
- Do **not** replace or overwrite the placeholder source files listed above.
- Coverage Explorer interactive masters were reused where noted in the implementation summary; dedicated explorer art is out of scope for Batch A photography.
