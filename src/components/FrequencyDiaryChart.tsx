"use client";

// 7-day frequency tier chart from accelerator diary entries.
// Added: staggered bar grow animation when chart scrolls into view.

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

type DiaryDay = {
  day: string;
  tier: number;
  label: string;
  hrv?: number;
  sleep?: string;
  kcal?: number;
};

type FrequencyDiaryChartProps = {
  days: readonly DiaryDay[];
};

export function FrequencyDiaryChart({ days }: FrequencyDiaryChartProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const maxTier = 6;

  return (
    <div
      ref={ref}
      className={`freq-report-diary-chart${inView ? " freq-report-diary-chart-live" : ""}`}
      role="img"
      aria-label="Frequency tier movement over seven days"
    >
      <div className="freq-report-diary-y-axis" aria-hidden="true">
        <span>T6</span>
        <span>T4</span>
        <span>T2</span>
      </div>
      <div className="freq-report-diary-bars">
        {days.map((entry, index) => {
          const heightPct = (entry.tier / maxTier) * 100;
          return (
            <div
              key={entry.day}
              className="freq-report-diary-col"
              style={{ "--diary-delay": `${index * 0.07}s` } as CSSProperties}
            >
              <div className="freq-report-diary-bar-wrap">
                <div
                  className="freq-report-diary-bar"
                  style={{ "--bar-height": `${heightPct}%` } as CSSProperties}
                  title={`${entry.day}: Tier ${entry.tier}`}
                />
              </div>
              <span className="freq-report-diary-day">{entry.day}</span>
              <span className="freq-report-diary-tier">T{entry.tier}</span>
              {entry.hrv ? (
                <span className="freq-report-diary-hrv">{entry.hrv} ms</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
