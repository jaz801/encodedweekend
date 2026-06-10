// Encoded acceleration content — tier activity groups and transition protocols.
// Fixed: ENFP-optimised activity data without archetype labels in user-facing copy.

export type FrequencyActivityItem = {
  label: string;
  note: string;
};

export type FrequencyActivityGroup = {
  id: string;
  buttonLabel: string;
  title: string;
  tierRange: string;
  description: string;
  activities: readonly FrequencyActivityItem[];
};

export const ACTIVITY_FOCUS =
  "Instagram content, design management, course building, exercise, reflection, friends & family";

export const FREQUENCY_ACTIVITY_GROUPS: readonly FrequencyActivityGroup[] = [
  {
    id: "tier-12",
    buttonLabel: "1 · 2",
    title: "Activities in Tier 1–2",
    tierRange: "Survival & Scarcity → Breaking the Illusion",
    description:
      "Grounding and recovery — dip here when overstimulated, isolated, or running on comparison loops.",
    activities: [
      { label: "Sleep recovery blocks", note: "Floor 6h 30m · no tier lift below" },
      { label: "Gentle walks", note: "Low-HR movement to exit reactive loops" },
      { label: "Home reset / chores", note: "Cap 2h — over-cap eats social recovery window" },
      { label: "Nourishing meals", note: "Skipped meals pull bandwidth back into T2" },
      { label: "Digital detox windows", note: "No metrics scroll after posting" },
      { label: "Grounding reflection", note: "Short journal — not full creative sprint" },
    ],
  },
  {
    id: "tier-34",
    buttonLabel: "3 · 4",
    title: "Activities in Tier 3–4",
    tierRange: "ENCODED Activation → Energetic Mastery",
    description:
      "Primary bandwidth — creative output, people energy, and reflection in balance.",
    activities: [
      { label: "Instagram content", note: "Batch after reflection · strongest T3→T4 lift" },
      { label: "Design management", note: "Visual leadership · pace stakeholder blocks" },
      { label: "Course building", note: "Builder mode · 4h deep-work time limit" },
      { label: "Exercise", note: "Gym + walks · cap 1h 20m / day" },
      { label: "Reflection", note: "Morning pages · anchors scattered ideation" },
      { label: "Friends / family", note: "Restorative connection — not draining meetings" },
    ],
  },
  {
    id: "tier-56",
    buttonLabel: "5 · 6",
    title: "Activities in Tier 5–6",
    tierRange: "Reality Architecture → Frequency Field Conductor",
    description:
      "Peak expression — teaching, vision, and field-hold when T3–T4 foundation is stable.",
    activities: [
      { label: "Live teaching / facilitation", note: "Room follows your pacing without forcing" },
      { label: "Vision mapping sessions", note: "Long-horizon course + brand architecture" },
      { label: "Group frequency leadership", note: "Cohort check-ins that shift collective tone" },
      { label: "Manifestation journaling", note: "Reality score 7+ logged outcomes" },
      { label: "Distortion-field conversations", note: "Partnership / collab doors open in hours" },
      { label: "Creative keynote prep", note: "Instagram + course fuse into single narrative" },
    ],
  },
] as const;

export const FREQUENCY_TRANSITION_GROUP: FrequencyActivityGroup = {
  id: "transition",
  buttonLabel: "Transitions",
  title: "Frequency transition activities",
  tierRange: "T2 ↔ T3 ↔ T4 ↔ T5",
  description:
    "Protocols that move you between bands — the accelerator measures these as closely as pure-tier work.",
  activities: [
    { label: "Reflection → Instagram batch", note: "T2 → T3 · morning pages before content" },
    { label: "Exercise bridge after design overload", note: "T3 hold · 32 min walk resets HR" },
    { label: "Friends dinner after draining meetings", note: "T2 → T3 · restorative vs administrative social" },
    { label: "Breath prime before course sprint", note: "T3 → T4 · 90s before deep work" },
    { label: "Course block → reflection close", note: "T4 → T3 · prevents ideation scatter" },
    { label: "Sleep floor before T4 push", note: "T2 → T4 blocked without 7h sleep" },
    { label: "Wim Hof round → HRV read", note: "Next-week experiment · tier + biometrics" },
    { label: "Journal after exercise over-cap", note: "T4 → T2 recovery · next-day HRV watch" },
  ],
};
