"use client";

import { useSyncExternalStore } from "react";

// The visitor's ticked jobs, shared by the home page job list, the services
// page and the quote form. Kept in sessionStorage so ticks survive moving
// between pages (and reloads) for the rest of the visit.
const KEY = "jacks-diy-job-list";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed.filter((j) => typeof j === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: string[]) {
  cache = next;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage blocked: the list still works for this page view
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useJobList() {
  const ticked = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = (job: string) =>
    write(ticked.includes(job) ? ticked.filter((j) => j !== job) : [...ticked, job]);
  return { ticked, toggle };
}
