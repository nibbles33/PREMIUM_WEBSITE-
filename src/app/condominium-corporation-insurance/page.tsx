import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("condominium-corporation-insurance");

export const metadata = page.metadata;
export default page.default;
