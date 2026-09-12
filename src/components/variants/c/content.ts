/** Treść wariantu C w jednym miejscu — komponenty zostają czystym układem. */

export {
  INSTALL_COMMAND,
  GITHUB_REPO_URL as REPO_URL,
  GITHUB_ISSUES_URL as ISSUES_URL,
} from "@/lib/constants";

export const SCROLL_OFFSET = -96;

export const NAV_LINKS = [
  { label: "Przebieg", href: "#przebieg" },
  { label: "Silniki", href: "#silniki" },
  { label: "Specyfikacja", href: "#specyfikacja" },
  { label: "Instalacja", href: "#instalacja" },
] as const;

/** Nagłówek strony w skrócie — te same fakty, które niżej rozwija arkusz. */
export const HERO_FACTS = [
  { term: "Platforma", value: "macOS 15 Sequoia lub nowszy" },
  { term: "Układ", value: "Apple Silicon — M1, M2, M3, M4" },
  { term: "Silniki", value: "Cztery, przełączane w aplikacji" },
  { term: "Internet", value: "Tylko dla DeepL i Gemini" },
  { term: "Dystrybucja", value: "Poza App Store" },
] as const;

export const SEQUENCE = [
  {
    number: "01",
    title: "Zaznacz obszar ekranu",
    body: "Wskazujesz fragment ekranu, z którego SayWut ma odczytywać tekst.",
  },
  {
    number: "02",
    title: "Ustaw języki",
    body: "Język źródłowy i język, na który tekst ma być tłumaczony.",
  },
  {
    number: "03",
    title: "Wybierz silnik",
    body: "Tłumaczenie systemowe macOS, DeepL, Gemini albo Apple Intelligence.",
  },
  {
    number: "04",
    title: "Uruchom tłumaczenie",
    body: "SayWut śledzi zaznaczony obszar w czasie rzeczywistym.",
  },
  {
    number: "05",
    title: "Czytaj w panelu",
    body: "Wynik pojawia się w lekkim, przezroczystym panelu na ekranie.",
  },
] as const;

export type Engine = {
  name: string;
  key: string;
  internet: string;
  availability: string;
  character: string;
  /** Silnik działający bez klucza API i bez internetu — jedyny wiersz z akcentem. */
  default?: boolean;
};

export const ENGINES: Engine[] = [
  {
    name: "Tłumaczenie systemowe macOS",
    key: "Nie wymaga",
    internet: "Nie",
    availability: "Od razu po instalacji",
    character: "Wbudowany silnik Apple, zero konfiguracji",
    default: true,
  },
  {
    name: "DeepL",
    key: "Wymaga — darmowy 1 000 000 znaków / mies.",
    internet: "Tak",
    availability: "Po dodaniu klucza",
    character: "Wysoka jakość tłumaczeń",
  },
  {
    name: "Gemini",
    key: "Wymaga",
    internet: "Tak",
    availability: "Po dodaniu klucza",
    character: "Model Google, pomaga przy złożonym tekście",
  },
  {
    name: "Apple Intelligence",
    key: "Nie wymaga",
    internet: "Nie",
    availability: "Zależna od wersji macOS i urządzenia",
    character: "Tłumaczenie kontekstowe Apple",
  },
];

export const PRIVACY_NOTES = [
  "Obraz ekranu przetwarzany jest lokalnie na Twoim Macu.",
  "Klucze API trafiają do Pęku kluczy (Keychain).",
  "Klucze nie są dołączane do aplikacji ani nikomu udostępniane.",
] as const;

export type SpecGroup = {
  number: string;
  title: string;
  rows: readonly { term: string; value: string }[];
};

export const SPEC_GROUPS: readonly SpecGroup[] = [
  {
    number: "A",
    title: "Wymagania",
    rows: [
      { term: "System", value: "macOS 15 Sequoia lub nowszy" },
      { term: "Procesor", value: "Mac z Apple Silicon — M1, M2, M3, M4" },
      { term: "Uprawnienie", value: "Nagrywanie ekranu, przyznane dla SayWut" },
      { term: "Internet", value: "Potrzebny tylko przy DeepL i Gemini" },
      {
        term: "Lokalizacja",
        value: "/Applications, a przy braku uprawnień ~/Applications",
      },
    ],
  },
  {
    number: "B",
    title: "Panel",
    rows: [
      { term: "Tryb edycji", value: "Przesuwanie panelu i zmiana rozmiaru" },
      { term: "Tekst", value: "Regulowana wielkość w panelu" },
      { term: "Pozycja", value: "Reset do domyślnego położenia" },
      { term: "Pauza", value: "Przycisk albo skrót klawiszowy" },
      {
        term: "Po edycji",
        value: "Panel zablokowany — nie przesunie się przypadkiem",
      },
    ],
  },
  {
    number: "C",
    title: "Prywatność",
    rows: [
      { term: "Obraz ekranu", value: "Przetwarzany lokalnie na Twoim Macu" },
      { term: "Klucze API", value: "Przechowywane w Pęku kluczy (Keychain)" },
      {
        term: "Udostępnianie",
        value: "Klucze nie opuszczają Maca i nie trafiają do aplikacji",
      },
    ],
  },
];

export const INSTALL_NOTES = [
  {
    number: "01",
    title: "Uprawnienie do nagrywania ekranu",
    body: "Bez niego SayWut nie odczyta tekstu. Ustawienia systemowe → Prywatność i bezpieczeństwo → Nagrywanie ekranu → włącz SayWut → wróć do aplikacji i rozpocznij konfigurację.",
  },
  {
    number: "02",
    title: "Ostrzeżenie przy pierwszym uruchomieniu",
    body: "SayWut jest dystrybuowany poza App Store, więc macOS ostrzega przed pierwszym otwarciem. Finder → Aplikacje → prawy klik na SayWut.app → Otwórz → potwierdź uruchomienie.",
    flagged: true,
  },
  {
    number: "03",
    title: "Aktualizacja",
    body: "Uruchom tę samą komendę ponownie. Nowa wersja zastąpi poprzednią.",
  },
] as const;

/** Nagranie: wymiary źródła muszą trafić do <video>, żeby przeglądarka znała
    proporcje przed pobraniem pliku. */
export const VIDEO = {
  poster: "/demo/hero-poster.jpg",
  webm: "/demo/hero.webm",
  mp4: "/demo/hero.mp4",
  width: 1440,
  height: 766,
  description:
    "SayWut w działaniu: angielskie napisy w zaznaczonej strefie ekranu i ich polskie tłumaczenie w panelu nakładki.",
} as const;
