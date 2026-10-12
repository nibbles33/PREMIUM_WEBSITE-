import { createPilotLifePageExports } from "@/lib/createPilotLifePage";

const page = createPilotLifePageExports("disability-insurance");
export const metadata = page.metadata;
export default page.default;
