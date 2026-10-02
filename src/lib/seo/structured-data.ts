import { SITE_ORIGIN } from "@/lib/seo";
import { businessNavClusters } from "@/data/nav-business";
import { personalNavGroups } from "@/data/nav-personal";
import type { FaqItem } from "@/components/FaqAccordion";

/** Verified brokerage identity for structured data — matches customer-facing NAP. */
export const BROKERAGE_NAME = "Premium Insurance Brokers";
export const BROKERAGE_PHONE_E164 = "+1-226-782-6000";
export const BROKERAGE_PHONE_DISPLAY = "226-782-6000";
export const BROKERAGE_STREET = "3063 Dougall Ave";
export const BROKERAGE_LOCALITY = "Windsor";
export const BROKERAGE_REGION = "ON";
export const BROKERAGE_POSTAL = "N9E 1S7";
export const BROKERAGE_COUNTRY = "CA";
export const PARENT_ORG_NAME = "Oracle RMS";

const SOCIAL_PROFILES = [
  "https://www.facebook.com/premiumibwindsor",
  "https://www.instagram.com/premiuminsurancebrokers",
] as const;

export type BreadcrumbCrumb = {
  name: string;
  path: string;
};

function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_ORIGIN}/`;
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return `${SITE_ORIGIN}${normalized}`;
}

/** LocalBusiness representing Premium as an insurance brokerage (not InsuranceAgency). */
export function brokerageLocalBusiness() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_ORIGIN}/#brokerage`,
    name: BROKERAGE_NAME,
    description:
      "Independent insurance brokerage serving Windsor-Essex, Ontario — personal, commercial, and specialty coverage through licensed local brokers.",
    url: absoluteUrl("/"),
    telephone: BROKERAGE_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BROKERAGE_STREET,
      addressLocality: BROKERAGE_LOCALITY,
      addressRegion: BROKERAGE_REGION,
      postalCode: BROKERAGE_POSTAL,
      addressCountry: BROKERAGE_COUNTRY,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Windsor-Essex",
    },
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_ORG_NAME,
    },
    sameAs: [...SOCIAL_PROFILES],
  };
}

/**
 * Compact provider node for Service schema — same LocalBusiness identity,
 * without repeating full NAP when nested under Service.provider.
 */
export function brokerageProvider() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_ORIGIN}/#brokerage`,
    name: BROKERAGE_NAME,
    telephone: BROKERAGE_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BROKERAGE_STREET,
      addressLocality: BROKERAGE_LOCALITY,
      addressRegion: BROKERAGE_REGION,
      postalCode: BROKERAGE_POSTAL,
      addressCountry: BROKERAGE_COUNTRY,
    },
    url: absoluteUrl("/"),
    parentOrganization: {
      "@type": "Organization",
      name: PARENT_ORG_NAME,
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: BROKERAGE_NAME,
    url: absoluteUrl("/"),
    publisher: { "@id": `${SITE_ORIGIN}/#brokerage` },
    inLanguage: "en-CA",
  };
}

export function homepageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [brokerageLocalBusiness(), websiteSchema()],
  };
}

export function breadcrumbList(crumbs: BreadcrumbCrumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqPageSchema(items: FaqItem[]) {
  const valid = items.filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  );
  if (valid.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: valid.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.trim(),
      },
    })),
  };
}

type NavKind = "personal" | "commercial" | "other";

function findPersonalLabel(slugPath: string): string | null {
  for (const group of personalNavGroups) {
    for (const link of group.links) {
      if (link.href === slugPath) return link.label;
    }
  }
  return null;
}

function findCommercialCluster(
  slugPath: string,
): { clusterTitle: string; label: string } | null {
  for (const cluster of businessNavClusters) {
    for (const link of cluster.links) {
      if (link.href === slugPath) {
        return { clusterTitle: cluster.title, label: link.label };
      }
    }
  }
  return null;
}

/**
 * Build breadcrumb crumbs from real IA (nav hubs + mega-menu clusters).
 * Returns null when hierarchy is ambiguous (no fake breadcrumbs).
 */
export function breadcrumbsForProductSlug(
  slug: string,
  serviceName: string,
  kind: NavKind,
): BreadcrumbCrumb[] | null {
  const path = `/${slug}/`;

  if (kind === "personal") {
    const label = findPersonalLabel(path) ?? serviceName;
    return [
      { name: "Home", path: "/" },
      { name: "Personal", path: "/personal/" },
      { name: label, path },
    ];
  }

  if (kind === "commercial") {
    if (slug === "commercial-insurance") {
      return [
        { name: "Home", path: "/" },
        { name: "Business", path: "/commercial-insurance/" },
      ];
    }

    // Real IA is hub → product (cluster titles are nav groupings, not pages).
    const hit = findCommercialCluster(path);
    const label = hit?.label ?? serviceName;
    return [
      { name: "Home", path: "/" },
      { name: "Business", path: "/commercial-insurance/" },
      { name: label, path },
    ];
  }

  return null;
}

export function serviceStructuredData(input: {
  serviceName: string;
  description: string;
  slug: string;
  kind: NavKind;
  faqItems?: FaqItem[];
}) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      name: input.serviceName,
      description: input.description,
      provider: brokerageProvider(),
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Windsor-Essex",
      },
      serviceType: input.serviceName,
      url: absoluteUrl(`/${input.slug}/`),
    },
  ];

  const crumbs = breadcrumbsForProductSlug(
    input.slug,
    input.serviceName,
    input.kind,
  );
  if (crumbs) {
    graph.push(breadcrumbList(crumbs));
  }

  if (input.faqItems?.length) {
    const faq = faqPageSchema(input.faqItems);
    if (faq) graph.push(faq);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function contactPageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Premium Insurance Brokers",
    url: absoluteUrl("/contact/"),
    mainEntity: { "@id": `${SITE_ORIGIN}/#brokerage` },
    about: brokerageLocalBusiness(),
  };
}

export function webPageStructuredData(input: {
  name: string;
  description: string;
  path: string;
  crumbs?: BreadcrumbCrumb[];
  faqItems?: FaqItem[];
}) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      name: input.name,
      description: input.description,
      url: absoluteUrl(input.path),
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#brokerage` },
    },
  ];
  if (input.crumbs?.length) {
    graph.push(breadcrumbList(input.crumbs));
  }
  if (input.faqItems?.length) {
    const faq = faqPageSchema(input.faqItems);
    if (faq) graph.push(faq);
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function collectionPageStructuredData(input: {
  name: string;
  description: string;
  path: string;
  crumbs?: BreadcrumbCrumb[];
  itemListElement?: { name: string; path: string }[];
}) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "CollectionPage",
      name: input.name,
      description: input.description,
      url: absoluteUrl(input.path),
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#brokerage` },
    },
  ];
  if (input.crumbs?.length) {
    graph.push(breadcrumbList(input.crumbs));
  }
  if (input.itemListElement?.length) {
    graph.push({
      "@type": "ItemList",
      itemListElement: input.itemListElement.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    });
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
