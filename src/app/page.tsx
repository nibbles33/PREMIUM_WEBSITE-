import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import InsuranceSelector from "@/components/InsuranceSelector";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <InsuranceSelector />
      </main>
    </>
  );
}
