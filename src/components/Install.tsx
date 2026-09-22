"use client";

import { useState } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { INSTALL_COMMAND } from "@/lib/constants";
import {
  Footnote,
  Group,
  PaneHeading,
  Row,
  RowIcon,
  Rows,
  WindowFrame,
} from "./ui";

export default function Install() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Schowek niedostępny — pomijamy w ciszy.
    }
  }

  return (
    <section
      id="instalacja"
      aria-labelledby="instalacja-title"
      className="scroll-mt-16 mx-auto max-w-[1180px] px-5 pt-2 pb-10 sm:px-8"
    >
      <PaneHeading
        id="instalacja-title"
        title="Instalacja"
        className="max-w-none"
        leadClassName="lg:whitespace-nowrap"
        lead="Otwórz Terminal, wklej komendę i naciśnij Enter. Instalator pobierze najnowszą wersję i uruchomi SayWut."
      />

      <div className="mt-5">
        <WindowFrame
          title="Terminal — zsh — 80×24"
          tone="dark"
          titleTrailing={
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Kopiuj komendę instalacyjną do schowka"
              className="relative z-10 rounded-[var(--vb-r-sm)] px-2 py-0.5 text-[12px] font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
            >
              {copied ? "Skopiowano" : "Kopiuj"}
            </button>
          }
        >
          <div className="px-4 py-3.5">
            {/* <p className="vb-mono text-[12px] text-white/35">
              Ostatnie logowanie: sesja lokalna
            </p> */}
            <p className="vb-mono mt-2 text-[13px] leading-[1.7] text-white/90 [overflow-wrap:anywhere] whitespace-pre-wrap">
              <span className="select-none text-[var(--vb-light-green)]">
                ~
              </span>
              <span className="select-none text-white/40"> % </span>
              {INSTALL_COMMAND}
              <span
                aria-hidden
                className="vb-caret ml-0.5 inline-block h-[13px] w-1.5 translate-y-px bg-white/85 align-text-bottom"
              />
            </p>
          </div>
        </WindowFrame>
      </div>

      <span role="status" className="sr-only">
        {copied ? "Komenda skopiowana do schowka" : ""}
      </span>

      <Footnote className="mt-3 ml-1">
        Aplikacja trafia do{" "}
        <span className="vb-mono text-[var(--vb-ink-2)]">/Applications</span>, a
        przy braku uprawnień — do{" "}
        <span className="vb-mono text-[var(--vb-ink-2)]">~/Applications</span>.
      </Footnote>

      <Group className="mt-5">
        <Rows>
          <Row
            icon={
              <RowIcon tone="warn">
                <TriangleAlert className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Ostrzeżenie macOS przy pierwszym uruchomieniu"
            detail={
              <>
                SayWut jest dystrybuowany poza App Store. Jeśli macOS zablokuje
                aplikację, wejdź w Finder → Aplikacje, kliknij SayWut prawym
                przyciskiem myszy i wymuś start, wybierając „Otwórz”.
              </>
            }
          />
          <Row
            icon={
              <RowIcon>
                <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Aktualizacja"
            detail="Uruchom tę samą komendę jeszcze raz — nowa wersja zastąpi poprzednią."
          />
        </Rows>
      </Group>
    </section>
  );
}
