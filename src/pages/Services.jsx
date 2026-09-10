import { NavLink } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBand from "../components/CtaBand";
import WaveDivider from "../components/WaveDivider";
import {
  IconArrowRight,
  IconDroplet,
  IconFlask,
  IconHeadset,
  IconShield,
  IconSparkle,
  IconSwatches,
} from "../components/icons";

const INK = "#17151f";

const PROCESSES = [
  {
    icon: IconFlask,
    title: "Pretreatment",
    color: "#7fa9b8",
    deep: "#35576a",
    image: "/images/pretreatment-machine.jpg",
    desc: "Before a fibre can take colour, it has to be ready for it. Our scouring, bleaching and desizing auxiliaries remove natural impurities and sizing agents, giving downstream dyeing and printing a clean, consistent, absorbent surface to work with.",
    points: ["Scouring & desizing agents", "Bleaching auxiliaries", "Wetting & sequestering agents"],
  },
  {
    icon: IconDroplet,
    title: "Dyeing",
    color: "#0f8f86",
    deep: "#0a5c56",
    image: "/images/hero-dyeing.jpg",
    desc: "Vivid, consistent, wash-fast colour is where our chemistry earns its keep. We supply the levelling agents, fixing agents and dye-bath auxiliaries that keep shade reproducible from lab dip to bulk production.",
    points: ["Reactive & disperse dye systems", "Levelling & fixing agents", "Shade-matching support"],
  },
  {
    icon: IconSwatches,
    title: "Printing",
    color: "#c22a63",
    deep: "#7a1a3f",
    image: "/images/printing-fabric.jpg",
    desc: "From block print to digital, sharp definition depends on the chemistry behind the paste. Our print auxiliaries and binders deliver crisp edges and colour that holds up to repeated washing.",
    points: ["Pigment & reactive print pastes", "Binders & thickeners", "Colour-fastness solutions"],
  },
  {
    icon: IconSparkle,
    title: "Finishing",
    color: "#d69a2d",
    deep: "#8f621a",
    image: "/images/finishing-fabric.jpg",
    desc: "The last step is what the customer actually feels. Softeners, coatings and performance finishes give fabric its final hand-feel, drape and functional properties before it leaves the mill.",
    points: ["Softeners & handle modifiers", "Performance & functional coatings", "Anti-crease & durability finishes"],
  },
];

const SUPPORT = [
  { icon: IconFlask, title: "Textile Chemicals Supply", desc: "A wide, reliable supply of high-quality chemicals for dyeing, printing and finishing — sourced and stocked for manufacturers who can't afford downtime." },
  { icon: IconShield, title: "Quality Assurance", desc: "Rigorous quality control on production and distribution, so every drum that leaves us meets the standard your process is built around." },
  { icon: IconHeadset, title: "Technical Support", desc: "Personalized, hands-on troubleshooting from a team that understands textile chemistry — not just a call centre reading a datasheet." },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Chemistry for every stage of the fabric"
        subtitle="Four process categories, one accountable partner — from raw fibre to finished, sellable textile."
      />

      {PROCESSES.map((p, i) => {
        const nextColor = PROCESSES[i + 1] ? PROCESSES[i + 1].deep : INK;
        return (
          <section id={p.title.toLowerCase()} key={p.title} className="relative overflow-hidden scroll-mt-24" style={{ backgroundColor: p.deep }}>
            <div
              className="pointer-events-none absolute -top-24 h-80 w-80 rounded-full blur-[110px] opacity-40"
              style={{ backgroundColor: p.color, [i % 2 === 1 ? "right" : "left"]: "-6rem" }}
            />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-24 sm:py-28">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal scale={0.94} className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] ring-1 ring-white/10">
                  <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </Reveal>
                <Reveal delay={0.1}>
                  <div
                    className="h-14 w-14 rounded-xl flex items-center justify-center mb-6 bg-white/10"
                    style={{ color: p.color }}
                  >
                    <p.icon className="h-7 w-7" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: p.color }}>
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display font-semibold text-3xl text-cream mb-4">{p.title}</h2>
                  <p className="text-cream/70 leading-relaxed mb-6">{p.desc}</p>
                  <ul className="space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-sm font-medium text-cream/80">
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>

            <WaveDivider color={nextColor} />
          </section>
        );
      })}

      <section className="py-24 bg-ink relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/3 h-96 w-96 rounded-full bg-indigo-light/20 blur-[110px]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mb-16">
            <p className="text-terracotta-light text-xs font-bold uppercase tracking-[0.25em] mb-4">Beyond the chemistry</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-cream">
              What partnering with us actually looks like
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
            <Reveal as="div" stagger={0.15} className="grid sm:grid-cols-1 gap-6">
              {SUPPORT.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-5 rounded-2xl bg-white/5 ring-1 ring-cream/10 p-6">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-terracotta/20 text-terracotta-light flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream mb-1.5">{title}</h3>
                    <p className="text-sm text-cream/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img src="/images/chemical-drums.jpg" alt="Stored chemical drums ready for distribution" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 bg-cream">
        <Reveal className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-5">
            Looking for a specific formulation?
          </h2>
          <p className="text-ink/60 mb-8">
            Our full product catalogue is shared directly with manufacturers and representatives
            — tell us your process and we'll send the right datasheets.
          </p>
          <NavLink
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-indigo text-cream font-semibold px-7 py-3.5 hover:bg-indigo-dark transition-all hover:gap-3"
          >
            Request the catalogue <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </NavLink>
        </Reveal>

        <WaveDivider color="#4a4272" />
      </section>

      <CtaBand />
    </>
  );
}
