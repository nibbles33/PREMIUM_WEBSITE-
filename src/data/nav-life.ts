export type NavLink = {
  label: string;
  href: string;
};

export const lifeInsuranceNavHub = {
  label: "Life Insurance",
  href: "/life-insurance/",
};

export const lifeInsuranceNavLinks: NavLink[] = [
  { label: "Term Life Insurance", href: "/term-life-insurance/" },
  { label: "Whole Life Insurance", href: "/whole-life-insurance/" },
  { label: "Universal Life Insurance", href: "/universal-life-insurance/" },
  { label: "Disability Insurance", href: "/disability-insurance/" },
  { label: "Group Benefits", href: "/group-benefits/" },
];
