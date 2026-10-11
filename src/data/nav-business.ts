export type NavLink = {
  label: string;
  href: string;
};

/**
 * Business mega-menu category.
 * All ten entries are primary industries in the Business dropdown
 * (Specialty & Community and Agriculture included in the main list).
 */
export type BusinessNavCategory = {
  id: string;
  title: string;
  role: "industry" | "specialty_group";
  links: NavLink[];
};

export const businessNavHub = {
  label: "Business",
  href: "/commercial-insurance/",
};

/**
 * Ten Business industries in approved mega-menu order.
 * Every product href from the prior flat mega-menu is preserved at least once.
 * Workplace-injury statutory products are intentionally omitted from menus.
 */
export const businessNavCategories: BusinessNavCategory[] = [
  {
    id: "construction-contractors",
    title: "Construction & Contractors",
    role: "industry",
    links: [
      { label: "Contractors", href: "/contractors-insurance/" },
      { label: "Builders & Developers", href: "/builders-developers-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
      { label: "Landscaping & Snow Removal", href: "/landscaping-snow-removal-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    role: "industry",
    links: [
      { label: "Manufacturing", href: "/manufacturing-insurance/" },
      { label: "Cannabis Producer", href: "/cannabis-producer-insurance/" },
      { label: "Product Recall", href: "/product-recall-insurance/" },
      { label: "Warehousing", href: "/warehousing-insurance/" },
      { label: "Business Interruption", href: "/business-interruption-insurance/" },
    ],
  },
  {
    id: "hospitality-restaurants",
    title: "Hospitality & Restaurants",
    role: "industry",
    links: [
      { label: "Restaurants", href: "/restaurant-insurance/" },
      { label: "Food Truck / Trailer", href: "/food-truck-insurance/" },
      { label: "Hotel / Motel", href: "/hotel-motel-insurance/" },
      { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
    ],
  },
  {
    id: "retail-grocery",
    title: "Retail & Grocery",
    role: "industry",
    links: [
      { label: "Retail", href: "/retail-insurance/" },
      { label: "Convenience / Gas", href: "/convenience-store-insurance/" },
      { label: "Grocery / Specialty Food & Bakery", href: "/grocery-specialty-food-insurance/" },
      { label: "Cannabis Retail", href: "/cannabis-retail-insurance/" },
      { label: "Small Business", href: "/small-business-insurance/" },
    ],
  },
  {
    id: "transportation-trucking",
    title: "Transportation & Trucking",
    role: "industry",
    links: [
      { label: "Commercial Auto / Fleet", href: "/commercial-auto-insurance/" },
      { label: "Trucking", href: "/trucking-insurance/" },
      { label: "Dump Truck", href: "/dump-truck-insurance/" },
      { label: "Cargo / Freight", href: "/cargo-freight-insurance/" },
      { label: "Garage / Dealership", href: "/garage-dealership-insurance/" },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    role: "industry",
    links: [
      { label: "Professional Offices", href: "/professional-offices-insurance/" },
      { label: "Professional Liability / E&O", href: "/professional-liability-insurance/" },
      { label: "D&O", href: "/directors-officers-insurance/" },
      { label: "Cyber", href: "/cyber-insurance/" },
      { label: "Crime / Fidelity", href: "/crime-fidelity-insurance/" },
      { label: "Employment Practices Liability", href: "/employment-practices-liability-insurance/" },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    role: "industry",
    links: [
      { label: "Real Estate", href: "/real-estate-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Property Management", href: "/property-management-insurance/" },
      { label: "Condo Corporation", href: "/condominium-corporation-insurance/" },
    ],
  },
  {
    id: "healthcare-wellness",
    title: "Healthcare & Wellness",
    role: "industry",
    links: [
      { label: "Medical / Dental", href: "/medical-dental-insurance/" },
      { label: "Pharmacy", href: "/pharmacy-insurance/" },
      { label: "Fitness / Gym", href: "/fitness-gym-insurance/" },
      { label: "Salon / Barber", href: "/salon-barber-insurance/" },
    ],
  },
  {
    id: "specialty-community",
    title: "Specialty & Community",
    role: "industry",
    links: [
      { label: "Non-Profit", href: "/non-profit-insurance/" },
      { label: "Religious Organizations", href: "/religious-organizations-insurance/" },
      { label: "Daycare / School", href: "/daycare-private-school-insurance/" },
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture",
    role: "industry",
    links: [
      { label: "Farm Insurance", href: "/farm-insurance/" },
      { label: "Crop Insurance", href: "/crop-insurance/" },
      { label: "Livestock / Animal Insurance", href: "/livestock-insurance/" },
      { label: "Greenhouse & Nursery", href: "/greenhouse-agribusiness-insurance/" },
      { label: "Farm Equipment Coverage", href: "/farm-equipment-insurance/" },
    ],
  },
];

/**
 * Homepage commercial discovery still uses the original eight industries
 * plus Specialty & Community as a secondary control — Agriculture remains
 * nav-only under Business until homepage discovery is expanded separately.
 */
const HOMEPAGE_DISCOVERY_EXCLUDE = new Set(["agriculture"]);

/** Eight classic industries for homepage discovery (excludes Agriculture). */
export const businessNavIndustries = businessNavCategories.filter(
  (c) =>
    c.id !== "specialty-community" && !HOMEPAGE_DISCOVERY_EXCLUDE.has(c.id),
);

/** Specialty & Community — still a secondary homepage discovery control. */
export const businessNavSpecialtyGroup = businessNavCategories.find(
  (c) => c.id === "specialty-community",
)!;
