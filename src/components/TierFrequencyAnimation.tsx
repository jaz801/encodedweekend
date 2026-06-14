// Fixed: tier 5 (Architecture) uses mirrored loop-draw — sin(2θ) horizontal + cos(θ) vertical mirror ovals.
// Fixed: tiers 4 & 5 smoother — dense sampling + continuous phase scroll (no draw-cycle jumps).
// Added: tier 6 (Conductor) — fluctuating baseline + alternating-current sine crossing through it.
// Recurring bug: tier 4 beziers hid loop crossings — keep line segments, not Catmull-Rom/bezier paths.
// Fixed: wave line stalls after scroll — energy/isScrolling no longer restart the rAF loop; pre-roll on mount.

"use client";

import { useEffect, useRef } from "react";

export type FrequencyWaveVariant =
  | "chaotic"
  | "fracture"
  | "signal"
  | "pulse"
  | "lattice"
  | "field";

type TierFrequencyAnimationProps = {
  variant: FrequencyWaveVariant;
  accent?: string;
  energy?: number;
  isScrolling?: boolean;
  phaseOffset?: number;
  timeScale?: number;
  preserveAspectRatio?: string;
};

const WAVE_STROKE = "rgba(255, 255, 255, 0.92)";

const VIEW_W = 244;
const VIEW_H = 104;
const MID_Y = 52;
const POINTS = 72;

const VARIANT_TIME_SCALE: Record<FrequencyWaveVariant, number> = {
  chaotic: 1,
  fracture: 0.88,
  signal: 1,
  pulse: 1.05,
  lattice: 1.1,
  field: 1.15,
};

type WaveSampler = (x: number, t: number, energy: number) => number;

function sampleWobbly(x: number, t: number, energy: number) {
  const amp = 21 * (0.74 + energy * 0.2);
  const breath = 0.68 + 0.32 * Math.sin(t * 0.95 + 0.4);
  const slow = Math.sin(x * Math.PI * 2.8 + t * 1.6) * 0.48;
  const mid = Math.sin(x * Math.PI * 5.4 - t * 2.3 + 0.8) * 0.34;
  const fast = Math.sin(x * Math.PI * 9.1 + t * 3.8) * 0.22;
  const shimmy = Math.sin(x * Math.PI * 14 + t * 5.2) * 0.1 * Math.sin(t * 4.6);
  return MID_Y + (slow + mid + fast + shimmy) * amp * breath;
}

function sampleCurved(x: number, t: number, energy: number) {
  const amp = 19 * (0.74 + energy * 0.2);
  const phase = t * 0.62;
  const arcA = Math.sin(x * Math.PI * 1.35 + phase) * 0.72;
  const arcB = Math.sin(x * Math.PI * 0.75 - phase * 0.8 + 1.2) * 0.38;
  const spine = Math.cos((x - 0.5) * Math.PI * 1.1 + phase * 0.5) * 0.28;
  return MID_Y + (arcA + arcB + spine) * amp;
}

function sampleSynchronous(x: number, t: number, energy: number) {
  const amp = 18 * (0.74 + energy * 0.2);
  const phaseWobble = Math.sin(t * 0.38 + 0.5) * 0.18;
  const phase = t * 2.1 + phaseWobble;

  const breath =
    0.76 +
    0.14 * Math.sin(phase * 0.44) +
    0.1 * Math.sin(phase * 0.67 + 1.1) * Math.cos(phase * 0.31);

  const carrier = Math.sin(x * Math.PI * 3.2 + phase);
  const swell = 0.86 + 0.14 * Math.cos(x * Math.PI * 1.45 + phase * 0.55);
  const flow = Math.sin(x * Math.PI * 3.2 + phase) * Math.sin(x * Math.PI * 0.9 + phase * 0.4) * 0.1;
  const drift = Math.sin(x * Math.PI * 2.4 + phase * 1.5) * 0.06;

  const blend = carrier * swell + flow + drift;
  return MID_Y + blend * amp * breath;
}

const LOOP_DRAW_STEP = 0.2;

type LoopDrawOptions = {
  forwardSpeed?: number;
  loopWidthScale?: number;
  loopHeightScale?: number;
};

