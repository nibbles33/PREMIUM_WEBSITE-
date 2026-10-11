"use client";

import {
  CalendarRange,
  Heart,
  PiggyBank,
  RefreshCw,
  Shield,
  BriefcaseMedical,
  Building2,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  buildPilotProductConfig,
  relatedLinksToProducts,
} from "@/lib/buildPilotProductConfig";
import { personalBrokerSteps, PILOT_BROKER_HREF } from "@/data/pilot-product-shared";
import { lifeInsuranceNavLinks } from "@/data/nav-life";
import { LIFE_PAGE_META } from "@/data/life-page-meta";
import type { PilotProductPageConfig } from "@/types/pilot-product";

const LIFE_ACCENT = "#5B7A99";

type CoverageItemInput = {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
  detailTitle: string;
  detailDescription: string;
  icon: LucideIcon;
};

type LifePageInput = {
  slug: string;
  headline: string;
  subtitle: string;
  heroLead: string;
  heroSupporting: string;
  coverageIntro: string;
  coverageItems: CoverageItemInput[];
  serviceName: string;
};

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

function buildLifePage(input: LifePageInput): PilotProductPageConfig {
  const meta = LIFE_PAGE_META[input.slug];
  return buildPilotProductConfig({
    slug: input.slug,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    eyebrow: "Life Insurance",
    headline: input.headline,
    heroLead: input.heroLead,
    heroSupporting: input.heroSupporting,
    photographySlug: input.slug,
    accentColor: LIFE_ACCENT,
    quoteHref: `/get-a-quote/?product=${input.slug}`,
    quoteLabel: "Get a Quote",
    brokerHref: PILOT_BROKER_HREF,
    secondaryCta: { label: "Talk to a Broker", href: PILOT_BROKER_HREF },
    trustStatement:
      "Premium coordinates life, disability, and group-benefits inquiries and connects you with licensed specialists through Oracle/head office — separate from our property and casualty quote process. Product recommendations come from licensed life professionals, not from our RIBO P&C team.",
    coverageHeading: "Explore Coverage Options",
    coverageIntro: input.coverageIntro,
    coverageExplorerLabel: "Coverage options",
    coverageItems: input.coverageItems,
    considerations: [
      {
        title: "Protection for your family’s future",
        description: input.subtitle,
      },
      {
        title: "Licensed specialists advise",
        description:
          "Recommendations and applications are handled by licensed life-insurance professionals through Oracle/head office.",
      },
      {
        title: "Underwriting still applies",
        description:
          "Health, age, amounts, occupation, and insurer guidelines affect what can actually be offered.",
      },
    ],
    considerationsPresentation: "expandable",
    brokerSteps: personalBrokerSteps,
    relatedProducts: lifeRelatedExcept(input.slug),
    relatedHeading: "More Life Insurance paths",
    relatedIntro:
      "Explore other life, disability, and benefits inquiry paths — or return to the Life Insurance hub.",
    faqTitle: `${input.headline} FAQ`,
    faqIntro: "Straight answers about how this coverage path works with Premium.",
    faqItems: [
      {
        question: "Can I get an instant online quote here?",
        answer:
          "Life and disability products are not sold through our P&C quote tools. Use Get a Quote or Talk to a Broker and Premium will coordinate a licensed specialist conversation.",
      },
      {
        question: "Does Premium provide life-insurance advice under RIBO?",
        answer:
          "No. Our RIBO-licensed team focuses on property and casualty. Life-insurance advice is provided by licensed life professionals through Oracle/head office.",
      },
      {
        question: "What information should I have ready?",
        answer:
          "Goals, dependents, approximate coverage amount, timeline, occupation (for disability), and any existing employer benefits help a specialist conversation start productively.",
      },
    ],
    ctaHeading: `Ready to explore ${input.headline.toLowerCase()}?`,
    ctaSubhead:
      "Get a quote inquiry started — or talk to a broker and Premium will coordinate the next step with a licensed specialist.",
    ctaQuoteLabel: "Get a Quote",
    serviceName: input.serviceName,
    schemaKind: "personal",
  });
}

