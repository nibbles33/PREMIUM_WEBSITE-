import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("medical-dental-insurance");

export const metadata = page.metadata;
export default page.default;
