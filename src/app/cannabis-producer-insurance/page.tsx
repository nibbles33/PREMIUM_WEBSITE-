import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("cannabis-producer-insurance");
export const metadata = page.metadata;
export default page.default;
