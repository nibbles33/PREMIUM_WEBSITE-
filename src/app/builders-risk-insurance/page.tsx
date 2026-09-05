import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("builders-risk-insurance");

export const metadata = page.metadata;
export default page.default;
