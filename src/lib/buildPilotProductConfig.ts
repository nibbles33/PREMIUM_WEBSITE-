import type {
  ConsiderationItem,
  CoverageCard,
  RelatedLink,
} from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";
import { insuranceAgencyProvider } from "@/components/LineInsurancePage";
import type { ProductPageContent } from "@/data/product-pages/types";
import type { IndustryPageContent } from "@/data/commercial-industries";
import { COMMERCIAL_ACCENT } from "@/data/commercial-industries";
import { getPageHeroPhotography } from "@/data/photography";
import {
  DEFAULT_COMMERCIAL_RELATED_INTRO,
  DEFAULT_COMMERCIAL_TRUST,
  DEFAULT_RELATED_HEADING,
  DEFAULT_RELATED_INTRO,
  PILOT_BROKER_HREF,
  commercialBrokerSteps,
  personalBrokerSteps,
} from "@/data/pilot-product-shared";
import type {
  PilotProductPageConfig,
  ProductCoverageItem,
  ProductRelatedItem,
} from "@/types/pilot-product";

type CoverageInput = CoverageCard & {
  detail?: string;
  shortLabel?: string;
};

type BuildPilotProductConfigInput = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  headline: string;
  heroLead: string;
  heroSupporting?: string;
  photographySlug?: string;
  accentColor: string;
  quoteHref: string;
  quoteLabel: string;
  brokerHref?: string;
  secondaryCta?: { label: string; href: string };
  trustStatement?: string;
  considerations?: ConsiderationItem[];
  coverageHeading?: string;
  coverageIntro: string;
  coverageItems: CoverageInput[];
  coverageExplorerLabel?: string;
  miniature?: PilotProductPageConfig["miniature"];
  brokerSteps?: PilotProductPageConfig["brokerSteps"];
  relatedProducts: ProductRelatedItem[];
  relatedHeading?: string;
  relatedIntro?: string;
  faqTitle: string;
  faqIntro: string;
  faqItems: FaqItem[];
  ctaEyebrow?: string;
  ctaHeading: string;
  ctaSubhead: string;
  ctaQuoteLabel?: string;
  serviceName: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toCoverageItems(items: CoverageInput[]): ProductCoverageItem[] {
  return items.map((item) => {
    const id = slugify(item.title);
    const shortLabel = item.shortLabel ?? item.title.split(" ")[0] ?? item.title;
    const detail = item.detail ?? item.description;
    return {
      id,
      title: item.title,
      shortLabel,
      description: item.description,
      detail,
      icon: item.icon,
      visualEyebrow: shortLabel,
      visualCaption: item.title,
      visualSubcaption: item.description,
    };
  });
}

/** Infer hero photography slug from common route hrefs. */
export function photoSlugFromHref(href: string): string {
  const map: Record<string, string> = {
    "/home-insurance/": "home-insurance",
    "/condo-insurance/": "condo",
    "/tenant-insurance/": "tenant",
    "/landlord-insurance/": "landlord",
    "/cottage-insurance/": "cottage",
    "/motorcycle-insurance/": "motorcycle",
    "/boat-insurance/": "boat",
    "/travel-insurance/": "travel-insurance",
    "/auto-insurance/": "auto-insurance",
    "/mobile-home-insurance/": "mobile-home-insurance",
    "/personal-umbrella-insurance/": "personal-umbrella-insurance",
    "/home-sharing-insurance/": "home-sharing-insurance",
    "/life-insurance/": "life-insurance",
    "/group-home-auto-insurance/": "group-home-auto-insurance",
    "/commercial-insurance/": "commercial-insurance",
    "/commercial-property-insurance/": "commercial-property-insurance",
    "/contractors-insurance/": "contractors-insurance",
    "/restaurant-insurance/": "restaurant-insurance",
    "/retail-insurance/": "retail-insurance",
    "/manufacturing-insurance/": "manufacturing-insurance",
    "/professional-offices-insurance/": "professional-offices-insurance",
    "/real-estate-insurance/": "real-estate-insurance",
    "/builders-developers-insurance/": "builders-developers-insurance",
    "/bonding-insurance/": "bonding-insurance",
    "/small-business-insurance/": "commercial-insurance",
    "/professional-liability-insurance/": "professional-offices-insurance",
    "/business-interruption-insurance/": "commercial-property-insurance",
    "/builders-risk-insurance/": "builders-developers-insurance",
    "/cyber-insurance/": "professional-offices-insurance",
    "/directors-officers-insurance/": "professional-offices-insurance",
    "/landscaping-snow-removal-insurance/": "contractors-insurance",
    "/farm-insurance/": "farm-insurance",
    "/food-truck-insurance/": "food-truck-insurance",
    "/trucking-insurance/": "trucking-insurance",
    "/commercial-auto-insurance/": "commercial-auto-insurance",
    "/dump-truck-insurance/": "dump-truck-insurance",
    "/cargo-freight-insurance/": "trucking-insurance",
  };
  return map[href] ?? "commercial-insurance";
}

