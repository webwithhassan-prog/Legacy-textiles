import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function PatternStamp({ className = "" }) {
  const wrapRef = useRef(null);
  const maskRectRef = useRef(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(maskRectRef.current, { attr: { width: 0 } });
      gsap.to(maskRectRef.current, {
        attr: { width: 260 },
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <svg viewBox="0 0 280 90" className="w-full h-auto" aria-hidden="true">
        <rect x="10" y="20" width="260" height="55" rx="8" fill="#f4ede0" />
        <clipPath id="stamp-reveal">
          <rect ref={maskRectRef} x="10" y="20" height="55" width="0" />
        </clipPath>
        <g clipPath="url(#stamp-reveal)">
          {Array.from({ length: 6 }).map((_, col) =>
            Array.from({ length: 3 }).map((_, row) => (
              <rect
                key={`${col}-${row}`}
                x={26 + col * 40}
                y={32 + row * 16}
                width="10"
                height="10"
                rx="2"
                transform={`rotate(45 ${31 + col * 40} ${37 + row * 16})`}
                fill="#c22a63"
                fillOpacity="0.75"
              />
            ))
          )}
        </g>
      </svg>
    </div>
  );
}
