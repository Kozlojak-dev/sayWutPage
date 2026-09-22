/** Odstęp pod sticky pasek menu (h-10) plus mały luz. */
export const HEADER_SCROLL_OFFSET = -72;

type ScrollClient = {
  scrollTo: (target: number) => void;
} | undefined;

/** Skok do kotwicy po pozycji w dokumencie — nie po selektorze Lenisa.
 *  Przy `smoothWheel: false` wewnętrzna pozycja Lenisa potrafi rozjechać
 *  się z `window.scrollY`, wtedy `scrollTo("#id")` raz jedzie, raz stoi. */
export function scrollToId(
  lenis: ScrollClient,
  href: string,
  offset = HEADER_SCROLL_OFFSET,
) {
  const id = href.startsWith("#") ? href.slice(1) : href;
  const section = document.getElementById(id);
  if (!section) return;

  const top = section.getBoundingClientRect().top + window.scrollY + offset;

  if (lenis) {
    lenis.scrollTo(top);
    return;
  }

  window.scrollTo({ top, behavior: "smooth" });
}
