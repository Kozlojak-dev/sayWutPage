import Engines from "@/components/variants/a/Engines";
import Foot from "@/components/variants/a/Foot";
import Hero from "@/components/variants/a/Hero";
import Install from "@/components/variants/a/Install";
import Nav from "@/components/variants/a/Nav";
import PanelSpec from "@/components/variants/a/PanelSpec";
import Pipeline from "@/components/variants/a/Pipeline";
import Privacy from "@/components/variants/a/Privacy";

export default function VariantAPage() {
  return (
    <>
      {/* Ziarno leży nad całą treścią, ale nie łapie zdarzeń myszy. */}
      <div aria-hidden className="va-grain" />

      <Nav />

      <main className="flex-1">
        <Hero />
        <Pipeline />
        <PanelSpec />
        <Engines />
        <Privacy />
        <Install />
      </main>

      <Foot />
    </>
  );
}
