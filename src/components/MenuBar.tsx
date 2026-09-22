"use client";

import Image from "next/image";
import { Terminal } from "lucide-react";
import { useLenis } from "lenis/react";
import { HEADER_SCROLL_OFFSET, scrollToId } from "@/lib/scroll-to";
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

export default function MenuBar() {
  const lenis = useLenis();

  const scrollTo = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    scrollToId(lenis, href, HEADER_SCROLL_OFFSET);
  };

  return (
    <div className="vb-vibrancy sticky top-0 z-50 border-b border-[var(--vb-line)]">
      <div className="mx-auto flex h-10 max-w-[1180px] items-center gap-1.5 px-4 sm:px-6">
        <a
          href="#gora"
          onClick={(event) => {
            event.preventDefault();
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 rounded-[var(--vb-r-sm)] px-1.5 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)]"
        >
          <Image
            src="/logo.png"
            alt=""
            aria-hidden
            width={20}
            height={20}
            className="h-5 w-5 rounded-[var(--vb-r-sm)]"
            priority
          />
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-[var(--vb-ink)]">
            SayWut
          </span>
        </a>

        <nav aria-label="Pasek menu" className="hidden items-center md:flex">
          {MENUS.map((menu) => (
            <a
              key={menu.href}
              href={menu.href}
              onClick={(event) => scrollTo(event, menu.href)}
              className="rounded-[var(--vb-r-sm)] px-2.5 py-1 text-[14px] text-[var(--vb-ink-2)] transition-colors hover:bg-[var(--vb-blue)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)]"
            >
              {menu.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* Ikona dodatkowa paska menu — tu bohater mieszka na stałe. */}
          <Mascot
            label="Bohater SayWut w pasku menu — najedź, aby podskoczył, kliknij, aby się obrócił"
            className="h-[28px] w-[23px]"
            bubble="none"
          />

          <a
            href="#instalacja"
            onClick={(event) => scrollTo(event, "#instalacja")}
            className="flex items-center gap-1.5 rounded-[var(--vb-r-sm)] px-2.5 py-1 text-[14px] font-medium text-[var(--vb-ink-2)] transition-colors hover:bg-[var(--vb-blue)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)]"
          >
            <Terminal aria-hidden className="h-4 w-4" />
            Zainstaluj
          </a>
        </div>
      </div>
    </div>
  );
}
