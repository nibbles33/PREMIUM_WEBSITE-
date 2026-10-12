import {
  getHomepageCategoryProducts,
  HOMEPAGE_SPECIALTY_ID,
  type HomepageCategoryId,
} from "@/data/homepage-category-taxonomy";
import {
  businessNavIndustries,
  businessNavSpecialtyGroup,
  type BusinessNavCategory,
} from "@/data/nav-business";
import { getPageHeroPhotography } from "@/data/photography";

export type FilmstripItem = {
  label: string;
  href: string;
  slug: string;
};

/** All approved Personal products — homepage Personal rail (data-only completeness). */
export const personalFilmstripItems: FilmstripItem[] = [
  { label: "Auto", href: "/auto-insurance/", slug: "auto-insurance" },
  { label: "Home", href: "/home-insurance/", slug: "home-insurance" },
  { label: "Condo", href: "/condo-insurance/", slug: "condo" },
  { label: "Tenant", href: "/tenant-insurance/", slug: "tenant" },
  { label: "Landlord", href: "/landlord-insurance/", slug: "landlord" },
  { label: "Motorcycle", href: "/motorcycle-insurance/", slug: "motorcycle" },
  { label: "Boat", href: "/boat-insurance/", slug: "boat" },
  { label: "Cottage", href: "/cottage-insurance/", slug: "cottage" },
  { label: "Travel", href: "/travel-insurance/", slug: "travel-insurance" },
  {
    label: "Mobile Home",
    href: "/mobile-home-insurance/",
    slug: "mobile-home-insurance",
  },
  {
    label: "Umbrella",
    href: "/personal-umbrella-insurance/",
    slug: "personal-umbrella-insurance",
  },
  {
    label: "Home Sharing",
    href: "/home-sharing-insurance/",
    slug: "home-sharing-insurance",
  },
  { label: "Life", href: "/life-insurance/", slug: "life-insurance" },
  {
    label: "Group Home & Auto",
    href: "/group-home-auto-insurance/",
    slug: "group-home-auto-insurance",
  },
];

export function getFilmstripPhoto(slug: string) {
  return getPageHeroPhotography(slug);
}

export type CommercialCategory = {
  id: HomepageCategoryId;
  label: string;
  /** Optional shorter label for narrow mobile pill buttons. */
  shortLabel?: string;
  description: string;
  photoSlug: string;
  href: string;
  role: "industry" | "specialty_group";
  products: { label: string; href: string }[];
};

/**
 * Homepage-only presentation for each canonical nav-business category.
 * Product lists are never duplicated here — they come from nav-business.
 */
type CommercialPresentation = {
  description: string;
  photoSlug: string;
  href: string;
  shortLabel?: string;
};

const commercialPresentationById: Record<
  HomepageCategoryId,
  CommercialPresentation
> = {
  "construction-contractors": {
    description:
      "General liability, tools, bonds, and project coverage for contractors and trades.",
    photoSlug: "contractors-insurance",
    href: "/contractors-insurance/",
    shortLabel: "Construction",
  },
  manufacturing: {
    description:
      "Production facilities, warehousing, licensed cannabis production, and industrial coverage.",
    photoSlug: "manufacturing-insurance",
    href: "/manufacturing-insurance/",
  },
  "hospitality-restaurants": {
    description:
      "Restaurants, hotels, food trucks, liquor liability, and hospitality events.",
    photoSlug: "restaurant-insurance",
    href: "/restaurant-insurance/",
    shortLabel: "Hospitality",
  },
  "retail-grocery": {
    description:
      "Storefronts, grocery, convenience, and licensed cannabis retail operations.",
    photoSlug: "retail-insurance",
    href: "/retail-insurance/",
    shortLabel: "Retail",
  },
  "transportation-trucking": {
    description:
      "Trucking, commercial auto, cargo, and garage coverage for Windsor-Essex operators.",
    photoSlug: "commercial-auto-insurance",
    href: "/commercial-auto-insurance/",
    shortLabel: "Transportation",
  },
  "professional-services": {
    description:
      "Offices, professional liability, cyber, crime, and employment practices coverage.",
    photoSlug: "professional-offices-insurance",
    href: "/professional-offices-insurance/",
    shortLabel: "Professional",
  },
  "real-estate": {
    description:
      "Real estate operations, commercial property, property management, and condo corporations.",
    photoSlug: "real-estate-insurance",
    href: "/real-estate-insurance/",
  },
  "healthcare-wellness": {
    description:
      "Medical, dental, pharmacy, fitness, and salon operations.",
    photoSlug: "medical-dental-insurance",
    href: "/medical-dental-insurance/",
    shortLabel: "Healthcare",
  },
  "specialty-community": {
    description:
      "Non-profits, religious organizations, daycares, and private schools.",
    photoSlug: "non-profit-insurance",
    href: "/non-profit-insurance/",
    shortLabel: "Specialty",
  },
};

