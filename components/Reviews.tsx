"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

const reviews = [
  {
    name: "Maya R.",
    handle: "@mayaglows",
    text: "Cildim hiç bu kadar çiy gibi görünmemişti. Nemlendirici anında yediriliyor ve ışıltı inanılmaz.",
    rating: 5,
  },
  {
    name: "Selin K.",
    handle: "@selinskin",
    text: "Yüz spreyine bayıldım. Adeta bir şişede lüks bir deneyim.",
    rating: 5,
  },
  {
    name: "Jordan P.",
    handle: "@jordancares",
    text: "Sonunda makyajın altında topaklanmayan bir güneş koruyucu. Süt dokunuşlu bitiş harika.",
    rating: 5,
  },
  {
    name: "Aria L.",
    handle: "@arialux",
    text: "Böğürtlen dudak balmı artık her günüm. Işıltılı, nemlendirici ve rengi mükemmel.",
    rating: 5,
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const go = (dir: number) =>
    setIndex((i) => (i + dir + reviews.length) % reviews.length);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 to-blush px-5 py-28 md:px-10 md:py-36"
    >
      {/* floating soft blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-blob bg-cream-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 animate-blob bg-cream-300/50 blur-3xl [animation-delay:3s]" />

      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cream-500">
            40.000+ ışıltı tutkunu tarafından seviliyor
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light text-ink md:text-6xl">
            Farkı <span className="italic text-gradient">hissettiler.</span>
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 h-[260px] max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] glass p-8 shadow-soft md:p-12"
            >
              <div className="mb-4 text-cream-400">
                {"★".repeat(reviews[index].rating)}
              </div>
              <blockquote className="font-serif text-2xl font-light leading-snug text-ink md:text-3xl text-balance">
                “{reviews[index].text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-gradient-to-br from-cream-300 to-cream-600" />
                <span className="text-left">
                  <span className="block font-semibold text-ink">
                    {reviews[index].name}
                  </span>
                  <span className="block text-sm text-cream-600">
                    {reviews[index].handle}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            aria-label="Önceki yorum"
            onClick={() => go(-1)}
            className="grid h-12 w-12 place-items-center rounded-full glass text-ink transition-transform hover:scale-110 active:scale-95"
          >
            ←
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`${i + 1}. yoruma git`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-cream-600" : "w-2 bg-cream-300"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Sonraki yorum"
            onClick={() => go(1)}
            className="grid h-12 w-12 place-items-center rounded-full glass text-ink transition-transform hover:scale-110 active:scale-95"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
