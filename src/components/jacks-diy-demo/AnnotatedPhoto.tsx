import Image from "next/image";
import type { CSSProperties } from "react";

type Point = [number, number];

export type PhotoNote = {
  label: string;
  // Percent positions on the photo: where the label sits, and what it points at
  at: Point;
  targets: Point[];
};

// The photo must be exactly 16:9 so the percent positions line up. Wide screens
// get labels with arrows; phones get numbered markers and a key underneath.
export function AnnotatedPhoto({
  src,
  alt,
  notes,
  red,
  ink,
  display,
  mono,
}: {
  src: string;
  alt: string;
  notes: PhotoNote[];
  red: string;
  ink: string;
  display: CSSProperties;
  mono: CSSProperties;
}) {
  // viewBox matches the 16:9 frame, so 1% across = 1.6 units and 1% down = 0.9
  const toBox = ([x, y]: Point) => [x * 1.6, y * 0.9] as const;

  return (
    <>
      <div className="relative aspect-[16/9]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />

        <svg viewBox="0 0 160 90" className="absolute inset-0 hidden h-full w-full sm:block" aria-hidden>
          <defs>
            <marker id="jd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill={red} stroke="#fff" strokeWidth={1.2} />
            </marker>
          </defs>
          {notes.flatMap((note) =>
            note.targets.map((target) => {
              const [x1, y1] = toBox(note.at);
              const [x2, y2] = toBox(target);
              return (
                <g key={`${note.label}-${target.join()}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth={1.3} />
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={red} strokeWidth={0.55} markerEnd="url(#jd-arrow)" />
                </g>
              );
            }),
          )}
        </svg>

        {notes.map((note, i) => (
          <span
            key={note.label}
            className="absolute hidden -translate-x-1/2 -translate-y-1/2 items-center border-2 bg-white whitespace-nowrap sm:flex"
            style={{ left: `${note.at[0]}%`, top: `${note.at[1]}%`, borderColor: ink }}
          >
            <span style={{ ...mono, backgroundColor: red }} className="self-stretch px-1.5 py-0.5 text-xs font-semibold text-white">
              {i + 1}
            </span>
            <span style={display} className="px-2 py-0.5 text-sm leading-tight font-extrabold uppercase lg:text-base">
              {note.label}
            </span>
          </span>
        ))}

        {/* Phones: numbered markers on the work itself */}
        {notes.flatMap((note, i) =>
          note.targets.map((target) => (
            <span
              key={`m-${note.label}-${target.join()}`}
              style={{ ...mono, left: `${target[0]}%`, top: `${target[1]}%`, backgroundColor: red }}
              className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-white text-[11px] font-semibold text-white sm:hidden"
              aria-hidden
            >
              {i + 1}
            </span>
          )),
        )}
      </div>

      <ol className="grid grid-cols-1 gap-1.5 border-t-2 px-4 py-3 sm:hidden" style={{ borderColor: ink }}>
        {notes.map((note, i) => (
          <li key={note.label} className="flex items-center gap-2 text-[15px] font-bold">
            <span
              style={{ ...mono, backgroundColor: red }}
              className="flex h-5 w-5 shrink-0 items-center justify-center text-[11px] font-semibold text-white"
              aria-hidden
            >
              {i + 1}
            </span>
            {note.label}
          </li>
        ))}
      </ol>
    </>
  );
}
