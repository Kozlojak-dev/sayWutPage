"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { GITHUB_REPO_URL } from "@/lib/constants";
import Mascot from "./Mascot";
import { WindowFrame } from "./ui";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const VIDEO_POSTER = "/demo/hero-poster.jpg";
/** Wymiary źródła — przeglądarka musi znać proporcje przed pobraniem pliku. */
const VIDEO_WIDTH = 1440;
const VIDEO_HEIGHT = 766;
const VIDEO_DESCRIPTION =
  "SayWut w działaniu: angielskie napisy w zaznaczonej strefie ekranu i ich " +
  "polskie tłumaczenie w panelu nakładki.";

export default function Hero() {
  const lenis = useLenis();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="gora" className="vb-wallpaper">
      <div className="mx-auto max-w-[1180px] px-5 pt-14 pb-6 sm:px-8 sm:pt-20">
        <h1 className="vb-display max-w-[20ch] text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--vb-ink)] sm:text-[46px] lg:text-[52px]">
          Tłumaczenie ekranu na żywo, w jednym panelu
        </h1>

        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.5] text-[var(--vb-ink-2)]">
          SayWut rozpoznaje tekst w zaznaczonym fragmencie ekranu, tłumaczy
          go w biegu i pokazuje wynik w lekkim, przezroczystym panelu. Bez
          przełączania okien i kopiowania tekstu w tę i z powrotem.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          {/* Przycisk domyślny w rozumieniu systemu: jeden, wypełniony
              akcentem, resztę akcji prowadzimy przyciskiem zwykłym. */}
          <a
            href="#instalacja"
            onClick={(event) => {
              event.preventDefault();
              lenis?.scrollTo("#instalacja", { offset: -64 });
            }}
            className="rounded-[var(--vb-r-sm)] bg-[var(--vb-blue)] px-4 py-2 text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-colors hover:bg-[var(--vb-blue-press)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vb-blue)]"
          >
            Zainstaluj SayWut
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-[var(--vb-r-sm)] bg-[var(--vb-panel)] px-4 py-2 text-[15px] font-medium text-[var(--vb-ink)] shadow-[0_0_0_0.5px_var(--vb-line-strong),0_1px_1px_rgba(0,0,0,0.04)] transition-colors hover:bg-[var(--vb-panel-sunken)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vb-blue)]"
          >
            Repozytorium
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        </div>

        <figure className="mt-10 sm:mt-12">
          {/* Dolny padding robi miejsce bohaterowi wychodzącemu z okna. */}
          <div className="relative pb-11 sm:pb-14">
            <WindowFrame
              title="SayWut — nagranie demonstracyjne"
              bodyClassName="overflow-hidden bg-[#101013]"
            >
              {reduceMotion ? (
                // Zapętlone wideo startujące samo z siebie to dokładnie ten
                // rodzaj ruchu, którego dotyczy ta preferencja — zostaje sama
                // klatka z gotowym tłumaczeniem.
                <Image
                  src={VIDEO_POSTER}
                  alt={VIDEO_DESCRIPTION}
                  width={VIDEO_WIDTH}
                  height={VIDEO_HEIGHT}
                  unoptimized
                  priority
                  className="block h-auto w-full"
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  // `metadata` zamiast `auto`: okno ma się pokazać od razu,
                  // a nie czekać na pobranie całych 2,6 MB.
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
            </WindowFrame>

            {/* Prawa krawędź, nie lewa: panel z tłumaczeniem stoi w lewym
                górnym rogu nagrania, więc tutaj bohater nic nie zasłania. */}
            <div className="absolute right-6 bottom-0 sm:right-12">
              <Mascot
                label="Bohater SayWut przy oknie nagrania — najedź, aby podskoczył, kliknij, aby się obrócił"
                className="h-[92px] w-[74px] sm:h-[112px] sm:w-[91px]"
                bubbleClassName="right-[58%]"
                hoverShouts={["hey!", "hm?"]}
                shadow
                eager
              />
            </div>
          </div>

          <figcaption className="max-w-[64ch] text-[12px] leading-[1.55] text-[var(--vb-ink-3)]">
            Nagranie z aplikacji: angielskie napisy w zaznaczonej strefie
            ekranu, polskie tłumaczenie w panelu obok. Silnik DeepL.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
