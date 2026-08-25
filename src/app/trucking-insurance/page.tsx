import type { Metadata } from "next";
import CommercialIndustryPage from "@/components/CommercialIndustryPage";
import { industryPages } from "@/data/commercial-industries";

const content = industryPages.find((page) => page.slug === "trucking-insurance")!;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function TruckingInsurancePage() {
  return <CommercialIndustryPage content={content} />;
}
