// Timeline Lottie harmonization — one animator's hand across every sticky visual.
// Normalizes stroke weight, round caps/joins, and recolors to the site palette.
// Fixed: walk preset recolors Day 3 walking figure strokes white and hides lime backdrop.
// Fixed: spa preset drops bg plate path instead of nested groups that hid the Lottie render.
// Fixed: spa layer re-centered in comp so sticky column aligns with other timeline visuals.

export type LottieRGBA = [number, number, number, number];

export const LOTTIE_WHITE: LottieRGBA = [1, 1, 1, 1];
export const LOTTIE_GOLD: LottieRGBA = [196 / 255, 164 / 255, 108 / 255, 1];
export const LOTTIE_BG: LottieRGBA = [17 / 255, 17 / 255, 17 / 255, 1];

export const LOTTIE_RENDERER_SETTINGS = {
  preserveAspectRatio: "xMidYMid meet",
} as const;

const DISPLAY_SIZE = 120;
const TARGET_VISUAL_STROKE = 2.5;

type LottieColor = { a?: number; k: number[] };
type LottieWidth = { a?: number; k: number };

export function cloneLottie<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

function isDarkColor(color: number[]) {
  return color.length >= 3 && color[0] <= 0.15 && color[1] <= 0.15 && color[2] <= 0.15;
}

function isNearBlack(color: number[]) {
  return color.length >= 3 && color[0] <= 0.04 && color[1] <= 0.04 && color[2] <= 0.04;
}

function isPureBlack(color: number[]) {
  return color.length >= 3 && color[0] === 0 && color[1] === 0 && color[2] === 0;
}

function isPureWhite(color: number[]) {
  return color.length >= 3 && color[0] === 1 && color[1] === 1 && color[2] === 1;
}

function isNotWhite(color: number[]) {
  return color.length >= 3 && !(color[0] > 0.99 && color[1] > 0.99 && color[2] > 0.99);
}

function isExercisePurple(color: number[]) {
  return color.length >= 3 && color[0] > 0.3 && color[0] < 0.42 && color[2] > 0.48;
}

function isExerciseTeal(color: number[]) {
  return color.length >= 3 && color[0] < 0.05 && color[1] > 0.65 && color[2] > 0.65;
}

function isLunchGreen(color: number[]) {
  return color.length >= 3 && color[1] > 0.45 && color[0] < 0.45;
}

function isWalkGreen(color: number[]) {
  return color.length >= 3 && color[1] > 0.95 && color[0] > 0.5 && color[2] < 0.05;
}

function isHackathonLightGray(color: number[]) {
  return color.length >= 3 && color[0] > 0.55 && color[1] > 0.55 && color[2] > 0.55;
}

function isHackathonMidGray(color: number[]) {
  return (
    color.length >= 3 &&
    color[0] > 0.45 &&
    color[0] < 0.75 &&
    color[1] > 0.45 &&
    color[1] < 0.75 &&
    color[2] > 0.45 &&
    color[2] < 0.75
  );
}

function isHackathonDarkGray(color: number[]) {
  return (
    color.length >= 3 &&
    color[0] > 0.15 &&
    color[0] < 0.4 &&
    color[1] > 0.15 &&
    color[1] < 0.4 &&
    color[2] > 0.15 &&
    color[2] < 0.4
  );
}

function isHackathonMaroon(color: number[]) {
  return (
    color.length >= 3 &&
    color[0] > 0.4 &&
    color[1] < 0.15 &&
    color[2] > 0.1 &&
    color[2] < 0.25
  );
}

function isSpaGray(color: number[]) {
  return (
    color.length >= 3 &&
    color[0] > 0.25 &&
    color[0] < 0.55 &&
    color[1] > 0.25 &&
    color[1] < 0.55 &&
    color[2] > 0.25 &&
    color[2] < 0.55
  );
}

/** Spa export bundles a square bg plate with steam paths under one fill — drop the plate only. */
function prepareSpaLottie<T>(data: T): T {
  const next = cloneLottie(data) as T & {
    layers?: Array<{
      shapes?: Array<{
        it?: unknown[];
      }>;
    }>;
  };

  const group = next.layers?.[0]?.shapes?.[0];
  const items = group?.it;

  if (!group || !items || items.length < 6) {
    return data;
  }

  const [pathOne, pathTwo, pathThree, , fill, groupTransform] = items;

  group.it = [pathOne, pathTwo, pathThree, fill, groupTransform];

  return next as T;
}

