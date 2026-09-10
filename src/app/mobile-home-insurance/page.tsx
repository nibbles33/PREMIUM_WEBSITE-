import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("mobile-home-insurance");

export const metadata = page.metadata;
export default page.default;
