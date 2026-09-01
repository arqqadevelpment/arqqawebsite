import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted at build time and preloaded, replacing the render-blocking
// @import of fonts.googleapis.com that used to sit at the top of globals.css.
// Inter is a variable font, so omitting `weight` ships one file covering the
// full 200-800 range the design uses instead of six static cuts.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ARQQA — Agencies Sell Creativity. We Deliver Certainty.",
  description:
    "ARQQA is a MarTech Growth System. 13 years, 4 MENA markets, 50+ specialists — one integrated engine for strategy, creative, media, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body suppressHydrationWarning className="min-h-full antialiased bg-stone-950 text-stone-50">
        {children}
      </body>
    </html>
  );
}
