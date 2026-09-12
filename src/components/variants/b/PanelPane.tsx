import { Keyboard, Lock, Move, RotateCcw, Type } from "lucide-react";
import {
  Footnote,
  Group,
  GroupLabel,
  PaneHeading,
  Row,
  RowIcon,
  Rows,
  StateSwitch,
} from "./ui";

/**
 * Możliwości panelu jako wiersze preferencji — nie cztery kafle. Wartości
 * po prawej udają stan systemu (jak w Ustawieniach), nie przyciski.
 */
export default function PanelPane() {
  return (
    <section
      id="panel"
      aria-labelledby="panel-title"
      className="scroll-mt-16 px-5 pt-4 pb-10 sm:px-8"
    >
      <PaneHeading
        id="panel-title"
        title="Panel tłumaczenia"
        lead="Leży tam, gdzie go ustawisz. Po wyjściu z trybu edycji zostaje zablokowany, żeby nie przesunął się pod kursorem."
      />

      <div className="mt-5">
        <GroupLabel>Tryb edycji</GroupLabel>
      </div>
      <Group>
        <Rows>
          <Row
            icon={
              <RowIcon>
                <Move className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Przesuwanie i zmiana rozmiaru"
            detail="W trybie edycji przeciągniesz panel w dowolne miejsce i dopasujesz wymiary do tego, co tłumaczysz."
            trailing="Włączony"
          />
          <Row
            icon={
              <RowIcon>
                <Type className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Wielkość tekstu"
            detail="Stopień pisma w panelu regulujesz osobno — czytelny także z większej odległości."
            trailing={
              <span
                aria-hidden
                className="flex items-end gap-1 text-[var(--vb-ink-3)]"
              >
                <span className="text-[11px] leading-none">A</span>
                <span className="text-[13px] leading-none">A</span>
                <span className="text-[16px] leading-none text-[var(--vb-ink)]">
                  A
                </span>
              </span>
            }
          />
          <Row
            icon={
              <RowIcon>
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Reset pozycji"
            detail="Jeśli panel wyląduje poza widocznym obszarem, jedno kliknięcie przywraca go na domyślne miejsce."
            trailing="Przywróć"
          />
        </Rows>
      </Group>

      <div className="mt-6">
        <GroupLabel>Podczas pracy</GroupLabel>
      </div>
      <Group>
        <Rows>
          <Row
            icon={
              <RowIcon>
                <Keyboard className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Pauza pod skrótem"
            detail="Tłumaczenie zatrzymasz i wznowisz przyciskiem albo własnym skrótem klawiszowym, bez wracania do ustawień."
            trailing={
              <kbd className="vb-mono rounded-[var(--vb-r-sm)] bg-[var(--vb-panel-sunken)] px-1.5 py-0.5 text-[11px] shadow-[inset_0_0_0_0.5px_var(--vb-line)]">
                skrót
              </kbd>
            }
          />
          <Row
            icon={
              <RowIcon tone="blue">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Blokada po edycji"
            detail="Po zakończeniu ustawiania panel nie przesunie się przypadkiem, kiedy pracujesz pod nim myszą."
            trailing={
              <StateSwitch on stateLabel="Blokada panelu jest włączona" />
            }
          />
        </Rows>
      </Group>

      <Footnote className="mt-3 ml-1">
        Skrót pauzy ustawiasz w aplikacji — tu widać tylko, że jest dostępny.
      </Footnote>
    </section>
  );
}
