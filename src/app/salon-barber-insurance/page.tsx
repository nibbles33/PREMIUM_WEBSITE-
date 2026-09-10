import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("salon-barber-insurance");
export const metadata = page.metadata;
export default page.default;
