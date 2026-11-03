"use client";

import { useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { jacksWeek } from "@/lib/config";

const subscribe = () => () => {};
const getToday = () => new Date().getDay();
// No "today" on the server — the highlight appears once the client knows the date.
const getServerToday = () => -1;

function useToday() {
  return useSyncExternalStore(subscribe, getToday, getServerToday);
}

// One-line version for the hero
export function TodayAvailability({ red, mono }: { red: string; mono: CSSProperties }) {
  const today = useToday();
  const slot = jacksWeek.find((d) => d.dayIndex === today);
  const text = !slot
    ? "Evenings after 5pm · Full days Mon, Fri & weekends"
    : slot.full
      ? "Jack's free all day today"
      : "Jack's free from 5pm tonight";

  return (
    <p style={mono} className="flex items-center gap-2.5 text-sm">
      <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: red }} />
      {text}
    </p>
  );
}

export function AvailabilityWeek({
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
  const today = useToday();

  return (
    <div>
      <ol className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {jacksWeek.map((d) => {
          const isToday = d.dayIndex === today;
          return (
            <li
              key={d.day}
              className="flex flex-col items-center border-2 bg-white px-1 pt-3 pb-2 sm:px-2 sm:pt-4 sm:pb-3"
              style={{ borderColor: isToday ? ink : rule }}
            >
              <span style={display} className="text-lg font-extrabold uppercase sm:text-2xl">
                {d.day}
              </span>
              {/* Full column for full days, top third for evenings */}
              <span
                aria-hidden
                className="relative mt-2.5 h-28 w-full max-w-[30px] sm:mt-3 sm:h-40 sm:max-w-[40px]"
                style={{ backgroundColor: "#EDEDEA" }}
              >
                <span
                  className="absolute inset-x-0 bottom-0"
                  style={{ height: d.full ? "100%" : "34%", backgroundColor: red }}
                />
              </span>
              <span
                style={mono}
                className="mt-2 text-center text-[10px] leading-tight sm:text-xs"
              >
                {d.full ? "All day" : "From 5pm"}
              </span>
              <span
                style={{ ...mono, backgroundColor: isToday ? ink : "transparent" }}
                className="mt-1.5 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase"
                aria-hidden={!isToday}
              >
                {isToday ? "Today" : " "}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="sr-only">
        Available every evening after 5pm, and all day on Monday, Friday, Saturday and Sunday.
      </p>
    </div>
  );
}
