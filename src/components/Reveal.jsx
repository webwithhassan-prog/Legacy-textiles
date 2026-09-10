import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Fades/slides its children up into place once they scroll into view.
 * `as` lets the wrapper render as a semantic element; `delay`/`y`/`scale` tweak the motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 40,
  scale,
  stagger,
  once = true,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stagger ? el.children : el;

    const ctx = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, y, ...(scale ? { scale } : {}) });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        ...(scale ? { scale: 1 } : {}),
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger || 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, scale, stagger, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
