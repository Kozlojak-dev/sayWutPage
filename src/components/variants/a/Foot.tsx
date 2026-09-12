import Image from "next/image";
import { GITHUB_ISSUES_URL, GITHUB_REPO_URL } from "@/lib/constants";
import Mascot from "./Mascot";

export default function Foot() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--va-line)]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-end gap-4">
          {/* Bohater po prostu tu stoi i mruga — w stopce nie ma na co
              reagować, a ruchoma maskotka nad linkami tylko by przeszkadzała. */}
          <Mascot className="h-11 w-9" />

          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt=""
                aria-hidden
                width={22}
                height={22}
                className="rounded-[var(--va-r)]"
              />
              <span className="va-display text-[14px] font-semibold tracking-[-0.02em] text-[var(--va-ink-2)]">
                SayWut
              </span>
            </div>
            <p className="va-mono mt-2 text-[11px] tracking-[0.03em] text-[var(--va-ink-3)]">
              © {year} · aplikacja dla macOS, dystrybuowana poza App Store
            </p>
          </div>
        </div>

        <nav
          aria-label="Linki zewnętrzne"
          className="va-mono flex items-center gap-6 text-[12px] tracking-[0.03em] text-[var(--va-ink-3)]"
        >
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--va-signal-ink)]"
          >
            repozytorium
          </a>
          <a
            href={GITHUB_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--va-signal-ink)]"
          >
            zgłoś problem
          </a>
        </nav>
      </div>
    </footer>
  );
}
