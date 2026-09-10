export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const agricultureNavHub = {
  label: "Agriculture",
  href: "/farm-insurance/",
};

export const agricultureNavLinks: NavLink[] = [
  { label: "Farm Insurance", href: "/farm-insurance/" },
  {
    label: "Greenhouse / Agribusiness",
    href: "/greenhouse-agribusiness-insurance/",
    description: "Greenhouse, crop, and agribusiness operations.",
  },
];
