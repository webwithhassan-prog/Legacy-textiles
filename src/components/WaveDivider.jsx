// A wavy edge between two full-bleed sections — the wave is filled with the
// colour of the section that follows, so it reads as the next colour
// "flowing up" over the current one.
export default function WaveDivider({ color, flip = false }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 translate-y-px leading-none pointer-events-none"
      style={flip ? { transform: "translateY(1px) scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 90" className="w-full h-[46px] sm:h-[70px]" preserveAspectRatio="none">
        <path
          d="M0,44 C240,90 480,0 720,24 C960,48 1200,90 1440,40 L1440,90 L0,90 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
