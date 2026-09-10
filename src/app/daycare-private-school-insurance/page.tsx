import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("daycare-private-school-insurance");

export const metadata = page.metadata;
export default page.default;
