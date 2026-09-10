import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("religious-organizations-insurance");

export const metadata = page.metadata;
export default page.default;
