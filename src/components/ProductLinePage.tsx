import LineInsurancePage, {
  sharedBrokerCopy,
} from "@/components/LineInsurancePage";
import {
  COMMERCIAL_ACCENT,
  commercialBrokerCopy,
} from "@/data/commercial-industries";
import type { ProductPageContent } from "@/data/product-pages/types";
import { serviceStructuredData } from "@/lib/seo/structured-data";

export default function ProductLinePage({
  content,
}: {
  content: ProductPageContent;
}) {
  const jsonLd = serviceStructuredData({
    serviceName: content.serviceName,
    description: content.metaDescription,
    slug: content.slug,
    kind: content.category === "commercial" ? "commercial" : "personal",
    faqItems: content.faqItems,
  });

  const isCommercial = content.category === "commercial";

  return (
    <LineInsurancePage
      heroHeadingId={`${content.slug}-hero-heading`}
      eyebrow={
        content.eyebrow ??
        (isCommercial ? "Commercial Insurance" : "Personal Insurance")
      }
      headline={content.headline}
      subhead={content.subhead}
      photographySlug={content.photographySlug}
      quoteHref={content.quoteHref}
      quoteLabel={content.quoteLabel}
      secondaryCta={content.secondaryCta}
      coverageIntro={content.coverageIntro}
      coverageAccent={
        content.coverageAccent ?? (isCommercial ? COMMERCIAL_ACCENT : "#6A7A8A")
      }
      coverageTypes={content.coverageTypes}
      whoItIsFor={content.whoItIsFor}
      considerations={content.considerations}
      relatedLinks={content.relatedLinks}
      brokerHeading={content.brokerHeading}
      brokerCopy={
        content.brokerCopy ??
        (isCommercial ? commercialBrokerCopy : sharedBrokerCopy)
      }
      faqTitle={content.faqTitle}
      faqIntro={content.faqIntro ?? "Straight answers to common questions."}
      faqItems={content.faqItems}
      ctaHeadingId={`${content.slug}-cta-heading`}
      ctaHeading={content.ctaHeading}
      ctaSubhead={content.ctaSubhead}
      ctaButtonLabel={content.ctaButtonLabel ?? content.quoteLabel}
      jsonLd={jsonLd}
    />
  );
}
