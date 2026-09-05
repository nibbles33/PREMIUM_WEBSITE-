import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("grocery-specialty-food-insurance");

export const metadata = page.metadata;
export default page.default;
