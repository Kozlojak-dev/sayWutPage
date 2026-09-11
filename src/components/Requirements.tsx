import { Cpu, KeyRound, Laptop, Lock, ScreenShare, ShieldCheck, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = {
  icon: LucideIcon;
  text: string;
};

const requirements: Item[] = [
  { icon: Laptop, text: "macOS 15 Sequoia lub nowszy" },
  { icon: Cpu, text: "Mac z Apple Silicon (M1 / M2 / M3 / M4)" },
  { icon: ScreenShare, text: "Uprawnienie „Nagrywanie ekranu” dla SayWut" },
  { icon: Wifi, text: "Internet potrzebny tylko przy DeepL lub Gemini" },
];

const privacy: Item[] = [
  { icon: ShieldCheck, text: "Obraz ekranu przetwarzany jest lokalnie na Twoim Macu" },
  { icon: KeyRound, text: "Klucze API przechowywane lokalnie w Pęku kluczy (Keychain)" },
  { icon: Lock, text: "Klucze API nie są dołączane do aplikacji ani nikomu udostępniane" },
];

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="pt-1 text-sm leading-relaxed text-zinc-700">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Requirements() {
  return (
    <section id="wymagania" className="scroll-mt-24 bg-zinc-50 px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Wymagania
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Sprawdź, czy Twój Mac spełnia poniższe warunki.
          </p>
          <ItemList items={requirements} />
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            Prywatność
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Twoje dane pozostają pod Twoją kontrolą.
          </p>
          <ItemList items={privacy} />
        </div>
      </div>
    </section>
  );
}
