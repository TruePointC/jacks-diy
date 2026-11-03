import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JacksHeader, JacksFooter } from "@/components/jacks-diy-demo/SiteChrome";
import { RED, MUTED, display, focusRing, HOME, SERVICES } from "@/components/jacks-diy-demo/theme";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function JacksNotFound() {
  return (
    <>
      {/* Set directly too: Next swaps a not-found page's metadata title back to the root one after load */}
      <title>Page not found | Jack&apos;s DIY</title>
      <JacksHeader current="home" />
      <main id="main" className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p style={{ ...display, color: RED }} className="text-8xl leading-none font-black sm:text-9xl">
            404
          </p>
          <h1 style={display} className="mt-4 text-5xl leading-[0.9] font-black uppercase sm:text-7xl">
            This page has gone walkabout
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
            The link might be old or mistyped. Head back home to send Jack your job list, or
            browse everything he does.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={HOME}
              style={{ ...display, backgroundColor: RED }}
              className={`inline-flex min-h-12 items-center justify-center gap-2 px-6 text-xl font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-[#A61C22] ${focusRing}`}
            >
              Back to home
              <ArrowRight size={20} weight="bold" aria-hidden />
            </Link>
            <Link
              href={SERVICES}
              className={`inline-flex min-h-12 items-center justify-center border-2 border-[#18181A] px-6 font-bold ${focusRing}`}
            >
              See every job
            </Link>
          </div>
        </div>
      </main>
      <JacksFooter />
    </>
  );
}
