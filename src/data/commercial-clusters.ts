import {
  Briefcase,
  Factory,
  HardHat,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  commercialIndustryTiles,
  industryPages,
  QUOTE_BUSINESS,
  QUOTE_COMMERCIAL_VEHICLES,
} from "@/data/commercial-industries";

export type CommercialClusterId =
  | "transportation"
  | "construction"
  | "manufacturing"
  | "hospitality"
  | "professional";

export type CommercialClusterProduct = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export type CommercialCluster = {
  id: CommercialClusterId;
  name: string;
  icon: LucideIcon;
  productLabels: string[];
  quoteHref: string;
  quoteLabel: string;
};

function productFromLabel(label: string): CommercialClusterProduct {
  const tile = commercialIndustryTiles.find((entry) => entry.label === label);
  if (!tile) {
    throw new Error(`Missing commercial industry tile: ${label}`);
  }
  const page = industryPages.find((entry) => tile.href.includes(entry.slug));
  return {
    label: tile.label,
    href: tile.href,
    icon: tile.icon,
    description: page?.subhead ?? "",
  };
}

export const commercialClusters: CommercialCluster[] = [
  {
    id: "transportation",
    name: "Transportation",
    icon: Truck,
    productLabels: [
      "Commercial Auto & Fleets",
      "Trucking",
      "Dump Trucks",
    ],
    quoteHref: QUOTE_COMMERCIAL_VEHICLES,
    quoteLabel: "Get a Commercial Quote",
  },
  {
    id: "construction",
    name: "Construction",
    icon: HardHat,
    productLabels: ["Contractors", "Builders & Developers"],
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Quote",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    productLabels: ["Manufacturing", "Commercial Property"],
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Quote",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: UtensilsCrossed,
    productLabels: ["Restaurants", "Food Trucks & Trailers"],
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Quote",
  },
  {
    id: "professional",
    name: "Professional",
    icon: Briefcase,
    productLabels: [
      "Professional Offices",
      "Real Estate",
      "Retail",
    ],
    quoteHref: QUOTE_BUSINESS,
    quoteLabel: "Get a Commercial Quote",
  },
];

export const DEFAULT_CLUSTER_ID: CommercialClusterId = "transportation";

export function getClusterProducts(
  clusterId: CommercialClusterId,
): CommercialClusterProduct[] {
  const cluster = commercialClusters.find((entry) => entry.id === clusterId);
  if (!cluster) return [];
  return cluster.productLabels.map(productFromLabel);
}

export function getClusterById(
  clusterId: CommercialClusterId,
): CommercialCluster {
  return (
    commercialClusters.find((entry) => entry.id === clusterId) ??
    commercialClusters[0]
  );
}

export function clusterCategoryLabel(count: number): string {
  return count === 1 ? "1 category" : `${count} categories`;
}
