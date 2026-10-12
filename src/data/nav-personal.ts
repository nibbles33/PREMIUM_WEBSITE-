export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  id: string;
  title: string;
  links: NavLink[];
};

export const personalNavHub = {
  label: "Personal",
  href: "/personal/",
};

export const personalNavGroups: NavGroup[] = [
  {
    id: "auto-mobility",
    title: "Auto / Mobility",
    links: [
      { label: "Auto Insurance", href: "/auto-insurance/" },
      { label: "Motorcycle Insurance", href: "/motorcycle-insurance/" },
      { label: "Boat Insurance", href: "/boat-insurance/" },
      {
        label: "Travel Insurance",
        href: "/travel-insurance/",
        description: "Emergency medical and trip protection for travellers.",
      },
    ],
  },
  {
    id: "property",
    title: "Property",
    links: [
      { label: "Home Insurance", href: "/home-insurance/" },
      { label: "Condo Insurance", href: "/condo-insurance/" },
      { label: "Tenant Insurance", href: "/tenant-insurance/" },
      { label: "Landlord Insurance", href: "/landlord-insurance/" },
      {
        label: "Cottage Insurance",
        href: "/cottage-insurance/",
        description: "Seasonal and secondary property coverage.",
      },
      {
        label: "Mobile / Manufactured Home",
        href: "/mobile-home-insurance/",
        description: "Coverage for manufactured and mobile homes.",
      },
    ],
  },
  {
    id: "specialty",
    title: "Specialty",
    links: [
      {
        label: "Personal Umbrella",
        href: "/personal-umbrella-insurance/",
        description: "Extra liability limits above your home and auto policies.",
      },
      {
        label: "Group Home & Auto",
        href: "/group-home-auto-insurance/",
        description: "Employer and association group program inquiries.",
      },
      {
        label: "Home & Ride Sharing",
        href: "/home-sharing-insurance/",
        description: "Sharing-economy coverage for home hosting and ride or vehicle sharing.",
      },
    ],
  },
];