/** Tier 4 — progressive loops; phase scrolls continuously for fluid motion */
function buildLoopDrawPath(t: number, energy: number, options: LoopDrawOptions = {}) {
  const loopCycle = 14;
  const loopWidth = 30 * (options.loopWidthScale ?? 0.88 + energy * 0.08);
  const loopHeight = 22 * (options.loopHeightScale ?? 0.74 + energy * 0.2);
  const phaseSpeed = options.forwardSpeed ?? 10.5;
  const startX = VIEW_W * 0.06;
  const maxDrawDistance = VIEW_W * 0.88;
  const phaseOffset = t * phaseSpeed;

  const points: { x: number; y: number }[] = [];

  for (let currentProgress = 0; currentProgress <= maxDrawDistance; currentProgress += LOOP_DRAW_STEP) {
    const angle = (currentProgress + phaseOffset) / loopCycle;
    const x = startX + currentProgress - Math.cos(angle) * loopWidth;
    const y = MID_Y + Math.sin(angle) * loopHeight;
    points.push({ x, y });
  }

  if (points.length < 2) return "";
  return pointsToLinePath(points);
}

/** Tier 4 — progressive loops (upward-biased ovals) */
function buildTier4LoopPath(t: number, energy: number) {
  return buildLoopDrawPath(t, energy);
}

/**
 * Tier 5 — mirrored loop draw (loopCanvas mirror math)
 * x = startX + progress − sin(angle·2)·loopWidth
 * y = centerY + cos(angle)·loopHeight
 */
function buildTier5MirrorLoopPath(t: number, energy: number) {
  const loopWidth = 20 * (0.9 + energy * 0.08);
  const loopHeight = 23 * (0.78 + energy * 0.16);
  const angleDivisor = 16;
  const phaseSpeed = 9.5;
  const startX = VIEW_W * 0.1;
  const maxDrawDistance = VIEW_W * 0.78;
  const phaseOffset = t * phaseSpeed;

  const points: { x: number; y: number }[] = [];

  for (let currentProgress = 0; currentProgress <= maxDrawDistance; currentProgress += LOOP_DRAW_STEP) {
    const angle = (currentProgress + phaseOffset) / angleDivisor;
    const x = startX + currentProgress - Math.sin(angle * 2) * loopWidth;
    const y = MID_Y + Math.cos(angle) * loopHeight;
    points.push({ x, y });
  }

  if (points.length < 2) return "";
  return pointsToLinePath(points);
}

function pointsToLinePath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  return path;
}

function pointsToSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const previous = points[Math.max(0, i - 1)];
    const current = points[i];
    const next = points[i + 1];
    const after = points[Math.min(points.length - 1, i + 2)];

    const cp1x = current.x + (next.x - previous.x) / 6;
    const cp1y = current.y + (next.y - previous.y) / 6;
    const cp2x = next.x - (after.x - current.x) / 6;
    const cp2y = next.y - (after.y - current.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}

type ACFieldPaths = {
  wave: string;
  baseline: string;
};

/** Tier 6 — AC current: sine wave alternates above/below a gently fluctuating baseline */
function buildTier6ACPaths(t: number, energy: number): ACFieldPaths {
  const currentAmp = 18 * (0.76 + energy * 0.18);
  const cycles = 3.35;
  const phaseSpeed = 5.4;
  const baselineDrift = 4 * (0.82 + energy * 0.12);
  const step = LOOP_DRAW_STEP;

  const wavePoints: { x: number; y: number }[] = [];
  const baselinePoints: { x: number; y: number }[] = [];

  for (let x = 0; x <= VIEW_W; x += step) {
    const xNorm = x / VIEW_W;
    const baseline =
      MID_Y +
      Math.sin(xNorm * Math.PI * 3.3 + t * 0.78) * baselineDrift +
      Math.sin(xNorm * Math.PI * 1.1 - t * 0.42) * baselineDrift * 0.38;

    const acPhase = xNorm * cycles * Math.PI * 2 + t * phaseSpeed;
    const current = Math.sin(acPhase) * currentAmp;

    baselinePoints.push({ x, y: baseline });
    wavePoints.push({ x, y: baseline + current });
  }

  return {
    baseline: pointsToLinePath(baselinePoints),
    wave: pointsToLinePath(wavePoints),
  };
}

