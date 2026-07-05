"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const ingredients = [
  {
    name: "Peptitler",
    desc: "Zamanla gözle görülür şekilde daha sıkı ve dolgun cilt.",
    pos: "top-[12%] left-[8%]",
  },
  {
    name: "Hyaluronik Asit",
    desc: "Ağırlığının 1000 katına kadar su tutar.",
    pos: "top-[20%] right-[8%]",
  },
  {
    name: "Niasinamid",
    desc: "Ton eşitler ve gözeneklerin görünümünü iyileştirir.",
    pos: "bottom-[18%] left-[10%]",
  },
  {
    name: "Seramitler",
    desc: "Sağlıklı nem bariyerini güçlendirir.",
    pos: "bottom-[14%] right-[10%]",
  },
];

const panels = [
  { title: "Dokunuş", copy: "Her şey suyla başlar." },
  { title: "Emilim", copy: "Aktifler derinlere işler." },
  { title: "Kilit", copy: "Bariyer mühürlenir, ışıltı başlar." },
];

export default function ProductExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // horizontal panels drift
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.95]);

  return (
    <section
      id="experience"
      ref={ref}
      data-nav-dark
      className="relative h-[300vh] bg-ink"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* ambient pink glow */}
        <div className="absolute left-1/2 top-1/2 -z-0 h-[140%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-600/30 blur-[120px]" />

        <div className="relative z-10 px-5 pt-28 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cream-300">
            Ürün Deneyimi
          </p>
          <h2 className="mt-2 max-w-2xl font-serif text-3xl font-light text-milk md:text-5xl">
            Kaydırdıkça formülün canlandığını izleyin.
          </h2>
        </div>

        {/* center rotating product + orbiting ingredients */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          {/* orbit ring */}
          <motion.div
            style={{ rotate }}
            className="absolute h-[460px] w-[460px] rounded-full border border-dashed border-white/15 md:h-[560px] md:w-[560px]"
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cream-300" />
          </motion.div>

          {/* static glow behind the product (cheaper than a filter on the rotating image) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-500/35 blur-3xl" />

          {/* moisturizer */}
          <motion.div
            style={{ scale: bottleScale, rotate }}
            className="relative z-10"
          >
            <Image
              src="/images/creamco-moisturizer.png"
              alt="cream co. Nemlendirici"
              width={288}
              height={288}
              priority
              className="h-64 w-64 object-contain md:h-72 md:w-72"
            />
          </motion.div>

          {/* ingredients */}
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              className={`absolute ${ing.pos} max-w-[200px]`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-2xl border border-white/15 bg-[#3a1226]/70 p-4 text-left"
              >
                <p className="font-serif text-lg text-milk">{ing.name}</p>
                <p className="mt-1 text-xs leading-snug text-cream-100/80">
                  {ing.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* horizontal drifting captions */}
        <motion.div
          style={{ x }}
          className="relative z-10 flex w-max gap-8 pb-16 pl-5 md:pl-10"
        >
          {panels.map((p, i) => (
            <div
              key={p.title}
              className="w-[70vw] max-w-md rounded-3xl border border-white/15 bg-[#3a1226]/70 p-6 md:w-[40vw]"
            >
              <span className="font-serif text-5xl text-cream-300/40">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-serif text-2xl text-milk">{p.title}</h3>
              <p className="mt-1 text-cream-100/80">{p.copy}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
