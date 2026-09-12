import CommandRow from "./CommandRow";
import Mascot from "./Mascot";
import { INSTALL_NOTES } from "./content";

function isFlagged(note: (typeof INSTALL_NOTES)[number]) {
  return "flagged" in note && note.flagged;
}

/** Komenda na pełną szerokość siatki, potem uwagi — Gatekeeper w akcencie. */
export default function Install() {
  return (
    <section id="instalacja" className="scroll-mt-24 pt-24 sm:pt-36">
      <div className="vc-container grid grid-cols-12 gap-x-4 sm:gap-x-6">
        <p className="vc-label col-span-12 lg:col-start-3 lg:col-span-10">
          04
          <span aria-hidden className="text-[var(--vc-signal)]">
            /
          </span>{" "}
          Instalacja
        </p>

        <h2 className="vc-display col-span-12 mt-5 text-[clamp(1.75rem,4.2vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-[var(--vc-paper)] lg:col-span-8 lg:col-start-3">
          Jedna komenda w Terminalu
        </h2>

        <div className="col-span-12 mt-12 lg:col-span-10 lg:col-start-2 lg:mt-16">
          <p className="vc-label mb-3">Terminal · ta sama komenda aktualizuje</p>
          <CommandRow scale="display" />
        </div>

        <div className="relative col-span-12 mt-16 border-t border-[var(--vc-rule-strong)] sm:mt-20">
          <Mascot
            label="Maskotka przy instalacji — najedź, aby podskoczyła, kliknij, aby się obróciła"
            frameClass="h-[88px] w-[71px] sm:h-[104px] sm:w-[84px]"
            bubbleSide="right"
            greetOnView
            hoverShouts={["curl!", "open"]}
            clickShout="bash"
            className="absolute bottom-full left-0"
          />

          <ol>
            {INSTALL_NOTES.map((note) => {
              const flagged = isFlagged(note);

              return (
                <li
                  key={note.number}
                  className="grid grid-cols-12 gap-x-4 border-b border-[var(--vc-rule)] py-8 sm:gap-x-6 sm:py-10"
                >
                  <span
                    className={`vc-mono col-span-2 pt-1 text-[0.75rem] sm:col-span-1 ${
                      flagged
                        ? "text-[var(--vc-signal)]"
                        : "text-[var(--vc-paper-faint)]"
                    }`}
                  >
                    {note.number}
                  </span>
                  <div className="col-span-10 sm:col-span-10 sm:col-start-3 lg:col-span-8 lg:col-start-3">
                    <h3
                      className={`vc-display text-[1.125rem] font-extrabold tracking-[-0.03em] sm:text-[1.25rem] ${
                        flagged
                          ? "text-[var(--vc-signal)]"
                          : "text-[var(--vc-paper)]"
                      }`}
                    >
                      {note.title}
                    </h3>
                    <p className="mt-2 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-[var(--vc-paper-dim)]">
                      {note.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
