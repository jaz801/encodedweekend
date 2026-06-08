"use client";

// Tabler Icons (MIT) for Optimising the Now brainstorm detail cards.
// Fixed: presentation, chalkboard, devices-code icons for the three Day 1 prompts.
// Recurring: icons were too large on detail cards — sized at 28×28px in globals.css.
// https://tabler.io/icons

type BrainstormOneIconProps = {
  variant: "working" | "better" | "hackathon";
  className?: string;
};

const shared = {
  className: "brainstorm-tabler-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BrainstormOneIcon({ variant, className = "" }: BrainstormOneIconProps) {
  const iconClass = className ? `${shared.className} ${className}` : shared.className;

  if (variant === "working") {
    return (
      <svg {...shared} className={iconClass}>
        <g {...stroke}>
          <path d="M3 4h18M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4m-8 12v4m-3 0h6" />
          <path d="m8 12l3-3l2 2l3-3" />
        </g>
      </svg>
    );
  }

  if (variant === "better") {
    return (
      <svg {...shared} className={iconClass}>
        <g {...stroke}>
          <path d="M8 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1" />
          <path d="M11 17a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
        </g>
      </svg>
    );
  }

  return (
    <svg {...shared} className={iconClass}>
      <g {...stroke}>
        <path d="M13 15.5V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4m0 6a1 1 0 0 1-1 1" />
        <path d="M18 8V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7m9 3l2-2l-2-2m-3 0l-2 2l2 2M16 9h2" />
      </g>
    </svg>
  );
}
