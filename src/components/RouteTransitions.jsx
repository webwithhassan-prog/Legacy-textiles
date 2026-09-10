import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";

// Resets scroll position on route change, fades <main> in, and lets
// ScrollTrigger recalculate pin/trigger positions once the new page's
// layout has settled.
export default function RouteTransitions() {
  const { pathname } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const main = document.querySelector("main");
    if (main) {
      if (isFirst.current) {
        isFirst.current = false;
      } else {
        // Opacity only — no transform. A `transform` on this ancestor (even
        // one that settles back to identity) would make it the containing
        // block for any `position: fixed` descendant, which breaks GSAP
        // ScrollTrigger's pinning further down the page (e.g. the flask
        // section scrolls away instead of staying pinned).
        gsap.fromTo(main, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power2.out", clearProps: "transform" });
      }
    }

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
