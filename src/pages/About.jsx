import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import CtaBand from "../components/CtaBand";
import MoleculeAccent from "../components/MoleculeAccent";
import QualityGauge from "../components/QualityGauge";
import QualityLab from "../components/QualityLab";
import ThreadWeave from "../components/ThreadWeave";
import WaveDivider from "../components/WaveDivider";
import { IconHeadset, IconLeaf } from "../components/icons";

const VALUES = [
  { icon: QualityGauge, title: "Quality Assurance", desc: "Rigorous quality control in the production and distribution of every product we supply, meeting the highest industry standards for reliability." },
  { icon: IconHeadset, title: "Technical Support", desc: "Extensive expertise in textile chemicals, with a team dedicated to personalized solutions and troubleshooting." },
  { icon: IconLeaf, title: "Innovation & Sustainability", desc: "Environmentally-conscious formulations that enhance the performance and quality of textiles without compromise." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Legacy Textile Solutions"
        title="Chemical partners for textile success"
        subtitle="A part of Legacy Group of Industries — we exist to make manufacturers' dyeing, printing, pretreatment and finishing processes more reliable, one formulation at a time."
        image="/images/pretreatment-machine.jpg"
        imageAlt="Yarn cones on pretreatment machinery"
      />

      <section className="relative overflow-hidden py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-4">Who we are</p>
            <h2 className="font-display font-semibold text-3xl text-ink mb-6">
              Leaders in textile chemical manufacturing and representation
            </h2>
            <p className="text-ink/65 leading-relaxed mb-5">
              Legacy Textile Solutions (Private) Limited provides a wide range of textile
              chemicals for manufacturers and representatives across the textile industry. Our
              products cater to diverse needs — dyeing, printing, pretreatment and finishing —
              with a focus on innovation and sustainability.
            </p>
            <p className="text-ink/65 leading-relaxed">
              We work closely with our clients to understand their process, not just their
              purchase order — and deliver chemistry that helps improve fabric quality,
              consistency and performance at every stage.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-4">Our team</p>
            <h2 className="font-display font-semibold text-3xl text-ink mb-6">
              Focused on high-quality, innovative solutions
            </h2>
            <p className="text-ink/65 leading-relaxed mb-5">
              Our team focuses on creating high-quality and innovative chemical solutions for the
              textile industry. Commitment to quality and customer satisfaction drives everything
              we do — from formulation through to the support we offer after delivery.
            </p>
            <p className="text-ink/65 leading-relaxed">
              As part of Legacy Group of Industries, we draw on a broader network of industrial
              expertise while staying closely, personally engaged with every partner mill and
              manufacturer we supply.
            </p>
          </Reveal>
        </div>

        <WaveDivider color="#4a4272" />
      </section>

      <ThreadWeave />

      <section className="relative overflow-hidden py-24 bg-cream-soft">
        <MoleculeAccent className="hidden md:block pointer-events-none absolute top-10 right-10 h-36 w-36 text-indigo/15" />
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mb-16 mx-auto text-center">
            <p className="text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-4">What guides us</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink">
              The principles behind every batch
            </h2>
          </Reveal>

          <Reveal as="div" stagger={0.15} className="grid sm:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white p-8 ring-1 ring-ink/5 text-center hover:-translate-y-1.5 transition-transform duration-300">
                <div className="h-14 w-14 mx-auto rounded-xl bg-indigo/10 text-indigo flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink mb-3">{title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <WaveDivider color="#17151f" />
      </section>

      <QualityLab />

      <section className="relative overflow-hidden py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mb-12 mx-auto text-center">
            <p className="text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-4">The result</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink">
              From vivid dye to finished cloth
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6">
            <Reveal className="rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3]">
              <img src="/images/finishing-fabric.jpg" alt="Finished embroidered textile" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={0.1} className="rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3]">
              <img src="/images/printing-fabric.jpg" alt="Printed fabric detail" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </Reveal>
          </div>
        </div>

        <WaveDivider color="#4a4272" />
      </section>

      <CtaBand />
    </>
  );
}
