import type { Metadata } from "next";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { jacksDemo, jacksReviews } from "@/lib/config";
import { JacksTradeScene } from "@/components/jacks-diy-demo/JacksTradeScene";
import { JacksHeader, JacksFooter } from "@/components/jacks-diy-demo/SiteChrome";
import { ReviewsSection } from "@/components/jacks-diy-demo/ReviewsSection";
import { RED, RED_TINT, INK, MUTED, display, mono, SHARE_IMAGE } from "@/components/jacks-diy-demo/theme";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What people say about Jack's DIY, a local handyman covering Cleveleys, Thornton and the Fylde coast.",
  openGraph: {
    title: "Reviews: Jack's DIY",
    description: "What people say about Jack's DIY.",
    images: [SHARE_IMAGE],
  },
};

export default function JacksReviewsPage() {
  return (
    <>
      <JacksTradeScene tint={RED_TINT} />

      <JacksHeader current="reviews" />

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
              What people say
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: MUTED }}>
              Real feedback from real customers across {jacksDemo.areas.slice(0, -1).join(", ")} and{" "}
              {jacksDemo.areas.at(-1)}.
            </p>
          </div>
        </section>

        {jacksReviews.length ? (
          <ReviewsSection reviews={jacksReviews} showHeading={false} />
        ) : (
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              No reviews yet — check back soon, or be one of Jack&rsquo;s first.
            </p>
          </div>
        )}
      </main>

      <JacksFooter />
    </>
  );
}
