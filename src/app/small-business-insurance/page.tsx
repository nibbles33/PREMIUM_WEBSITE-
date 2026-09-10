import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("small-business-insurance");

export const metadata = page.metadata;
export default page.default;
