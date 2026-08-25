import type { Metadata } from "next";
import CommercialIndustryPage from "@/components/CommercialIndustryPage";
import { industryPages } from "@/data/commercial-industries";

const content = industryPages.find(
  (page) => page.slug === "manufacturing-insurance",
)!;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function ManufacturingInsurancePage() {
  return <CommercialIndustryPage content={content} />;
}
