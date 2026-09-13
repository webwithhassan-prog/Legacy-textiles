import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function PipetteDrop(props) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const drops = el.querySelectorAll(".drop");
      gsap.set(drops, { autoAlpha: 0, y: -6 });

      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%" }, repeat: -1, repeatDelay: 1.2 })
        .to(drops, {
          autoAlpha: 1,
          y: 14,
          duration: 0.6,
          stagger: 0.35,
          ease: "power1.in",
        })
        .to(drops, { autoAlpha: 0, duration: 0.15 }, "-=0.1")
        .set(drops, { y: -6 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 48 48" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 6h10" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M22 6v9l-3 6" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 34c0-3 3-5 10-5s10 2 10 5-4 6-10 6-10-3-10-6Z" strokeWidth="2.2" strokeLinejoin="round" />
      <circle className="drop" cx="19" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <circle className="drop" cx="24" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
