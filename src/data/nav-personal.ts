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
      {
        label: "Motorcycle Insurance",
        href: "/get-a-quote?type=vehicle&vehicleType=motorcycle",
      },
      {
        label: "Boat Insurance",
        href: "/get-a-quote?type=vehicle&vehicleType=boat",
      },
      {
        label: "Travel Insurance",
        href: "/talk-to-a-broker/",
        description: "Speak with a broker for travel coverage options.",
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
      {
        label: "Condo Insurance",
        href: "/get-a-quote?type=home&homeType=condo",
      },
      {
        label: "Tenant Insurance",
        href: "/get-a-quote?type=home&homeType=tenant",
      },
      {
        label: "Landlord Insurance",
        href: "/get-a-quote?type=home&homeType=landlord",
      },
      {
        label: "Cottage Insurance",
        href: "/talk-to-a-broker/",
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