/** Resolve wired hero photography for commercial routes. */
export function resolveCommercialPhotographySlug(slug: string): string {
  if (getPageHeroPhotography(slug)) return slug;
  return "commercial-insurance";
}

export function relatedLinksToProducts(links: RelatedLink[]): ProductRelatedItem[] {
  return links.map((link) => ({
    label: link.label.replace(/ Insurance$/i, ""),
    href: link.href,
    photoSlug: photoSlugFromHref(link.href),
  }));
}

export function buildPilotProductConfig(
  input: BuildPilotProductConfigInput & {
    layout?: PilotProductPageConfig["layout"];
    relatedIntro?: string;
  },
): PilotProductPageConfig {
  return {
    slug: input.slug,
    layout: input.layout,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    eyebrow: input.eyebrow ?? "Personal Insurance",
    headline: input.headline,
    heroLead: input.heroLead,
    heroSupporting: input.heroSupporting,
    photographySlug: input.photographySlug,
    accentColor: input.accentColor,
    quoteHref: input.quoteHref,
    quoteLabel: input.quoteLabel,
    brokerHref: input.brokerHref ?? PILOT_BROKER_HREF,
    secondaryCta: input.secondaryCta,
    trustStatement:
      input.trustStatement ??
      "Ontario personal insurance through an independent Windsor-Essex broker — explained in plain language, compared across multiple markets.",
    considerations: input.considerations,
    coverageHeading: input.coverageHeading ?? "What's covered",
    coverageIntro: input.coverageIntro,
    coverageItems: toCoverageItems(input.coverageItems),
    coverageExplorerLabel: input.coverageExplorerLabel ?? "Coverage types",
    miniature: input.miniature ?? null,
    brokerSteps: input.brokerSteps ?? personalBrokerSteps,
    relatedHeading: input.relatedHeading ?? DEFAULT_RELATED_HEADING,
    relatedIntro: input.relatedIntro ?? DEFAULT_RELATED_INTRO,
    relatedProducts: input.relatedProducts,
    faqTitle: input.faqTitle,
    faqIntro: input.faqIntro,
    faqItems: input.faqItems,
    ctaEyebrow: input.ctaEyebrow ?? "Ready when you are",
    ctaHeading: input.ctaHeading,
    ctaSubhead: input.ctaSubhead,
    ctaQuoteLabel: input.ctaQuoteLabel ?? input.quoteLabel,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: input.serviceName,
      description: input.metaDescription,
      provider: insuranceAgencyProvider(),
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Windsor-Essex",
      },
      serviceType: input.serviceName,
    },
  };
}

export function adaptCommercialProductContent(
  content: ProductPageContent,
): PilotProductPageConfig {
  const related = content.relatedLinks
    ? relatedLinksToProducts(content.relatedLinks)
    : [];

  return buildPilotProductConfig({
    slug: content.slug,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    eyebrow: content.eyebrow ?? "Commercial Insurance",
    headline: content.headline,
    heroLead: content.subhead,
    photographySlug: resolveCommercialPhotographySlug(
      content.photographySlug ?? content.slug,
    ),
    accentColor: content.coverageAccent ?? COMMERCIAL_ACCENT,
    quoteHref: content.quoteHref,
    quoteLabel: content.quoteLabel,
    secondaryCta: content.secondaryCta,
    trustStatement: content.whoItIsFor ?? DEFAULT_COMMERCIAL_TRUST,
    coverageHeading: "What's covered",
    coverageIntro: content.coverageIntro,
    coverageItems: content.coverageTypes,
    considerations: content.considerations,
    brokerSteps: commercialBrokerSteps,
    relatedProducts: related,
    relatedIntro: DEFAULT_COMMERCIAL_RELATED_INTRO,
    faqTitle: content.faqTitle,
    faqIntro: content.faqIntro ?? "Straight answers to common questions.",
    faqItems: content.faqItems,
    ctaHeading: content.ctaHeading,
    ctaSubhead: content.ctaSubhead,
    ctaQuoteLabel: content.ctaButtonLabel ?? content.quoteLabel,
    serviceName: content.serviceName,
  });
}

