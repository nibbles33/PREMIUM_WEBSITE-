import type { Metadata } from "next";
import CommercialIndustryPage from "@/components/CommercialIndustryPage";
import { industryPages } from "@/data/commercial-industries";

const content = industryPages.find(
  (page) => page.slug === "real-estate-insurance",
)!;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function RealEstateInsurancePage() {
  return <CommercialIndustryPage content={content} />;
}
