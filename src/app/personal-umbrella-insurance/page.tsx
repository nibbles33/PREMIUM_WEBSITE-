import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("personal-umbrella-insurance");

export const metadata = page.metadata;
export default page.default;
