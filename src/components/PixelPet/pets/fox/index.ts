import type { PixelPetDefinition } from "../../types";
import { resolveStandardPalette } from "../palette";
import type { StandardColors, StandardSlot } from "../palette";
import { ArcticFoxArt } from "./arctic";
import { FennecArt } from "./fennec";
import { FOX_MESSAGES } from "./parts";
import { RedFoxArt } from "./red";

const FOX_COLORS = {
  red: { fur: "#d9692e", belly: "#f7efe3", markings: "#2c2420", eyes: "#2a1a10", accent: "#e8899f" },
  arctic: { fur: "#eef1f6", belly: "#ffffff", markings: "#b9c2d0", eyes: "#1e222c", accent: "#f0a5b4" },
  fennec: { fur: "#e3c08a", belly: "#f6ebd6", markings: "#6b4a2f", eyes: "#1e1410", accent: "#f0a0a8" },
} satisfies Record<string, StandardColors>;

export type FoxVariant = keyof typeof FOX_COLORS;

/**
 * The fox. Each variant is a different species: ear size and shape, head
 * shape, coat and tail all differ.
 */
export const fox: PixelPetDefinition<FoxVariant, StandardSlot> = {
  label: "pixel fox",
  hitbox: { x: 12, y: 2, width: 96, height: 78 },
  headroom: 2,
  messages: FOX_MESSAGES,
  defaultVariant: "red",
  variants: {
    red: { colors: FOX_COLORS.red, Art: RedFoxArt },
    arctic: { colors: FOX_COLORS.arctic, Art: ArcticFoxArt, hitbox: { x: 8, y: 12, width: 104, height: 70 }, headroom: 12 },
    fennec: { colors: FOX_COLORS.fennec, Art: FennecArt, hitbox: { x: 12, y: 4, width: 96, height: 74 }, headroom: 4 },
  },
  resolvePalette: resolveStandardPalette,
};
