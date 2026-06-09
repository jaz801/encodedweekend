"use client";

// Minimal e-paper tablet icon for Day 3 hackathon award ceremony card.

type RemarkableTabletMiniProps = {
  className?: string;
};

export function RemarkableTabletMini({ className = "" }: RemarkableTabletMiniProps) {
  return (
    <svg
      className={`brainstorm-tabler-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <rect x="7" y="5" width="10" height="13" rx="0.5" fill="currentColor" fillOpacity="0.08" />
        <path d="M9 8.5h6M9 11h4.5M9 13.5h5" opacity="0.55" />
        <circle cx="12" cy="19.5" r="0.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
