import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("pollution-liability-insurance");

export const metadata = page.metadata;
export default page.default;
