import { getProductPage } from "@/data/product-pages";
import { adaptProductPageContent } from "@/lib/buildPilotProductConfig";
import { createPilotProductPageExports } from "@/lib/createPilotProductPage";

export function createPilotPersonalPageExports(slug: string) {
  const content = getProductPage(slug);
  if (!content) {
    throw new Error(`Unknown product page slug: ${slug}`);
  }
  if (content.category !== "personal") {
    throw new Error(`Expected personal product page slug: ${slug}`);
  }
  return createPilotProductPageExports(adaptProductPageContent(content));
}
