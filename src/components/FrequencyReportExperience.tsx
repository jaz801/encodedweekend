"use client";

// Added: full accelerator frequency report — Apple Watch metrics × frequency training (brand guide).
// Fixed: Courtney Confare report — HRV band, activity insights, diary chart, Wim Hof experiment.
// Fixed: removed Jasper mission and ENTP build notes from all frequency reports.
// Fixed: hide hero subtitle when empty — Chris Walker report no longer shows header summary paragraph.
// Fixed: hero eyebrow reads "Frequency pro report" (product name).
// Added: dense data layer — summary stats, watch dashboard, daily table, workout log, correlations.
// Fixed: metrics use Tabler Icons (@tabler/icons-react) for polished icon set.
// Added: scroll reveals, HRV/sleep/diary animations, staggered metric cards.
// Fixed: report opens with bandwidth → 7-day 24h access/volume → activities → biometric correlations.
// Removed: sleep stages, HRV-by-activity band, activity report (replaced by new structure).
// Removed: week summary stat strip (Avg HRV, sleep, workouts, etc.).
// Added: expanded activities — lift vs drop, activity ceilings, HRV/sleep/nutrition/energy metrics.
// Added: watch HRV/sleep bandwidth, activity tier filter, tracked-days, High manifestations.
// Added: Apple Watch + Oura Ring in intro; tier hours + peak frequency hold in bandwidth.
// Added: per-day tier hours + frequency jumps in week access; activities use HR/duration/energy only.
// Added: colorful tier-time chart (replaces plain hours table in bandwidth section).
// Added: member-specific report data — Courtney Confare and Chris Walker share this layout.
// Added: optional member archetype badge (ENFP) and activity focus in activities section.
// Fixed: "Before your report" intro moved to encoded acceleration page.

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ActivitiesFrequencySection } from "@/components/ActivitiesFrequencySection";
import { StaggerGrid } from "@/components/FrequencyReportMotion";
import { Reveal } from "@/components/Reveal";
import { FrequencyTierTimeChart } from "@/components/FrequencyTierTimeChart";
import { FrequencyWeekTimeline } from "@/components/FrequencyWeekTimeline";
import {
  countFrequencyJumps,
  hoursAtPeakTier,
  tierHoursBreakdown,
} from "@/lib/frequencyDayStats";
import type { FrequencyReportData } from "@/lib/frequencyReports/types";
import {
  BreathIcon,
  CallIcon,
  FrequencyWaveIcon,
  HeartRateIcon,
  HrvIcon,
  MeditationIcon,
} from "@/components/FrequencyReportIcons";
import { WimHofSchedule } from "@/components/WimHofSchedule";

const WIM_HOF_VIDEO = "https://www.youtube.com/embed/tybOi4hjZFQ";

type FrequencyReportExperienceProps = {
  report: FrequencyReportData;
};

