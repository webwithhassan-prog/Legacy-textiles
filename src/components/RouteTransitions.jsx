import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";

// Resets scroll position on route change, fades <main> in, and lets
// ScrollTrigger recalculate pin/trigger positions once the new page's
// layout has settled.
export default function RouteTransitions() {
  const { pathname, hash } = useLocation();
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

    // `behavior: "instant"` matters here, not just `scrollTo(0, 0)` — the
    // site has `scroll-behavior: smooth` globally, so a plain scrollTo
    // doesn't jump, it *animates* there over a few hundred ms. With two
    // resets in play (this one, and the one after refresh() below) plus
    // whatever refresh() itself does internally, those overlapping smooth
    // animations could interrupt each other and settle at a random
    // in-between scroll position instead of 0. Forcing "instant" makes each
    // reset atomic, so there's nothing for a later call to interrupt.
    // A hash (e.g. from the Services mega-menu linking to /services#dyeing)
    // scrolls to that section instead of the top — scrollIntoView respects
    // the section's own scroll-margin-top, so it lands clear of the navbar.
    const scrollToTarget = () => {
      const el = hash && document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    };

    scrollToTarget();

    // refresh() has to stay deferred to the next frame — calling it
    // synchronously here can run before other components (e.g. the flask's
    // pinned ScrollTrigger) have set themselves up on first mount. But
    // refresh() itself recalculates pin geometry for any trigger left
    // behind by the page we just navigated away from, and was *itself*
    // moving the scroll position — so scrollToTarget has to run again AFTER
    // it, in the same frame, not before. The try/catch is a safety net for a
    // GSAP-internal null-ref that only reproduces under React StrictMode's
    // dev-only double-mount (production builds don't double-invoke effects).
    const id = requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // see comment above — safe to ignore, scrollToTarget() below still runs
      }
      scrollToTarget();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
