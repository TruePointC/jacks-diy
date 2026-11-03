"use client";

import { useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { EnvelopeSimple, X } from "@phosphor-icons/react";
import { jacksDemo } from "@/lib/config";
import { useJobList } from "./jobListStore";

const TIMES = ["A weekday evening", "Monday or Friday", "The weekend", "Any time"];

// No backend: builds a pre-filled email and hands it to the visitor's mail app,
// so nothing leaves their device until they press send themselves.
export function QuoteRequest({
  red,
  ink,
  muted,
  rule,
  display,
  mono,
}: {
  red: string;
  ink: string;
  muted: string;
  rule: string;
  display: CSSProperties;
  mono: CSSProperties;
}) {
  const { ticked, toggle } = useJobList();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [time, setTime] = useState(TIMES[0]);
  const [submitted, setSubmitted] = useState(false);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Errors only show after a send attempt, and clear as soon as they're fixed
  const jobsError = submitted && !ticked.length && !details.trim();
  const nameError = submitted && !name.trim();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const missingJobs = !ticked.length && !details.trim();
    if (missingJobs || !name.trim()) {
      (missingJobs ? detailsRef : nameRef).current?.focus();
      return;
    }
    const subject = ticked.length
      ? `Job list: ${ticked.length} ${ticked.length === 1 ? "job" : "jobs"}`
      : "Job enquiry";
    const body = [
      "Hi Jack,",
      "",
      ...(ticked.length ? ["Here's my list:", ...ticked.map((j) => `- ${j}`), ""] : []),
      details.trim(),
      "",
      ...(address.trim() ? [`Job address: ${address.trim()}`] : []),
      `Best time for me: ${time}`,
      "",
      "Thanks,",
      name.trim(),
    ].join("\n");
    window.location.href = `mailto:${jacksDemo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const focusRing = "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#18181A]";
  const field = `mt-2 w-full border-2 bg-white px-3.5 py-3 text-[17px] outline-none transition-colors focus:border-[#D7262E] ${focusRing}`;

  return (
    <form onSubmit={handleSubmit} className="grid gap-7">
      <div>
        <p className="font-bold">Your list</p>
        {ticked.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {ticked.map((job) => (
              <li key={job}>
                <button
                  type="button"
                  onClick={() => toggle(job)}
                  aria-label={`Remove ${job}`}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 px-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#A61C22] ${focusRing}`}
                  style={{ backgroundColor: red, borderColor: red }}
                >
                  {job}
                  <X size={14} weight="bold" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 border-2 border-dashed px-4 py-3 text-[15px]" style={{ borderColor: rule, color: muted }}>
            Nothing ticked yet. Tick jobs on the list at the top of the page, or describe them below.
          </p>
        )}
      </div>

      <label className="block font-bold">
        Anything Jack should know?
        <textarea
          ref={detailsRef}
          className={`${field} min-h-28 resize-y font-normal`}
          style={{ borderColor: jobsError ? red : rule, color: ink }}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="e.g. Two shelves in the alcove, about a metre wide"
          aria-invalid={jobsError}
          aria-describedby={jobsError ? "jd-jobs-error" : undefined}
        />
        {jobsError && (
          <span id="jd-jobs-error" role="alert" className="mt-2 block text-[15px] font-bold" style={{ color: red }}>
            Tick at least one job, or describe what needs doing here.
          </span>
        )}
      </label>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block font-bold">
          Your name <span className="font-normal" style={{ color: muted }}>(required)</span>
          <input
            ref={nameRef}
            className={`${field} font-normal`}
            style={{ borderColor: nameError ? red : rule, color: ink }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={nameError}
            aria-describedby={nameError ? "jd-name-error" : undefined}
          />
          {nameError && (
            <span id="jd-name-error" role="alert" className="mt-2 block text-[15px] font-bold" style={{ color: red }}>
              Add your name so Jack knows who the list is from.
            </span>
          )}
        </label>
        <label className="block font-bold">
          Job address or postcode
          <input
            className={`${field} font-normal`}
            style={{ borderColor: rule, color: ink }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="street-address"
            placeholder="Street and postcode"
          />
        </label>
      </div>

      <fieldset>
        <legend className="font-bold">Best time for you</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TIMES.map((t) => {
            const active = t === time;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                aria-pressed={active}
                className={`min-h-11 cursor-pointer border-2 px-2 text-[15px] font-semibold transition-colors duration-150 ${focusRing}`}
                style={{
                  borderColor: active ? ink : rule,
                  backgroundColor: active ? ink : "#fff",
                  color: active ? "#fff" : ink,
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="border-t-2 pt-6" style={{ borderColor: rule }}>
        <button
          type="submit"
          style={{ ...display, backgroundColor: red }}
          className={`inline-flex w-full cursor-pointer items-center justify-center gap-2.5 px-7 py-4 text-2xl font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-[#A61C22] sm:w-auto ${focusRing}`}
        >
          <EnvelopeSimple size={24} weight="bold" aria-hidden />
          Email my list to Jack
        </button>
        <p style={mono} className="mt-3 text-xs" >
          <span style={{ color: muted }}>
            Opens your email app with everything filled in. Nothing sends until you press send.
          </span>
        </p>
      </div>
    </form>
  );
}
