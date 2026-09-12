"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // Serwer nie zna preferencji — zakładamy brak ograniczenia i korygujemy
    // po hydracji.
    () => false,
  );
}
