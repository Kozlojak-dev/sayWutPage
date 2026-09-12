/**
 * Możliwości panelu jako lista definicyjna. Cztery pojęcia, cztery
 * objaśnienia, hairline między nimi — bez kafli i bez ikon, bo żadna z tych
 * czynności nie ma sensownego piktogramu, a cztery przypadkowe symbole
 * zrobiłyby tylko szum.
 *
 * Kolumny odwrócone względem sekcji wyżej: tekst po lewej, nagłówek po
 * prawej. To ta sama siatka, ale kompozycja nie leci w kółko tym samym torem.
 */

const PANEL = [
  {
    term: "Przesuwanie i rozmiar",
    definition:
      "W trybie edycji przeciągniesz panel w dowolne miejsce ekranu i dopasujesz jego wymiary do tego, co tłumaczysz.",
  },
  {
    term: "Wielkość tekstu",
    definition:
      "Stopień pisma w panelu regulujesz osobno, żeby tłumaczenie było czytelne również z większej odległości.",
  },
  {
    term: "Reset pozycji",
    definition:
      "Jeśli panel wyląduje poza widocznym obszarem, jedno kliknięcie przywraca go na domyślne miejsce.",
  },
  {
    term: "Pauza pod skrótem",
    definition:
      "Tłumaczenie zatrzymasz i wznowisz przyciskiem albo własnym skrótem klawiszowym, bez wracania do ustawień.",
  },
];

export default function PanelSpec() {
  return (
    <section id="panel" className="scroll-mt-24 pt-16 pb-28 sm:pb-36">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <dl className="border-t border-[var(--va-line)] lg:order-1 lg:col-span-7">
            {PANEL.map(({ term, definition }) => (
              <div
                key={term}
                className="grid gap-x-8 gap-y-1 border-b border-[var(--va-line)] py-6 sm:grid-cols-[13rem_1fr]"
              >
                <dt className="va-display text-[17px] font-semibold tracking-[-0.015em] text-[var(--va-ink)]">
                  {term}
                </dt>
                <dd className="max-w-[54ch] text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
                  {definition}
                </dd>
              </div>
            ))}
          </dl>

          <div className="lg:order-2 lg:col-span-4 lg:col-start-9">
            <p className="va-mono text-[11px] uppercase tracking-[0.2em] text-[var(--va-ink-3)]">
              02 — panel
            </p>
            <h2 className="va-display mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--va-ink)]">
              Leży tam,
              <br />
              gdzie ustawisz
            </h2>
            <p className="mt-5 text-[15px] leading-[1.6] text-[var(--va-ink-2)]">
              Po wyjściu z trybu edycji panel zostaje zablokowany — nie
              przesunie się przypadkiem, kiedy pracujesz pod nim myszą.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
