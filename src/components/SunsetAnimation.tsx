"use client";

// Sunset Lottie for Day 1 beach walk — black strokes recolored white; loops full sunset scene.

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useMemo, useRef } from "react";
import sunsetData from "@/assets/sunset.json";

const STROKE_WHITE: [number, number, number, number] = [1, 1, 1, 1];
const SUNSET_HOLD_FRAME = 85;
const ANIMATION_OUT_POINT = 90;

type LottieColor = { a?: number; k: number[] };

type SunsetAnimationProps = {
  isActive?: boolean;
};

function isLottieBlack(color: number[]) {
  return color.length >= 3 && color[0] === 0 && color[1] === 0 && color[2] === 0;
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

function prepareSunsetAnimation() {
  const data = replaceFillColors(
    JSON.parse(JSON.stringify(sunsetData)),
    isLottieBlack,
    STROKE_WHITE,
  ) as typeof sunsetData;

  return {
    ...data,
    op: ANIMATION_OUT_POINT,
  };
}

export function SunsetAnimation({ isActive = false }: SunsetAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStarted = useRef(false);
  const animationData = useMemo(() => prepareSunsetAnimation(), []);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      player.goToAndStop(SUNSET_HOLD_FRAME, true);
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
    <div className="sunset-scene" aria-hidden="true">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className="lottie-sunset"
      />
    </div>
  );
}
