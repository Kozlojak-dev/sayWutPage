/**
 * Pas pełnej szerokości na innym stopniu tła — jedyne miejsce, w którym
 * warstwa „panel” wychodzi poza kontener. Trzy zdania rozdzielone pionowym
 * hairline’em, bez pudełek, bez kłódek i tarcz.
 */

const CLAIMS = [
  {
    headline: "Obraz ekranu zostaje na Twoim Macu.",
    detail:
      "Rozpoznawanie tekstu z zaznaczonej strefy odbywa się lokalnie, na urządzeniu.",
  },
  {
    headline: "Klucze API leżą w Pęku kluczy.",
    detail:
      "DeepL i Gemini zapisujesz w systemowym Keychainie macOS, lokalnie.",
  },
  {
    headline: "Klucze nie wychodzą na zewnątrz.",
    detail:
      "Nie są dołączane do aplikacji ani nikomu udostępniane. Internet jest potrzebny tylko tym dwóm silnikom.",
  },
];

export default function Privacy() {
  return (
    <section
      id="prywatnosc"
      className="scroll-mt-24 border-y border-[var(--va-line)] bg-[var(--va-panel)] py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <p className="va-mono text-[11px] uppercase tracking-[0.2em] text-[var(--va-ink-3)]">
            04 — prywatność
          </p>
          <h2 className="va-display text-[19px] font-semibold tracking-[-0.02em] text-[var(--va-ink-2)]">
            Co zostaje na Twoim Macu
          </h2>
        </div>

        <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-3">
          {CLAIMS.map(({ headline, detail }, index) => (
            <li
              key={headline}
              className={
                index === 0
                  ? "md:pr-4"
                  : "border-[var(--va-line)] md:border-l md:pl-12 md:pr-4"
              }
            >
              <p className="va-display text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--va-ink)] sm:text-[21px]">
                {headline}
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[var(--va-ink-2)]">
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
