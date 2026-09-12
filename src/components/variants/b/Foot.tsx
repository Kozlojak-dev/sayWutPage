import Image from "next/image";
import { GITHUB_ISSUES_URL, GITHUB_REPO_URL } from "@/lib/constants";

export default function Foot() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--vb-line)]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            aria-hidden
            width={20}
            height={20}
            className="h-5 w-5 rounded-[var(--vb-r-sm)]"
          />
          <p className="text-[12px] text-[var(--vb-ink-3)]">
            © {year} SayWut · aplikacja dla macOS, poza App Store
          </p>
        </div>

        <nav
          aria-label="Linki zewnętrzne"
          className="flex items-center gap-5 text-[12px] text-[var(--vb-ink-3)]"
        >
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--vb-blue-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vb-blue)]"
          >
            Repozytorium
          </a>
          <a
            href={GITHUB_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--vb-blue-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vb-blue)]"
          >
            Zgłoś problem
          </a>
        </nav>
      </div>
    </footer>
  );
}