export function FrequencyReportExperience({ report }: FrequencyReportExperienceProps) {
  const weekFrequencyEnriched = useMemo(
    () =>
      report.weekFrequency.map((day) => ({
        ...day,
        peakTierHours: hoursAtPeakTier(day.segments, day.peakTier),
        tierHoursBreakdown: tierHoursBreakdown(day.segments),
        frequencyJumps: countFrequencyJumps(day.segments),
      })),
    [report.weekFrequency],
  );

  return (
    <div className="freq-report">
      <header className="freq-report-hero freq-report-hero-enter">
        <div className="freq-report-member">
          <div className="freq-report-member-photo-wrap freq-report-photo-ring">
            <Image
              src={report.memberPhotoSrc}
              alt={`Portrait of ${report.memberName}`}
              width={120}
              height={120}
              className="freq-report-member-photo"
              priority
            />
          </div>
          <div className="freq-report-member-meta">
            <p className="encoded-measure-eyebrow">Frequency pro report</p>
            <h1 className="freq-report-title">{report.memberName}</h1>
            <p className="freq-report-cycle">
              {report.memberArchetype ? (
                <>
                  <span className="freq-report-archetype">{report.memberArchetype}</span>{" "}
                </>
              ) : null}
              {report.reportCycle} · {report.reportRange}
            </p>
          </div>
        </div>
        {report.heroSubtitle ? (
          <p className="freq-report-subtitle">{report.heroSubtitle}</p>
        ) : null}
      </header>

      <Reveal as="section" className="freq-report-section" id="bandwidth">
        <div aria-labelledby="bandwidth-heading">
        <div className="freq-report-section-head">
          <FrequencyWaveIcon className="freq-report-section-icon" />
          <div>
            <h2 id="bandwidth-heading">Frequency bandwidth</h2>
            <p>{report.bandwidthSummary} · {report.reportRange}</p>
          </div>
        </div>
        <div className="freq-report-bandwidth-track">
          {report.frequencyTiers.map((item) => (
            <div
              key={item.tier}
              className={`freq-report-tier${item.active ? " freq-report-tier-active" : ""}`}
            >
              <span className="freq-report-tier-num">T{item.tier}</span>
              <span className="freq-report-tier-name">{item.name}</span>
              <span className="freq-report-tier-pct">
                {report.tierTime.find((t) => t.tier === item.tier)?.pct ?? 0}% ·{" "}
                {report.tierTime.find((t) => t.tier === item.tier)?.hours ?? "0h"}
              </span>
            </div>
          ))}
          <div className="freq-report-bandwidth-glow" aria-hidden="true" />
        </div>

        <div className="freq-report-tier-time-panel">
          <h3>Time in each frequency · {report.weekTotalHours}h week</h3>
          <FrequencyTierTimeChart
            weekHours={report.weekTotalHours}
            tiers={report.tierTime.filter((t) => t.pct > 0).map((t) => {
              const tierMeta = report.frequencyTiers.find((f) => f.tier === t.tier);
              return {
                tier: t.tier,
                name: tierMeta?.name ?? `Tier ${t.tier}`,
                pct: t.pct,
                hours: t.hours,
              };
            })}
          />
        </div>

        <div className="freq-report-peak-hold-panel">
          <h3>Peak frequency · T{report.peakFrequency.peakTier} {report.peakFrequency.name}</h3>
          <dl className="freq-report-peak-hold-grid">
            <div>
              <dt>Longest single block</dt>
              <dd>{report.peakFrequency.longestBlock}</dd>
              <span>{report.peakFrequency.longestBlockWhen}</span>
            </div>
            <div>
              <dt>Days at peak tier</dt>
              <dd>{report.peakFrequency.daysAtPeak} / 7</dd>
              <span>{report.peakFrequency.daysAtPeakList}</span>
            </div>
            <div>
              <dt>Peak streak</dt>
              <dd>{report.peakFrequency.peakStreak}</dd>
              <span>{report.peakFrequency.peakStreakLabel}</span>
            </div>
            <div>
              <dt>Total time at peak</dt>
              <dd>{report.peakFrequency.cumulativePeakHours}</dd>
              <span>{report.peakFrequency.peakTimePct}</span>
            </div>
          </dl>
        </div>
        </div>
      </Reveal>

      <Reveal as="section" className="freq-report-section" id="week-access">
        <div aria-labelledby="week-access-heading">
        <div className="freq-report-section-head">
          <FrequencyWaveIcon className="freq-report-section-icon" />
          <div>
            <h2 id="week-access-heading">Access frequencies & volume · 7 days</h2>
            <p>
              24-hour tier fluctuations — hours in each frequency, jumps per day, volume score
            </p>
          </div>
        </div>

        <FrequencyWeekTimeline days={weekFrequencyEnriched} />

        <div className="freq-report-data-table-wrap">
          <table className="freq-report-data-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Access</th>
                <th>Hours in frequency</th>
                <th>Jumps</th>
                <th>Volume</th>
                <th>Avg tier</th>
                <th>Peak</th>
                <th>HRV</th>
              </tr>
            </thead>
            <tbody>
              {weekFrequencyEnriched.map((d) => (
                <tr key={d.day}>
                  <td>
                    {d.day} {d.date}
                  </td>
                  <td>{d.access}</td>
                  <td>{d.tierHoursBreakdown}</td>
                  <td>{d.frequencyJumps}</td>
                  <td>{d.volume}</td>
                  <td>{d.avgTier}</td>
                  <td>
                    T{d.peakTier} · {d.peakTierHours}
                  </td>
                  <td>{d.hrv} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </Reveal>

      <Reveal as="section" className="freq-report-section" id="activities-frequency">
        <ActivitiesFrequencySection
          memberFirstName={report.memberFirstName}
          memberArchetype={report.memberArchetype}
          activityFocus={report.activityFocus}
          tierPureStats={report.tierPureStats}
          ceilings={report.activityCeilings}
          activities={report.activitiesInFrequency}
        />
      </Reveal>

      <Reveal as="section" className="freq-report-section freq-report-section-highlight" id="biometric-correlation">
        <div aria-labelledby="biometric-correlation-heading">
        <div className="freq-report-section-head">
          <HrvIcon className="freq-report-section-icon freq-report-icon-heartbeat" />
          <div>
            <h2 id="biometric-correlation-heading">Frequency biometric indicators · correlation levels</h2>
            <p>Apple Watch + Oura Ring signals cross-referenced with logged frequency patterns</p>
          </div>
        </div>

        <div className="freq-report-data-table-wrap">
          <table className="freq-report-data-table freq-report-correlation-table">
            <thead>
              <tr>
                <th>Indicator</th>
                <th>Biometric</th>
                <th>Level</th>
                <th>r</th>
                <th>Frequency link</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {report.biometricCorrelations.map((row) => (
                <tr key={row.indicator}>
                  <td>{row.indicator}</td>
                  <td>{row.biometric}</td>
                  <td>
                    <span className={`freq-report-corr-level freq-report-corr-level-${row.level.toLowerCase()}`}>
                      {row.level}
                    </span>
                  </td>
                  <td>{row.r}</td>
                  <td>{row.frequencyLink}</td>
                  <td>{row.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </Reveal>

      <Reveal as="section" className="freq-report-section" id="watch-dashboard">
        <div aria-labelledby="watch-dashboard-heading">
        <div className="freq-report-section-head">
          <HeartRateIcon className="freq-report-section-icon freq-report-icon-pulse" />
          <div>
            <h2 id="watch-dashboard-heading">Apple Watch & Oura Ring · 7 days</h2>
            <p>Full signal panel — {report.reportRange}</p>
          </div>
        </div>
        <StaggerGrid className="freq-report-dashboard">
          {report.watchDashboard.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="freq-report-dashboard-card">
                <Icon className="freq-report-dashboard-icon freq-report-icon-float" />
                <span className="freq-report-dashboard-label">{item.label}</span>
                <span className="freq-report-dashboard-value">{item.value}</span>
                <span className="freq-report-dashboard-delta">{item.delta}</span>
              </article>
            );
          })}
        </StaggerGrid>
        </div>
      </Reveal>

      <Reveal as="section" className="freq-report-section" id="reality-transform">
        <div aria-labelledby="reality-heading">
        <div className="freq-report-section-head">
          <MeditationIcon className="freq-report-section-icon" />
          <div>
            <h2 id="reality-heading">Reality transformation</h2>
            <p>
              Diary score <strong>{report.realityDiaryScore}</strong> · peak day{" "}
              <strong>{report.realityPeakScore}</strong> ({report.realityPeakDay})
            </p>
          </div>
        </div>
        <StaggerGrid className="freq-report-reality-scale">
          {report.realityLevels.map((item) => (
            <div
              key={item.level}
              className={`freq-report-reality-step${item.active ? " freq-report-reality-step-active freq-report-reality-pulse" : ""}`}
            >
              <span className="freq-report-reality-level">{item.level}</span>
              <span className="freq-report-reality-score">{item.score}</span>
              <p>{item.desc}</p>
              {item.manifestations.length > 0 ? (
                <div className="freq-report-reality-manifestations">
                  <span className="freq-report-reality-manifestations-label">Manifestations logged</span>
                  <ul>
                    {item.manifestations.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </StaggerGrid>
        </div>
      </Reveal>

      <Reveal as="section" className="freq-report-section freq-report-section-highlight" id="wim-hof">
        <div aria-labelledby="wim-hof-heading">
        <div className="freq-report-section-head">
          <BreathIcon className="freq-report-section-icon" />
          <div>
            <h2 id="wim-hof-heading">Next week · Wim Hof breathing</h2>
            <p>{report.wimHofTarget}</p>
          </div>
        </div>

        <div className="freq-report-wim-video">
          <iframe
            src={WIM_HOF_VIDEO}
            title="Wim Hof breathing explained"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <WimHofSchedule />

        <p className="freq-report-experiment-note">{report.wimHofExperimentNote}</p>
        </div>
      </Reveal>

      <Reveal as="section" className="freq-report-section" id="measurement">
        <div aria-labelledby="measurement-heading">
        <div className="freq-report-section-head">
          <HeartRateIcon className="freq-report-section-icon freq-report-icon-pulse" />
          <div>
            <h2 id="measurement-heading">Measurement rhythm</h2>
            <p>Capture window: minute 0 + minute 30 · 2 reads per session</p>
          </div>
        </div>
        <ol className="freq-report-protocol-steps">
          <li>
            <strong>Journal first</strong> — food, movement, emotional tone (avg 4 min).
          </li>
          <li>
            <strong>15–25 min handwriting protocol</strong> — somatic loop, not affirmations.
          </li>
          <li>
            <strong>90-second breath prime</strong> — target respiratory rate &lt; 15 /min.
          </li>
          <li>
            <strong>Read at minute 0 and 30</strong> — HRV + tier delta (avg swing this week: +6 ms).
          </li>
        </ol>
        </div>
      </Reveal>

      <Reveal as="section" className="freq-report-call" id="next-call">
        <div aria-labelledby="next-call-heading">
        <CallIcon className="freq-report-call-icon" />
        <div>
          <p className="encoded-measure-eyebrow" id="next-call-heading">
            Next check-in call
          </p>
          <h2 className="freq-report-call-title">Wednesday · 18:00 CET</h2>
          <p className="freq-report-call-body">{report.callBody}</p>
        </div>
        </div>
      </Reveal>

      <div className="freq-report-footer-nav">
        <Link href="/encoded-acceleration" className="btn btn-ghost frequency-report-back">
          Back to Encoded Acceleration
        </Link>
      </div>
    </div>
  );
}
