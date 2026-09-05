import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("pharmacy-insurance");

export const metadata = page.metadata;
export default page.default;
