import { Group, PaneHeading, Row, Rows } from "./ui";

/* Asystent konfiguracji: pięć kroków jako lista wierszy z numerami
   w kolumnie wiodącej, nie pięć kafli w gridzie. */

const STEPS = [
  {
    title: "Zaznacz obszar ekranu",
    description:
      "Wskaż fragment, z którego SayWut ma odczytywać tekst — okno gry, odtwarzacz, dokument.",
  },
  {
    title: "Ustaw języki",
    description: "Język źródłowy i język, na który ma być tłumaczony tekst.",
  },
  {
    title: "Wybierz silnik tłumaczenia",
    description:
      "Systemowy macOS, DeepL, Gemini albo Apple Intelligence — do wyboru w każdej chwili.",
  },
  {
    title: "Uruchom tłumaczenie na żywo",
    description:
      "SayWut śledzi zaznaczony obszar w czasie rzeczywistym i reaguje na zmianę tekstu.",
  },
  {
    title: "Odbierz wynik w panelu",
    description:
      "Tłumaczenie pojawia się w półprzezroczystym panelu obok źródła.",
  },
] as const;

export default function HowItWorksPane() {
  return (
    <section
      id="jak-dziala"
      aria-labelledby="jak-dziala-title"
      className="scroll-mt-16 px-5 pt-9 pb-11 sm:px-8"
    >
      <PaneHeading
        id="jak-dziala-title"
        title="Jak to działa"
        lead="Konfiguracja jest jednorazowa. Potem wystarczy uruchomić tłumaczenie."
      />

      <Group className="mt-5">
        <Rows ordered>
          {STEPS.map((step, index) => (
            <Row
              key={step.title}
              icon={
                // Numer jest dekoracją: kolejność niesie już <ol>.
                <span
                  aria-hidden
                  className="vb-mono vb-tnum flex h-6 w-6 items-center justify-center rounded-[var(--vb-r-sm)] bg-[var(--vb-panel-sunken)] text-[11px] font-medium text-[var(--vb-ink-2)]"
                >
                  {index + 1}
                </span>
              }
              title={step.title}
              detail={step.description}
            />
          ))}
        </Rows>
      </Group>
    </section>
  );
}
