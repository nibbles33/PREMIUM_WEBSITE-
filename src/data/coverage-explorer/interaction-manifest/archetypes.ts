/** SVG zone shape for isometric diorama cutaways (viewBox 0 0 100 100). */
export type ArchetypeZone = {
  id: string;
  path: string;
  style: "glow" | "pulse" | "outline" | "fill";
  label: string;
};

export type ArchetypeDefinition = {
  id: string;
  zones: ArchetypeZone[];
};

function poly(points: string, style: ArchetypeZone["style"], label: string): ArchetypeZone {
  const id = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return { id, path: `M ${points} Z`, style, label };
}

export const autoStreet: ArchetypeDefinition = {
  id: "auto-street",
  zones: [
    poly("8,62 28,48 52,52 68,44 88,58 82,78 48,86 18,76", "glow", "Vehicle body"),
    poly("22,38 44,28 62,34 74,48 58,56 36,52", "outline", "Cabin interior"),
    poly("4,72 96,72 92,92 8,92", "pulse", "Street surface"),
    poly("2,54 18,42 12,68", "fill", "Parking apron"),
    poly("78,40 96,46 94,66 80,60", "pulse", "Traffic lane"),
    poly("6,48 94,48 88,68 10,68", "outline", "Road perimeter"),
  ],
};

export const homeExterior: ArchetypeDefinition = {
  id: "home-exterior",
  zones: [
    poly("18,22 48,12 78,24 84,48 72,68 38,72 14,54", "outline", "Roof and walls"),
    poly("24,38 58,32 70,52 62,74 34,78 20,58", "glow", "Dwelling shell"),
    poly("8,68 32,62 36,82 10,88", "fill", "Garage wing"),
    poly("42,74 88,68 92,88 38,92", "pulse", "Driveway"),
    poly("6,78 94,78 90,96 8,96", "outline", "Exterior yard"),
    poly("44,58 58,52 64,68 50,74", "glow", "Porch entry"),
  ],
};

export const homeCutaway: ArchetypeDefinition = {
  id: "home-cutaway",
  zones: [
    poly("16,18 52,10 82,22 88,46 76,70 40,76 12,56", "outline", "Roof structure"),
    poly("22,32 64,26 78,48 68,72 30,76 18,52", "glow", "Dwelling structure"),
    poly("30,42 58,38 66,58 52,68 34,64", "fill", "Interior contents"),
    poly("8,44 22,38 26,62 10,68", "glow", "Garage zone"),
    poly("6,72 34,66 38,88 8,92", "pulse", "Driveway"),
    poly("40,70 72,64 78,88 42,92", "pulse", "Walkway porch"),
    poly("4,76 96,76 92,96 6,96", "outline", "Exterior liability"),
    poly("72,58 92,52 94,74 74,78", "pulse", "Temporary accommodation"),
  ],
};

export const condoCutaway: ArchetypeDefinition = {
  id: "condo-cutaway",
  zones: [
    poly("20,16 54,8 84,20 90,44 78,68 42,74 14,52", "outline", "Unit shell"),
    poly("28,34 62,28 74,48 64,70 32,72 22,50", "glow", "Interior living"),
    poly("70,24 88,30 86,50 72,46", "fill", "Balcony edge"),
    poly("10,40 24,34 28,58 12,64", "pulse", "Shared hall"),
    poly("8,68 38,62 42,84 10,88", "outline", "Parking level"),
    poly("46,72 92,66 94,90 48,94", "pulse", "Exterior commons"),
  ],
};

export const landlordDuplex: ArchetypeDefinition = {
  id: "landlord-duplex",
  zones: [
    poly("14,20 48,12 82,22 88,46 74,72 36,76 10,54", "outline", "Upper unit"),
    poly("18,48 52,42 68,62 58,82 28,84 16,66", "glow", "Lower unit"),
    poly("48,38 58,34 62,52 52,56", "fill", "Shared wall"),
    poly("6,74 94,74 90,94 8,94", "pulse", "Rental yard"),
    poly("36,68 64,62 70,82 38,86", "outline", "Tenant entry"),
    poly("20,28 44,22 50,40 26,46", "glow", "Landlord structures"),
  ],
};

