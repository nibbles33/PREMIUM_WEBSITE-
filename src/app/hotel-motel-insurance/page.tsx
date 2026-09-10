import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("hotel-motel-insurance");

export const metadata = page.metadata;
export default page.default;
