"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const benefits = [
  {
    title: "Temiz Formüller",
    desc: "Zararlı madde yok. Vegan, hayvan dostu ve dermatolojik test edilmiş.",
    icon: "🌿",
  },
  {
    title: "Cilt Bariyeri Desteği",
    desc: "Seramitler ve peptitler bariyerinizi sakin ve dirençli tutar.",
    icon: "🛡️",
  },
  {
    title: "Derin Nemlendirme",
    desc: "Dolgun ve çiy gibi bir cilt için çok ağırlıklı hyaluronik asit.",
    icon: "💧",
  },
  {
    title: "Günlük Lüks",
    desc: "Rutini ritüele dönüştüren ışıltılı dokular ve kokular.",
    icon: "✨",
  },
] as const;

export default function WhyCreamCo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="why"
      ref={ref}
      className="relative overflow-hidden bg-milk px-5 py-28 md:px-10 md:py-40"
    >
      {/* giant editorial type with parallax */}
      <motion.h2
        style={{ x }}
        className="pointer-events-none mb-16 whitespace-nowrap font-serif text-[22vw] font-light leading-none text-cream-200 md:text-[16vw]"
      >
        Farklı Işılda.
      </motion.h2>

      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cream-500">
            Neden Cream Co.
          </p>
          <p className="mt-5 font-serif text-3xl font-light leading-snug text-ink md:text-4xl text-balance">
            Harika bir cildin 12 adımlık bir angarya olmadığına inanıyoruz.
            O, gerçekten dört gözle beklediğiniz
            <span className="italic text-gradient"> özenle hazırlanmış </span>
            birkaç temel üründür.
          </p>
          <a
            href="#products"
            className="btn-gloss mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-milk hover:bg-cream-700 transition-colors"
          >
            Ritüeli keşfet →
          </a>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/70 bg-gradient-to-b from-white/90 to-blush/60 p-7 shadow-glass backdrop-blur-sm transition-shadow duration-500 hover:border-cream-200 hover:shadow-soft"
              >
                {/* soft corner glow that blooms on hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cream-300/40 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* faint index */}
                <span className="pointer-events-none absolute right-5 top-4 font-serif text-5xl leading-none text-cream-300/25 transition-colors duration-500 group-hover:text-cream-300/40">
                  0{i + 1}
                </span>

                {/* icon badge */}
                <div className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cream-100 to-cream-300 text-2xl shadow-[0_10px_25px_-8px_rgba(242,60,124,0.5)] ring-1 ring-white/70 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <span className="drop-shadow-sm">{b.icon}</span>
                </div>

                <h3 className="relative font-serif text-xl text-ink">
                  {b.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-ink/60">
                  {b.desc}
                </p>

                {/* accent underline grows on hover */}
                <span className="mt-5 block h-px w-10 origin-left scale-x-100 bg-gradient-to-r from-cream-500 to-cream-300 transition-transform duration-500 group-hover:scale-x-[2.6]" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
