import { SEQUENCE } from "./content";

/** Pięć kroków jako numerowana lista na hairline'ach — bez kafli. */
export default function Sequence() {
  return (
    <section id="przebieg" className="scroll-mt-24 pt-28 sm:pt-40">
      <div className="vc-container grid grid-cols-12 gap-x-4 sm:gap-x-6">
        <p className="vc-label col-span-12">
          01
          <span aria-hidden className="text-[var(--vc-signal)]">
            /
          </span>{" "}
          Przebieg
        </p>

        <h2 className="vc-display col-span-12 mt-5 text-[clamp(1.75rem,4.2vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-[var(--vc-paper)] lg:col-span-8">
          Od zaznaczenia do panelu
        </h2>

        <ol className="col-span-12 mt-14 sm:mt-20">
          {SEQUENCE.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-12 gap-x-4 border-t border-[var(--vc-rule)] py-7 sm:gap-x-6 sm:py-9"
            >
              <span className="vc-mono col-span-2 pt-1 text-[0.75rem] text-[var(--vc-paper-faint)] sm:col-span-1">
                {step.number}
              </span>
              <h3 className="vc-display col-span-10 text-[1.125rem] font-extrabold tracking-[-0.03em] text-[var(--vc-paper)] sm:col-span-4 sm:text-[1.375rem]">
                {step.title}
              </h3>
              <p className="col-span-10 col-start-3 mt-2 text-[0.9375rem] leading-[1.7] text-[var(--vc-paper-dim)] sm:col-span-7 sm:col-start-6 sm:mt-0">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
