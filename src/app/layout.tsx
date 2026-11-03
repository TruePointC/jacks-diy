import type { Metadata } from "next";
import {
  Big_Shoulders,
  Big_Shoulders_Stencil,
  Atkinson_Hyperlegible_Next,
  Atkinson_Hyperlegible_Mono,
} from "next/font/google";
import "./globals.css";
import { INK, PAPER } from "@/components/jacks-diy-demo/theme";
import { SITE_URL } from "@/lib/site";

// Industrial signage display face, its stencil cut for the wordmark only,
// and a body face picked for legibility (the Fylde coast skews older).
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const bigShouldersStencil = Big_Shoulders_Stencil({
  variable: "--font-big-shoulders-stencil",
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jack's DIY",
    template: "%s | Jack's DIY",
  },
  description:
    "Jack's DIY: a local handyman for small jobs across Cleveleys, Thornton, Fleetwood, Bispham, Poulton and Blackpool.",
  openGraph: {
    siteName: "Jack's DIY",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${bigShoulders.variable} ${bigShouldersStencil.variable} ${atkinson.variable} ${atkinsonMono.variable} flex min-h-full flex-col`}
        style={{
          fontFamily: "var(--font-atkinson), sans-serif",
          backgroundColor: PAPER,
          color: INK,
        }}
      >
        {children}
      </body>
    </html>
  );
}
