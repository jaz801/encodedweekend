"use client";

// 7-day × 24-hour frequency timeline — tier fluctuations per day (replaces single-night sleep view).
// Fixed: diary now shows full 24h access + volume per day, not one aggregate sleep composition.
// Added: peak-tier hours + frequency jump count per day row.

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";
import type { FrequencyDaySegment } from "@/lib/frequencyDayStats";

export type { FrequencyDaySegment };

export type FrequencyDay = {
  day: string;
  date: string;
  access: string;
  volume: number;
  avgTier: number;
  peakTier: number;
  peakTierHours: string;
  tierHoursBreakdown: string;
  frequencyJumps: number;
  hrv: number;
  segments: readonly FrequencyDaySegment[];
};

type FrequencyWeekTimelineProps = {
  days: readonly FrequencyDay[];
};

const TIER_COLORS: Record<number, string> = {
  1: "#2e2e2e",
  2: "#5a6a7a",
  3: "#c4a46c",
  4: "#e6ba4a",
  5: "#8ec0ff",
  6: "#eeeeee",
};

const HOUR_MARKS = [0, 6, 12, 18, 24] as const;

export function FrequencyWeekTimeline({ days }: FrequencyWeekTimelineProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <div
      ref={ref}
      className={`freq-report-week-timeline${inView ? " freq-report-week-timeline-live" : ""}`}
    >
      <div className="freq-report-week-timeline-axis" aria-hidden="true">
        {HOUR_MARKS.map((hour) => (
          <span key={hour}>{hour === 24 ? "24h" : `${hour}h`}</span>
        ))}
      </div>

      <div className="freq-report-week-timeline-days">
        {days.map((entry, dayIndex) => (
          <div
            key={entry.day}
            className="freq-report-week-timeline-row"
            style={{ "--day-delay": `${dayIndex * 0.06}s` } as CSSProperties}
          >
            <div className="freq-report-week-timeline-meta">
              <span className="freq-report-week-timeline-day">{entry.day}</span>
              <span className="freq-report-week-timeline-date">{entry.date}</span>
            </div>

            <div
              className="freq-report-week-timeline-track"
              role="img"
              aria-label={`${entry.day} frequency from 0 to 24 hours, access ${entry.access}, volume ${entry.volume}`}
            >
              {entry.segments.map((segment, segIndex) => {
                const widthPct = ((segment.to - segment.from) / 24) * 100;
                const leftPct = (segment.from / 24) * 100;
                return (
                  <div
                    key={`${entry.day}-${segIndex}`}
                    className="freq-report-week-timeline-segment"
                    style={
                      {
                        "--seg-left": `${leftPct}%`,
                        "--seg-width": `${widthPct}%`,
                        "--seg-color": TIER_COLORS[segment.tier] ?? TIER_COLORS[3],
                        "--seg-delay": `${dayIndex * 0.06 + segIndex * 0.03}s`,
                      } as CSSProperties
                    }
                    title={`${segment.from}h–${segment.to}h · Tier ${segment.tier}`}
                  />
                );
              })}
            </div>

            <div className="freq-report-week-timeline-stats">
              <span className="freq-report-week-timeline-access">{entry.access}</span>
              <span className="freq-report-week-timeline-peak-hours">
                T{entry.peakTier} {entry.peakTierHours}
              </span>
              <span className="freq-report-week-timeline-jumps">
                {entry.frequencyJumps} jumps
              </span>
              <span className="freq-report-week-timeline-volume">Vol {entry.volume}</span>
            </div>
          </div>
        ))}
      </div>

      <ul className="freq-report-week-timeline-legend" aria-label="Tier colors">
        {[2, 3, 4].map((tier) => (
          <li key={tier}>
            <span
              className="freq-report-week-timeline-swatch"
              style={{ background: TIER_COLORS[tier] }}
            />
            Tier {tier}
          </li>
        ))}
      </ul>
    </div>
  );
}
