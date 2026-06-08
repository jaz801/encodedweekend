"use client";

// Day 2 exercise picker icons from Tabler Icons (MIT) — yoga, gymnastics, stretching.
// Fixed: replaced custom stick figures with Tabler icon set for clearer exercise types.
// Icons: tabler/yoga, tabler/gymnastics, tabler/stretching — https://tabler.io/icons

type ExerciseClassMiniProps = {
  variant: "calisthenics" | "yoga" | "pilates";
  className?: string;
};

const shared = {
  className: "exercise-class-mini",
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

export function ExerciseClassMini({ variant, className = "" }: ExerciseClassMiniProps) {
  const iconClass = className ? `${shared.className} ${className}` : shared.className;

  if (variant === "calisthenics") {
    return (
      <svg {...shared} className={iconClass}>
        <path
          {...stroke}
          d="M7 7a1 1 0 1 0 2 0a1 1 0 0 0-2 0m6 14l1-9l7-6M3 11h6l5 1m-2.5-3.5L16 5"
        />
      </svg>
    );
  }

  if (variant === "yoga") {
    return (
      <svg {...shared} className={iconClass}>
        <g {...stroke}>
          <path d="M4 20h4l1.5-3m7.5 3l-1-5h-5l1-7" />
          <path d="m4 10l4-1l4-1l4 1.5l4 1.5m-9.993-6a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
        </g>
      </svg>
    );
  }

  return (
    <svg {...shared} className={iconClass}>
      <path
        {...stroke}
        d="M15 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0M5 20l5-.5l1-2m7 2.5v-5h-5.5L15 8.5l-5.5 1l1.5 2"
      />
    </svg>
  );
}
