"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonails";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Maya R.",
    username: "@mayaglows",
    body: "Cildim hiç bu kadar çiy gibi görünmemişti. Nemlendirici anında yediriliyor.",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    country: "🇹🇷 İstanbul",
  },
  {
    name: "Selin K.",
    username: "@selinskin",
    body: "Yüz spreyine bayıldım. Adeta bir şişede lüks bir deneyim.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    country: "🇹🇷 İzmir",
  },
  {
    name: "Aria L.",
    username: "@arialux",
    body: "Böğürtlen dudak balmı artık her günüm. Işıltılı ve rengi mükemmel.",
    img: "https://randomuser.me/api/portraits/women/53.jpg",
    country: "🇬🇧 Londra",
  },
  {
    name: "Jordan P.",
    username: "@jordancares",
    body: "Sonunda makyajın altında topaklanmayan bir güneş koruyucu.",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
    country: "🇮🇹 Milano",
  },
  {
    name: "Emma L.",
    username: "@emmalee",
    body: "Pürüzsüz doku ve pembe ışıltı. Rutinimin favorisi oldu.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    country: "🇨🇦 Toronto",
  },
  {
    name: "Noah S.",
    username: "@noahs",
    body: "Bariyer desteği gerçekten hissediliyor, cildim çok daha sakin.",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    country: "🇺🇸 New York",
  },
  {
    name: "Lucas B.",
    username: "@lucasb",
    body: "Vegan, hafif ve inanılmaz güzel kokuyor. Bayıldım.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    country: "🇫🇷 Paris",
  },
  {
    name: "Haruto S.",
    username: "@haru",
    body: "Nem bariyerim güçlendi, gün boyu dolgun bir cilt.",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
    country: "🇯🇵 Tokyo",
  },
  {
    name: "Ana M.",
    username: "@anam",
    body: "Hyaluronik asit karışımı harika. Cildim çiy gibi ışıldıyor.",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    country: "🇩🇪 Berlin",
  },
];

// Column layout: fewer columns on small screens (perf), more on wide screens (fills the sides)
const columns = [
  { reverse: false, show: "" },
  { reverse: true, show: "" },
  { reverse: false, show: "hidden sm:flex" },
  { reverse: true, show: "hidden md:flex" },
  { reverse: false, show: "hidden md:flex" },
  { reverse: true, show: "hidden lg:flex" },
  { reverse: false, show: "hidden xl:flex" },
];

function TestimonialCard({
  img,
  name,
  username,
  body,
  country,
}: (typeof testimonials)[number]) {
  return (
    <Card className="w-60 shrink-0 rounded-2xl border-cream-100 bg-white shadow-[0_2px_10px_rgba(157,29,77,0.06)]">
      <CardContent className="p-5">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9 ring-2 ring-cream-100">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="flex items-center gap-1 text-sm font-medium text-ink">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-ink/45">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm leading-relaxed text-ink/70">
          {body}
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-milk px-5 py-28 md:px-10 md:py-36"
    >
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cream-500">
            Sosyal Kanıt
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light text-ink md:text-6xl">
            Dünya çapında{" "}
            <span className="italic text-gradient">seviliyor.</span>
          </h2>
        </div>
      </Reveal>

      {/* full-bleed 3D wall: breaks out of the section padding to fill the sides */}
      <div className="relative left-1/2 mt-16 w-screen -translate-x-1/2">
        <div className="relative flex h-[560px] w-full items-center justify-center overflow-hidden [perspective:700px]">
          <div
            className="flex flex-row items-center gap-4 [transform-style:preserve-3d] [will-change:transform]"
            style={{
              transform:
                "translateZ(-60px) rotateX(14deg) rotateY(-6deg) rotateZ(10deg) scale(1.15)",
            }}
          >
            {columns.map((col, i) => (
              <Marquee
                key={i}
                vertical
                pauseOnHover
                reverse={col.reverse}
                repeat={2}
                className={`[--duration:55s] [transform:translateZ(0)] ${col.show}`}
              >
                {testimonials.map((review) => (
                  <TestimonialCard key={review.username} {...review} />
                ))}
              </Marquee>
            ))}
          </div>

          {/* Gradient overlays fade the wall into the section background at the true edges */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-milk" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-milk" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-milk" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-milk" />
        </div>
      </div>
    </section>
  );
}
