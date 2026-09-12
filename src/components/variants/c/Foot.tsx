import { ISSUES_URL, REPO_URL } from "./content";

export default function Foot() {
  return (
    <footer className="mt-20 sm:mt-28">
      <div className="vc-container grid grid-cols-12 gap-x-4 gap-y-4 border-t border-[var(--vc-rule)] pt-8 pb-12 sm:gap-x-6 sm:pt-10 sm:pb-16">
        <p className="vc-label col-span-12 text-[var(--vc-paper-dim)] sm:col-span-6">
          © 2026 SayWut
        </p>
        <p className="col-span-12 flex flex-wrap items-baseline gap-x-8 gap-y-2 sm:col-span-6 sm:justify-end">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vc-link vc-label text-[var(--vc-paper-dim)]"
          >
            GitHub<span aria-hidden> ↗</span>
          </a>
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vc-link vc-label text-[var(--vc-paper-dim)]"
          >
            Zgłoś problem<span aria-hidden> ↗</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
