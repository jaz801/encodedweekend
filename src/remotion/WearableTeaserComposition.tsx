// Added: 2s Remotion motion graphic — ENCODED wearable device coming soon teaser.
// Fixed: removed watch silhouette (black frame, gold dot, white border) from teaser.
// Fixed: shortened to 2s — tighter reveal timing, no trailing hold at end.
// Fixed: replaced generic wave bars with animated ENCODED logo from site header.

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { RemotionEncodedLogo } from "@/remotion/RemotionEncodedLogo";
import { WEARABLE_TEASER_DURATION_FRAMES } from "@/remotion/wearableTeaserConfig";

const GOLD = "#E6BA4A";

export function WearableTeaserComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const copyReveal = spring({
    frame: frame - 10,
    fps,
    config: { damping: 22, stiffness: 110 },
  });

  const tagReveal = spring({
    frame: frame - 20,
    fps,
    config: { damping: 24, stiffness: 120 },
  });

  const sweep = interpolate(frame, [0, WEARABLE_TEASER_DURATION_FRAMES], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 18%, rgba(230,186,74,0.12) 0%, #000000 58%)",
        color: "#ffffff",
        fontFamily: 'var(--font-manrope, "Manrope", "Arial", sans-serif)',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `conic-gradient(from ${sweep * 360}deg at 50% 50%, transparent, rgba(230,186,74,0.06), transparent)`,
          opacity: 0.9,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          padding: "28px 20px",
        }}
      >
        <div style={{ opacity: intro, transform: `translateY(${(1 - intro) * 12}px)` }}>
          <RemotionEncodedLogo frame={frame} height={40} />
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: copyReveal,
            transform: `translateY(${(1 - copyReveal) * 10}px)`,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Wearable device
          </p>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: GOLD,
            fontWeight: 700,
            opacity: tagReveal,
            transform: `scale(${0.92 + tagReveal * 0.08})`,
            textShadow: "0 0 18px rgba(230, 186, 74, 0.35)",
          }}
        >
          Coming soon
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
