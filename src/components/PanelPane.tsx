import { Keyboard, Lock, Move, RotateCcw, Type } from "lucide-react";
import {
  Group,
  GroupLabel,
  PaneHeading,
  Row,
  RowIcon,
  Rows,
} from "./ui";

/**
 * Możliwości panelu jako wiersze preferencji — nie cztery kafle.
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
        lead="Zostaje tam, gdzie go ustawisz. Po wyjściu z trybu edycji jego pozycja jest blokowana, aby zapobiec przypadkowemu przesunięciu."
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
            detail="W trybie edycji przeciągnij panel w dowolne miejsce i dopasuj jego wymiary do tłumaczonego tekstu."
          />
          <Row
            icon={
              <RowIcon>
                <Type className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Wielkość tekstu"
            detail="Dopasuj rozmiar tekstu w panelu do swoich potrzeb, żeby czytać wygodnie — bez względu na to, jak daleko siedzisz od ekranu."
          />
          <Row
            icon={
              <RowIcon>
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Reset pozycji"
            detail="Jeśli panel znajdzie się poza ekranem, jedno kliknięcie przywróci go na domyślne miejsce."
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
          />
          <Row
            icon={
              <RowIcon tone="blue">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Blokada po edycji"
            detail="Po zakończeniu ustawiania panel nie przesunie się przypadkiem, kiedy pracujesz pod nim myszą."
          />
        </Rows>
      </Group>
    </section>
  );
}
