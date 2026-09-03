"use client";

import CommercialIndustryGrid from "@/components/CommercialIndustryGrid";
import Header from "@/components/Header";
import ProductBrokerStory from "@/components/pilot/product/ProductBrokerStory";
import ProductConsiderations from "@/components/pilot/product/ProductConsiderations";
import ProductCoverageExplorer from "@/components/pilot/product/ProductCoverageExplorer";
import ProductFinalCta from "@/components/pilot/product/ProductFinalCta";
import ProductHero from "@/components/pilot/product/ProductHero";
import ProductRelatedProducts from "@/components/pilot/product/ProductRelatedProducts";
import PremiumProductFAQ from "@/components/pilot/auto/PremiumProductFAQ";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { PilotProductPageConfig } from "@/types/pilot-product";

type PilotProductPageProps = {
  config: PilotProductPageConfig;
};

export default function PilotProductPage({ config }: PilotProductPageProps) {
  const isCommercialHub = config.layout === "commercial-hub";
  const hasCoverage = config.coverageItems.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(config.jsonLd) }}
      />
      <Header />
      <main>
        <ProductHero config={config} />

        <section className="border-b border-border bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <RevealOnScroll>
              <p className="text-[15px] leading-relaxed text-secondary sm:text-base">
                {config.trustStatement}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {isCommercialHub ? <CommercialIndustryGrid /> : null}
        {!isCommercialHub && hasCoverage ? (
          <ProductCoverageExplorer config={config} />
        ) : null}
        {config.considerations && config.considerations.length > 0 ? (
          <ProductConsiderations items={config.considerations} />
        ) : null}
        <ProductBrokerStory steps={config.brokerSteps} />
        {config.relatedProducts.length > 0 ? (
          <ProductRelatedProducts
            heading={config.relatedHeading}
            intro={config.relatedIntro}
            products={config.relatedProducts}
          />
        ) : null}
        {config.faqItems.length > 0 ? (
          <PremiumProductFAQ
            title={config.faqTitle}
            intro={config.faqIntro}
            items={config.faqItems}
          />
        ) : null}
        <ProductFinalCta
          slug={config.slug}
          eyebrow={config.ctaEyebrow}
          heading={config.ctaHeading}
          subhead={config.ctaSubhead}
          quoteHref={config.quoteHref}
          quoteLabel={config.ctaQuoteLabel ?? config.quoteLabel}
          brokerHref={config.brokerHref ?? "/talk-to-a-broker/"}
          secondaryCta={config.secondaryCta}
        />
      </main>
    </>
  );
}
