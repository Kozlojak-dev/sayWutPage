/**
 * Cztery silniki to porównanie, a porównanie to tabela — nie cztery
 * bliźniacze kafle obok siebie. Na wąskich ekranach komórki układają się
 * w kolumnę i dostają własne etykiety, bo nagłówek tabeli znika.
 */

type Engine = {
  name: string;
  key: string;
  note: string;
  standard?: boolean;
};

const ENGINES: Engine[] = [
  {
    name: "Tłumaczenie systemowe macOS",
    key: "nie wymaga",
    note: "Wbudowany silnik Apple. Działa od razu po instalacji, bez zakładania konta i bez konfiguracji.",
    standard: true,
  },
  {
    name: "DeepL",
    key: "wymagany",
    note: "Wysoka jakość przekładu. Darmowy klucz DeepL obejmuje milion znaków miesięcznie.",
  },
  {
    name: "Gemini",
    key: "wymagany",
    note: "Tłumaczenie modelem Google Gemini, przydatne przy bardziej złożonym albo wieloznacznym tekście.",
  },
  {
    name: "Apple Intelligence",
    key: "—",
    note: "Kontekstowe tłumaczenie Apple. Dostępność zależy od urządzenia i wersji macOS.",
  },
];

export default function Engines() {
  return (
    <section id="silniki" className="scroll-mt-24 pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="va-mono text-[11px] uppercase tracking-[0.2em] text-[var(--va-ink-3)]">
              03 — silniki
            </p>
            <h2 className="va-display mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--va-ink)]">
              Cztery silniki tłumaczenia
            </h2>
          </div>
          <p className="max-w-[42ch] text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
            Klucze do DeepL i Gemini są opcjonalne. Bez żadnego z nich nadal
            tłumaczysz — silnikiem wbudowanym w macOS.
          </p>
        </div>

        <table className="mt-10 w-full border-collapse text-left">
          <caption className="sr-only">
            Porównanie czterech silników tłumaczenia dostępnych w SayWut
          </caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-y border-[var(--va-line-strong)]">
              <th
                scope="col"
                className="va-mono w-[30%] py-3 pr-8 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--va-ink-3)]"
              >
                silnik
              </th>
              <th
                scope="col"
                className="va-mono w-[16%] py-3 pr-8 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--va-ink-3)]"
              >
                klucz API
              </th>
              <th
                scope="col"
                className="va-mono py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--va-ink-3)]"
              >
                charakterystyka
              </th>
            </tr>
          </thead>
          <tbody className="block border-t border-[var(--va-line-strong)] md:table-row-group md:border-t-0">
            {ENGINES.map(({ name, key, note, standard }) => (
              <tr
                key={name}
                className="group block border-b border-[var(--va-line)] py-5 align-top md:table-row md:py-0"
              >
                <th
                  scope="row"
                  className="va-display block pr-8 text-left text-[17px] font-semibold tracking-[-0.015em] text-[var(--va-ink)] md:table-cell md:py-6"
                >
                  {name}
                  {standard ? (
                    <span className="va-mono ml-2.5 inline-flex items-center gap-1.5 align-middle text-[11px] font-normal tracking-[0.04em] text-[var(--va-signal-ink)]">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-[var(--va-signal)]"
                      />
                      domyślny
                    </span>
                  ) : null}
                </th>
                <td className="va-mono block pt-1.5 pr-8 text-[13px] text-[var(--va-ink-2)] md:table-cell md:py-6 md:pt-6">
                  <span className="va-mono mr-2 uppercase tracking-[0.14em] text-[var(--va-ink-3)] md:hidden">
                    klucz API
                  </span>
                  {key}
                </td>
                <td className="block max-w-[62ch] pt-2 text-[15px] leading-[1.6] text-[var(--va-ink-2)] md:table-cell md:py-6 md:pt-6">
                  {note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="va-mono mt-5 text-[12px] leading-relaxed tracking-[0.03em] text-[var(--va-ink-3)]">
          Połączenie z internetem jest potrzebne wyłącznie przy DeepL i Gemini.
        </p>
      </div>
    </section>
  );
}
