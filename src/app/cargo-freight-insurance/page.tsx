import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("cargo-freight-insurance");

export const metadata = page.metadata;
export default page.default;
