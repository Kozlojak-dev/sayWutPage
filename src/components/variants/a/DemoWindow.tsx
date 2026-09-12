"use client";

import Image from "next/image";
import Mascot from "./Mascot";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Nagranie z prawdziwej sesji SayWut w oprawie okna macOS. Chrome jest
 * zbudowane tak, jak wygląda naprawdę: 36 px paska, sygnalizator po lewej,
 * tytuł wyśrodkowany optycznie, jedna hairline’owa krawędź i delikatny
 * rozjaśniający gradient u góry zamiast cienia.
 */

const VIDEO_POSTER = "/demo/hero-poster.jpg";
/** Wymiary źródła — przeglądarka musi znać proporcje, zanim pobierze plik. */
const VIDEO_WIDTH = 1440;
const VIDEO_HEIGHT = 766;
const VIDEO_DESCRIPTION =
  "SayWut w działaniu: angielskie napisy w zaznaczonej strefie ekranu i ich " +
  "polskie tłumaczenie w panelu nakładki.";

const TRAFFIC_LIGHTS = ["#ff5f57", "#febc2e", "#28c840"];

export default function DemoWindow() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <figure className="relative">
      {/* Dolny padding robi miejsce na bohatera wychodzącego poza kadr. */}
      <div className="relative pb-10 sm:pb-14">
        <div className="overflow-hidden rounded-[var(--va-r-lg)] border border-[var(--va-line-strong)] bg-[var(--va-panel)]">
          <div className="relative flex h-9 items-center border-b border-[var(--va-line)] bg-gradient-to-b from-white/[0.05] to-transparent px-3.5">
            <div className="flex items-center gap-2">
              {TRAFFIC_LIGHTS.map((color) => (
                <span
                  key={color}
                  // Jedyne okrągłe kształty w wariancie: sygnalizator okna
                  // macOS jest okrągły i udawanie inaczej zdradziłoby atrapę.
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <span className="va-mono absolute left-1/2 -translate-x-1/2 text-[11px] tracking-[0.04em] text-[var(--va-ink-3)]">
              SayWut — sesja na żywo
            </span>

            <span className="va-mono ml-auto hidden items-center gap-1.5 text-[11px] text-[var(--va-ink-3)] sm:flex">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--va-signal)]"
              />
              DeepL
            </span>
          </div>

          <div className="relative bg-black">
            {reduceMotion ? (
              // Zapętlone wideo startujące samo z siebie to dokładnie ten rodzaj
              // ruchu, którego dotyczy ta preferencja — zostaje sama klatka
              // z gotowym tłumaczeniem.
              <Image
                src={VIDEO_POSTER}
                alt={VIDEO_DESCRIPTION}
                width={VIDEO_WIDTH}
                height={VIDEO_HEIGHT}
                unoptimized
                className="block h-auto w-full"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                // `metadata` zamiast `auto`: kadr ma się pokazać od razu, a nie
                // czekać na pobranie całych 2,6 MB.
                preload="metadata"
                poster={VIDEO_POSTER}
                width={VIDEO_WIDTH}
                height={VIDEO_HEIGHT}
                aria-label={VIDEO_DESCRIPTION}
                className="block h-auto w-full"
              >
                {/* WebM (1,78 MB) przed MP4 (2,60 MB) — przeglądarka bierze
                    pierwszy obsługiwany format. */}
                <source src="/demo/hero.webm" type="video/webm" />
                <source src="/demo/hero.mp4" type="video/mp4" />
              </video>
            )}

            {/* Etykiety dublują to, co widać na nagraniu — dla czytnika ekranu
                niosłyby tylko szum, treść jest w podpisie pod kadrem.
                Pozycje w procentach wyliczone z klatek nagrania: panel nakładki
                zajmuje górne ~19% wysokości, ramka OCR leży między 82% i 97%. */}
            <div aria-hidden className="hidden sm:block">
              <div className="absolute left-[3%] top-[20%] flex flex-col items-start">
                <span className="ml-3 h-4 w-px bg-white/40" />
                <span className="va-mono mt-1 rounded-[var(--va-r)] border border-[var(--va-line-strong)] bg-[var(--va-void)]/85 px-2 py-1 text-[10px] tracking-[0.06em] text-[var(--va-ink-2)] backdrop-blur-sm">
                  panel tłumaczenia
                </span>
              </div>

              <div className="absolute bottom-[19%] left-[14%] flex flex-col items-start">
                <span className="va-mono rounded-[var(--va-r)] border border-[var(--va-signal)]/35 bg-[var(--va-void)]/85 px-2 py-1 text-[10px] tracking-[0.06em] text-[var(--va-signal-ink)] backdrop-blur-sm">
                  odczytywana strefa
                </span>
                <span className="ml-3 h-4 w-px bg-[var(--va-signal)]/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Prawa krawędź, nie lewa: ramka OCR sięga do 86% szerokości kadru,
            a panel z tłumaczeniem stoi w lewym górnym rogu — tutaj bohater
            nie zasłania żadnego z nich. */}
        <div className="absolute bottom-0 right-5 sm:right-10">
          <Mascot
            interactive
            bubbleSide="left"
            className="h-[104px] w-[84px] sm:h-[136px] sm:w-[110px]"
          />
        </div>
      </div>

      <figcaption className="va-mono mt-1 text-[11px] leading-relaxed tracking-[0.03em] text-[var(--va-ink-3)]">
        Nagranie z aplikacji — angielskie napisy w zaznaczonej strefie, polskie
        tłumaczenie w panelu obok. Silnik: DeepL.
      </figcaption>
    </figure>
  );
}