function buildCommercialCategory(
  category: BusinessNavCategory,
): CommercialCategory {
  const presentation = commercialPresentationById[category.id];
  if (!presentation) {
    throw new Error(`Missing homepage presentation for ${category.id}`);
  }
  return {
    id: category.id,
    label: category.title,
    shortLabel: presentation.shortLabel,
    description: presentation.description,
    photoSlug: presentation.photoSlug,
    href: presentation.href,
    role: category.role,
    products: getHomepageCategoryProducts(category.id),
  };
}

/** Eight primary industries in approved Business-nav order. */
export const commercialIndustryCategories: CommercialCategory[] =
  businessNavIndustries.map(buildCommercialCategory);

/**
 * Specialty & Community — secondary homepage discovery control.
 * In the Business mega-menu it is a full industry; homepage keeps it separate.
 */
export const commercialSpecialtyCategory: CommercialCategory = {
  ...buildCommercialCategory(businessNavSpecialtyGroup),
  role: "specialty_group",
};

/** All discovery categories (industries first, specialty last). */
export const commercialCategories: CommercialCategory[] = [
  ...commercialIndustryCategories,
  commercialSpecialtyCategory,
];

export { HOMEPAGE_SPECIALTY_ID };

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
  { slot: "valuable", label: "Personal Umbrella", href: "/personal-umbrella-insurance/", x: 78, y: 30, width: 72, layer: 2 },
  { slot: "semi-truck", label: "Trucking", href: "/trucking-insurance/", x: 12, y: 78, width: 95, layer: 3 },
  { slot: "restaurant", label: "Restaurant", href: "/restaurant-insurance/", x: 48, y: 78, width: 82, layer: 2 },
  { slot: "warehouse", label: "Warehouse", href: "/warehousing-insurance/", x: 72, y: 72, width: 88, layer: 1 },
  { slot: "greenhouse", label: "Greenhouse", href: "/greenhouse-agribusiness-insurance/", x: 88, y: 48, width: 68, layer: 2 },
  { slot: "contractor", label: "Contractors", href: "/contractors-insurance/", x: 30, y: 82, width: 78, layer: 1 },
  { slot: "retail", label: "Retail", href: "/retail-insurance/", x: 58, y: 18, width: 74, layer: 1 },
];

export const breadthMobileItems = breadthItems.slice(0, 8);

export type CoverageStreamItem = {
  label: string;
  href: string;
  photoSlug: string;
};

/** Multi-lane Yep section — photography-based breadth streams */
export const breadthLanePersonal: CoverageStreamItem[] = [
  { label: "Auto", href: "/auto-insurance/", photoSlug: "auto-insurance" },
  { label: "Home", href: "/home-insurance/", photoSlug: "home-insurance" },
  { label: "Condo", href: "/condo-insurance/", photoSlug: "condo" },
  { label: "Boat", href: "/boat-insurance/", photoSlug: "boat" },
  { label: "Motorcycle", href: "/motorcycle-insurance/", photoSlug: "motorcycle" },
  { label: "Cottage", href: "/cottage-insurance/", photoSlug: "cottage" },
  { label: "Tenant", href: "/tenant-insurance/", photoSlug: "tenant" },
  { label: "Travel", href: "/travel-insurance/", photoSlug: "travel-insurance" },
];

export const breadthLaneSpecialty: CoverageStreamItem[] = [
  { label: "Events", href: "/event-liability-insurance/", photoSlug: "event-liability-insurance" },
  { label: "Personal Umbrella", href: "/personal-umbrella-insurance/", photoSlug: "personal-umbrella-insurance" },
  { label: "Landlord", href: "/landlord-insurance/", photoSlug: "landlord" },
  { label: "Surety Bonds", href: "/bonding-insurance/", photoSlug: "bonding-insurance" },
  { label: "Dump Truck", href: "/dump-truck-insurance/", photoSlug: "dump-truck-insurance" },
  { label: "Greenhouse", href: "/greenhouse-agribusiness-insurance/", photoSlug: "greenhouse" },
  { label: "Real Estate", href: "/real-estate-insurance/", photoSlug: "real-estate-insurance" },
  { label: "Builders", href: "/builders-developers-insurance/", photoSlug: "builders-developers-insurance" },
];

/** Yep pass #2 — two-lane breadth streams */
export const yepLanePersonal: CoverageStreamItem[] = [
  { label: "Auto", href: "/auto-insurance/", photoSlug: "auto-insurance" },
  { label: "Home", href: "/home-insurance/", photoSlug: "home-insurance" },
  { label: "Boat", href: "/boat-insurance/", photoSlug: "boat" },
  { label: "Motorcycle", href: "/motorcycle-insurance/", photoSlug: "motorcycle" },
  { label: "Cottage", href: "/cottage-insurance/", photoSlug: "cottage" },
  { label: "Tenant", href: "/tenant-insurance/", photoSlug: "tenant" },
  { label: "Wedding / Event", href: "/event-liability-insurance/", photoSlug: "event-liability-insurance" },
  { label: "Personal Umbrella", href: "/personal-umbrella-insurance/", photoSlug: "personal-umbrella-insurance" },
];

