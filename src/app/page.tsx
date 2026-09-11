import Engines from "@/components/Engines";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Installation from "@/components/Installation";
import Requirements from "@/components/Requirements";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Engines />
        <Requirements />
        <Installation />
      </main>
      <Footer />
    </div>
  );
}
