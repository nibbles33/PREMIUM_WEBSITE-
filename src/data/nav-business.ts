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

/** Grouped business mega-menu — existing line pages link directly; others route to quote or broker intake. */
export const businessNavClusters: BusinessNavCluster[] = [
  {
    title: "Commercial Hub",
    links: [
      { label: "Commercial Insurance", href: "/commercial-insurance/" },
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Bonding Insurance", href: "/bonding-insurance/" },
      { label: "Small Business", href: `${QUOTE_BUSINESS}` },
      { label: "Business Interruption", href: `${QUOTE_BUSINESS}` },
    ],
  },
  {
    title: "Transportation & Fleet",
    links: [
      { label: "Commercial Auto / Fleet", href: "/commercial-auto-insurance/" },
      { label: "Trucking", href: "/trucking-insurance/" },
      { label: "Dump Truck", href: "/dump-truck-insurance/" },
      { label: "Cargo / Freight", href: `${QUOTE_COMMERCIAL_VEHICLES}` },
      { label: "Garage / Dealership", href: `${QUOTE_COMMERCIAL_VEHICLES}` },
    ],
  },
  {
    title: "Construction & Property",
    links: [
      { label: "Contractors", href: "/contractors-insurance/" },
      { label: "Builders & Developers", href: "/builders-developers-insurance/" },
      { label: "Builders Risk", href: `${QUOTE_BUSINESS}` },
      { label: "Warehousing", href: `${QUOTE_BUSINESS}` },
      { label: "Property Management", href: `${QUOTE_BUSINESS}` },
      { label: "Condominium Corporation", href: `${QUOTE_BUSINESS}` },
    ],
  },
  {
    title: "Manufacturing & Industry",
    links: [
      { label: "Manufacturing", href: "/manufacturing-insurance/" },
      { label: "Pollution Liability", href: `${QUOTE_BUSINESS}` },
      { label: "Product Recall", href: `${QUOTE_BUSINESS}` },
    ],
  },
  {
    title: "Hospitality & Retail",
    links: [
      { label: "Restaurants", href: "/restaurant-insurance/" },
      { label: "Food Truck / Trailer", href: "/food-truck-insurance/" },
      { label: "Retail", href: "/retail-insurance/" },
      { label: "Hotel / Motel", href: `${QUOTE_BUSINESS}&businessType=restaurant` },
      { label: "Convenience / Gas", href: `${QUOTE_BUSINESS}` },
      { label: "Grocery / Food / Bakery", href: `${QUOTE_BUSINESS}` },
    ],
  },
  {
    title: "Professional & Real Estate",
    links: [
      { label: "Professional Offices", href: "/professional-offices-insurance/" },
      { label: "Real Estate", href: "/real-estate-insurance/" },
      { label: "D&O", href: `${QUOTE_BUSINESS}&businessType=professional` },
      { label: "Cyber", href: `${QUOTE_BUSINESS}&businessType=professional` },
      { label: "Professional Liability / E&O", href: `${QUOTE_BUSINESS}&businessType=professional` },
      { label: "Landscaping & Snow Removal", href: `${QUOTE_BUSINESS}&businessType=contractor` },
    ],
  },
  {
    title: "Specialty & Community",
    links: [
      { label: "Medical / Dental", href: `${QUOTE_BUSINESS}&businessType=professional` },
      { label: "Pharmacy", href: `${QUOTE_BUSINESS}` },
      { label: "Fitness / Gym", href: `${QUOTE_BUSINESS}` },
      { label: "Salon / Barber", href: `${QUOTE_BUSINESS}` },
      { label: "Non-Profit", href: `${QUOTE_BUSINESS}` },
      { label: "Religious Organizations", href: `${QUOTE_BUSINESS}` },
      { label: "Daycare / School", href: `${QUOTE_BUSINESS}` },
      { label: "Event Liability", href: `${QUOTE_BUSINESS}` },
      { label: "Liquor Liability", href: `${QUOTE_BUSINESS}&businessType=restaurant` },
      { label: "Crime / Fidelity", href: `${QUOTE_BUSINESS}` },
      { label: "Employment Practices Liability", href: `${QUOTE_BUSINESS}` },
    ],
  },
];
