// Added: frame-driven ENCODED logo for Remotion — matches nav logo wave scroll animation.
// Fixed: wearable teaser used generic bars — now uses same logo + gold wave scroll as site header.

import {
  ENCODED_LOGO_TYPE_PATHS,
  ENCODED_LOGO_VIEWBOX,
  ENCODED_LOGO_WAVE_BARS,
} from "@/lib/encodedLogoPaths";

const LOGO_WHITE = "#FFFFFF";
const LOGO_GOLD = "#C4A46C";
const WAVE_SCROLL_PERIOD_FRAMES = 42;
const WAVE_SCROLL_DISTANCE = 8;

type RemotionEncodedLogoProps = {
  frame: number;
  height?: number;
};

export function RemotionEncodedLogo({ frame, height = 38 }: RemotionEncodedLogoProps) {
  const waveOffset =
    ((frame % WAVE_SCROLL_PERIOD_FRAMES) / WAVE_SCROLL_PERIOD_FRAMES) * WAVE_SCROLL_DISTANCE;

  return (
    <svg
      viewBox={ENCODED_LOGO_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ENCODED"
      role="img"
      style={{
        display: "block",
        height,
        width: "auto",
        overflow: "visible",
      }}
    >
      <defs>
        <clipPath id="remotion-encoded-wave-clip">
          {ENCODED_LOGO_WAVE_BARS.map((d) => (
            <path key={d} d={d} />
          ))}
        </clipPath>

        <pattern
          id="remotion-encoded-wave-pattern"
          width="8"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="24" fill={LOGO_WHITE} />
          <rect x="4" width="4" height="24" fill={LOGO_GOLD} />
        </pattern>
      </defs>

      <g>
        {ENCODED_LOGO_TYPE_PATHS.map((d) => (
          <path key={d} d={d} fill={LOGO_WHITE} />
        ))}
      </g>

      <g clipPath="url(#remotion-encoded-wave-clip)">
        <rect
          x="-16"
          y="0"
          width="48"
          height="24"
          fill="url(#remotion-encoded-wave-pattern)"
          transform={`translate(${waveOffset} 0)`}
        />
      </g>
    </svg>
  );
}
