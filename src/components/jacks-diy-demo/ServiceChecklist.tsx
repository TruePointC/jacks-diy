"use client";

import { useJobList } from "./jobListStore";
import { TickRow } from "./TickRow";

// A category's jobs on the services page, tickable onto the same list the
// home page and quote form use
export function ServiceChecklist({
  jobs,
  red,
  ink,
}: {
  jobs: string[];
  red: string;
  ink: string;
}) {
  const { ticked, toggle } = useJobList();

  return (
    <ul className="grid content-start gap-x-10 sm:grid-cols-2 lg:pt-1">
      {jobs.map((job) => (
        <li key={job}>
          <TickRow label={job} checked={ticked.includes(job)} onToggle={() => toggle(job)} red={red} ink={ink} />
        </li>
      ))}
    </ul>
  );
}
