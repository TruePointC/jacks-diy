import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JacksHeader, JacksFooter } from "@/components/jacks-diy-demo/SiteChrome";
import { jacksDemo } from "@/lib/config";
import { RED, MUTED, RULE, display, mono, mailto, SHARE_IMAGE } from "@/components/jacks-diy-demo/theme";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Jack's DIY collects, uses and protects your personal data, in line with UK GDPR and the Data Protection Act 2018.",
  openGraph: {
    title: "Privacy Policy: Jack's DIY",
    description: "How Jack's DIY collects, uses and protects your personal data.",
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

export default function JacksPrivacyPage() {
  return (
    <>
      <JacksHeader current="home" />
      <main id="main" className="relative z-10">
        <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:px-8">
          <p style={{ ...mono, color: RED }} className="text-sm font-semibold">
            Last updated: 3 November 2026
          </p>
          <h1 style={display} className="mt-3 text-5xl leading-[0.9] font-black uppercase sm:text-6xl" >
            Privacy Policy
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed" style={{ color: MUTED }}>
            {jacksDemo.businessName} (&ldquo;Jack&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a sole
            trader handyman business covering {jacksDemo.area}. This policy explains what personal
            data this website collects, why, and how it&apos;s looked after, in line with UK GDPR
            and the Data Protection Act 2018.
          </p>

          <Section number="1" title="Who we are">
            <p>
              Jack, trading as {jacksDemo.businessName}, is the data controller for the personal
              data described in this policy. This website was built by TruePoint Consulting, but
              TruePoint doesn&apos;t receive, store or process any data you submit through it —
              see Section 4 for exactly how your information actually gets to Jack.
            </p>
          </Section>

          <Section number="2" title="What data we collect">
            <p>If you send a job list or enquiry through this site, you may share:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Your name</li>
              <li>Job address or postcode (optional)</li>
              <li>Details of the job(s) you need doing</li>
              <li>Your preferred time for the work</li>
              <li>Any photos you choose to attach</li>
            </ul>
            <p>
              This site does not use tracking or analytics cookies. See Section 9 for the one
              thing it does store in your browser — your ticked job list — which isn&apos;t a
              cookie and isn&apos;t sent anywhere by itself.
            </p>
          </Section>

          <Section number="3" title="How we use your data">
            <p>Jack uses the information you send to:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Work out what the job involves and give you a quote</li>
              <li>Arrange and carry out the work you&apos;ve agreed to</li>
              <li>Keep basic records of jobs done, for his own accounts</li>
            </ul>
            <p>Your data isn&apos;t sold, and isn&apos;t used for marketing.</p>
          </Section>

          <Section number="4" title="How your quote request is actually sent">
            <p>
              The &ldquo;Send Jack your list&rdquo; form on this site has no server behind it.
              When you submit it, your browser opens a pre-filled email in your own email app —
              nothing is uploaded or saved anywhere at that point. The email only actually sends
              once <em>you</em> press send in your own mail app, and it goes directly to Jack&apos;s
              inbox at {jacksDemo.email}. TruePoint Consulting, who built this site, never sees
              or holds a copy of it.
            </p>
            <p>
              Jack&apos;s email is hosted by Microsoft (Outlook). Once your message reaches his
              inbox, it&apos;s subject to Microsoft&apos;s own handling of email, covered by their
              privacy policy at{" "}
              <a
                href="https://privacy.microsoft.com/en-gb/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                privacy.microsoft.com
              </a>
              .
            </p>
          </Section>

          <Section number="5" title="Legal basis for processing">
            <p>
              Jack processes your data on the basis of: taking steps at your request before
              entering into a contract (quoting a job), performance of a contract (once you book
              him in), and legitimate interests (keeping basic job records).
            </p>
          </Section>

          <Section number="6" title="Who we share data with">
            <p>
              Jack doesn&apos;t share your data with anyone else to run his business. The only
              other party involved is technical, not something Jack chooses on a per-enquiry
              basis:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                This website itself is hosted on Vercel, which automatically logs standard
                technical information (like IP address and browser
                type) for every visit, the same as any website. Vercel&apos;s privacy policy is
                at{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  vercel.com/legal/privacy-policy
                </a>
                . This is separate from, and doesn&apos;t include, anything you type into the
                quote form — see Section 4.
              </li>
            </ul>
          </Section>

          <Section number="7" title="How long we keep your data">
            <p>
              Once your quote request reaches Jack&apos;s inbox, he keeps it for as long as he
              needs it for the job and his own basic records, then deletes it. Nothing is kept
              anywhere else.
            </p>
          </Section>

          <Section number="8" title="Your rights">
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Access the personal data Jack holds about you</li>
              <li>Ask him to correct inaccurate data</li>
              <li>Ask him to delete your data</li>
              <li>Object to or restrict certain processing</li>
            </ul>
            <p>
              To exercise any of these, email{" "}
              <a href={mailto} className={link}>
                {jacksDemo.email}
              </a>
              . You can also complain to the Information Commissioner&apos;s Office (ICO) at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                ico.org.uk
              </a>{" "}
              if you have concerns about how your data is handled.
            </p>
          </Section>

          <Section number="9" title="Cookies and local storage">
            <p>
              This site doesn&apos;t use tracking or analytics cookies. When you tick jobs on the
              list, they&apos;re remembered in your browser&apos;s local session storage so they
              carry across pages while you browse — this stays on your own device, isn&apos;t a
              cookie, and clears itself when you close the tab. It&apos;s never sent anywhere
              unless you choose to submit the quote form (see Section 4).
            </p>
          </Section>

          <Section number="10" title="Children's data">
            <p>
              This site is aimed at homeowners and landlords, not children. Jack doesn&apos;t
              knowingly collect personal data from anyone under 13, and will delete it immediately
              if he becomes aware that he has.
            </p>
          </Section>

          <Section number="11" title="Changes to this policy">
            <p>
              This policy may be updated from time to time. The &ldquo;last updated&rdquo; date
              at the top of this page reflects the most recent change.
            </p>
          </Section>

          <Section number="12" title="Contact">
            <p>
              Questions about this policy or your data? Email{" "}
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
