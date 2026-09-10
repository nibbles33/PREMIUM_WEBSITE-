"use client";

import Header from "@/components/Header";
import AutoBrokerStory from "@/components/pilot/auto/AutoBrokerStory";
import AutoCoverageExplorer from "@/components/pilot/auto/AutoCoverageExplorer";
import AutoFinalCta from "@/components/pilot/auto/AutoFinalCta";
import AutoProductHero from "@/components/pilot/auto/AutoProductHero";
import AutoRelatedProducts from "@/components/pilot/auto/AutoRelatedProducts";
import PremiumProductFAQ from "@/components/pilot/auto/PremiumProductFAQ";
import RevealOnScroll from "@/components/RevealOnScroll";
import { insuranceAgencyProvider } from "@/components/LineInsurancePage";
import { autoFaqItems, autoJsonLd } from "@/data/pilot-auto";

const jsonLd = {
  ...autoJsonLd,
  provider: insuranceAgencyProvider(),
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Windsor-Essex",
  },
};

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
              <p className="text-[15px] leading-relaxed text-secondary sm:text-base">
                Ontario auto insurance through an independent Windsor-Essex
                broker — explained in plain language, compared across multiple
                markets.
              </p>
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
