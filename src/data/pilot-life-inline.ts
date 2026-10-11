"use client";

import { Heart, Shield, Users, BriefcaseMedical } from "lucide-react";
import {
  buildPilotProductConfig,
  relatedLinksToProducts,
} from "@/lib/buildPilotProductConfig";
import { personalBrokerSteps, PILOT_BROKER_HREF } from "@/data/pilot-product-shared";
import { lifeInsuranceNavLinks } from "@/data/nav-life";
import { LIFE_PAGE_META } from "@/data/life-page-meta";
import type { PilotProductPageConfig } from "@/types/pilot-product";

const LIFE_ACCENT = "#5B7A99";
const LIFE_INQUIRY = "/contact/?inquiry=life";

function lifeRelatedExcept(slug: string) {
  return relatedLinksToProducts(
    [
      { label: "Life Insurance Overview", href: "/life-insurance/" },
      ...lifeInsuranceNavLinks.map((link) => ({
        label: link.label,
        href: link.href,
      })),
    ].filter((link) => link.href !== `/${slug}/`),
  );
}

type LifeStubInput = {
  slug: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  heroLead: string;
  coverageHeading: string;
  coverageIntro: string;
  serviceName: string;
};

function buildLifeStub(input: LifeStubInput): PilotProductPageConfig {
  return buildPilotProductConfig({
    slug: input.slug,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    eyebrow: "Life Insurance",
    headline: input.headline,
    heroLead: input.heroLead,
    heroSupporting:
      "Premium coordinates life, disability, and group-benefits inquiries and connects you with licensed specialists through Oracle/head office — separate from our property and casualty quote process.",
    photographySlug: "life-insurance",
    accentColor: LIFE_ACCENT,
    quoteHref: LIFE_INQUIRY,
    quoteLabel: "Start a Life Inquiry",
    secondaryCta: { label: "Talk to a Broker", href: PILOT_BROKER_HREF },
    trustStatement:
      "Life-insurance advice and product recommendations come from licensed life-insurance professionals through Oracle/head office. Premium coordinates the inquiry — this is not individualized financial advice under RIBO P&C licensing.",
    coverageHeading: input.coverageHeading,
    coverageIntro: input.coverageIntro,
    coverageItems: [
      {
        id: "how-we-help",
        title: "How Premium Helps",
        shortLabel: "Coordination",
        description:
          "We gather your goals and connect you with a licensed life specialist — not an online P&C quote.",
        detailTitle: "Inquiry coordination, not underwriting",
        detailDescription:
          "Premium Insurance Brokers coordinates the relationship. Product recommendations and applications are handled by licensed life-insurance professionals.",
        icon: Heart,
      },
      {
        id: "what-to-expect",
        title: "What to Expect",
        shortLabel: "Next Steps",
        description:
          "Expect questions about needs, dependents, income, and timeline before a specialist conversation.",
        detailTitle: "A specialist conversation comes next",
        detailDescription:
          "Availability, amounts, and underwriting depend on the life specialist and insurer — not on Premium’s property and casualty quote tools.",
        icon: Shield,
      },
      {
        id: "related-protection",
        title: "Related Protection Paths",
        shortLabel: "Related",
        description:
          "Term, permanent, disability, and group benefits often sit alongside broader household planning.",
        detailTitle: "Explore the Life Insurance hub",
        detailDescription:
          "Use the Life Insurance overview for the full set of inquiry paths Premium can coordinate.",
        icon: Users,
      },
      {
        id: "when-to-ask",
        title: "When to Start an Inquiry",
        shortLabel: "Timing",
        description:
          "Common triggers include a mortgage, new dependents, business continuity needs, or employer benefits gaps.",
        detailTitle: "Start when your situation changes",
        detailDescription:
          "A brief inquiry helps a licensed specialist explain what may fit — without assuming any one product is right.",
        icon: BriefcaseMedical,
      },
    ],
    considerations: [
      {
        title: "Separate from P&C quotes",
        description:
          "Life and disability products are not sold through our online home/auto/commercial quote funnel.",
      },
      {
        title: "Licensed specialists advise",
        description:
          "Recommendations come from licensed life-insurance professionals through Oracle/head office.",
      },
      {
        title: "Underwriting still applies",
        description:
          "Health, age, amounts, and insurer guidelines affect what can actually be offered.",
      },
    ],
    considerationsPresentation: "expandable",
    brokerSteps: personalBrokerSteps,
    relatedProducts: lifeRelatedExcept(input.slug),
    relatedIntro:
      "Explore other life, disability, and benefits inquiry paths Premium can coordinate.",
    faqTitle: `${input.headline} FAQ`,
    faqIntro: "Straight answers about how life inquiries work with Premium.",
    faqItems: [
      {
        question: "Can I get a life insurance quote online here?",
        answer:
          "Not through our P&C quote tools. Start a life inquiry and Premium will coordinate a connection with a licensed life-insurance professional.",
      },
      {
        question: "Does Premium provide life-insurance advice under RIBO?",
        answer:
          "No. Our RIBO-licensed team focuses on property and casualty. Life-insurance advice is provided by licensed life professionals through Oracle/head office.",
      },
      {
        question: "What information should I have ready?",
        answer:
          "Goals, dependents, approximate coverage amount, timeline, and any existing employer benefits help a specialist conversation start productively.",
      },
    ],
    ctaHeading: `Ready to discuss ${input.headline.toLowerCase()}?`,
    ctaSubhead:
      "Start a life inquiry — Premium will coordinate your connection with a licensed specialist.",
    ctaQuoteLabel: "Start a Life Inquiry",
    serviceName: input.serviceName,
    schemaKind: "personal",
  });
}

