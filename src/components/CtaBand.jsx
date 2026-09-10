import { NavLink } from "react-router-dom";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import WaveDivider from "./WaveDivider";
import { IconArrowRight } from "./icons";

export default function CtaBand() {
  return (
    <section className="relative py-24 bg-indigo overflow-hidden">
      <div className="noise-overlay absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-terracotta/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-teal/20 blur-[100px]" />

      <Reveal className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-cream mb-5">
          Ready to partner with a chemistry team that troubleshoots alongside you?
        </h2>
        <p className="text-cream/65 mb-10 max-w-xl mx-auto">
          Tell us about your fabric, your process and where colour or performance is falling
          short — we'll come back with a solution, not just a datasheet.
        </p>
        <Magnetic strength={0.3} className="inline-block">
          <NavLink
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-cream text-indigo-dark font-semibold px-8 py-4 hover:bg-white transition-all hover:gap-3"
          >
            Start the conversation <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </NavLink>
        </Magnetic>
      </Reveal>

      <WaveDivider color="#17151f" />
    </section>
  );
}
