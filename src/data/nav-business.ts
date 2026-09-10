import { QUOTE_BUSINESS, QUOTE_COMMERCIAL_VEHICLES } from "@/data/commercial-industries";

export type NavLink = {
  label: string;
  href: string;
};

export type BusinessNavCluster = {
  title: string;
  links: NavLink[];
};

export const businessNavHub = {
  label: "Business",
  href: "/commercial-insurance/",
};

/** Grouped business mega-menu — dedicated product pages where available. */
export const businessNavClusters: BusinessNavCluster[] = [
  {
    title: "Commercial Hub",
    links: [
      { label: "Commercial Insurance", href: "/commercial-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Surety Bonds", href: "/bonding-insurance/" },
      { label: "Small Business", href: "/small-business-insurance/" },
      { label: "Business Interruption", href: "/business-interruption-insurance/" },
    ],
  },
  {
    title: "Transportation & Fleet",
    links: [
      { label: "Commercial Auto / Fleet", href: "/commercial-auto-insurance/" },
      { label: "Trucking", href: "/trucking-insurance/" },
      { label: "Dump Truck", href: "/dump-truck-insurance/" },
      { label: "Cargo / Freight", href: "/cargo-freight-insurance/" },
      { label: "Garage / Dealership", href: "/garage-dealership-insurance/" },
    ],
  },
  {
    title: "Construction & Property",
    links: [
      { label: "Contractors", href: "/contractors-insurance/" },
      { label: "Builders & Developers", href: "/builders-developers-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
      { label: "Landscaping & Snow Removal", href: "/landscaping-snow-removal-insurance/" },
      { label: "Warehousing", href: "/warehousing-insurance/" },
      { label: "Property Management", href: "/property-management-insurance/" },
      { label: "Condo Corporation", href: "/condominium-corporation-insurance/" },
    ],
  },
  {
    title: "Manufacturing & Industry",
    links: [
      { label: "Manufacturing", href: "/manufacturing-insurance/" },
      { label: "Cannabis Producer", href: "/cannabis-producer-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
      { label: "Product Recall", href: "/product-recall-insurance/" },
    ],
  },
  {
    title: "Hospitality & Retail",
    links: [
      { label: "Restaurants", href: "/restaurant-insurance/" },
      { label: "Food Truck / Trailer", href: "/food-truck-insurance/" },
      { label: "Hotel / Motel", href: "/hotel-motel-insurance/" },
      { label: "Retail", href: "/retail-insurance/" },
      { label: "Convenience / Gas", href: "/convenience-store-insurance/" },
      { label: "Grocery / Specialty Food & Bakery", href: "/grocery-specialty-food-insurance/" },
      { label: "Cannabis Retail", href: "/cannabis-retail-insurance/" },
    ],
  },
  {
    title: "Professional & Real Estate",
    links: [
      { label: "Professional Offices", href: "/professional-offices-insurance/" },
      { label: "Real Estate", href: "/real-estate-insurance/" },
      { label: "D&O", href: "/directors-officers-insurance/" },
      { label: "Cyber", href: "/cyber-insurance/" },
      { label: "Professional Liability / E&O", href: "/professional-liability-insurance/" },
    ],
  },
  {
    title: "Specialty & Community",
    links: [
      { label: "Medical / Dental", href: "/medical-dental-insurance/" },
      { label: "Pharmacy", href: "/pharmacy-insurance/" },
      { label: "Fitness / Gym", href: "/fitness-gym-insurance/" },
      { label: "Salon / Barber", href: "/salon-barber-insurance/" },
      { label: "Non-Profit", href: "/non-profit-insurance/" },
      { label: "Religious Organizations", href: "/religious-organizations-insurance/" },
      { label: "Daycare / School", href: "/daycare-private-school-insurance/" },
      { label: "Event Liability", href: "/event-liability-insurance/" },
      { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
      { label: "Crime / Fidelity", href: "/crime-fidelity-insurance/" },
      { label: "Employment Practices Liability", href: "/employment-practices-liability-insurance/" },
    ],
  },
];

/** Remaining business nav items that still use quote fallbacks (none in mega-menu after this wave). */
export const businessQuoteFallbacks = {
  QUOTE_BUSINESS,
  QUOTE_COMMERCIAL_VEHICLES,
};
