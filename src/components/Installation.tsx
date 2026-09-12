import { FolderOpen, RefreshCw, Settings, TriangleAlert } from "lucide-react";
import { INSTALL_COMMAND } from "@/lib/constants";
import TerminalCommand from "./TerminalCommand";

const permissionSteps = [
  "Otwórz Ustawienia systemowe",
  "Wejdź w Prywatność i bezpieczeństwo",
  "Otwórz Nagrywanie ekranu",
  "Włącz uprawnienie dla SayWut",
  "Wróć do aplikacji i rozpocznij konfigurację",
];

export default function Installation() {
  return (
    <section id="instalacja" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            Instalacja
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg">
            Otwórz Terminal, wklej poniższą komendę i naciśnij Enter. Instalator
            pobierze najnowszą wersję i uruchomi SayWut automatycznie.
          </p>
        </div>

        <TerminalCommand command={INSTALL_COMMAND} className="mx-auto mt-10 max-w-2xl" />

        <p className="mt-3 text-center text-xs text-zinc-500">
          Aplikacja trafi do <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono">/Applications</code>,
          a w razie braku uprawnień — do <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono">~/Applications</code>.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
              <Settings className="h-5 w-5" strokeWidth={2} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-zinc-950">
              Pierwsze uruchomienie
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              Przyznaj uprawnienie do nagrywania ekranu — bez niego SayWut nie
              odczyta tekstu z ekranu.
            </p>
            <ol className="mt-4 flex flex-col gap-2">
              {permissionSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-600">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <TriangleAlert className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-950">
                Ostrzeżenie macOS przy pierwszym uruchomieniu
              </h3>
              <p className="mt-1 text-sm text-zinc-700">
                SayWut jest dystrybuowany poza App Store. Jeśli pojawi się
                ostrzeżenie, otwórz{" "}
                <span className="inline-flex items-center gap-1 font-medium">
                  <FolderOpen className="h-3.5 w-3.5" /> Finder → Aplikacje
                </span>
                , kliknij prawym na SayWut.app, wybierz „Otwórz” i potwierdź
                uruchomienie.
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                <RefreshCw className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-950">
                Aktualizacje
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Aby zaktualizować SayWut, uruchom ponownie tę samą komendę
                instalacyjną — nowa wersja zastąpi poprzednią.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
