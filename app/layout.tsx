import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cream Co. — Nem, Ama Lüks Dokunuşuyla.",
  description:
    "Cream Co.; ışıltı, nem ve günlük lüks üzerine kurulu modern bir cilt bakım markası. Nemlendirici, yüz spreyi, güneş koruyucu ve dudak balmını keşfedin.",
  metadataBase: new URL("https://cream.co"),
  openGraph: {
    title: "Cream Co. — Nem, Ama Lüks Dokunuşuyla.",
    description: "Her gün ışıldayan bir cilt için tasarlanmış bakım.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-milk text-ink antialiased">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
