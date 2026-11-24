import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, GraduationCap, MapPin, Phone, Plus } from "@phosphor-icons/react/dist/ssr";
import {
  jacksDemo,
  jacksAreas,
  jacksFaqs,
  jacksSteps,
  jacksStrip,
  jacksAllServices,
  jacksReviews,
} from "@/lib/config";
import { FeaturedRoom } from "@/components/jacks-diy-demo/FeaturedRoom";
import { ReviewsSection } from "@/components/jacks-diy-demo/ReviewsSection";
import { RoomScrollTour } from "@/components/jacks-diy-demo/RoomScrollTour";
import { JacksTradeScene } from "@/components/jacks-diy-demo/JacksTradeScene";
import { JacksHeader, JacksFooter } from "@/components/jacks-diy-demo/SiteChrome";
import { JobList } from "@/components/jacks-diy-demo/JobList";
import { AvailabilityWeek, TodayAvailability } from "@/components/jacks-diy-demo/AvailabilityWeek";
import { QuoteRequest } from "@/components/jacks-diy-demo/QuoteRequest";
import { serviceIcons } from "@/components/jacks-diy-demo/serviceIcons";
import {
  RED,
  RED_TINT,
  INK,
  RULE,
  MUTED,
  display,
  mono,
  mailto,
  tel,
  focusRing,
  SERVICES,
  RECENT_JOBS,
  SHARE_IMAGE,
} from "@/components/jacks-diy-demo/theme";

