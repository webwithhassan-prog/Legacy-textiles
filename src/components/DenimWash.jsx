import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import Reveal from "./Reveal";

const RAW = "#26344a";
const WASHED = "#9db7c9";

export default function DenimWash() {
  const sectionRef = useRef(null);
  const swatchRef = useRef(null);
  const streaksRef = useRef(null);
  const specksRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tint = { c: 0 };
      const streaks = streaksRef.current.querySelectorAll("path");
      const specks = specksRef.current.querySelectorAll("circle");

      streaks.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(specks, { autoAlpha: 0, scale: 0.4, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });

      tl.to(tint, {
        c: 1,
        duration: 1,
        onUpdate: () => swatchRef.current.setAttribute("fill", gsap.utils.interpolate(RAW, WASHED, tint.c)),
      }, 0);
      tl.to(streaks, { strokeDashoffset: 0, duration: 1, stagger: 0.08, ease: "power1.out" }, 0.05);
      tl.to(specks, { autoAlpha: 0.9, scale: 1, duration: 0.8, stagger: 0.05 }, 0.25);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-28 bg-ink overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 h-96 w-96 rounded-full bg-teal/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-teal text-xs font-bold uppercase tracking-[0.25em] mb-4">Finishing in action</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-cream mb-6 max-w-md">
            From raw indigo to biopolished finish
          </h2>
          <p className="text-cream/60 leading-relaxed max-w-md">
            Cellulase enzymes work the fibre surface as denim washes, softening
            hand-feel and lifting colour for that worn-in look — while our
            anti-back-staining agents keep the lightened indigo from redepositing
            onto the fabric. Scroll to watch the transformation.
          </p>
        </Reveal>

        <Reveal scale={0.94} className="flex justify-center">
          <svg viewBox="0 0 320 380" className="h-[380px] w-auto max-w-full" aria-hidden="true">
            <rect
              ref={swatchRef}
              x="30"
              y="20"
              width="260"
              height="340"
              rx="18"
              fill={RAW}
            />
            {/* twill weave texture */}
            <g stroke="#000" strokeOpacity="0.12" strokeWidth="2">
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={i} x1={30 + i * 22} y1="20" x2={30 + i * 22 - 60} y2="360" />
              ))}
            </g>
            {/* faded wash streaks, revealed on scroll */}
            <g ref={streaksRef} stroke="#f4ede0" strokeOpacity="0.5" strokeWidth="10" strokeLinecap="round" fill="none">
              <path d="M60 60 C 90 140, 70 220, 100 340" />
              <path d="M120 40 C 150 130, 130 240, 160 355" />
              <path d="M190 55 C 210 150, 195 250, 220 350" />
              <path d="M240 70 C 255 160, 245 260, 260 340" />
            </g>
            {/* seam stitching */}
            <path d="M30 190 H290" stroke="#f4ede0" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 6" />
            {/* enzyme specks working the surface */}
            <g ref={specksRef} fill="#0f8f86">
              <circle cx="90" cy="110" r="4" />
              <circle cx="150" cy="90" r="3" />
              <circle cx="200" cy="130" r="4.5" />
              <circle cx="110" cy="230" r="3.5" />
              <circle cx="180" cy="260" r="4" />
              <circle cx="230" cy="220" r="3" />
              <circle cx="70" cy="300" r="4" />
              <circle cx="250" cy="300" r="3.5" />
            </g>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
