import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("landscaping-snow-removal-insurance");

export const metadata = page.metadata;
export default page.default;
