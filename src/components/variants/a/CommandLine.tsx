"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

/**
 * Jedna linia terminala. Bez atrapy okna — okno macOS pojawia się w tym
 * wariancie dokładnie raz, przy nagraniu w hero, i powtarzanie go tutaj
 * osłabiłoby tamten kadr.
 */

interface CommandLineProps {
  command: string;
  /** Wywoływane po udanym skopiowaniu — bohater reaguje na ten sygnał. */
  onCopy?: () => void;
  className?: string;
}

export default function CommandLine({
  command,
  onCopy,
  className = "",
}: CommandLineProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      onCopy?.();
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Schowek niedostępny (np. brak uprawnień w przeglądarce) — pomijamy w ciszy.
    }
  }

  return (
    <div
      className={`flex items-stretch gap-0 overflow-hidden rounded-[var(--va-r)] border border-[var(--va-line-strong)] bg-[var(--va-raised)] ${className}`}
    >
      <code className="va-mono min-w-0 flex-1 overflow-x-auto whitespace-pre px-4 py-3.5 text-[13px] leading-relaxed text-[var(--va-ink)]">
        <span aria-hidden className="select-none text-[var(--va-signal)]">
          ${" "}
        </span>
        {command}
      </code>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Kopiuj komendę instalacyjną do schowka"
        className={`va-mono flex shrink-0 items-center gap-1.5 border-l border-[var(--va-line-strong)] px-3.5 text-[12px] transition-colors ${
          copied
            ? "bg-[var(--va-signal-dim)] text-[var(--va-signal-ink)]"
            : "text-[var(--va-ink-2)] hover:bg-white/[0.04] hover:text-[var(--va-ink)]"
        }`}
      >
        {copied ? (
          <>
            <Check aria-hidden className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">skopiowano</span>
          </>
        ) : (
          <>
            <Copy aria-hidden className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">kopiuj</span>
          </>
        )}
      </button>
    </div>
  );
}
