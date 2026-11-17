import type { PixelPetMood } from "../../types";
import type { Palette } from "../palette";
import { DotEye, MoodEyes, Mouth, symmetricPath } from "../shared";

/** Broad dog head (the fur boundary; outlines are strokes around it). */
export const DOG_HEAD = symmetricPath([
  [60, 26], [40, 26], [40, 28], [32, 28], [32, 32], [26, 32], [26, 36], [22, 36],
  [22, 42], [18, 42], [18, 54], [16, 54], [16, 62], [18, 62], [18, 68], [22, 68],
  [22, 72], [28, 72], [28, 76], [36, 76], [36, 78], [60, 78],
]);

/** White lower face (muzzle and cheeks) used by shiba, corgi and husky. */
export const LOWER_FACE = symmetricPath([
  [60, 56], [46, 56], [46, 60], [40, 60], [40, 64], [26, 64], [26, 68], [22, 68],
  [22, 72], [28, 72], [28, 76], [36, 76], [36, 78], [60, 78],
]);

/**
 * Eyes, nose and mouth of a dog. Eyes are simple dark dots unless `eyeColor`
 * is given (husky), in which case they get a coloured iris.
 */
export function DogFace({
  c,
  mood,
  eyeX = 32,
  eyeY = 46,
  iris,
}: {
  c: Palette;
  mood: PixelPetMood;
  eyeX?: number;
  eyeY?: number;
  iris?: string;
}) {
  const happy = mood === "happy";
  const sleeping = mood === "sleeping";
  const rx = 120 - eyeX - 8;
  return (
    <>
      {sleeping || happy ? (
        <MoodEyes mood={mood} c={c} x={eyeX + 4} y={eyeY - 46} />
      ) : iris ? (
        <g className="jp-pet-eyes">
          {[eyeX - 2, rx - 2].map((x) => (
            <g key={x}>
              <rect x={x} y={eyeY - 2} width="12" height="14" fill={c.outline} />
              <rect x={x + 1} y={eyeY - 1} width="10" height="12" fill={iris} />
              <rect x={x + 4} y={eyeY - 1} width="4" height="12" fill={c.outline} />
              <rect x={x + 2} y={eyeY} width="3" height="3" fill="#fff" />
            </g>
          ))}
        </g>
      ) : (
        <g className="jp-pet-eyes">
          <g className="jp-pet-pupils">
            <DotEye x={eyeX} y={eyeY} c={c} color={c.eyes} />
            <DotEye x={rx} y={eyeY} c={c} color={c.eyes} />
          </g>
        </g>
      )}

      {/* Nose. */}
      <path d="M53 57 H67 V60 H65 V63 H55 V60 H53 Z" fill={c.outline} />
      <rect x="56" y="58" width="4" height="1.5" fill="#fff" opacity=".55" />
      <Mouth happy={happy} c={c} dy={0} />
      {happy && <rect x="57" y="71" width="6" height="5" fill={c.accent} />}
    </>
  );
}

/** The fur colour of the paws' cuffs follows the coat; mittens are light. */
export const DOG_MESSAGES = [
  "Woof! 🐶",
  "Hi friend!",
  "Did somebody say walk?",
  "Good day to be a good dog.",
  "You're my favourite human!",
  "Belly rubs accepted. 🐾",
];
