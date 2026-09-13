import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";
import WaveDivider from "./WaveDivider";
import { IconHeadset, IconLeaf, IconShield } from "./icons";

const POINTS = [
  { icon: IconShield, title: "Quality Assurance", desc: "Rigorous quality control on every batch, so what you order is what performs on the floor." },
  { icon: IconHeadset, title: "Technical Support", desc: "Our team troubleshoots alongside your process engineers — not just after the sale." },
  { icon: IconLeaf, title: "Sustainable by Design", desc: "Environmentally-conscious formulations that keep performance and responsibility in balance." },
];

export default function WhyUs() {
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: imgRef.current, start: "top 80%" },
        }
      );
    }, imgRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-28 bg-cream-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div ref={imgRef} className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
          <img src="/images/about-fabric.jpg" alt="Hand-dyed fabric swatches" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 text-teal px-4 py-1.5 text-xs font-semibold mb-5">
            <IconShield className="h-3.5 w-3.5" /> ZDHC Level 3 Certified
          </div>
          <p className="text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-4">Why manufacturers choose us</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink mb-6 max-w-lg">
            As leaders in textile chemical manufacturing and representation, quality drives everything we do
          </h2>
          <p className="text-ink/65 leading-relaxed mb-10 max-w-lg">
            We work closely with clients to understand their process and deliver products that
            genuinely improve it — enhancing fabric quality, sustainability and performance at
            every stage.
          </p>

          <Reveal as="div" stagger={0.12} className="space-y-6">
            {POINTS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-indigo/10 text-indigo flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-1">{title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <WaveDivider color="#4a4272" />
    </section>
  );
}
