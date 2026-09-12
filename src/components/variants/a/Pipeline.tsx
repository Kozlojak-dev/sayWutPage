/**
 * Przebieg pracy jako lista, nie jako siatka kafli: numer w monospace,
 * hairline między wierszami, żadnego pudełka i żadnej ikony. Nagłówek
 * przykleja się po lewej, kroki przewijają się obok niego.
 */

const STEPS = [
  {
    index: "01",
    title: "Strefa",
    body: "Zaznaczasz prostokąt na ekranie — dokładnie ten fragment, z którego SayWut ma odczytywać tekst.",
  },
  {
    index: "02",
    title: "Języki",
    body: "Ustawiasz język źródłowy i język, na który ma być tłumaczony odczytany tekst.",
  },
  {
    index: "03",
    title: "Silnik",
    body: "Wybierasz tłumacza: systemowy macOS, DeepL, Gemini albo Apple Intelligence.",
  },
  {
    index: "04",
    title: "Start",
    body: "Włączasz tłumaczenie na żywo. Od tej chwili SayWut śledzi zaznaczony obszar w czasie rzeczywistym.",
  },
  {
    index: "05",
    title: "Panel",
    body: "Wynik ląduje w lekkim, przezroczystym panelu, który leży na wierzchu tego, co robisz.",
  },
];

export default function Pipeline() {
  return (
    <section id="przebieg" className="scroll-mt-24 pt-28 pb-20 sm:pt-36">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="va-mono text-[11px] uppercase tracking-[0.2em] text-[var(--va-ink-3)]">
                01 — przebieg
              </p>
              <h2 className="va-display mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--va-ink)]">
                Od zaznaczenia
                <br />
                do tłumaczenia
              </h2>
              <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
                Konfigurujesz raz, na początku sesji. Później SayWut pracuje
                w tle i nie wymaga uwagi.
              </p>
            </div>
          </div>

          <ol className="border-t border-[var(--va-line)] lg:col-span-8">
            {STEPS.map(({ index, title, body }) => (
              <li
                key={index}
                className="group relative grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-[var(--va-line)] py-6 sm:grid-cols-[4rem_1fr] sm:gap-x-8 sm:py-7"
              >
                {/* Hairline akcentu rozsuwa się nad wierszem — sygnał stanu,
                    nie dekoracja, i nic tu nie zmienia wysokości wiersza. */}
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-0 bg-[var(--va-signal)] transition-[width] duration-300 ease-out group-hover:w-20"
                />
                <span className="va-mono pt-1 text-[12px] tracking-[0.08em] text-[var(--va-ink-3)] transition-colors group-hover:text-[var(--va-signal-ink)]">
                  {index}
                </span>
                <div>
                  <h3 className="va-display text-[19px] font-semibold tracking-[-0.02em] text-[var(--va-ink)]">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
