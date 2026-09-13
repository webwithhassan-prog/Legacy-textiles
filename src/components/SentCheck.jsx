import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function SentCheck(props) {
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const checkRef = useRef(null);

  useLayoutEffect(() => {
    const circle = circleRef.current;
    const check = checkRef.current;
    const circleLen = circle.getTotalLength();
    const checkLen = check.getTotalLength();

    gsap.set(circle, { strokeDasharray: circleLen, strokeDashoffset: circleLen });
    gsap.set(check, { strokeDasharray: checkLen, strokeDashoffset: checkLen });

    const tl = gsap.timeline();
    tl.to(circle, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" })
      .to(check, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" }, "-=0.1")
      .fromTo(svgRef.current, { scale: 0.85 }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, 0);

    return () => tl.kill();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle ref={circleRef} cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="3" />
      <path ref={checkRef} d="M15 24.5 21 30.5 33 17.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
