import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SayWut — tłumaczenie ekranu na żywo dla macOS",
  description:
    "SayWut rozpoznaje tekst z wybranego fragmentu ekranu, tłumaczy go w czasie rzeczywistym i wyświetla wynik w lekkim, przezroczystym panelu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