export const cottageCompound: ArchetypeDefinition = {
  id: "cottage-compound",
  zones: [
    poly("22,24 56,14 82,28 86,52 70,72 38,76 16,56", "glow", "Main cabin"),
    poly("8,62 28,56 32,78 10,84", "fill", "Dock slip"),
    poly("68,58 94,52 96,78 72,82", "pulse", "Lakeshore"),
    poly("74,18 92,24 88,44 76,40", "outline", "Outbuilding"),
    poly("4,32 18,26 20,48 6,52", "fill", "Wooded buffer"),
    poly("42,74 88,68 92,92 40,94", "pulse", "Access drive"),
  ],
};

export const motorcyclePlinth: ArchetypeDefinition = {
  id: "motorcycle-plinth",
  zones: [
    poly("24,44 58,34 78,48 72,72 38,78 20,62", "glow", "Bike plinth"),
    poly("32,28 54,22 62,38 44,44", "outline", "Rider zone"),
    poly("62,52 84,46 88,66 66,70", "fill", "Accessory rack"),
    poly("6,68 94,68 90,88 8,88", "pulse", "Road edge"),
    poly("12,52 28,48 30,64 14,68", "pulse", "Parking pad"),
  ],
};

export const boatPlinth: ArchetypeDefinition = {
  id: "boat-plinth",
  zones: [
    poly("18,38 62,28 88,44 82,68 42,74 16,58", "glow", "Hull body"),
    poly("8,72 92,72 88,90 10,90", "pulse", "Water surface"),
    poly("68,58 92,52 94,74 72,78", "outline", "Marina dock"),
    poly("10,48 24,42 28,62 12,66", "fill", "Trailer zone"),
    poly("74,22 94,28 90,46 76,42", "pulse", "Shoreline"),
  ],
};

export const travelAirport: ArchetypeDefinition = {
  id: "travel-airport",
  zones: [
    poly("12,28 48,18 84,30 88,54 72,72 34,76 10,52", "outline", "Terminal hall"),
    poly("18,44 42,38 52,56 38,68 20,62", "glow", "Gate area"),
    poly("58,46 82,40 86,62 62,66", "fill", "Baggage claim"),
    poly("68,18 94,24 92,42 70,38", "pulse", "Runway edge"),
    poly("6,68 94,68 90,92 8,92", "pulse", "Travel path"),
  ],
};

export const restaurantCutaway: ArchetypeDefinition = {
  id: "restaurant-cutaway",
  zones: [
    poly("6,18 42,12 68,22 72,48 54,68 22,72 8,46", "outline", "Kitchen prep"),
    poly("24,38 52,32 62,52 48,64 28,58", "pulse", "Cooking equipment"),
    poly("58,28 78,24 82,48 62,52", "glow", "Cold storage"),
    poly("68,34 92,28 94,58 72,62", "glow", "Bar zone"),
    poly("74,52 90,48 88,68 76,70", "pulse", "Bar seating"),
    poly("18,58 58,52 64,78 22,84", "glow", "Dining floor"),
    poly("4,32 18,28 20,52 6,56", "outline", "Entrance facade"),
    poly("8,14 92,14 88,76 10,78", "fill", "Building shell"),
  ],
};

export const retailCutaway: ArchetypeDefinition = {
  id: "retail-cutaway",
  zones: [
    poly("14,24 58,16 86,28 90,56 72,74 32,78 12,52", "glow", "Sales floor"),
    poly("62,48 84,42 88,66 66,70", "pulse", "Checkout counter"),
    poly("8,38 28,32 32,58 12,64", "fill", "Stock room"),
    poly("18,18 52,12 56,32 22,38", "outline", "Storefront glass"),
    poly("68,58 94,52 96,78 72,82", "pulse", "Loading bay"),
    poly("6,62 94,62 90,92 8,92", "outline", "Customer walkway"),
  ],
};

