import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import WaveDivider from "./WaveDivider";

const ITEMS = [
  "Pretreatment",
  "Dyeing",
  "Printing",
  "Finishing",
  "Smart Chemical Solutions",
  "A Part of Legacy Group of Industries",
];

export default function Marquee() {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  const row = (key) => (
    <div className="flex shrink-0" key={key}>
      {ITEMS.map((t) => (
        <span
          key={t}
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink/40 px-6 whitespace-nowrap"
        >
          {t}
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta/50" />
        </span>
      ))}
    </div>
  );

  return (
    // Extra bottom padding reserves clear room for the wave so it sits
    // below the ticker text instead of covering it.
    <div className="relative overflow-hidden border-t border-ink/8 bg-cream-soft pt-4 pb-16 sm:pb-20">
      <div ref={trackRef} className="flex w-max">
        {row("a")}
        {row("b")}
      </div>
      <WaveDivider color="#17151f" />
    </div>
  );
}
