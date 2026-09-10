import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("product-recall-insurance");

export const metadata = page.metadata;
export default page.default;
