import { createPilotLifePageExports } from "@/lib/createPilotLifePage";

const page = createPilotLifePageExports("universal-life-insurance");
export const metadata = page.metadata;
export default page.default;
