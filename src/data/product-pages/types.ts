import type {
  ConsiderationItem,
  CoverageCard,
  RelatedLink,
} from "@/components/LineInsurancePage";
import type { FaqItem } from "@/components/FaqAccordion";

export type ProductPageContent = {
  slug: string;
  category: "personal" | "commercial";
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  headline: string;
  subhead: string;
  photographySlug?: string;
  quoteHref: string;
  quoteLabel: string;
  secondaryCta?: { label: string; href: string };
  ctaButtonLabel?: string;
  coverageIntro: string;
  coverageAccent?: string;
  coverageTypes: CoverageCard[];
  whoItIsFor?: string;
  considerations?: ConsiderationItem[];
  relatedLinks?: RelatedLink[];
  brokerHeading?: string;
  brokerCopy?: string;
  faqTitle: string;
  faqIntro?: string;
  faqItems: FaqItem[];
  ctaHeading: string;
  ctaSubhead: string;
  serviceName: string;
};
