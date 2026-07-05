"use client";

import { Marquee } from "@/components/ui/3d-testimonails";
import Reveal from "./Reveal";

// Posts pulled from @creamco (creamco.com.tr Instafeed), images self-hosted in /public/images/instagram
const posts = [
  { img: "/images/instagram/ig-01.jpg", href: "https://www.instagram.com/p/DaLRdaTCCc3", reel: false },
  { img: "/images/instagram/ig-02.jpg", href: "https://www.instagram.com/p/DaDX0qfCIXx", reel: false },
  { img: "/images/instagram/ig-03.jpg", href: "https://www.instagram.com/p/DZ9pq9ViNxb", reel: false },
  { img: "/images/instagram/ig-04.jpg", href: "https://www.instagram.com/p/DZ5DN02CE5M", reel: false },
  { img: "/images/instagram/ig-05.jpg", href: "https://www.instagram.com/p/DZ2WUT2CN4w", reel: false },
  { img: "/images/instagram/ig-06.jpg", href: "https://www.instagram.com/p/DZzoGPPCDEw", reel: false },
  { img: "/images/instagram/ig-07.jpg", href: "https://www.instagram.com/p/DZxH4wLiLfU", reel: false },
  { img: "/images/instagram/ig-08.jpg", href: "https://www.instagram.com/p/DZulNqaCBtI", reel: false },
  { img: "/images/instagram/ig-09.jpg", href: "https://www.instagram.com/p/DZpWW6jiA2o", reel: false },
  { img: "/images/instagram/ig-10.jpg", href: "https://www.instagram.com/p/DZhaZouiMwv", reel: false },
  { img: "/images/instagram/ig-11.jpg", href: "https://www.instagram.com/p/DZcyp9SiCiW", reel: false },
  { img: "/images/instagram/ig-12.jpg", href: "https://www.instagram.com/reel/DZKg4Yeone5", reel: true },
  { img: "/images/instagram/ig-13.jpg", href: "https://www.instagram.com/p/DZFSrAziHI2", reel: false },
  { img: "/images/instagram/ig-14.jpg", href: "https://www.instagram.com/p/DY981G6iA65", reel: false },
  { img: "/images/instagram/ig-15.jpg", href: "https://www.instagram.com/reel/DY66xE2oGhy", reel: true },
  { img: "/images/instagram/ig-16.jpg", href: "https://www.instagram.com/reel/DY4O_QkoRCG", reel: true },
];

const INSTA_URL = "https://www.instagram.com/creamco/";

// Split posts across columns so each scrolling column shows a distinct subset (fewer duplicates, lighter)
const COLUMN_COUNT = 6;
const columnPosts = Array.from({ length: COLUMN_COUNT }, (_, c) =>
  posts.filter((_, i) => i % COLUMN_COUNT === c),
);
const colMeta = [
  { reverse: false, show: "" },
  { reverse: true, show: "" },
  { reverse: false, show: "hidden sm:flex" },
  { reverse: true, show: "hidden md:flex" },
  { reverse: false, show: "hidden lg:flex" },
  { reverse: true, show: "hidden lg:flex" },
];

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function PostTile({ img, href, reel }: (typeof posts)[number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square w-56 shrink-0 overflow-hidden rounded-2xl bg-cream-100 shadow-[0_2px_10px_rgba(157,29,77,0.08)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt="cream co. Instagram gönderisi"
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {reel && (
        <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-cream-900/55 via-cream-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <InstagramGlyph className="h-8 w-8 text-white drop-shadow" />
      </div>
    </a>
  );
}

export default function InstagramFeed() {
  return (
    <section
      id="instagram"
      className="relative overflow-hidden bg-milk px-5 py-28 md:px-10 md:py-32"
    >
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cream-500">
            @creamco
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light text-ink md:text-6xl">
            Bize <span className="italic text-gradient">Instagram’da</span> katıl
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink/60">
            Işıltı rutinlerini, ipuçlarını ve topluluğumuzu keşfet.
          </p>
          <a
            href={INSTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gloss mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-milk transition-colors hover:bg-cream-700"
          >
            <InstagramGlyph className="h-5 w-5" />
            @creamco’yu takip et
          </a>
        </div>
      </Reveal>

      {/* full-bleed 3D scrolling wall (same template as testimonials) */}
      <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2">
        <div className="relative flex h-[560px] w-full items-center justify-center overflow-hidden [perspective:700px]">
          <div
            className="flex flex-row items-center gap-4 [transform-style:preserve-3d] [will-change:transform]"
            style={{
              transform:
                "translateZ(-60px) rotateX(14deg) rotateY(-6deg) rotateZ(10deg) scale(1.15)",
            }}
          >
            {columnPosts.map((cp, i) => (
              <Marquee
                key={i}
                vertical
                pauseOnHover
                reverse={colMeta[i].reverse}
                repeat={3}
                className={`[--duration:60s] [transform:translateZ(0)] ${colMeta[i].show}`}
              >
                {cp.map((post) => (
                  <PostTile key={post.img} {...post} />
                ))}
              </Marquee>
            ))}
          </div>

          {/* edge fades into the section background */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-milk" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-milk" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-milk" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-milk" />
        </div>
      </div>
    </section>
  );
}
