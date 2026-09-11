"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface TerminalCommandProps {
  command: string;
  className?: string;
}

export default function TerminalCommand({
  command,
  className = "",
}: TerminalCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Schowek niedostępny (np. brak uprawnień w przeglądarce) — pomijamy w ciszy.
    }
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d] shadow-xl shadow-black/20 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-zinc-500">terminal</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-4">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre font-mono text-[13px] leading-relaxed text-zinc-100">
          <span className="select-none text-emerald-400">$ </span>
          {command}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Kopiuj komendę do schowka"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Skopiowano
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Kopiuj
            </>
          )}
        </button>
      </div>
    </div>
  );
}
