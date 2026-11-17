import { darken, lighten } from "./color";

/**
 * The colour slots every built-in pet uses. What a slot MEANS depends on the
 * pet and variant: `fur` is the main coat, `belly` the light areas (muzzle,
 * chest), `markings` the dark areas (stripes, points, patches, spots).
 */
export type StandardSlot = "fur" | "belly" | "markings" | "eyes" | "accent";

export type StandardColors = Record<StandardSlot, string>;

/** Everything the art uses: the base slots plus shades derived from them. */
export function resolveStandardPalette(base: StandardColors) {
  return {
    outline: "#171923",
    fur: base.fur,
    furDark: darken(base.fur, 0.38),
    furLight: lighten(base.fur, 0.18),
    belly: base.belly,
    bellyLight: lighten(base.belly, 0.35),
    bellyShade: darken(base.belly, 0.07),
    toeLine: darken(base.belly, 0.22),
    markings: base.markings,
    markingsDark: darken(base.markings, 0.3),
    markingsLight: lighten(base.markings, 0.28),
    eyes: base.eyes,
    accent: base.accent,
    accentSoft: lighten(base.accent, 0.2),
  };
}

export type Palette = ReturnType<typeof resolveStandardPalette>;
