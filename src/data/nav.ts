export type NavChild = {
  label: string;
  href: string;
  group?: string;
  description?: string;
};

export type NavItemKind =
  | "link"
  | "personal"
  | "business"
  | "agriculture"
  | "resources";

export type NavItem = {
  kind: NavItemKind;
  label: string;
  href: string;
  children?: NavChild[];
};

/** Primary header navigation — dropdown behaviour implemented in Header. */
export const navItems: NavItem[] = [
  { kind: "personal", label: "Personal", href: "/auto-insurance/" },
  { kind: "business", label: "Business", href: "/commercial-insurance/" },
  { kind: "agriculture", label: "Agriculture", href: "/farm-insurance/" },
  { kind: "link", label: "About", href: "/about/" },
  { kind: "resources", label: "Resources", href: "/resources/" },
];
