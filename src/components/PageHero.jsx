import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function PageHero({ eyebrow, title, subtitle, image }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".ph-eyebrow", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 })
        .fromTo(".ph-title", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.25")
        .fromTo(".ph-sub", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative pt-40 pb-20 bg-cream overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-indigo-light/20 blur-[100px]" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <p className="ph-eyebrow text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-5">{eyebrow}</p>
        <h1 className="ph-title font-display font-semibold text-4xl sm:text-5xl text-ink mb-5">{title}</h1>
        {subtitle && <p className="ph-sub text-ink/60 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
      </div>
      {image && (
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 mt-14">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[16/7]">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}
