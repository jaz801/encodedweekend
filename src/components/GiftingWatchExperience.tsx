// Added: Gifting watch flow — tap egg 10× to crack, reveal randomized ENCODED NFT card.
// Recurring bug: stale cracking flag blocked mint — tap count alone triggers reveal now.
// Fixed: egg crack — SVG shell splits into fragments; progressive jagged crack paths per tap.
// Fixed: NFT card art — animated Chamber-style V emblem replaces generic geometric rays.
// Fixed: NFT card tap now dismisses back to clock screen via onDismiss callback.
// Fixed: grey card bg — full animated geometric energy mesh powers each minted NFT card.
// Added: entry pass card flip — tap front to reveal QR code back; tap backdrop to close.
// Fixed: hologram egg — single intact shell (no fragment seam stripes); gold/cyan holo, cracks on tap only.

"use client";

import { useCallback, useState, type CSSProperties } from "react";
import QRCode from "react-qr-code";
import { CHAMBER_V_STROKES, CHAMBER_V_VIEWBOX } from "@/lib/chamberVPattern";
import {
  entryPassVerifyUrl,
  mintEncodedGiftNft,
  type EncodedGiftNft,
} from "@/lib/giftingNft";
import {
  NFT_ENERGY_CORNERS,
  NFT_ENERGY_NODES,
  NFT_ENERGY_RINGS,
  NFT_ENERGY_SPOKES,
  NFT_ENERGY_VIEWBOX,
} from "@/lib/nftEnergyPattern";

const TAPS_TO_OPEN = 10;

const EGG_SHELL_PATH =
  "M 40 6 C 58 6 68 22 70 42 C 72 62 66 84 52 92 C 46 95 34 95 28 92 C 14 84 8 62 10 42 C 12 22 22 6 40 6 Z";

const CRACK_SEGMENTS = [
  "M 40 14 L 38 32 L 36 48",
  "M 38 32 L 44 38 L 42 54",
  "M 36 48 L 30 56 L 26 68",
  "M 42 54 L 48 62 L 52 74",
  "M 44 38 L 52 34 L 58 28",
  "M 48 62 L 54 58 L 60 52",
  "M 52 34 L 56 44 L 54 60",
  "M 30 56 L 34 64 L 32 78",
  "M 54 60 L 50 72 L 46 82",
  "M 56 44 L 62 50 L 64 64",
] as const;

