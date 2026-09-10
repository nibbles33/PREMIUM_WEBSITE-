import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("home-sharing-insurance");

export const metadata = page.metadata;
export default page.default;
