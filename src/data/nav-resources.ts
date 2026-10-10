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

export const resourcesNavHub = {
  label: "Resources",
  href: "/resources/",
};

/** Cascading Resources categories — all prior destinations preserved. */
export const resourcesNavGroups: NavGroup[] = [
  {
    id: "service",
    title: "Service",
    links: [
      { label: "Claims", href: "/claims/" },
      { label: "Make a Payment", href: "/payment/" },
      { label: "Contact Us", href: "/contact/" },
      { label: "Talk to a Broker", href: "/contact/?intent=broker" },
    ],
  },
  {
    id: "policies",
    title: "Policies",
    links: [
      { label: "Compliance", href: "/compliance/" },
      { label: "Privacy Policy", href: "/privacy-policy/" },
    ],
  },
  {
    id: "learn",
    title: "Learn",
    links: [
      { label: "Resources & Articles", href: "/resources/" },
      { label: "Newsletter", href: "/newsletter/" },
    ],
  },
];

/** Flat list retained for any simple consumers. */
export const resourcesNavLinks: NavLink[] = resourcesNavGroups.flatMap(
  (group) => group.links,
);
