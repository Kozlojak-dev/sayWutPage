"use client";

import { ExternalLink } from "lucide-react";
import { useLenis } from "lenis/react";
import { GITHUB_REPO_URL, INSTALL_COMMAND } from "@/lib/constants";
import AppPreview from "./AppPreview";
import TerminalCommand from "./TerminalCommand";

export default function Hero() {
  const lenis = useLenis();

  return (
    <section className="px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-6xl">
          Tłumaczenie ekranu,
          <br className="hidden sm:block" /> na żywo, w jednym panelu
        </h1>

        <p className="mt-6 max-w-xl text-base text-zinc-600 sm:text-lg">
          SayWut rozpoznaje tekst z wybranego fragmentu ekranu, tłumaczy go w
          czasie rzeczywistym i pokazuje wynik w lekkim, przezroczystym
          panelu — bez przełączania okien i kopiowania tekstu.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#instalacja"
            onClick={(event) => {
              event.preventDefault();
              lenis?.scrollTo("#instalacja", { offset: -96 });
            }}
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 sm:w-auto"
          >
            Zainstaluj SayWut
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-black/5 sm:w-auto"
          >
            Zobacz na GitHubie
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <TerminalCommand command={INSTALL_COMMAND} className="mt-8 w-full max-w-xl" />
      </div>

      {/* Szerzej niż kolumna tekstu (max-w-3xl): przy ~1024 px tekst w panelu
          tłumaczenia na nagraniu jest czytelny, przy 768 px już nie. */}
      <div className="mx-auto mt-16 max-w-5xl">
        <AppPreview />
      </div>
    </section>
  );
}
