"use client";

import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";

const navLinks = [
  { label: "Jak działa", href: "#jak-dziala" },
  { label: "Funkcje", href: "#funkcje" },
  { label: "Silniki tłumaczenia", href: "#silniki" },
  { label: "Wymagania", href: "#wymagania" },
];

const SCROLL_OFFSET = -96;

export default function Header() {
  const lenis = useLenis();

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    lenis?.scrollTo(href, { offset: SCROLL_OFFSET });
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    lenis?.scrollTo(0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="SayWut"
            width={32}
            height={34}
            className="h-[34px] w-8 shrink-0 rounded-[8px]"
            priority
          />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
            SayWut
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleAnchorClick(event, link.href)}
              className="transition-colors hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#instalacja"
          onClick={(event) => handleAnchorClick(event, "#instalacja")}
          className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 sm:inline-block"
        >
          Pobierz
        </a>
      </div>
    </header>
  );
}
