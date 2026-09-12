"use client";

import { useRef } from "react";
import { INSTALL_COMMAND } from "@/lib/constants";
import CommandLine from "./CommandLine";
import Mascot, { type MascotHandle } from "./Mascot";

const PERMISSION_STEPS = [
  "Otwórz Ustawienia systemowe",
  "Wejdź w Prywatność i bezpieczeństwo",
  "Otwórz Nagrywanie ekranu",
  "Włącz uprawnienie dla SayWut",
  "Wróć do aplikacji i rozpocznij konfigurację",
];

export default function Install() {
  // Bohater stoi przy komendzie i reaguje dopiero wtedy, gdy naprawdę coś
  // się wydarzy — tu: gdy komenda wyląduje w schowku.
  const mascot = useRef<MascotHandle>(null);

  return (
    <section id="instalacja" className="scroll-mt-24 pt-24 pb-28 sm:pt-32 sm:pb-36">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="va-mono text-[11px] uppercase tracking-[0.2em] text-[var(--va-ink-3)]">
              05 — instalacja
            </p>
            <h2 className="va-display mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--va-ink)]">
              Jedna komenda w Terminalu
            </h2>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.65] text-[var(--va-ink-2)]">
              Otwórz Terminal, wklej poniższą linię i naciśnij Enter. Instalator
              pobierze najnowszą wersję i uruchomi SayWut.
            </p>

            <CommandLine
              command={INSTALL_COMMAND}
              onCopy={() => mascot.current?.react("spin", "gone!")}
              className="mt-8"
            />

            <div className="mt-6 flex items-end justify-between gap-6 border-b border-[var(--va-line)]">
              <p className="va-mono pb-6 text-[12px] leading-[1.7] tracking-[0.02em] text-[var(--va-ink-3)]">
                Aplikacja trafia do{" "}
                <span className="text-[var(--va-ink-2)]">/Applications</span>,
                <br className="hidden sm:block" /> a przy braku uprawnień — do{" "}
                <span className="text-[var(--va-ink-2)]">~/Applications</span>.
              </p>

              <Mascot
                ref={mascot}
                bubbleSide="left"
                className="h-[84px] w-[68px]"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-[var(--va-line)] pt-6">
              <h3 className="va-mono text-[11px] uppercase tracking-[0.16em] text-[var(--va-ink-3)]">
                uprawnienie
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
                Bez zgody na{" "}
                <span className="text-[var(--va-ink)]">Nagrywanie ekranu</span>{" "}
                SayWut nie odczyta tekstu z ekranu.
              </p>
              <ol className="va-mono mt-4 space-y-2 text-[13px] leading-[1.5] text-[var(--va-ink-2)]">
                {PERMISSION_STEPS.map((step, index) => (
                  <li key={step} className="grid grid-cols-[1.75rem_1fr]">
                    <span className="text-[var(--va-ink-3)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 border-t border-[var(--va-line)] pt-6">
              <h3 className="va-mono text-[11px] uppercase tracking-[0.16em] text-[var(--va-ink-3)]">
                pierwsze uruchomienie
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
                SayWut jest dystrybuowany poza App Store, więc macOS pokaże
                ostrzeżenie. Otwórz{" "}
                <span className="text-[var(--va-ink)]">Finder → Aplikacje</span>,
                kliknij prawym przyciskiem na SayWut.app, wybierz „Otwórz”
                i potwierdź.
              </p>
            </div>

            <div className="mt-8 border-t border-[var(--va-line)] pt-6">
              <h3 className="va-mono text-[11px] uppercase tracking-[0.16em] text-[var(--va-ink-3)]">
                aktualizacja
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
                Uruchom tę samą komendę jeszcze raz — nowa wersja zastąpi
                poprzednią.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
