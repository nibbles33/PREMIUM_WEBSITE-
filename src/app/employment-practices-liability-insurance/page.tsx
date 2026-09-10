import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("employment-practices-liability-insurance");

export const metadata = page.metadata;
export default page.default;
