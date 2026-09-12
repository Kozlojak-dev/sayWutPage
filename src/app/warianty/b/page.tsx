import EnginesPane from "@/components/variants/b/EnginesPane";
import Foot from "@/components/variants/b/Foot";
import Hero from "@/components/variants/b/Hero";
import HowItWorksPane from "@/components/variants/b/HowItWorksPane";
import Install from "@/components/variants/b/Install";
import MenuBar from "@/components/variants/b/MenuBar";
import PanelPane from "@/components/variants/b/PanelPane";
import PrivacyPane from "@/components/variants/b/PrivacyPane";
import SettingsShell from "@/components/variants/b/SettingsShell";

export default function VariantBPage() {
  return (
    <>
      <MenuBar />

      <main className="flex-1">
        <Hero />

        <SettingsShell>
          <HowItWorksPane />
          <PanelPane />
          <EnginesPane />
          <PrivacyPane />
        </SettingsShell>

        <Install />
      </main>

      <Foot />
    </>
  );
}
