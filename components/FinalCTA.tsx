"use client";

import Reveal from "./Reveal";

const phrases = [
  "clean formulas.",
  "visible results.",
  "feel the glow.",
  "glow is your era.",
  "your skin, your story.",
];

const textGlow = {
  textShadow:
    "0 0 24px rgba(255,92,149,0.55), 0 0 60px rgba(242,60,124,0.35), 0 0 2px rgba(255,255,255,0.6)",
};

function ScrollRow({
  duration,
  className = "",
  style,
}: {
  duration: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const seq = [...phrases, ...phrases];
  return (
    <div className="flex w-max whitespace-nowrap will-change-transform" style={{ animation: `ctaScroll ${duration}s linear infinite`, ...style }}>
      {seq.map((p, i) => (
        <span key={i} className={`mx-6 inline-flex items-center gap-6 font-serif italic ${className}`}>
          <span style={textGlow}>{p}</span>
          <span className="not-italic text-cream-400/70">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function FinalCTA() {
  return (
    <section
      data-nav-dark
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0206] px-5 py-32"
    >
      {/* vanishing-point bloom */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[45vw] w-[45vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-500/25 blur-[130px]" />

      {/* neon hearts dollying forward */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="absolute left-1/2 top-1/2 h-[86vmax] w-[86vmax] will-change-transform"
            style={{
              animation: `ctaTunnel 7s linear infinite backwards`,
              animationDelay: `${(i * 7) / 8}s`,
            }}
            aria-hidden="true"
          >
            {/* soft outer glow stroke (no filter → cheap) */}
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="none"
              stroke="rgba(242,60,124,0.35)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="none"
              stroke="rgb(255 160 195)"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>

      {/* top billboard — pinned to the very top of the section */}
      <div className="pointer-events-none absolute inset-x-0 top-6 text-cream-50/90 md:top-10">
        <ScrollRow duration={38} className="text-5xl md:text-7xl" />
      </div>

      {/* bottom band — pinned to the very bottom, with its floor reflection */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 text-cream-50/85 md:bottom-10">
        <ScrollRow duration={52} className="text-4xl md:text-6xl" />
        <div
          className="mt-2 opacity-70 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.4),transparent)]"
          style={{ transform: "scaleY(-1)" }}
          aria-hidden="true"
        >
          <ScrollRow duration={52} className="text-4xl text-cream-200/40 md:text-6xl" />
        </div>
      </div>

      {/* glossy reflective floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#1a0410] via-[#0a0206]/70 to-transparent" />

      {/* haze */}
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-cream-600/25 blur-[90px]"
        style={{ animation: "ctaHaze 9s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-cream-500/20 blur-[100px]"
        style={{ animation: "ctaHaze 11s ease-in-out infinite", animationDelay: "2s" }}
      />

      {/* center content — sharp & stationary */}
      <div className="relative z-10 translate-y-[3vh] text-center">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-cream-200/80">
            sürükleyici ışıltı deneyimi
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/creamco-logo.png"
            alt="cream co."
            className="mx-auto h-auto w-[min(78vw,540px)] brightness-0 invert drop-shadow-[0_0_28px_rgba(255,92,149,0.55)]"
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-cream-100/70">
            Işıltı senin çağın. Rutinini dakikalar içinde oluştur — 500 ₺ üzeri
            ücretsiz kargo.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#products"
              className="btn-gloss inline-flex items-center gap-2 rounded-full bg-milk px-9 py-4 font-semibold text-cream-900 shadow-glow transition-transform hover:scale-105 active:scale-95"
            >
              Koleksiyonu Al →
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-9 py-4 font-semibold text-milk backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Cilt testini yap
            </a>
          </div>
        </Reveal>
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_38%,rgba(5,2,4,0.9)_100%)]" />
    </section>
  );
}
