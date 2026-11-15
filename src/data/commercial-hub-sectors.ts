import { businessNavCategories, type NavLink } from "@/data/nav-business";

/**
 * Nine commercial industries on the hub explorer, in Business-nav order.
 * Agriculture stays in its own section and is not part of this directory.
 */
export type CommercialHubSectorId =
  | "construction-contractors"
  | "manufacturing"
  | "hospitality-restaurants"
  | "retail-grocery"
  | "transportation-trucking"
  | "professional-services"
  | "real-estate"
  | "healthcare-wellness"
  | "specialty-community";

const DIRECTORY_IDS: readonly CommercialHubSectorId[] = [
  "construction-contractors",
  "manufacturing",
  "hospitality-restaurants",
  "retail-grocery",
  "transportation-trucking",
  "professional-services",
  "real-estate",
  "healthcare-wellness",
  "specialty-community",
];

export type CommercialHubSectorLink = NavLink;

export type CommercialHubSector = {
  id: CommercialHubSectorId;
  title: string;
  links: CommercialHubSectorLink[];
};

/**
 * Full commercial product directory for the hub.
 * Every Business-nav product in the nine industries is emitted as a real
 * link so crawlability does not depend on which explorer tab is active.
 */
export function resolveCommercialHubSectors(): CommercialHubSector[] {
  return DIRECTORY_IDS.map((id) => {
    const category = businessNavCategories.find((entry) => entry.id === id);
    if (!category) {
      throw new Error(`Missing commercial directory category: ${id}`);
    }
    return {
      id,
      title: category.title,
      links: category.links,
    };
  });
}
