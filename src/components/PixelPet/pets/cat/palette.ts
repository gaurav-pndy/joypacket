import type { StandardColors, StandardSlot } from "../palette";

export { resolveStandardPalette as resolveCatPalette } from "../palette";
export type { Palette as CatPalette } from "../palette";

/** Base colours every cat variant sets (and users may override via `colors`). */
export type CatSlot = StandardSlot;

/**
 * Default colours per breed. `fur` is the main coat (or the orange patches on
 * the calico), `markings` are stripes, points or black patches.
 */
export const CAT_COLORS = {
  tabby: { fur: "#a47c55", belly: "#efe3cc", markings: "#4d3626", eyes: "#7dbb5f", accent: "#e8899f" },
  siamese: { fur: "#eadfc8", belly: "#f3ead8", markings: "#5b4536", eyes: "#5aa7e0", accent: "#d98ba0" },
  calico: { fur: "#d98a4e", belly: "#f1ece2", markings: "#2f3142", eyes: "#e2b04a", accent: "#e8899f" },
  fold: { fur: "#aab3c2", belly: "#e9ecf1", markings: "#7e8899", eyes: "#e79a3c", accent: "#e8899f" },
} satisfies Record<string, StandardColors>;

export type CatVariant = keyof typeof CAT_COLORS;
