export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

/**
 * Agriculture mega-menu category (cascading panel, Business-pattern).
 * Left rail lists categories; right panel shows description and product link(s).
 * Coverage Explorer visuals live on product pages — not in the mega-menu.
 */
export type AgricultureNavCategory = {
  id: string;
  title: string;
  role: "industry";
  description: string;
  links: NavLink[];
};

export const agricultureNavHub = {
  label: "Agriculture",
  href: "/agriculture/",
};

/** Flat link list retained for lightweight consumers (footer, etc.). */
export const agricultureNavLinks: NavLink[] = [
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

export const agricultureNavCategories: AgricultureNavCategory[] = [
  {
    id: "farm-insurance",
    title: "Farm Insurance",
    role: "industry",
    description:
      "Private farm packages for buildings, machinery, liability, and related farm exposures — reviewed through an independent broker.",
    links: [
      {
        label: "Farm Insurance",
        href: "/farm-insurance/",
        description: "Open the Farm Insurance page",
      },
    ],
  },
  {
    id: "crop-insurance",
    title: "Crop Insurance",
    role: "industry",
    description:
      "Ontario Production Insurance is administered by Agricorp. We refer you there for crop programs and can help with separate private farm coverages.",
    links: [
      {
        label: "Crop Insurance",
        href: "/crop-insurance/",
        description: "Agricorp referral and private farm context",
      },
    ],
  },
  {
    id: "livestock-insurance",
    title: "Livestock / Animal Insurance",
    role: "industry",
    description:
      "How livestock and animal exposures are typically reviewed on farm programs — including named perils, scheduling, and common limitations.",
    links: [
      {
        label: "Livestock / Animal Insurance",
        href: "/livestock-insurance/",
        description: "Open the Livestock Insurance page",
      },
    ],
  },
  {
    id: "greenhouse-nursery",
    title: "Greenhouse & Nursery",
    role: "industry",
    description:
      "Controlled-environment greenhouse and nursery operations — structures, equipment, stock treatment, and liability where markets allow.",
    links: [
      {
        label: "Greenhouse & Nursery",
        href: "/greenhouse-agribusiness-insurance/",
        description: "Open the Greenhouse & Nursery page",
      },
    ],
  },
  {
    id: "farm-equipment-insurance",
    title: "Farm Equipment Coverage",
    role: "industry",
    description:
      "Field machinery and implements versus licensed road vehicles — how equipment is usually scheduled and what still needs automobile insurance.",
    links: [
      {
        label: "Farm Equipment Coverage",
        href: "/farm-equipment-insurance/",
        description: "Open the Farm Equipment Coverage page",
      },
    ],
  },
];
