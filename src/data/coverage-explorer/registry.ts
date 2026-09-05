import { buildRouteExplorerConfig } from "@/data/coverage-explorer/buildRouteExplorerConfig";
import { ROUTE_TO_INTERACTIVE_MASTER_FILE } from "@/data/coverage-explorer/interactive-master-assets";
import type { CoverageVisualFamily, CoverageExplorerVisualConfig } from "@/types/coverage-explorer";
import { boatExplorer } from "@/data/coverage-explorer/families/boat";
import { commercialBuildingExplorer } from "@/data/coverage-explorer/families/commercial-building";
import { constructionExplorer } from "@/data/coverage-explorer/families/construction";
import { factoryIndustrialExplorer } from "@/data/coverage-explorer/families/factory-industrial";
import { farmExplorer } from "@/data/coverage-explorer/families/farm";
import { fleetCommercialVehicleExplorer } from "@/data/coverage-explorer/families/fleet-commercial-vehicle";
import { garageDealershipExplorer } from "@/data/coverage-explorer/families/garage-dealership";
import { greenhouseExplorer } from "@/data/coverage-explorer/families/greenhouse";
import { houseExplorer } from "@/data/coverage-explorer/families/house";
import { restaurantHospitalityExplorer } from "@/data/coverage-explorer/families/restaurant-hospitality";
import { retailExplorer } from "@/data/coverage-explorer/families/retail";
import { transportTruckExplorer } from "@/data/coverage-explorer/families/transport-truck";

/** Product slug → visual family (many slugs share one scene architecture). */
export const SLUG_TO_VISUAL_FAMILY: Record<string, CoverageVisualFamily> = {
  "home-insurance": "house",
  "landlord-insurance": "house",
  "cottage-insurance": "house",
  "tenant-insurance": "house",
  "mobile-home-insurance": "house",
  "home-sharing-insurance": "house",
  "group-home-auto-insurance": "house",
  "condo-insurance": "condo",
  "boat-insurance": "boat",
  "restaurant-insurance": "restaurant-hospitality",
  "food-truck-insurance": "restaurant-hospitality",
  "hotel-motel-insurance": "restaurant-hospitality",
  "grocery-specialty-food-insurance": "restaurant-hospitality",
  "convenience-store-insurance": "restaurant-hospitality",
  "garage-dealership-insurance": "garage-dealership",
  "trucking-insurance": "transport-truck",
  "cargo-freight-insurance": "transport-truck",
  "commercial-auto-insurance": "fleet-commercial-vehicle",
  "dump-truck-insurance": "fleet-commercial-vehicle",
  "greenhouse-agribusiness-insurance": "greenhouse",
  "farm-insurance": "farm",
  "commercial-property-insurance": "commercial-building",
  "business-interruption-insurance": "commercial-building",
  "property-management-insurance": "commercial-building",
  "real-estate-insurance": "commercial-building",
  "condominium-corporation-insurance": "commercial-building",
  "contractors-insurance": "construction",
  "builders-risk-insurance": "construction",
  "builders-developers-insurance": "construction",
  "landscaping-snow-removal-insurance": "construction",
  "manufacturing-insurance": "factory-industrial",
  "product-recall-insurance": "factory-industrial",
  "warehousing-insurance": "factory-industrial",
  "retail-insurance": "retail",
};

const FAMILY_EXPLORERS: Partial<Record<CoverageVisualFamily, CoverageExplorerVisualConfig>> = {
  house: houseExplorer,
  boat: boatExplorer,
  "restaurant-hospitality": restaurantHospitalityExplorer,
  "commercial-building": commercialBuildingExplorer,
  construction: constructionExplorer,
  "factory-industrial": factoryIndustrialExplorer,
  farm: farmExplorer,
  "fleet-commercial-vehicle": fleetCommercialVehicleExplorer,
  "garage-dealership": garageDealershipExplorer,
  greenhouse: greenhouseExplorer,
  retail: retailExplorer,
  "transport-truck": transportTruckExplorer,
};

/** Families with explorer config implemented. */
export const IMPLEMENTED_VISUAL_FAMILIES = Object.keys(
  FAMILY_EXPLORERS,
) as CoverageVisualFamily[];

export function getVisualFamilyForSlug(slug: string): CoverageVisualFamily | null {
  return SLUG_TO_VISUAL_FAMILY[slug] ?? null;
}

export function getCoverageExplorerConfig(
  slug: string,
  coverageIds: string[] = [],
): CoverageExplorerVisualConfig | null {
  if (!ROUTE_TO_INTERACTIVE_MASTER_FILE[slug]) return null;
  return buildRouteExplorerConfig(slug, coverageIds);
}

/** All 58 live routes with interactive master assets. */
export const INTERACTIVE_MASTER_ROUTE_SLUGS = Object.keys(
  ROUTE_TO_INTERACTIVE_MASTER_FILE,
);

/** All slugs mapped to each family — for audit/reporting. */
export function getSlugFamilyAudit(): Record<CoverageVisualFamily, string[]> {
  const audit = {} as Record<CoverageVisualFamily, string[]>;
  for (const [slug, family] of Object.entries(SLUG_TO_VISUAL_FAMILY)) {
    if (!audit[family]) audit[family] = [];
    audit[family].push(slug);
  }
  return audit;
}

/** Families still awaiting dedicated scene artwork. */
export const ASSET_GAP_FAMILIES: CoverageVisualFamily[] = ["condo"];
