import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("pollution-liability-insurance");
export const metadata = page.metadata;
export default page.default;
