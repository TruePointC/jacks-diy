import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { jacksDemo } from "@/lib/config";
import { TRUEPOINT_URL } from "@/lib/site";
import { JacksMark } from "./JacksMark";
import { RED, INK, display, stencil, mono, mailto, tel, focusRing, HOME, SERVICES, REVIEWS, RECENT_JOBS, PRIVACY } from "./theme";

export function Wordmark({ size }: { size: "sm" | "lg" }) {
  return (
    <span className="flex items-center gap-2">
      <span style={{ color: RED }}>
        <JacksMark size={size === "lg" ? 40 : 34} />
      </span>
      <span
        style={stencil}
        className={`${size === "lg" ? "text-[2rem]" : "text-[1.75rem]"} leading-none uppercase`}
      >
        Jack&rsquo;s <span style={{ color: RED }}>DIY</span>
      </span>
    </span>
  );
}

const NAV = [
  { key: "home", label: "Home", href: HOME },
  { key: "services", label: "Services", href: SERVICES },
  { key: "reviews", label: "Reviews", href: REVIEWS },
  { key: "work", label: "Jobs", href: RECENT_JOBS },
] as const;

// Skip link and sticky header with the site menu
export function JacksHeader({ current }: { current: "home" | "services" | "reviews" | "work" }) {
  const navLinks = NAV.map((item) => {
    const active = item.key === current;
    return (
      <Link
        key={item.key}
        href={item.href}
        aria-current={active ? "page" : undefined}
        style={display}
        className={`flex min-h-11 items-center justify-center border-b-[3px] px-1 text-base font-extrabold tracking-wide uppercase transition-colors duration-150 hover:text-[#D7262E] md:text-lg ${focusRing} ${active ? "border-[#D7262E]" : "border-transparent"}`}
      >
        {item.label}
      </Link>
    );
  });

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-white px-4 py-2 font-bold focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b-2 bg-white" style={{ borderColor: INK }}>
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href={HOME} className={`cursor-pointer ${focusRing}`} aria-label="Jack's DIY home">
            <Wordmark size="sm" />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {navLinks}
          </nav>
          <div className="flex items-center gap-5">
            <a
              href={tel}
              className={`hidden items-center gap-2 font-bold whitespace-nowrap underline-offset-4 hover:underline lg:flex ${focusRing}`}
            >
              <Phone size={18} weight="fill" style={{ color: RED }} aria-hidden />
              {jacksDemo.phoneDisplay}
            </a>
            <Link
              href={`${HOME}#quote`}
              style={{ ...display, backgroundColor: RED }}
              className={`inline-flex min-h-11 cursor-pointer items-center px-4 text-lg font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-[#A61C22] sm:px-5 sm:text-xl ${focusRing}`}
            >
              Send your list
            </Link>
          </div>
        </div>
        {/* Phones: the menu sits on its own row under the logo */}
        <nav aria-label="Main" className="grid grid-cols-4 border-t-2 px-2 md:hidden" style={{ borderColor: INK }}>
          {navLinks}
        </nav>
      </header>
    </>
  );
}

export function JacksFooter() {
  return (
    <footer className="relative z-10 text-white" style={{ backgroundColor: INK }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <Wordmark size="lg" />
          <p style={mono} className="mt-3 text-sm text-white/70">
            {jacksDemo.tagline}
          </p>
        </div>
        <div className="text-white/75 sm:text-right">
          <a href={tel} className="block text-lg font-bold text-white underline-offset-4 hover:underline">
            {jacksDemo.phoneDisplay}
          </a>
          <a href={mailto} className="font-bold text-white underline-offset-4 hover:underline">
            {jacksDemo.email}
          </a>
          <p style={mono} className="mt-1 text-sm">
            Evenings from 5pm · All day Mon, Fri, Sat &amp; Sun
          </p>
          <p className="mt-3 text-sm">
            <Link href={SERVICES} className="font-bold text-white underline underline-offset-4">
              See every job Jack does
            </Link>
          </p>
        </div>
      </div>
      <p style={mono} className="border-t border-white/15 px-4 py-5 text-center text-xs text-white/55">
        &copy; {new Date().getFullYear()} {jacksDemo.businessName} ·{" "}
        <Link href={PRIVACY} className="underline underline-offset-2 hover:text-white">
          Privacy Policy
        </Link>{" "}
        · Site by{" "}
        <a
          href={TRUEPOINT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white"
        >
          TruePoint Consulting
        </a>
      </p>
    </footer>
  );
}
