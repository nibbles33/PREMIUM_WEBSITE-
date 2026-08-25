export type NavChild = {
  label: string;
  href: string;
  group?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  { label: "Auto", href: "/auto-insurance/" },
  { label: "Home", href: "/home-insurance/" },
  {
    label: "Business",
    href: "/commercial-insurance/",
    children: [],
  },
  { label: "Farm", href: "/farm-insurance/" },
  { label: "About", href: "/about/" },
  { label: "Resources", href: "/resources/" },
];
