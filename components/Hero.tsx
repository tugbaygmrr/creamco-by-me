"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TITLE = "Nem,";

// Twinkling sparkles scattered across the hero (percent positions).
const sparkles = [
  { left: "7%", top: "14%", size: 24, delay: 0 },
  { left: "38%", top: "23%", size: 16, delay: 0.6 },
  { left: "30%", top: "66%", size: 22, delay: 1.2 },
  { left: "12%", top: "82%", size: 15, delay: 0.4 },
  { left: "21%", top: "40%", size: 13, delay: 1.6 },
  { left: "57%", top: "13%", size: 28, delay: 0.9 },
  { left: "88%", top: "33%", size: 20, delay: 1.4 },
  { left: "70%", top: "78%", size: 24, delay: 0.5 },
  { left: "95%", top: "60%", size: 17, delay: 1.0 },
  { left: "80%", top: "20%", size: 15, delay: 1.9 },
];

// Soft pink panel, close to the video's own backdrop → seamless, airy, no shadow.
const PANEL_GRADIENT = "linear-gradient(160deg, #f7e3e7 0%, #efcdd4 100%)";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cue = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      // The video is scroll-controlled, not auto-playing.
      video.pause();

      // --- Entrance timeline ---
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-badge", { y: 20, opacity: 0, duration: 0.8, delay: 0.3 })
        .from(
          ".hero-char",
          { yPercent: 60, opacity: 0, duration: 0.7, stagger: 0.03 },
          "-=0.4"
        )
        .from(".hero-sub", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta-row", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(cue.current, { opacity: 0, duration: 0.8 }, "-=0.3");

      // --- Holographic pink lights behind the copy ---
      gsap.utils.toArray<HTMLElement>(".holo-blob").forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 ? 50 : -50,
          y: i % 2 ? -40 : 40,
          scale: 1.25,
          opacity: 0.95,
          duration: 7 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // --- Twinkling sparkles (bold & glowy) ---
      gsap.utils.toArray<HTMLElement>(".hero-sparkle").forEach((el) => {
        const d = Number(el.dataset.delay) || 0;
        gsap.set(el, { opacity: 0.4, scale: 0.6 });
        gsap.to(el, {
          opacity: 1,
          scale: 1.15,
          duration: 1.1,
          delay: d,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(el, {
          rotation: 90,
          duration: 6 + d,
          repeat: -1,
          ease: "none",
        });
      });

      // --- Scroll cue bounce ---
      gsap.to(".cue-dot", {
        y: 14,
        opacity: 0.2,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // --- Scroll swaps the slogans (content is never empty) ---
      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
      const n = slides.length;
      if (n > 1) {
        gsap.set(slides, { autoAlpha: 0 });
        gsap.set(slides[0], { autoAlpha: 1, yPercent: 0 });

        const state = { p: 0 };
        const w = 0.4; // fraction of each segment used for the crossfade
        gsap.to(state, {
          p: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
          onUpdate: () => {
            const pos = state.p * (n - 1);
            const base = Math.min(n - 1, Math.floor(pos));
            const frac = pos - base;
            slides.forEach((s, i) => {
              let a = 0;
              if (i === base) {
                a = frac <= 1 - w ? 1 : 1 - (frac - (1 - w)) / w;
              } else if (i === base + 1) {
                a = frac <= 1 - w ? 0 : (frac - (1 - w)) / w;
              }
              const dir = i > base ? 1 : -1;
              gsap.set(s, { autoAlpha: a, yPercent: (1 - a) * 8 * dir });
            });
          },
        });
      }

      gsap.to(cue.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "10% top",
          scrub: true,
        },
      });

      // --- Scroll scrubs the video playback ---
      const scrub = { t: 0 };
      const buildVideoScrub = () => {
        const duration = video.duration;
        if (!duration || !isFinite(duration)) return;

        video.currentTime = 0.001; // paint the first frame

        gsap.to(scrub, {
          t: duration,
          ease: "none",
          onUpdate: () => {
            if (video.readyState >= 2) video.currentTime = scrub.t;
          },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
        });

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        buildVideoScrub();
      } else {
        video.addEventListener("loadedmetadata", buildVideoScrub, {
          once: true,
        });
      }
    },
    { scope: root }
  );

  const slideBase =
    "hero-slide absolute inset-0 flex flex-col justify-center px-6 pb-10 text-center md:px-12 md:pb-0 md:text-left lg:px-20";

  return (
    // Tall section gives scroll distance; the visual is pinned (sticky) inside.
    <section ref={root} id="top" className="relative h-[300vh]">
      <div
        className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden"
        style={{ background: PANEL_GRADIENT }}
      >
        {/* FULL-BLEED — scroll-controlled video fills the whole hero horizontally */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/hero-new.mp4" type="video/mp4" />
          </video>
          {/* Left-to-right fade keeps the copy readable over the footage */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #f7e3e7 0%, rgba(247,227,231,0.92) 34%, rgba(247,227,231,0.55) 52%, rgba(247,227,231,0) 72%)",
            }}
          />
        </div>

        {/* LEFT — copy overlaid on the video; slogans swap on scroll */}
        <div className="relative z-10 h-full w-full md:w-1/2">
          {/* Holographic pink lights behind the copy */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="holo-blob absolute left-[6%] top-[24%] h-80 w-80 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,92,149,0.6), transparent 62%)",
              }}
            />
            <div
              className="holo-blob absolute left-[26%] top-[46%] h-96 w-96 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(179,136,255,0.5), transparent 62%)",
              }}
            />
            <div
              className="holo-blob absolute left-[0%] top-[62%] h-72 w-72 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,176,205,0.65), transparent 62%)",
              }}
            />
            <div
              className="holo-blob absolute left-[34%] top-[14%] h-64 w-64 rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(120,200,255,0.38), transparent 62%)",
              }}
            />
          </div>

          {/* Slide 1 */}
          <div className={slideBase}>
            <span className="hero-badge glass mb-6 self-center rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-cream-900 md:self-start md:text-sm">
              ✦ Yeni · Işıltı Serisi 2026
            </span>
            <h1 className="font-serif text-balance text-5xl font-light leading-[0.98] tracking-tight text-ink md:text-6xl lg:text-7xl">
              <span className="contents">
                {TITLE.split("").map((c, i) => (
                  <span key={i} className="hero-char inline-block">
                    {c === " " ? " " : c}
                  </span>
                ))}
              </span>
              <br />
              <span className="hero-sub italic font-medium text-cream-700">
                Ama Lüks Dokunuşuyla.
              </span>
            </h1>
            <p className="hero-p mx-auto mt-6 min-h-[6rem] max-w-md text-base text-ink/70 md:mx-0 md:min-h-[5.25rem] md:text-lg">
              Her gün ışıldayan bir cilt için tasarlanmış bakım. Işıltılı
              formüller, temiz içerikler ve içten gelen o parlaklık.
            </p>
            <div className="hero-cta-row mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:justify-start">
              <a
                href="#products"
                className="btn-gloss group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 font-semibold text-milk shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
              >
                Hemen Al
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#experience"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink/25 px-8 font-semibold text-ink transition-colors hover:bg-ink/5"
              >
                Koleksiyonu Keşfet
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div className={`${slideBase} opacity-0`}>
            <span className="mb-6 self-center rounded-full glass px-5 py-2 text-xs font-medium uppercase tracking-widest text-cream-900 md:self-start md:text-sm">
              ✦ Hyaluronik Asit + Peptit
            </span>
            <h2 className="font-serif text-balance text-5xl font-light leading-[0.98] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Işıltı,
              <br />
              <span className="italic font-medium text-cream-700">
                Her Damlada.
              </span>
            </h2>
            <p className="mx-auto mt-6 min-h-[6rem] max-w-md text-base text-ink/70 md:mx-0 md:min-h-[5.25rem] md:text-lg">
              Ağırlığının 1000 katı su tutan formüller; cildini gün boyu dolgun,
              canlı ve nemli tutar.
            </p>
            <div className="mt-2 flex justify-center md:justify-start">
              <a
                href="#experience"
                className="btn-gloss group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 font-semibold text-milk shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
              >
                Formülü Keşfet
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Slide 3 */}
          <div className={`${slideBase} opacity-0`}>
            <span className="mb-6 self-center rounded-full glass px-5 py-2 text-xs font-medium uppercase tracking-widest text-cream-900 md:self-start md:text-sm">
              ✦ Vegan & Dermatolojik Test
            </span>
            <h2 className="font-serif text-balance text-5xl font-light leading-[0.98] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Cildin,
              <br />
              <span className="italic font-medium text-cream-700">
                En İyi Hali.
              </span>
            </h2>
            <p className="mx-auto mt-6 min-h-[6rem] max-w-md text-base text-ink/70 md:mx-0 md:min-h-[5.25rem] md:text-lg">
              Temiz içerikler, ışıltılı dokular. Birkaç adımda kendine özel bakım
              ritüelini oluştur.
            </p>
            <div className="mt-2 flex justify-center md:justify-start">
              <a
                href="#products"
                className="btn-gloss group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 font-semibold text-milk shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
              >
                Hemen Al
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            ref={cue}
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink/60 md:left-12 md:translate-x-0 md:items-start lg:left-20"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Kaydır</span>
            <span className="relative h-10 w-6 rounded-full border border-ink/30">
              <span className="cue-dot absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink" />
            </span>
          </div>
        </div>

        {/* Sparkles — a little shimmer across the hero */}
        <div className="pointer-events-none absolute inset-0 z-30">
          {sparkles.map((s, i) => (
            <span
              key={i}
              className="hero-sparkle absolute text-cream-500"
              data-delay={s.delay}
              style={{
                left: s.left,
                top: s.top,
                fontSize: s.size,
                lineHeight: 1,
                textShadow:
                  "0 0 8px rgba(255,255,255,1), 0 0 20px rgba(255,92,149,0.85)",
              }}
            >
              ✦
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
