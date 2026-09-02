export type PhotographyConfidence = "HIGH" | "MEDIUM" | "LOW";

export type PhotographyPlacement = {
  slug: string;
  category: "personal" | "commercial" | "special";
  route: string;
  src: string;
  alt: string;
  confidence: PhotographyConfidence;
  /** Temporary AI-generated image — replace with authentic photography later. */
  isTemporary?: boolean;
  temporaryNote?: string;
};

const TEMPORARY_NOTE =
  "Temporary AI-generated image — replace with authentic Premium Insurance Brokers photography.";

/** Production photography wired from visual audit (HIGH + reviewed MEDIUM). */
export const photographyPlacements: PhotographyPlacement[] = [
  {
    slug: "auto-insurance",
    category: "personal",
    route: "/auto-insurance/",
    src: "/images/photography/personal/auto-insurance.webp",
    alt: "SUV driving through a quiet suburban neighbourhood",
    confidence: "HIGH",
  },
  {
    slug: "home-insurance",
    category: "personal",
    route: "/home-insurance/",
    src: "/images/photography/personal/home-insurance.webp",
    alt: "Family walking from their car toward their suburban home with groceries",
    confidence: "HIGH",
  },
  {
    slug: "condo",
    category: "personal",
    route: "/get-a-quote?type=home&homeType=condo",
    src: "/images/photography/personal/condo.webp",
    alt: "Modern multi-story condominium building with balconies",
    confidence: "HIGH",
  },
  {
    slug: "tenant",
    category: "personal",
    route: "/get-a-quote?type=home&homeType=tenant",
    src: "/images/photography/personal/tenant.webp",
    alt: "Home office with built-in shelving and natural light",
    confidence: "MEDIUM",
  },
  {
    slug: "landlord",
    category: "personal",
    route: "/get-a-quote?type=home&homeType=landlord",
    src: "/images/photography/personal/landlord.webp",
    alt: "Well-maintained residential property in a quiet community",
    confidence: "MEDIUM",
  },
  {
    slug: "cottage",
    category: "personal",
    route: "/get-a-quote?type=home&homeType=cottage",
    src: "/images/photography/personal/cottage.webp",
    alt: "Rustic lakeside cottage with dock and forest backdrop",
    confidence: "HIGH",
  },
  {
    slug: "motorcycle",
    category: "personal",
    route: "/get-a-quote?type=vehicle&vehicleType=motorcycle",
    src: "/images/photography/personal/motorcycle.webp",
    alt: "Motorcyclist riding on a rural road past farmland",
    confidence: "HIGH",
  },
  {
    slug: "boat",
    category: "personal",
    route: "/get-a-quote?type=vehicle&vehicleType=boat",
    src: "/images/photography/personal/boat.webp",
    alt: "Powerboat cruising on calm Ontario water",
    confidence: "HIGH",
  },
  {
    slug: "travel-insurance",
    category: "personal",
    route: "/get-a-quote?type=travel",
    src: "/images/photography/personal/travel-insurance.webp",
    alt: "Traveller with luggage in a bright airport terminal",
    confidence: "HIGH",
  },
  {
    slug: "commercial-insurance",
    category: "commercial",
    route: "/commercial-insurance/",
    src: "/images/photography/commercial/commercial-insurance.webp",
    alt: "Modern office reception and open workspace",
    confidence: "MEDIUM",
  },
  {
    slug: "commercial-auto-insurance",
    category: "commercial",
    route: "/commercial-auto-insurance/",
    src: "/images/photography/commercial/commercial-auto-insurance.webp",
    alt: "Commercial building with a fleet of white vans in the lot",
    confidence: "HIGH",
  },
  {
    slug: "trucking-insurance",
    category: "commercial",
    route: "/trucking-insurance/",
    src: "/images/photography/commercial/trucking-insurance.webp",
    alt: "Semi-trailer truck on a rural highway",
    confidence: "HIGH",
  },
  {
    slug: "contractors-insurance",
    category: "commercial",
    route: "/contractors-insurance/",
    src: "/images/photography/commercial/contractors-insurance.webp",
    alt: "Construction worker framing a building on site",
    confidence: "HIGH",
  },
  {
    slug: "builders-developers-insurance",
    category: "commercial",
    route: "/builders-developers-insurance/",
    src: "/images/photography/commercial/builders-developers-insurance.webp",
    alt: "Construction supervisors reviewing a multi-story building project",
    confidence: "HIGH",
  },
  {
    slug: "manufacturing-insurance",
    category: "commercial",
    route: "/manufacturing-insurance/",
    src: "/images/photography/commercial/manufacturing-insurance.webp",
    alt: "Machinist inspecting parts beside a CNC machine on the factory floor",
    confidence: "HIGH",
  },
  {
    slug: "commercial-property-insurance",
    category: "commercial",
    route: "/commercial-property-insurance/",
    src: "/images/photography/commercial/commercial-property-insurance.webp",
    alt: "Commercial warehouse with office frontage and shipping pallets",
    confidence: "HIGH",
  },
  {
    slug: "restaurant-insurance",
    category: "commercial",
    route: "/restaurant-insurance/",
    src: "/images/photography/commercial/restaurant-insurance.webp",
    alt: "Chefs preparing food in a busy commercial kitchen",
    confidence: "HIGH",
  },
  {
    slug: "food-truck-insurance",
    category: "commercial",
    route: "/food-truck-insurance/",
    src: "/images/photography/commercial/food-truck-insurance.webp",
    alt: "Food truck serving customers with outdoor seating",
    confidence: "HIGH",
  },
  {
    slug: "retail-insurance",
    category: "commercial",
    route: "/retail-insurance/",
    src: "/images/photography/commercial/retail-insurance.webp",
    alt: "Downtown main-street retail storefronts on a sunny day",
    confidence: "HIGH",
  },
  {
    slug: "professional-offices-insurance",
    category: "commercial",
    route: "/professional-offices-insurance/",
    src: "/images/photography/commercial/professional-offices-insurance.webp",
    alt: "Business professionals collaborating in a modern conference room",
    confidence: "HIGH",
  },
  {
    slug: "real-estate-insurance",
    category: "commercial",
    route: "/real-estate-insurance/",
    src: "/images/photography/commercial/real-estate-insurance.webp",
    alt: "Professionals reviewing architectural blueprints at a desk",
    confidence: "MEDIUM",
  },
  {
    slug: "farm-insurance",
    category: "commercial",
    route: "/farm-insurance/",
    src: "/images/photography/commercial/farm-insurance.webp",
    alt: "Tractor cultivating a field with farm buildings and silos",
    confidence: "HIGH",
  },
  {
    slug: "dump-truck-insurance",
    category: "commercial",
    route: "/dump-truck-insurance/",
    src: "/images/photography/commercial/dump-truck-insurance.webp",
    alt: "Dump truck at a gravel construction site",
    confidence: "HIGH",
  },
  {
    slug: "bonding-insurance",
    category: "commercial",
    route: "/bonding-insurance/",
    src: "/images/photography/commercial/bonding-insurance.webp",
    alt: "Construction supervisors at an active building site",
    confidence: "MEDIUM",
  },
  {
    slug: "greenhouse",
    category: "commercial",
    route: "/get-a-quote?type=business&industry=greenhouse",
    src: "/images/photography/commercial/greenhouse.webp",
    alt: "Commercial greenhouse with hydroponic herb rows",
    confidence: "HIGH",
  },
  {
    slug: "about",
    category: "special",
    route: "/about/",
    src: "/images/photography/special/about.webp",
    alt: "Broker meeting with a client in a professional office",
    confidence: "HIGH",
    isTemporary: true,
    temporaryNote: TEMPORARY_NOTE,
  },
  {
    slug: "team",
    category: "special",
    route: "/team/",
    src: "/images/photography/special/team.webp",
    alt: "Team of professionals in a collaborative office meeting",
    confidence: "HIGH",
    isTemporary: true,
    temporaryNote: TEMPORARY_NOTE,
  },
  {
    slug: "contact",
    category: "special",
    route: "/contact/",
    src: "/images/photography/special/contact.webp",
    alt: "Professional consultation at an office table",
    confidence: "HIGH",
  },
];

export function getPhotographyBySlug(
  slug: string,
): PhotographyPlacement | undefined {
  return photographyPlacements.find((placement) => placement.slug === slug);
}

/** Returns wired photography for page routes (HIGH confidence only). */
export function getPageHeroPhotography(
  slug: string,
): PhotographyPlacement | undefined {
  const placement = getPhotographyBySlug(slug);
  if (!placement || placement.confidence === "LOW") {
    return undefined;
  }
  return placement;
}
