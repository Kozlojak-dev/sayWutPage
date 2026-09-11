"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        smoothWheel: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
