import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("event-liability-insurance");

export const metadata = page.metadata;
export default page.default;
