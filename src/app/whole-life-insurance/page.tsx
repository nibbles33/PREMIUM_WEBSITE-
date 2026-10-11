import { createPilotLifePageExports } from "@/lib/createPilotLifePage";

const page = createPilotLifePageExports("whole-life-insurance");
export const metadata = page.metadata;
export default page.default;
