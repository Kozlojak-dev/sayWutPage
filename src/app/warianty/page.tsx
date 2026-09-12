import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warianty designu — SayWut",
  description: "Indeks wariantów designu landing page'a SayWut.",
};

const variants = [
  {
    href: "/warianty/a",
    label: "Wariant A",
    description:
      "Raycast / Linear: ciemny glass, jeden luminescencyjny akcent",
  },
  {
    href: "/warianty/b",
    label: "Wariant B",
    description:
      "macOS System Settings: jasna vibrancy, panele systemowe, system blue",
  },
  {
    href: "/warianty/c",
    label: "Wariant C",
    description: "Dark editorial: typografia i arkusz specyfikacji, zero kart",
  },
];

export default function WariantyIndex() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
        Warianty designu
      </h1>
      <p className="mt-3 text-sm text-zinc-600">
        Trzy niezależne propozycje wyglądu strony SayWut. Każdy wariant to
        osobna podstrona z tą samą treścią, ale inną oprawą wizualną.
      </p>

      <ul className="mt-8 flex flex-col gap-3">
        {variants.map((variant) => (
          <li key={variant.href}>
            <Link
              href={variant.href}
              className="block rounded-lg border border-black/10 px-4 py-3 transition-colors hover:bg-black/5"
            >
              <span className="text-sm font-medium text-zinc-950">
                {variant.label}
              </span>
              <span className="mt-1 block text-sm text-zinc-600">
                {variant.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-zinc-500 transition-colors hover:text-zinc-950"
      >
        ← strona główna
      </Link>
    </main>
  );
}
