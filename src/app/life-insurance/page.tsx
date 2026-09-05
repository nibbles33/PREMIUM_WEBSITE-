import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("life-insurance");

export const metadata = page.metadata;
export default page.default;
