import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="SayWut" width={24} height={24} className="rounded-[6px]" />
          <span className="text-sm text-zinc-500">
            &copy; {year} SayWut. Aplikacja dla macOS, poza App Store.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a
            href="https://github.com/Kozlojak-dev/SayWut-Installer"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-950"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Kozlojak-dev/SayWut-Installer/issues"
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
