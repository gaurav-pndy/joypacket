import type { PixelPetMood } from "../../types";
import type { Palette } from "../palette";
import { DotEye, MoodEyes, Mouth, symmetricPath } from "../shared";

/** Wedge-shaped head with cheek tufts that narrows to a pointed muzzle. */
export const FOX_HEAD = symmetricPath([
  [60, 24], [46, 24], [46, 26], [38, 26], [38, 30], [32, 30], [32, 36], [26, 36],
  [26, 42], [20, 42], [20, 46], [12, 46], [12, 52], [16, 52], [16, 58], [22, 58],
  [22, 64], [28, 64], [28, 68], [34, 68], [34, 72], [42, 72], [42, 76], [50, 76],
  [50, 80], [60, 80],
]);

/** Round fluffy head with cheek tufts (arctic fox). */
export const FLUFFY_HEAD = symmetricPath([
  [60, 26], [42, 26], [42, 28], [34, 28], [34, 32], [26, 32], [26, 38], [20, 38],
  [20, 44], [14, 44], [14, 52], [10, 52], [10, 58], [14, 58], [14, 64], [18, 64],
  [18, 70], [24, 70], [24, 74], [32, 74], [32, 78], [44, 78], [44, 80], [60, 80],
]);

/**
 * Eyes, nose and mouth. `noseY` is where the nose sits (foxes have long
 * muzzles, so it is lower than on a cat or dog).
 */
export function FoxFace({
  c,
  mood,
  eyeX = 33,
  eyeY = 46,
  noseY = 60,
  big = false,
}: {
  c: Palette;
  mood: PixelPetMood;
  eyeX?: number;
  eyeY?: number;
  noseY?: number;
  big?: boolean;
}) {
  const happy = mood === "happy";
  const sleeping = mood === "sleeping";
  const w = big ? 10 : 8;
  const h = big ? 12 : 10;
  const rx = 120 - eyeX - w;
  return (
    <>
      {sleeping || happy ? (
        <MoodEyes mood={mood} c={c} x={eyeX + w / 2} y={eyeY - 46} />
      ) : (
        <g className="jp-pet-eyes">
          <g className="jp-pet-pupils">
            <DotEye x={eyeX} y={eyeY} w={w} h={h} c={c} color={c.eyes} />
            <DotEye x={rx} y={eyeY} w={w} h={h} c={c} color={c.eyes} />
          </g>
        </g>
      )}
      <path
        d={`M55 ${noseY} H65 V${noseY + 3} H63 V${noseY + 6} H57 V${noseY + 3} H55 Z`}
        fill={c.outline}
      />
      <rect x="57" y={noseY + 1} width="3" height="1.5" fill="#fff" opacity=".55" />
      <Mouth happy={happy} c={c} dy={noseY - 58} />
    </>
  );
}

export const FOX_MESSAGES = [
  "What does the fox say? 🦊",
  "Hello, clever human!",
  "Psst... I found a secret.",
  "Quick brown fox, at your service.",
  "Nice to see you!",
  "Pet the tail. Gently.",
];
