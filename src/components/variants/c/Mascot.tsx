"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/**
 * Maskotka SayWut — jedyny nieformalny element w tym układzie, dlatego stoi
 * bezpośrednio na hairline'owych regułach, jakby siadała na linii tekstu.
 *
 * Każda poza to osobny plik w public/saywut/*.png na identycznym płótnie
 * 213×263 z postacią wyrównaną do dolnej krawędzi, więc podmiana klatki nigdy
 * nie przesuwa postaci. Ruch wyłącznie w pionie (translateY / scaleY) —
 * przesunięcie w X psuje wrażenie stania na linii.
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

/** Podskok: przysiad → w powietrzu → ląduje. Zgrany z @keyframes vc-hop. */
const HOP_MS = 600;
const HOP_POSES: Pose[] = [
  { frame: "jump-crouch", atMs: 0 },
  { frame: "idle-3", atMs: 150 },
  { frame: "jump-land", atMs: 430 },
];

/** Obrót w miejscu: przysiad → profil → tył → profil lustrzany → idle. */
const TURN_MS = 420;
const TURN_POSES: Pose[] = [
  { frame: "jump-crouch", atMs: 0 },
  { frame: "spin-side", atMs: 80 },
  { frame: "spin-back", atMs: 150 },
  { frame: "spin-side", atMs: 220, flip: true },
  { frame: "idle-3", atMs: 300 },
];

const SHOUT_VISIBLE_MS = 1100;

type MascotProps = {
  /** Opis dla czytnika ekranu — same klatki nie niosą treści. */
  label: string;
  /** Rozmiar kadru w klasach Tailwinda; proporcja 213:263. */
  frameClass: string;
  /** Strona, na którą wychodzi dymek — dobierana do miejsca na siatce. */
  bubbleSide?: "left" | "right";
  hoverShouts?: readonly string[];
  clickShout?: string;
  /** Podskok przy pierwszym wejściu w kadr: maskotka wita sekcję. */
  greetOnView?: boolean;
  className?: string;
};

export default function Mascot({
  label,
  frameClass,
  bubbleSide = "right",
  hoverShouts = ["hey!", "hm?"],
  clickShout = "wut?!",
  greetOnView = false,
  className = "",
}: MascotProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"idle" | "hopping" | "turning">("idle");
  const [frame, setFrame] = useState<Frame>("idle-1");
  const [flipX, setFlipX] = useState(false);
  // Zmiana licznika przemontowuje animowany kontener, restartując animację CSS.
  const [poseId, setPoseId] = useState(0);
  // Treść dymka zostaje po schowaniu, żeby napis nie zmienił się w trakcie
  // zanikania. Licznik odświeża czas znikania nawet wtedy, gdy maskotka
  // krzyczy to samo dwa razy pod rząd.
  const [shout, setShout] = useState({ text: clickShout, id: 0, visible: false });
  const [hoverShoutIndex, setHoverShoutIndex] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

    // Krótka zwłoka zamiast natychmiastowego startu: po podskoku maskotka
    // zostaje na chwilę w pozie lądowania, zanim wróci do falowania.
    let timeoutId = window.setTimeout(tick, 140);

    return () => window.clearTimeout(timeoutId);
  }, [phase, reduceMotion]);

  // poseId jest w zależnościach celowo: restartuje sekwencję przy ponownym
  // wywołaniu tej samej pozy (np. drugi najazd pod rząd).
  useEffect(() => {
    if (phase === "idle") return;

    const poses = phase === "hopping" ? HOP_POSES : TURN_POSES;
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
        phase === "hopping" ? HOP_MS : TURN_MS,
      ),
    );

    return () => timeouts.forEach(window.clearTimeout);
  }, [phase, poseId]);

  useEffect(() => {
    if (!shout.visible) return;

    const timeoutId = window.setTimeout(
      () => setShout((current) => ({ ...current, visible: false })),
      SHOUT_VISIBLE_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [shout.id, shout.visible]);

  useEffect(() => {
    const node = buttonRef.current;
    if (!greetOnView || reduceMotion || !node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        // Powitanie jednorazowe: przy każdym przewinięciu byłoby nachalne.
        observer.disconnect();
        setPhase("hopping");
        setPoseId((id) => id + 1);
      },
      { threshold: 0.9 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [greetOnView, reduceMotion]);

  const shoutOut = (text: string) => {
    setShout((current) => ({ text, id: current.id + 1, visible: true }));
  };

  const handleHover = () => {
    if (phase !== "idle") return;
    shoutOut(hoverShouts[hoverShoutIndex % hoverShouts.length]);
    setHoverShoutIndex((index) => index + 1);
    if (reduceMotion) return;
    setPhase("hopping");
    setPoseId((id) => id + 1);
  };

  const handleClick = () => {
    shoutOut(clickShout);
    if (reduceMotion) return;
    setPhase("turning");
    setPoseId((id) => id + 1);
  };

  const poseClass =
    phase === "hopping" ? "vc-hop" : phase === "turning" ? "vc-turn" : "";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onMouseEnter={handleHover}
      onFocus={handleHover}
      aria-label={label}
      className={className}
    >
      <span className={`relative block ${frameClass}`}>
        <span
          aria-hidden
          className={`vc-mono pointer-events-none absolute -top-1 z-10 whitespace-nowrap border-2 border-[var(--vc-paper)] bg-[var(--vc-ink)] px-2 py-1 text-[11px] font-bold text-[var(--vc-paper)] transition duration-200 motion-reduce:transition-none ${
            bubbleSide === "right" ? "left-[64%]" : "right-[64%]"
          } ${shout.visible ? "-translate-y-2 opacity-100" : "opacity-0"}`}
        >
          {shout.text}
          <span
            className={`absolute -bottom-[7px] h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-[var(--vc-paper)] bg-[var(--vc-ink)] ${
              bubbleSide === "right" ? "left-3" : "right-3"
            }`}
          />
        </span>

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
                // Wszystkie pozy muszą być w pamięci przeglądarki przed
                // pierwszym podskokiem, inaczej klatka mignęłaby pusta.
                loading="eager"
                fetchPriority={name === "idle-1" ? "high" : "low"}
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
