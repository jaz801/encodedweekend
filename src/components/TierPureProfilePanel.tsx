"use client";

// Pure tier profile — normal HR, HRV, sleep, and other stats when a tier filter is selected.
// Fixed: clicking T2–T4 shows ENCODED baseline ranges vs member's logged week values.

import type { CSSProperties } from "react";
import type { PureTierStat } from "@/lib/frequencyReports/types";

const TIER_COLORS: Record<number, string> = {
  1: "#6b8cae",
  2: "#6b8cae",
  3: "#c4a46c",
  4: "#e6ba4a",
  5: "#8ec0ff",
  6: "#eeeeee",
};

type TierPureProfilePanelProps = {
  stat: PureTierStat;
  memberFirstName: string;
};

export function TierPureProfilePanel({ stat, memberFirstName }: TierPureProfilePanelProps) {
  const tierColor = TIER_COLORS[stat.tier] ?? TIER_COLORS[3];

  return (
    <section
      className="freq-report-pure-tier-panel"
      style={{ "--pure-tier-color": tierColor } as CSSProperties}
      aria-labelledby={`pure-tier-${stat.tier}-heading`}
    >
      <header className="freq-report-pure-tier-head">
        <span className="freq-report-pure-tier-badge">T{stat.tier}</span>
        <div>
          <h3 id={`pure-tier-${stat.tier}-heading`}>Pure tier · {stat.name}</h3>
          <p>Normal biometric range when holding this frequency — vs {memberFirstName}&apos;s logged week</p>
        </div>
        <span className="freq-report-pure-tier-hours">{stat.hoursInTier} this week</span>
      </header>

      <div className="freq-report-pure-tier-columns">
        <div className="freq-report-pure-tier-col">
          <h4>ENCODED normal</h4>
          <dl className="freq-report-pure-tier-grid">
            <div>
              <dt>Resting HR</dt>
              <dd>{stat.normalRestingHr}</dd>
              <span>Range {stat.normalHrRange}</span>
            </div>
            <div>
              <dt>HRV</dt>
              <dd>{stat.normalHrvRange}</dd>
              <span>RMSSD band</span>
            </div>
            <div>
              <dt>Respiratory rate</dt>
              <dd>{stat.normalRespiratoryRate}</dd>
            </div>
            <div>
              <dt>Sleep</dt>
              <dd>{stat.normalSleep}</dd>
            </div>
            <div>
              <dt>Active energy</dt>
              <dd>{stat.normalActiveEnergy}</dd>
            </div>
            <div>
              <dt>Recovery score</dt>
              <dd>{stat.normalRecovery}</dd>
            </div>
          </dl>
        </div>

        <div className="freq-report-pure-tier-col freq-report-pure-tier-col-logged">
          <h4>{memberFirstName} logged</h4>
          <dl className="freq-report-pure-tier-grid">
            <div>
              <dt>Resting HR</dt>
              <dd>{stat.loggedRestingHr}</dd>
              <span>{stat.loggedHrVsNormal}</span>
            </div>
            <div>
              <dt>HRV</dt>
              <dd>{stat.loggedHrv}</dd>
              <span>{stat.loggedHrvVsNormal}</span>
            </div>
            <div>
              <dt>Respiratory rate</dt>
              <dd>{stat.loggedRespiratoryRate}</dd>
            </div>
            <div>
              <dt>Sleep</dt>
              <dd>{stat.loggedSleep}</dd>
            </div>
            <div>
              <dt>Active energy</dt>
              <dd>{stat.loggedActiveEnergy}</dd>
            </div>
            <div>
              <dt>Recovery score</dt>
              <dd>{stat.loggedRecovery}</dd>
            </div>
            <div>
              <dt>Steps (avg)</dt>
              <dd>{stat.loggedSteps}</dd>
            </div>
            <div>
              <dt>Mind-body state</dt>
              <dd>{stat.stateNote}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
