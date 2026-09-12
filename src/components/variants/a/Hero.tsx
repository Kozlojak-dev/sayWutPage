"use client";

import { ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { GITHUB_REPO_URL } from "@/lib/constants";
import DemoWindow from "./DemoWindow";

/** Twarde wymagania podane od razu, zanim ktokolwiek zacznie czytać opis —
 *  sekcje niżej ich nie powtarzają. */
const SPECS = [
  { label: "system", value: "macOS 15 Sequoia lub nowszy" },
  { label: "procesor", value: "Apple Silicon · M1 / M2 / M3 / M4" },
  { label: "obraz ekranu", value: "przetwarzany lokalnie" },
  { label: "dystrybucja", value: "poza App Store" },
];

export default function Hero() {
  const lenis = useLenis();

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div aria-hidden className="va-hero-glow" />

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <div className="grid items-end gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="va-mono text-[11px] uppercase tracking-[0.2em] text-[var(--va-ink-3)]">
              nakładka tłumacząca dla macOS
            </p>

            <h1 className="va-display mt-7 text-[clamp(2.5rem,6.2vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[var(--va-ink)]">
              Zaznacz fragment ekranu.
              <span className="block text-[var(--va-ink-2)]">
                Czytaj go w swoim języku.
              </span>
            </h1>

            <p className="mt-8 max-w-[46ch] text-[16px] leading-[1.65] text-[var(--va-ink-2)] sm:text-[17px]">
              SayWut odczytuje tekst z wybranej strefy ekranu, tłumaczy go na
              bieżąco i wyświetla wynik w lekkim, przezroczystym panelu. Bez
              przełączania okien, bez kopiowania, bez zatrzymywania tego, co
              właśnie oglądasz.
            </p>
          </div>

          <div className="lg:col-span-5">
            <dl className="border-t border-[var(--va-line)]">
              {SPECS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--va-line)] py-3"
                >
                  <dt className="va-mono text-[11px] uppercase tracking-[0.16em] text-[var(--va-ink-3)]">
                    {label}
                  </dt>
                  <dd className="text-[13px] text-[var(--va-ink-2)]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href="#instalacja"
            onClick={(event) => {
              event.preventDefault();
              lenis?.scrollTo("#instalacja", { offset: -96 });
            }}
            // Jedyny cień w całym wariancie — poświata akcentu, nie elewacja.
            className="rounded-[var(--va-r)] bg-[var(--va-signal)] px-5 py-3 text-[14px] font-semibold text-[#04191e] shadow-[0_0_44px_-10px_rgba(34,211,238,0.75)] transition-colors hover:bg-[var(--va-signal-ink)]"
          >
            Zainstaluj jedną komendą
          </a>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[var(--va-r)] border border-[var(--va-line-strong)] px-5 py-3 text-[14px] font-medium text-[var(--va-ink)] transition-colors hover:border-[var(--va-ink-3)] hover:bg-white/[0.03]"
          >
            Kod instalatora
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>

          <p className="va-mono w-full text-[11px] tracking-[0.04em] text-[var(--va-ink-3)] sm:w-auto sm:pl-3">
            bez konta · bez klucza API na start
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <DemoWindow />
        </div>
      </div>
    </section>
  );
}