export const metadata: Metadata = {
  description:
    "Jack's DIY: a local handyman for small jobs across Cleveleys, Thornton, Fleetwood, Bispham, Poulton and Blackpool.",
  openGraph: {
    title: "Jack's DIY: small jobs, big difference",
    description: "Handyman for small jobs across Cleveleys, Thornton, Fleetwood, Bispham, Poulton and Blackpool. Tick your jobs and send Jack the list.",
    images: [SHARE_IMAGE],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: jacksFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function JacksDiyDemoPage() {
  return (
    <>
      {/* Flyer icons, fixed behind everything; opaque sections slide over them */}
      <JacksTradeScene tint={RED_TINT} />

      <JacksHeader current="home" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      <main id="main" className="relative z-10">
        {/* New hero: scroll-zoom tour through a sample room, tying straight into the real job list */}
        <RoomScrollTour />

        {/* Full job checklist, now second rather than the very first thing */}
        <section data-trade="hammer" className="border-b-2" style={{ borderColor: INK }}>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-14 sm:px-6 sm:pt-14 lg:grid-cols-[1fr_440px] lg:gap-14 lg:px-8 lg:pt-16 lg:pb-20">
            <div className="lg:pt-6">
              <p style={{ ...mono, color: RED }} className="flex items-start gap-2 text-sm font-semibold">
                <MapPin size={16} weight="fill" aria-hidden className="mt-0.5 shrink-0" />
                {jacksDemo.area}
              </p>
              <h1
                style={display}
                className="mt-5 text-[4.1rem] leading-[0.86] font-black uppercase sm:text-[6.5rem] lg:text-[7.25rem]"
              >
                Got a list of little jobs<span style={{ color: RED }}>?</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lg leading-relaxed sm:text-xl" style={{ color: MUTED }}>
                Tick what needs doing and send it to Jack. Sockets, shelves,
                painting, flat pack: the small stuff that never quite gets done,
                sorted by someone local.
              </p>
              <div className="mt-8">
                <TodayAvailability red={RED} mono={mono} />
              </div>
              <a
                href={tel}
                className={`mt-4 inline-flex items-center gap-2.5 text-xl font-bold underline-offset-4 hover:underline ${focusRing}`}
              >
                <Phone size={22} weight="fill" style={{ color: RED }} aria-hidden />
                Call or text {jacksDemo.phoneDisplay}
              </a>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t-2 pt-5" style={{ borderColor: RULE }}>
                {jacksDemo.values.map((v) => (
                  <li key={v} className="flex items-center gap-2 font-bold">
                    <Check size={18} weight="bold" style={{ color: RED }} aria-hidden />
                    {v}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-[15px]" style={{ color: MUTED }}>
                <GraduationCap size={20} weight="bold" style={{ color: RED }} className="shrink-0" aria-hidden />
                {jacksDemo.qualification}
              </p>
            </div>

            <JobList red={RED} ink={INK} rule={RULE} display={display} mono={mono} />
          </div>
        </section>

        {/* Jack's own work, straight after the hero */}
        <section aria-label="Some of Jack's recent work" className="border-b-2" style={{ borderColor: INK }}>
          <ul className="grid grid-cols-2 gap-[2px] md:grid-cols-4" style={{ backgroundColor: INK }}>
            {jacksStrip.map((photo) => (
              <li key={photo.src} className="relative aspect-square">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                <span
                  style={{ ...display, borderColor: INK }}
                  className="absolute bottom-0 left-0 border-t-2 border-r-2 bg-white px-2.5 py-1 text-base leading-tight font-extrabold uppercase sm:px-3 sm:text-lg"
                >
                  {photo.caption}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works: a real sequence, so the numbers carry meaning */}
        <section aria-labelledby="how-title" className="border-b-2 py-16 sm:py-20" style={{ borderColor: INK }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="how-title" style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
              How it works
            </h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
              {jacksSteps.map((step, i) => (
                <li key={step.title} className={i === 0 ? "md:pr-8" : "md:border-l-2 md:px-8"} style={{ borderColor: INK }}>
                  <span style={{ ...display, color: RED }} className="block text-7xl leading-none font-black" aria-hidden>
                    {i + 1}
                  </span>
                  <h3 style={display} className="mt-3 text-3xl leading-tight font-extrabold uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed" style={{ color: MUTED }}>
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services, printed white-on-red like the flyer's boxes */}
        <section id="services" className="text-white" style={{ backgroundColor: RED }}>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2
              style={display}
              className="text-[3.25rem] leading-[0.9] font-black uppercase sm:text-7xl"
            >
              Small jobs.
              <br />
              Big difference.
            </h2>
            <ul className="mt-12 grid grid-cols-1 gap-px border-2 border-white bg-white sm:grid-cols-2 lg:grid-cols-3">
              {jacksAllServices.map((group) => {
                const IconComponent = serviceIcons[group.icon];
                return (
                  <li key={group.id} style={{ backgroundColor: RED }}>
                    <Link
                      href={`${SERVICES}#${group.id}`}
                      className="group flex h-full items-center gap-4 px-5 py-5 transition-colors duration-150 hover:bg-[#A61C22] focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-white"
                    >
                      <IconComponent size={36} weight="fill" aria-hidden className="shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span style={display} className="block text-2xl leading-tight font-extrabold uppercase">
                          {group.title}
                        </span>
                        <span style={mono} className="text-xs text-white/80">
                          {group.jobs.length} jobs
                        </span>
                      </span>
                      <ArrowRight
                        size={20}
                        weight="bold"
                        aria-hidden
                        className="shrink-0 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-10 text-lg text-white/90">
              <Link href={SERVICES} className={`font-bold text-white underline underline-offset-4 ${focusRing}`}>
                See every job Jack does
              </Link>
              , or if yours isn&rsquo;t listed and it&rsquo;s a small job nearby,{" "}
              <a href="#quote" className={`font-bold text-white underline underline-offset-4 ${focusRing}`}>
                ask anyway
              </a>
              .
            </p>
          </div>
        </section>

        {/* Recent jobs: the living room here, everything else on its own page */}
        <section id="work" data-trade="bolt" className="scroll-mt-32 py-16 sm:py-20 md:scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
                Recent jobs
              </h2>
              <Link
                href={RECENT_JOBS}
                className={`inline-flex items-center gap-1.5 font-bold underline underline-offset-4 ${focusRing}`}
              >
                See all recent jobs
                <ArrowRight size={18} weight="bold" style={{ color: RED }} aria-hidden />
              </Link>
            </div>
            <div className="mt-10">
              <FeaturedRoom />
            </div>
          </div>
        </section>

        {/* Reviews: hides itself if the list's ever empty, see ReviewsSection */}
        <ReviewsSection reviews={jacksReviews} />

        {/* When Jack's free */}
        <section className="border-y-2 py-16 sm:py-20" style={{ borderColor: INK }}>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
            <div>
              <h2 style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
                No need to take time off
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: MUTED }}>
                Jack works every evening from 5pm, and all day on Mondays,
                Fridays and weekends. Pick whatever suits you when you send
                your list.
              </p>
            </div>
            <AvailabilityWeek red={RED} ink={INK} rule={RULE} display={display} mono={mono} />
          </div>
        </section>

        {/* Where Jack works */}
        <section aria-labelledby="areas-title" className="border-b-2 py-16 sm:py-20" style={{ borderColor: INK }}>
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
            <div>
              <h2 id="areas-title" style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
                Where Jack works
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: MUTED }}>
                Based in FY5 and covering the Fylde coast. Just outside these areas? Ask
                anyway.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-[2px] border-2 sm:grid-cols-3" style={{ borderColor: INK, backgroundColor: INK }}>
              {jacksAreas.map((area) => (
                <li key={area.town} className="bg-white px-4 py-5">
                  <span style={display} className="block text-3xl leading-none font-black uppercase">
                    {area.town}
                  </span>
                  <span style={{ ...mono, color: RED }} className="mt-2 block text-sm font-semibold">
                    {area.postcode}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Questions people ask */}
        <section aria-labelledby="faq-title" className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
            <div>
              <h2 id="faq-title" style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
                Questions
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: MUTED }}>
                Anything else, just{" "}
                <a href={mailto} className={`font-bold underline underline-offset-4 ${focusRing}`} style={{ color: INK }}>
                  email Jack
                </a>
                .
              </p>
            </div>
            <div className="border-t-2 bg-white" style={{ borderColor: INK }}>
              {jacksFaqs.map((faq) => (
                <details key={faq.q} className="group border-b-2" style={{ borderColor: INK }}>
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 text-lg font-bold sm:text-xl [&::-webkit-details-marker]:hidden ${focusRing}`}
                  >
                    {faq.q}
                    <Plus
                      size={22}
                      weight="bold"
                      aria-hidden
                      style={{ color: RED }}
                      className="shrink-0 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                    />
                  </summary>
                  <p className="max-w-2xl px-1 pb-6 text-lg leading-relaxed" style={{ color: MUTED }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Send the list */}
        <section id="quote" data-trade="roller" className="scroll-mt-32 py-16 sm:py-20 md:scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-8">
            <div>
              <h2 style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
                Send Jack your list
              </h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: MUTED }}>
                A free quote, no obligation. If you can attach a photo of the
                job to the email, even better.
              </p>
              <dl className="mt-8 grid gap-5 border-t-2 pt-6" style={{ borderColor: RULE }}>
                <div>
                  <dt style={{ ...mono, color: MUTED }} className="text-xs tracking-wider uppercase">
                    Call or text
                  </dt>
                  <dd className="mt-1">
                    <a href={tel} className={`text-xl font-bold underline underline-offset-4 ${focusRing}`}>
                      {jacksDemo.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt style={{ ...mono, color: MUTED }} className="text-xs tracking-wider uppercase">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a href={mailto} className={`font-bold break-all underline underline-offset-4 ${focusRing}`}>
                      {jacksDemo.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt style={{ ...mono, color: MUTED }} className="text-xs tracking-wider uppercase">
                    Covering
                  </dt>
                  <dd className="mt-1 font-bold">
                    {jacksDemo.areas.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt style={{ ...mono, color: MUTED }} className="text-xs tracking-wider uppercase">
                    Training
                  </dt>
                  <dd className="mt-1 font-bold">{jacksDemo.qualification}</dd>
                </div>
              </dl>
            </div>
            <div className="border-2 bg-white p-5 sm:p-8" style={{ borderColor: INK }}>
              <QuoteRequest red={RED} ink={INK} muted={MUTED} rule={RULE} display={display} mono={mono} />
            </div>
          </div>
        </section>
      </main>

      <JacksFooter />
    </>
  );
}