export const commercialBuilding: ArchetypeDefinition = {
  id: "commercial-building",
  zones: [
    poly("28,8 72,12 88,38 84,72 52,82 18,68 12,36", "outline", "Tower shell"),
    poly("22,52 48,46 58,66 38,74 20,68", "glow", "Lobby atrium"),
    poly("54,28 78,32 82,58 58,62", "fill", "Office floors"),
    poly("8,58 24,52 28,76 10,80", "pulse", "Parking garage"),
    poly("62,14 86,18 84,34 64,30", "glow", "Rooftop mechanical"),
    poly("4,72 96,72 92,94 6,94", "outline", "Ground perimeter"),
  ],
};

export const constructionSite: ArchetypeDefinition = {
  id: "construction-site",
  zones: [
    poly("32,14 68,18 78,42 62,68 36,72 18,48", "outline", "Scaffold zone"),
    poly("24,38 56,32 68,54 52,70 28,64", "glow", "Active build"),
    poly("6,48 22,42 26,66 8,70", "fill", "Material stack"),
    poly("4,68 96,68 92,92 6,92", "pulse", "Site perimeter"),
    poly("72,22 92,28 88,52 74,48", "pulse", "Crane pad"),
    poly("68,58 92,52 94,76 72,80", "outline", "Trailer office"),
  ],
};

export const industrialWarehouse: ArchetypeDefinition = {
  id: "industrial-warehouse",
  zones: [
    poly("10,32 52,22 88,34 92,62 68,78 28,82 8,58", "outline", "Factory floor"),
    poly("68,48 94,42 96,68 72,72", "pulse", "Loading dock"),
    poly("14,44 38,38 44,60 22,66", "fill", "Storage racks"),
    poly("42,36 68,32 74,54 48,58", "glow", "Production line"),
    poly("8,18 28,14 32,34 12,38", "glow", "Office wing"),
    poly("4,68 96,68 92,94 6,94", "outline", "Perimeter fence"),
  ],
};

export const farmCompound: ArchetypeDefinition = {
  id: "farm-compound",
  zones: [
    poly("18,28 52,18 78,32 82,58 58,74 28,78 12,52", "glow", "Barn structure"),
    poly("4,58 94,58 90,88 6,88", "fill", "Field acreage"),
    poly("68,42 90,36 92,58 72,62", "outline", "Equipment shed"),
    poly("8,38 24,32 28,52 12,56", "pulse", "Livestock pen"),
    poly("72,18 92,22 88,38 74,34", "fill", "Grain storage"),
    poly("38,72 88,66 92,90 36,94", "pulse", "Farm road"),
  ],
};

export const greenhouseFacility: ArchetypeDefinition = {
  id: "greenhouse-facility",
  zones: [
    poly("12,24 58,14 88,28 92,56 72,74 32,78 10,50", "outline", "Glass bays"),
    poly("24,38 62,32 74,52 58,68 34,64", "glow", "Climate zone"),
    poly("6,52 22,46 26,68 8,72", "pulse", "Irrigation runs"),
    poly("68,48 92,42 94,66 72,70", "fill", "Packing shed"),
    poly("38,58 64,54 68,72 42,76", "fill", "Grow rows"),
    poly("72,58 94,52 96,78 74,82", "pulse", "Loading bay"),
  ],
};

export const fleetVehicles: ArchetypeDefinition = {
  id: "fleet-vehicles",
  zones: [
    poly("6,52 38,42 52,56 44,74 14,78", "glow", "Lead truck"),
    poly("48,48 78,40 88,58 72,72 52,68", "glow", "Trailing unit"),
    poly("58,34 88,28 92,48 64,52", "outline", "Cargo trailer"),
    poly("4,68 96,68 92,90 6,90", "pulse", "Highway lane"),
    poly("72,18 94,24 90,42 74,38", "fill", "Weigh station"),
    poly("8,38 32,32 36,50 12,54", "pulse", "Yard staging"),
  ],
};

