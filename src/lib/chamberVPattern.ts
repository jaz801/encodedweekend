// Added: Chamber-inspired geometric V emblem strokes for gifting NFT card art.
// Stylized angular V + flank lines — matches the agent's signature gold line motif.

export type ChamberStroke = {
  d: string;
  width: number;
  opacity?: number;
};

/** Core Chamber-style V emblem — bold outer V, nested inner V, flank accents. */
export const CHAMBER_V_STROKES: ChamberStroke[] = [
  { d: "M 16 20 L 50 90", width: 2.4, opacity: 1 },
  { d: "M 84 20 L 50 90", width: 2.4, opacity: 1 },
  { d: "M 26 30 L 50 78", width: 1.55, opacity: 0.92 },
  { d: "M 74 30 L 50 78", width: 1.55, opacity: 0.92 },
  { d: "M 34 38 L 50 68", width: 1, opacity: 0.72 },
  { d: "M 66 38 L 50 68", width: 1, opacity: 0.72 },
  { d: "M 10 36 L 24 28", width: 1.1, opacity: 0.65 },
  { d: "M 90 36 L 76 28", width: 1.1, opacity: 0.65 },
  { d: "M 18 48 L 32 42", width: 0.85, opacity: 0.5 },
  { d: "M 82 48 L 68 42", width: 0.85, opacity: 0.5 },
  { d: "M 24 18 L 50 26", width: 0.9, opacity: 0.55 },
  { d: "M 76 18 L 50 26", width: 0.9, opacity: 0.55 },
  { d: "M 50 26 L 50 38", width: 0.75, opacity: 0.45 },
  { d: "M 38 14 L 50 20", width: 0.7, opacity: 0.4 },
  { d: "M 62 14 L 50 20", width: 0.7, opacity: 0.4 },
];

export const CHAMBER_V_VIEWBOX = "0 0 100 100";
