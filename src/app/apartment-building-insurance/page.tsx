import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("apartment-building-insurance");
export const metadata = page.metadata;
export default page.default;
