import { commercialProductPages } from "@/data/product-pages/commercial-products-core";
import { commercialProductIndustryPages } from "@/data/product-pages/commercial-products-industry";
import {
  commercialProductHospitalityPages,
  commercialProductSpecialtyPages,
} from "@/data/product-pages/commercial-products-specialty";
import { personalSpecialtyPages } from "@/data/product-pages/personal-specialty";
import type { ProductPageContent } from "@/data/product-pages/types";

export const allProductPages: ProductPageContent[] = [
  ...personalSpecialtyPages,
  ...commercialProductPages,
  ...commercialProductIndustryPages,
  ...commercialProductHospitalityPages,
  ...commercialProductSpecialtyPages,
];

const productPageBySlug = new Map(
  allProductPages.map((page) => [page.slug, page]),
);

export function getProductPage(slug: string): ProductPageContent | undefined {
  return productPageBySlug.get(slug);
}

export function getAllProductPageSlugs(): string[] {
  return allProductPages.map((page) => page.slug);
}
