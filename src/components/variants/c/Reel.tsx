"use client";

import Image from "next/image";
import { VIDEO } from "./content";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/**
 * Centerpiece: nagranie na pełną szerokość atramentu, bez 100vw i bez
 * ujemnych marginesów. Podpis siedzi w siatce, zaraz pod hairline'em Hero.
 */
export default function Reel() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section aria-labelledby="nagranie-podpis">
      <figure>
        <div className="vc-container">
          <figcaption id="nagranie-podpis" className="pt-5 pb-8 sm:pt-6 sm:pb-10">
            <p className="vc-label">Nagranie · sesja na żywo</p>
            <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-[1.65] text-[var(--vc-paper-dim)]">
              {VIDEO.description}
            </p>
          </figcaption>
        </div>

        <div className="vc-reel">
          <div className="vc-reel-frame">
            {reduceMotion ? (
              <Image
                src={VIDEO.poster}
                alt={VIDEO.description}
                width={VIDEO.width}
                height={VIDEO.height}
                unoptimized
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={VIDEO.poster}
                width={VIDEO.width}
                height={VIDEO.height}
                aria-label={VIDEO.description}
                className="absolute inset-0 h-full w-full object-cover object-center"
              >
                <source src={VIDEO.webm} type="video/webm" />
                <source src={VIDEO.mp4} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </figure>
    </section>
  );
}
