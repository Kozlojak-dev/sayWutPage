import Engines from "@/components/variants/c/Engines";
import Foot from "@/components/variants/c/Foot";
import Hero from "@/components/variants/c/Hero";
import Install from "@/components/variants/c/Install";
import Masthead from "@/components/variants/c/Masthead";
import Reel from "@/components/variants/c/Reel";
import Sequence from "@/components/variants/c/Sequence";
import Spec from "@/components/variants/c/Spec";

export default function VariantCPage() {
  return (
    <>
      <Masthead />
      <main className="flex-1">
        <Hero />
        <Reel />
        <Sequence />
        <Engines />
        <Spec />
        <Install />
      </main>
      <Foot />
    </>
  );
}
