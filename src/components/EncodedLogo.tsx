// Fixed: fluid animation failed inside SVG pattern — now scrolls a striped layer clipped to wave bars.
// Added: showWordmark prop — nav uses wave icon + separate ENCODED wordmark.

import { useId } from "react";
import {
  ENCODED_LOGO_TYPE_PATHS,
  ENCODED_LOGO_VIEWBOX,
  ENCODED_LOGO_WAVE_BARS,
} from "@/lib/encodedLogoPaths";

type EncodedLogoProps = {
  className?: string;
  /** When false, renders wave icon only (pair with `.brand-wordmark` in nav). */
  showWordmark?: boolean;
};

function safeSvgId(prefix: string, reactId: string) {
  return `${prefix}-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

export function EncodedLogo({ className = "", showWordmark = true }: EncodedLogoProps) {
  const patternId = safeSvgId("encoded-wave-pattern", useId());
  const clipId = safeSvgId("encoded-wave-clip", useId());

  return (
    <svg
      className={`encoded-logo ${className}`.trim()}
      viewBox={showWordmark ? ENCODED_LOGO_VIEWBOX : "0 0 22 24"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={showWordmark ? undefined : true}
      aria-label={showWordmark ? "ENCODED" : undefined}
      role={showWordmark ? "img" : undefined}
    >
      <defs>
        <clipPath id={clipId}>
          {ENCODED_LOGO_WAVE_BARS.map((d) => (
            <path key={d} d={d} />
          ))}
        </clipPath>

        <pattern id={patternId} width="8" height="24" patternUnits="userSpaceOnUse">
          <rect width="4" height="24" fill="currentColor" />
          <rect x="4" width="4" height="24" className="encoded-wave-gold" />
        </pattern>
      </defs>

      {showWordmark ? (
        <g className="encoded-logo-type">
          {ENCODED_LOGO_TYPE_PATHS.map((d) => (
            <path key={d} d={d} fill="currentColor" />
          ))}
        </g>
      ) : null}

      <g className="encoded-wave-icon" clipPath={`url(#${clipId})`}>
        <rect
          className="encoded-wave-fluid"
          x="-16"
          y="0"
          width="48"
          height="24"
          fill={`url(#${patternId})`}
        />
      </g>
    </svg>
  );
}
