"use client";

import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import Mascot from "./Mascot";

const SECTIONS = [
  { id: "przebieg", label: "Przebieg" },
  { id: "panel", label: "Panel" },
  { id: "silniki", label: "Silniki" },
  { id: "prywatnosc", label: "Prywatność" },
] as const;

const SCROLL_OFFSET = -96;

/** Poniżej tej wysokości bohater nie wychyla się z paska — hero ma swojego
 *  własnego i dwóch naraz byłoby o jednego za dużo. */
const MASCOT_REVEAL_PX = 620;

export default function Nav() {
  const lenis = useLenis();
  const [active, setActive] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > MASCOT_REVEAL_PX);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Podświetlenie aktywnej pozycji w nawigacji to jedno z niewielu miejsc,
  // w których w ogóle pojawia się akcent — dlatego pas obserwacji jest wąski
  // (środek ekranu), żeby nigdy nie świeciły się dwie pozycje naraz.
  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string | number,
  ) => {
    event.preventDefault();
    if (typeof target === "number") {
      lenis?.scrollTo(target);
      return;
    }
    lenis?.scrollTo(target, { offset: SCROLL_OFFSET });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--va-line)] bg-[var(--va-bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center gap-8 px-6">
        <Link
          href="/warianty/a"
          onClick={(event) => scrollTo(event, 0)}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/logo.png"
            alt="SayWut"
            width={26}
            height={26}
            className="rounded-[var(--va-r)]"
            loading="eager"
            fetchPriority="high"
          />
          <span className="va-display text-[15px] font-semibold tracking-[-0.02em] text-[var(--va-ink)]">
            SayWut
          </span>
        </Link>

        <nav
          aria-label="Sekcje strony"
          className="hidden items-center gap-7 md:flex"
        >
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => scrollTo(event, `#${id}`)}
              aria-current={active === id ? "true" : undefined}
              className={`va-mono relative py-5 text-[12px] tracking-[0.04em] transition-colors ${
                active === id
                  ? "text-[var(--va-signal-ink)]"
                  : "text-[var(--va-ink-3)] hover:text-[var(--va-ink)]"
              }`}
            >
              {label}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-px transition-opacity ${
                  active === id ? "bg-[var(--va-signal)] opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {/* Bohater wychyla się zza dolnej krawędzi paska dopiero wtedy, gdy
              hero zjedzie z ekranu. Ruch wyłącznie w osi Y. */}
          <span
            aria-hidden
            className="relative hidden h-16 w-8 overflow-hidden sm:block"
          >
            <span
              className={`absolute bottom-0 left-0 transition-transform duration-500 ease-out ${
                pastHero ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <Mascot className="h-10 w-8" />
            </span>
          </span>

          <a
            href="#instalacja"
            onClick={(event) => scrollTo(event, "#instalacja")}
            className="rounded-[var(--va-r)] border border-[var(--va-line-strong)] px-3.5 py-2 text-[13px] font-medium text-[var(--va-ink)] transition-colors hover:border-[var(--va-signal)] hover:text-[var(--va-signal-ink)]"
          >
            Instalacja
          </a>
        </div>
      </div>
    </header>
  );
}
