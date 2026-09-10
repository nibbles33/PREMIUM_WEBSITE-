import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import Header from "@/components/Header";
import PageHeroPhoto from "@/components/PageHeroPhoto";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getPageHeroPhotography } from "@/data/photography";

const BROKER_HREF = "/talk-to-a-broker/";
const PHONE_DISPLAY = "226-782-6000";
const PHONE_HREF = "tel:+12267826000";

export type CoverageCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ConsiderationItem = {
  title: string;
  description: string;
};

export type RelatedLink = {
  label: string;
  href: string;
};

export type LineInsurancePageProps = {
  heroHeadingId: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  /** Slug matching src/data/photography/placements.ts for hero imagery. */
  photographySlug?: string;
  quoteHref: string;
  quoteLabel: string;
  /** Overrides the default Talk to a Broker secondary hero CTA. */
  secondaryCta?: { label: string; href: string };
  /** When set, replaces the default coverage-card section. */
  middleSection?: ReactNode;
  coverageIntro?: string;
  coverageAccent?: string;
  coverageTypes?: CoverageCard[];
  whoItIsFor?: string;
  considerations?: ConsiderationItem[];
  relatedLinks?: RelatedLink[];
  brokerHeading?: string;
  brokerCopy: string;
  faqTitle: string;
  faqIntro: string;
  faqItems: FaqItem[];
  ctaHeadingId: string;
  ctaHeading: string;
  ctaSubhead: string;
  ctaButtonLabel?: string;
  jsonLd: Record<string, unknown>;
};

export default function LineInsurancePage({
  heroHeadingId,
  eyebrow,
  headline,
  subhead,
  photographySlug,
  quoteHref,
  quoteLabel,
  secondaryCta,
  middleSection,
  coverageIntro,
  coverageAccent = "#5A8A73",
  coverageTypes = [],
  whoItIsFor,
  considerations = [],
  relatedLinks = [],
  brokerHeading = "Why go through a broker",
  brokerCopy,
  faqTitle,
  faqIntro,
  faqItems,
  ctaHeadingId,
  ctaHeading,
  ctaSubhead,
  ctaButtonLabel = "Get a Quote",
  jsonLd,
}: LineInsurancePageProps) {
  const heroPhoto = photographySlug
    ? getPageHeroPhotography(photographySlug)
    : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section
          className="border-b border-border bg-offwhite"
          aria-labelledby={heroHeadingId}
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div
                className={
                  heroPhoto
                    ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12"
                    : undefined
                }
              >
                <div className="max-w-2xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs sm:tracking-[0.14em]">
                    {eyebrow}
                  </p>
                  <h1
                    id={heroHeadingId}
                    className="mt-3 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:mt-4 sm:text-5xl sm:leading-[1.06] lg:text-[3.5rem]"
                  >
                    {headline}
                  </h1>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base lg:text-lg">
                    {subhead}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link
                      href={quoteHref}
                      className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[220px]"
                    >
                      {quoteLabel}
                      <span
                        aria-hidden
                        className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                      >
                        →
                      </span>
                    </Link>
                    <Link
                      href={secondaryCta?.href ?? BROKER_HREF}
                      className="btn-secondary inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md border border-border px-6 text-[15px] font-medium text-gold-dark hover:border-gold-dark sm:w-auto"
                    >
                      {secondaryCta?.label ?? "Talk to a Broker"}
                    </Link>
                  </div>
                </div>
                {heroPhoto ? (
                  <PageHeroPhoto placement={heroPhoto} priority />
                ) : null}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {middleSection ?? (
          <section
            className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
            aria-labelledby="coverage-heading"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
              <RevealOnScroll>
                <div className="mx-auto max-w-2xl text-center">
                  <h2
                    id="coverage-heading"
                    className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                  >
                    What&apos;s covered
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
                    {coverageIntro}
                  </p>
                </div>
              </RevealOnScroll>

              <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                {coverageTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title}>
                      <RevealOnScroll className="h-full">
                        <div className="flex h-full flex-col border border-border bg-offwhite p-7 sm:p-8">
                          <span
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${coverageAccent} 14%, #FAFAF8)`,
                            }}
                          >
                            <Icon
                              className="h-5 w-5"
                              style={{ color: coverageAccent }}
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </span>
                          <h3 className="mt-5 text-lg font-medium tracking-tight text-charcoal">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </RevealOnScroll>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {whoItIsFor ? (
          <section
            className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
            aria-labelledby="who-heading"
          >
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <RevealOnScroll>
                <h2
                  id="who-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                >
                  Who this is for
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  {whoItIsFor}
                </p>
              </RevealOnScroll>
            </div>
          </section>
        ) : null}

        {considerations.length > 0 ? (
          <section
            className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
            aria-labelledby="considerations-heading"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
              <RevealOnScroll>
                <div className="mx-auto max-w-2xl text-center">
                  <h2
                    id="considerations-heading"
                    className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                  >
                    Practical considerations
                  </h2>
                </div>
              </RevealOnScroll>
              <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                {considerations.map((item) => (
                  <li key={item.title}>
                    <RevealOnScroll className="h-full">
                      <div className="h-full border border-border bg-offwhite p-6 sm:p-7">
                        <h3 className="text-lg font-medium text-charcoal">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </RevealOnScroll>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {relatedLinks.length > 0 ? (
          <section
            className="border-b border-border bg-offwhite py-10 sm:py-12"
            aria-labelledby="related-heading"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
              <RevealOnScroll>
                <h2
                  id="related-heading"
                  className="text-lg font-medium text-charcoal"
                >
                  Related coverage
                </h2>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] font-medium text-gold-dark underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>
          </section>
        ) : null}

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="broker-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="broker-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                >
                  {brokerHeading}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  {brokerCopy}
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href={BROKER_HREF}
                    className="btn-secondary inline-flex h-12 min-w-[44px] items-center justify-center rounded-md border border-charcoal/70 bg-transparent px-6 text-sm font-medium text-charcoal hover:border-gold-dark hover:text-gold-dark sm:min-w-[200px]"
                  >
                    Talk to a Broker
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2
                id="faq-heading"
                className="text-center text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                {faqTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-secondary sm:text-base">
                {faqIntro}
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="mt-10 sm:mt-12">
              <FaqAccordion items={faqItems} />
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby={ctaHeadingId}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id={ctaHeadingId}
                  className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
                >
                  {ctaHeading}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65 sm:text-base">
                  {ctaSubhead}
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:mt-9">
                  <Link
                    href={quoteHref}
                    className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[220px]"
                  >
                    {ctaButtonLabel}
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </Link>
                  <a
                    href={PHONE_HREF}
                    className="text-[15px] font-medium text-gold transition-colors hover:text-white"
                  >
                    Or call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}

export const sharedBrokerCopy =
  "Independent advice means we compare multiple carriers — not just one company's products. You get clear explanations of what's covered, and real support if you ever need to file a claim.";

export function insuranceAgencyProvider() {
  return {
    "@type": "InsuranceAgency",
    name: "Premium Insurance Brokers",
    telephone: "+1-226-782-6000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3063 Dougall Ave",
      addressLocality: "Windsor",
      addressRegion: "ON",
      postalCode: "N9E 1S7",
      addressCountry: "CA",
    },
    url: "https://premiumib.com/",
  };
}
