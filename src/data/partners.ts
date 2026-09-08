import {
  carrierRecordToPartnerLogo,
  CARRIER_INVENTORY,
  getCarriersByCategory,
  getHomepageMarqueeCarriers,
  PARTNER_GROUP_META,
  resolveCarrierLogo,
  type CarrierRecord,
  type MarketCategory,
} from "@/data/carrierInventory";

export type PartnerLogo = {
  name: string;
  src: string;
  alt: string;
  /** When false, UI renders a text card instead of a broken image. */
  hasLogo?: boolean;
  slug?: string;
};

export type PartnerGroup = {
  id: string;
  title: string;
  description?: string;
  partners: PartnerLogo[];
};

function toPartnerLogo(record: CarrierRecord): PartnerLogo {
  const mapped = carrierRecordToPartnerLogo(record);
  return {
    name: mapped.name,
    src: mapped.src,
    alt: mapped.alt,
    hasLogo: mapped.hasLogo,
    slug: mapped.slug,
  };
}

/** Curated core markets for the homepage marquee (Option B — 13 carriers). */
export const homepageCarriers: PartnerLogo[] =
  getHomepageMarqueeCarriers().map(toPartnerLogo);

/** Full partner set for Partners page and claims logo lookup. */
export const allPartners: PartnerLogo[] = CARRIER_INVENTORY.map(toPartnerLogo);

/** Legacy export — all carriers with resolved logo paths for claims directory. */
export { CARRIER_INVENTORY, resolveCarrierLogo };

/**
 * Partners page groups — Personal / Commercial / Specialty & MGA.
 * A carrier in multiple segments appears once per relevant category.
 */
export function getPartnerGroups(): PartnerGroup[] {
  const categories: MarketCategory[] = ["personal", "commercial", "specialty"];

  return categories.map((category) => {
    const meta = PARTNER_GROUP_META[category];
    const carriers = getCarriersByCategory(category);

    return {
      id: meta.id,
      title: meta.title,
      description: meta.description,
      partners: carriers.map(toPartnerLogo),
    };
  });
}

/** Find partner logo path by display name (case-insensitive). */
export function partnerLogoByName(name: string): string | undefined {
  const record = CARRIER_INVENTORY.find(
    (c) =>
      c.name.toLowerCase() === name.toLowerCase() ||
      c.aliases?.some((a) => a.toLowerCase() === name.toLowerCase()),
  );
  return record ? resolveCarrierLogo(record) : undefined;
}
