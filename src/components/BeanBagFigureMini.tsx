"use client";

// Reclining figure on bean bag for Brainstorm two — Direction card.
// Fixed: redesigned as 24×24 Tabler-style stroke icon; figure sinks into one bag silhouette.
// Recurring: prior dual-ellipse + limb spaghetti read poorly at small sizes.

type BeanBagFigureMiniProps = {
  className?: string;
};

const shared = {
  className: "bean-bag-figure-mini",
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

export function BeanBagFigureMini({ className = "" }: BeanBagFigureMiniProps) {
  const iconClass = className ? `${shared.className} ${className}` : shared.className;

  return (
    <svg {...shared} className={iconClass}>
      <path
        d="M4 18.5C4 15 7.5 12.5 12 13C16.5 12.5 20 15 20 18.5C16.5 20 7.5 20 4 18.5Z"
        fill="currentColor"
        fillOpacity={0.14}
        {...stroke}
      />
      <circle cx="16.5" cy="9" r="1.75" {...stroke} />
      <path
        {...stroke}
        d="M16.5 10.75C14.5 11.5 12.5 13.5 11 16M11 16L8.5 18.5M16.5 10.75C18 9.5 18.75 8.25 17.75 7.25"
      />
    </svg>
  );
}
