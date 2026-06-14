// Added: randomized ENCODED entry pass tiers for unique entry pass flow.
// Fixed: removed uranium tier — replaced with gemstone & material pass variants.

export type NftTierId =
  | "bronze"
  | "silver"
  | "gold"
  | "diamond"
  | "ruby"
  | "amethyst"
  | "emerald"
  | "sapphire"
  | "onyx"
  | "pearl"
  | "opal";

export type NftTier = {
  id: NftTierId;
  label: string;
  accent: string;
  glow: string;
  sheen: string;
};

export type EncodedGiftNft = {
  tier: NftTier;
  ownerName: string;
  mintedAt: string;
  tokenId: string;
  patternSeed: number;
};

export const NFT_TIERS: NftTier[] = [
  {
    id: "bronze",
    label: "Bronze",
    accent: "#c97b4a",
    glow: "rgba(201, 123, 74, 0.45)",
    sheen: "linear-gradient(135deg, #8b5a2b 0%, #d4956a 45%, #6b4423 100%)",
  },
  {
    id: "silver",
    label: "Silver",
    accent: "#d8dde6",
    glow: "rgba(200, 210, 225, 0.42)",
    sheen: "linear-gradient(135deg, #8a9199 0%, #eef1f5 42%, #5c636a 100%)",
  },
  {
    id: "gold",
    label: "Gold",
    accent: "#e6ba4a",
    glow: "rgba(230, 186, 74, 0.48)",
    sheen: "linear-gradient(135deg, #9a7428 0%, #f0cf6a 40%, #705619 100%)",
  },
  {
    id: "diamond",
    label: "Diamond",
    accent: "#d8f4ff",
    glow: "rgba(180, 230, 255, 0.52)",
    sheen: "linear-gradient(135deg, #6a9eb0 0%, #eefcff 38%, #3d7285 100%)",
  },
  {
    id: "ruby",
    label: "Ruby",
    accent: "#e84a6a",
    glow: "rgba(232, 74, 106, 0.48)",
    sheen: "linear-gradient(135deg, #6b1830 0%, #ff6b8a 42%, #4a0f22 100%)",
  },
  {
    id: "amethyst",
    label: "Amethyst",
    accent: "#b48cff",
    glow: "rgba(180, 140, 255, 0.5)",
    sheen: "linear-gradient(135deg, #4a2878 0%, #c9a8ff 40%, #321e58 100%)",
  },
  {
    id: "emerald",
    label: "Emerald",
    accent: "#3ecf8e",
    glow: "rgba(62, 207, 142, 0.48)",
    sheen: "linear-gradient(135deg, #145a3a 0%, #5ee8a8 42%, #0f3d28 100%)",
  },
  {
    id: "sapphire",
    label: "Sapphire",
    accent: "#4a7dff",
    glow: "rgba(74, 125, 255, 0.5)",
    sheen: "linear-gradient(135deg, #142a6e 0%, #6b9aff 40%, #0c1d4a 100%)",
  },
  {
    id: "onyx",
    label: "Onyx",
    accent: "#8a8a96",
    glow: "rgba(120, 120, 140, 0.38)",
    sheen: "linear-gradient(135deg, #0a0a0c 0%, #3a3a44 42%, #050508 100%)",
  },
  {
    id: "pearl",
    label: "Pearl",
    accent: "#f2ece4",
    glow: "rgba(242, 236, 228, 0.45)",
    sheen: "linear-gradient(135deg, #c8c0b8 0%, #fffaf5 40%, #a8a098 100%)",
  },
  {
    id: "opal",
    label: "Opal",
    accent: "#9ae8f0",
    glow: "rgba(154, 232, 240, 0.45)",
    sheen: "linear-gradient(135deg, #6a58a8 0%, #9ae8f0 28%, #e8a8c8 52%, #88d8e8 100%)",
  },
];

const OWNER_NAMES = ["Chris W.", "Maya R.", "Jordan L.", "Sam K.", "Alex T.", "Riley P.", "You"];

function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function mintEncodedGiftNft(seed = Date.now()): EncodedGiftNft {
  const random = mulberry32(seed);
  const tier = NFT_TIERS[Math.floor(random() * NFT_TIERS.length)]!;
  const ownerName = OWNER_NAMES[Math.floor(random() * OWNER_NAMES.length)]!;
  const patternSeed = Math.floor(random() * 999983) + 17;
  const tokenNum = Math.floor(random() * 8999) + 1000;

  const mintedAt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return {
    tier,
    ownerName,
    mintedAt,
    tokenId: `#${tokenNum}`,
    patternSeed,
  };
}

export function entryPassVerifyUrl(tokenId: string): string {
  const id = tokenId.replace("#", "");
  return `https://encoded.app/entry/${id}`;
}
