"use client";

const items = [
  "Hyaluronik Asit",
  "✦",
  "Peptitler",
  "✦",
  "Temiz Formüller",
  "✦",
  "Bariyer Desteği",
  "✦",
  "Farklı Işılda",
  "✦",
  "Vegan & Hayvan Dostu",
  "✦",
  "Dermatolojik Test",
  "✦",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-cream-200 bg-cream-50 py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className={`font-serif text-2xl md:text-3xl ${
              t === "✦" ? "text-cream-400" : "text-cream-800/70 italic"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