function replaceColors(
  value: unknown,
  match: (color: number[]) => boolean,
  replacement: LottieRGBA,
): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => replaceColors(item, match, replacement));
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

    next[key] = replaceColors(child, match, replacement);
  }

  return next;
}

function collectStrokeWidths(value: unknown, widths: number[]) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectStrokeWidths(item, widths));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  const record = value as Record<string, unknown>;

  if (record.ty === "st" && record.w && typeof record.w === "object" && "k" in record.w) {
    const width = record.w as LottieWidth;
    if (typeof width.k === "number" && width.k > 0) {
      widths.push(width.k);
    }
  }

  for (const child of Object.values(record)) {
    collectStrokeWidths(child, widths);
  }
}

function median(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function harmonizeStrokeNodes(
  value: unknown,
  scale: number,
  targetStroke: number,
  roundStrokes: boolean,
): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => harmonizeStrokeNodes(item, scale, targetStroke, roundStrokes));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const record = value as Record<string, unknown>;
  const next: Record<string, unknown> = {};

  for (const [key, child] of Object.entries(record)) {
    if (key === "w" && record.ty === "st" && child && typeof child === "object" && "k" in child) {
      const width = child as LottieWidth;
      if (typeof width.k === "number" && width.k > 0) {
        const scaled = width.k * scale;
        next[key] = {
          ...width,
          k: Math.max(targetStroke * 0.72, Math.min(targetStroke * 1.18, scaled)),
        };
        continue;
      }
    }

    if (roundStrokes && record.ty === "st") {
      if (key === "lc" || key === "lj") {
        next[key] = 2;
        continue;
      }
    }

    next[key] = harmonizeStrokeNodes(child, scale, targetStroke, roundStrokes);
  }

  return next;
}

export function harmonizeLottieStrokes<T>(data: T, compWidth = 500): T {
  const widths: number[] = [];
  collectStrokeWidths(data, widths);

  if (widths.length === 0) {
    return data;
  }

  const targetStroke = TARGET_VISUAL_STROKE * (compWidth / DISPLAY_SIZE);
  const scale = targetStroke / median(widths);

  return harmonizeStrokeNodes(data, scale, targetStroke, true) as T;
}

export type LottieColorPreset =
  | "white-line"
  | "brainstorm"
  | "exercise"
  | "lunch-green"
  | "sunset-black"
  | "dinner-fill"
  | "walk"
  | "spa"
  | "hackathon"
  | "none";

export function applyLottieColorPreset<T>(data: T, preset: LottieColorPreset): T {
  switch (preset) {
    case "white-line":
      return replaceColors(data, isNearBlack, LOTTIE_WHITE) as T;
    case "brainstorm":
      return replaceColors(data, isDarkColor, LOTTIE_BG) as T;
    case "exercise": {
      let next = replaceColors(data, isExercisePurple, LOTTIE_GOLD) as T;
      next = replaceColors(next, isExerciseTeal, LOTTIE_WHITE) as T;
      return next;
    }
    case "lunch-green":
      return replaceColors(data, isLunchGreen, LOTTIE_WHITE) as T;
    case "sunset-black":
      return replaceColors(data, isPureBlack, LOTTIE_WHITE) as T;
    case "dinner-fill":
      return replaceColors(data, isNotWhite, LOTTIE_WHITE) as T;
    case "walk": {
      let next = replaceColors(data, isNearBlack, LOTTIE_WHITE) as T;
      next = replaceColors(next, isWalkGreen, LOTTIE_BG) as T;
      return next;
    }
    case "spa":
      return replaceColors(data, isSpaGray, LOTTIE_WHITE) as T;
    case "hackathon": {
      let next = replaceColors(data, isPureWhite, LOTTIE_WHITE) as T;
      next = replaceColors(next, isHackathonLightGray, LOTTIE_WHITE) as T;
      next = replaceColors(next, isHackathonMidGray, LOTTIE_GOLD) as T;
      next = replaceColors(next, isHackathonDarkGray, LOTTIE_BG) as T;
      next = replaceColors(next, isHackathonMaroon, LOTTIE_GOLD) as T;
      return next;
    }
    case "none":
    default:
      return data;
  }
}

export function harmonizeTimelineLottie<T extends { w?: number }>(
  data: T,
  preset: LottieColorPreset,
): T {
  let next = cloneLottie(data);
  if (preset === "spa") {
    next = prepareSpaLottie(next);
  }
  next = applyLottieColorPreset(next, preset);
  next = harmonizeLottieStrokes(next, next.w ?? 500);
  return next;
}
