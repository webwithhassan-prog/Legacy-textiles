import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import WaveDivider from "./WaveDivider";

const TESTS = [
  {
    label: "Test 01",
    title: "Colour Rub (Crocking)",
    copy: "A dry and wet pad rubs the surface repeatedly — colour has to stay locked in the fibre, not transfer onto whatever touches it.",
    color: "#4a4272",
  },
  {
    label: "Test 02",
    title: "Wash Durability",
    copy: "Repeated wash cycles at production temperature and agitation, checked against shade change and seam integrity.",
    color: "#0f8f86",
  },
  {
    label: "Test 03",
    title: "Light Fastness",
    copy: "Extended UV exposure simulates months of daylight — the finish has to hold its colour, not just look good on day one.",
    color: "#d69a2d",
  },
  {
    label: "Test 04",
    title: "Tensile Strength",
    copy: "Fabric is stretched under load to confirm the treatment hasn't compromised the weave's underlying strength.",
    color: "#c1652f",
  },
];

const SWATCH_X = 40;
const SWATCH_Y = 40;
const SWATCH_W = 140;
const SWATCH_H = 100;

export default function QualityLab() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const swatchRef = useRef(null);
  const padRef = useRef(null);
  const bubbleWrapRef = useRef(null);
  const beamRef = useRef(null);
  const panelRefs = useRef([]);
  const dotRefs = useRef([]);
  const badgeRefs = useRef([]);
  const checkRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelRefs.current;
      const dots = dotRefs.current;
      const badges = badgeRefs.current;
      const checks = checkRefs.current;
      const n = TESTS.length;

      gsap.set(panels, { autoAlpha: 0, y: 36 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(dots, { backgroundColor: "#d8d2c4", scale: 1 });
      gsap.set(dots[0], { backgroundColor: TESTS[0].color, scale: 1.3 });
      gsap.set(badges, { backgroundColor: "transparent", borderColor: "#f7f3ec55" });
      checks.forEach((c) => {
        const len = c.getTotalLength();
        gsap.set(c, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(padRef.current, { autoAlpha: 0 });
      gsap.set(bubbleWrapRef.current, { autoAlpha: 0 });
      gsap.set(beamRef.current, { autoAlpha: 0 });
      swatchRef.current.setAttribute("fill", "#8c8478");

      // continuous rub-pad sweep, independent of scroll — only visible once
      // its stage reveals it via autoAlpha
      gsap.to(padRef.current, {
        x: SWATCH_W - 26,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // continuous wash bubbles
      const bubbles = gsap.utils.toArray(".lab-bubble");
      bubbles.forEach((b, i) => {
        gsap.set(b, { y: 0, opacity: 0 });
        gsap.to(b, {
          y: -70,
          opacity: 0,
          duration: 1.8 + (i % 3) * 0.3,
          repeat: -1,
          delay: i * 0.3,
          ease: "power1.out",
          onRepeat: () => gsap.set(b, { y: 0 }),
          onStart: () => gsap.to(b, { opacity: 0.6, duration: 0.25 }),
        });
      });

      let currentIndex = 0;

      // Badge/check state is recomputed from scratch every update as a pure
      // function of the current index — a test is "passed" once scroll has
      // moved on from it. Deliberately NOT incremental (unlike the panel/dot
      // swap below, which only ever needs to touch the one index being left
      // and the one being entered): a fast scroll can jump the index by more
      // than 1 between onUpdate calls, and an incremental pass/unpass would
      // silently skip whichever indices got jumped over.
      const syncBadges = (idx, progress) => {
        const passedThrough = progress > 0.985 ? n : idx;
        TESTS.forEach((t, i) => {
          const passed = i < passedThrough;
          gsap.to(badges[i], {
            backgroundColor: passed ? t.color : "transparent",
            borderColor: passed ? t.color : "#f7f3ec55",
            duration: 0.25,
            overwrite: true,
          });
          const len = checks[i].getTotalLength();
          gsap.to(checks[i], { strokeDashoffset: passed ? 0 : len, duration: 0.3, overwrite: true });
        });
      };

      const goToIndex = (idx) => {
        // Explicit target for every panel/dot each call (not just the pair
        // being entered/left) — see the identical fix + rationale in
        // ProcessJourney.jsx. A jumpy scrub can otherwise orphan a panel
        // mid-crossfade holding a stale partial opacity forever.
        panels.forEach((panel, i) => {
          gsap.to(panel, { autoAlpha: i === idx ? 1 : 0, y: i === idx ? 0 : -28, duration: i === idx ? 0.35 : 0.3, overwrite: true });
        });
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            backgroundColor: i === idx ? TESTS[idx].color : "#d8d2c4",
            scale: i === idx ? 1.3 : 1,
            duration: 0.25,
            overwrite: true,
          });
        });

        gsap.to(padRef.current, { autoAlpha: idx === 0 ? 1 : 0, duration: 0.25 });
        gsap.to(bubbleWrapRef.current, { autoAlpha: idx === 1 ? 1 : 0, duration: 0.25 });
        gsap.to(beamRef.current, { autoAlpha: idx === 2 ? 1 : 0, duration: 0.25 });
        gsap.to(swatchRef.current, { scaleX: idx === 3 ? 1.08 : 1, duration: 0.4, ease: "power1.inOut", transformOrigin: "50% 50%" });

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
          const idx = Math.max(0, Math.min(n - 1, Math.floor(p * n)));
          if (idx !== currentIndex) goToIndex(idx);
          syncBadges(idx, p);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink" style={{ height: `${TESTS.length * 60}vh` }}>
      <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/15 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-indigo-light/20 blur-[110px]" />

        <div className="relative flex-1 max-w-5xl w-full mx-auto px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
          {/* swatch + live test visual */}
          <div className="flex justify-center">
            <svg viewBox="0 0 220 180" className="w-full max-w-[280px] h-auto" aria-hidden="true">
              <rect ref={swatchRef} x={SWATCH_X} y={SWATCH_Y} width={SWATCH_W} height={SWATCH_H} rx="8" />
              <g stroke="#000" strokeOpacity="0.1" strokeWidth="1.2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={i} x1={SWATCH_X + i * 17.5} y1={SWATCH_Y} x2={SWATCH_X + i * 17.5} y2={SWATCH_Y + SWATCH_H} />
                ))}
              </g>

              {/* rub pad */}
              <rect ref={padRef} x={SWATCH_X - 4} y={SWATCH_Y + SWATCH_H / 2 - 8} width="22" height="16" rx="3" fill="#f7f3ec" opacity="0.85" />

              {/* wash bubbles */}
              <g ref={bubbleWrapRef}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <circle
                    key={i}
                    className="lab-bubble"
                    cx={SWATCH_X + 15 + ((i * 23) % (SWATCH_W - 30))}
                    cy={SWATCH_Y + SWATCH_H - 8}
                    r={1.8 + (i % 3) * 0.6}
                    fill="#ffffff"
                    opacity="0"
                  />
                ))}
              </g>

              {/* light beam */}
              <rect
                ref={beamRef}
                x={SWATCH_X}
                y={SWATCH_Y - 10}
                width="34"
                height={SWATCH_H + 20}
                fill="#f7f3ec"
                opacity="0.35"
                transform={`skewX(-20)`}
              />

              <rect x={SWATCH_X} y={SWATCH_Y} width={SWATCH_W} height={SWATCH_H} rx="8" fill="none" stroke="#f7f3ec" strokeOpacity="0.4" strokeWidth="1.5" />
            </svg>
          </div>

          {/* foreground copy card, matching the flask section's language */}
          <div>
            <p className="text-cream/50 text-xs uppercase tracking-[0.3em] mb-6 text-center lg:text-left">
              Quality Lab &mdash; scroll to run the tests
            </p>

            <div className="relative rounded-[2rem] bg-ink/55 backdrop-blur-md ring-1 ring-cream/10 px-6 sm:px-10 py-9 sm:py-10">
              <div className="relative h-[170px] sm:h-[150px]">
                {TESTS.map((t, i) => (
                  <div key={t.title} ref={(el) => (panelRefs.current[i] = el)} className="absolute inset-0 flex flex-col">
                    <span
                      className="inline-block self-start text-xs font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full mb-4"
                      style={{ color: t.color, border: `1px solid ${t.color}66`, background: `${t.color}1a` }}
                    >
                      {t.label}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-cream mb-3">{t.title}</h3>
                    <p className="text-cream/65 text-sm sm:text-base leading-relaxed max-w-md">{t.copy}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-6">
                {TESTS.map((t, i) => (
                  <button
                    key={t.title}
                    aria-label={`Jump to ${t.title}`}
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="h-2.5 w-2.5 rounded-full bg-[#d8d2c4] transition-colors"
                  />
                ))}
              </div>

              {/* pass scorecard */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-cream/10">
                {TESTS.map((t, i) => (
                  <div
                    key={t.title}
                    ref={(el) => (badgeRefs.current[i] = el)}
                    className="h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: "#f7f3ec55" }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        ref={(el) => (checkRefs.current[i] = el)}
                        d="M5 12.5 10 17.5 19 7"
                        fill="none"
                        stroke="#f7f3ec"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ))}
                <span className="text-xs text-cream/40 ml-1">Pass record</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider color="#f7f3ec" />
    </section>
  );
}
