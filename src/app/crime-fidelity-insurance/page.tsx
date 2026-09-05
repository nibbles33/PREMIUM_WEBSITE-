import { createProductPageExports } from "@/lib/createProductPage";

const page = createProductPageExports("crime-fidelity-insurance");

export const metadata = page.metadata;
export default page.default;
