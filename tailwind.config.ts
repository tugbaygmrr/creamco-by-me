import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          // soft pinks -> deep berry
          50: "#fff5f8",
          100: "#ffe8f0",
          200: "#ffd1e3",
          300: "#ffb0cd",
          400: "#ff86b0",
          500: "#ff5c95",
          600: "#f23c7c",
          700: "#c92763",
          800: "#9c1d4d",
          900: "#6d1437",
        },
        milk: "#fffaf6",
        blush: "#ffeef4",
        ink: "#2a0d1c",
        // shadcn semantic tokens (mapped to the CreamCo palette)
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px -15px rgba(242, 60, 124, 0.45)",
        glass: "0 8px 40px rgba(157, 29, 77, 0.12)",
        soft: "0 30px 80px -30px rgba(157, 29, 77, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(3deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%, 100%": { borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%" },
          "50%": { borderRadius: "58% 42% 33% 67% / 63% 51% 49% 37%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        floatSlow: "floatSlow 9s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        blob: "blob 12s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration, 40s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
