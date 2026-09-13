import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";
import WaveDivider from "./WaveDivider";

const WARP_X = [190, 210, 230, 250, 270, 290];
// Two interlacing threads — alternating indices means they naturally
// draw in alternating top-to-bottom order, reading as one weave made of two threads.
const WEFT_Y = [40, 62, 84, 106, 128, 150, 172, 194, 216, 238, 260];
const THREAD_A_COLOR = "#d69a2d";
const THREAD_B_COLOR = "#c1652f";

export default function ThreadWeave() {
  const sectionRef = useRef(null);
  const threadARef = useRef(null);
  const threadBRef = useRef(null);
  const gridRef = useRef(null);
  const fabricFillRef = useRef(null);
  const shuttleTravelRef = useRef(null);
  const shuttleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const threadA = threadARef.current;
      const threadB = threadBRef.current;
      const lines = Array.from(gridRef.current.querySelectorAll("line"));
      const threadALen = threadA.getTotalLength();
      const threadBLen = threadB.getTotalLength();

      gsap.set(threadA, { strokeDasharray: threadALen, strokeDashoffset: threadALen });
      gsap.set(threadB, { strokeDasharray: threadBLen, strokeDashoffset: threadBLen });
      lines.forEach((l) => {
        const len = l.getTotalLength();
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(shuttleTravelRef.current, { autoAlpha: 0, x: 0 });
      gsap.set(fabricFillRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });

      tl.to(threadA, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
      tl.to(threadB, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
      tl.to(lines, { strokeDashoffset: 0, duration: 1, stagger: 0.05, ease: "none" }, 0.15);
      tl.to(shuttleTravelRef.current, { autoAlpha: 1, duration: 0.2 }, 0.15);
      tl.to(shuttleTravelRef.current, { x: 100, duration: 1, ease: "none" }, 0.15);
      tl.to(fabricFillRef.current, { autoAlpha: 0.35, duration: 0.3 }, 0.85);

      // Idle bob on the shuttle itself (nested inside the scrub-controlled
      // travel group) — runs continuously and independently of scroll, so
      // once the weave finishes it keeps a gentle life to it instead of
      // freezing dead still. Nested so it never composes with the parent's
      // scroll-driven x-translate on the same element.
      gsap.to(shuttleRef.current, {
        y: -3,
        duration: 0.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-28 bg-indigo overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-indigo-light/25 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="order-2 lg:order-1 flex justify-center">
          <svg viewBox="0 0 340 300" className="h-[300px] w-auto max-w-full" aria-hidden="true">
            {/* spool A — feeds the first thread */}
            <circle cx="55" cy="95" r="26" fill="none" stroke={THREAD_A_COLOR} strokeWidth="2" strokeOpacity="0.5" />
            <circle cx="55" cy="95" r="17" fill="none" stroke={THREAD_A_COLOR} strokeWidth="2" strokeOpacity="0.7" />
            <circle cx="55" cy="95" r="9" fill={THREAD_A_COLOR} fillOpacity="0.9" />
            <path
              ref={threadARef}
              d="M67 88 C 110 70, 150 55, 188 40"
              fill="none"
              stroke={THREAD_A_COLOR}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* spool B — feeds the second, interlacing thread */}
            <circle cx="55" cy="205" r="26" fill="none" stroke={THREAD_B_COLOR} strokeWidth="2" strokeOpacity="0.5" />
            <circle cx="55" cy="205" r="17" fill="none" stroke={THREAD_B_COLOR} strokeWidth="2" strokeOpacity="0.7" />
            <circle cx="55" cy="205" r="9" fill={THREAD_B_COLOR} fillOpacity="0.9" />
            <path
              ref={threadBRef}
              d="M67 212 C 110 232, 150 248, 188 260"
              fill="none"
              stroke={THREAD_B_COLOR}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* the finished swatch, fading in once the last thread is woven */}
            <rect ref={fabricFillRef} x="184" y="34" width="112" height="232" rx="6" fill="#f4ede0" />

            {/* woven grid, revealed thread by thread — alternating colors read as two threads interlacing */}
            <g ref={gridRef} strokeWidth="2.5" strokeLinecap="round">
              {WARP_X.map((x) => (
                <line key={`w${x}`} x1={x} y1="30" x2={x} y2="270" stroke="#f7f3ec" />
              ))}
              {WEFT_Y.map((y, i) => (
                <line key={`h${y}`} x1="185" y1={y} x2="300" y2={y} stroke={i % 2 === 0 ? THREAD_A_COLOR : THREAD_B_COLOR} strokeOpacity="0.8" />
              ))}
            </g>

            <g ref={shuttleTravelRef}>
              <rect ref={shuttleRef} x="180" y="146" width="14" height="8" rx="2" fill="#f7f3ec" />
            </g>
          </svg>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="text-terracotta-light text-xs font-bold uppercase tracking-[0.25em] mb-4">From fibre to fabric</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-cream mb-6 max-w-md">
            Every partnership starts as a single thread
          </h2>
          <p className="text-cream/65 leading-relaxed max-w-md">
            The way we work mirrors the fabric we help create — your process and
            our chemistry, two threads interlacing into one relationship, one
            formulation, one batch at a time.
          </p>
        </Reveal>
      </div>

      <WaveDivider color="#efe9de" />
    </section>
  );
}
