import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./variant-c.css";

/* Trzy kroje, trzy zadania. Wszystkie z latin-ext — bez tego subsetu polskie
   diakrytyki (ł, ż, ę, ś) lecą na fallback i display rozjeżdża się w pionie.

   Display: Bricolage Grotesque. Wąskie światła i nieregularne kończenia liter
   trzymają się w ryzach dopiero w dużym stopniu, a tu nagłówek ma 152 px.
   Treść: Instrument Sans — niski kontrast, spokojny rytm w długim wierszu.
   Dane: JetBrains Mono — cyfry o stałej szerokości w tabeli i numeracji. */

const display = Bricolage_Grotesque({
  variable: "--font-vc-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-vc-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-vc-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SayWut — arkusz produktu (wariant C)",
  description:
    "SayWut czyta tekst z zaznaczonego fragmentu ekranu, tłumaczy go w czasie rzeczywistym i pokazuje wynik w przezroczystym panelu. Cztery silniki tłumaczenia, macOS 15 i Apple Silicon.",
};

export default function VariantCLayout({ children }: { children: ReactNode }) {
  return (
    /* lang=pl, bo root layout deklaruje en, a cała treść trasy jest polska.
       overflow-x-clip zamiast hidden: przycina wystające display bez tworzenia
       kontekstu przewijania, więc sticky w nagłówku dalej działa. */
    <div
      lang="pl"
      className={`${display.variable} ${sans.variable} ${mono.variable} vc-root flex min-h-screen flex-1 flex-col overflow-x-clip antialiased`}
    >
      {children}
    </div>
  );
}
