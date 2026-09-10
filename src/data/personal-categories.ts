import {
  Building2,
  Car,
  Home,
  Heart,
  KeyRound,
  Motorbike,
  Sailboat,
  Share2,
  Shield,
  Umbrella,
  Users,
  Plane,
  type LucideIcon,
} from "lucide-react";

export type PersonalCategoryId =
  | "ride"
  | "place"
  | "toys"
  | "rental"
  | "specialty";

export type PersonalProduct = {
  label: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

export type PersonalCategory = {
  id: PersonalCategoryId;
  label: string;
  icon: LucideIcon;
  accent: string;
  badgeBg: string;
  panelWash: string;
  products: PersonalProduct[];
};

/** Default selected category — deliberate Auto/hero callback. */
export const DEFAULT_PERSONAL_CATEGORY: PersonalCategoryId = "ride";

/**
 * Authoritative Personal hub inventory (14 products).
 * One card per canonical route — no duplicate Motorcycle entries.
 */
export const personalCategories: PersonalCategory[] = [
  {
    id: "ride",
    label: "My Ride",
    icon: Car,
    accent: "#5B7A99",
    badgeBg: "#E8EEF3",
    panelWash: "rgba(91,122,153,0.07)",
    products: [
      {
        label: "Auto Insurance",
        description:
          "Liability, collision, and comprehensive coverage for your car or truck.",
        href: "/auto-insurance/",
        cta: "Learn more",
        icon: Car,
      },
      {
        label: "Motorcycle Insurance",
        description: "Coverage built for how you ride.",
        href: "/motorcycle-insurance/",
        cta: "Learn more",
        icon: Motorbike,
      },
      {
        label: "Travel Insurance",
        description: "Emergency medical and trip protection for travellers.",
        href: "/travel-insurance/",
        cta: "Learn more",
        icon: Plane,
      },
    ],
  },
  {
    id: "place",
    label: "My Place",
    icon: Home,
    accent: "#B37A5A",
    badgeBg: "#F3EAE3",
    panelWash: "rgba(179,122,90,0.07)",
    products: [
      {
        label: "Home Insurance",
        description:
          "Protection for your property, belongings, and liability.",
        href: "/home-insurance/",
        cta: "Learn more",
        icon: Home,
      },
      {
        label: "Condo Insurance",
        description:
          "Coverage for what your condo corporation's policy doesn't.",
        href: "/condo-insurance/",
        cta: "Learn more",
        icon: Building2,
      },
      {
        label: "Tenant Insurance",
        description: "Contents and liability coverage if you rent.",
        href: "/tenant-insurance/",
        cta: "Learn more",
        icon: KeyRound,
      },
      {
        label: "Cottage Insurance",
        description: "Seasonal and secondary property coverage.",
        href: "/cottage-insurance/",
        cta: "Learn more",
        icon: Home,
      },
      {
        label: "Mobile & Manufactured Home",
        description: "Coverage for manufactured and mobile homes.",
        href: "/mobile-home-insurance/",
        cta: "Learn more",
        icon: Home,
      },
    ],
  },
  {
    id: "toys",
    label: "My Toys",
    icon: Sailboat,
    accent: "#4A8A8A",
    badgeBg: "#E4F0F0",
    panelWash: "rgba(74,138,138,0.07)",
    products: [
      {
        label: "Boat Insurance",
        description: "Protection on and off the water.",
        href: "/boat-insurance/",
        cta: "Learn more",
        icon: Sailboat,
      },
    ],
  },
  {
    id: "rental",
    label: "My Rental Property",
    icon: Building2,
    accent: "#8A7A6A",
    badgeBg: "#F0EBE6",
    panelWash: "rgba(138,122,106,0.08)",
    products: [
      {
        label: "Landlord Insurance",
        description:
          "Property and liability coverage for rental units you own.",
        href: "/landlord-insurance/",
        cta: "Learn more",
        icon: Building2,
      },
    ],
  },
  {
    id: "specialty",
    label: "Specialty",
    icon: Shield,
    accent: "#6B5B7A",
    badgeBg: "#EEE8F3",
    panelWash: "rgba(107,91,122,0.07)",
    products: [
      {
        label: "Personal Umbrella",
        description:
          "Extra liability limits above your home and auto policies.",
        href: "/personal-umbrella-insurance/",
        cta: "Learn more",
        icon: Umbrella,
      },
      {
        label: "Home & Ride Sharing",
        description:
          "Sharing-economy coverage for home hosting and ride or vehicle sharing.",
        href: "/home-sharing-insurance/",
        cta: "Learn more",
        icon: Share2,
      },
      {
        label: "Life Insurance",
        description:
          "Life insurance inquiry coordination through licensed specialists.",
        href: "/life-insurance/",
        cta: "Learn more",
        icon: Heart,
      },
      {
        label: "Group Home & Auto",
        description: "Employer and association group program inquiries.",
        href: "/group-home-auto-insurance/",
        cta: "Learn more",
        icon: Users,
      },
    ],
  },
];

export function getPersonalCategory(
  id: PersonalCategoryId,
): PersonalCategory {
  return (
    personalCategories.find((category) => category.id === id) ??
    personalCategories[0]
  );
}

/** Unique Personal hub product hrefs (canonical discovery inventory). */
export function getPersonalHubProductHrefs(): string[] {
  const hrefs = personalCategories.flatMap((c) =>
    c.products.map((p) => p.href),
  );
  return [...new Set(hrefs)];
}