export const pilotLifeInlineConfigs: Record<string, PilotProductPageConfig> = {
  "term-life-insurance": buildLifeStub({
    slug: "term-life-insurance",
    headline: "Term Life Insurance",
    metaTitle: LIFE_PAGE_META["term-life-insurance"].metaTitle,
    metaDescription: LIFE_PAGE_META["term-life-insurance"].metaDescription,
    heroLead:
      "Term life is often discussed for a defined period — such as while a mortgage or family income need is highest. Premium coordinates your inquiry with a licensed life specialist.",
    coverageHeading: "Term life topics we review",
    coverageIntro:
      "This page introduces the inquiry path — product details and suitability come from a licensed life specialist.",
    serviceName: "Term Life Insurance Inquiry",
  }),
  "whole-life-insurance": buildLifeStub({
    slug: "whole-life-insurance",
    headline: "Whole Life Insurance",
    metaTitle: LIFE_PAGE_META["whole-life-insurance"].metaTitle,
    metaDescription: LIFE_PAGE_META["whole-life-insurance"].metaDescription,
    heroLead:
      "Whole life is a permanent-life structure that may include cash-value features depending on design. Premium coordinates your inquiry with a licensed life specialist.",
    coverageHeading: "Whole life topics we review",
    coverageIntro:
      "Use this page to start an inquiry — recommendations depend on goals, budget, and underwriting.",
    serviceName: "Whole Life Insurance Inquiry",
  }),
  "universal-life-insurance": buildLifeStub({
    slug: "universal-life-insurance",
    headline: "Universal Life Insurance",
    metaTitle: LIFE_PAGE_META["universal-life-insurance"].metaTitle,
    metaDescription: LIFE_PAGE_META["universal-life-insurance"].metaDescription,
    heroLead:
      "Universal life products can offer flexible premium and benefit structures, subject to product design and underwriting. Premium coordinates your inquiry with a licensed life specialist.",
    coverageHeading: "Universal life topics we review",
    coverageIntro:
      "This stub introduces the inquiry path while Phase 2 content is expanded.",
    serviceName: "Universal Life Insurance Inquiry",
  }),
  "disability-insurance": buildLifeStub({
    slug: "disability-insurance",
    headline: "Disability Insurance",
    metaTitle: LIFE_PAGE_META["disability-insurance"].metaTitle,
    metaDescription: LIFE_PAGE_META["disability-insurance"].metaDescription,
    heroLead:
      "Disability coverage is often discussed for income protection if illness or injury interrupts earnings. Premium coordinates your inquiry with a licensed specialist.",
    coverageHeading: "Disability topics we review",
    coverageIntro:
      "Start an inquiry to discuss occupation, benefit period, and how employer benefits may interact.",
    serviceName: "Disability Insurance Inquiry",
  }),
  "group-benefits": buildLifeStub({
    slug: "group-benefits",
    headline: "Group Benefits",
    metaTitle: LIFE_PAGE_META["group-benefits"].metaTitle,
    metaDescription: LIFE_PAGE_META["group-benefits"].metaDescription,
    heroLead:
      "Group benefits programs may include life, disability, and extended health options for employees or members. Premium coordinates employer and association inquiries with licensed specialists.",
    coverageHeading: "Group benefits topics we review",
    coverageIntro:
      "Use this page to start an inquiry — plan design depends on group size, industry, and specialist markets.",
    serviceName: "Group Benefits Inquiry",
  }),
};

export function getPilotLifeConfig(slug: string): PilotProductPageConfig | null {
  return pilotLifeInlineConfigs[slug] ?? null;
}
