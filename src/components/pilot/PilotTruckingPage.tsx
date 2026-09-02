"use client";

import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import Header from "@/components/Header";
import MiniatureObject from "@/components/pilot/MiniatureObject";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import { insuranceAgencyProvider } from "@/components/LineInsurancePage";
import {
  commercialBrokerCopy,
  industryPages,
} from "@/data/commercial-industries";
import { getPageHeroPhotography } from "@/data/photography";
import "@/styles/pilot.css";

const BROKER_HREF = "/talk-to-a-broker/";
const TRUCKING_ACCENT = "#5A8A73";

const content = industryPages.find((page) => page.slug === "trucking-insurance")!;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: content.serviceName,
  description: content.metaDescription,
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: content.serviceName,
};

const relatedCommercial = [
  { label: "Commercial Auto", href: "/commercial-auto-insurance/" },
  { label: "Dump Trucks", href: "/dump-truck-insurance/" },
  { label: "Cargo & Freight", href: "/cargo-freight-insurance/" },
  { label: "Contractors", href: "/contractors-insurance/" },
];

export default function PilotTruckingPage() {
  const heroPhoto = getPageHeroPhotography("trucking-insurance");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section
          className="pilot-page-hero relative overflow-hidden bg-charcoal"
          aria-labelledby="pilot-trucking-hero-heading"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {heroPhoto ? (
              <Image
                src={heroPhoto.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-40"
              />
            ) : null}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(32,39,40,0.95) 0%, rgba(32,39,40,0.75) 50%, rgba(32,39,40,0.55) 100%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:max-w-7xl">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <RevealOnScroll>
                <div className="max-w-xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                    Commercial Insurance · Windsor-Essex
                  </p>
                  <h1
                    id="pilot-trucking-hero-heading"
                    className="mt-3 text-[2.5rem] font-medium leading-[1.06] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.75rem]"
                  >
                    {content.headline}
                  </h1>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/75 sm:text-base lg:text-lg">
                    {content.subhead}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <PremiumPilotButton href={content.quoteHref}>
                      {content.quoteLabel}
                    </PremiumPilotButton>
                    <PremiumPilotButton
                      href={BROKER_HREF}
                      variant="secondary"
                      showArrow={false}
                      className="border-white/40 text-white hover:border-gold hover:text-gold"
                    >
                      Talk to a Broker
                    </PremiumPilotButton>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll className="relative hidden lg:block">
                <div className="flex justify-end" aria-hidden>
                  <MiniatureObject slot="semi-truck" width={140} decorative />
                </div>
              </RevealOnScroll>
            </div>
            <div className="pilot-road-accent mt-8 opacity-90" aria-hidden />
          </div>
        </section>

        <section className="border-b border-border bg-[#2a3132] py-8 sm:py-10">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-[15px] leading-relaxed text-white/70 sm:text-base">
              These people understand your operation — cargo, liability, physical
              damage, and cross-border coverage for Windsor-Essex haulers.
            </p>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="pilot-trucking-coverage-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="pilot-trucking-coverage-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                >
                  What&apos;s covered
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                  {content.coverageIntro}
                </p>
              </div>
            </RevealOnScroll>

            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {content.coverageTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title}>
                    <RevealOnScroll className="h-full">
                      <div className="pilot-coverage-card flex h-full flex-col rounded-xl border border-border bg-white p-7 sm:p-8">
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${TRUCKING_ACCENT} 14%, #FAFAF8)`,
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: TRUCKING_ACCENT }}
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </span>
                        <h3 className="mt-5 text-lg font-medium text-charcoal">
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

        <section
          className="border-b border-border bg-white py-14 sm:py-16"
          aria-labelledby="pilot-trucking-broker-heading"
        >
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <RevealOnScroll>
              <h2
                id="pilot-trucking-broker-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Why go through a broker
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                {commercialBrokerCopy}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-charcoal py-10 sm:py-12"
          aria-labelledby="pilot-trucking-related-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2
                id="pilot-trucking-related-heading"
                className="text-lg font-medium text-white"
              >
                Related commercial coverage
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {relatedCommercial.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-white/15 bg-[#2a3132] px-4 py-2 text-[14px] font-medium text-white/85 transition-colors hover:border-gold/45 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="pilot-trucking-faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2
                id="pilot-trucking-faq-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                {content.faqTitle}
              </h2>
              <p className="mt-3 text-[15px] text-secondary">
                Straight answers to common questions for this industry.
              </p>
            </RevealOnScroll>
            <div className="mt-8">
              <FaqAccordion items={content.faqItems} />
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby="pilot-trucking-cta-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden
            style={{
              background: `linear-gradient(135deg, ${TRUCKING_ACCENT} 0%, transparent 50%)`,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <RevealOnScroll>
              <h2
                id="pilot-trucking-cta-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
              >
                {content.ctaHeading}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                {content.ctaSubhead}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PremiumPilotButton href={content.quoteHref}>
                  {content.quoteLabel}
                </PremiumPilotButton>
                <PremiumPilotButton
                  href={BROKER_HREF}
                  variant="secondary"
                  showArrow={false}
                  className="border-white/40 text-white hover:border-gold hover:text-gold"
                >
                  Talk to a Broker
                </PremiumPilotButton>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}
