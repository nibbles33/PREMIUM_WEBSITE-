import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("liquor-liability-insurance");
export const metadata = page.metadata;
export default page.default;
