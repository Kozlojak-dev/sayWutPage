"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Hero: nagranie z prawdziwej sesji SayWut plus pixel-artowy bohater przy
 * krawędzi kafla. Świadomie NIE ma tu dorysowanego interfejsu aplikacji —
 * to zapis ekranu (fragment 0:26–0:40 oryginalnego nagrania), a nie makieta.
 *
 * Bohater: każda poza to osobny plik w public/saywut/*.png, przycięty na
 * identyczne płótno 213×263 z postacią wyrównaną do dolnej krawędzi — dzięki
 * temu podmiana klatki nigdy nie przesuwa postaci. Ruch odbywa się wyłącznie
 * w pionie (translateY/scaleY), nigdy w osi X.
 */

// MARK: - Nagranie

const VIDEO_POSTER = "/demo/hero-poster.jpg";
/** Wymiary źródła — przeglądarka musi znać proporcje, zanim pobierze plik. */
const VIDEO_WIDTH = 1440;
const VIDEO_HEIGHT = 766;
const VIDEO_DESCRIPTION =
  "SayWut w działaniu: angielskie napisy w zaznaczonej strefie ekranu i ich " +
  "polskie tłumaczenie w panelu nakładki.";

// MARK: - Bohater

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

/** Najazd: na przemian pozdrowienie i namysł. Klik zawsze „wut?!”. */
const HOVER_SHOUTS = ["hey!", "hm?"] as const;
const CLICK_SHOUT = "wut?!";
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
    text: CLICK_SHOUT,
    id: 0,
    visible: false,
  });
  const [hoverShoutIndex, setHoverShoutIndex] = useState(0);

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
    phase === "jumping" ? "sw-jump" : phase === "spinning" ? "sw-spin" : "";

  return (
    <figure className="mx-auto w-full max-w-5xl">
      {/* Dolny padding robi miejsce na bohatera wychodzącego poza kadr. */}
      <div className="relative pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-zinc-950 shadow-sm">
          {reduceMotion ? (
            // Zapętlone wideo startujące samo z siebie to dokładnie ten rodzaj
            // ruchu, którego dotyczy ta preferencja — zostaje sama klatka
            // z gotowym tłumaczeniem.
            <Image
              src={VIDEO_POSTER}
              alt={VIDEO_DESCRIPTION}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              unoptimized
              className="h-auto w-full"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              // `metadata` zamiast `auto`: kafel ma się pokazać od razu, a nie
              // czekać na pobranie całych 2,6 MB.
              preload="metadata"
              poster={VIDEO_POSTER}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              aria-label={VIDEO_DESCRIPTION}
              className="h-auto w-full"
            >
              {/* WebM (1,78 MB) przed MP4 (2,60 MB) — przeglądarka bierze
                  pierwszy obsługiwany format. */}
              <source src="/demo/hero.webm" type="video/webm" />
              <source src="/demo/hero.mp4" type="video/mp4" />
            </video>
          )}

          {/* Etykiety dublują to, co widać na nagraniu — dla czytnika ekranu
              niosłyby tylko szum, treść jest w podpisie pod kafelkiem.
              Pozycje w procentach kadru wyliczone z klatek nagrania: panel
              nakładki zajmuje górne ~19% wysokości, ramka OCR leży
              między 82% i 97%. */}
          <div aria-hidden className="hidden sm:block">
            <div className="absolute left-[3%] top-[20%] flex flex-col items-start">
              <span className="ml-3 h-4 w-px bg-white/50" />
              <span className="mt-1 rounded-full border border-white/15 bg-zinc-950/75 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                Tłumaczenie na żywo
              </span>
            </div>

            <div className="absolute bottom-[19%] left-[14%] flex flex-col items-start">
              <span className="rounded-full border border-cyan-300/25 bg-zinc-950/75 px-2.5 py-1 text-[11px] font-medium text-cyan-200 backdrop-blur-sm">
                Odczytywana strefa ekranu
              </span>
              <span className="ml-3 h-4 w-px bg-cyan-300/50" />
            </div>
          </div>
        </div>

        {/* Prawa krawędź, nie lewa: ramka OCR sięga do 86% szerokości kadru,
            a panel z tłumaczeniem stoi w lewym górnym rogu — tutaj bohater
            nie zasłania żadnego z nich. */}
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={handleHover}
          onFocus={handleHover}
          aria-label="Bohater SayWut — najedź, aby podskoczył, kliknij, aby się obrócił"
          className="absolute bottom-0 right-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:right-8"
        >
          <span
            aria-hidden
            className={`pointer-events-none absolute -top-2 right-[62%] z-10 whitespace-nowrap rounded-lg border-2 border-zinc-900 bg-white px-2.5 py-1 font-mono text-xs font-bold text-zinc-900 shadow-[3px_3px_0_0_rgba(24,24,27,0.15)] transition duration-200 motion-reduce:transition-none ${
              shout.visible
                ? "-translate-y-2 scale-100 opacity-100"
                : "scale-90 opacity-0"
            }`}
          >
            {shout.text}
            <span className="absolute -bottom-[7px] right-3 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-zinc-900 bg-white" />
          </span>

          <div className="relative h-[94px] w-[76px] sm:h-[128px] sm:w-[104px]">
            <span
              aria-hidden
              className="absolute bottom-0.5 left-1/2 h-2 w-[48%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-[2px]"
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

      <figcaption className="text-center text-xs text-zinc-500">
        Nagranie z aplikacji: angielskie napisy w zaznaczonej strefie, polskie
        tłumaczenie w panelu obok. Silnik DeepL.
      </figcaption>
    </figure>
  );
}
