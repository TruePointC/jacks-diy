"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { jacksAllServices, jacksQuickJobs } from "@/lib/config";
import { useJobList } from "./jobListStore";
import { TickRow } from "./TickRow";
import { SERVICES } from "./theme";

const totalJobs = jacksAllServices.reduce((n, group) => n + group.jobs.length, 0);

export function JobList({
  red,
  ink,
  rule,
  display,
  mono,
}: {
  red: string;
  ink: string;
  rule: string;
  display: CSSProperties;
  mono: CSSProperties;
}) {
  const { ticked, toggle } = useJobList();
  // Counts ticks from the services page too, not just the jobs shown here
  const count = ticked.length;

  return (
    <div className="border-2 bg-white" style={{ borderColor: ink }}>
      <div
        className="flex items-baseline justify-between px-5 py-3 text-white"
        style={{ backgroundColor: red }}
      >
        <h2 style={display} className="text-2xl font-extrabold tracking-wide uppercase">
          My job list
        </h2>
        <p style={mono} className="text-xs" aria-live="polite">
          {count} ticked
        </p>
      </div>

      <div className="divide-y" style={{ borderColor: rule }}>
        {jacksQuickJobs.map((group) => (
          <fieldset key={group.title} className="px-5 pt-2.5 pb-1.5" style={{ borderColor: rule }}>
            <legend
              style={{ ...mono, color: red }}
              className="pt-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase"
            >
              {group.title}
            </legend>
            {group.jobs.map(({ job, label }) => (
              <TickRow
                key={job}
                label={label}
                checked={ticked.includes(job)}
                onToggle={() => toggle(job)}
                red={red}
                ink={ink}
              />
            ))}
          </fieldset>
        ))}
      </div>

      <Link
        href={SERVICES}
        className="flex items-center justify-between gap-3 border-t-2 px-5 py-3 font-bold underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-[#18181A]"
        style={{ borderColor: ink }}
      >
        Not here? Browse all {totalJobs} jobs
        <ArrowRight size={18} weight="bold" style={{ color: red }} aria-hidden />
      </Link>

      <a
        href="#quote"
        style={{ ...display, backgroundColor: ink }}
        className="flex cursor-pointer items-center justify-between px-5 py-4 text-xl font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-[#A61C22] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#D7262E]"
      >
        {count === 0 ? "Tick a few, then send" : `Send ${count} ${count === 1 ? "job" : "jobs"} to Jack`}
        <ArrowDown size={22} weight="bold" aria-hidden />
      </a>
    </div>
  );
}
