"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useJobList } from "./jobListStore";
import { HOME } from "./theme";

// Pinned to the bottom of the services page once anything is ticked, so the
// way back to the quote form is always one tap away
export function TickedBar({ red, ink, display, mono }: { red: string; ink: string; display: CSSProperties; mono: CSSProperties }) {
  const { ticked } = useJobList();
  const count = ticked.length;

  return (
    <div
      aria-live="polite"
      className={`fixed inset-x-0 bottom-0 z-50 border-t-2 bg-white transition-transform duration-200 ease-out motion-reduce:transition-none ${count ? "translate-y-0" : "translate-y-full"}`}
      style={{ borderColor: ink }}
      inert={count === 0}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <p className="min-w-0">
          <span style={display} className="text-xl font-extrabold uppercase sm:text-2xl">
            {count} {count === 1 ? "job" : "jobs"} on your list
          </span>
          <span style={mono} className="ml-3 hidden truncate text-xs text-[#55555A] md:inline">
            {ticked.slice(-3).join(" · ")}
            {count > 3 ? " …" : ""}
          </span>
        </p>
        <Link
          href={`${HOME}#quote`}
          style={{ ...display, backgroundColor: red }}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 px-4 text-lg font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-[#A61C22] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#18181A] sm:px-5 sm:text-xl"
        >
          Send to Jack
          <ArrowRight size={20} weight="bold" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
