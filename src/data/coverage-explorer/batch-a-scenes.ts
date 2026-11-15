import type {
  CoverageSvgZoneConfig,
  CoverageVisualFamily,
} from "@/types/coverage-explorer";

/**
 * Batch A Coverage Explorer scenes.
 * Coordinates are percentages of the supplied 1448×1086 illustrations
 * (viewBox 0 0 100 100), measured on a 10% grid over each file.
 * Zone labels name visible objects. They are not coverage promises.
 * A coverage id with an empty zone list has no depicted object, so the
 * tab stays text-only.
 */
export const BATCH_A_EXPLORER_DIMENSIONS = {
  width: 1448,
  height: 1086,
} as const;

export type BatchAExplorerScene = {
  src: string;
  visualFamily: CoverageVisualFamily;
  zones: CoverageSvgZoneConfig[];
  coverageZones: Record<string, string[]>;
  sceneNote?: string;
};

function zone(
  id: string,
  points: string,
  style: NonNullable<CoverageSvgZoneConfig["style"]>,
  label: string,
): CoverageSvgZoneConfig {
  return { id, path: `M ${points} Z`, style, label };
}

function explorerSrc(filename: string): string {
  return `/images/photography/batch-a/explorers/${filename}`;
}

export const BATCH_A_EXPLORER_SCENES: Record<string, BatchAExplorerScene> = {
  "roofing-contractors-insurance": {
    src: explorerSrc("roofing-contractors-insurance-explorer.png"),
    visualFamily: "construction",
    zones: [
      zone("roof-crew", "36,14 60,12 64,22 54,32 44,34 38,26 34,18", "glow", "Roof crew"),
      zone("fall-anchors", "40,12 62,11 60,23 42,23", "outline", "Roof anchors"),
      zone("flat-roof-rails", "62,27 80,25 82,42 64,41", "outline", "Flat-roof guardrail"),
      zone("ladder", "49,37 58,36 57,66 50,66", "outline", "Ladder"),
      zone("scaffold", "13,38 28,36 30,58 12,60", "outline", "Scaffold"),
      zone("material-pallets", "16,57 42,55 44,79 17,80", "fill", "Material pallets"),
      zone("site-tools", "42,58 83,56 84,74 43,75", "glow", "Saws, generator, and tool chest"),
    ],
    coverageZones: {
      "roofing-operations-liability": ["roof-crew"],
      "hot-work-height-controls": ["fall-anchors", "flat-roof-rails", "ladder", "scaffold"],
      "tools-staging-equipment": ["material-pallets", "site-tools"],
      "certificates-contract-compliance": [],
    },
  },
  "electrical-contractors-insurance": {
    src: explorerSrc("electrical-contractors-insurance-explorer.png"),
    visualFamily: "construction",
    zones: [
      zone("panel-work", "63,28 79,27 80,51 64,52", "glow", "Electrician at panel"),
      zone("conduit-runs", "48,8 86,10 84,27 50,24", "outline", "Conduit and cable runs"),
      zone("test-tools", "51,47 71,46 73,70 52,71", "glow", "Meters and tool cart"),
      zone("cable-reels", "17,41 31,40 32,63 17,64", "fill", "Cable reels"),
      zone("drawings", "35,47 53,46 54,67 36,68", "outline", "Laptop and drawings"),
      zone("power-dist", "75,47 89,46 90,62 76,63", "fill", "Portable power distribution"),
      zone("scissor-lift", "38,30 52,28 54,50 36,52", "outline", "Scissor lift"),
    ],
    coverageZones: {
      "electrical-operations-liability": ["panel-work", "conduit-runs"],
      "tools-test-equipment": ["test-tools", "cable-reels", "power-dist", "scissor-lift"],
      "design-assist-eo": ["drawings"],
      "certificates-additional-insured": [],
    },
  },
  "plumbing-hvac-insurance": {
    src: explorerSrc("plumbing-hvac-insurance-explorer.png"),
    visualFamily: "construction",
    zones: [
      zone("water-piping", "8,16 28,18 30,66 8,68", "glow", "Water heater and piping"),
      zone("fuel-boiler", "28,30 44,28 46,58 30,60", "fill", "Boiler"),
      zone("air-handler", "42,10 76,12 74,48 44,50", "outline", "Air handler and ducts"),
      zone("hand-tools", "42,56 74,54 76,78 44,78", "glow", "Threading machine and copper"),
      zone("tool-chest", "68,48 86,46 88,64 70,66", "fill", "Tool chest"),
      zone("parts-shelf", "78,28 93,26 94,58 80,60", "outline", "Parts shelf"),
    ],
    coverageZones: {
      "plumbing-hvac-liability": ["water-piping"],
      "refrigerant-fuel-gas": ["fuel-boiler", "air-handler"],
      "tools-machines-stock": ["hand-tools", "tool-chest", "parts-shelf"],
      "certificates-wrap-participation": [],
    },
  },
  "excavation-contractors-insurance": {
    src: explorerSrc("excavation-contractors-insurance-explorer.png"),
    visualFamily: "construction",
    zones: [
      zone("excavator", "12,16 34,18 36,50 14,52", "glow", "Excavator"),
      zone("haul-truck", "32,16 52,14 54,36 34,38", "outline", "Haul truck"),
      zone("shored-trench", "28,42 56,44 54,70 26,72", "outline", "Shored trench and pipe"),
      zone("concrete-pad", "58,28 84,26 86,46 60,48", "glow", "Concrete crew"),
      zone("compactor", "54,52 66,50 68,62 54,64", "fill", "Plate compactor"),
    ],
    coverageZones: {
      "excavation-operations-liability": ["excavator", "concrete-pad"],
      "underground-utility-controls": ["shored-trench"],
      "heavy-equipment-inland-marine": ["excavator", "haul-truck", "compactor"],
      "certificates-municipal-bonds": [],
    },
  },
  "commercial-landlord-insurance": {
    src: explorerSrc("commercial-landlord-insurance-explorer.png"),
    visualFamily: "commercial-building",
    zones: [
      zone("building-shell", "16,16 86,14 88,52 18,54", "outline", "Commercial building"),
      zone("sidewalk", "18,48 68,46 70,58 20,60", "pulse", "Sidewalk"),
      zone("patio", "70,40 88,38 90,54 72,56", "pulse", "Patio seating"),
      zone("parking", "16,54 86,52 88,76 14,78", "outline", "Parking lot"),
      zone("tenant-left", "18,28 46,26 48,50 20,52", "glow", "Left tenant space"),
      zone("tenant-right", "62,28 84,26 86,48 64,50", "glow", "Right tenant space"),
      zone("hvac-left", "24,14 40,12 42,24 26,26", "fill", "Left rooftop HVAC"),
      zone("hvac-right", "52,12 70,10 72,22 54,24", "fill", "Right rooftop HVAC"),
    ],
    coverageZones: {
      "building-coverage": ["building-shell"],
      "general-liability": ["sidewalk", "patio", "parking"],
      "loss-of-rents": ["tenant-left", "tenant-right"],
      "equipment-breakdown": ["hvac-left", "hvac-right"],
    },
  },
  "apartment-building-insurance": {
    src: explorerSrc("apartment-building-insurance-explorer.png"),
    visualFamily: "commercial-building",
    zones: [
      zone("building-shell", "20,16 80,14 82,58 22,60", "outline", "Apartment building"),
      zone("entry-walk", "42,52 70,50 74,68 40,70", "pulse", "Entrance walk"),
      zone("parking", "12,58 48,56 50,80 10,82", "outline", "Parking lot"),
      zone("residential-floors", "24,28 76,26 78,52 26,54", "glow", "Residential floors"),
      zone("rooftop-hvac", "36,10 58,8 60,22 38,24", "fill", "Rooftop HVAC"),
      zone("ground-condensers", "74,50 88,48 90,60 76,62", "fill", "Ground condensers"),
    ],
    coverageZones: {
      "building-coverage": ["building-shell"],
      "general-liability": ["entry-walk", "parking"],
      "loss-of-rents": ["residential-floors"],
      "equipment-breakdown": ["rooftop-hvac", "ground-condensers"],
    },
  },
  "mixed-use-property-insurance": {
    src: explorerSrc("mixed-use-property-insurance-explorer.png"),
    visualFamily: "commercial-building",
    zones: [
      zone("building-shell", "16,14 82,12 84,66 18,68", "outline", "Mixed-use building"),
      zone("sidewalk-cafe", "14,58 70,56 72,74 12,76", "pulse", "Sidewalk and cafe"),
      zone("upper-floors", "18,18 80,16 82,50 20,52", "glow", "Upper residential floors"),
      zone("retail-floor", "18,50 76,48 78,66 20,68", "glow", "Ground-floor retail"),
      zone("rooftop-hvac", "28,6 56,4 58,18 30,20", "fill", "Rooftop HVAC"),
      zone("basement-mechanical", "14,72 44,70 46,84 16,86", "fill", "Basement mechanical room"),
    ],
    coverageZones: {
      "building-coverage": ["building-shell"],
      "general-liability": ["sidewalk-cafe"],
      "loss-of-rents": ["upper-floors", "retail-floor"],
      "equipment-breakdown": ["rooftop-hvac", "basement-mechanical"],
    },
  },
  "tow-truck-insurance": {
    src: explorerSrc("tow-truck-insurance-explorer.png"),
    visualFamily: "fleet-commercial-vehicle",
    zones: [
      zone("wrecker", "22,42 66,40 70,68 22,70", "glow", "Wrecker"),
      zone("customer-suv", "66,38 90,36 92,56 68,58", "outline", "Customer SUV on the wheel-lift"),
      zone("storage-lot", "50,16 92,14 94,40 52,42", "fill", "Fenced storage lot"),
      zone("roadside-cones", "66,52 94,48 96,64 68,66", "pulse", "Roadside cones"),
    ],
    coverageZones: {
      "liability-coverage": ["wrecker", "roadside-cones"],
      "physical-damage-coverage": ["wrecker"],
      "on-hook-bailee": ["customer-suv"],
      "storage-lot-roadside": ["storage-lot"],
    },
  },
  "commercial-umbrella-insurance": {
    src: explorerSrc("commercial-umbrella-insurance-explorer.png"),
    visualFamily: "commercial-building",
    zones: [
      zone("office-premises", "18,20 62,18 64,58 20,60", "outline", "Office premises"),
      zone("parked-cars", "8,46 26,44 28,58 10,60", "glow", "Parked cars"),
      zone("service-van", "52,52 68,50 70,64 54,66", "glow", "Service van"),
      zone("truck-and-forklift", "74,38 94,36 96,58 76,60", "outline", "Box truck and forklift"),
    ],
    coverageZones: {
      "excess-over-cgl": ["office-premises"],
      "excess-over-auto": ["parked-cars", "service-van", "truck-and-forklift"],
      "follow-form-vs-broader": [],
      "contractual-limit-demands": [],
    },
    sceneNote:
      "The scene shows premises and vehicles. It does not show policy wording, follow-form terms, or an extra limit.",
  },
  "equipment-breakdown-insurance": {
    src: explorerSrc("equipment-breakdown-insurance-explorer.png"),
    visualFamily: "commercial-building",
    zones: [
      zone("boilers", "40,34 72,30 74,58 42,60", "glow", "Boilers"),
      zone("air-handler", "10,18 40,16 42,52 12,54", "outline", "Air handler"),
      zone("pumps", "12,52 42,50 44,70 14,72", "fill", "Pumps"),
      zone("switchgear", "76,32 92,30 94,56 78,58", "outline", "Electrical cabinets"),
      zone("control-panel", "46,46 58,44 60,62 48,64", "glow", "Control panel"),
    ],
    coverageZones: {
      "equipment-breakdown": ["boilers"],
      "spoilage-and-interruption": [],
      "building-systems": ["air-handler", "pumps", "switchgear", "control-panel"],
      "production-equipment": [],
    },
  },
};

export function getBatchAExplorerScene(slug: string): BatchAExplorerScene | null {
  return BATCH_A_EXPLORER_SCENES[slug] ?? null;
}

export const BATCH_A_ROUTE_COVERAGE_ZONES: Record<string, Record<string, string[]>> =
  Object.fromEntries(
    Object.entries(BATCH_A_EXPLORER_SCENES).map(([slug, scene]) => [
      slug,
      scene.coverageZones,
    ]),
  );
