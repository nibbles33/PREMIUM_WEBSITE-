import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("cyber-insurance");

export const metadata = page.metadata;
export default page.default;
