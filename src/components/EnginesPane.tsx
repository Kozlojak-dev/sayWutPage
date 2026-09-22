import { Apple, Bot, Languages, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Footnote,
  Group,
  PaneHeading,
  Row,
  RowIcon,
  Rows,
} from "./ui";

type Engine = {
  name: string;
  note: string;
  status: string;
  icon: LucideIcon;
  selected?: boolean;
};

const ENGINES: Engine[] = [
  {
    name: "Tłumaczenie systemowe macOS",
    note: "Wbudowany silnik Apple. Działa od razu po instalacji, bez konta i bez klucza.",
    status: "Wybrane · bez klucza",
    icon: Apple,
    selected: true,
  },
  {
    name: "DeepL",
    note: "Wysoka jakość tłumaczenia. Darmowy klucz obejmuje milion znaków per konto",
    status: "Klucz · 1 mln znaków/konto",
    icon: Languages,
  },
  {
    name: "Gemini",
    note: "Tłumaczenie modelem Google Gemini, przydatne przy złożonym albo wieloznacznym tekście.",
    status: "Wymaga klucza API",
    icon: Bot,
  },
  {
    name: "Apple Intelligence",
    note: "Kontekstowe tłumaczenie Apple. Dostępność zależy od urządzenia i wersji macOS.",
    status: "Zależne od urządzenia",
    icon: Wand2,
  },
];

/**
 * Lista wyboru silnika — prezentacyjna. Zaznaczona jest pozycja systemowa,
 * bo nie wymaga klucza. Nie udajemy radiogroupy: stan jest tekstem w wierszu.
 */
export default function EnginesPane() {
  return (
    <section
      id="silniki"
      aria-labelledby="silniki-title"
      className="scroll-mt-16 px-5 pt-3 pb-9 sm:px-8"
    >
      <PaneHeading
        id="silniki-title"
        title="Silnik tłumaczenia"
        lead="Klucze do DeepL i Gemini są opcjonalne. Bez nich nadal tłumaczysz silnikiem wbudowanym w macOS."
      />

      <Group className="mt-5">
        <Rows>
          {ENGINES.map(({ name, note, status, icon: Icon, selected }) => (
            <Row
              key={name}
              selected={selected}
              icon={
                <RowIcon tone={selected ? "onBlue" : "neutral"}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </RowIcon>
              }
              title={name}
              detail={note}
              trailing={status}
            />
          ))}
        </Rows>
      </Group>

      <Footnote className="mt-3 ml-1">
        Połączenie z internetem jest potrzebne wyłącznie przy DeepL i Gemini.
      </Footnote>
    </section>
  );
}
