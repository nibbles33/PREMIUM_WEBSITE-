import { createPilotCommercialPageExports } from "@/lib/createPilotCommercialPage";

const page = createPilotCommercialPageExports("crime-fidelity-insurance");
export const metadata = page.metadata;
export default page.default;
