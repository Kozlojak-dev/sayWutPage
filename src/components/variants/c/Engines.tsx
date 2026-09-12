import Mascot from "./Mascot";
import { ENGINES } from "./content";

const COLUMNS = [
  { key: "character", label: "Charakter" },
  { key: "key", label: "Klucz" },
  { key: "internet", label: "Internet" },
  { key: "availability", label: "Dostępność" },
] as const;

/** Semantyczna tabela; poniżej 48 rem komórki układają się w wiersze z etykietą. */
export default function Engines() {
  return (
    <section id="silniki" className="scroll-mt-24 pt-20 sm:pt-28">
      <div className="vc-container grid grid-cols-12 gap-x-4 sm:gap-x-6">
        <p className="vc-label col-span-12">
          02
          <span aria-hidden className="text-[var(--vc-signal)]">
            /
          </span>{" "}
          Silniki
        </p>

        <h2 className="vc-display col-span-12 mt-5 text-[clamp(1.75rem,4.2vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-[var(--vc-paper)] lg:col-span-6">
          Cztery tłumacze
        </h2>

        <div className="relative col-span-12 mt-14 border-t border-[var(--vc-rule-strong)] pt-10 sm:mt-16 sm:pt-12">
          <Mascot
            label="Maskotka przy tabeli silników — najedź, aby podskoczyła, kliknij, aby się obróciła"
            frameClass="h-[88px] w-[71px] sm:h-[104px] sm:w-[84px]"
            bubbleSide="left"
            greetOnView
            hoverShouts={["local", "this"]}
            clickShout="zero"
            className="absolute bottom-full right-0"
          />

          <table className="vc-table" role="table">
            <caption className="sr-only">
              Porównanie silników: nazwa, charakter, klucz, internet, dostępność
            </caption>
            <thead role="rowgroup">
              <tr role="row" className="border-b border-[var(--vc-rule-strong)]">
                <th
                  scope="col"
                  role="columnheader"
                  className="vc-label pb-3 pr-5"
                >
                  Nazwa
                </th>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    role="columnheader"
                    className="vc-label pb-3 pr-5 last:pr-0"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {ENGINES.map((engine) => (
                <tr
                  key={engine.name}
                  role="row"
                  className={`border-b border-[var(--vc-rule)] ${
                    engine.default ? "vc-engine-default" : ""
                  }`}
                >
                  <th
                    scope="row"
                    role="rowheader"
                    className="py-4 pr-5 text-[0.9375rem] font-medium leading-snug text-[var(--vc-paper)] [overflow-wrap:anywhere]"
                  >
                    {engine.name}
                    {engine.default ? (
                      <span className="sr-only"> (domyślny)</span>
                    ) : null}
                  </th>
                  <td
                    role="cell"
                    data-label="Charakter"
                    className="py-4 pr-5 text-[0.8125rem] leading-snug text-[var(--vc-paper-dim)] [overflow-wrap:anywhere]"
                  >
                    {engine.character}
                  </td>
                  <td
                    role="cell"
                    data-label="Klucz"
                    className="py-4 pr-5 text-[0.8125rem] leading-snug text-[var(--vc-paper-dim)] [overflow-wrap:anywhere]"
                  >
                    {engine.key}
                  </td>
                  <td
                    role="cell"
                    data-label="Internet"
                    className="py-4 pr-5 text-[0.8125rem] leading-snug text-[var(--vc-paper-dim)]"
                  >
                    {engine.internet}
                  </td>
                  <td
                    role="cell"
                    data-label="Dostępność"
                    className="py-4 text-[0.8125rem] leading-snug text-[var(--vc-paper-dim)] [overflow-wrap:anywhere]"
                  >
                    {engine.availability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