export const truckSemi: ArchetypeDefinition = {
  id: "truck-semi",
  zones: [
    poly("8,48 36,38 48,54 40,72 12,76", "glow", "Tractor cab"),
    poly("44,42 82,34 90,56 72,68 48,62", "outline", "Trailer body"),
    poly("52,28 84,22 88,40 56,46", "fill", "Cargo deck"),
    poly("4,68 96,68 92,90 6,90", "pulse", "Highway lane"),
    poly("68,18 94,24 90,42 72,38", "pulse", "Weigh station"),
    poly("10,32 28,28 32,44 14,48", "outline", "Yard staging"),
  ],
};

export const garageService: ArchetypeDefinition = {
  id: "garage-service",
  zones: [
    poly("8,38 48,28 72,40 68,68 28,76 10,58", "glow", "Service bay"),
    poly("54,32 88,26 92,54 62,60", "fill", "Showroom floor"),
    poly("68,48 94,42 96,72 72,76", "pulse", "Open lot"),
    poly("18,52 42,48 46,66 22,70", "outline", "Customer lounge"),
    poly("6,22 28,18 32,36 10,40", "fill", "Parts counter"),
    poly("38,68 92,62 94,88 36,92", "pulse", "Wash bay"),
  ],
};

export const officeSuite: ArchetypeDefinition = {
  id: "office-suite",
  zones: [
    poly("14,48 38,42 48,62 32,72 16,66", "glow", "Reception lobby"),
    poly("42,32 78,26 86,52 58,58", "fill", "Open office"),
    poly("62,48 88,42 92,68 68,72", "outline", "Conference suite"),
    poly("8,28 24,24 28,42 12,46", "pulse", "Server closet"),
    poly("6,62 94,62 90,88 8,88", "outline", "Visitor area"),
    poly("72,18 94,22 90,38 74,34", "glow", "Exterior signage"),
  ],
};

export const eventVenue: ArchetypeDefinition = {
  id: "event-venue",
  zones: [
    poly("18,24 58,16 86,28 90,56 68,74 32,78 12,50", "glow", "Main hall"),
    poly("24,42 52,36 62,56 48,68 28,62", "pulse", "Stage platform"),
    poly("58,48 82,42 86,66 62,70", "fill", "Seating bowl"),
    poly("6,38 22,32 26,54 10,58", "outline", "Vendor alley"),
    poly("42,68 92,62 94,90 40,94", "pulse", "Entry plaza"),
    poly("68,22 92,28 88,46 72,42", "fill", "Back of house"),
  ],
};

export const hubCampus: ArchetypeDefinition = {
  id: "hub-campus",
  zones: [
    poly("28,32 58,24 78,38 74,62 48,70 24,56", "glow", "Hub plaza"),
    poly("8,38 24,32 28,54 12,58", "fill", "Industry pod west"),
    poly("72,34 92,28 94,52 76,56", "fill", "Industry pod east"),
    poly("38,58 68,52 72,74 40,78", "pulse", "Connector walk"),
    poly("42,42 58,38 62,54 46,58", "outline", "Welcome desk"),
    poly("14,14 86,14 82,28 18,32", "glow", "Skyline backdrop"),
    poly("6,68 94,68 90,92 8,92", "pulse", "Pathway ring"),
  ],
};

export const pharmacyRetail: ArchetypeDefinition = {
  id: "pharmacy-retail",
  zones: [
    poly("18,32 58,24 84,36 88,60 62,74 28,78 14,52", "glow", "Dispensary counter"),
    poly("8,44 28,38 32,62 12,66", "fill", "Retail aisle"),
    poly("62,38 88,32 92,56 68,60", "outline", "Compounding lab"),
    poly("14,18 52,12 56,32 18,38", "pulse", "Storefront"),
    poly("68,48 94,42 96,68 72,72", "glow", "Cold chain"),
    poly("38,58 64,54 68,74 40,78", "fill", "Consult booth"),
  ],
};

