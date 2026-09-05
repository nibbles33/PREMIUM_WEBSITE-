import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("warehousing-insurance");

export const metadata = page.metadata;
export default page.default;