const WAVE_SAMPLERS: Record<FrequencyWaveVariant, WaveSampler> = {
  chaotic: sampleWobbly,
  fracture: sampleCurved,
  signal: sampleSynchronous,
  pulse: sampleSynchronous,
  lattice: sampleSynchronous,
  field: sampleSynchronous,
};

type PathBuilder = (t: number, energy: number) => string;

const PATH_BUILDERS: Partial<Record<FrequencyWaveVariant, PathBuilder>> = {
  pulse: buildTier4LoopPath,
  lattice: buildTier5MirrorLoopPath,
};

function buildWavePath(t: number, sampler: WaveSampler, energy: number) {
  const points = Array.from({ length: POINTS + 1 }, (_, index) => {
    const xNorm = index / POINTS;
    const x = xNorm * VIEW_W;
    return { x, y: sampler(xNorm, t, energy) };
  });

  return pointsToSmoothPath(points);
}

const PRE_ROLL_SECONDS = 2.4;

// Fixed: meetup wave rows felt static — phaseOffset + timeScale desync layered signal waves.
// Fixed: blocky meetup wave — optional preserveAspectRatio + denser path sampling (72 pts).

export function TierFrequencyAnimation({
  variant,
  energy = 1,
  isScrolling = false,
  phaseOffset = 0,
  timeScale = 1,
  preserveAspectRatio = "none",
}: TierFrequencyAnimationProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const baselinePathRef = useRef<SVGPathElement>(null);
  const frameRef = useRef(0);
  const startRef = useRef<number | null>(null);
  const energyRef = useRef(energy);
  const isScrollingRef = useRef(isScrolling);
  const phaseOffsetRef = useRef(phaseOffset);
  const timeScaleRef = useRef(timeScale);
  const isACField = variant === "field";
  const sampler = WAVE_SAMPLERS[variant];
  const pathBuilder = PATH_BUILDERS[variant];

  energyRef.current = energy;
  isScrollingRef.current = isScrolling;
  phaseOffsetRef.current = phaseOffset;
  timeScaleRef.current = timeScale;

  useEffect(() => {
    startRef.current = null;

    const tick = (now: number) => {
      if (startRef.current === null) {
        startRef.current = now - PRE_ROLL_SECONDS * 1000;
      }

      const timeScale =
        VARIANT_TIME_SCALE[variant] *
        timeScaleRef.current *
        (isScrollingRef.current ? 1.22 : 1) *
        (0.82 + energyRef.current * 0.12);
      const elapsed =
        ((now - startRef.current) / 1000) * timeScale + phaseOffsetRef.current;

      if (isACField) {
        const paths = buildTier6ACPaths(elapsed, energyRef.current);
        pathRef.current?.setAttribute("d", paths.wave);
        baselinePathRef.current?.setAttribute("d", paths.baseline);
      } else {
        const path = pathBuilder
          ? pathBuilder(elapsed, energyRef.current)
          : buildWavePath(elapsed, sampler, energyRef.current);
        pathRef.current?.setAttribute("d", path);
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameRef.current);
  }, [isACField, pathBuilder, sampler, variant]);

  const initialElapsed = PRE_ROLL_SECONDS + phaseOffset;

  const initialACPaths = isACField ? buildTier6ACPaths(initialElapsed, energy) : null;
  const initialPath = pathBuilder
    ? pathBuilder(initialElapsed, energy)
    : buildWavePath(initialElapsed, sampler, energy);

  return (
    <div
      className={`encoded-watch-freq-anim encoded-watch-freq-anim--${variant}${isScrolling ? " is-scrolling" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="encoded-watch-freq-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio={preserveAspectRatio}
      >
        {isACField ? (
          <path
            ref={baselinePathRef}
            d={initialACPaths?.baseline ?? ""}
            fill="none"
            stroke="rgba(255, 255, 255, 0.34)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 5"
            className="encoded-watch-freq-baseline"
          />
        ) : null}
        <path
          ref={pathRef}
          d={isACField ? (initialACPaths?.wave ?? "") : initialPath}
          fill="none"
          stroke={WAVE_STROKE}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="encoded-watch-freq-wave"
        />
      </svg>
    </div>
  );
}
