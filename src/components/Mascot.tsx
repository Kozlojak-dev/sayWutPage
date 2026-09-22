"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

/**
 * Bohater SayWut w dwóch miejscach: jako ikona dodatkowa w pasku menu
 * i obok nagłówka w hero. Każda poza to osobny plik w public/saywut/*.png
 * na identycznym płótnie 213×263 z postacią wyrównaną do dolnej krawędzi,
 * więc podmiana klatki nigdy nie przesuwa postaci. Ruch wyłącznie w osi Y.
 */

const FRAMES = [
  "idle-1",
  "idle-2",
  "idle-3",
  "idle-blink",
  "jump-crouch",
  "jump-land",
  "spin-side",
  "spin-back",
] as const;

type Frame = (typeof FRAMES)[number];

const FRAME_WIDTH = 213;
const FRAME_HEIGHT = 263;

/** Pętla bezczynności: falowanie ręką w tę i z powrotem plus mrugnięcie. */
const IDLE_SEQUENCE: { frame: Frame; duration: number }[] = [
  { frame: "idle-1", duration: 640 },
  { frame: "idle-2", duration: 440 },
  { frame: "idle-3", duration: 760 },
  { frame: "idle-1", duration: 360 },
  { frame: "idle-blink", duration: 280 },
];

type Pose = { frame: Frame; atMs: number; flip?: boolean };

/** Podskok: przysiad → w powietrzu → ląduje. Zgrany z @keyframes vb-jump. */
const JUMP_MS = 600;
const JUMP_POSES: Pose[] = [
  { frame: "jump-crouch", atMs: 0 },
  { frame: "idle-3", atMs: 150 },
  { frame: "jump-land", atMs: 430 },
];

/** Obrót w miejscu: przysiad → profil → tył → profil lustrzany → idle. */
const SPIN_MS = 420;
const SPIN_POSES: Pose[] = [
  { frame: "jump-crouch", atMs: 0 },
  { frame: "spin-side", atMs: 80 },
  { frame: "spin-back", atMs: 150 },
  { frame: "spin-side", atMs: 220, flip: true },
  { frame: "idle-3", atMs: 300 },
];

const BUBBLE_VISIBLE_MS = 1100;

