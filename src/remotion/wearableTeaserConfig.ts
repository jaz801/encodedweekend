// Added: Remotion config for ENCODED wearable coming-soon teaser (watch screen 244×304, 2s @ 30fps).
// Fixed: trimmed last second — was 3s, now 2s so loop tail no longer reads as a 4th/5th second.

export const WEARABLE_TEASER_FPS = 30;
export const WEARABLE_TEASER_DURATION_FRAMES = 60;
export const WEARABLE_TEASER_WIDTH = 244;
export const WEARABLE_TEASER_HEIGHT = 304;

export const WEARABLE_TEASER = {
  fps: WEARABLE_TEASER_FPS,
  durationInFrames: WEARABLE_TEASER_DURATION_FRAMES,
  width: WEARABLE_TEASER_WIDTH,
  height: WEARABLE_TEASER_HEIGHT,
} as const;
