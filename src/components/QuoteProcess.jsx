import Reveal from "./Reveal";
import WaveDivider from "./WaveDivider";

const STEPS = [
  { title: "Send requirement details", desc: "Tell us your process, substrate and target quantity — as little or as much detail as you have." },
  { title: "We confirm the match", desc: "Our team maps your requirement to the right product, dosage and application conditions." },
  { title: "Quote & sample plan", desc: "A competitive quote alongside a sample plan, so you can test before committing to volume." },
  { title: "Application test & order", desc: "Run it on your floor, confirm the result, then place the order with confidence." },
];

export default function QuoteProcess() {
  return (
    <section className="relative py-24 bg-cream-soft overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mb-16">
          <p className="text-indigo text-xs font-bold uppercase tracking-[0.25em] mb-4">How it works</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink">
            From enquiry to order, in four steps
          </h2>
        </Reveal>

        <Reveal as="div" stagger={0.12} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <span className="font-display font-semibold text-4xl text-indigo/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold text-ink mt-3 mb-2">{step.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>

      <WaveDivider color="#f7f3ec" />
    </section>
  );
}
