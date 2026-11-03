import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { jacksAllServices, jacksDemo } from "@/lib/config";
import { JacksTradeScene } from "@/components/jacks-diy-demo/JacksTradeScene";
import { JacksHeader, JacksFooter } from "@/components/jacks-diy-demo/SiteChrome";
import { ServiceChecklist } from "@/components/jacks-diy-demo/ServiceChecklist";
import { TickedBar } from "@/components/jacks-diy-demo/TickedBar";
import { serviceIcons } from "@/components/jacks-diy-demo/serviceIcons";
import {
  RED,
  RED_TINT,
  INK,
  MUTED,
  display,
  mono,
  tel,
  focusRing,
  HOME,
  SHARE_IMAGE,
} from "@/components/jacks-diy-demo/theme";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every job Jack's DIY does, from sockets and TV mounting to shelves, flat pack and painting, across Cleveleys, Thornton, Fleetwood, Bispham, Poulton and Blackpool.",
  openGraph: {
    title: "Every job Jack's DIY does",
    description: "Sockets, lights and TV mounting, shelves, flat pack, painting and more across the Fylde coast. Tick what you need and send the list.",
    images: [SHARE_IMAGE],
  },
};

const totalJobs = jacksAllServices.reduce((n, group) => n + group.jobs.length, 0);

export default function JacksDiyServicesPage() {
  return (
    <>
      <JacksTradeScene tint={RED_TINT} />

      <JacksHeader current="services" />

      <main id="main" className="relative z-10">
        {/* Intro with a jump menu to each category */}
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
              Every job Jack does
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: MUTED }}>
              Small jobs around the house across {jacksDemo.areas.slice(0, -1).join(", ")} and{" "}
              {jacksDemo.areas.at(-1)}. Tick everything you need and send the list to Jack in
              one go.
            </p>
            <p style={mono} className="mt-6 text-sm">
              {totalJobs} jobs in {jacksAllServices.length} categories
            </p>

            <nav aria-label="Service categories" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {jacksAllServices.map((group) => {
                  const IconComponent = serviceIcons[group.icon];
                  return (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className={`inline-flex min-h-11 items-center gap-2 border-2 bg-white px-3 text-[15px] font-bold transition-colors duration-150 hover:border-[#D7262E] ${focusRing}`}
                        style={{ borderColor: INK }}
                      >
                        <IconComponent size={20} weight="fill" style={{ color: RED }} aria-hidden />
                        {group.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </section>

        {/* One block per category */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {jacksAllServices.map((group, i) => {
            const IconComponent = serviceIcons[group.icon];
            return (
              <section
                key={group.id}
                id={group.id}
                data-trade={group.trade}
                aria-labelledby={`${group.id}-title`}
                className={`grid scroll-mt-36 gap-6 py-10 sm:py-12 md:scroll-mt-24 lg:grid-cols-[320px_1fr] lg:gap-12 ${i > 0 ? "border-t-2" : ""}`}
                style={{ borderColor: INK }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <IconComponent size={44} weight="fill" style={{ color: RED }} aria-hidden className="shrink-0" />
                    <h2
                      id={`${group.id}-title`}
                      style={display}
                      className="text-4xl leading-[0.95] font-black uppercase sm:text-5xl"
                    >
                      {group.title}
                    </h2>
                  </div>
                  <p style={{ ...mono, color: MUTED }} className="mt-3 text-sm">
                    {group.jobs.length} jobs
                  </p>
                  <Link
                    href={`${HOME}#quote`}
                    className={`mt-4 hidden items-center gap-1.5 font-bold underline underline-offset-4 lg:inline-flex ${focusRing}`}
                  >
                    Get a quote
                    <ArrowRight size={16} weight="bold" aria-hidden />
                  </Link>
                </div>

                <ServiceChecklist jobs={group.jobs} red={RED} ink={INK} />
              </section>
            );
          })}
        </div>

        {/* Not listed? */}
        <section className="text-white" style={{ backgroundColor: RED }}>
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div>
              <h2 style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
                Can&rsquo;t see your job?
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                If it&rsquo;s a small job around the house, Jack can probably help. Send a quick
                message with what needs doing.
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
                {jacksDemo.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

      <JacksFooter />
      {/* Room for the send bar so it never covers the footer */}
      <div aria-hidden className="h-[70px]" style={{ backgroundColor: INK }} />

      <TickedBar red={RED} ink={INK} display={display} mono={mono} />
    </>
  );
}
