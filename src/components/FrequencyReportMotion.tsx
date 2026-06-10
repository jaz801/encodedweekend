"use client";

// Scroll-triggered animations for frequency report — HRV band, sleep bar, stagger grids.
// Added: ENFP profile — intro metric strip, animated bandwidth tiers, correlation row stagger.

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import type { FrequencyTier, TierTimeEntry } from "@/lib/frequencyReports/types";

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

type IntroMetricStripProps = {
  journalEntries: string;
  dataPoints: string;
  reportRange: string;
};

export function IntroMetricStrip({ journalEntries, dataPoints, reportRange }: IntroMetricStripProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={`freq-report-intro-metrics${inView ? " freq-report-intro-metrics-live" : ""}`}
      aria-label="Week capture summary"
    >
      <article className="freq-report-intro-metric" style={{ "--metric-delay": "0s" } as CSSProperties}>
        <span className="freq-report-intro-metric-label">Journal entries</span>
        <strong className="freq-report-intro-metric-value">{journalEntries}</strong>
        <span className="freq-report-intro-metric-note">{reportRange}</span>
      </article>
      <article className="freq-report-intro-metric" style={{ "--metric-delay": "0.1s" } as CSSProperties}>
        <span className="freq-report-intro-metric-label">Synced data points</span>
        <strong className="freq-report-intro-metric-value">{dataPoints}</strong>
        <span className="freq-report-intro-metric-note">Apple Watch + Oura</span>
      </article>
      <article className="freq-report-intro-metric" style={{ "--metric-delay": "0.2s" } as CSSProperties}>
        <span className="freq-report-intro-metric-label">Capture rhythm</span>
        <strong className="freq-report-intro-metric-value">2× / day</strong>
        <span className="freq-report-intro-metric-note">Minute 0 + 30</span>
      </article>
    </div>
  );
}

type BandwidthTierTrackProps = {
  tiers: readonly FrequencyTier[];
  tierTime: readonly TierTimeEntry[];
};

export function BandwidthTierTrack({ tiers, tierTime }: BandwidthTierTrackProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`freq-report-bandwidth-track${inView ? " freq-report-bandwidth-track-live" : ""}`}
    >
      {tiers.map((item, index) => (
        <div
          key={item.tier}
          className={`freq-report-tier${item.active ? " freq-report-tier-active" : ""}`}
          style={{ "--tier-delay": `${index * 0.08}s` } as CSSProperties}
        >
          <span className="freq-report-tier-num">T{item.tier}</span>
          <span className="freq-report-tier-name">{item.name}</span>
          <span className="freq-report-tier-pct">
            {tierTime.find((t) => t.tier === item.tier)?.pct ?? 0}% ·{" "}
            {tierTime.find((t) => t.tier === item.tier)?.hours ?? "0h"}
          </span>
        </div>
      ))}
      <div className="freq-report-bandwidth-glow" aria-hidden="true" />
    </div>
  );
}

type CorrelationTableBodyProps = {
  children: ReactNode;
};

export function CorrelationTableBody({ children }: CorrelationTableBodyProps) {
  const { ref, inView } = useInView<HTMLTableSectionElement>(0.1);

  return (
    <tbody ref={ref} className={inView ? "freq-report-correlation-rows-live" : undefined}>
      {children}
    </tbody>
  );
}
