/** Route → archetype + coverage zone wiring for interactive master dioramas. */

export type RouteManifestEntry = {
  archetype: string;
  coverageZones: Record<string, string[]>;
  flaggedStates?: string[];
};

export const ROUTE_MANIFEST: Record<string, RouteManifestEntry> = {
  "auto-insurance": {
    archetype: "auto-street",
    coverageZones: {
      "liability": ["road-perimeter", "traffic-lane", "vehicle-body"],
      "collision": ["vehicle-body", "cabin-interior", "street-surface"],
      "comprehensive": ["vehicle-body", "parking-apron", "cabin-interior"],
      "accident-benefits": ["cabin-interior", "vehicle-body"],
      "uninsured": ["road-perimeter", "traffic-lane"],
      "loss-of-use": ["parking-apron", "street-surface", "vehicle-body"],
    },
  },
  "home-insurance": {
    archetype: "home-cutaway",
    coverageZones: {
      "dwelling-coverage": ["dwelling-structure", "roof-structure", "garage-zone"],
      "contents-coverage": ["interior-contents", "dwelling-structure"],
      "liability-protection": ["exterior-liability", "walkway-porch", "driveway"],
      "additional-living-expenses": ["temporary-accommodation", "interior-contents"],
      "high-value-home-considerations": ["interior-contents", "dwelling-structure", "roof-structure"],
    },
  },
  "condo-insurance": {
    archetype: "condo-cutaway",
    coverageZones: {
      "unit-contents-improvements": ["interior-living", "unit-shell"],
      "personal-liability": ["exterior-commons", "balcony-edge", "shared-hall"],
      "loss-assessment-coverage": ["unit-shell", "shared-hall", "parking-level"],
      "additional-living-expenses": ["interior-living", "exterior-commons"],
    },
  },
  "tenant-insurance": {
    archetype: "home-cutaway",
    coverageZones: {
      "contents-coverage": ["interior-contents", "dwelling-structure"],
      "personal-liability": ["exterior-liability", "walkway-porch", "driveway"],
      "additional-living-expenses": ["temporary-accommodation", "interior-contents"],
      "no-building-coverage": ["interior-contents", "exterior-liability"],
    },
  },
  "landlord-insurance": {
    archetype: "landlord-duplex",
    coverageZones: {
      "rental-dwelling-coverage": ["upper-unit", "lower-unit", "landlord-structures"],
      "landlord-liability": ["rental-yard", "tenant-entry", "shared-wall"],
      "loss-of-rental-income": ["upper-unit", "lower-unit", "tenant-entry"],
      "tenant-caused-damage": ["lower-unit", "rental-yard", "shared-wall"],
    },
  },
  "cottage-insurance": {
    archetype: "cottage-compound",
    coverageZones: {
      "seasonal-dwelling-coverage": ["main-cabin", "outbuilding"],
      "contents-personal-property": ["main-cabin", "outbuilding"],
      "liability-protection": ["lakeshore", "access-drive", "wooded-buffer"],
      "additional-living-expenses": ["main-cabin", "access-drive"],
    },
  },
  "motorcycle-insurance": {
    archetype: "motorcycle-plinth",
    coverageZones: {
      "third-party-liability": ["road-edge", "bike-plinth", "parking-pad"],
      "collision-comprehensive": ["bike-plinth", "rider-zone", "accessory-rack"],
      "accident-benefits": ["rider-zone", "bike-plinth"],
      "accessories-gear": ["accessory-rack", "bike-plinth"],
    },
  },
  "boat-insurance": {
    archetype: "boat-plinth",
    coverageZones: {
      "hull-machinery": ["hull-body", "marina-dock"],
      "liability-coverage": ["water-surface", "shoreline", "marina-dock"],
      "equipment-trailers": ["trailer-zone", "hull-body"],
      "navigation-use-territory": ["water-surface", "shoreline", "hull-body"],
    },
  },
  "travel-insurance": {
    archetype: "travel-airport",
    coverageZones: {
      "emergency-medical": ["terminal-hall", "gate-area"],
      "trip-cancellation-interruption": ["gate-area", "travel-path", "runway-edge"],
      "baggage-personal-effects": ["baggage-claim", "terminal-hall"],
      "travel-liability": ["travel-path", "terminal-hall", "gate-area"],
    },
  },
  "mobile-home-insurance": {
    archetype: "home-exterior",
    coverageZones: {
      "dwelling-coverage": ["dwelling-shell", "roof-and-walls", "garage-wing"],
      "contents-belongings": ["dwelling-shell", "porch-entry"],
      "personal-liability": ["exterior-yard", "driveway", "porch-entry"],
      "additional-structures": ["garage-wing", "dwelling-shell", "exterior-yard"],
    },
  },
  "personal-umbrella-insurance": {
    archetype: "home-exterior",
    coverageZones: {
      "excess-liability-limits": ["exterior-yard", "driveway", "porch-entry"],
      "broad-personal-liability": ["exterior-yard", "driveway", "porch-entry"],
      "legal-defence-costs": ["porch-entry", "exterior-yard"],
      "worldwide-coverage": ["exterior-yard", "dwelling-shell", "driveway"],
    },
  },
  "home-sharing-insurance": {
    archetype: "home-cutaway",
    coverageZones: {
      "short-term-rental-home": ["dwelling-structure", "interior-contents"],
      "peer-to-peer-vehicle-sharing": ["interior-contents", "exterior-liability", "driveway"],
      "ride-share-driving": ["driveway", "exterior-liability"],
      "host-guest-liability": ["exterior-liability", "walkway-porch", "driveway"],
    },
  },
  "life-insurance": {
    archetype: "hub-campus",
    coverageZones: {
      "term-life": ["hub-plaza", "welcome-desk", "skyline-backdrop"],
      "permanent-life": ["hub-plaza", "connector-walk", "industry-pod-east"],
      "mortgage-debt-protection": ["welcome-desk", "hub-plaza"],
      "business-key-person": ["industry-pod-west", "industry-pod-east", "hub-plaza"],
    },
  },
  "group-home-auto-insurance": {
    archetype: "hub-campus",
    coverageZones: {
      "employer-sponsored-programs": ["welcome-desk", "hub-plaza", "pathway-ring"],
      "association-membership-groups": ["connector-walk", "hub-plaza"],
      "home-auto-coordination": ["industry-pod-west", "industry-pod-east", "connector-walk"],
      "dedicated-service-path": ["welcome-desk", "pathway-ring"],
    },
  },
  "commercial-insurance": {
    archetype: "hub-campus",
    coverageZones: {
    },
  },
  "commercial-auto-insurance": {
    archetype: "fleet-vehicles",
    coverageZones: {
      "liability-coverage": ["highway-lane", "lead-truck", "yard-staging"],
      "physical-damage-coverage": ["lead-truck", "trailing-unit", "cargo-trailer"],
      "hired-non-owned-auto": ["highway-lane", "yard-staging", "lead-truck"],
      "fleet-discounts-multi-vehicle-management": ["lead-truck", "trailing-unit", "yard-staging"],
    },
  },
  "trucking-insurance": {
    archetype: "truck-semi",
    coverageZones: {
      "cargo-insurance": ["cargo-deck", "trailer-body", "highway-lane"],
      "liability-coverage": ["highway-lane", "tractor-cab", "yard-staging"],
      "physical-damage": ["tractor-cab", "trailer-body", "cargo-deck"],
      "cross-border-coverage": ["highway-lane", "weigh-station", "trailer-body"],
    },
  },
  "contractors-insurance": {
    archetype: "construction-site",
    coverageZones: {
      "general-liability": ["site-perimeter", "active-build", "trailer-office"],
      "tools-equipment-coverage": ["material-stack", "active-build", "scaffold-zone"],
      "builder-s-risk": ["active-build", "scaffold-zone", "material-stack"],
      "wrap-up-liability": ["site-perimeter", "active-build", "trailer-office"],
    },
  },
  "builders-developers-insurance": {
    archetype: "construction-site",
    coverageZones: {
      "builder-s-risk": ["active-build", "scaffold-zone", "material-stack"],
      "general-liability": ["site-perimeter", "active-build", "trailer-office"],
      "wrap-up-liability": ["site-perimeter", "active-build", "trailer-office"],
      "completed-operations": ["active-build", "site-perimeter"],
    },
  },
  "manufacturing-insurance": {
    archetype: "industrial-warehouse",
    coverageZones: {
      "product-liability": ["production-line", "factory-floor", "loading-dock"],
      "commercial-property": ["factory-floor", "storage-racks", "loading-dock"],
      "business-interruption": ["production-line", "office-wing", "factory-floor"],
      "equipment-breakdown": ["production-line", "loading-dock", "storage-racks"],
      "machine-shop-tool-die": ["production-line", "storage-racks"],
    },
  },
  "commercial-property-insurance": {
    archetype: "commercial-building",
    coverageZones: {
      "building-coverage": ["tower-shell", "office-floors", "rooftop-mechanical"],
      "contents-equipment": ["rooftop-mechanical", "office-floors"],
      "equipment-breakdown": ["rooftop-mechanical", "office-floors"],
      "commercial-landlord-property-owner": ["tower-shell", "lobby-atrium", "office-floors"],
    },
  },
  "restaurant-insurance": {
    archetype: "restaurant-cutaway",
    coverageZones: {
      "general-liability": ["dining-floor", "entrance-facade"],
      "property-coverage": ["kitchen-prep", "cooking-equipment", "cold-storage", "bar-zone"],
      "liquor-liability": ["bar-zone", "bar-seating", "cold-storage"],
      "equipment-breakdown-spoilage": ["kitchen-prep", "cooking-equipment", "cold-storage"],
    },
  },
  "food-truck-insurance": {
    archetype: "fleet-vehicles",
    coverageZones: {
      "general-liability": ["highway-lane", "lead-truck", "yard-staging"],
      "commercial-auto": ["lead-truck", "trailing-unit", "highway-lane"],
      "equipment-coverage": ["cargo-trailer", "yard-staging"],
      "product-liability": ["highway-lane", "lead-truck", "yard-staging"],
    },
  },
  "retail-insurance": {
    archetype: "retail-cutaway",
    coverageZones: {
      "general-liability": ["customer-walkway", "sales-floor", "storefront-glass"],
      "property-inventory-coverage": ["sales-floor", "stock-room", "loading-bay"],
      "business-interruption": ["sales-floor", "stock-room"],
      "product-liability": ["customer-walkway", "sales-floor", "storefront-glass"],
    },
  },
  "professional-offices-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "general-liability": ["visitor-area", "reception-lobby", "exterior-signage"],
      "professional-liability-errors-omissions": ["open-office", "conference-suite", "reception-lobby"],
      "commercial-property": ["open-office", "conference-suite", "server-closet"],
      "cyber-liability": ["visitor-area", "reception-lobby", "exterior-signage"],
    },
  },
  "real-estate-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "errors-omissions-e-o": ["open-office", "conference-suite"],
      "commercial-property": ["open-office", "conference-suite", "server-closet"],
      "general-liability": ["visitor-area", "reception-lobby", "exterior-signage"],
      "landlord-coverage": ["exterior-signage", "reception-lobby"],
    },
  },
  "farm-insurance": {
    archetype: "farm-compound",
    coverageZones: {
      "farm-property-coverage": ["barn-structure", "grain-storage", "equipment-shed"],
      "equipment-machinery": ["equipment-shed", "farm-road", "barn-structure"],
      "farm-liability": ["field-acreage", "farm-road", "livestock-pen"],
      "livestock-coverage": ["livestock-pen", "barn-structure", "field-acreage"],
    },
  },
  "dump-truck-insurance": {
    archetype: "truck-semi",
    coverageZones: {
      "commercial-auto-liability": ["tractor-cab", "trailer-body", "highway-lane"],
      "physical-damage": ["tractor-cab", "trailer-body", "cargo-deck"],
      "cargo-debris-coverage": ["cargo-deck", "trailer-body"],
      "non-trucking-liability": ["highway-lane", "tractor-cab", "yard-staging"],
    },
  },
  "bonding-insurance": {
    archetype: "construction-site",
    coverageZones: {
      "bid-bonds": ["trailer-office", "site-perimeter"],
      "performance-bonds": ["active-build", "scaffold-zone", "crane-pad"],
      "labour-material-payment-bonds": ["material-stack", "active-build"],
      "licence-permit-bonds": ["trailer-office", "site-perimeter"],
      "fidelity-bonds": ["trailer-office", "material-stack"],
    },
  },
  "greenhouse-agribusiness-insurance": {
    archetype: "greenhouse-facility",
    coverageZones: {
      "greenhouse-buildings-structures": ["glass-bays", "climate-zone", "grow-rows"],
      "equipment-machinery": ["irrigation-runs", "climate-zone", "grow-rows"],
      "business-property-stock": ["grow-rows", "packing-shed", "glass-bays"],
      "business-interruption": ["climate-zone", "packing-shed", "grow-rows"],
      "commercial-liability": ["loading-bay", "glass-bays", "packing-shed"],
      "equipment-breakdown": ["irrigation-runs", "climate-zone", "grow-rows"],
    },
  },
  "garage-dealership-insurance": {
    archetype: "garage-service",
    coverageZones: {
      "garagekeepers-liability": ["service-bay", "open-lot", "customer-lounge"],
      "dealer-open-lot": ["open-lot", "showroom-floor"],
      "garage-liability": ["service-bay", "open-lot", "customer-lounge"],
      "physical-damage-on-inventory": ["open-lot", "showroom-floor", "service-bay"],
    },
  },
  "builders-risk-insurance": {
    archetype: "construction-site",
    coverageZones: {
      "work-in-progress": ["active-build", "scaffold-zone"],
      "materials-on-site-in-transit": ["material-stack", "active-build", "site-perimeter"],
      "soft-costs": ["trailer-office", "active-build"],
      "existing-structure": ["active-build", "scaffold-zone"],
    },
  },
  "cargo-freight-insurance": {
    archetype: "truck-semi",
    coverageZones: {
      "motor-truck-cargo": ["cargo-deck", "trailer-body", "highway-lane"],
      "carrier-liability": ["highway-lane", "tractor-cab", "yard-staging"],
      "refrigerated-cargo": ["cargo-deck", "trailer-body"],
      "contingent-cargo": ["cargo-deck", "highway-lane"],
    },
  },
  "condominium-corporation-insurance": {
    archetype: "commercial-building",
    coverageZones: {
      "master-property-policy": ["tower-shell", "lobby-atrium", "office-floors"],
      "general-liability": ["ground-perimeter", "lobby-atrium", "parking-garage"],
      "equipment-breakdown": ["rooftop-mechanical", "office-floors"],
      "directors-officers": ["tower-shell", "lobby-atrium"],
    },
  },
  "property-management-insurance": {
    archetype: "commercial-building",
    coverageZones: {
      "general-liability": ["ground-perimeter", "lobby-atrium", "parking-garage"],
      "property-management-e-o": ["tower-shell", "lobby-atrium", "office-floors"],
      "commercial-property": ["tower-shell", "lobby-atrium", "office-floors"],
      "hired-non-owned-auto": ["parking-garage", "ground-perimeter"],
    },
  },
  "convenience-store-insurance": {
    archetype: "retail-cutaway",
    coverageZones: {
      "commercial-property": ["sales-floor", "stock-room", "storefront-glass"],
      "general-liability": ["customer-walkway", "sales-floor", "storefront-glass"],
      "pollution-liability": ["customer-walkway", "sales-floor", "storefront-glass"],
      "crime-hold-up": ["checkout-counter", "stock-room", "sales-floor"],
    },
  },
  "daycare-private-school-insurance": {
    archetype: "daycare-classroom",
    coverageZones: {
      "general-liability": ["playground-yard", "secure-entry", "classroom-block"],
      "professional-liability": ["classroom-block", "admin-office"],
      "abuse-molestation": ["classroom-block", "secure-entry", "playground-yard"],
      "commercial-property": ["classroom-block", "cafeteria", "admin-office"],
    },
  },
  "grocery-specialty-food-insurance": {
    archetype: "retail-cutaway",
    coverageZones: {
      "commercial-property-inventory": ["sales-floor", "stock-room", "storefront-glass"],
      "spoilage-refrigeration-breakdown": ["stock-room", "sales-floor", "loading-bay"],
      "product-liability": ["customer-walkway", "sales-floor", "storefront-glass"],
      "general-liability": ["customer-walkway", "sales-floor", "storefront-glass"],
    },
  },
  "fitness-gym-insurance": {
    archetype: "gym-studio",
    coverageZones: {
      "general-liability": ["cardio-floor", "front-desk", "equipment-deck"],
      "professional-liability": ["group-studio", "front-desk", "equipment-deck"],
      "commercial-property": ["weight-room", "locker-wing", "cardio-floor"],
      "sexual-abuse-misconduct": ["group-studio", "locker-wing", "equipment-deck"],
    },
  },
  "hotel-motel-insurance": {
    archetype: "restaurant-cutaway",
    coverageZones: {
      "commercial-property": ["building-shell", "kitchen-prep", "bar-zone"],
      "general-liability": ["dining-floor", "entrance-facade", "bar-seating"],
      "business-interruption": ["dining-floor", "kitchen-prep", "building-shell"],
      "liquor-liability": ["dining-floor", "entrance-facade", "bar-seating"],
    },
  },
  "landscaping-snow-removal-insurance": {
    archetype: "construction-site",
    coverageZones: {
      "general-liability": ["site-perimeter", "active-build", "trailer-office"],
      "tools-equipment": ["material-stack", "active-build", "scaffold-zone"],
      "commercial-auto": ["site-perimeter", "trailer-office"],
      "completed-operations": ["active-build", "site-perimeter"],
    },
  },
  "medical-dental-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "commercial-general-liability": ["open-office", "conference-suite", "server-closet"],
      "commercial-property": ["open-office", "conference-suite", "server-closet"],
      "cyber-privacy": ["server-closet", "visitor-area"],
      "malpractice-coordination": ["conference-suite", "open-office"],
    },
  },
  "pharmacy-insurance": {
    archetype: "pharmacy-retail",
    coverageZones: {
      "commercial-property": ["dispensary-counter", "retail-aisle", "cold-chain"],
      "general-liability": ["storefront", "consult-booth", "retail-aisle"],
      "professional-liability": ["compounding-lab", "consult-booth", "dispensary-counter"],
      "cyber-privacy": ["compounding-lab", "dispensary-counter"],
    },
  },
  "religious-organizations-insurance": {
    archetype: "church-campus",
    coverageZones: {
      "commercial-property": ["sanctuary-nave", "fellowship-hall", "office-narthex"],
      "general-liability": ["parking-lot", "community-garden", "sanctuary-nave"],
      "pastoral-counselling-liability": ["parking-lot", "community-garden", "sanctuary-nave"],
      "abuse-molestation": ["fellowship-hall", "office-narthex"],
    },
  },
  "salon-barber-insurance": {
    archetype: "salon-studio",
    coverageZones: {
      "general-liability": ["styling-chairs", "reception-desk", "exterior-signage"],
      "professional-treatment-liability": ["treatment-room", "styling-chairs", "wash-station"],
      "commercial-property": ["product-shelf", "styling-chairs", "reception-desk"],
      "product-liability": ["styling-chairs", "reception-desk", "exterior-signage"],
    },
  },
  "warehousing-insurance": {
    archetype: "industrial-warehouse",
    coverageZones: {
      "commercial-property": ["factory-floor", "storage-racks", "loading-dock"],
      "warehouse-legal-liability": ["storage-racks", "loading-dock", "factory-floor"],
      "general-liability": ["factory-floor", "production-line"],
      "business-interruption": ["production-line", "office-wing", "factory-floor"],
    },
  },
  "directors-officers-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "side-a-individual-coverage": ["conference-suite", "open-office", "reception-lobby"],
      "side-b-corporate-reimbursement": ["conference-suite", "open-office", "reception-lobby"],
      "side-c-entity-coverage": ["conference-suite", "open-office", "reception-lobby"],
      "defence-costs": ["conference-suite", "reception-lobby"],
    },
  },
  "employment-practices-liability-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "wrongful-termination": ["open-office", "conference-suite"],
      "harassment-discrimination": ["open-office", "visitor-area"],
      "retaliation-claims": ["conference-suite", "visitor-area"],
      "defence-costs": ["conference-suite", "reception-lobby"],
    },
  },
  "cyber-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "data-breach-response": ["server-closet", "reception-lobby"],
      "ransomware-extortion": ["server-closet", "open-office"],
      "business-interruption-cyber": ["server-closet", "open-office", "reception-lobby"],
      "privacy-liability": ["visitor-area", "reception-lobby", "exterior-signage"],
    },
  },
  "small-business-insurance": {
    archetype: "commercial-building",
    coverageZones: {
      "general-liability": ["ground-perimeter", "lobby-atrium", "parking-garage"],
      "commercial-property": ["tower-shell", "lobby-atrium", "office-floors"],
      "commercial-auto": ["tower-shell", "lobby-atrium", "office-floors"],
      "business-interruption": ["office-floors", "lobby-atrium", "tower-shell"],
    },
  },
  "non-profit-insurance": {
    archetype: "church-campus",
    coverageZones: {
      "general-liability": ["parking-lot", "community-garden", "sanctuary-nave"],
      "directors-officers": ["office-narthex", "sanctuary-nave"],
      "commercial-property": ["sanctuary-nave", "fellowship-hall", "office-narthex"],
      "volunteer-accident": ["fellowship-hall", "community-garden", "parking-lot"],
    },
  },
  "event-liability-insurance": {
    archetype: "event-venue",
    coverageZones: {
      "third-party-bodily-injury": ["seating-bowl", "entry-plaza", "main-hall"],
      "property-damage": ["main-hall", "stage-platform", "back-of-house"],
      "liquor-liability-events": ["main-hall", "seating-bowl", "entry-plaza"],
      "vendor-exhibitor-coverage": ["vendor-alley", "entry-plaza", "main-hall"],
    },
  },
  "liquor-liability-insurance": {
    archetype: "restaurant-cutaway",
    coverageZones: {
      "patron-injury-property-damage": ["building-shell", "kitchen-prep", "bar-zone"],
      "assault-battery": ["dining-floor", "building-shell"],
      "legal-defence": ["dining-floor", "building-shell"],
      "event-host-liquor": ["bar-zone", "bar-seating", "dining-floor"],
    },
  },
  "business-interruption-insurance": {
    archetype: "commercial-building",
    coverageZones: {
      "lost-income": ["office-floors", "lobby-atrium"],
      "continuing-expenses": ["office-floors", "tower-shell"],
      "extra-expense": ["lobby-atrium", "office-floors"],
      "contingent-business-interruption": ["office-floors", "lobby-atrium", "tower-shell"],
    },
  },
  "crime-fidelity-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "employee-dishonesty": ["reception-lobby", "server-closet"],
      "forgery-alteration": ["reception-lobby", "open-office"],
      "theft-of-money-securities": ["reception-lobby", "server-closet"],
      "computer-fraud": ["server-closet", "open-office"],
    },
  },
  "professional-liability-insurance": {
    archetype: "office-suite",
    coverageZones: {
      "accountants-bookkeepers": ["open-office", "conference-suite"],
      "consultants-advisors": ["open-office", "reception-lobby"],
      "engineers-architects": ["conference-suite", "open-office"],
      "financial-advisors-it-consultants": ["open-office", "reception-lobby"],
    },
  },
  "pollution-liability-insurance": {
    archetype: "industrial-warehouse",
    coverageZones: {
      "contractors-pollution-liability": ["factory-floor", "perimeter-fence", "loading-dock"],
      "site-pollution": ["factory-floor", "perimeter-fence"],
      "transportation-pollution": ["loading-dock", "perimeter-fence"],
      "cleanup-defence-costs": ["factory-floor", "perimeter-fence", "loading-dock"],
    },
  },
  "product-recall-insurance": {
    archetype: "industrial-warehouse",
    coverageZones: {
      "recall-expenses": ["production-line", "loading-dock", "storage-racks"],
      "replacement-costs": ["production-line", "storage-racks"],
      "consultant-lab-fees": ["office-wing", "production-line"],
      "brand-rehabilitation": ["factory-floor", "office-wing"],
    },
  },
};

export const ROUTE_MANIFEST_SLUGS = Object.keys(ROUTE_MANIFEST);