export const churchCampus: ArchetypeDefinition = {
  id: "church-campus",
  zones: [
    poly("22,22 58,14 82,28 86,54 64,74 32,78 14,52", "glow", "Sanctuary nave"),
    poly("8,48 32,42 38,66 12,70", "fill", "Fellowship hall"),
    poly("68,42 92,36 94,62 72,66", "outline", "Office narthex"),
    poly("6,68 94,68 90,92 8,92", "pulse", "Parking lot"),
    poly("62,14 84,18 80,34 64,30", "glow", "Steeple zone"),
    poly("38,68 88,62 92,88 36,92", "fill", "Community garden"),
  ],
};

export const gymStudio: ArchetypeDefinition = {
  id: "gym-studio",
  zones: [
    poly("12,28 52,18 86,30 90,56 68,74 28,78 10,50", "glow", "Cardio floor"),
    poly("8,44 32,38 38,62 14,66", "fill", "Weight room"),
    poly("58,38 84,32 88,56 62,60", "pulse", "Group studio"),
    poly("18,52 42,46 48,66 22,70", "outline", "Front desk"),
    poly("68,48 94,42 96,72 72,76", "fill", "Locker wing"),
    poly("38,58 64,54 68,74 40,78", "glow", "Equipment deck"),
  ],
};

export const salonStudio: ArchetypeDefinition = {
  id: "salon-studio",
  zones: [
    poly("14,28 58,18 86,32 90,58 68,76 28,80 10,52", "glow", "Styling chairs"),
    poly("8,44 28,38 32,62 12,66", "pulse", "Wash station"),
    poly("62,38 88,32 92,58 68,62", "fill", "Product shelf"),
    poly("18,52 42,46 48,66 22,70", "outline", "Reception desk"),
    poly("68,48 94,42 96,72 72,76", "glow", "Treatment room"),
    poly("38,68 92,62 94,90 36,94", "pulse", "Exterior signage"),
  ],
};

export const daycareClassroom: ArchetypeDefinition = {
  id: "daycare-classroom",
  zones: [
    poly("16,26 58,16 86,30 90,56 68,74 30,78 12,52", "glow", "Classroom block"),
    poly("6,58 94,58 90,88 8,88", "pulse", "Playground yard"),
    poly("62,38 88,32 92,56 68,60", "outline", "Admin office"),
    poly("8,38 24,32 28,54 12,58", "fill", "Pickup lane"),
    poly("38,42 64,36 68,56 42,60", "fill", "Cafeteria"),
    poly("72,48 94,42 96,68 74,72", "pulse", "Secure entry"),
  ],
};

/** All interaction archetypes keyed by id. */
export const ARCHETYPES: Record<string, ArchetypeDefinition> = {
  "auto-street": autoStreet,
  "home-exterior": homeExterior,
  "home-cutaway": homeCutaway,
  "condo-cutaway": condoCutaway,
  "landlord-duplex": landlordDuplex,
  "cottage-compound": cottageCompound,
  "motorcycle-plinth": motorcyclePlinth,
  "boat-plinth": boatPlinth,
  "travel-airport": travelAirport,
  "restaurant-cutaway": restaurantCutaway,
  "retail-cutaway": retailCutaway,
  "commercial-building": commercialBuilding,
  "construction-site": constructionSite,
  "industrial-warehouse": industrialWarehouse,
  "farm-compound": farmCompound,
  "greenhouse-facility": greenhouseFacility,
  "fleet-vehicles": fleetVehicles,
  "truck-semi": truckSemi,
  "garage-service": garageService,
  "office-suite": officeSuite,
  "event-venue": eventVenue,
  "hub-campus": hubCampus,
  "pharmacy-retail": pharmacyRetail,
  "church-campus": churchCampus,
  "gym-studio": gymStudio,
  "salon-studio": salonStudio,
  "daycare-classroom": daycareClassroom,
};

export const ARCHETYPE_IDS = Object.keys(ARCHETYPES);