export default function Mascot({
  label,
  className,
  bubble = "above",
  bubbleSize = "menu",
  bubbleClassName = "",
  hoverShouts = ["hey!", "hm?"],
  clickShout = "wut?!",
  shadow = false,
  eager = false,
}: {
  /** Opis dla czytnika ekranu — bohater jest interaktywny, więc ma nazwę. */
  label: string;
  /** Rozmiar boksu; proporcje klatki to 213×263. */
  className: string;
  bubble?: "above" | "below" | "none";
  /** menu: etykieta Docka przy ikonie 22 px. hero: podpowiedź przy postaci 260 px. */
  bubbleSize?: "menu" | "hero";
  bubbleClassName?: string;
  hoverShouts?: readonly string[];
  clickShout?: string;
  shadow?: boolean;
  eager?: boolean;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"idle" | "jumping" | "spinning">("idle");
  const [frame, setFrame] = useState<Frame>("idle-1");
  const [flipX, setFlipX] = useState(false);
  // Zmiana licznika przemontowuje animowany kontener, restartując animację CSS.
  const [poseId, setPoseId] = useState(0);
  const [shout, setShout] = useState({ text: clickShout, id: 0, visible: false });
  const [hoverIndex, setHoverIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || phase !== "idle") return;

    let index = 0;

    const tick = () => {
      const step = IDLE_SEQUENCE[index % IDLE_SEQUENCE.length];
      setFrame(step.frame);
      setFlipX(false);
      index += 1;
      timeoutId = window.setTimeout(tick, step.duration);
    };

    // Krótka zwłoka: po podskoku bohater zostaje na chwilę w pozie lądowania.
    let timeoutId = window.setTimeout(tick, 140);

    return () => window.clearTimeout(timeoutId);
  }, [phase, reduceMotion]);

  // poseId w zależnościach celowo: restartuje sekwencję przy powtórzeniu pozy.
  useEffect(() => {
    if (phase === "idle") return;

    const poses = phase === "jumping" ? JUMP_POSES : SPIN_POSES;
    const timeouts = poses.map(({ frame: pose, atMs, flip }) =>
      window.setTimeout(() => {
        setFrame(pose);
        setFlipX(Boolean(flip));
      }, atMs),
    );

    timeouts.push(
      window.setTimeout(
        () => {
          setFlipX(false);
          setPhase("idle");
        },
        phase === "jumping" ? JUMP_MS : SPIN_MS,
      ),
    );

    return () => timeouts.forEach(window.clearTimeout);
  }, [phase, poseId]);

  useEffect(() => {
    if (!shout.visible) return;

    const timeoutId = window.setTimeout(
      () => setShout((current) => ({ ...current, visible: false })),
      BUBBLE_VISIBLE_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [shout.id, shout.visible]);

  const shoutOut = (text: string) => {
    setShout((current) => ({ text, id: current.id + 1, visible: true }));
  };

  const handleHover = () => {
    if (phase !== "idle") return;
    shoutOut(hoverShouts[hoverIndex % hoverShouts.length]);
    setHoverIndex((index) => index + 1);
    if (reduceMotion) return;
    setPhase("jumping");
    setPoseId((id) => id + 1);
  };

  const handleClick = () => {
    shoutOut(clickShout);
    if (reduceMotion) return;
    setPhase("spinning");
    setPoseId((id) => id + 1);
  };

  const poseClass =
    phase === "jumping" ? "vb-jump" : phase === "spinning" ? "vb-spin" : "";

  const heroBubble = bubbleSize === "hero";
  const hideShift = bubble === "above" ? "translate-y-1" : "-translate-y-1";

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleHover}
      onFocus={handleHover}
      aria-label={label}
      className="relative block rounded-[var(--vb-r-sm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vb-blue)]"
    >
      {bubble === "none" ? null : (
        // Dymek udaje podpowiedź systemową (jak tooltip w Docku), a nie
        // komiksową chmurkę — to ten sam język wizualny co reszta strony.
        // Hero dostaje większy panel wycentrowany nad głową; MenuBar
        // zostaje przy 11 px i kotwiczy się przez bubbleClassName.
        <span
          aria-hidden
          className={`pointer-events-none absolute z-20 whitespace-nowrap bg-[var(--vb-panel)] font-medium text-[var(--vb-ink)] transition duration-200 motion-reduce:transition-none ${
            heroBubble
              ? "left-1/2 mb-2 rounded-[var(--vb-r)] px-3 py-1.5 text-[14px] shadow-[0_0_0_0.5px_var(--vb-line-strong),0_1px_2px_rgba(0,0,0,0.06),0_10px_24px_-10px_rgba(0,0,0,0.24)]"
              : "rounded-[var(--vb-r-sm)] px-2 py-1 text-[11px] shadow-[0_0_0_0.5px_var(--vb-line-strong),0_6px_16px_-8px_rgba(0,0,0,0.45)]"
          } ${
            bubble === "above" ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } ${bubbleClassName} ${
            shout.visible
              ? `${heroBubble ? "-translate-x-1/2 " : ""}translate-y-0 scale-100 opacity-100`
              : `${heroBubble ? "-translate-x-1/2 " : ""}${hideShift} scale-95 opacity-0`
          }`}
        >
          <span className="vb-mono">{shout.text}</span>
          {heroBubble && bubble === "above" ? (
            <span
              aria-hidden
              className="absolute top-full left-1/2 h-1.5 w-3 -translate-x-1/2 overflow-hidden"
            >
              <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-[45%] rotate-45 bg-[var(--vb-panel)] shadow-[0_0_0_0.5px_var(--vb-line-strong)]" />
            </span>
          ) : null}
        </span>
      )}

      <span className={`relative block ${className}`}>
        {shadow ? (
          <span
            aria-hidden
            className="absolute bottom-0.5 left-1/2 h-1.5 w-[46%] -translate-x-1/2 rounded-full bg-black/12 blur-[2px]"
          />
        ) : null}

        <span
          key={poseId}
          style={{ transformOrigin: "bottom center" }}
          className={`absolute inset-0 block ${poseClass}`}
        >
          <span
            className={`relative block h-full w-full ${flipX ? "-scale-x-100" : ""}`}
          >
            {FRAMES.map((name) => (
              <Image
                key={name}
                src={`/saywut/${name}.png`}
                alt=""
                aria-hidden
                width={FRAME_WIDTH}
                height={FRAME_HEIGHT}
                unoptimized
                draggable={false}
                // Wszystkie pozy muszą być w pamięci przed pierwszym
                // podskokiem, inaczej klatka mignęłaby pusta.
                loading="eager"
                fetchPriority={eager && name === "idle-1" ? "high" : "low"}
                className={`absolute inset-0 h-full w-full select-none object-contain object-bottom [image-rendering:pixelated] ${
                  frame === name ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </span>
        </span>
      </span>
    </button>
  );
}
