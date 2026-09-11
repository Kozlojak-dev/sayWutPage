"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Scena z pixel-artowym bohaterem SayWut. Świadomie NIE udaje interfejsu
 * aplikacji i niczego nie demonstruje — to maskotka, a nie zrzut ekranu.
 * Prawdziwe materiały z aplikacji trafią tu, gdy będą gotowe.
 *
 * Każda poza to osobny plik w public/saywut/*.png, przycięty na identyczne
 * płótno 213×263 z postacią wyrównaną do dolnej krawędzi — dzięki temu
 * podmiana klatki nigdy nie przesuwa bohatera. Ruch odbywa się wyłącznie
 * w pionie (translateY/scaleY), nigdy w osi X.
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

/** Podskok: przysiad → w powietrzu → ląduje. Zgrany z @keyframes sw-jump. */
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

const JUMP_SHOUT = "hop!";
const SPIN_SHOUT = "wut?!";
const SHOUT_VISIBLE_MS = 1100;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

export default function AppPreview() {
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
    text: SPIN_SHOUT,
    id: 0,
    visible: false,
  });

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

  const shoutOut = (text: string) => {
    setShout((current) => ({ text, id: current.id + 1, visible: true }));
  };

  const handleHover = () => {
    if (phase !== "idle") return;
    shoutOut(JUMP_SHOUT);
    if (reduceMotion) return;
    setPhase("jumping");
    setPoseId((id) => id + 1);
  };

  const handleClick = () => {
    shoutOut(SPIN_SHOUT);
    if (reduceMotion) return;
    setPhase("spinning");
    setPoseId((id) => id + 1);
  };

  const poseClass =
    phase === "jumping" ? "sw-jump" : phase === "spinning" ? "sw-spin" : "";

  return (
    <figure className="mx-auto w-full max-w-xl">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-zinc-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_75%,rgba(255,255,255,0.9)_0%,transparent_100%)]"
        />

        <div className="relative flex items-end justify-center px-6 py-10 sm:py-12">
          <button
            type="button"
            onClick={handleClick}
            onMouseEnter={handleHover}
            onFocus={handleHover}
            aria-label="Bohater SayWut — najedź, aby podskoczył, kliknij, aby się obrócił"
            className="relative rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-50"
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-2 left-[68%] z-10 whitespace-nowrap rounded-lg border-2 border-zinc-900 bg-white px-2.5 py-1 font-mono text-xs font-bold text-zinc-900 shadow-[3px_3px_0_0_rgba(24,24,27,0.15)] transition duration-200 motion-reduce:transition-none ${
                shout.visible
                  ? "-translate-y-2 scale-100 opacity-100"
                  : "scale-90 opacity-0"
              }`}
            >
              {shout.text}
              <span className="absolute -bottom-[7px] left-3 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-zinc-900 bg-white" />
            </span>

            <div className="relative h-[190px] w-[154px] sm:h-[263px] sm:w-[213px]">
              <span
                aria-hidden
                className="absolute bottom-0.5 left-1/2 h-3 w-[52%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-[3px]"
              />

              <div
                key={poseId}
                style={{ transformOrigin: "bottom center" }}
                className={`absolute inset-0 ${poseClass}`}
              >
                <div
                  className={`relative h-full w-full ${flipX ? "-scale-x-100" : ""}`}
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
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs text-zinc-500">
        Najedź na bohatera albo go kliknij. Zrzuty ekranu aplikacji pojawią się
        tutaj wkrótce.
      </figcaption>
    </figure>
  );
}
