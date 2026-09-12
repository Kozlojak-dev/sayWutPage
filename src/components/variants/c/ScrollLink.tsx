"use client";

import { useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { SCROLL_OFFSET } from "./content";

/** Kotwica prowadzona przez Lenis — natywny skok pominąłby smooth scroll. */
export default function ScrollLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const lenis = useLenis();

  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        lenis?.scrollTo(href, { offset: SCROLL_OFFSET });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
