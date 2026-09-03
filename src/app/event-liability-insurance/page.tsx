import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("event-liability-insurance");
export const metadata = page.metadata;
export default page.default;
