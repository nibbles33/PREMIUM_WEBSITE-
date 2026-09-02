"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Car,
  CloudLightning,
  HeartPulse,
  Shield,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import Header from "@/components/Header";
import MiniatureObject from "@/components/pilot/MiniatureObject";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  insuranceAgencyProvider,
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";
import { getPageHeroPhotography } from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import "@/styles/pilot.css";

const BROKER_HREF = "/talk-to-a-broker/";
const AUTO_ACCENT = "#5B7A99";

const coverageTypes = [
  {
    title: "Liability Coverage",
    description:
      "Protects you if you're responsible for injury or damage to others.",
    icon: Shield,
  },
  {
    title: "Collision Coverage",
    description:
      "Repairs or replaces your vehicle after a collision, regardless of fault.",
    icon: Car,
  },
  {
    title: "Comprehensive Coverage",
    description:
      "Covers theft, vandalism, weather damage, and other non-collision events.",
    icon: CloudLightning,
  },
  {
    title: "Accident Benefits",
    description:
      "Medical, rehabilitation, and income replacement support after an accident — mandatory coverage in Ontario.",
    icon: HeartPulse,
  },
];

const faqItems = [
  {
    question: "Is auto insurance mandatory in Ontario?",
    answer:
      "Yes. All Ontario drivers are legally required to carry auto insurance. At minimum, that includes third-party liability and accident benefits. Optional coverages like collision and comprehensive protect your own vehicle.",
  },
  {
    question:
      "What's the difference between collision and comprehensive coverage?",
    answer:
      "Collision covers damage to your vehicle from a crash with another vehicle or object, regardless of fault. Comprehensive covers non-collision events such as theft, vandalism, hail, fire, and hitting an animal.",
  },
  {
    question: "Will my rates change if I switch brokers?",
    answer:
      "Your premium depends on your vehicle, driving history, coverage choices, and the carrier — not on which broker you call. An independent broker can compare multiple insurers, so you may find a better fit for your situation, but savings aren't guaranteed.",
  },
  {
    question: "What information do I need for a quote?",
    answer:
      "Have your vehicle details ready (make, model, year, and VIN if available), your driving history, and information about any current coverage. That helps your broker compare options accurately.",
  },
  {
    question: "Do I need collision and comprehensive coverage?",
    answer:
      "Not always. If your vehicle is financed or leased, your lender usually requires both. For an owned vehicle, it depends on the car's value and how much risk you're comfortable carrying. A broker can help you weigh the trade-offs.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Auto Insurance",
  description:
    "Ontario auto insurance through an independent Windsor-Essex broker — liability, collision, comprehensive, and accident benefits.",
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: "Auto Insurance",
};

const relatedPersonal = [
  { label: "Motorcycle", href: "/motorcycle-insurance/" },
  { label: "Home", href: "/home-insurance/" },
  { label: "Tenant", href: "/tenant-insurance/" },
  { label: "Travel", href: "/travel-insurance/" },
];

export default function PilotAutoPage() {
  const reduceMotion = usePrefersReducedMotion();
  const heroPhoto = getPageHeroPhotography("auto-insurance");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section
          className="pilot-page-hero relative overflow-hidden border-b border-border bg-offwhite"
          aria-labelledby="pilot-auto-hero-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            aria-hidden
            style={{
              background: `linear-gradient(135deg, ${AUTO_ACCENT} 0%, transparent 60%)`,
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
              <RevealOnScroll>
                <div className="max-w-xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                    Personal Insurance
                  </p>
                  <h1
                    id="pilot-auto-hero-heading"
                    className="mt-3 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl lg:text-[3.5rem]"
                  >
                    Auto Insurance
                  </h1>
                  <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base lg:text-lg">
                    Coverage that keeps you moving — liability, collision, and
                    comprehensive protection built around how you actually drive.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <PremiumPilotButton href="/get-a-quote?type=vehicle">
                      Get an Auto Quote
                    </PremiumPilotButton>
                    <PremiumPilotButton href={BROKER_HREF} variant="secondary">
                      Talk to a Broker
                    </PremiumPilotButton>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll className="relative">
                {heroPhoto ? (
                  <div className="pilot-page-hero-photo relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-[0_20px_48px_rgba(32,39,40,0.12)] sm:aspect-[16/11] lg:aspect-[5/4]">
                    <Image
                      src={heroPhoto.src}
                      alt={heroPhoto.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 540px"
                      className="object-cover"
                    />
                    <div className="pilot-road-accent" aria-hidden />
                  </div>
                ) : null}
                <div
                  className="absolute -bottom-4 -left-2 hidden sm:block"
                  aria-hidden
                >
                  <MiniatureObject slot="car" width={72} decorative />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Trust transition */}
        <section className="border-b border-border bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-[15px] leading-relaxed text-secondary sm:text-base">
              Ontario auto insurance through an independent Windsor-Essex broker
              — explained in plain language, compared across multiple markets.
            </p>
          </div>
        </section>

        {/* Coverage discovery */}
        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="pilot-auto-coverage-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="pilot-auto-coverage-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                >
                  What&apos;s covered
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                  Standard Ontario auto insurance building blocks, explained
                  without the jargon.
                </p>
              </div>
            </RevealOnScroll>

            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
              {coverageTypes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={item.title}>
                    <RevealOnScroll className="h-full">
                      <div
                        className="pilot-coverage-card flex h-full flex-col rounded-xl border border-border bg-white p-7 sm:p-8"
                        style={{
                          transitionDelay: reduceMotion
                            ? undefined
                            : `${index * 60}ms`,
                        }}
                      >
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${AUTO_ACCENT} 14%, #FAFAF8)`,
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: AUTO_ACCENT }}
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

        {/* Broker differentiation */}
        <section
          className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
          aria-labelledby="pilot-auto-broker-heading"
        >
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2
                id="pilot-auto-broker-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Why go through a broker
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                {sharedBrokerCopy}
              </p>
              <div className="mt-8">
                <PremiumPilotButton href={BROKER_HREF} variant="secondary">
                  Talk to a Broker
                </PremiumPilotButton>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Related personal */}
        <section
          className="border-b border-border bg-[#FBF5E5] py-10 sm:py-12"
          aria-labelledby="pilot-auto-related-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <h2
                id="pilot-auto-related-heading"
                className="text-lg font-medium text-charcoal"
              >
                Related personal coverage
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {relatedPersonal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-[14px] font-medium text-charcoal transition-colors hover:border-gold-dark hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="pilot-auto-faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <h2
                id="pilot-auto-faq-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
              >
                Auto insurance FAQ
              </h2>
              <p className="mt-3 text-[15px] text-secondary">
                Straight answers to common Ontario auto insurance questions.
              </p>
            </RevealOnScroll>
            <div className="mt-8">
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby="pilot-auto-cta-heading"
        >
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <RevealOnScroll>
              <h2
                id="pilot-auto-cta-heading"
                className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
              >
                Ready to get covered?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                Tell us about your vehicle — we&apos;ll compare options and
                explain what actually fits.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PremiumPilotButton href="/get-a-quote?type=vehicle">
                  Get an Auto Quote
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
