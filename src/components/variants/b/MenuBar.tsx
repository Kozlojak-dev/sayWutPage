"use client";

import Image from "next/image";
import { Terminal } from "lucide-react";
import { useLenis } from "lenis/react";
import Mascot from "./Mascot";

/* Pasek menu macOS: nazwa aktywnej aplikacji po lewej, tytuły menu obok,
   ikony dodatkowe po prawej. Translucentny, więc poświata „biurka” pod nim
   faktycznie przez niego przechodzi. */

const MENUS = [
  { label: "Jak działa", href: "#jak-dziala" },
  { label: "Panel", href: "#panel" },
  { label: "Silniki", href: "#silniki" },
  { label: "Prywatność", href: "#prywatnosc" },
] as const;

const SCROLL_OFFSET = -64;

export default function MenuBar() {
  const lenis = useLenis();

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    lenis?.scrollTo(href, { offset: SCROLL_OFFSET });
  };

  return (
    <div className="vb-vibrancy sticky top-0 z-50 border-b border-[var(--vb-line)]">
      <div className="mx-auto flex h-8 max-w-[1180px] items-center gap-1 px-3 sm:px-5">
        <a
          href="#gora"
          onClick={(event) => {
            event.preventDefault();
            lenis?.scrollTo(0);
          }}
          className="flex items-center gap-2 rounded-[var(--vb-r-sm)] px-1.5 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)]"
        >
          <Image
            src="/logo.png"
            alt=""
            aria-hidden
            width={16}
            height={16}
            className="h-4 w-4 rounded-[var(--vb-r-sm)]"
            priority
          />
          <span className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--vb-ink)]">
            SayWut
          </span>
        </a>

        <nav aria-label="Pasek menu" className="hidden items-center md:flex">
          {MENUS.map((menu) => (
            <a
              key={menu.href}
              href={menu.href}
              onClick={(event) => scrollTo(event, menu.href)}
              className="rounded-[var(--vb-r-sm)] px-2 py-0.5 text-[13px] text-[var(--vb-ink-2)] transition-colors hover:bg-[var(--vb-blue)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)]"
            >
              {menu.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="vb-mono hidden text-[11px] text-[var(--vb-ink-3)] sm:inline">
            macOS 15+ · Apple Silicon
          </span>

          {/* Ikona dodatkowa paska menu — tu bohater mieszka na stałe. */}
          <Mascot
            label="Bohater SayWut w pasku menu — najedź, aby podskoczył, kliknij, aby się obrócił"
            className="h-[22px] w-[18px]"
            bubble="below"
            bubbleClassName="right-0"
            hoverShouts={["hey!", "hm?"]}
          />

          <a
            href="#instalacja"
            onClick={(event) => scrollTo(event, "#instalacja")}
            className="flex items-center gap-1.5 rounded-[var(--vb-r-sm)] px-2 py-0.5 text-[13px] font-medium text-[var(--vb-ink-2)] transition-colors hover:bg-[var(--vb-blue)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)]"
          >
            <Terminal aria-hidden className="h-3.5 w-3.5" />
            Zainstaluj
          </a>
        </div>
      </div>
    </div>
  );
}
