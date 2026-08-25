import Link from "next/link";
import type { Metadata } from "next";
import {
  Car,
  CloudLightning,
  HeartPulse,
  Shield,
  type LucideIcon,
} from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import Header from "@/components/Header";
import RevealOnScroll from "@/components/RevealOnScroll";

const QUOTE_HREF = "/get-a-quote?type=vehicle";
const BROKER_HREF = "/talk-to-a-broker/";
const PHONE_DISPLAY = "226-782-6000";
const PHONE_HREF = "tel:+12267826000";

export const metadata: Metadata = {
  title: "Auto Insurance in Windsor-Essex | Premium Insurance Brokers",
  description:
    "Ontario auto insurance through an independent Windsor-Essex broker — liability, collision, comprehensive, and accident benefits explained in plain language.",
};

const coverageTypes: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
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
  provider: {
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
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
  serviceType: "Auto Insurance",
};

export default function AutoInsurancePage() {
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
          className="border-b border-border bg-offwhite"
          aria-labelledby="auto-hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:text-xs sm:tracking-[0.14em]">
                  Personal Insurance
                </p>
                <h1
                  id="auto-hero-heading"
                  className="mt-3 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:mt-4 sm:text-5xl sm:leading-[1.06] lg:text-[3.5rem]"
                >
                  Auto Insurance
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base lg:text-lg">
                  Coverage that keeps you moving — liability, collision, and
                  comprehensive protection built around how you actually drive.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href={QUOTE_HREF}
                    className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[220px]"
                  >
                    Get an Auto Quote
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={BROKER_HREF}
                    className="btn-secondary inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md border border-border px-6 text-[15px] font-medium text-gold-dark hover:border-gold-dark sm:w-auto"
                  >
                    Talk to a Broker
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* What's covered */}
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
                  Standard Ontario auto insurance building blocks, explained
                  without the jargon.
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
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_srgb,#5B7A99_14%,#FAFAF8)]">
                          <Icon
                            className="h-5 w-5 text-[#5B7A99]"
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

        {/* Why a broker */}
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
                  Why go through a broker
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  Independent advice means we compare multiple carriers — not
                  just one company&apos;s products. You get clear explanations of
                  what&apos;s covered, and real support if you ever need to file a
                  claim.
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

        {/* FAQ */}
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
                Auto insurance FAQ
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-secondary sm:text-base">
                Straight answers to common Ontario auto insurance questions.
              </p>
            </RevealOnScroll>
            <RevealOnScroll className="mt-10 sm:mt-12">
              <FaqAccordion items={faqItems} />
            </RevealOnScroll>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby="auto-cta-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="auto-cta-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
                >
                  Ready to get covered?
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65 sm:text-base">
                  Tell us about your vehicle — we&apos;ll compare options and
                  explain what actually fits.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:mt-9">
                  <Link
                    href={QUOTE_HREF}
                    className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[220px]"
                  >
                    Get a Quote
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
