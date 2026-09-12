import { Cpu, KeyRound, Laptop, Monitor, Shield } from "lucide-react";
import {
  Footnote,
  Group,
  GroupLabel,
  PaneHeading,
  Row,
  RowIcon,
  Rows,
  StateSwitch,
  SystemPath,
} from "./ui";

export default function PrivacyPane() {
  return (
    <section
      id="prywatnosc"
      aria-labelledby="prywatnosc-title"
      className="scroll-mt-16 px-5 pt-3 pb-11 sm:px-8"
    >
      <SystemPath
        steps={[
          "Ustawienia systemowe",
          "Prywatność i bezpieczeństwo",
          "Nagrywanie ekranu",
        ]}
      />

      <div className="mt-4">
        <PaneHeading
          id="prywatnosc-title"
          title="Prywatność i bezpieczeństwo"
          lead="Bez zgody na nagrywanie ekranu SayWut nie odczyta tekstu z zaznaczonej strefy."
        />
      </div>

      <div className="mt-5">
        <GroupLabel>Wymagania</GroupLabel>
      </div>
      <Group>
        <Rows>
          <Row
            icon={
              <RowIcon>
                <Laptop className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="macOS 15 Sequoia lub nowszy"
          />
          <Row
            icon={
              <RowIcon>
                <Cpu className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Apple Silicon M1 / M2 / M3 / M4"
          />
        </Rows>
      </Group>

      <div className="mt-6">
        <GroupLabel>Nagrywanie ekranu</GroupLabel>
      </div>
      <Group>
        <Rows>
          <Row
            icon={
              <RowIcon tone="blue">
                <Monitor className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="SayWut"
            detail="Aplikacja może rejestrować zawartość ekranu, żeby rozpoznać tekst lokalnie."
            trailing={
              <StateSwitch on stateLabel="Uprawnienie Nagrywanie ekranu jest włączone" />
            }
          />
        </Rows>
      </Group>

      <div className="mt-6">
        <GroupLabel>Co zostaje na Macu</GroupLabel>
      </div>
      <Group>
        <Rows>
          <Row
            icon={
              <RowIcon>
                <Shield className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Obraz ekranu przetwarzany lokalnie"
            detail="Rozpoznawanie tekstu z zaznaczonej strefy odbywa się na Twoim Macu, nie w chmurze."
          />
          <Row
            icon={
              <RowIcon>
                <KeyRound className="h-3.5 w-3.5" strokeWidth={2} />
              </RowIcon>
            }
            title="Klucze API w Pęku kluczy"
            detail="Klucze DeepL i Gemini zapisujesz w systemowym Keychainie. Nie są dołączane do aplikacji ani nikomu udostępniane."
          />
        </Rows>
      </Group>

      <Footnote className="mt-3 ml-1">
        Internet jest potrzebny wyłącznie przy DeepL i Gemini.
      </Footnote>
    </section>
  );
}
