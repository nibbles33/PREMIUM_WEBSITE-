import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import PageHeroPhoto from "@/components/PageHeroPhoto";
import RevealOnScroll from "@/components/RevealOnScroll";
import TrustBar from "@/components/TrustBar";
import { insuranceAgencyProvider } from "@/components/LineInsurancePage";
import { getPageHeroPhotography } from "@/data/photography";

export const metadata: Metadata = {
  title: "About Us | Premium Insurance Brokers",
  description:
    "Premium Insurance Brokers — a division of Oracle RMS — is an independent, RIBO-licensed brokerage serving Windsor-Essex County since July 2019.",
};

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

const jsonLd = {
  "@context": "https://schema.org",
  ...insuranceAgencyProvider(),
  foundingDate: "2019-07",
  description:
    "Independent insurance brokerage serving Windsor-Essex County since July 2019. A division of Oracle RMS.",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
};

export default function AboutPage() {
  const heroPhoto = getPageHeroPhotography("about");

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
          aria-labelledby="about-hero-heading"
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
                    About Premium
                  </p>
                  <h1
                    id="about-hero-heading"
                    className="mt-3 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-charcoal sm:mt-4 sm:text-5xl sm:leading-[1.06] lg:text-[3.5rem]"
                  >
                    Where premium and quality meet
                  </h1>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base lg:text-lg">
                    Founded in July 2019, Premium Insurance Brokers — a division
                    of Oracle RMS — has served Windsor-Essex County ever since.
                  </p>
                </div>
                {heroPhoto ? <PageHeroPhoto placement={heroPhoto} priority /> : null}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
          aria-labelledby="about-story-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl">
                <h2
                  id="about-story-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                >
                  An independent brokerage for Windsor-Essex
                </h2>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-secondary sm:mt-6 sm:text-base">
                  <p>
                    We&apos;re an independent brokerage — not tied to a single
                    insurer. That means our RIBO-licensed brokers can compare
                    options across multiple insurance markets and recommend
                    coverage that fits how you actually live, drive, farm, or
                    run a business.
                  </p>
                  <p>
                    Advice comes in plain language: what&apos;s covered,
                    what&apos;s not, and what to watch for at claim time. When
                    you need help, you talk to a real broker — not a call
                    centre script.
                  </p>
                  <p>
                    Premium Insurance Brokers is headquartered at 3063 Dougall
                    Ave in Windsor, serving clients across Windsor-Essex
                    County.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section
          className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
          aria-labelledby="about-recognition-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="about-recognition-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
                >
                  Built here. Recognized here.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base">
                  Windsor Community Vote Platinum Winner four years running
                  (2021–2024), and Gold Winner in 2026. Recognized by Insurance
                  Business Canada as a 5-Star Brokerage and among Fast
                  Brokerages.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/#awards-heading"
                    className="btn-secondary inline-flex h-12 min-w-[44px] items-center justify-center rounded-md border border-charcoal/70 bg-transparent px-6 text-sm font-medium text-charcoal hover:border-gold-dark hover:text-gold-dark sm:min-w-[220px]"
                  >
                    See awards on our homepage
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <TrustBar />

        <section
          className="bg-charcoal py-14 sm:py-16 lg:py-20"
          aria-labelledby="about-cta-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="about-cta-heading"
                  className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl"
                >
                  Ready to work with a real broker?
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65 sm:text-base">
                  Compare options with independent advice — or talk through
                  your situation with a broker who knows Windsor-Essex.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:justify-center sm:gap-4">
                  <Link
                    href={QUOTE_HREF}
                    className="btn-primary btn-primary-gradient group inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-medium text-charcoal sm:w-auto sm:min-w-[200px]"
                  >
                    Get a Quote
                    <span
                      aria-hidden
                      className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={BROKER_HREF}
                    className="inline-flex h-[52px] w-full min-w-[44px] items-center justify-center rounded-md border border-white/25 bg-transparent px-6 text-[15px] font-medium text-white transition-colors hover:border-gold hover:text-gold sm:w-auto sm:min-w-[200px]"
                  >
                    Talk to a Broker
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </>
  );
}
