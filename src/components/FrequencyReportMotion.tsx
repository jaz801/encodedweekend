"use client";

// Scroll-triggered animations for frequency report — HRV band, sleep bar, stagger grids.

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type HrvBandTrackProps = {
  fillPct: number;
  markerPct: number;
  currentMs: number;
};

export function HrvBandTrack({ fillPct, markerPct, currentMs }: HrvBandTrackProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={`freq-report-hrv-track${inView ? " freq-report-hrv-track-live" : ""}`}
      style={
        {
          "--hrv-fill": `${fillPct}%`,
          "--hrv-marker": `${markerPct}%`,
        } as CSSProperties
      }
    >
      <div className="freq-report-hrv-ecg" aria-hidden="true" />
      <div className="freq-report-hrv-fill" />
      <div className="freq-report-hrv-marker">
        <span className="freq-report-hrv-marker-pulse" />
        <span>{currentMs} ms now</span>
      </div>
    </div>
  );
}

type SleepBarProps = {
  stages: readonly { label: string; pct: number; color: string }[];
};

export function SleepBar({ stages }: SleepBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={`freq-report-sleep-bar${inView ? " freq-report-sleep-bar-live" : ""}`}
      role="img"
      aria-label="Sleep stage percentages"
    >
      {stages.map((stage, index) => (
        <div
          key={stage.label}
          className="freq-report-sleep-segment"
          style={
            {
              "--sleep-pct": `${stage.pct}%`,
              "--sleep-color": stage.color,
              "--sleep-delay": `${index * 0.12}s`,
            } as CSSProperties
          }
          title={`${stage.label} ${stage.pct}%`}
        />
      ))}
    </div>
  );
}

type StaggerGridProps = {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function StaggerGrid({ className = "", children, "aria-label": ariaLabel }: StaggerGridProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.08);

  return (
    <div
      ref={ref}
      className={`freq-report-stagger${inView ? " in" : ""} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
