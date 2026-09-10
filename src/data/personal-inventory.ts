/**
 * Authoritative Personal Lines inventory — Batch 3.5.
 * Auto (standalone) + pilot personal registry slugs.
 */
import { getPilotPersonalSlugs } from "@/data/pilot-personal-registry";

export type PersonalProductRef = {
  slug: string;
  href: string;
  source: "standalone-auto" | "personal-registry";
};

export function getAuthoritativePersonalProducts(): PersonalProductRef[] {
  const registry = getPilotPersonalSlugs().map((slug) => ({
    slug,
    href: `/${slug}/`,
    source: "personal-registry" as const,
  }));
  return [
    {
      slug: "auto-insurance",
      href: "/auto-insurance/",
      source: "standalone-auto",
    },
    ...registry,
  ];
}

export function getAuthoritativePersonalHrefs(): string[] {
  return getAuthoritativePersonalProducts().map((p) => p.href);
}
