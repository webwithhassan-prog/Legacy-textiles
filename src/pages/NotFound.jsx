import { NavLink } from "react-router-dom";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { IconArrowRight, IconFlask } from "../components/icons";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-cream py-24">
      <div className="pointer-events-none absolute top-10 -left-20 h-80 w-80 rounded-full bg-indigo-light/25 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-terracotta/20 blur-[100px]" />

      <Reveal className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="relative inline-flex mb-8">
          <IconFlask className="h-20 w-20 text-indigo/70 -rotate-12" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-16 rounded-full bg-indigo/10 blur-[2px]" />
        </div>

        <p className="text-terracotta text-xs font-bold uppercase tracking-[0.25em] mb-4">
          Error 404
        </p>
        <h1 className="font-display font-semibold text-4xl sm:text-5xl text-ink mb-5">
          This formula doesn&rsquo;t exist
        </h1>
        <p className="text-ink/60 text-lg max-w-md mx-auto leading-relaxed mb-10">
          The page you're looking for has evaporated — wrong beaker, or the
          link's gone stale. Let's get you back to something that actually works.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.25} className="inline-block">
            <NavLink
              to="/"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream font-semibold px-7 py-3.5 hover:bg-indigo-dark transition-all hover:gap-3"
            >
              Back to Home <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </NavLink>
          </Magnetic>
          <NavLink
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 text-ink font-semibold px-7 py-3.5 hover:border-ink/35 transition-colors"
          >
            Explore Our Chemistry
          </NavLink>
        </div>
      </Reveal>
    </section>
  );
}
