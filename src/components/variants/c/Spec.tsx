import { PRIVACY_NOTES, SPEC_GROUPS } from "./content";

/** Arkusz danych: grupy A–C jako listy definicyjne, nie jako kafelki. */
export default function Spec() {
  return (
    <section id="specyfikacja" className="scroll-mt-24 pt-36 sm:pt-52">
      <div className="vc-container grid grid-cols-12 gap-x-4 sm:gap-x-6">
        <p className="vc-label col-span-12">
          03
          <span aria-hidden className="text-[var(--vc-signal)]">
            /
          </span>{" "}
          Specyfikacja
        </p>

        <h2 className="vc-display col-span-12 mt-5 text-[clamp(1.75rem,4.2vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-[var(--vc-paper)] lg:col-span-7">
          Wymagania, panel, prywatność
        </h2>

        <ul className="col-span-12 mt-8 flex flex-col gap-3 lg:col-span-4 lg:col-start-9 lg:mt-7">
          {PRIVACY_NOTES.map((note) => (
            <li
              key={note}
              className="border-t border-[var(--vc-rule)] pt-3 text-[0.8125rem] leading-[1.6] text-[var(--vc-paper-dim)]"
            >
              {note}
            </li>
          ))}
        </ul>

        <div className="col-span-12 mt-16 grid grid-cols-12 gap-x-4 gap-y-16 sm:mt-24 sm:gap-x-6">
          {SPEC_GROUPS.map((group) => (
            <div
              key={group.number}
              className={
                group.number === "A"
                  ? "col-span-12 lg:col-span-7"
                  : group.number === "B"
                    ? "col-span-12 lg:col-span-5 lg:pt-20"
                    : "col-span-12 lg:col-span-8 lg:col-start-5"
              }
            >
              <h3 className="vc-display text-[1.375rem] font-extrabold tracking-[-0.03em] text-[var(--vc-paper)]">
                <span className="vc-mono mr-3 text-[0.75rem] font-medium text-[var(--vc-paper-faint)]">
                  {group.number}
                  <span aria-hidden className="text-[var(--vc-signal)]">
                    /
                  </span>
                </span>
                {group.title}
              </h3>

              <dl className="mt-6">
                {group.rows.map((row) => (
                  <div
                    key={row.term}
                    className="grid grid-cols-12 gap-x-4 border-t border-[var(--vc-rule)] py-3 sm:gap-x-6"
                  >
                    <dt className="vc-label col-span-12 sm:col-span-4">
                      {row.term}
                    </dt>
                    <dd className="col-span-12 mt-1 text-[0.9375rem] leading-snug text-[var(--vc-paper-dim)] sm:col-span-8 sm:mt-0">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
