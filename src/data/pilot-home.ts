import { getPageHeroPhotography } from "@/data/photography";

export type FilmstripItem = {
  label: string;
  href: string;
  slug: string;
};

export const personalFilmstripItems: FilmstripItem[] = [
  { label: "Auto", href: "/auto-insurance/", slug: "auto-insurance" },
  { label: "Home", href: "/home-insurance/", slug: "home-insurance" },
  { label: "Condo", href: "/condo-insurance/", slug: "condo" },
  { label: "Tenant", href: "/tenant-insurance/", slug: "tenant" },
  { label: "Motorcycle", href: "/motorcycle-insurance/", slug: "motorcycle" },
  { label: "Boat", href: "/boat-insurance/", slug: "boat" },
  { label: "Cottage", href: "/cottage-insurance/", slug: "cottage" },
  { label: "Travel", href: "/travel-insurance/", slug: "travel-insurance" },
];

export function getFilmstripPhoto(slug: string) {
  return getPageHeroPhotography(slug);
}

export type CommercialCategory = {
  id: string;
  label: string;
  description: string;
  photoSlug: string;
  href: string;
  products: { label: string; href: string }[];
};

export const commercialCategories: CommercialCategory[] = [
  {
    id: "transportation",
    label: "Transportation",
    description:
      "Trucking, commercial auto, cargo, and fleet coverage for Windsor-Essex operators.",
    photoSlug: "trucking-insurance",
    href: "/commercial-auto-insurance/",
    products: [
      { label: "Trucking", href: "/trucking-insurance/" },
      { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
      { label: "Dump Trucks", href: "/dump-truck-insurance/" },
      { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
    ],
  },
  {
    id: "construction",
    label: "Construction",
    description:
      "General liability, tools, and project coverage for contractors and trades.",
    photoSlug: "contractors-insurance",
    href: "/contractors-insurance/",
    products: [
      { label: "Contractors", href: "/contractors-insurance/" },
      { label: "Builders & Developers", href: "/builders-developers-insurance/" },
      { label: "Builder's Risk", href: "/builders-risk-insurance/" },
    ],
  },
  {
    id: "property",
    label: "Property",
    description:
      "Buildings, contents, and income protection for business property.",
    photoSlug: "commercial-property-insurance",
    href: "/commercial-property-insurance/",
    products: [
      { label: "Commercial Property", href: "/commercial-property-insurance/" },
      { label: "Property Management", href: "/property-management-insurance/" },
      { label: "Condominium Corporations", href: "/condominium-corporation-insurance/" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    description:
      "Production facilities, equipment, and product liability for manufacturers.",
    photoSlug: "manufacturing-insurance",
    href: "/manufacturing-insurance/",
    products: [
      { label: "Manufacturing", href: "/manufacturing-insurance/" },
      { label: "Product Recall", href: "/product-recall-insurance/" },
      { label: "Pollution Liability", href: "/pollution-liability-insurance/" },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    description:
      "Restaurants, hotels, food trucks, and food service operations.",
    photoSlug: "restaurant-insurance",
    href: "/restaurant-insurance/",
    products: [
      { label: "Restaurants", href: "/restaurant-insurance/" },
      { label: "Food Trucks", href: "/food-truck-insurance/" },
      { label: "Hotels & Motels", href: "/hotel-motel-insurance/" },
      { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
    ],
  },
  {
    id: "professional",
    label: "Professional",
    description:
      "Offices, directors & officers, and professional liability coverage.",
    photoSlug: "professional-offices-insurance",
    href: "/professional-offices-insurance/",
    products: [
      { label: "Professional Offices", href: "/professional-offices-insurance/" },
      { label: "Directors & Officers", href: "/directors-officers-insurance/" },
      { label: "Professional Liability", href: "/professional-liability-insurance/" },
    ],
  },
  {
    id: "retail",
    label: "Retail",
    description:
      "Storefronts, inventory, and liability for retail operations.",
    photoSlug: "retail-insurance",
    href: "/retail-insurance/",
    products: [
      { label: "Retail", href: "/retail-insurance/" },
      { label: "Convenience Stores", href: "/convenience-store-insurance/" },
      { label: "Garages & Dealerships", href: "/garage-dealership-insurance/" },
    ],
  },
  {
    id: "health",
    label: "Health & Wellness",
    description:
      "Medical, dental, pharmacy, and fitness operations.",
    photoSlug: "professional-offices-insurance",
    href: "/medical-dental-insurance/",
    products: [
      { label: "Medical & Dental", href: "/medical-dental-insurance/" },
      { label: "Pharmacy", href: "/pharmacy-insurance/" },
      { label: "Fitness & Gyms", href: "/fitness-gym-insurance/" },
    ],
  },
  {
    id: "community",
    label: "Community",
    description:
      "Non-profits, religious organizations, and community groups.",
    photoSlug: "commercial-insurance",
    href: "/non-profit-insurance/",
    products: [
      { label: "Non-Profits", href: "/non-profit-insurance/" },
      { label: "Religious Organizations", href: "/religious-organizations-insurance/" },
      { label: "Daycare & Schools", href: "/daycare-private-school-insurance/" },
    ],
  },
  {
    id: "specialty",
    label: "Specialty Risks",
    description:
      "Cyber, crime, bonding, and other specialized commercial coverage.",
    photoSlug: "bonding-insurance",
    href: "/cyber-insurance/",
    products: [
      { label: "Cyber", href: "/cyber-insurance/" },
      { label: "Crime & Fidelity", href: "/crime-fidelity-insurance/" },
      { label: "Bonding", href: "/bonding-insurance/" },
    ],
  },
];

export type BreadthItem = {
  slot: import("@/components/pilot/MiniatureObject").MiniatureSlot;
  label: string;
  href: string;
  /** Position hints for desktop art-directed layout (percentage) */
  x: number;
  y: number;
  width: number;
  layer: number;
};

export const breadthItems: BreadthItem[] = [
  { slot: "car", label: "Auto", href: "/auto-insurance/", x: 8, y: 55, width: 90, layer: 2 },
  { slot: "home", label: "Home", href: "/home-insurance/", x: 22, y: 28, width: 85, layer: 1 },
  { slot: "boat", label: "Boat", href: "/boat-insurance/", x: 38, y: 62, width: 80, layer: 3 },
  { slot: "motorcycle", label: "Motorcycle", href: "/motorcycle-insurance/", x: 52, y: 35, width: 75, layer: 2 },
  { slot: "wedding", label: "Events", href: "/event-liability-insurance/", x: 65, y: 58, width: 70, layer: 1 },
  { slot: "valuable", label: "Personal Valuables", href: "/personal-umbrella-insurance/", x: 78, y: 30, width: 72, layer: 2 },
  { slot: "semi-truck", label: "Trucking", href: "/trucking-insurance/", x: 12, y: 78, width: 95, layer: 3 },
  { slot: "restaurant", label: "Restaurant", href: "/restaurant-insurance/", x: 48, y: 78, width: 82, layer: 2 },
  { slot: "warehouse", label: "Warehouse", href: "/warehousing-insurance/", x: 72, y: 72, width: 88, layer: 1 },
  { slot: "greenhouse", label: "Greenhouse", href: "/farm-insurance/", x: 88, y: 48, width: 68, layer: 2 },
  { slot: "contractor", label: "Contractors", href: "/contractors-insurance/", x: 30, y: 82, width: 78, layer: 1 },
  { slot: "retail", label: "Retail", href: "/retail-insurance/", x: 58, y: 18, width: 74, layer: 1 },
];

export const breadthMobileItems = breadthItems.slice(0, 8);
