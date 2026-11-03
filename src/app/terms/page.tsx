import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JacksHeader, JacksFooter } from "@/components/jacks-diy-demo/SiteChrome";
import { jacksDemo } from "@/lib/config";
import { RED, MUTED, RULE, display, mono, mailto, SHARE_IMAGE } from "@/components/jacks-diy-demo/theme";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms covering work booked with Jack's DIY, a local handyman covering Cleveleys, Thornton and the Fylde coast.",
  openGraph: {
    title: "Terms of Service: Jack's DIY",
    description: "The terms covering work booked with Jack's DIY.",
    images: [SHARE_IMAGE],
  },
};

function Section({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t-2 py-8" style={{ borderColor: RULE }}>
      <h2 style={display} className="flex items-baseline gap-3 text-2xl leading-tight font-extrabold uppercase">
        <span style={{ color: RED }}>{number}</span>
        {title}
      </h2>
      <div className="mt-3 grid gap-3 text-[17px] leading-relaxed" style={{ color: MUTED }}>
        {children}
      </div>
    </section>
  );
}

const link = "font-bold underline underline-offset-4";

export default function JacksTermsPage() {
  return (
    <>
      <JacksHeader current="home" />
      <main id="main" className="relative z-10">
        <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:px-8">
          <p style={{ ...mono, color: RED }} className="text-sm font-semibold">
            Last updated: 3 November 2026
          </p>
          <h1 style={display} className="mt-3 text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed" style={{ color: MUTED }}>
            These terms cover any job booked with {jacksDemo.businessName} (&ldquo;Jack&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;), a sole trader covering {jacksDemo.area}. By sending a job list or booking work, you
            agree to these terms.
          </p>

          <Section number="1" title="Quotes">
            <p>
              Quotes are free and no-obligation, based on what you&apos;ve described or shown in photos. The final
              price is confirmed before any work starts. If something comes up once Jack&apos;s on site that
              changes the scope of the job, he&apos;ll agree any change in price with you before continuing.
            </p>
          </Section>

          <Section number="2" title="Booking">
            <p>
              Jack works evenings from 5pm, and all day on Mondays, Fridays, Saturdays and Sundays. A time is
              agreed directly with you when you get in touch — see our{" "}
              <a href={mailto} className={link}>
                quote form
              </a>{" "}
              for how to send your list.
            </p>
          </Section>

          <Section number="3" title="Access to your property">
            <p>
              You&apos;ll need to make sure Jack can safely get to wherever the work is — someone home to let him
              in, or access arranged another way if agreed beforehand. If a visit can&apos;t go ahead because
              there&apos;s no access, it&apos;ll need rearranging.
            </p>
          </Section>

          <Section number="4" title="Changes and cancellations">
            <p>
              Plans change — if you need to move or cancel a booking, let Jack know as early as you can so the
              time can be offered to someone else.
            </p>
          </Section>

          <Section number="5" title="Payment">
            <p>
              Payment is arranged directly with Jack and confirmed before work begins. If materials are needed,
              who&apos;s supplying them (you or Jack) is agreed as part of the quote.
            </p>
          </Section>

          <Section number="6" title="The work itself">
            <p>
              Jack carries out work to a good standard, with reasonable care and skill. For electrical work
              specifically: Jack has completed year one of an Electrical T Level and is now in year two at
              college — he is <strong>not</strong> a qualified or registered electrician. He only takes on small
              electrical jobs within that level of training (sockets, switches, light fittings). Bigger work —
              new circuits, consumer unit changes, or anything notifiable — needs a registered electrician, and
              Jack will say so rather than take it on.
            </p>
          </Section>

          <Section number="7" title="If something's not right">
            <p>
              If you&apos;re not happy with a job, get in touch with Jack directly and as soon as you can so it
              can be put right. Most things are sorted out this way.
            </p>
          </Section>

          <Section number="8" title="Limitation of liability">
            <p>
              Jack isn&apos;t responsible for pre-existing issues with your property that aren&apos;t related to
              the work carried out, or for problems caused by things outside his control. Nothing in these terms
              limits any liability that can&apos;t legally be limited.
            </p>
          </Section>

          <Section number="9" title="Changes to these terms">
            <p>
              These terms may be updated from time to time. The &ldquo;last updated&rdquo; date at the top of
              this page reflects the most recent change.
            </p>
          </Section>

          <Section number="10" title="Governing law">
            <p>These terms are governed by the laws of England and Wales.</p>
          </Section>

          <Section number="11" title="Contact">
            <p>
              Questions about these terms? Email{" "}
              <a href={mailto} className={link}>
                {jacksDemo.email}
              </a>
              .
            </p>
          </Section>
        </div>
      </main>
      <JacksFooter />
    </>
  );
}
