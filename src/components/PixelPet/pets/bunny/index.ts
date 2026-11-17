import type { PixelPetDefinition } from "../../types";
import { resolveStandardPalette } from "../palette";
import type { StandardColors, StandardSlot } from "../palette";
import { DutchArt } from "./dutch";
import { LionheadArt } from "./lionhead";
import { LopArt } from "./lop";
import { BUNNY_MESSAGES } from "./parts";
import { WildArt } from "./wild";

const BUNNY_COLORS = {
  lop: { fur: "#c9a47a", belly: "#f2e8da", markings: "#a67c52", eyes: "#2a1f1a", accent: "#e8899f" },
  dutch: { fur: "#f5f1ea", belly: "#fffaf0", markings: "#4a3a34", eyes: "#6b4a2f", accent: "#e8899f" },
  lionhead: { fur: "#cf9a5f", belly: "#f7ecd9", markings: "#a8733e", eyes: "#2a1f1a", accent: "#e8899f" },
  wild: { fur: "#9a7a58", belly: "#eadfc9", markings: "#4a3b2e", eyes: "#3a2a1a", accent: "#e0907e" },
} satisfies Record<string, StandardColors>;

export type BunnyVariant = keyof typeof BUNNY_COLORS;

/**
 * The bunny. Each variant is a different breed: ear shape, face, coat
 * pattern and build all differ.
 */
export const bunny: PixelPetDefinition<BunnyVariant, StandardSlot> = {
  label: "pixel bunny",
  hitbox: { x: 20, y: 2, width: 80, height: 76 },
  headroom: 2,
  messages: BUNNY_MESSAGES,
  defaultVariant: "lop",
  variants: {
    lop: { colors: BUNNY_COLORS.lop, Art: LopArt, hitbox: { x: 10, y: 16, width: 100, height: 52 }, headroom: 16 },
    dutch: { colors: BUNNY_COLORS.dutch, Art: DutchArt },
    lionhead: { colors: BUNNY_COLORS.lionhead, Art: LionheadArt, hitbox: { x: 8, y: 6, width: 104, height: 76 }, headroom: 6 },
    wild: { colors: BUNNY_COLORS.wild, Art: WildArt },
  },
  resolvePalette: resolveStandardPalette,
};
