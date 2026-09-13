import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

// Ambient decoration only — a molecule assembling as the section scrolls into
// view. Deliberately background-weight (low opacity, aria-hidden), not a
// standalone story like DenimWash/ThreadWeave.
const BONDS = [
  [40, 60, 90, 30],
  [90, 30, 140, 55],
  [90, 30, 95, 90],
  [95, 90, 145, 110],
  [40, 60, 30, 115],
];
const ATOMS = [
  [40, 60, 7],
  [90, 30, 5],
  [140, 55, 6],
  [95, 90, 8],
  [145, 110, 5],
  [30, 115, 5],
];

export default function MoleculeAccent({ className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const bonds = el.querySelectorAll("line");
      const atoms = el.querySelectorAll("circle");
      bonds.forEach((b) => {
        const len = b.getTotalLength();
        gsap.set(b, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(atoms, { autoAlpha: 0, scale: 0.3, transformOrigin: "center" });

      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } })
        .to(bonds, { strokeDashoffset: 0, duration: 1, stagger: 0.15, ease: "power1.out" })
        .to(atoms, { autoAlpha: 0.8, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, 0.2);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 180 140" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {BONDS.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <g fill="currentColor">
        {ATOMS.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </svg>
  );
}
