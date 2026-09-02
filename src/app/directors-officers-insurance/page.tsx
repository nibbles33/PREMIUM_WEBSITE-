import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("directors-officers-insurance");

export const metadata = page.metadata;
export default page.default;
