import type { PixelPetDefinition } from "../../types";
import { resolveStandardPalette } from "../palette";
import type { StandardColors, StandardSlot } from "../palette";
import { BrownArt } from "./brown";
import { PandaArt } from "./panda";
import { BEAR_MESSAGES } from "./parts";
import { PolarArt } from "./polar";
import { RedPandaArt } from "./redpanda";

const BEAR_COLORS = {
  panda: { fur: "#f6f4ee", belly: "#ffffff", markings: "#26272f", eyes: "#26272f", accent: "#e8899f" },
  polar: { fur: "#f4efe0", belly: "#fbfaf4", markings: "#2b2d3a", eyes: "#2b2d3a", accent: "#e8899f" },
  brown: { fur: "#8a5a3a", belly: "#d2a679", markings: "#5a3a24", eyes: "#1e1410", accent: "#e8899f" },
  "red-panda": { fur: "#c4552b", belly: "#f6efe6", markings: "#3b2217", eyes: "#1e1410", accent: "#e8899f" },
} satisfies Record<string, StandardColors>;

export type BearVariant = keyof typeof BEAR_COLORS;

/**
 * The bear (and its panda cousins). Each variant is a different animal:
 * ears, face markings, build and tail all differ.
 */
export const bear: PixelPetDefinition<BearVariant, StandardSlot> = {
  label: "pixel bear",
  hitbox: { x: 10, y: 10, width: 100, height: 70 },
  headroom: 10,
  messages: BEAR_MESSAGES,
  defaultVariant: "panda",
  variants: {
    panda: { colors: BEAR_COLORS.panda, Art: PandaArt },
    polar: { colors: BEAR_COLORS.polar, Art: PolarArt, hitbox: { x: 14, y: 14, width: 92, height: 66 }, headroom: 14 },
    brown: { colors: BEAR_COLORS.brown, Art: BrownArt },
    "red-panda": { colors: BEAR_COLORS["red-panda"], Art: RedPandaArt },
  },
  resolvePalette: resolveStandardPalette,
};
