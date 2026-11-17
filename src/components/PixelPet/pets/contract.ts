import type { PixelPetMood } from "../types";

/**
 * Every pet is drawn on a square 120x120 canvas, as if it were peeking over
 * a BOTTOM edge. CSS rotates the art for the other three edges.
 *
 *   - The ledge's top lip is at y = PET_LEDGE_Y. Paws may hang a few units
 *     below it (down to y = 120), so they look draped over the lip.
 *   - Anything below PET_LEDGE_Y in the "back" layer is hidden by the ledge.
 *   - A pet is two SVGs, "back" (under the ledge) and "front" (over it).
 *
 * Optional parts. Tag SVG groups with these classes to get the shared mood
 * animations for free (blink, sway, bounce, breathing, ...):
 *
 *   jp-pet-head   jp-pet-eyes   jp-pet-pupils   jp-pet-paws
 *   jp-pet-tail   jp-pet-zzz
 *
 * A pet that has no tail just doesn't tag one. Pet-specific motion can use
 * the `jp-pet-art--<mood>` class on the root <svg>.
 */
export const PET_CANVAS = 120;
export const PET_LEDGE_Y = 116;

export function artClassName(mood: PixelPetMood, layer: "back" | "front") {
  return `jp-pet-art jp-pet-art--${mood} jp-pet-art--${layer}`;
}

export const artSvgProps = {
  viewBox: `0 0 ${PET_CANVAS} ${PET_CANVAS}`,
  xmlns: "http://www.w3.org/2000/svg",
  shapeRendering: "crispEdges" as const,
  preserveAspectRatio: "xMidYMax meet",
};
