import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("convenience-store-insurance");

export const metadata = page.metadata;
export default page.default;
