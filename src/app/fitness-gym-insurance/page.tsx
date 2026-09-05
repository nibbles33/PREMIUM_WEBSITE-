import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("fitness-gym-insurance");

export const metadata = page.metadata;
export default page.default;
