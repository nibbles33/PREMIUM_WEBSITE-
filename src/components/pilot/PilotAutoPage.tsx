"use client";

import Link from "next/link";
import Header from "@/components/Header";
import AutoBrokerStory from "@/components/pilot/auto/AutoBrokerStory";
import AutoCoverageExplorer from "@/components/pilot/auto/AutoCoverageExplorer";
import AutoFinalCta from "@/components/pilot/auto/AutoFinalCta";
import AutoProductHero from "@/components/pilot/auto/AutoProductHero";
import AutoRelatedProducts from "@/components/pilot/auto/AutoRelatedProducts";
import PremiumProductFAQ from "@/components/pilot/auto/PremiumProductFAQ";
import RevealOnScroll from "@/components/RevealOnScroll";
import { autoFaqItems } from "@/data/pilot-auto";
import { serviceStructuredData } from "@/lib/seo/structured-data";

const AUTO_PAGE_DESCRIPTION =
  "Windsor car and auto insurance from an independent Ontario broker. Liability, DCPD, accident benefits, and optional collision and comprehensive.";

const jsonLd = serviceStructuredData({
  serviceName: "Auto Insurance",
  description: AUTO_PAGE_DESCRIPTION,
  slug: "auto-insurance",
  kind: "personal",
  faqItems: autoFaqItems,
});

export default function PilotAutoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <AutoProductHero />

        <section className="border-b border-border bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <RevealOnScroll>
              <div className="space-y-4 text-left text-[15px] leading-relaxed text-secondary sm:text-base">
                <p>
                  Car insurance and auto insurance are the same Ontario
                  automobile policy. From our Windsor office at 3063 Dougall
                  Avenue, Premium Insurance Brokers compares personal auto
                  markets for drivers in Windsor and Essex County.
                </p>
                <p>
                  A standard Ontario automobile insurance policy includes
                  third-party liability, uninsured automobile coverage, Direct
                  Compensation – Property Damage (DCPD), unless you elect to
                  opt out using OPCF 49, and statutory accident benefits. For
                  policies entered into on or after July 1, 2026, medical,
                  rehabilitation, and attendant care benefits are mandatory,
                  while other accident benefits are optional. Collision and
                  comprehensive coverage are also optional, although lenders
                  may require them.
                </p>
                <p>
                  At Premium Insurance Brokers, we help Windsor–Essex drivers
                  review appropriate liability limits and coverage options
                  based on their individual needs.
                </p>
                <p>
                  What you pay depends on the drivers, the vehicle, where it is
                  parked, how it is used, and the coverages you choose. We do
                  not publish a Windsor average, because that figure would not
                  be your premium. If you also own the house you live in,{" "}
                  <Link
                    href="/home-insurance/"
                    className="font-medium text-gold-dark underline decoration-gold/40 underline-offset-2 hover:decoration-gold-dark"
                  >
                    home insurance
                  </Link>{" "}
                  is quoted separately.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <AutoCoverageExplorer />
        <AutoBrokerStory />
        <AutoRelatedProducts />
        <PremiumProductFAQ
          title="Auto insurance FAQ"
          intro="Straight answers to common Ontario auto insurance questions."
          items={autoFaqItems}
        />
        <AutoFinalCta />
      </main>
    </>
  );
}
