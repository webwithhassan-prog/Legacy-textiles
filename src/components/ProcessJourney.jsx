import { useLayoutEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { IconArrowRight } from "./icons";
import WaveDivider from "./WaveDivider";

const STAGES = [
  {
    label: "Stage 01",
    title: "Pretreatment",
    color: "#7fa9b8",
    copy: "Scouring, bleaching and desizing strip away impurities and prime every fibre to accept colour evenly.",
  },
  {
    label: "Stage 02",
    title: "Dyeing",
    color: "#0f8f86",
    copy: "Reactive, disperse and vat dye systems lock vivid, wash-fast colour deep into the fibre.",
  },
  {
    label: "Stage 03",
    title: "Printing",
    color: "#c22a63",
    copy: "Pigment, reactive and digital print auxiliaries deliver sharp definition with colour that won't bleed.",
  },
  {
    label: "Stage 04",
    title: "Finishing",
    color: "#d69a2d",
    copy: "Softeners, coatings and performance finishes turn treated fabric into a finished, sellable textile.",
  },
];

// conical (Erlenmeyer) flask geometry, viewBox 0 0 220 300 — liquid rect is
// wide/rectangular but the clipPath tapers it to the flask's true silhouette,
// so the surface visibly narrows as it climbs from the wide base into the neck.
const FLASK_CLIP =
  "M96,8 L96,95 C96,95 55,150 34,205 C22,238 34,250 55,250 L165,250 C186,250 198,238 186,205 C165,150 124,95 124,95 L124,8 Z";
const LIQUID_X = 15;
const LIQUID_W = 190;
const LIQUID_TOP = 95; // neck/body junction — the practical "full" fill line
const LIQUID_BOTTOM = 250;
const LIQUID_MAX_H = LIQUID_BOTTOM - LIQUID_TOP;
const WAVE_H = 16;
const WAVE_TILE = `M0,${WAVE_H / 2} Q13,0 26,${WAVE_H / 2} T52,${WAVE_H / 2} T78,${WAVE_H / 2} T104,${WAVE_H / 2} V${WAVE_H} H0 Z`;

export default function ProcessJourney() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const liquidRef = useRef(null);
  const waveYRef = useRef(null);
  const waveXRef = useRef(null);
  const bubbleWrapRef = useRef(null);
  const swatchRef = useRef(null);
  const beakerGroupRef = useRef(null);
  const rodRef = useRef(null);
  const rodSpinRef = useRef(null);
  const swirlRef = useRef(null);
  const panelRefs = useRef([]);
  const dotRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const liquid = liquidRef.current;
      const swatch = swatchRef.current;
      const panels = panelRefs.current;
      const dots = dotRefs.current;
      const n = STAGES.length;

      const setColor = (hex) => {
        liquid.setAttribute("fill", hex);
        waveYRef.current.querySelectorAll(".wave-tile").forEach((el) => el.setAttribute("fill", hex));
        swatch.setAttribute("fill", hex);
      };

      const setLevel = (v) => {
        const h = v * LIQUID_MAX_H;
        liquid.setAttribute("height", h);
        liquid.setAttribute("y", LIQUID_BOTTOM - h);
        waveYRef.current.setAttribute("transform", `translate(0, ${LIQUID_BOTTOM - h - WAVE_H / 2})`);
        waveYRef.current.style.opacity = v > 0.03 ? 0.9 : 0;
        bubbleWrapRef.current.style.opacity = Math.min(1, v * 1.6);
      };

      // rod enters after the flask has water in it: fades in and drops down
      // into position, then (elsewhere) spins continuously once it has arrived.
      const setRodEntry = (v) => {
        gsap.set(rodRef.current, { opacity: v, y: (1 - v) * -46 });
      };

      setColor(STAGES[0].color);
      gsap.set(panels, { autoAlpha: 0, y: 36 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(dots, { backgroundColor: "#d8d2c4", scale: 1 });
      gsap.set(dots[0], { backgroundColor: STAGES[0].color, scale: 1.3 });
      setLevel(0);
      setRodEntry(0);

      // continuous stirring — a small back-and-forth wobble, not a full
      // pinwheel spin. The rod is 195 units long and pivots at its very
      // top, so a full 360° turn swings its tip far outside the 220-wide
      // flask at the 90°/270° points (basic geometry, not a transform bug —
      // this is what that showed up as: a diagonal streak sweeping across
      // the scene each rotation). A tight oscillation keeps the tip well
      // within the glass and actually reads as stirring rather than a
      // spinning pinwheel. Driven via the SVG-native rotate(angle, cx, cy)
      // attribute, isolated on its own group so it never composes with the
      // entry drop-in translate on the parent.
      const spin = { a: -16 };
      gsap.fromTo(
        spin,
        { a: -16 },
        {
          a: 16,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          onUpdate: () => rodSpinRef.current.setAttribute("transform", `rotate(${spin.a} 110 2)`),
        }
      );

      // rippling liquid surface — two tiles slide left in a seamless loop
      gsap.to(waveXRef.current, { x: -LIQUID_W, duration: 2.6, repeat: -1, ease: "none" });

      // gentle continuous bubbles, independent of scroll scrub
      const bubbles = gsap.utils.toArray(".process-bubble");
      bubbles.forEach((b, i) => {
        gsap.set(b, { y: 0, opacity: 0 });
        gsap.to(b, {
          y: -170 - i * 6,
          opacity: 0,
          duration: 2.2 + (i % 4) * 0.4,
          repeat: -1,
          delay: i * 0.35,
          ease: "power1.out",
          onRepeat: () => gsap.set(b, { y: 0 }),
          onStart: () => gsap.to(b, { opacity: 0.65, duration: 0.3 }),
        });
      });

      // Stage state is a pure function of scroll progress, so dots/panels/
      // liquid colour can never drift out of sync with each other even
      // under fast or jumpy scrubbing.
      let currentIndex = 0;

      const goToIndex = (idx) => {
        // Every panel/dot gets an explicit target on every call, not just
        // the pair being entered/left — a fast or jumpy scrub can fire
        // several onUpdate ticks before a prior crossfade finishes, and
        // touching only the "from"/"to" pair each time trusted currentIndex
        // to still match whatever was actually left visible. It doesn't
        // always: a panel skipped over mid-jump could get orphaned holding
        // a stale partial opacity forever. Setting all of them unconditionally
        // (with overwrite:true) makes this self-correcting regardless of
        // how it got here.
        panels.forEach((panel, i) => {
          gsap.to(panel, { autoAlpha: i === idx ? 1 : 0, y: i === idx ? 0 : -28, duration: i === idx ? 0.35 : 0.3, overwrite: true });
        });
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            backgroundColor: i === idx ? STAGES[idx].color : "#d8d2c4",
            scale: i === idx ? 1.3 : 1,
            duration: 0.25,
            overwrite: true,
          });
        });

        const colorTarget = { t: 0 };
        const fromHex = STAGES[currentIndex].color;
        const toHex = STAGES[idx].color;
        gsap.to(colorTarget, {
          t: 1,
          duration: 0.5,
          ease: "power1.inOut",
          overwrite: "auto",
          onUpdate: () => setColor(gsap.utils.interpolate(fromHex, toHex, colorTarget.t)),
        });

        gsap.fromTo(
          beakerGroupRef.current,
          { scale: 1 },
          { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut", transformOrigin: "50% 100%", overwrite: true }
        );

        // a soft colour bloom to sell the new dye "mixing in"
        gsap.fromTo(
          swirlRef.current,
          { attr: { r: 6, fill: toHex }, opacity: 0.85 },
          { attr: { r: 70 }, opacity: 0, duration: 0.9, ease: "power2.out", overwrite: true, onStart: () => swirlRef.current.setAttribute("fill", toHex) }
        );

        currentIndex = idx;
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: pinRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          // sequence: 1) water fills  2) rod drops in  3) stir + mix per stage
          setLevel(Math.min(1, p / 0.12));
          setRodEntry(Math.max(0, Math.min(1, (p - 0.12) / 0.08)));

          const idx = Math.max(0, Math.min(n - 1, Math.floor(p * n)));
          if (idx !== currentIndex) goToIndex(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToStage = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const target = section.offsetTop + (total * i) / (STAGES.length - 1);
    window.scrollTo({ top: target + 1, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative bg-ink" style={{ height: `${STAGES.length * 70}vh` }}>
      <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-20">
        {/* ambient background glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-light/25 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-terracotta/15 blur-[110px]" />

        {/* big background beaker — starts below the fixed navbar so the neck never hides behind it */}
        <div ref={beakerGroupRef} className="pointer-events-none absolute inset-x-0 top-20 bottom-0 flex items-center justify-center">
          <svg viewBox="0 0 220 300" className="h-[76vh] w-auto opacity-90">
            <defs>
              <clipPath id="beakerClip">
                <path d={FLASK_CLIP} />
              </clipPath>
              <radialGradient id="beakerGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g clipPath="url(#beakerClip)">
              <rect ref={liquidRef} x={LIQUID_X} y={LIQUID_BOTTOM} width={LIQUID_W} height="0" fill="#0f8f86" />
              <circle ref={swirlRef} cx={110} cy={190} r="0" fill="#0f8f86" opacity="0" />
              <g ref={waveYRef}>
                <g ref={waveXRef}>
                  <path className="wave-tile" d={WAVE_TILE} transform={`translate(${LIQUID_X}, 0)`} fill="#0f8f86" />
                  <path className="wave-tile" d={WAVE_TILE} transform={`translate(${LIQUID_X + LIQUID_W}, 0)`} fill="#0f8f86" />
                </g>
              </g>
              <g ref={bubbleWrapRef} style={{ opacity: 0 }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <circle
                    key={i}
                    className="process-bubble"
                    cx={LIQUID_X + 14 + ((i * 11) % (LIQUID_W - 28))}
                    cy={LIQUID_BOTTOM - 10}
                    r={1.6 + (i % 3) * 0.8}
                    fill="#ffffff"
                    opacity="0"
                  />
                ))}
              </g>
              <rect x={LIQUID_X} y={LIQUID_TOP} width={LIQUID_W} height={LIQUID_MAX_H} fill="url(#beakerGlow)" />
            </g>

            {/* stirring rod — outer group handles the entry drop-in (opacity/y),
                inner group handles only the continuous rotation around its pivot */}
            <g ref={rodRef}>
              <g ref={rodSpinRef}>
                <rect x={107} y={2} width="6" height="195" rx="3" fill="#f7f3ec" opacity="0.85" />
                <circle cx={110} cy={2} r="6" fill="#f7f3ec" opacity="0.95" />
              </g>
            </g>

            {/* conical (Erlenmeyer) flask outline drawn on top */}
            <g stroke="#f7f3ec" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round">
              <path d={FLASK_CLIP} />
              <path d="M90 8 H130" />
              <path d="M124 8 C130 4 136 2 140 0" />
              <path d="M96 40 H104 M96 62 H104" strokeWidth="2.2" opacity="0.7" />
            </g>
          </svg>
        </div>

        {/* foreground content */}
        <div className="relative flex-1 max-w-3xl w-full mx-auto px-6 flex flex-col items-center justify-center text-center">
          <p className="text-cream/50 text-xs uppercase tracking-[0.3em] mb-6">
            Our Process &mdash; scroll to follow the reaction
          </p>

          <div className="relative w-full rounded-[2rem] bg-ink/55 backdrop-blur-md ring-1 ring-cream/10 px-6 sm:px-12 py-10 sm:py-12">
            <div className="relative h-[190px] sm:h-[170px]">
              {STAGES.map((s, i) => (
                <div key={s.title} ref={(el) => (panelRefs.current[i] = el)} className="absolute inset-0 flex flex-col items-center">
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full mb-4"
                    style={{ color: s.color, border: `1px solid ${s.color}66`, background: `${s.color}1a` }}
                  >
                    {s.label}
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl font-semibold text-cream mb-4">{s.title}</h3>
                  <p className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto">{s.copy}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              {STAGES.map((s, i) => (
                <button
                  key={s.title}
                  aria-label={`Jump to ${s.title}`}
                  onClick={() => scrollToStage(i)}
                  ref={(el) => (dotRefs.current[i] = el)}
                  className="h-2.5 w-2.5 rounded-full bg-[#d8d2c4] transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>

          <NavLink
            to="/services"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/70 hover:text-terracotta-light transition-colors"
          >
            See full chemistry range <IconArrowRight className="h-4 w-4" />
          </NavLink>

          <div className="hidden sm:flex items-center gap-2 mt-8">
            <span ref={swatchRef} className="h-4 w-4 rounded-full" style={{ backgroundColor: STAGES[0].color }} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Fabric colour, live</span>
          </div>
        </div>
      </div>

      <WaveDivider color="#f7f3ec" />
    </section>
  );
}
