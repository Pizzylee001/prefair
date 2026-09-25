import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const syne = localFont({
  src: [
    {
      path: "../fonts/syne-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/syne-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-syne",
});

const manrope = localFont({
  src: [
    {
      path: "../fonts/manrope-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/manrope-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/manrope-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
});

const mono = localFont({
  src: [
    {
      path: "../fonts/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-mono-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-mono-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prefair.vercel.app"),
  title: {
    default: "PreFair | Cross-Venue Valuation Desk",
    template: "PreFair | %s",
  },
  description:
    "PreFair reads two tokenized pre-IPO venues and lifts every figure to the same basis, the implied value of the whole company. Then it shows the gap and what it means for an amount you enter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        <Nav />
        <main className="wrap">{children}</main>
        <div className="wrap">
          <Footer />
        </div>
      </body>
    </html>
  );
}
