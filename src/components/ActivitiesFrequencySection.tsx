"use client";

// Activities within frequency — tier filter, lift/drop groups, tracking counts per activity.
// Fixed: user can select T2–T4 to filter which activities map to that frequency band.
// Fixed: activity metrics show HR, duration, energy — nutrition removed (not device-tracked).
// Added: pure tier panel on tier click — normal HR, HRV, sleep, recovery vs logged stats.
// Fixed: max activity ceilings — deep work, exercise, social battery, chores with capacity types.
// Added: optional ENFP activity focus line for member-specific activity sections.

import { useMemo, useState } from "react";
import { StaggerGrid } from "@/components/FrequencyReportMotion";
import { MeditationIcon } from "@/components/FrequencyReportIcons";
import { TierPureProfilePanel } from "@/components/TierPureProfilePanel";
import type { PureTierStat } from "@/lib/frequencyReports/types";

export type ActivityInFrequency = {
  key: string;
  effect: "lift" | "drop";
  label: string;
  sessions: number;
  days: string;
  tiers: readonly number[];
  trackedDays: number;
  tierDelta: string;
  frequencyJump: string;
  avgHr: string;
  duration: string;
  energy: string;
  maxBeforeDrop: string;
  note: string;
  color: string;
};

type ActivityCeiling = {
  label: string;
  capacityType: string;
  capacity: string;
  before: string;
};

type ActivitiesFrequencySectionProps = {
  memberFirstName: string;
  memberArchetype?: string;
  activityFocus?: string;
  tierPureStats: readonly PureTierStat[];
  ceilings: readonly ActivityCeiling[];
  activities: readonly ActivityInFrequency[];
};

function ActivityFrequencyCard({ item }: { item: ActivityInFrequency }) {
  const trackedPct = Math.round((item.trackedDays / 7) * 100);

  return (
    <article
      className={`freq-report-activity-freq-card freq-report-activity-freq-card-${item.effect}`}
    >
      <div className="freq-report-activity-freq-head">
        <span className="freq-report-activity-freq-dot" style={{ background: item.color }} />
        <strong>{item.label}</strong>
        <span className={`freq-report-activity-effect freq-report-activity-effect-${item.effect}`}>
          {item.effect === "lift" ? "↑ Jump" : "↓ Drop"}
        </span>
      </div>
      <p className="freq-report-activity-tracked">
        Tracked <strong>{item.trackedDays} / 7 days</strong> · {trackedPct}% of week ·{" "}
        {item.sessions} logged sessions
      </p>
      <p className="freq-report-activity-tier-tags">
        {item.tiers.map((t) => (
          <span key={t} className="freq-report-activity-tier-tag">
            T{t}
          </span>
        ))}
      </p>
      <p className="freq-report-activity-freq-days">
        {item.days} · {item.tierDelta}
      </p>
      <p className="freq-report-activity-freq-jump">{item.frequencyJump}</p>
      <dl className="freq-report-activity-metrics">
        <div>
          <dt>HR</dt>
          <dd>{item.avgHr}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{item.duration}</dd>
        </div>
        <div>
          <dt>Energy</dt>
          <dd>{item.energy}</dd>
        </div>
      </dl>
      {item.maxBeforeDrop !== "—" ? (
        <p className="freq-report-activity-ceiling-line">
          <span>Max before drop</span> {item.maxBeforeDrop}
        </p>
      ) : null}
      <p className="freq-report-activity-freq-note">{item.note}</p>
    </article>
  );
}

export function ActivitiesFrequencySection({
  memberFirstName,
  memberArchetype,
  activityFocus,
  tierPureStats,
  ceilings,
  activities,
}: ActivitiesFrequencySectionProps) {
  const [tierFilter, setTierFilter] = useState<string>("all");

  const tierFilters = useMemo(
    () => [
      { id: "all", label: "All tiers" },
      ...tierPureStats.map((t) => ({ id: String(t.tier), label: `T${t.tier}` })),
    ],
    [tierPureStats],
  );

  const selectedPureTier = useMemo(
    () => tierPureStats.find((t) => String(t.tier) === tierFilter) ?? null,
    [tierFilter, tierPureStats],
  );

  const filtered = useMemo(() => {
    if (tierFilter === "all") return activities;
    const tier = Number(tierFilter);
    return activities.filter((a) => a.tiers.includes(tier));
  }, [activities, tierFilter]);

  const lifts = filtered.filter((a) => a.effect === "lift");
  const drops = filtered.filter((a) => a.effect === "drop");

  return (
    <div aria-labelledby="activities-frequency-heading">
      <div className="freq-report-section-head">
        <MeditationIcon className="freq-report-section-icon" />
        <div>
          <h2 id="activities-frequency-heading">Activities within frequency</h2>
          <p>
            {activityFocus
              ? `${memberArchetype ? `${memberArchetype} focus · ` : ""}${activityFocus} — filter by tier to see lifts and drops`
              : `Filter by tier to see what moved ${memberFirstName} up or down — HR, duration, energy burned`}
          </p>
        </div>
      </div>

      <div className="freq-report-tier-filter" role="group" aria-label="Filter activities by frequency tier">
        {tierFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`freq-report-tier-filter-btn${tierFilter === f.id ? " active" : ""}`}
            aria-pressed={tierFilter === f.id}
            onClick={() => setTierFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
        <span className="freq-report-tier-filter-count">
          {tierFilter === "all"
            ? `${filtered.length} ${filtered.length === 1 ? "activity" : "activities"}`
            : `Pure tier · ${filtered.length} ${filtered.length === 1 ? "activity" : "activities"}`}
        </span>
      </div>

      {selectedPureTier ? (
        <TierPureProfilePanel stat={selectedPureTier} memberFirstName={memberFirstName} />
      ) : null}

      <div className="freq-report-activity-ceiling-panel">
        <h3>Max activity before frequency drops</h3>
        <p className="freq-report-activity-ceiling-lead">
          Personal ceilings from Week 4 — deep work, exercise, social, and chores capacity before a tier slip.
        </p>
        <div className="freq-report-activity-ceiling-grid">
          {ceilings.map((ceiling) => (
            <article key={ceiling.label} className="freq-report-activity-ceiling-card">
              <strong>{ceiling.label}</strong>
              <span className="freq-report-activity-ceiling-type">{ceiling.capacityType}</span>
              <span className="freq-report-activity-ceiling-capacity">{ceiling.capacity}</span>
              <p>{ceiling.before}</p>
            </article>
          ))}
        </div>
      </div>

      {lifts.length > 0 ? (
        <div className="freq-report-activity-group">
          <h3 className="freq-report-activity-group-title freq-report-activity-group-lift">
            Frequency jumps · {lifts.length} activities
          </h3>
          <StaggerGrid className="freq-report-activity-freq-grid">
            {lifts.map((item) => (
              <ActivityFrequencyCard key={item.key} item={item} />
            ))}
          </StaggerGrid>
        </div>
      ) : null}

      {drops.length > 0 ? (
        <div className="freq-report-activity-group">
          <h3 className="freq-report-activity-group-title freq-report-activity-group-drop">
            Frequency drops · {drops.length} activities
          </h3>
          <StaggerGrid className="freq-report-activity-freq-grid">
            {drops.map((item) => (
              <ActivityFrequencyCard key={item.key} item={item} />
            ))}
          </StaggerGrid>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="freq-report-tier-filter-empty">No activities logged for this tier this week.</p>
      ) : null}
    </div>
  );
}
