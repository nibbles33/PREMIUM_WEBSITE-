import LineInsurancePage, {
  insuranceAgencyProvider,
} from "@/components/LineInsurancePage";
import {
  COMMERCIAL_ACCENT,
  commercialBrokerCopy,
  type IndustryPageContent,
} from "@/data/commercial-industries";

export default function CommercialIndustryPage({
  content,
}: {
  content: IndustryPageContent;
}) {
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

  return (
    <LineInsurancePage
      heroHeadingId={`${content.slug}-hero-heading`}
      eyebrow="Commercial Insurance"
      headline={content.headline}
      subhead={content.subhead}
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
