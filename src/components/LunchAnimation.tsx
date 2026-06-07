"use client";

// Fork/knife Lottie for Day 1 lunch — greens recolored white; loops before green pulse fade.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useMemo, useRef } from "react";
import lunchCutleryData from "@/assets/lunch-cutlery.json";

const CUTLERY_WHITE: [number, number, number, number] = [1, 1, 1, 1];
const CUTLERY_HOLD_FRAME = 28;
const ANIMATION_OUT_POINT = 30;

type LottieColor = { a?: number; k: number[] };

type LunchAnimationProps = {
  isActive?: boolean;
};

function isLottieGreen(color: number[]) {
  return color.length >= 3 && color[1] > 0.45 && color[0] < 0.45;
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

function prepareLunchAnimation() {
  const data = replaceFillColors(
    JSON.parse(JSON.stringify(lunchCutleryData)),
    isLottieGreen,
    CUTLERY_WHITE,
  ) as typeof lunchCutleryData;

  return {
    ...data,
    op: ANIMATION_OUT_POINT,
  };
}

export function LunchAnimation({ isActive = false }: LunchAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStarted = useRef(false);
  const animationData = useMemo(() => prepareLunchAnimation(), []);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      player.goToAndStop(CUTLERY_HOLD_FRAME, true);
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
    <div className="lunch-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-lunch"
      />
    </div>
  );
}