export const pilotLifeInlineConfigs: Record<string, PilotProductPageConfig> = {
  "term-life-insurance": buildLifePage({
    slug: "term-life-insurance",
    headline: "Term Life Insurance",
    subtitle: "Protection for your family’s future during peak earning years.",
    heroLead:
      "Term Life Insurance provides affordable, temporary coverage for a set period (commonly 10, 20, or 30 years). It is ideal for protecting loved ones during peak earning years when mortgage, education, and family expenses are highest.",
    heroSupporting:
      "Coverage is designed for a defined term and typically ends after that period unless renewed or converted under the policy’s terms. Premium coordinates your inquiry with a licensed life specialist who can explain options for your situation.",
    coverageIntro:
      "Explore how term length, benefit amounts, and household needs usually fit together — then start an inquiry for specialist guidance.",
    coverageItems: [
      {
        id: "term-length-options",
        title: "Term Length Options",
        shortLabel: "Term Length",
        description:
          "Common terms include 10, 20, or 30 years — matched to mortgages, dependents, or peak income years.",
        detailTitle: "Choose a horizon that matches the risk",
        detailDescription:
          "Shorter or longer terms change premium and how long the death benefit can remain in force. A licensed specialist can help align term length with debts and family needs.",
        icon: CalendarRange,
      },
      {
        id: "family-income-protection",
        title: "Family Income Protection",
        shortLabel: "Income",
        description:
          "A death benefit can help replace income used for housing, childcare, and daily living costs.",
        detailTitle: "Protect the years that matter most",
        detailDescription:
          "Term life is often discussed when household cash flow depends on one or more earners. Amounts and underwriting depend on the specialist and insurer.",
        icon: Heart,
      },
      {
        id: "renewal-conversion",
        title: "Renewal & Conversion Paths",
        shortLabel: "Next Steps",
        description:
          "Some policies allow renewal or conversion after the initial term — rules vary by product.",
        detailTitle: "Ask what happens when the term ends",
        detailDescription:
          "Do not assume coverage continues automatically. Confirm renewal, conversion, and expiry rules with a licensed life professional before you need them.",
        icon: RefreshCw,
      },
    ],
    serviceName: "Term Life Insurance",
  }),
  "whole-life-insurance": buildLifePage({
    slug: "whole-life-insurance",
    headline: "Whole Life Insurance",
    subtitle: "Lifetime protection with a potential cash-value component.",
    heroLead:
      "Whole Life Insurance offers lifetime protection that is designed not to expire as long as required premiums are maintained. Many designs also build cash value over time while maintaining a guaranteed death benefit structure.",
    heroSupporting:
      "That combination of permanent protection and a savings-style component is why whole life is often discussed as a longer-term planning tool. Suitability, guarantees, and cash-value features depend on product design — a licensed specialist can explain what may fit.",
    coverageIntro:
      "Explore lifetime coverage, cash-value growth, and how whole life differs from temporary term protection.",
    coverageItems: [
      {
        id: "lifetime-protection",
        title: "Lifetime Protection",
        shortLabel: "Lifetime",
        description:
          "Coverage is designed to remain in force for life when premiums and policy conditions are met.",
        detailTitle: "Protection that is built to last",
        detailDescription:
          "Whole life is commonly considered when the need for a death benefit is expected to continue beyond a fixed term. Exact guarantees depend on the insurer and contract.",
        icon: Shield,
      },
      {
        id: "cash-value-growth",
        title: "Cash Value Growth",
        shortLabel: "Cash Value",
        description:
          "Many whole life designs accumulate cash value that may be accessed under policy rules.",
        detailTitle: "A savings component — with conditions",
        detailDescription:
          "Cash value is not a bank account. Access methods, tax treatment, and impacts on the death benefit should be reviewed with a licensed life professional.",
        icon: PiggyBank,
      },
      {
        id: "long-term-planning",
        title: "Long-Term Planning Uses",
        shortLabel: "Planning",
        description:
          "Often discussed for estate, legacy, or lifelong dependency planning alongside other coverage.",
        detailTitle: "Fit the tool to the goal",
        detailDescription:
          "Whole life is one of several permanent options. A specialist can compare it with term or universal designs based on budget and objectives.",
        icon: Wallet,
      },
    ],
    serviceName: "Whole Life Insurance",
  }),
  "universal-life-insurance": buildLifePage({
    slug: "universal-life-insurance",
    headline: "Universal Life Insurance",
    subtitle: "Flexible permanent protection with adjustable design options.",
    heroLead:
      "Universal Life Insurance combines permanent protection with more flexibility than many whole life designs. Depending on the product, premiums and death benefits may be adjustable as your needs change.",
    heroSupporting:
      "Cash value can accumulate at rates tied to the product’s design while lifelong coverage remains available if the policy is funded and maintained correctly. A licensed specialist can explain flexibility, risks, and funding requirements.",
    coverageIntro:
      "Explore flexible premiums, permanent coverage, and how universal life differs from whole life and term.",
    coverageItems: [
      {
        id: "flexible-premiums",
        title: "Flexible Premium Structures",
        shortLabel: "Flexibility",
        description:
          "Many universal life designs allow premium adjustments within product rules as cash-flow needs change.",
        detailTitle: "Flexibility still has boundaries",
        detailDescription:
          "Underfunding a universal life policy can put coverage at risk. Ask a licensed specialist how minimum funding and charges work before relying on flexibility.",
        icon: RefreshCw,
      },
      {
        id: "adjustable-benefits",
        title: "Adjustable Death Benefits",
        shortLabel: "Benefits",
        description:
          "Some products allow death-benefit changes subject to underwriting and contract terms.",
        detailTitle: "Coverage that can evolve",
        detailDescription:
          "Increases often require new underwriting. Decreases and option changes should be reviewed for impact on cash value and guarantees.",
        icon: Heart,
      },
      {
        id: "cash-value-control",
        title: "Cash Value & Control",
        shortLabel: "Control",
        description:
          "Build cash value while maintaining permanent coverage — with more levers than traditional whole life.",
        detailTitle: "More control means more decisions",
        detailDescription:
          "Crediting rates, fees, and investment-linked features vary widely. Specialist guidance helps separate illustrated values from contractual guarantees.",
        icon: PiggyBank,
      },
    ],
    serviceName: "Universal Life Insurance",
  }),
  "disability-insurance": buildLifePage({
    slug: "disability-insurance",
    headline: "Disability Insurance",
    subtitle: "Income protection if illness or injury keeps you from working.",
    heroLead:
      "Disability Insurance helps protect your income if illness or injury prevents you from working. Many designs aim to replace a portion of gross income — often discussed in the 50–70% range — during short-term or long-term disabilities.",
    heroSupporting:
      "It is essential coverage for anyone whose household depends on a paycheck. Definitions of disability, waiting periods, and benefit lengths vary by product — Premium coordinates your inquiry with a licensed specialist.",
    coverageIntro:
      "Explore income replacement, benefit periods, and how disability coverage can work alongside employer plans.",
    coverageItems: [
      {
        id: "income-replacement",
        title: "Income Replacement",
        shortLabel: "Income",
        description:
          "Benefits are typically designed to replace a portion of earnings while you are disabled under the policy definition.",
        detailTitle: "Replace paycheck risk — not every dollar",
        detailDescription:
          "Replacement percentages, maximums, and offsets for other income differ by insurer. A specialist can model what may be available for your occupation.",
        icon: Wallet,
      },
      {
        id: "benefit-periods",
        title: "Benefit Periods & Waiting Times",
        shortLabel: "Periods",
        description:
          "Short-term and long-term designs use elimination periods and benefit durations that change premium and fit.",
        detailTitle: "Timing matters as much as amount",
        detailDescription:
          "Ask how long you must wait before benefits begin and how long they can continue. Emergency savings and employer sick leave often interact with these choices.",
        icon: CalendarRange,
      },
      {
        id: "occupation-definitions",
        title: "Occupation Definitions",
        shortLabel: "Occupation",
        description:
          "Own-occupation vs any-occupation wording changes when a claim may qualify — especially for specialists and trades.",
        detailTitle: "Read the definition carefully",
        detailDescription:
          "Two policies with similar premiums can respond very differently. Licensed advice helps match definition language to how you actually earn income.",
        icon: BriefcaseMedical,
      },
    ],
    serviceName: "Disability Insurance",
  }),
  "group-benefits": buildLifePage({
    slug: "group-benefits",
    headline: "Group Benefits",
    subtitle: "Competitive benefits packages for employers and associations.",
    heroLead:
      "Group Benefits provide comprehensive coverage through employer or association programs. Plans may include life insurance, disability, dental, vision, and health coverage at group rates.",
    heroSupporting:
      "They are ideal for businesses offering competitive benefits packages to attract and retain talent. Premium coordinates employer and association inquiries with licensed specialists who can discuss plan design and market options.",
    coverageIntro:
      "Explore life and disability lines, health-related benefits, and how group programs support hiring and retention.",
    coverageItems: [
      {
        id: "group-life-disability",
        title: "Group Life & Disability",
        shortLabel: "Life & DI",
        description:
          "Core income and life protection lines often form the backbone of an employer benefits package.",
        detailTitle: "Protect people and continuity",
        detailDescription:
          "Group life and disability amounts, eligibility waiting periods, and conversion options vary by carrier and plan size.",
        icon: Shield,
      },
      {
        id: "health-dental-vision",
        title: "Health, Dental & Vision",
        shortLabel: "Health",
        description:
          "Extended health, dental, and vision benefits help employees manage day-to-day care costs.",
        detailTitle: "Design for your workforce",
        detailDescription:
          "Deductibles, maximums, and paramedical coverage should reflect your industry and talent goals. A specialist can compare plan structures.",
        icon: Heart,
      },
      {
        id: "employer-talent",
        title: "Employer & Association Programs",
        shortLabel: "Employers",
        description:
          "Group rates and plan administration support recruitment, retention, and association member value.",
        detailTitle: "Benefits as a business tool",
        detailDescription:
          "Tell us about headcount, industry, and current coverage. Licensed specialists can outline what markets may support for your group.",
        icon: Building2,
      },
    ],
    serviceName: "Group Benefits",
  }),
};

export function getPilotLifeConfig(slug: string): PilotProductPageConfig | null {
  return pilotLifeInlineConfigs[slug] ?? null;
}
