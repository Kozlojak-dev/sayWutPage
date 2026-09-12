"use client";

import type { ReactNode } from "react";
import { useLenis } from "lenis/react";
import { WindowFrame } from "./ui";

const CATEGORIES = [
  { href: "#jak-dziala", label: "Jak działa" },
  { href: "#panel", label: "Panel" },
  { href: "#silniki", label: "Silniki" },
  { href: "#prywatnosc", label: "Prywatność" },
] as const;

const SCROLL_OFFSET = -64;

/**
 * Okno Ustawień systemowych: wąski pasek kategorii po lewej, panele po prawej.
 * Dzieci przychodzą ze strony (komponenty serwerowe), więc ten plik tylko
 * składa chrome i obsługuje przewijanie.
 */
export default function SettingsShell({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-3 pb-6 sm:px-8">
      <WindowFrame
        title="Ustawienia"
        bodyClassName="overflow-hidden bg-[var(--vb-window)]"
      >
        <div className="grid lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="vb-vibrancy-sidebar hidden border-r border-[var(--vb-line)] lg:block">
            <nav
              aria-label="Kategorie ustawień"
              className="sticky top-10 flex flex-col gap-0.5 p-2"
            >
              {CATEGORIES.map((category) => (
                <a
                  key={category.href}
                  href={category.href}
                  onClick={(event) => {
                    event.preventDefault();
                    lenis?.scrollTo(category.href, { offset: SCROLL_OFFSET });
                  }}
                  className="rounded-[var(--vb-r-sm)] px-2.5 py-1.5 text-[13px] text-[var(--vb-ink)] transition-colors hover:bg-[var(--vb-blue)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)]"
                >
                  {category.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </WindowFrame>
    </div>
  );
}
