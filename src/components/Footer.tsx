import Image from "next/image";
import { GITHUB_ISSUES_URL, GITHUB_REPO_URL } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="SayWut" width={24} height={25} className="h-[25px] w-6 shrink-0 rounded-[6px]" />
          <span className="text-sm text-zinc-500">
            &copy; {year} SayWut. Aplikacja dla macOS, poza App Store.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-950"
          >
            GitHub
          </a>
          <a
            href={GITHUB_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-950"
          >
            Zgłoś problem
          </a>
        </div>
      </div>
    </footer>
  );
}
