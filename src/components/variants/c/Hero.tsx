import CommandRow from "./CommandRow";
import Mascot from "./Mascot";
import ScrollLink from "./ScrollLink";
import { HERO_FACTS, REPO_URL } from "./content";

/**
 * Otwarcie: display w kolumnach 1–9, arkusz danych dosunięty do dołu w 10–12,
 * a akapit i komenda przesunięte do kolumny 4. Nic nie jest wycentrowane.
 *
 * Stopień display liczony tak, żeby najdłuższe słowo („Tłumaczenie") zmieściło
 * się w swoich kolumnach przy 1024 px i nie wypchnęło strony w poziomie
 * przy 320 px.
 */
export default function Hero() {
  return (
    <section className="pt-8 sm:pt-12">
      <div className="vc-container grid grid-cols-12 gap-x-4 sm:gap-x-6">
        <div className="col-span-12 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-[var(--vc-rule)] pb-3">
          <span className="vc-label text-[var(--vc-paper-dim)]">
            Arkusz produktu
          </span>
          <span className="vc-label">Aplikacja dla macOS</span>
          <span className="vc-label ml-auto">Wariant C</span>
        </div>

        <h1 className="vc-display col-span-12 mt-12 text-[clamp(2.375rem,9.5vw,9.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-[var(--vc-paper)] [overflow-wrap:break-word] sm:mt-16 lg:col-span-9">
          Tłumaczenie
          <br />
          ekranu
          <br />
          na <span className="vc-underline">żywo</span>
        </h1>

        <dl className="col-span-12 mt-12 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:grid-cols-1 lg:self-end">
          {HERO_FACTS.map(({ term, value }) => (
            <div key={term} className="border-t border-[var(--vc-rule)] py-2.5">
              <dt className="vc-label">{term}</dt>
              <dd className="mt-1 text-[0.8125rem] leading-snug text-[var(--vc-paper-dim)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="col-span-12 mt-14 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-[var(--vc-paper-dim)] sm:text-[1.125rem] lg:col-span-6 lg:col-start-4 lg:mt-20">
          SayWut odczytuje tekst z zaznaczonego fragmentu ekranu, tłumaczy go w
          czasie rzeczywistym i pokazuje wynik w lekkim, przezroczystym panelu.
          Bez przełączania okien, bez kopiowania tekstu.
        </p>

        <div className="col-span-12 mt-9 flex flex-wrap items-baseline gap-x-10 gap-y-4 text-[0.9375rem] lg:col-span-6 lg:col-start-4">
          <ScrollLink href="#instalacja" className="vc-link text-[var(--vc-paper)]">
            Instalacja<span aria-hidden> →</span>
          </ScrollLink>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vc-link text-[var(--vc-paper-dim)]"
          >
            Repozytorium<span aria-hidden> ↗</span>
          </a>
        </div>

        <div className="col-span-12 mt-14 lg:col-span-9 lg:col-start-4">
          <p className="vc-label mb-3">Terminal · jedna komenda</p>
          <CommandRow />
        </div>
      </div>

      {/* Zamknięcie sekcji: maskotka stoi na tej samej regule, pod którą
          zaczyna się podpis nagrania. */}
      <div className="vc-container">
        <div className="relative mt-32 border-t border-[var(--vc-rule-strong)] sm:mt-40">
          <Mascot
            label="Maskotka SayWut — najedź, aby podskoczyła, kliknij, aby się obróciła"
            frameClass="h-[104px] w-[84px] sm:h-[128px] sm:w-[104px]"
            bubbleSide="right"
            hoverShouts={["hey!", "hm?"]}
            className="absolute bottom-full left-0"
          />
        </div>
      </div>
    </section>
  );
}
