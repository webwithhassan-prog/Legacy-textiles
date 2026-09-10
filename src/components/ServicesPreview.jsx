import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";
import { IconArrowRight, IconDroplet, IconFlask, IconSparkle, IconSwatches } from "./icons";

const ITEMS = [
  { icon: IconFlask, title: "Pretreatment", color: "#7fa9b8", image: "/images/pretreatment-machine.jpg", desc: "Scouring, bleaching and desizing auxiliaries that prime fabric for flawless colour uptake." },
  { icon: IconDroplet, title: "Dyeing", color: "#0f8f86", image: "/images/hero-dyeing.jpg", desc: "Reactive, disperse and vat dye-house chemistry for vivid, consistent, wash-fast colour." },
  { icon: IconSwatches, title: "Printing", color: "#c22a63", image: "/images/printing-fabric.jpg", desc: "Pigment, reactive and digital print auxiliaries built for sharp, durable definition." },
  { icon: IconSparkle, title: "Finishing", color: "#d69a2d", image: "/images/finishing-fabric.jpg", desc: "Softeners, coatings and performance finishes that complete the fabric's journey." },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  const ensureQuick = () => {
    if (!quickX.current) {
      quickX.current = gsap.quickTo(ref.current, "rotateY", { duration: 0.5, ease: "power3.out" });
      quickY.current = gsap.quickTo(ref.current, "rotateX", { duration: 0.5, ease: "power3.out" });
    }
  };

  const onMove = (e) => {
    ensureQuick();
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickX.current(px * 10);
    quickY.current(py * -10);
  };

  const onLeave = () => {
    ensureQuick();
    quickX.current(0);
    quickY.current(0);
  };

  return (
    <div style={{ perspective: 900 }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ServicesPreview() {
  return (
    <section className="relative py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mb-16">
          <p className="text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-4">What we supply</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink">
            One chemical partner, every stage of the fabric&rsquo;s journey
          </h2>
        </Reveal>

        <Reveal as="div" stagger={0.12} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ icon: Icon, title, color, image, desc }) => (
            <TiltCard
              key={title}
              className="group relative rounded-2xl bg-white overflow-hidden shadow-[0_1px_0_rgba(23,21,31,0.05)] ring-1 ring-ink/5 hover:shadow-xl transition-shadow duration-400"
            >
              <NavLink to="/services" className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${color}cc 100%)` }} />
                  <div
                    className="absolute bottom-3 left-3 h-11 w-11 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center transition-transform duration-400 group-hover:rotate-6 group-hover:scale-110"
                    style={{ color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl text-ink mb-2.5">{title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed mb-5">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color }}>
                    Learn more <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </NavLink>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
