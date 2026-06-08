"use client";

// Team frequency + whiteboard icon for Brainstorm two — Right now card.
// Fixed: visual for group/individual frequency readout and personality whiteboard exercise.

type TeamFrequencyMiniProps = {
  className?: string;
};

const BODY = "#eeeeee";
const ACCENT = "#c4a46c";
const MUTED = "rgba(238, 238, 238, 0.45)";

export function TeamFrequencyMini({ className = "" }: TeamFrequencyMiniProps) {
  const limb = {
    stroke: BODY,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      className={`team-frequency-mini ${className}`.trim()}
      viewBox="0 0 80 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 14 C10 8 14 18 18 10 C22 6 26 16 30 12"
        stroke={ACCENT}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="8" y="18" width="3" height="8" rx="1" fill={ACCENT} opacity="0.55" />
      <rect x="14" y="16" width="3" height="12" rx="1" fill={ACCENT} opacity="0.75" />
      <rect x="20" y="20" width="3" height="6" rx="1" fill={ACCENT} opacity="0.45" />
      <rect x="26" y="15" width="3" height="11" rx="1" fill={ACCENT} />

      <rect x="42" y="14" width="34" height="24" rx="2" fill="rgba(196,164,108,0.08)" stroke={ACCENT} strokeWidth="1.2" />
      <path d="M48 18 C52 24 56 20 60 28" stroke={BODY} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M50 30 L58 26 L66 32" stroke={BODY} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M46 38 L58 38 L70 38" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

      <circle cx="34" cy="24" r="3" fill={BODY} />
      <path d="M34 27 L34 34" {...limb} />
      <path d="M34 30 L42 22" {...limb} />
      <path d="M34 34 L30 42" {...limb} />
      <path d="M34 34 L38 42" {...limb} />

      <circle cx="50" cy="46" r="2" fill={MUTED} />
      <circle cx="58" cy="46" r="2" fill={MUTED} />
      <circle cx="66" cy="46" r="2" fill={BODY} />
      <path d="M50 48 L50 52 M58 48 L58 52 M66 48 L66 52" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
