"use client";

// Mini icons for Day 2 relaxation picker — float tank, cryo chamber, ice bath.

type RelaxationExperienceMiniProps = {
  variant: "float" | "cryo" | "ice-bath";
  className?: string;
};

export function RelaxationExperienceMini({
  variant,
  className = "",
}: RelaxationExperienceMiniProps) {
  const shared = {
    className: `relaxation-experience-mini ${className}`.trim(),
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  if (variant === "float") {
    return (
      <svg {...shared}>
        <path
          d="M10 30c0-10 7-16 14-16s14 6 14 16v4c0 3-3 5-7 5H17c-4 0-7-2-7-5v-4Z"
          stroke="#c4a46c"
          strokeWidth="1.6"
        />
        <path d="M12 18c5-8 19-8 24 0" stroke="#e6ba4a" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx={24} cy={28} rx={10} ry={3} fill="rgba(196,164,108,0.2)" />
        <circle cx={24} cy={26} r={2.5} fill="#eeeeee" />
        <ellipse cx={24} cy={27} rx={7} ry={1.5} stroke="#eeeeee" strokeWidth="1.2" />
      </svg>
    );
  }

  if (variant === "cryo") {
    return (
      <svg {...shared}>
        <rect x={12} y={10} width={24} height={30} rx={4} stroke="#c4a46c" strokeWidth="1.6" />
        <path d="M16 14h16M16 18h16" stroke="#c4a46c" strokeWidth="1" opacity={0.4} />
        <circle cx={24} cy={26} r={3} fill="#eeeeee" />
        <path d="M24 29v6" stroke="#eeeeee" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 32h8" stroke="#eeeeee" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M8 20c2-2 4-2 6 0M34 20c2-2 4-2 6 0M8 28c2 2 4 2 6 0M34 28c2 2 4 2 6 0"
          stroke="#72c8e8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.7}
        />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path
        d="M10 22h28c2 0 4 2 4 4v10c0 2-2 4-4 4H10c-2 0-4-2-4-4V26c0-2 2-4 4-4Z"
        stroke="#c4a46c"
        strokeWidth="1.6"
      />
      <path
        d="M14 26h4v3h-4zM20 25h4v4h-4zM26 27h4v2h-4zM32 25h3v4h-3z"
        fill="#72c8e8"
        opacity={0.55}
      />
      <circle cx={24} cy={18} r={3} fill="#eeeeee" />
      <path d="M24 21v4" stroke="#eeeeee" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 24h8" stroke="#eeeeee" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 30h24" stroke="rgba(114,200,232,0.5)" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}
