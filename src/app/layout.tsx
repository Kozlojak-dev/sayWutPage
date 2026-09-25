import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "lenis/dist/lenis.css";
import "./globals.css";
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
  title: "SayWut — tłumaczenie ekranu na żywo",
  description:
    "SayWut rozpoznaje tekst z wybranego fragmentu ekranu, tłumaczy go w czasie rzeczywistym i wyświetla wynik w lekkim, przezroczystym panelu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${interText.variable} ${interDisplay.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="vb-root min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
