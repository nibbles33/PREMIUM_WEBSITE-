export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export const personalNavHub = {
  label: "Personal",
  href: "/auto-insurance/",
};

export const personalNavGroups: NavGroup[] = [
  {
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
      {
        label: "Ride / Car / Home Sharing",
        href: "/talk-to-a-broker/",
        description: "Sharing-economy and platform-use coverage.",
      },
    ],
  },
  {
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
        href: "/talk-to-a-broker/",
        description: "Coverage for manufactured and mobile homes.",
      },
    ],
  },
  {
    title: "Specialty",
    links: [
      {
        label: "Personal Umbrella",
        href: "/talk-to-a-broker/",
        description: "Extra liability limits above your home and auto policies.",
      },
      {
        label: "Life Insurance",
        href: "/talk-to-a-broker/",
        description: "Term and permanent life options through our partners.",
      },
      {
        label: "Group Home & Auto",
        href: "/talk-to-a-broker/",
        description: "Employer and association group programs.",
      },
    ],
  },
];
