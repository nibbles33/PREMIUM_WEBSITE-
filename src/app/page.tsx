import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GoldTicker from "@/components/GoldTicker";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import PersonalInsurance from "@/components/PersonalInsurance";
import CommercialSpotlight from "@/components/CommercialSpotlight";
import CarrierStrip from "@/components/CarrierStrip";
import Differentiator from "@/components/Differentiator";
import AwardsSection from "@/components/AwardsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GoldTicker />
        <TrustBar />
        <CarrierStrip />
        <HowItWorks />
        <PersonalInsurance />
        <CommercialSpotlight />
        <Differentiator />
        <AwardsSection />
      </main>
    </>
  );
}
