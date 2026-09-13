import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function QualityGauge(props) {
  const svgRef = useRef(null);
  const needleRef = useRef(null);

  useLayoutEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(needleRef.current, { rotate: -55, transformOrigin: "24px 26px" });
      gsap.to(needleRef.current, {
        rotate: 45,
        duration: 0.9,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 30a18 18 0 0 1 36 0" stroke="#d9534f" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
      <path d="M6 30a18 18 0 0 1 12.5-17.1" stroke="#e0a83f" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
      <path d="M18.5 12.9A18 18 0 0 1 42 30" stroke="#0f8f86" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
      <line ref={needleRef} x1="24" y1="26" x2="24" y2="10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="26" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
