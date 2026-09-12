const steps = [
  {
    number: "01",
    title: "Zaznacz obszar ekranu",
    description:
      "Wybierz fragment ekranu, z którego SayWut ma odczytywać tekst.",
  },
  {
    number: "02",
    title: "Ustaw języki",
    description:
      "Określ język źródłowy i język, na który ma być tłumaczony tekst.",
  },
  {
    number: "03",
    title: "Wybierz silnik tłumaczenia",
    description:
      "System macOS, DeepL, Gemini lub Apple Intelligence — Ty decydujesz.",
  },
  {
    number: "04",
    title: "Uruchom tłumaczenie na żywo",
    description:
      "SayWut zaczyna śledzić zaznaczony obszar w czasie rzeczywistym.",
  },
  {
    number: "05",
    title: "Odbierz wynik w panelu",
    description:
      "Tłumaczenie pojawia się w lekkim, przezroczystym panelu na ekranie.",
  },
];

export default function HowItWorks() {
  return (
    <section id="jak-dziala" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            Jak to działa
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg">
            Pięć kroków dzieli Cię od tłumaczenia dowolnego fragmentu ekranu na
            żywo.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 sm:grid-cols-5">
          {steps.map((step) => (
            <li key={step.number} className="flex flex-col gap-3 bg-white p-6">
              <span className="font-mono text-sm font-medium text-zinc-400">
                {step.number}
              </span>
              <h3 className="text-sm font-semibold text-zinc-950">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
