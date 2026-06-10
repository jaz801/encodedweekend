"use client";

// Colorful stacked bar chart — hours logged per frequency tier across 168h week.
// Fixed: replaced plain table with animated tier chart (user request).

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

export type TierTimeEntry = {
  tier: number;
  name: string;
  pct: number;
  hours: string;
};

type FrequencyTierTimeChartProps = {
  tiers: readonly TierTimeEntry[];
  weekHours?: number;
};

const TIER_COLORS: Record<number, { fill: string; glow: string; label: string }> = {
  1: { fill: "#2e2e2e", glow: "rgba(46, 46, 46, 0.4)", label: "#888" },
  2: { fill: "#6b8cae", glow: "rgba(107, 140, 174, 0.45)", label: "#9ec0e8" },
  3: { fill: "#c4a46c", glow: "rgba(196, 164, 108, 0.5)", label: "#e6ba4a" },
  4: { fill: "#e6ba4a", glow: "rgba(230, 186, 74, 0.55)", label: "#ffe08a" },
  5: { fill: "#8ec0ff", glow: "rgba(142, 192, 255, 0.45)", label: "#b8daff" },
  6: { fill: "#eeeeee", glow: "rgba(238, 238, 238, 0.35)", label: "#fff" },
};

export function FrequencyTierTimeChart({
  tiers,
  weekHours = 168,
}: FrequencyTierTimeChartProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const activeTiers = tiers.filter((t) => t.pct > 0);

  return (
    <div
      ref={ref}
      className={`freq-report-tier-time-chart${inView ? " freq-report-tier-time-chart-live" : ""}`}
      role="img"
      aria-label={`Time in each frequency over ${weekHours} hour week`}
    >
      <div className="freq-report-tier-time-chart-stack-wrap">
        <div className="freq-report-tier-time-chart-stack" aria-hidden="true">
          {activeTiers.map((entry, index) => {
            const palette = TIER_COLORS[entry.tier] ?? TIER_COLORS[3];
            return (
              <div
                key={entry.tier}
                className="freq-report-tier-time-chart-stack-seg"
                style={
                  {
                    "--tier-pct": `${entry.pct}%`,
                    "--tier-color": palette.fill,
                    "--tier-glow": palette.glow,
                    "--tier-delay": `${index * 0.1}s`,
                  } as CSSProperties
                }
                title={`T${entry.tier} ${entry.name} · ${entry.pct}% · ${entry.hours}`}
              >
                <span>T{entry.tier}</span>
              </div>
            );
          })}
        </div>
        <div className="freq-report-tier-time-chart-stack-axis">
          <span>0h</span>
          <span>{weekHours / 2}h</span>
          <span>{weekHours}h</span>
        </div>
      </div>

      <div className="freq-report-tier-time-chart-rows">
        {activeTiers.map((entry, index) => {
          const palette = TIER_COLORS[entry.tier] ?? TIER_COLORS[3];
          return (
            <article
              key={entry.tier}
              className="freq-report-tier-time-chart-row"
              style={
                {
                  "--tier-color": palette.fill,
                  "--tier-glow": palette.glow,
                  "--tier-label": palette.label,
                  "--tier-pct": `${entry.pct}%`,
                  "--tier-delay": `${index * 0.08}s`,
                } as CSSProperties
              }
            >
              <div className="freq-report-tier-time-chart-row-head">
                <span className="freq-report-tier-time-chart-badge">T{entry.tier}</span>
                <div className="freq-report-tier-time-chart-row-meta">
                  <strong>{entry.name}</strong>
                  <span>
                    {entry.pct}% · {entry.hours}
                  </span>
                </div>
              </div>
              <div className="freq-report-tier-time-chart-row-track">
                <div className="freq-report-tier-time-chart-row-fill" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
