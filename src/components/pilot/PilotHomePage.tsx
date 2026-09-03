import Header from "@/components/Header";
import PilotBreadthUniverse from "@/components/pilot/PilotBreadthUniverse";
import PilotCarrierMarquee from "@/components/pilot/PilotCarrierMarquee";
import PilotCommercialDiscovery from "@/components/pilot/PilotCommercialDiscovery";
import PilotFinalCta from "@/components/pilot/PilotFinalCta";
import PilotHomeHero from "@/components/pilot/PilotHomeHero";
import PilotLocalProof from "@/components/pilot/PilotLocalProof";
import PilotPersonalFilmstrip from "@/components/pilot/PilotPersonalFilmstrip";
import PilotTrustBar from "@/components/pilot/PilotTrustBar";
import "@/styles/pilot.css";

export default function PilotHomePage() {
  return (
    <>
      <Header />
      <main>
        <PilotHomeHero />
        <PilotTrustBar />
        <PilotCarrierMarquee />
        <PilotPersonalFilmstrip />
        <PilotCommercialDiscovery />
        <PilotBreadthUniverse />
        <PilotLocalProof />
        <PilotFinalCta />
      </main>
    </>
  );
}
