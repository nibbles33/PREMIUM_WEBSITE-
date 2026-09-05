import type { Metadata } from "next";
import ProductLinePage from "@/components/ProductLinePage";
import { getProductPage } from "@/data/product-pages";

export function createProductPageExports(slug: string) {
  const content = getProductPage(slug);
  if (!content) {
    throw new Error(`Unknown product page slug: ${slug}`);
  }

  const pageContent = content;

  const metadata: Metadata = {
    title: pageContent.metaTitle,
    description: pageContent.metaDescription,
    alternates: { canonical: `/${slug}/` },
  };

  function Page() {
    return <ProductLinePage content={pageContent} />;
  }

  return { metadata, default: Page };
}
