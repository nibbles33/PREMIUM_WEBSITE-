import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("professional-liability-insurance");

export const metadata = page.metadata;
export default page.default;
