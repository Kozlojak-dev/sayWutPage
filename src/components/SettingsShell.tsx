"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { HEADER_SCROLL_OFFSET, scrollToId } from "@/lib/scroll-to";
import { WindowFrame } from "./ui";

const CATEGORIES = [
  { href: "#jak-dziala", headingId: "jak-dziala-title", label: "Jak działa" },
  { href: "#panel", headingId: "panel-title", label: "Panel" },
  { href: "#silniki", headingId: "silniki-title", label: "Silniki" },
  { href: "#prywatnosc", headingId: "prywatnosc-title", label: "Prywatność" },
] as const;

type CategoryHref = (typeof CATEGORIES)[number]["href"];

function activeFromScroll(): CategoryHref {
  const marker = window.innerHeight * 0.32;
  let current: CategoryHref = CATEGORIES[0].href;

  for (const category of CATEGORIES) {
    const heading = document.getElementById(category.headingId);
    if (!heading) continue;
    if (heading.getBoundingClientRect().top <= marker) {
      current = category.href;
    }
  }

  return current;
}

/**
 * Okno Ustawień: lista kategorii jedzie ze scrollem (sticky), a nie rozciąga
 * się na całą wysokość paneli — to właśnie zostawiało pustą szarość.
 * overflow-hidden na korpusie okna psułby sticky, więc go tu nie ma.
 */
export default function SettingsShell({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const [active, setActive] = useState<CategoryHref>(CATEGORIES[0].href);
  const syncRef = useRef(() => {});

  const onLenisScroll = useCallback(() => {
    syncRef.current();
  }, []);

  useLenis(onLenisScroll);

  useEffect(() => {
    const headings = CATEGORIES.map((category) =>
      document.getElementById(category.headingId),
    ).filter((heading): heading is HTMLElement => heading !== null);

    if (headings.length === 0) return;

    const sync = () => {
      const current = activeFromScroll();
      setActive((prev) => (prev === current ? prev : current));
    };
    syncRef.current = sync;

    const observer = new IntersectionObserver(sync, {
      root: null,
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    });

    headings.forEach((heading) => observer.observe(heading));
    headings.forEach((heading) => {
      const section = heading.closest("section");
      if (section) observer.observe(section);
    });

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("scroll", sync, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", sync);
      document.removeEventListener("scroll", sync);
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-3 pb-6 sm:px-8">
      <WindowFrame
        title="Ustawienia"
        bodyClassName="bg-[var(--vb-window)]"
      >
        <div className="flex items-start">
          <aside className="sticky top-12 hidden w-[200px] shrink-0 self-start lg:block">
            <nav
              aria-label="Kategorie ustawień"
              className="flex flex-col gap-0.5 p-2"
            >
              {CATEGORIES.map((category) => {
                const current = category.href === active;

                return (
                  <a
                    key={category.href}
                    href={category.href}
                    aria-current={current ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(category.href);
                      scrollToId(lenis, category.href, HEADER_SCROLL_OFFSET);
                    }}
                    className={`rounded-[var(--vb-r-sm)] px-2.5 py-1.5 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--vb-blue)] ${
                      current
                        ? "bg-[var(--vb-blue)] text-white"
                        : "text-[var(--vb-ink)] hover:bg-[var(--vb-blue)] hover:text-white"
                    }`}
                  >
                    {category.label}
                  </a>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </WindowFrame>
    </div>
  );
}
