export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const resourcesNavHub = {
  label: "Resources",
  href: "/resources/",
};

export const resourcesNavLinks: NavLink[] = [
  { label: "Claims", href: "/claims/" },
  { label: "Make a Payment", href: "/payment/" },
  { label: "Compliance", href: "/compliance/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Resources & Articles", href: "/resources/" },
  { label: "Newsletter", href: "/newsletter/" },
  { label: "Contact Us", href: "/contact/" },
  { label: "Talk to a Broker", href: "/talk-to-a-broker/" },
];
