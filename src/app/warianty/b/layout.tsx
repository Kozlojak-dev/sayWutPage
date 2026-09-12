import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";
import "./system.css";

/* Odpowiednik pary SF Pro Text / SF Pro Display: ten sam szkielet liter,
   ciaśniejszy rytm w dużych stopniach. Inter niesie tekst interfejsu, Inter
   Tight tylko nagłówki. `latin-ext` jest obowiązkowy — bez niego polskie
   ogonki lecą na font zastępczy. */
const interText = Inter({
  variable: "--vb-font-text",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const interDisplay = Inter_Tight({
  variable: "--vb-font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/* Technikalia: komenda instalacyjna, numery kroków, wartości w specyfikacji.
   Plex Mono nie jest zmienny, więc wagi trzeba wyliczyć. */
const plexMono = IBM_Plex_Mono({
  variable: "--vb-font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SayWut — tłumaczenie ekranu na żywo dla macOS (wariant B)",
  description:
    "SayWut rozpoznaje tekst z wybranego fragmentu ekranu, tłumaczy go w czasie rzeczywistym i wyświetla wynik w lekkim, przezroczystym panelu.",
};

export default function VariantBLayout({
  children,
}: LayoutProps<"/warianty/b">) {
  return (
    // Root layout ustawia białe tło na body, więc systemowa szarość musi
    // siedzieć na tym wrapperze i mieć własną minimalną wysokość.
    <div
      className={`vb-root ${interText.variable} ${interDisplay.variable} ${plexMono.variable} flex min-h-screen flex-1 flex-col`}
    >
      {children}
    </div>
  );
}
