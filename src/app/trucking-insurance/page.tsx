import type { Metadata } from "next";
import PilotTruckingPage from "@/components/pilot/PilotTruckingPage";
import { industryPages } from "@/data/commercial-industries";

const content = industryPages.find((page) => page.slug === "trucking-insurance")!;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
};

export default function TruckingInsurancePage() {
  return <PilotTruckingPage />;
}
