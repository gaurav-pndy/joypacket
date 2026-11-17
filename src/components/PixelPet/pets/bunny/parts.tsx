import type { PixelPetMood } from "../../types";
import type { Palette } from "../palette";
import { DotEye, MoodEyes, Mouth, symmetricPath } from "../shared";

/** Round head with puffy cheeks (the fur boundary). */
export const BUNNY_HEAD = symmetricPath([
  [60, 32], [44, 32], [44, 34], [36, 34], [36, 38], [28, 38], [28, 44], [22, 44],
  [22, 50], [18, 50], [18, 62], [20, 62], [20, 68], [24, 68], [24, 72], [30, 72],
  [30, 76], [38, 76], [38, 78], [60, 78],
]);

/** Upright ear (left side; mirror for the right) and its pink inside. */
export const EAR_UPRIGHT = "M36 2 H44 V4 H46 V10 H48 V36 H32 V20 H30 V10 H32 V4 H36 Z";
export const EAR_UPRIGHT_INNER = "M38 8 H43 V10 H44 V34 H36 V12 H38 Z";

/** Eyes, nose, mouth and buck teeth. `eyeY` is the top of the eyes. */
export function BunnyFace({
  c,
  mood,
  eyeX = 33,
  eyeY = 50,
  eyeColor,
}: {
  c: Palette;
  mood: PixelPetMood;
  eyeX?: number;
  eyeY?: number;
  eyeColor?: string;
}) {
  const happy = mood === "happy";
  const sleeping = mood === "sleeping";
  const rx = 120 - eyeX - 9;
  return (
    <>
      {sleeping || happy ? (
        <MoodEyes mood={mood} c={c} x={eyeX + 4} y={eyeY - 51} />
      ) : (
        <g className="jp-pet-eyes">
          <g className="jp-pet-pupils">
            <DotEye x={eyeX} y={eyeY} w={9} h={11} c={c} color={eyeColor ?? c.eyes} />
            <DotEye x={rx} y={eyeY} w={9} h={11} c={c} color={eyeColor ?? c.eyes} />
          </g>
        </g>
      )}
      <g fill={c.accent} opacity=".7">
        <rect x="22" y="62" width="9" height="4" />
        <rect x="89" y="62" width="9" height="4" />
      </g>
      <path d="M56 60 H64 V62 H62 V64 H58 V62 H56 Z" fill={c.accent} />
      <Mouth happy={happy} c={c} />
      {/* Buck teeth. */}
      <rect x="57" y={happy ? 71 : 68} width="3" height="4" fill="#fff" />
      <rect x="60" y={happy ? 71 : 68} width="3" height="4" fill="#fff" />
      <rect x="59.5" y={happy ? 71 : 68} width="1" height="4" fill="#cfcfcf" />
    </>
  );
}

export const BUNNY_MESSAGES = [
  "Hop hop! 🐰",
  "Hello there!",
  "Carrots are life. 🥕",
  "*nose wiggle*",
  "You deserve a snack.",
  "Binky time!",
];

/** Fluffy round tail. */
export const POM_TAIL =
  "M104 98 H112 V100 H116 V104 H118 V112 H116 V116 H104 V112 H102 V104 H104 Z";
