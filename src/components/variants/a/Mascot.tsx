"use client";

import Image from "next/image";
import { useEffect, useImperativeHandle, useState, type Ref } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Bohater SayWut — jeden komponent obsługujący wszystkie cztery miejsca,
 * w których pojawia się na stronie. Logika sekwencji klatek pochodzi
 * z AppPreview.tsx i została rozszerzona o dwie rzeczy:
 *
 *   1. uchwyt `react()` — reakcja wyzwalana z zewnątrz zdarzeniem
 *      (np. skopiowaniem komendy), a nie tylko najazdem myszy,
 *   2. tryb bez interakcji — bohater tylko oddycha i mruga, nie jest
 *      przyciskiem i ładuje wyłącznie klatki idle zamiast wszystkich ośmiu.
 *
 * Każda klatka to płótno 213×263 z postacią wyrównaną do dolnej krawędzi,
 * więc podmiana klatki nigdy nie przesuwa bohatera. Ruch idzie wyłącznie
 * w osi Y (translateY/scaleY w keyframes va-jump / va-spin).
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

const IDLE_FRAMES: readonly Frame[] = ["idle-1", "idle-2", "idle-3", "idle-blink"];

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

/** Podskok: przysiad → w powietrzu → ląduje. Zgrany z @keyframes va-jump. */
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

/** Najazd: na przemian pozdrowienie i namysł. Klik zawsze „wut?!”. */
const HOVER_SHOUTS = ["hey!", "hm?"] as const;
const CLICK_SHOUT = "wut?!";
const SHOUT_VISIBLE_MS = 1400;

export type MascotAct = "jump" | "spin";

export type MascotHandle = {
  /** Wywołanie z zewnątrz: bohater wykonuje pozę i ewentualnie coś krzyczy. */
  react: (act: MascotAct, text?: string) => void;
};

interface MascotProps {
  /** Klasy rozmiaru ramki — proporcje pilnuje object-contain. */
  className?: string;
  /** Bohater reaguje na najazd i kliknięcie, czyli jest przyciskiem. */
  interactive?: boolean;
  /** Strona, po której wyskakuje dymek. */
  bubbleSide?: "left" | "right";
  /** Etykieta przycisku dla czytnika ekranu (tylko przy interactive). */
  label?: string;
  /** Uchwyt do wyzwalania reakcji przez rodzica. */
  ref?: Ref<MascotHandle>;
}

export default function Mascot({
  className = "h-24 w-20",
  interactive = false,
  bubbleSide = "left",
  label = "Bohater SayWut — najedź, aby podskoczył, kliknij, aby się obrócił",
  ref,
}: MascotProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"idle" | "jumping" | "spinning">("idle");
  const [frame, setFrame] = useState<Frame>("idle-1");
  const [flipX, setFlipX] = useState(false);
  // Zmiana licznika przemontowuje animowany kontener, restartując animację CSS.
  const [poseId, setPoseId] = useState(0);
  // Treść dymka zostaje po schowaniu, żeby napis nie zmienił się w trakcie
  // zanikania. Licznik odświeża czas znikania nawet wtedy, gdy bohater
  // krzyczy to samo dwa razy pod rząd.
  const [shout, setShout] = useState({
    text: CLICK_SHOUT,
    id: 0,
    visible: false,
  });
  const [hoverShoutIndex, setHoverShoutIndex] = useState(0);

  const usesPoses = interactive || ref != null;
  const renderedFrames = usesPoses ? FRAMES : IDLE_FRAMES;

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

    // Krótka zwłoka zamiast natychmiastowego startu: po podskoku bohater
    // zostaje na chwilę w pozie lądowania, zanim wróci do falowania.
    let timeoutId = window.setTimeout(tick, 140);

    return () => window.clearTimeout(timeoutId);
  }, [phase, reduceMotion]);

  // poseId jest w zależnościach celowo: restartuje sekwencję przy ponownym
  // wywołaniu tej samej pozy (np. drugi najazd pod rząd).
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
      SHOUT_VISIBLE_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [shout.id, shout.visible]);

  // Reakcja na sygnał z zewnątrz jest zdarzeniem, nie synchronizacją stanu —
  // dlatego uchwyt imperatywny, a nie efekt nasłuchujący zmiany propsa.
  useImperativeHandle(
    ref,
    () => ({
      react: (act, text) => {
        if (text) {
          setShout((current) => ({
            text,
            id: current.id + 1,
            visible: true,
          }));
        }
        if (reduceMotion) return;
        setPhase(act === "spin" ? "spinning" : "jumping");
        setPoseId((id) => id + 1);
      },
    }),
    [reduceMotion],
  );

  const shoutOut = (text: string) => {
    setShout((current) => ({ text, id: current.id + 1, visible: true }));
  };

  const handleHover = () => {
    if (phase !== "idle") return;
    shoutOut(HOVER_SHOUTS[hoverShoutIndex % HOVER_SHOUTS.length]);
    setHoverShoutIndex((index) => index + 1);
    if (reduceMotion) return;
    setPhase("jumping");
    setPoseId((id) => id + 1);
  };

  const handleClick = () => {
    shoutOut(CLICK_SHOUT);
    if (reduceMotion) return;
    setPhase("spinning");
    setPoseId((id) => id + 1);
  };

  const poseClass =
    phase === "jumping" ? "va-jump" : phase === "spinning" ? "va-spin" : "";

  const sprite = (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-1 z-10 whitespace-nowrap rounded-[var(--va-r)] bg-[var(--va-ink)] px-2 py-1 text-[11px] font-bold text-[#0b0b0f] transition duration-200 va-mono ${
          bubbleSide === "left" ? "right-[68%]" : "left-[68%]"
        } ${shout.visible ? "-translate-y-2 scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        {shout.text}
        <span
          className={`absolute -bottom-1 h-2 w-2 rotate-45 bg-[var(--va-ink)] ${
            bubbleSide === "left" ? "right-3" : "left-3"
          }`}
        />
      </span>

      <div
        key={poseId}
        style={{ transformOrigin: "bottom center" }}
        className={`absolute inset-0 ${poseClass}`}
      >
        <div className={`relative h-full w-full ${flipX ? "-scale-x-100" : ""}`}>
          {renderedFrames.map((name) => (
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
        </div>
      </div>
    </>
  );

  if (!interactive) {
    return (
      <div aria-hidden className={`relative ${className}`}>
        {sprite}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleHover}
      onFocus={handleHover}
      aria-label={label}
      className={`relative rounded-[var(--va-r)] ${className}`}
    >
      {sprite}
    </button>
  );
}
