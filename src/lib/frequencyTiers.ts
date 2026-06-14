// Added: ENCODED frequency tier data for Apple Watch prototype.
// Fixed: each tier includes description text shown on the watch via horizontal swipe.

export type FrequencyWaveVariant =
  | "chaotic"
  | "fracture"
  | "signal"
  | "pulse"
  | "lattice"
  | "field";

export type FrequencyTier = {
  id: number;
  name: string;
  shortLabel: string;
  tagline: string;
  description: string;
  accent: string;
  glow: string;
  screenClass: string;
  waveVariant: FrequencyWaveVariant;
};

export const FREQUENCY_TIERS: FrequencyTier[] = [
  {
    id: 1,
    name: "Survival & Scarcity",
    shortLabel: "Survival",
    tagline: "Fear · defense · validation loops",
    description:
      "Driven by fear, high cognitive load, and external validation. Operating purely from defense and safety loops.",
    accent: "#ff5f6d",
    glow: "rgba(255, 95, 109, 0.42)",
    screenClass: "encoded-watch-tier-screen--1",
    waveVariant: "chaotic",
  },
  {
    id: 2,
    name: "Breaking the Illusion",
    shortLabel: "Awakening",
    tagline: "Spot the invisible ceilings",
    description:
      "The initial awakening phase. Recognizing limiting beliefs and spotting the invisible ceilings that held you in place.",
    accent: "#ff9f43",
    glow: "rgba(255, 159, 67, 0.38)",
    screenClass: "encoded-watch-tier-screen--2",
    waveVariant: "fracture",
  },
  {
    id: 3,
    name: "ENCODED Activation",
    shortLabel: "Activation",
    tagline: "Signal clear · purpose returns",
    description:
      "Signal clears and purpose returns. Nervous system capacity expands as biometrics and bandwidth begin to align.",
    accent: "#e6ba4a",
    glow: "rgba(230, 186, 74, 0.45)",
    screenClass: "encoded-watch-tier-screen--3",
    waveVariant: "signal",
  },
  {
    id: 4,
    name: "Energetic Mastery",
    shortLabel: "Mastery",
    tagline: "High impact without crashing",
    description:
      "High impact without crashing. Steady energetic output — looping forward with control, momentum, and recovery in balance.",
    accent: "#4ecdc4",
    glow: "rgba(78, 205, 196, 0.38)",
    screenClass: "encoded-watch-tier-screen--4",
    waveVariant: "pulse",
  },
  {
    id: 5,
    name: "Reality Architecture",
    shortLabel: "Architecture",
    tagline: "Design life · remove friction",
    description:
      "Design life and remove friction. Patterns interweave harmoniously — you shape outcomes instead of reacting to them.",
    accent: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.38)",
    screenClass: "encoded-watch-tier-screen--5",
    waveVariant: "lattice",
  },
  {
    id: 6,
    name: "Frequency Field Conductor",
    shortLabel: "Conductor",
    tagline: "Sovereign · regenerative · unshakeable",
    description:
      "Sovereign, regenerative, and unshakeable. The highest field — rapid infinity cycles flowing without resistance.",
    accent: "#f5f0e6",
    glow: "rgba(245, 240, 230, 0.32)",
    screenClass: "encoded-watch-tier-screen--6",
    waveVariant: "field",
  },
];
