"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Mağaza", href: "#products" },
  { label: "Deneyim", href: "#experience" },
  { label: "Neden Cream Co", href: "#why" },
  { label: "Yorumlar", href: "#reviews" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Adapt the header color to whatever section sits under it.
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-dark]")
    );
    if (!targets.length) return;

    const active = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) active.add(e.target);
          else active.delete(e.target);
        });
        setDark(active.size > 0);
      },
      // A thin band at the very top (where the header sits).
      { rootMargin: "0px 0px -92% 0px", threshold: 0 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 pt-4"
      >
        {/* distinct floating bar so the header separates cleanly from every section */}
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-colors duration-500 md:px-6 ${
            dark
              ? "border-white/15 bg-ink/85 shadow-[0_12px_34px_rgba(0,0,0,0.4)]"
              : "border-cream-200 bg-milk/90 shadow-[0_12px_34px_rgba(242,60,124,0.16)]"
          }`}
        >
          <a href="#top" className="group">
            <span
              className={`font-serif text-2xl md:text-3xl font-bold lowercase tracking-tight transition-colors ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              cream co.
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  dark
                    ? "text-white/90 hover:bg-white/15 hover:text-white"
                    : "text-cream-800 hover:bg-cream-100/70 hover:text-cream-600"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#products"
              className={`btn-gloss hidden sm:inline-flex items-center gap-2 rounded-full text-sm font-semibold px-5 py-2.5 transition-colors ${
                dark
                  ? "bg-milk text-ink hover:bg-white"
                  : "bg-ink text-milk hover:bg-cream-700"
              }`}
            >
              Hemen Al
            </a>
            <button
              aria-label="Menü"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden grid place-items-center h-10 w-10 rounded-full glass"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-5 ${dark ? "bg-white" : "bg-ink"} transition-transform ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 ${dark ? "bg-white" : "bg-ink"} transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 ${dark ? "bg-white" : "bg-ink"} transition-transform ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-cream-900/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-24 left-5 right-5 glass rounded-3xl p-6 shadow-soft"
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl py-2 text-ink hover:text-cream-600 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#products"
                  onClick={() => setOpen(false)}
                  className="btn-gloss mt-3 text-center rounded-full bg-ink text-milk font-semibold py-3"
                >
                  Hemen Al
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
