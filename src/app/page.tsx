import EnginesPane from "@/components/EnginesPane";
import Foot from "@/components/Foot";
import Hero from "@/components/Hero";
import HowItWorksPane from "@/components/HowItWorksPane";
import Install from "@/components/Install";
import MenuBar from "@/components/MenuBar";
import PanelPane from "@/components/PanelPane";
import PrivacyPane from "@/components/PrivacyPane";
import SettingsShell from "@/components/SettingsShell";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
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
    </div>
  );
}
