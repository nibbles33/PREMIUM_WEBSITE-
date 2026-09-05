import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("garage-dealership-insurance");

export const metadata = page.metadata;
export default page.default;
