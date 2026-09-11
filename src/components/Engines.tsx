import { Apple, Bot, Languages, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Engine = {
  icon: LucideIcon;
  name: string;
  description: string;
  badge: string;
};

const engines: Engine[] = [
  {
    icon: Apple,
    name: "Tłumaczenie systemowe macOS",
    description: "Wbudowany silnik tłumaczenia Apple — działa od razu, bez konfiguracji.",
    badge: "Nie wymaga klucza API",
  },
  {
    icon: Languages,
    name: "DeepL",
    description:
      "Wysoka jakość tłumaczeń — darmowy klucz DeepL obejmuje milion znaków miesięcznie.",
    badge: "Wymaga klucza API",
  },
  {
    icon: Bot,
    name: "Gemini",
    description:
      "Tłumaczenie oparte o model Google Gemini, przydatne przy bardziej złożonym tekście.",
    badge: "Wymaga klucza API",
  },
  {
    icon: Wand2,
    name: "Apple Intelligence",
    description:
      "Kontekstowe tłumaczenie Apple Intelligence na zgodnych wersjach macOS i urządzeniach.",
    badge: "Zależne od urządzenia",
  },
];

export default function Engines() {
  return (
    <section id="silniki" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            Wybierz silnik tłumaczenia
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg">
            Klucze API do DeepL i Gemini są opcjonalne — bez nich nadal
            skorzystasz z tłumaczenia systemowego macOS.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {engines.map(({ icon: Icon, name, description, badge }) => (
            <div
              key={name}
              className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-zinc-950">
                    {name}
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600">
                    {badge}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
