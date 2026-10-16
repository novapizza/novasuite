import { useEffect, useState } from "react";

// Mirrors window.scrollY into the --nv-sy CSS variable (capped at 1400) so
// parallax layers can move in CSS without re-rendering React on every frame.
// Returns whether the page has scrolled past `threshold`; that is the only
// scroll-driven value that re-renders.
export function useScrollVar(threshold: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let raf = 0;
    const root = document.documentElement;
    const update = () => {
      raf = 0;
      const y = window.scrollY || 0;
      root.style.setProperty("--nv-sy", String(Math.min(Math.round(y), 1400)));
      setPast(y > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return past;
}

let scrollRaf = 0;

function stopScroll() {
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
  scrollRaf = 0;
}

// Eased scroll to an element, leaving room for the sticky header. Any wheel or
// touch input from the user takes over mid-flight.
export function scrollToId(id: string, offset = 64) {
  const el = document.getElementById(id);
  if (!el) return;
  const from = window.scrollY || 0;
  const to = Math.max(0, el.getBoundingClientRect().top + from - offset);
  stopScroll();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || Math.abs(to - from) < 2) {
    window.scrollTo(0, to);
    return;
  }
  const duration = Math.min(1100, 520 + Math.abs(to - from) * 0.35);
  const start = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const cancel = () => {
    stopScroll();
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, from + (to - from) * ease(t));
    if (t < 1) scrollRaf = requestAnimationFrame(step);
    else cancel();
  };
  scrollRaf = requestAnimationFrame(step);
}