const industryRelatedLinks: Record<string, RelatedLink[]> = {
  "contractors-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Bond Insurance", href: "/bonding-insurance/" },
    { label: "Builder's Risk", href: "/builders-risk-insurance/" },
  ],
  "manufacturing-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Commercial Property", href: "/commercial-property-insurance/" },
    { label: "Product Recall", href: "/product-recall-insurance/" },
  ],
  "commercial-property-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Business Interruption", href: "/business-interruption-insurance/" },
    { label: "Small Business", href: "/small-business-insurance/" },
  ],
  "restaurant-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
    { label: "Business Interruption", href: "/business-interruption-insurance/" },
  ],
  "professional-offices-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Professional Liability", href: "/professional-liability-insurance/" },
    { label: "Cyber Insurance", href: "/cyber-insurance/" },
  ],
  "real-estate-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Property Management", href: "/property-management-insurance/" },
    { label: "Condominium Corporation", href: "/condominium-corporation-insurance/" },
  ],
  "builders-developers-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Contractors Insurance", href: "/contractors-insurance/" },
    { label: "Builder's Risk", href: "/builders-risk-insurance/" },
  ],
  "retail-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Commercial Property", href: "/commercial-property-insurance/" },
    { label: "Crime & Fidelity", href: "/crime-fidelity-insurance/" },
  ],
  "food-truck-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Restaurant Insurance", href: "/restaurant-insurance/" },
    { label: "Liquor Liability", href: "/liquor-liability-insurance/" },
  ],
  "trucking-insurance": [
    { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
    { label: "Dump Trucks", href: "/dump-truck-insurance/" },
    { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
  ],
  "commercial-auto-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Trucking", href: "/trucking-insurance/" },
    { label: "Dump Trucks", href: "/dump-truck-insurance/" },
  ],
  "dump-truck-insurance": [
    { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
    { label: "Trucking", href: "/trucking-insurance/" },
    { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
  ],
};

export function adaptCommercialIndustryContent(
  content: IndustryPageContent,
): PilotProductPageConfig {
  const related = relatedLinksToProducts(
    industryRelatedLinks[content.slug] ?? [
      { label: "Commercial Insurance Hub", href: "/commercial-insurance/" },
      { label: "Small Business", href: "/small-business-insurance/" },
    ],
  );

  return buildPilotProductConfig({
    slug: content.slug,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    eyebrow: "Commercial Insurance",
    headline: content.headline,
    heroLead: content.subhead,
    photographySlug: resolveCommercialPhotographySlug(content.slug),
    accentColor: COMMERCIAL_ACCENT,
    quoteHref: content.quoteHref,
    quoteLabel: content.quoteLabel,
    trustStatement: content.subhead,
    coverageHeading: "What's covered",
    coverageIntro: content.coverageIntro,
    coverageItems: content.coverageTypes,
    brokerSteps: commercialBrokerSteps,
    relatedProducts: related,
    relatedIntro: DEFAULT_COMMERCIAL_RELATED_INTRO,
    faqTitle: content.faqTitle,
    faqIntro: "Straight answers to common questions for this industry.",
    faqItems: content.faqItems,
    ctaHeading: content.ctaHeading,
    ctaSubhead: content.ctaSubhead,
    serviceName: content.serviceName,
  });
}

export function adaptProductPageContent(content: ProductPageContent): PilotProductPageConfig {
  const accent = content.coverageAccent ?? "#6A7A8A";
  const related = content.relatedLinks
    ? relatedLinksToProducts(content.relatedLinks)
    : [];

  return buildPilotProductConfig({
    slug: content.slug,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    eyebrow: content.eyebrow,
    headline: content.headline,
    heroLead: content.subhead,
    photographySlug: content.photographySlug,
    accentColor: accent,
    quoteHref: content.quoteHref,
    quoteLabel: content.quoteLabel,
    secondaryCta: content.secondaryCta,
    trustStatement: content.whoItIsFor,
    coverageHeading: "What's covered",
    coverageIntro: content.coverageIntro,
    coverageItems: content.coverageTypes,
    considerations: content.considerations,
    relatedProducts: related,
    faqTitle: content.faqTitle,
    faqIntro: content.faqIntro ?? "Straight answers to common questions.",
    faqItems: content.faqItems,
    ctaHeading: content.ctaHeading,
    ctaSubhead: content.ctaSubhead,
    ctaQuoteLabel: content.ctaButtonLabel ?? content.quoteLabel,
    serviceName: content.serviceName,
  });
}
