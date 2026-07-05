"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { MouseEvent } from "react";
import Reveal from "./Reveal";

type Product = {
  name: string;
  tagline: string;
  price: string;
  theme: string; // tailwind gradient classes for the "liquid" theme
  bottle: string; // gradient for the bottle
  accent: string;
  tag: string;
  image?: string; // optional real product photo
  hoverImage?: string; // optional photo shown on hover
};

const products: Product[] = [
  {
    name: "Moisturizer",
    tagline: "Su dokunuşuyla nem",
    price: "₺380",
    theme: "from-cream-100 via-cream-200 to-cream-300",
    bottle: "from-cream-300 to-cream-500",
    accent: "text-cream-700",
    tag: "Çok Satan",
    image: "/images/moisturizer.webp",
    hoverImage: "/images/moisturizer-hover.webp",
  },
  {
    name: "Peptide Glow Face Mist",
    tagline: "Çiy tazeliğinde ferahlık",
    price: "₺260",
    theme: "from-blush via-cream-100 to-cream-200",
    bottle: "from-cream-200 to-cream-400",
    accent: "text-cream-600",
    tag: "Günlük",
    image: "/images/facemist.webp",
    hoverImage: "/images/facemist-hover.webp",
  },
  {
    name: "Everyday Pink SPF",
    tagline: "Süt dokunuşuyla koruma",
    price: "₺320",
    theme: "from-milk via-blush to-cream-100",
    bottle: "from-white to-cream-300",
    accent: "text-cream-600",
    tag: "Yeni",
    image: "/images/spf.webp",
    hoverImage: "/images/spf-hover.webp",
  },
  {
    name: "Glow Tint - Bold Burgundy",
    tagline: "Işıltılı böğürtlen parlaklığı",
    price: "₺220",
    theme: "from-cream-200 via-cream-300 to-cream-500",
    bottle: "from-cream-500 to-cream-800",
    accent: "text-cream-800",
    tag: "Favori",
    image: "/images/liptint.webp",
    hoverImage: "/images/liptint-hover.webp",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 16);
    rx.set(-(py - 0.5) * 16);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55), transparent 55%)`;

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="group relative h-[420px] rounded-[2rem] p-1 [transform-style:preserve-3d]"
      >
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br ${product.theme} shadow-soft`}
        >
          {/* glare */}
          <motion.div
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* tag */}
          <div className="absolute left-5 top-5 z-10 glass rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream-800">
            {product.tag}
          </div>
          {/* Visual — photo fills its own area (above the info panel, never cut) */}
          {product.image ? (
            <div className="relative flex-1 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              {product.hoverImage && (
                <img
                  src={product.hoverImage}
                  alt={`${product.name} kullanımı`}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center [transform:translateZ(40px)]">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div
                  className={`h-44 w-24 rounded-[2.2rem] bg-gradient-to-b ${product.bottle} shadow-glow`}
                >
                  <div className="absolute inset-x-3 top-3 h-2/3 rounded-full bg-white/30 blur-md" />
                  <div className="absolute left-1/2 top-2 h-3 w-10 -translate-x-1/2 rounded-full bg-white/50" />
                </div>
                <div className="absolute -bottom-3 left-1/2 h-6 w-28 -translate-x-1/2 rounded-[100%] bg-cream-900/20 blur-lg" />
              </motion.div>
            </div>
          )}

          {/* Info panel — light glass, dark readable text (no dark overlay) */}
          <div className="relative z-10 rounded-b-[2rem] glass p-5 [transform:translateZ(20px)]">
            <h3 className="font-serif text-xl text-ink">{product.name}</h3>
            <p className={`text-sm ${product.accent}`}>{product.tagline}</p>
            <button className="btn-gloss mt-4 w-full rounded-full bg-ink py-3 text-sm font-semibold text-milk transition-colors hover:bg-cream-700">
              Sepete Ekle
            </button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="products" className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cream-500">
              Koleksiyon
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1] text-ink max-w-xl text-balance">
              Dört ikon. <span className="italic text-gradient">Sonsuz ışıltı.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-ink/60">
              Her formül kendi başına küçük bir ritüel — su, sprey, erime ve
              parlaklık. Işıltıyı hissetmek için üzerine gelin.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
