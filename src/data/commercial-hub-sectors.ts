import {
  commercialHubCategories,
  commercialIndustryTiles,
} from "@/data/commercial-industries";
import { commercialHubRelatedLinks } from "@/data/commercial-hub-related";
import { businessNavCategories, type NavLink } from "@/data/nav-business";

/**
 * Unpublished Batch A routes (PR #63). Never emit these from the hub index.
 */
const UNPUBLISHED_COMMERCIAL_ROUTES = new Set([
  "/apartment-building-insurance/",
  "/commercial-landlord-insurance/",
  "/commercial-umbrella-insurance/",
  "/electrical-contractors-insurance/",
  "/equipment-breakdown-insurance/",
  "/excavation-contractors-insurance/",
  "/mixed-use-property-insurance/",
  "/plumbing-hvac-insurance/",
  "/roofing-contractors-insurance/",
  "/tow-truck-insurance/",
]);

export type CommercialHubSectorId =
  | "construction"
  | "manufacturing-logistics"
  | "hospitality"
  | "retail"
  | "transportation"
  | "professional-services"
  | "real-estate"
  | "healthcare-personal-services"
  | "specialty-organizations";

type SectorDefinition = {
  id: CommercialHubSectorId;
  title: string;
  hrefs: readonly string[];
};

/**
 * Products that were missing a direct hub link. Labels and hrefs are resolved
 * from Business navigation — this list only chooses which live routes belong
 * in each sector. Routes already linked from hub category cards, industry
 * tiles, or the related rail are removed at resolve time.
 */
const SECTOR_DEFINITIONS: readonly SectorDefinition[] = [
  {
    id: "construction",
    title: "Construction",
    hrefs: [
      "/landscaping-snow-removal-insurance/",
      "/builders-risk-insurance/",
    ],
  },
  {
    id: "manufacturing-logistics",
    title: "Manufacturing & Logistics",
    hrefs: ["/warehousing-insurance/"],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    hrefs: ["/hotel-motel-insurance/", "/liquor-liability-insurance/"],
  },
  {
    id: "retail",
    title: "Retail",
    hrefs: [
      "/convenience-store-insurance/",
      "/grocery-specialty-food-insurance/",
    ],
  },
  {
    id: "transportation",
    title: "Transportation",
    hrefs: ["/garage-dealership-insurance/"],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    hrefs: ["/employment-practices-liability-insurance/"],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    hrefs: [
      "/property-management-insurance/",
      "/condominium-corporation-insurance/",
    ],
  },
  {
    id: "healthcare-personal-services",
    title: "Healthcare & Personal Services",
    hrefs: [
      "/medical-dental-insurance/",
      "/pharmacy-insurance/",
      "/fitness-gym-insurance/",
      "/salon-barber-insurance/",
    ],
  },
  {
    id: "specialty-organizations",
    title: "Specialty Organizations",
    hrefs: [
      "/non-profit-insurance/",
      "/religious-organizations-insurance/",
      "/daycare-private-school-insurance/",
      "/event-liability-insurance/",
    ],
  },
];

export type CommercialHubSectorLink = NavLink;

export type CommercialHubSector = {
  id: CommercialHubSectorId;
  title: string;
  links: CommercialHubSectorLink[];
};

const navLinksByHref = new Map<string, NavLink>(
  businessNavCategories.flatMap((category) =>
    category.links.map((link) => [link.href, link] as const),
  ),
);

function navLinkForHref(href: string): NavLink {
  const link = navLinksByHref.get(href);
  if (!link) {
    throw new Error(
      `Commercial hub sector index href is not in Business navigation: ${href}`,
    );
  }
  if (UNPUBLISHED_COMMERCIAL_ROUTES.has(link.href)) {
    throw new Error(
      `Commercial hub sector index must not link unpublished route: ${href}`,
    );
  }
  return link;
}

/** Hrefs already present on the hub as category cards, industry tiles, or the related rail. */
export function commercialHubDirectHrefs(): Set<string> {
  return new Set([
    ...commercialHubCategories.map((category) => category.href),
    ...commercialIndustryTiles.map((tile) => tile.href),
    ...commercialHubRelatedLinks.map((link) => link.href),
  ]);
}

/**
 * Sector index inventory. Drops any product that the hub already links so the
 * index does not repeat category cards, industry tiles, or the related rail.
 */
export function resolveCommercialHubSectors(): CommercialHubSector[] {
  const alreadyLinked = commercialHubDirectHrefs();

  return SECTOR_DEFINITIONS.map((sector) => ({
    id: sector.id,
    title: sector.title,
    links: sector.hrefs
      .filter((href) => !alreadyLinked.has(href))
      .map((href) => navLinkForHref(href)),
  })).filter((sector) => sector.links.length > 0);
}
