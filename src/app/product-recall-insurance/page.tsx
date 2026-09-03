import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("product-recall-insurance");
export const metadata = page.metadata;
export default page.default;
