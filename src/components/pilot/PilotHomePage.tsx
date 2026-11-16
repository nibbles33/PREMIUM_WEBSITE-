import Header from "@/components/Header";
import PilotAuthorityStrip from "@/components/pilot/PilotAuthorityStrip";
import PilotBreadthUniverse from "@/components/pilot/PilotBreadthUniverse";
import PilotCarrierMarquee from "@/components/pilot/PilotCarrierMarquee";
import CommercialIndustryExplorer from "@/components/CommercialIndustryExplorer";
import PilotFinalCta from "@/components/pilot/PilotFinalCta";
import PilotGoogleReviews from "@/components/pilot/PilotGoogleReviews";
import PilotHomeHero from "@/components/pilot/PilotHomeHero";
import PilotLocalProof from "@/components/pilot/PilotLocalProof";
import PilotPersonalFilmstrip from "@/components/pilot/PilotPersonalFilmstrip";
import PilotWhyPremium from "@/components/pilot/PilotWhyPremium";
import PilotWindsorOracle from "@/components/pilot/PilotWindsorOracle";

/**
 * Homepage Authority Concept F — Revision 2 (Premium Actual).
 * Stronger editorial composition; preserves working rails/products.
 * Team directory intentionally omitted from homepage.
 * Google reviews link out to the Business Profile. No Places fetch.
 */
export default function PilotHomePage() {
  return (
    <>
      <Header />
      <main>
        <PilotHomeHero />
        <PilotAuthorityStrip />
        <PilotCarrierMarquee />
        <PilotPersonalFilmstrip />
        <CommercialIndustryExplorer surface="homepage" />
        <PilotWhyPremium />
        <PilotBreadthUniverse />
        <PilotGoogleReviews />
        <PilotLocalProof />
        <PilotWindsorOracle />
        <PilotFinalCta />
      </main>
    </>
  );
}
