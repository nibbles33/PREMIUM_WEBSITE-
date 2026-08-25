import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GoldTicker from "@/components/GoldTicker";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import PersonalInsurance from "@/components/PersonalInsurance";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GoldTicker />
        <TrustBar />
        <HowItWorks />
        <PersonalInsurance />
      </main>
    </>
  );
}
