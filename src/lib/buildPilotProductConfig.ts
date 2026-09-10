import type {
  ConsiderationItem,
  CoverageCard,
  RelatedLink,
} from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";
import { insuranceAgencyProvider } from "@/components/LineInsurancePage";
import type { ProductPageContent } from "@/data/product-pages/types";
import {
  DEFAULT_RELATED_HEADING,
  DEFAULT_RELATED_INTRO,
  PILOT_BROKER_HREF,
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

/** Infer hero photography slug from common personal route hrefs. */
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
  };
  return map[href] ?? "home-insurance";
}

export function relatedLinksToProducts(links: RelatedLink[]): ProductRelatedItem[] {
  return links.map((link) => ({
    label: link.label.replace(/ Insurance$/i, ""),
    href: link.href,
    photoSlug: photoSlugFromHref(link.href),
  }));
}

export function buildPilotProductConfig(
  input: BuildPilotProductConfigInput,
): PilotProductPageConfig {
  return {
    slug: input.slug,
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