export const yepLaneCommercial: CoverageStreamItem[] = [
  { label: "Trucking", href: "/trucking-insurance/", photoSlug: "trucking-insurance" },
  { label: "Contractors", href: "/contractors-insurance/", photoSlug: "contractors-insurance" },
  { label: "Small Business", href: "/small-business-insurance/", photoSlug: "small-business-insurance" },
  { label: "Professional Liability", href: "/professional-liability-insurance/", photoSlug: "professional-liability-insurance" },
  { label: "Restaurant", href: "/restaurant-insurance/", photoSlug: "restaurant-insurance" },
  { label: "Manufacturing", href: "/manufacturing-insurance/", photoSlug: "manufacturing-insurance" },
  { label: "Warehouse", href: "/warehousing-insurance/", photoSlug: "warehousing-insurance" },
  { label: "Farm", href: "/farm-insurance/", photoSlug: "farm-insurance" },
  { label: "Greenhouse", href: "/greenhouse-agribusiness-insurance/", photoSlug: "greenhouse" },
  { label: "Retail", href: "/retail-insurance/", photoSlug: "retail-insurance" },
];

/** Single-lane Yep carousel — personal + commercial breadth */
export const yepCarouselItems: CoverageStreamItem[] = [
  { label: "Auto", href: "/auto-insurance/", photoSlug: "auto-insurance" },
  { label: "Home", href: "/home-insurance/", photoSlug: "home-insurance" },
  { label: "Boat", href: "/boat-insurance/", photoSlug: "boat" },
  { label: "Motorcycle", href: "/motorcycle-insurance/", photoSlug: "motorcycle" },
  { label: "Cottage", href: "/cottage-insurance/", photoSlug: "cottage" },
  { label: "Tenant", href: "/tenant-insurance/", photoSlug: "tenant" },
  { label: "Wedding / Event", href: "/event-liability-insurance/", photoSlug: "event-liability-insurance" },
  { label: "Personal Umbrella", href: "/personal-umbrella-insurance/", photoSlug: "personal-umbrella-insurance" },
  { label: "Trucking", href: "/trucking-insurance/", photoSlug: "trucking-insurance" },
  { label: "Contractors", href: "/contractors-insurance/", photoSlug: "contractors-insurance" },
  { label: "Small Business", href: "/small-business-insurance/", photoSlug: "small-business-insurance" },
  { label: "Professional Liability", href: "/professional-liability-insurance/", photoSlug: "professional-liability-insurance" },
  { label: "Restaurant", href: "/restaurant-insurance/", photoSlug: "restaurant-insurance" },
  { label: "Manufacturing", href: "/manufacturing-insurance/", photoSlug: "manufacturing-insurance" },
  { label: "Warehouse", href: "/warehousing-insurance/", photoSlug: "warehousing-insurance" },
  { label: "Farm", href: "/farm-insurance/", photoSlug: "farm-insurance" },
  { label: "Greenhouse", href: "/greenhouse-agribusiness-insurance/", photoSlug: "greenhouse" },
  { label: "Retail", href: "/retail-insurance/", photoSlug: "retail-insurance" },
];

export type AwardBadge = {
  src: string;
  alt: string;
  label: string;
  year: string;
  source?: string;
};

export const pilotAwardBadges: AwardBadge[] = [
  {
    src: "/images/awards/award-windsor-platinum-2024.png",
    alt: "Windsor Community Vote Platinum Winner 2024",
    label: "Platinum Winner",
    year: "2024",
  },
  {
    src: "/images/awards/award-windsor-gold-2026.png",
    alt: "Windsor Community Vote Gold Winner 2026",
    label: "Gold Winner",
    year: "2026",
  },
  {
    src: "/images/awards/award-windsor-platinum-2023.png",
    alt: "Windsor Community Vote Platinum Winner 2023",
    label: "Platinum Winner",
    year: "2023",
  },
  {
    src: "/images/awards/award-windsor-platinum-2022.png",
    alt: "Windsor Community Vote Platinum Winner 2022",
    label: "Platinum Winner",
    year: "2022",
  },
  {
    src: "/images/awards/award-windsor-platinum-2021.png",
    alt: "Windsor Community Vote Platinum Winner 2021",
    label: "Platinum Winner",
    year: "2021",
  },
  {
    src: "/images/awards/award-5star-brokerage-ontario-2022.png",
    alt: "Insurance Business Canada 5-Star Brokerage Ontario 2022",
    label: "5-Star Brokerage, Ontario",
    year: "2022",
    source: "Insurance Business Canada",
  },
  {
    src: "/images/awards/award-5star-brokerage-2021.png",
    alt: "Insurance Business Canada 5-Star Brokerage 2021",
    label: "5-Star Brokerage",
    year: "2021",
    source: "Insurance Business Canada",
  },
  {
    src: "/images/awards/award-fast-brokerages-2024.png",
    alt: "Insurance Business Canada Fast Brokerages 2024",
    label: "Fast Brokerages",
    year: "2024",
    source: "Insurance Business Canada",
  },
];
