export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

/**
 * Agriculture product links — retained for SEO breadcrumbs, footer, and
 * related-product helpers. Top-level Agriculture nav is retired; products
 * live under Business → Agriculture in the mega-menu (`nav-business.ts`).
 */
export const agricultureNavHub = {
  label: "Agriculture",
  href: "/agriculture/",
  /** Business mega-menu industry that now owns these products. */
  businessCategoryId: "agriculture",
};

export const agricultureNavLinks: NavLink[] = [
  {
    label: "Agriculture Overview",
    href: "/agriculture/",
    description: "Farm, crop, livestock, greenhouse, and equipment coverage.",
  },
  {
    label: "Farm Insurance",
    href: "/farm-insurance/",
    description: "Farm property, buildings, machinery, and liability packages.",
  },
  {
    label: "Crop Insurance",
    href: "/crop-insurance/",
    description: "Agricorp Production Insurance referral and farm package context.",
  },
  {
    label: "Livestock / Animal Insurance",
    href: "/livestock-insurance/",
    description: "Livestock and animal exposures on farm insurance programs.",
  },
  {
    label: "Greenhouse & Nursery",
    href: "/greenhouse-agribusiness-insurance/",
    description: "Greenhouse and nursery operations in Essex County and beyond.",
  },
  {
    label: "Farm Equipment Coverage",
    href: "/farm-equipment-insurance/",
    description: "Field machinery, implements, and equipment scheduling.",
  },
];
