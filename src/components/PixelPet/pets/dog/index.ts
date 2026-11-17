import type { PixelPetDefinition } from "../../types";
import { resolveStandardPalette } from "../palette";
import type { StandardColors, StandardSlot } from "../palette";
import { CorgiArt } from "./corgi";
import { DalmatianArt } from "./dalmatian";
import { HuskyArt } from "./husky";
import { DOG_MESSAGES } from "./parts";
import { ShibaArt } from "./shiba";

const DOG_COLORS = {
  shiba: { fur: "#cf7a38", belly: "#f6efe4", markings: "#a85f2c", eyes: "#2a1f1a", accent: "#e8899f" },
  corgi: { fur: "#eeb257", belly: "#f8f1e6", markings: "#c27a3a", eyes: "#2a1f1a", accent: "#e8899f" },
  husky: { fur: "#8a93a6", belly: "#f2f4f7", markings: "#4a5163", eyes: "#6fb7ee", accent: "#e8899f" },
  dalmatian: { fur: "#f4f1ea", belly: "#fffaf0", markings: "#2b2d3a", eyes: "#2a1f1a", accent: "#e8899f" },
} satisfies Record<string, StandardColors>;

export type DogVariant = keyof typeof DOG_COLORS;

/**
 * The dog. Each variant is a different breed with its own drawing: ear
 * shape, face pattern, build and tail.
 */
export const dog: PixelPetDefinition<DogVariant, StandardSlot> = {
  label: "pixel dog",
  hitbox: { x: 14, y: 8, width: 92, height: 70 },
  headroom: 8,
  messages: DOG_MESSAGES,
  defaultVariant: "shiba",
  variants: {
    shiba: { colors: DOG_COLORS.shiba, Art: ShibaArt },
    corgi: { colors: DOG_COLORS.corgi, Art: CorgiArt, hitbox: { x: 14, y: 6, width: 92, height: 72 }, headroom: 6 },
    husky: { colors: DOG_COLORS.husky, Art: HuskyArt, hitbox: { x: 14, y: 4, width: 92, height: 74 }, headroom: 4 },
    dalmatian: { colors: DOG_COLORS.dalmatian, Art: DalmatianArt, hitbox: { x: 14, y: 26, width: 92, height: 52 }, headroom: 26 },
  },
  resolvePalette: resolveStandardPalette,
};
