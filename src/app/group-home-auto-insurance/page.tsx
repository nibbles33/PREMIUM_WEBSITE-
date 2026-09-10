import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("group-home-auto-insurance");

export const metadata = page.metadata;
export default page.default;
