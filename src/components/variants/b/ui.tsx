import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/* Prezentacyjne prymitywy wariantu B. Żaden z nich nie przyjmuje handlerów,
   więc plik zostaje po stronie serwera — interaktywne kontrolki (przełącznik,
   segmented control, lista wyboru) mieszkają w panelach, które ich używają. */

// MARK: - Okno

export function TrafficLights() {
  return (
    <span aria-hidden className="flex shrink-0 items-center gap-2">
      {(
        [
          ["var(--vb-light-red)", "rgba(155,45,40,0.35)"],
          ["var(--vb-light-amber)", "rgba(160,110,10,0.35)"],
          ["var(--vb-light-green)", "rgba(20,110,35,0.35)"],
        ] as const
      ).map(([fill, edge]) => (
        <span
          key={fill}
          className="h-3 w-3 rounded-full"
          style={{ background: fill, boxShadow: `inset 0 0 0 0.5px ${edge}` }}
        />
      ))}
    </span>
  );
}

/**
 * Chrome okna macOS: pasek tytułu z traffic lights po lewej i tytułem
 * wyśrodkowanym optycznie w całej szerokości. `tone="dark"` obsługuje
 * Terminal, który ma ciemny korpus, ale identyczną geometrię.
 */
export function WindowFrame({
  title,
  tone = "light",
  titleTrailing,
  bodyClassName = "",
  className = "",
  children,
}: {
  title: string;
  tone?: "light" | "dark";
  titleTrailing?: ReactNode;
  bodyClassName?: string;
  className?: string;
  children: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`vb-window-shadow rounded-[var(--vb-r)] ${
        dark ? "bg-[#1d1d20]" : "bg-[var(--vb-window)]"
      } ${className}`}
    >
      <div
        className={`relative flex h-[38px] items-center gap-3 rounded-t-[var(--vb-r)] px-3.5 ${
          dark
            ? "border-b border-white/10 bg-white/[0.06]"
            : "vb-vibrancy border-b border-[var(--vb-line)]"
        }`}
      >
        <TrafficLights />
        <p
          className={`pointer-events-none absolute inset-x-14 text-center text-[13px] font-medium ${
            dark ? "text-white/55" : "text-[var(--vb-ink-2)]"
          }`}
        >
          {title}
        </p>
        <span className="ml-auto flex items-center gap-2">{titleTrailing}</span>
      </div>

      <div className={`rounded-b-[var(--vb-r)] ${bodyClassName}`}>{children}</div>
    </div>
  );
}

// MARK: - Grupy wierszy

export function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-2 ml-1 text-[13px] font-medium text-[var(--vb-ink-2)]">
      {children}
    </h3>
  );
}

export function Group({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`vb-group-shadow overflow-hidden rounded-[var(--vb-r)] bg-[var(--vb-panel)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Rows({
  ordered = false,
  className = "",
  children,
}: {
  ordered?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const List = ordered ? "ol" : "ul";

  return <List className={`vb-rows ${className}`}>{children}</List>;
}

/**
 * Wiersz grupy. Ikona wiodąca stoi w osobnej kolumnie poza linią separatora —
 * dzięki temu hairline jest wcięty tak jak w Ustawieniach systemowych.
 */
export function Row({
  icon,
  title,
  detail,
  trailing,
  selected = false,
  className = "",
}: {
  icon?: ReactNode;
  title: ReactNode;
  detail?: ReactNode;
  trailing?: ReactNode;
  /** Zaznaczenie listy wyboru — tło systemowego błękitu, jasny tekst. */
  selected?: boolean;
  className?: string;
}) {
  return (
    <li
      className={`flex items-stretch pl-3.5 ${selected ? "vb-selected" : ""} ${className}`}
    >
      {icon ? (
        <span className="flex shrink-0 items-start pt-[13px] pr-3">{icon}</span>
      ) : null}
      <div className="vb-row-line flex min-w-0 flex-1 items-center gap-4 py-2.5 pr-3.5">
        <div className="min-w-0 flex-1">
          <p
            className={`text-[13px] font-medium ${
              selected ? "text-white" : "text-[var(--vb-ink)]"
            }`}
          >
            {title}
          </p>
          {detail ? (
            <p
              className={`mt-0.5 text-[13px] leading-[1.45] ${
                selected ? "text-white/80" : "text-[var(--vb-ink-2)]"
              }`}
            >
              {detail}
            </p>
          ) : null}
        </div>
        {trailing ? (
          <div
            className={`shrink-0 text-[13px] ${
              selected ? "text-white/80" : "text-[var(--vb-ink-2)]"
            }`}
          >
            {trailing}
          </div>
        ) : null}
      </div>
    </li>
  );
}

/** Kwadratowa ikona systemowa w wierszu listy — nie kafel nad tytułem. */
export function RowIcon({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "blue" | "warn" | "onBlue";
}) {
  const tones = {
    neutral: "bg-[var(--vb-panel-sunken)] text-[var(--vb-ink-2)]",
    blue: "bg-[var(--vb-blue)] text-white",
    warn: "bg-[var(--vb-warn-tint)] text-[var(--vb-warn)]",
    onBlue: "bg-white/20 text-white",
  } as const;

  return (
    <span
      aria-hidden
      className={`flex h-6 w-6 items-center justify-center rounded-[var(--vb-r-sm)] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

// MARK: - Drobne elementy systemowe

/**
 * Przełącznik pokazujący stan systemu, nie kontrolka. Nie ma roli switch ani
 * focusu — czytnik ekranu dostaje sam stan jako tekst.
 */
export function StateSwitch({
  on,
  stateLabel,
}: {
  on: boolean;
  stateLabel: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="sr-only">{stateLabel}</span>
      <span
        aria-hidden
        className={`relative block h-[22px] w-[38px] rounded-full transition-colors ${
          on
            ? "bg-[var(--vb-blue)]"
            : "bg-[var(--vb-panel-sunken)] shadow-[inset_0_0_0_1px_var(--vb-line-strong)]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.28)] transition-[left] motion-reduce:transition-none ${
            on ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
    </span>
  );
}

/** Ścieżka klikania w systemie: „Ustawienia → Prywatność → …”. */
export function SystemPath({ steps }: { steps: string[] }) {
  return (
    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-[12px] text-[var(--vb-ink-2)]">
      {steps.map((step, index) => (
        <span key={step} className="flex items-center gap-1.5">
          {index > 0 ? (
            <ChevronRight
              aria-hidden
              className="h-3 w-3 text-[var(--vb-ink-3)]"
            />
          ) : null}
          <span className="rounded-[var(--vb-r-sm)] bg-[var(--vb-panel-sunken)] px-1.5 py-0.5 shadow-[inset_0_0_0_0.5px_var(--vb-line)]">
            {step}
          </span>
        </span>
      ))}
    </p>
  );
}

/** Nagłówek panelu w prawej kolumnie okna. Zawsze do lewej — jak w systemie. */
export function PaneHeading({
  id,
  title,
  lead,
}: {
  id: string;
  title: string;
  lead?: ReactNode;
}) {
  return (
    <div className="max-w-[62ch]">
      <h2
        id={id}
        className="vb-display text-[21px] font-semibold tracking-[-0.015em] text-[var(--vb-ink)]"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-1.5 text-[15px] leading-[1.5] text-[var(--vb-ink-2)]">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function Footnote({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={`text-[12px] leading-[1.55] text-[var(--vb-ink-3)] ${className}`}
    >
      {children}
    </p>
  );
}
