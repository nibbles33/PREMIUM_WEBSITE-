import {
  Building2,
  Car,
  Home,
  KeyRound,
  Motorbike,
  Sailboat,
  type LucideIcon,
} from "lucide-react";

export type PersonalCategoryId = "ride" | "place" | "toys" | "rental";

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
    ],
  },
  {
    id: "toys",
    label: "My Toys",
    icon: Motorbike,
    accent: "#4A8A8A",
    badgeBg: "#E4F0F0",
    panelWash: "rgba(74,138,138,0.07)",
    products: [
      {
        label: "Motorcycle Insurance",
        description: "Coverage built for how you ride.",
        href: "/motorcycle-insurance/",
        cta: "Learn more",
        icon: Motorbike,
      },
      {
        label: "Boat & Watercraft Insurance",
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
];

export function getPersonalCategory(
  id: PersonalCategoryId,
): PersonalCategory {
  return (
    personalCategories.find((category) => category.id === id) ??
    personalCategories[0]
  );
}
