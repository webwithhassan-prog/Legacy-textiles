import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const DULL = "#5c7480";
const ABSORBENT = "#bcd4dc";

export default function WettingRipple({ className = "" }) {
  const wrapRef = useRef(null);
  const fabricRef = useRef(null);
  const ringsRef = useRef(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tint = { c: 0 };
      const rings = ringsRef.current.querySelectorAll("circle");
      gsap.set(rings, { autoAlpha: 0, scale: 0.3, transformOrigin: "center" });

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%" } });
      tl.to(rings, { autoAlpha: 0.7, scale: 1, duration: 0.6, stagger: 0.15, ease: "power1.out" })
        .to(rings, { autoAlpha: 0, duration: 0.4 }, "-=0.1")
        .to(tint, {
          c: 1,
          duration: 0.6,
          onUpdate: () => fabricRef.current.setAttribute("fill", gsap.utils.interpolate(DULL, ABSORBENT, tint.c)),
        }, "-=0.5");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <svg viewBox="0 0 280 90" className="w-full h-auto" aria-hidden="true">
        <rect ref={fabricRef} x="10" y="20" width="260" height="55" rx="8" fill={DULL} />
        <g stroke="#000" strokeOpacity="0.1" strokeWidth="1.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={20 + i * 26} y1="20" x2={20 + i * 26} y2="75" />
          ))}
        </g>
        <g ref={ringsRef} fill="none" stroke="#f7f3ec" strokeWidth="2">
          <circle cx="140" cy="47" r="10" />
          <circle cx="140" cy="47" r="18" />
          <circle cx="140" cy="47" r="26" />
        </g>
        <circle cx="140" cy="8" r="4" fill="#7fa9b8" />
      </svg>
    </div>
  );
}
