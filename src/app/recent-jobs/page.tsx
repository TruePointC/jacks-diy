import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { jacksBeforeAfter, jacksDemo, jacksWork } from "@/lib/config";
import { JacksTradeScene } from "@/components/jacks-diy-demo/JacksTradeScene";
import { JacksHeader, JacksFooter } from "@/components/jacks-diy-demo/SiteChrome";
import { FeaturedRoom } from "@/components/jacks-diy-demo/FeaturedRoom";
import { RED, RED_TINT, INK, MUTED, display, mono, tel, HOME, SHARE_IMAGE } from "@/components/jacks-diy-demo/theme";

export const metadata: Metadata = {
  title: "Recent jobs",
  description:
    "Recent jobs by Jack's DIY: a living room makeover with acoustic panelling and a media wall, socket swaps and outdoor lighting across the Fylde coast.",
  openGraph: {
    title: "Recent jobs by Jack's DIY",
    description: "A living room makeover with acoustic panelling and a media wall, plus socket swaps and outdoor lighting. Jack's own photos.",
    images: [SHARE_IMAGE],
  },
};

export default function JacksDiyRecentJobsPage() {
  return (
    <>
      <JacksTradeScene tint={RED_TINT} />

      <JacksHeader current="work" />

      <main id="main" className="relative z-10">
        <section data-trade="hammer" className="border-b-2" style={{ borderColor: INK }}>
          <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
            <p style={{ ...mono, color: RED }} className="flex items-start gap-2 text-sm font-semibold">
              <MapPin size={16} weight="fill" aria-hidden className="mt-0.5 shrink-0" />
              {jacksDemo.area}
            </p>
            <h1
              style={display}
              className="mt-5 text-[3.6rem] leading-[0.88] font-black uppercase sm:text-[5.5rem] lg:text-[6.5rem]"
            >
              Recent jobs
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: MUTED }}>
              Jack&rsquo;s own photos from real jobs, not stock images. From a full living room
              makeover to swapping a single socket.
            </p>
          </div>
        </section>

        <section data-trade="bolt" aria-label="Living room makeover" className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FeaturedRoom />
          </div>
        </section>

        <section data-trade="roller" aria-label="Smaller jobs" className="pb-16 sm:pb-20">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:px-8">
            {/* Before and after, side by side */}
            <article className="border-2 bg-white p-4 sm:p-5" style={{ borderColor: INK }}>
              <h2 style={display} className="text-2xl font-extrabold uppercase">
                {jacksBeforeAfter.title}: before &amp; after
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(["before", "after"] as const).map((key) => (
                  <figure key={key} className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={jacksBeforeAfter[key].src}
                      alt={jacksBeforeAfter[key].alt}
                      fill
                      sizes="(min-width: 1024px) 300px, 50vw"
                      className="object-cover object-[center_20%]"
                    />
                    <figcaption
                      style={{ ...mono, backgroundColor: key === "after" ? RED : INK }}
                      className="absolute top-0 left-0 px-2.5 py-1 text-xs font-semibold tracking-wider text-white uppercase"
                    >
                      {key}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {jacksWork.map((job) => (
                <figure
                  key={job.src}
                  className="relative aspect-[4/5] overflow-hidden border-2 lg:aspect-auto lg:min-h-[220px]"
                  style={{ borderColor: INK }}
                >
                  <Image src={job.src} alt={job.alt} fill sizes="(min-width: 1024px) 460px, 50vw" className="object-cover" />
                  <figcaption
                    style={display}
                    className="absolute bottom-0 left-0 border-t-2 border-r-2 bg-white px-3 py-1.5 text-lg leading-tight font-extrabold uppercase sm:text-xl"
                  >
                    {job.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="text-white" style={{ backgroundColor: RED }}>
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div>
              <h2 style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
                Got a job like these?
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                Tick what you need and send the list to Jack for a free quote.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`${HOME}#quote`}
                style={display}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 text-xl font-extrabold tracking-wide uppercase transition-colors duration-150 hover:bg-[#F3F3F1] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Send Jack your list
                <ArrowRight size={20} weight="bold" aria-hidden />
              </Link>
              <a href={tel} className="text-xl font-bold whitespace-nowrap text-white underline underline-offset-4">
                or call {jacksDemo.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

      <JacksFooter />
    </>
  );
}
