import { jacksDemo } from "@/lib/config";

// Two inks on paper, like the flyer: red and near-black on white
export const RED = "#D7262E";
// 10% screen tint of the red, for the background trade icons
export const RED_TINT = "#FBE9EA";
export const INK = "#18181A";
export const PAPER = "#FFFFFF";
export const RULE = "#D9D9D5";
export const MUTED = "#55555A";

// Font variables are set by src/app/layout.tsx
export const display = { fontFamily: "var(--font-big-shoulders), sans-serif" };
export const stencil = { fontFamily: "var(--font-big-shoulders-stencil), sans-serif" };
export const mono = { fontFamily: "var(--font-atkinson-mono), monospace" };

export const mailto = `mailto:${jacksDemo.email}`;
export const tel = `tel:${jacksDemo.phone}`;
export const focusRing =
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#18181A]";

// Link-preview image for every Jack's DIY page (WhatsApp, Facebook etc.)
export const SHARE_IMAGE = {
  url: "/images/jacks-diy-demo/share-preview.jpg",
  width: 1200,
  height: 630,
  alt: "A finished media wall by Jack's DIY, with a recessed TV between lit alcoves and acoustic slat panels",
};

export const HOME = "/";
export const SERVICES = "/services";
export const REVIEWS = "/reviews";
export const RECENT_JOBS = "/recent-jobs";
export const PRIVACY = "/privacy";
export const TERMS = "/terms";
