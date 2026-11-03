"use client";

// One tickable job: a real checkbox (visually hidden) with the printed-box tick
// drawn on top. Used by the home page job list and the services page.
export function TickRow({
  label,
  checked,
  onToggle,
  red,
  ink,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  red: string;
  ink: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 py-2 text-[17px] leading-snug">
      <input type="checkbox" checked={checked} onChange={onToggle} className="peer sr-only" />
      <span
        aria-hidden
        className="flex h-6 w-6 shrink-0 items-center justify-center border-2 transition-colors duration-150 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2"
        style={{
          borderColor: checked ? red : ink,
          backgroundColor: checked ? red : "#fff",
          outlineColor: ink,
        }}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M3 8.5 L6.5 12 L13 4.5"
            stroke="#fff"
            strokeWidth={2.6}
            strokeLinecap="square"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={checked ? 0 : 1}
            className="transition-[stroke-dashoffset] duration-200 ease-out motion-reduce:transition-none"
          />
        </svg>
      </span>
      <span
        className="pt-px transition-colors duration-150"
        style={{ color: checked ? ink : "#3B3B3E", fontWeight: checked ? 700 : 400 }}
      >
        {label}
      </span>
    </label>
  );
}
