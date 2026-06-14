// Added: futuristic geometric mesh paths for powered ENCODED NFT card backgrounds.

export const NFT_ENERGY_VIEWBOX = "0 0 100 100";

/** Radial spokes + diamond rings + corner brackets for energy mesh. */
export const NFT_ENERGY_SPOKES = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  const x2 = 50 + Math.cos(angle) * 52;
  const y2 = 50 + Math.sin(angle) * 52;
  return `M 50 50 L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
});

export const NFT_ENERGY_RINGS = [
  "M 50 18 L 74 50 L 50 82 L 26 50 Z",
  "M 50 28 L 64 50 L 50 72 L 36 50 Z",
  "M 50 8 L 88 50 L 50 92 L 12 50 Z",
];

export const NFT_ENERGY_CORNERS = [
  "M 8 18 L 8 8 L 18 8",
  "M 82 8 L 92 8 L 92 18",
  "M 92 82 L 92 92 L 82 92",
  "M 18 92 L 8 92 L 8 82",
];

export const NFT_ENERGY_NODES: Array<{ cx: number; cy: number }> = [
  { cx: 50, cy: 50 },
  { cx: 50, cy: 18 },
  { cx: 74, cy: 50 },
  { cx: 50, cy: 82 },
  { cx: 26, cy: 50 },
  { cx: 50, cy: 8 },
  { cx: 88, cy: 50 },
  { cx: 50, cy: 92 },
  { cx: 12, cy: 50 },
];
