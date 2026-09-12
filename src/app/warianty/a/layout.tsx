import type { Metadata } from "next";
import { Instrument_Sans, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./variant-a.css";

/* Fonty ładowane lokalnie dla tej trasy, nie w root layoucie — wariant jest
   odizolowany i nie może zmieniać typografii strony głównej.

   Inter Tight na nagłówki: to wersja Intera zaprojektowana pod duże stopnie,
   z ciaśniejszym rytmem znaków, więc ujemny letter-spacing nie zaczyna
   sklejać liter. Instrument Sans na treść: szersze prześwity i spokojniejsze
   kształty, lepiej znosi 14–16 px. JetBrains Mono wszędzie, gdzie mowa
   o komendach, ścieżkach i parametrach technicznych.

   latin-ext jest obowiązkowy — bez niego ą, ć, ę, ł, ń, ś, ź, ż lecą
   na font zastępczy. */

const display = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--va-font-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--va-font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--va-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SayWut — wariant A",
  description:
    "SayWut odczytuje tekst z zaznaczonej strefy ekranu, tłumaczy go na bieżąco i pokazuje wynik w przezroczystym panelu. Wariant A redesignu.",
};

export default function VariantALayout(props: LayoutProps<"/warianty/a">) {
  return (
    <div
      className={`${display.variable} ${sans.variable} ${mono.variable} va-root flex min-h-screen flex-1 flex-col`}
    >
      {props.children}
    </div>
  );
}
