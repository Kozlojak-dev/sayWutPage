import Image from "next/image";
import ScrollLink from "./ScrollLink";
import { NAV_LINKS, REPO_URL } from "./content";

/** Belka na jednym hairline'ie: sygnatura po lewej, spis treści po prawej. */
export default function Masthead() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vc-rule)] bg-[var(--vc-ink)]">
      <div className="vc-container flex h-14 items-center justify-between gap-6">
        <div className="flex items-baseline gap-3">
          <Image
            src="/logo.png"
            alt=""
            aria-hidden
            width={20}
            height={20}
            className="translate-y-[3px]"
          />
          <span className="vc-display text-[0.9375rem] font-extrabold tracking-[-0.015em] text-[var(--vc-paper)]">
            SayWut
          </span>
          <span className="vc-label hidden sm:inline">
            Tłumacz ekranu · macOS
          </span>
        </div>

        <div className="flex items-baseline gap-6 lg:gap-8">
          <nav aria-label="Sekcje strony" className="hidden items-baseline gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="vc-label transition-colors hover:text-[var(--vc-paper)] motion-reduce:transition-none"
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vc-label text-[var(--vc-paper-dim)] transition-colors hover:text-[var(--vc-paper)] motion-reduce:transition-none"
          >
            GitHub<span aria-hidden> ↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
