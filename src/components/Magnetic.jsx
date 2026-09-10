import { useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * Wraps a button/link so it gently pulls toward the cursor on hover —
 * a small "magnetic" tactile touch on primary CTAs.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  };

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </span>
  );
}
