import LineInsurancePage from "@/components/LineInsurancePage";
import {
  COMMERCIAL_ACCENT,
  commercialBrokerCopy,
  type IndustryPageContent,
} from "@/data/commercial-industries";
import { serviceStructuredData } from "@/lib/seo/structured-data";

export default function CommercialIndustryPage({
  content,
}: {
  content: IndustryPageContent;
}) {
  const jsonLd = serviceStructuredData({
    serviceName: content.serviceName,
    description: content.metaDescription,
    slug: content.slug,
    kind: "commercial",
    faqItems: content.faqItems,
  });

  return (
    <LineInsurancePage
      heroHeadingId={`${content.slug}-hero-heading`}
      eyebrow="Commercial Insurance"
      headline={content.headline}
      subhead={content.subhead}
      photographySlug={content.slug}
      quoteHref={content.quoteHref}
      quoteLabel={content.quoteLabel}
      coverageIntro={content.coverageIntro}
      coverageAccent={COMMERCIAL_ACCENT}
      coverageTypes={content.coverageTypes}
      brokerCopy={commercialBrokerCopy}
      faqTitle={content.faqTitle}
      faqIntro="Straight answers to common questions for this industry."
      faqItems={content.faqItems}
      ctaHeadingId={`${content.slug}-cta-heading`}
      ctaHeading={content.ctaHeading}
      ctaSubhead={content.ctaSubhead}
      jsonLd={jsonLd}
    />
  );
}
