import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("non-profit-insurance");

export const metadata = page.metadata;
export default page.default;
