"use client";

import { useState } from "react";
import { INSTALL_COMMAND } from "./content";

/**
 * Komenda instalacyjna między dwoma hairline'ami — bez tła, obwódki i
 * zaokrągleń, żeby nie zamieniła się w kafel z terminalem.
 *
 * Komenda zawija się, zamiast przewijać w poziomie: kontener przewijany
 * bez dostępu z klawiatury byłby pułapką, a mono i tak dobrze łamie się
 * na spacjach.
 */
export default function CommandRow({
  scale = "compact",
}: {
  scale?: "compact" | "display";
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Schowek niedostępny (np. brak uprawnień) — pomijamy w ciszy.
    }
  }

  const commandSize =
    scale === "display"
      ? "text-[0.8125rem] leading-[1.75] sm:text-[1.0625rem]"
      : "text-[0.75rem] leading-[1.7] sm:text-[0.8125rem]";

  return (
    <div
      className={`border-y border-[var(--vc-rule-strong)] ${
        scale === "display" ? "py-6 sm:py-8" : "py-4 sm:py-5"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
        <code
          className={`vc-mono min-w-0 flex-1 whitespace-pre-wrap text-[var(--vc-paper)] [overflow-wrap:anywhere] ${commandSize}`}
        >
          <span aria-hidden className="select-none text-[var(--vc-paper-faint)]">
            ${" "}
          </span>
          {INSTALL_COMMAND}
        </code>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Kopiuj komendę instalacyjną do schowka"
          className="vc-label shrink-0 self-start text-left text-[var(--vc-paper-dim)] transition-colors hover:text-[var(--vc-paper)] motion-reduce:transition-none sm:pt-1"
        >
          {copied ? "Skopiowano" : "Kopiuj"}
        </button>
      </div>

      <span role="status" className="sr-only">
        {copied ? "Komenda skopiowana do schowka" : ""}
      </span>
    </div>
  );
}
