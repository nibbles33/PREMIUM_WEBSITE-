import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("property-management-insurance");

export const metadata = page.metadata;
export default page.default;
