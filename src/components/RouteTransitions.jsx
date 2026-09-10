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

    // Immediate reset avoids a visible flash of the old page's scroll
    // position before the next frame runs.
    window.scrollTo(0, 0);

    // refresh() has to stay deferred to the next frame — calling it
    // synchronously here can run before other components (e.g. the flask's
    // pinned ScrollTrigger) have set themselves up on first mount. But
    // refresh() itself recalculates pin geometry for any trigger left
    // behind by the page we just navigated away from, and was *itself*
    // moving the scroll position — so scrollTo(0,0) has to run again AFTER
    // it, in the same frame, not before. The try/catch is a safety net for
    // a GSAP-internal null-ref that only reproduces under React StrictMode's
    // dev-only double-mount (production builds don't double-invoke effects).
    const id = requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // see comment above — safe to ignore, scrollTo(0,0) below still runs
      }
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
