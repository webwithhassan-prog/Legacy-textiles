import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { IconArrowRight, IconDroplet, IconSparkle } from "./icons";
import Magnetic from "./Magnetic";

const STATS = [
  { value: "4", label: "Process Stages", sub: "Pretreatment to finishing" },
  { value: "Lahore", label: "Pakistan", sub: "Where we formulate & supply" },
  { value: "Legacy", label: "Group of Industries", sub: "The company we're part of" },
];

export default function Hero() {
  const rootRef = useRef(null);
  const numberRef = useRef(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-eyebrow", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-word", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, "-=0.25")
        .fromTo(".hero-sub", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(".hero-quotebar", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.45")
        .fromTo(".hero-stat", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .add(() => {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: 4,
            duration: 0.7,
            ease: "power1.out",
            onUpdate: () => {
              if (numberRef.current) numberRef.current.textContent = Math.round(counter.v);
            },
          });
        }, "-=0.35")
        .fromTo(".hero-media", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1 }, "-=0.9")
        .fromTo(".float-chip", { autoAlpha: 0, y: 20, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(2)" }, "-=0.3")
        .fromTo(".hero-scrollcue", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.2");

      gsap.to(".blob-a", { y: -30, x: 20, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".blob-b", { y: 24, x: -18, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // small floating chemistry motifs beside the hero image
      gsap.to(".float-chip-a", { y: -14, rotate: -6, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".float-chip-b", { y: 12, rotate: 5, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onQuoteSubmit = (e) => {
    e.preventDefault();
    navigate("/contact", { state: { email } });
  };

  return (
    <section ref={rootRef} className="relative min-h-screen flex items-center overflow-hidden bg-cream pt-28 pb-16">
      <div className="blob-a pointer-events-none absolute top-10 -left-20 h-80 w-80 rounded-full bg-indigo-light/25 blur-[90px]" />
      <div className="blob-b pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-terracotta/20 blur-[100px]" />

      <div className="relative max-w-7xl w-full mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div>
          <p className="hero-eyebrow inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-ink/60 bg-white ring-1 ring-ink/10 px-4 py-2 rounded-full mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            Legacy Textile Solutions (Pvt) Ltd &mdash; Smart Chemical Solutions
          </p>

          <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.12] text-ink mb-7">
            <span className="hero-word inline">Chemistry that transforms fabric, </span>
            <span className="hero-word inline font-semibold text-terracotta">delivered with precision.</span>
          </h1>

          <p className="hero-sub text-lg text-ink/60 max-w-xl leading-relaxed mb-8">
            We formulate and supply the chemistry behind every stage of fabric production —
            pretreatment, dyeing, printing and finishing — so manufacturers get consistent
            colour, better performance and a partner who troubleshoots with them.
          </p>

          <form onSubmit={onQuoteSubmit} className="hero-quotebar mb-9">
            <p className="text-sm font-semibold text-ink/70 mb-3">Need a quick quote for your next batch?</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center bg-white rounded-full sm:rounded-full ring-1 ring-ink/10 p-1.5 max-w-lg shadow-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo/50"
              />
              <Magnetic strength={0.25} className="inline-block shrink-0">
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream text-sm font-semibold px-6 py-3 hover:bg-indigo-dark transition-all"
                >
                  Request a Quote <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            {STATS.map((s) => (
              <div key={s.label} className="hero-stat min-w-0">
                <p
                  ref={s.value === "4" ? numberRef : null}
                  className="font-display font-semibold text-base sm:text-xl lg:text-2xl text-ink leading-tight truncate"
                >
                  {s.value}
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-ink/70 leading-snug">{s.label}</p>
                <p className="hidden sm:block text-[11px] text-ink/45 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-media relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-[4/3]">
            <img
              src="/images/hero-dyeing.jpg"
              alt="Yarn being dyed in vivid colour baths"
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-dark/70 via-transparent to-transparent" />

            <NavLink
              to="/services"
              className="group absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl bg-cream/95 backdrop-blur px-4 py-3.5 shadow-lg hover:bg-white transition-colors"
            >
              <span>
                <span className="block font-display font-semibold text-ink text-sm">Four stages, one partner</span>
                <span className="block text-xs text-ink/55">See our full chemistry process</span>
              </span>
              <span className="h-9 w-9 shrink-0 rounded-full bg-ink text-cream flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <IconArrowRight className="h-4 w-4" />
              </span>
            </NavLink>
          </div>
          <div className="absolute -z-10 -top-6 -right-6 h-full w-full rounded-[2rem] border-2 border-terracotta/30" />

          <div className="float-chip float-chip-a absolute -top-6 -left-6 flex items-center gap-2 rounded-2xl bg-white shadow-lg px-3.5 py-2.5 ring-1 ring-ink/5">
            <span className="h-8 w-8 rounded-full bg-teal/15 text-teal flex items-center justify-center shrink-0">
              <IconDroplet className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-ink/75 leading-tight">Wash-fast<br />colour</span>
          </div>

          <div className="float-chip float-chip-b absolute top-1/3 -right-5 flex items-center gap-2 rounded-2xl bg-white shadow-lg px-3.5 py-2.5 ring-1 ring-ink/5">
            <span className="h-8 w-8 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center shrink-0">
              <IconSparkle className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-ink/75 leading-tight">Sustainable<br />formulas</span>
          </div>
        </div>
      </div>

      <div className="hero-scrollcue absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/40">
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="h-9 w-5 rounded-full border-2 border-ink/25 flex justify-center pt-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/40 animate-bounce" />
        </span>
      </div>
    </section>
  );
}
