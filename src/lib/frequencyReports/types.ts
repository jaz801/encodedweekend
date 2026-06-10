// Shared types for personalized accelerator frequency reports.

import type { ComponentType } from "react";
import type { ActivityInFrequency } from "@/components/ActivitiesFrequencySection";

export type FrequencyReportIconProps = {
  className?: string;
};

export type WatchDashboardItem = {
  label: string;
  value: string;
  delta: string;
  icon: ComponentType<FrequencyReportIconProps>;
};

export type WeekFrequencyDay = {
  day: string;
  date: string;
  access: string;
  volume: number;
  avgTier: number;
  peakTier: number;
  hrv: number;
  segments: readonly { from: number; to: number; tier: number }[];
};

export type ActivityCeiling = {
  label: string;
  capacityType: string;
  capacity: string;
  before: string;
};

export type BiometricCorrelation = {
  indicator: string;
  biometric: string;
  level: string;
  r: string;
  frequencyLink: string;
  outcome: string;
};

export type TierTimeEntry = {
  tier: number;
  pct: number;
  hours: string;
};

export type PeakFrequency = {
  peakTier: number;
  name: string;
  longestBlock: string;
  longestBlockWhen: string;
  daysAtPeak: number;
  daysAtPeakList: string;
  peakStreak: string;
  peakStreakLabel: string;
  cumulativePeakHours: string;
  peakTimePct: string;
};

export type RealityLevel = {
  level: string;
  score: string;
  desc: string;
  active: boolean;
  manifestations: readonly string[];
};

export type FrequencyTier = {
  tier: number;
  name: string;
  active: boolean;
};

export type PureTierStat = {
  tier: number;
  name: string;
  hoursInTier: string;
  normalRestingHr: string;
  normalHrRange: string;
  normalHrvRange: string;
  normalRespiratoryRate: string;
  normalSleep: string;
  normalActiveEnergy: string;
  normalRecovery: string;
  loggedRestingHr: string;
  loggedHrVsNormal: string;
  loggedHrv: string;
  loggedHrvVsNormal: string;
  loggedRespiratoryRate: string;
  loggedSleep: string;
  loggedActiveEnergy: string;
  loggedRecovery: string;
  loggedSteps: string;
  stateNote: string;
};

export type SleepStage = {
  label: string;
  pct: number;
  color: string;
};

export type HrvActivityInsight = {
  label: string;
  detail: string;
  note: string;
  color: string;
};

export type FrequencyReportData = {
  memberName: string;
  memberFirstName: string;
  memberArchetype?: string;
  activityFocus?: string;
  memberPhotoSrc: string;
  reportCycle: string;
  reportRange: string;
  introJournalEntries: string;
  introDataPoints: string;
  heroSubtitle: string;
  bandwidthSummary: string;
  hrvWeek: {
    low: number;
    high: number;
    avg: number;
    band: string;
    priorAvg: number;
  };
  sleepWeek: {
    avg: string;
    low: string;
    high: string;
    score: number;
    efficiency: string;
  };
  sleepStages?: readonly SleepStage[];
  hrvActivityInsights?: readonly HrvActivityInsight[];
  watchDashboard: readonly WatchDashboardItem[];
  weekFrequency: readonly WeekFrequencyDay[];
  activityCeilings: readonly ActivityCeiling[];
  activitiesInFrequency: readonly ActivityInFrequency[];
  biometricCorrelations: readonly BiometricCorrelation[];
  weekTotalHours: number;
  tierTime: readonly TierTimeEntry[];
  peakFrequency: PeakFrequency;
  realityLevels: readonly RealityLevel[];
  frequencyTiers: readonly FrequencyTier[];
  tierPureStats: readonly PureTierStat[];
  realityDiaryScore: string;
  realityPeakDay: string;
  realityPeakScore: string;
  wimHofTarget: string;
  wimHofExperimentNote: string;
  callBody: string;
};