function NftEnergyMesh({ accent }: { accent: string }) {
  return (
    <div className="encoded-gift-nft-energy" aria-hidden="true">
      <div className="encoded-gift-nft-energy-base" />
      <div className="encoded-gift-nft-energy-pulse encoded-gift-nft-energy-pulse--a" />
      <div className="encoded-gift-nft-energy-pulse encoded-gift-nft-energy-pulse--b" />
      <div className="encoded-gift-nft-energy-scan" />

      <svg className="encoded-gift-nft-mesh encoded-gift-nft-mesh--rotate-a" viewBox={NFT_ENERGY_VIEWBOX}>
        {NFT_ENERGY_SPOKES.map((d, index) => (
          <path
            key={`spoke-${index}`}
            d={d}
            className="encoded-gift-nft-mesh-line"
            stroke={accent}
            pathLength={100}
            style={{ animationDelay: `${index * 0.07}s` }}
          />
        ))}
        {NFT_ENERGY_RINGS.map((d, index) => (
          <path
            key={`ring-${index}`}
            d={d}
            className="encoded-gift-nft-mesh-ring"
            stroke={accent}
            pathLength={100}
            style={{ animationDelay: `${0.4 + index * 0.2}s` }}
          />
        ))}
      </svg>

      <svg className="encoded-gift-nft-mesh encoded-gift-nft-mesh--rotate-b" viewBox={NFT_ENERGY_VIEWBOX}>
        {NFT_ENERGY_CORNERS.map((d, index) => (
          <path
            key={`corner-${index}`}
            d={d}
            className="encoded-gift-nft-mesh-corner"
            stroke={accent}
            pathLength={100}
            style={{ animationDelay: `${index * 0.12}s` }}
          />
        ))}
        {NFT_ENERGY_NODES.map((node, index) => (
          <circle
            key={`node-${index}`}
            cx={node.cx}
            cy={node.cy}
            r={index === 0 ? 1.8 : 1.1}
            className="encoded-gift-nft-mesh-node"
            fill={accent}
            style={{ animationDelay: `${index * 0.15}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function ChamberVPatternArt({ accent }: { accent: string }) {
  return (
    <svg className="encoded-gift-nft-art" viewBox={CHAMBER_V_VIEWBOX} aria-hidden="true">
      <g className="encoded-gift-chamber-pattern encoded-gift-chamber-pattern--primary">
        {CHAMBER_V_STROKES.map((stroke, index) => (
          <path
            key={`chamber-${index}`}
            d={stroke.d}
            fill="none"
            stroke={accent}
            strokeWidth={stroke.width}
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity={stroke.opacity ?? 1}
            pathLength={100}
            className="encoded-gift-chamber-stroke"
            style={{ animationDelay: `${index * 0.08}s` }}
          />
        ))}
      </g>
      <g className="encoded-gift-chamber-pattern encoded-gift-chamber-pattern--ghost">
        <g transform="translate(50 50) scale(0.62) translate(-50 -50)" opacity={0.35}>
          {CHAMBER_V_STROKES.slice(0, 6).map((stroke, index) => (
            <path
              key={`chamber-ghost-${index}`}
              d={stroke.d}
              fill="none"
              stroke={accent}
              strokeWidth={stroke.width * 0.85}
              strokeLinecap="square"
              opacity={0.6}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

function EncodedNftCard({ nft }: { nft: EncodedGiftNft }) {
  return (
    <div
      className={`encoded-gift-nft-card encoded-gift-nft-card--${nft.tier.id}`}
      style={
        {
          "--nft-accent": nft.tier.accent,
          "--nft-glow": nft.tier.glow,
          "--nft-sheen": nft.tier.sheen,
        } as CSSProperties
      }
    >
      <div className="encoded-gift-nft-card-frame" aria-hidden="true">
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--tl" />
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--tr" />
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--bl" />
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--br" />
      </div>
      <div className="encoded-gift-nft-card-bg">
        <NftEnergyMesh accent={nft.tier.accent} />
        <ChamberVPatternArt accent={nft.tier.accent} />
      </div>
      <div className="encoded-gift-nft-card-body">
        <p className="encoded-gift-nft-card-eyebrow">ENCODED Entry Pass</p>
        <p className="encoded-gift-nft-card-tier">{nft.tier.label}</p>
        <p className="encoded-gift-nft-card-id">{nft.tokenId}</p>
        <p className="encoded-gift-nft-card-flip-hint">Tap to flip</p>
        <dl className="encoded-gift-nft-card-meta">
          <div>
            <dt>Minted</dt>
            <dd>{nft.mintedAt}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{nft.ownerName}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function EntryPassQrBack({ nft }: { nft: EncodedGiftNft }) {
  return (
    <div
      className={`encoded-gift-nft-card encoded-gift-nft-card--back encoded-gift-nft-card--${nft.tier.id}`}
      style={
        {
          "--nft-accent": nft.tier.accent,
          "--nft-glow": nft.tier.glow,
          "--nft-sheen": nft.tier.sheen,
        } as CSSProperties
      }
    >
      <div className="encoded-gift-nft-card-frame" aria-hidden="true">
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--tl" />
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--tr" />
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--bl" />
        <span className="encoded-gift-nft-card-corner encoded-gift-nft-card-corner--br" />
      </div>
      <div className="encoded-gift-pass-qr-body">
        <p className="encoded-gift-pass-qr-eyebrow">Verify entry</p>
        <div className="encoded-gift-pass-qr-frame">
          <QRCode
            value={entryPassVerifyUrl(nft.tokenId)}
            size={96}
            bgColor="#ffffff"
            fgColor="#0a0a0a"
            level="M"
            className="encoded-gift-pass-qr-code"
          />
        </div>
        <p className="encoded-gift-pass-qr-id">{nft.tokenId}</p>
        <p className="encoded-gift-pass-qr-hint">Tap to flip back</p>
      </div>
    </div>
  );
}

function EntryPassFlipCard({
  nft,
  flipped,
  onFlip,
}: {
  nft: EncodedGiftNft;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <button
      type="button"
      className={`encoded-gift-pass-flip${flipped ? " is-flipped" : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onFlip();
      }}
      aria-label={flipped ? "Flip entry pass to front" : "Flip entry pass to QR code"}
      aria-pressed={flipped}
    >
      <div className="encoded-gift-pass-flip-inner">
        <div className="encoded-gift-pass-flip-face encoded-gift-pass-flip-face--front">
          <EncodedNftCard nft={nft} />
        </div>
        <div className="encoded-gift-pass-flip-face encoded-gift-pass-flip-face--back">
          <EntryPassQrBack nft={nft} />
        </div>
      </div>
    </button>
  );
}

function HoloEggShell({ className }: { className?: string }) {
  return (
    <>
      <path
        className={`encoded-gift-holo-egg-body${className ? ` ${className}` : ""}`}
        d={EGG_SHELL_PATH}
        fill="url(#encoded-gift-holo-fill)"
        stroke="url(#encoded-gift-holo-stroke)"
        strokeWidth={0.85}
      />
      <path
        className="encoded-gift-holo-egg-sheen"
        d={EGG_SHELL_PATH}
        fill="url(#encoded-gift-holo-sheen)"
        opacity={0.55}
      />
      <g className="encoded-gift-holo-egg-grid" clipPath="url(#encoded-gift-egg-shape-clip)">
        {[32, 42, 52, 62, 72].map((y) => (
          <ellipse key={`lat-${y}`} cx="40" cy={y} rx={14 + (y - 50) * 0.08} ry={2.2} />
        ))}
        <path d="M 40 12 L 40 88" />
        <path d="M 28 30 Q 40 38 52 30" />
        <path d="M 24 54 Q 40 62 56 54" />
        <path d="M 26 72 Q 40 80 54 72" />
      </g>
      <path
        className="encoded-gift-holo-egg-highlight"
        d="M 30 22 C 36 16 46 14 50 20 C 44 26 36 28 30 22 Z"
        fill="url(#encoded-gift-holo-highlight)"
        opacity={0.7}
      />
    </>
  );
}

function GiftEggSvg({ taps, cracking }: { taps: number; cracking: boolean }) {
  const crackLevel = Math.min(taps / TAPS_TO_OPEN, 1);
  const visibleCracks = taps > 0 ? Math.min(taps, CRACK_SEGMENTS.length) : 0;
  const innerGlow = Math.max(0, (taps - 4) / (TAPS_TO_OPEN - 4));

  return (
    <svg
      className={`encoded-gift-egg-svg${cracking ? " is-shattering" : ""}${taps > 0 ? " is-tapped" : ""}`}
      viewBox="0 0 80 100"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="encoded-gift-egg-shape-clip">
          <path d={EGG_SHELL_PATH} />
        </clipPath>
        <clipPath id="encoded-gift-egg-clip-left">
          <path d="M 0 0 L 40 0 L 40 100 L 0 100 Z" />
        </clipPath>
        <clipPath id="encoded-gift-egg-clip-right">
          <path d="M 40 0 L 80 0 L 80 100 L 40 100 Z" />
        </clipPath>
        <clipPath id="encoded-gift-egg-clip-top">
          <path d="M 12 0 L 68 0 L 58 46 L 22 46 Z" />
        </clipPath>
        <radialGradient id="encoded-gift-holo-core" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="rgba(120, 220, 255, 0.55)" />
          <stop offset="45%" stopColor="rgba(230, 186, 74, 0.28)" />
          <stop offset="100%" stopColor="rgba(120, 220, 255, 0)" />
        </radialGradient>
        <linearGradient id="encoded-gift-holo-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(120, 220, 255, 0.22)" />
          <stop offset="35%" stopColor="rgba(230, 186, 74, 0.14)" />
          <stop offset="68%" stopColor="rgba(180, 120, 255, 0.12)" />
          <stop offset="100%" stopColor="rgba(80, 200, 255, 0.08)" />
        </linearGradient>
        <linearGradient id="encoded-gift-holo-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(120, 220, 255, 0.95)" />
          <stop offset="50%" stopColor="rgba(230, 186, 74, 0.9)" />
          <stop offset="100%" stopColor="rgba(180, 140, 255, 0.85)" />
        </linearGradient>
        <linearGradient id="encoded-gift-holo-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.28)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
        <radialGradient id="encoded-gift-holo-highlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.55)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </radialGradient>
      </defs>

      <ellipse
        className="encoded-gift-holo-egg-aura"
        cx="40"
        cy="54"
        rx={20 + innerGlow * 8}
        ry={26 + innerGlow * 10}
        fill="url(#encoded-gift-holo-core)"
        opacity={0.45 + innerGlow * 0.4}
      />

      <g className="encoded-gift-holo-egg-scan" clipPath="url(#encoded-gift-egg-shape-clip)">
        <rect x="8" y="0" width="64" height="14" className="encoded-gift-holo-egg-scan-band" />
      </g>

      <g className="encoded-gift-egg-chamber-preview" opacity={innerGlow * 0.9}>
        <g transform="translate(40 54) scale(0.34) translate(-50 -50)">
          {CHAMBER_V_STROKES.slice(0, 4).map((stroke, index) => (
            <path
              key={`egg-chamber-${index}`}
              d={stroke.d}
              fill="none"
              stroke="#7ad8ff"
              strokeWidth={stroke.width * 1.2}
              strokeLinecap="square"
              opacity={0.45 + innerGlow * 0.45}
            />
          ))}
        </g>
      </g>

      {!cracking ? (
        <g className="encoded-gift-holo-egg-intact">
          <HoloEggShell />
        </g>
      ) : (
        <>
          <g className="encoded-gift-egg-fragment encoded-gift-egg-fragment--left" clipPath="url(#encoded-gift-egg-clip-left)">
            <HoloEggShell />
          </g>
          <g className="encoded-gift-egg-fragment encoded-gift-egg-fragment--right" clipPath="url(#encoded-gift-egg-clip-right)">
            <HoloEggShell />
          </g>
          <g className="encoded-gift-egg-fragment encoded-gift-egg-fragment--top" clipPath="url(#encoded-gift-egg-clip-top)">
            <HoloEggShell />
          </g>
        </>
      )}

      {visibleCracks > 0 ? (
        <g className="encoded-gift-egg-cracks" strokeLinecap="round" fill="none">
          {CRACK_SEGMENTS.slice(0, visibleCracks).map((d, index) => (
            <path
              key={`crack-${index}`}
              d={d}
              stroke="url(#encoded-gift-holo-stroke)"
              strokeWidth={0.75 + crackLevel * 0.45}
              opacity={0.65 + crackLevel * 0.35}
              className="encoded-gift-egg-crack-path"
            />
          ))}
        </g>
      ) : null}

      {taps > 0 && !cracking ? (
        <circle
          className="encoded-gift-egg-impact"
          cx="40"
          cy="38"
          r={6 + crackLevel * 4}
          fill="none"
          stroke="rgba(120, 220, 255, 0.45)"
          strokeWidth="0.6"
        />
      ) : null}
    </svg>
  );
}

function GiftEggScreen({
  taps,
  cracking,
  onTap,
}: {
  taps: number;
  cracking: boolean;
  onTap: () => void;
}) {
  return (
    <button
      type="button"
      className={`encoded-gift-egg-screen${cracking ? " is-cracking" : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onTap();
      }}
      aria-label="Tap to open gift egg"
    >
      <p className="encoded-gift-egg-copy">Keep tapping to unlock pass</p>
      <div className="encoded-gift-egg-stage">
        <GiftEggSvg taps={taps} cracking={cracking} />
      </div>
      <p className="encoded-gift-egg-taps" aria-live="polite">
        {Math.min(taps, TAPS_TO_OPEN)} / {TAPS_TO_OPEN}
      </p>
    </button>
  );
}

export function GiftingWatchExperience({ onDismiss }: { onDismiss: () => void }) {
  const [taps, setTaps] = useState(0);
  const [cracking, setCracking] = useState(false);
  const [nft, setNft] = useState<EncodedGiftNft | null>(null);
  const [flipped, setFlipped] = useState(false);

  const handleTap = useCallback(() => {
    if (nft || cracking) return;

    setTaps((current) => {
      const next = current + 1;
      if (next >= TAPS_TO_OPEN) {
        setCracking(true);
        window.setTimeout(() => {
          setNft(mintEncodedGiftNft());
        }, 680);
      }
      return next;
    });
  }, [cracking, nft]);

  if (nft) {
    return (
      <div
        className="encoded-gift-reveal"
        onClick={(event) => {
          event.stopPropagation();
          onDismiss();
        }}
        role="presentation"
      >
        <EntryPassFlipCard nft={nft} flipped={flipped} onFlip={() => setFlipped((current) => !current)} />
      </div>
    );
  }

  return <GiftEggScreen taps={taps} cracking={cracking} onTap={handleTap} />;
}
