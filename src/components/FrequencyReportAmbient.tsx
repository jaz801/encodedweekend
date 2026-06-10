"use client";

// Added: ambient orbs for enhanced frequency reports — CSS-only floating accents behind content.
// Fixed: shared by Courtney and Chris Walker reports (was Courtney-only ENFP ambient).

export function FrequencyReportAmbient() {
  return (
    <div className="freq-report-ambient" aria-hidden="true">
      <span className="freq-report-ambient-orb freq-report-ambient-orb-1" />
      <span className="freq-report-ambient-orb freq-report-ambient-orb-2" />
      <span className="freq-report-ambient-orb freq-report-ambient-orb-3" />
      <span className="freq-report-ambient-orb freq-report-ambient-orb-4" />
      <span className="freq-report-ambient-orb freq-report-ambient-orb-5" />
      <span className="freq-report-ambient-wave" />
    </div>
  );
}
