// Derives hours per tier and frequency jump count from 24h timeline segments.
// Used by Access frequencies & volume — hours in band + jump count per day.

export type FrequencyDaySegment = {
  from: number;
  to: number;
  tier: number;
};

export function formatTierHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function countFrequencyJumps(segments: readonly FrequencyDaySegment[]): number {
  let jumps = 0;
  for (let i = 1; i < segments.length; i++) {
    if (segments[i].tier !== segments[i - 1].tier) jumps++;
  }
  return jumps;
}

export function tierHoursByTier(segments: readonly FrequencyDaySegment[]): Record<number, number> {
  const byTier: Record<number, number> = {};
  for (const seg of segments) {
    byTier[seg.tier] = (byTier[seg.tier] ?? 0) + (seg.to - seg.from);
  }
  return byTier;
}

export function tierHoursBreakdown(segments: readonly FrequencyDaySegment[]): string {
  return Object.entries(tierHoursByTier(segments))
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([tier, hours]) => `T${tier} ${formatTierHours(hours)}`)
    .join(" · ");
}

export function hoursAtPeakTier(
  segments: readonly FrequencyDaySegment[],
  peakTier: number,
): string {
  const hours = tierHoursByTier(segments)[peakTier] ?? 0;
  return formatTierHours(hours);
}
