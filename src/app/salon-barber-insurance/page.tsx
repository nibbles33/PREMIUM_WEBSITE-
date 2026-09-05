import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("salon-barber-insurance");

export const metadata = page.metadata;
export default page.default;
