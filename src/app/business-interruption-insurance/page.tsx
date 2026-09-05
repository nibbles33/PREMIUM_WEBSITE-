import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("business-interruption-insurance");

export const metadata = page.metadata;
export default page.default;
