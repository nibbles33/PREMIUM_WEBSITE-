import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("liquor-liability-insurance");

export const metadata = page.metadata;
export default page.default;
