"use client";

// Brainstorm Lottie for Day 1 — dark fills matched to --bg; loops trimmed range (no blank tail frames).
// Recurring bug: source op=100 plays past bulb layers (they end ~frame 98), leaving a blank final frame.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useMemo, useRef } from "react";
import brainstormingData from "@/assets/brainstorming.json";

const BG_LOTTIE: [number, number, number, number] = [17 / 255, 17 / 255, 17 / 255, 1];
const BULB_HOLD_FRAME = 97;
const ANIMATION_OUT_POINT = 98;

type LottieColor = { a?: number; k: number[] };

type BrainstormAnimationProps = {
  isActive?: boolean;
};

function isLottieDarkFill(color: number[]) {
  return color.length >= 3 && color[0] < 0.15 && color[1] < 0.15 && color[2] < 0.15;
}

function replaceFillColors(
  value: unknown,
  match: (color: number[]) => boolean,
  replacement: [number, number, number, number],
): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => replaceFillColors(item, match, replacement));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const record = value as Record<string, unknown>;
  const next: Record<string, unknown> = {};

  for (const [key, child] of Object.entries(record)) {
    if (key === "c" && child && typeof child === "object" && "k" in child) {
      const color = child as LottieColor;
      if (Array.isArray(color.k) && match(color.k)) {
        next[key] = { ...color, k: [...replacement] };
        continue;
      }
    }

    next[key] = replaceFillColors(child, match, replacement);
  }

  return next;
}

function prepareBrainstormAnimation() {
  const data = replaceFillColors(
    JSON.parse(JSON.stringify(brainstormingData)),
    isLottieDarkFill,
    BG_LOTTIE,
  ) as typeof brainstormingData;

  return {
    ...data,
    op: ANIMATION_OUT_POINT,
  };
}

export function BrainstormAnimation({ isActive = false }: BrainstormAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStarted = useRef(false);
  const animationData = useMemo(() => prepareBrainstormAnimation(), []);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      player.goToAndStop(BULB_HOLD_FRAME, true);
      return;
    }

    if (isActive) {
      if (!hasStarted.current) {
        hasStarted.current = true;
        player.goToAndPlay(0, true);
      } else {
        player.play();
      }
      return;
    }

    player.pause();
  }, [isActive]);

  return (
    <div className="brainstorm-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-brainstorm"
      />
    </div>
  );
}
