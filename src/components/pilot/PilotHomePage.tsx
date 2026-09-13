import Header from "@/components/Header";
import PilotAuthorityStrip from "@/components/pilot/PilotAuthorityStrip";
import PilotBreadthUniverse from "@/components/pilot/PilotBreadthUniverse";
import PilotCarrierMarquee from "@/components/pilot/PilotCarrierMarquee";
import PilotCommercialDiscovery from "@/components/pilot/PilotCommercialDiscovery";
import PilotFinalCta from "@/components/pilot/PilotFinalCta";
import PilotGoogleReviews from "@/components/pilot/PilotGoogleReviews";
import PilotHomeHero from "@/components/pilot/PilotHomeHero";
import PilotLocalProof from "@/components/pilot/PilotLocalProof";
import PilotPersonalFilmstrip from "@/components/pilot/PilotPersonalFilmstrip";
import PilotWhyPremium from "@/components/pilot/PilotWhyPremium";
import PilotWindsorOracle from "@/components/pilot/PilotWindsorOracle";
import { fetchGooglePlaceRating } from "@/lib/google/places";

/**
 * Homepage Authority Concept F — Revision 2 (Premium Actual).
 * Stronger editorial composition; preserves working rails/products.
 * Team directory intentionally omitted from homepage.
 */
export default async function PilotHomePage() {
  const googleRating = await fetchGooglePlaceRating();

  return (
    <>
      <Header />
      <main>
        <PilotHomeHero />
        <PilotAuthorityStrip googleRating={googleRating} />
        <PilotCarrierMarquee />
        <PilotPersonalFilmstrip />
        <PilotCommercialDiscovery />
        <PilotWhyPremium />
        <PilotBreadthUniverse />
        <PilotGoogleReviews ratingResult={googleRating} />
        <PilotLocalProof />
        <PilotWindsorOracle />
        <PilotFinalCta />
      </main>
    </>
  );
}
