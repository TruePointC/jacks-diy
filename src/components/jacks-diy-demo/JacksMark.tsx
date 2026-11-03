export function JacksMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Roofline with chimney, as on the flyer */}
      <path d="M5 23 L24 7 L43 23" />
      <path d="M33 15.5 V9.5 H37.5 V19" />
      {/* House walls */}
      <path d="M10 19.5 V41 H38 V19.5" />
      {/* Lightning bolt through the middle */}
      <path d="M26.5 22 L19.5 31 H27 L21.5 38" />
    </svg>
  );
}
