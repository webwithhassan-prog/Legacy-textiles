import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const UNDYED = "#c9c4ba";
const DYED = "#0f8f86";

export default function DyeUptake({ className = "" }) {
  const wrapRef = useRef(null);
  const fabricRef = useRef(null);
  const dropsRef = useRef(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tint = { c: 0 };
      const drops = dropsRef.current.querySelectorAll("circle");
      gsap.set(drops, { autoAlpha: 0, y: -14 });

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%" } });
      tl.to(drops, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power1.in" })
        .to(drops, { autoAlpha: 0, duration: 0.3 }, "-=0.1")
        .to(tint, {
          c: 1,
          duration: 0.7,
          onUpdate: () => fabricRef.current.setAttribute("fill", gsap.utils.interpolate(UNDYED, DYED, tint.c)),
        }, "-=0.6");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <svg viewBox="0 0 280 90" className="w-full h-auto" aria-hidden="true">
        <rect ref={fabricRef} x="10" y="20" width="260" height="55" rx="8" fill={UNDYED} />
        <g ref={dropsRef} fill="#0f8f86">
          <circle cx="60" cy="10" r="4" />
          <circle cx="120" cy="6" r="3.5" />
          <circle cx="180" cy="10" r="4" />
          <circle cx="230" cy="7" r="3.5" />
        </g>
      </svg>
    </div>
  );
}
