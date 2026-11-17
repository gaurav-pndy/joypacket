import type { PixelPetMood } from "../../types";
import type { Palette } from "../palette";
import { DotEye, MoodEyes, Mouth, symmetricPath } from "../shared";

/** Round, chunky head (the fur boundary). */
export const BEAR_HEAD = symmetricPath([
  [60, 24], [44, 24], [44, 26], [36, 26], [36, 30], [28, 30], [28, 36], [22, 36],
  [22, 42], [18, 42], [18, 54], [16, 54], [16, 64], [18, 64], [18, 70], [22, 70],
  [22, 74], [28, 74], [28, 78], [38, 78], [38, 80], [60, 80],
]);

/** Round ear on the top corner (left side; mirror for the right). */
export const ROUND_EAR = "M18 10 H30 V12 H34 V16 H36 V30 H12 V18 H14 V14 H18 Z";
export const ROUND_EAR_INNER = "M20 16 H28 V18 H30 V26 H18 V20 H20 Z";

/** Eyes, a big nose and a small mouth; `eyeColor` lets pandas keep dark eyes. */
export function BearFace({
  c,
  mood,
  eyeX = 34,
  eyeY = 48,
  noseY = 56,
  eyeColor,
  small = false,
}: {
  c: Palette;
  mood: PixelPetMood;
  eyeX?: number;
  eyeY?: number;
  noseY?: number;
  eyeColor?: string;
  small?: boolean;
}) {
  const happy = mood === "happy";
  const sleeping = mood === "sleeping";
  const w = small ? 6 : 8;
  const h = small ? 8 : 10;
  const rx = 120 - eyeX - w;
  return (
    <>
      {sleeping || happy ? (
        <MoodEyes mood={mood} c={c} x={eyeX + w / 2} y={eyeY - 46} />
      ) : (
        <g className="jp-pet-eyes">
          <g className="jp-pet-pupils">
            <DotEye x={eyeX} y={eyeY} w={w} h={h} c={c} color={eyeColor ?? c.eyes} />
            <DotEye x={rx} y={eyeY} w={w} h={h} c={c} color={eyeColor ?? c.eyes} />
          </g>
        </g>
      )}
      <path
        d={`M52 ${noseY} H68 V${noseY + 3} H66 V${noseY + 7} H54 V${noseY + 3} H52 Z`}
        fill={c.outline}
      />
      <rect x="56" y={noseY + 1} width="4" height="2" fill="#fff" opacity=".5" />
      <Mouth happy={happy} c={c} dy={noseY - 56} />
    </>
  );
}

export const BEAR_MESSAGES = [
  "Hello there! 🐻",
  "Big hug incoming.",
  "Snack break?",
  "You're beary nice.",
  "Just chilling.",
  "Nice to see you!",
];
