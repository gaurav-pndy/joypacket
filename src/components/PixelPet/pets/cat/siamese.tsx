import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import {
  ArtSvg,
  BODY,
  Bib,
  Body,
  MoodEyes,
  Mouth,
  Paws,
  Tail,
  Whiskers,
  Zzz,
  symmetricPath,
} from "../shared";
import type { PawStyle } from "../shared";

// Slim wedge-shaped head with tall ears, drawn as the "fur" boundary; the
// outline is a 3-unit stroke around it (see paint order below).
const HEAD = symmetricPath([
  [60, 28], [48, 28], [48, 22], [44, 22], [44, 16], [40, 16], [40, 10], [36, 10],
  [36, 6], [30, 6], [30, 10], [26, 10], [26, 16], [22, 16], [22, 24], [20, 24],
  [20, 32], [18, 32], [18, 40], [16, 40], [16, 52], [18, 52], [18, 58], [22, 58],
  [22, 64], [28, 64], [28, 70], [36, 70], [36, 74], [44, 74], [44, 78], [60, 78],
]);

// The dark face mask, widening towards the chin.
const MASK = symmetricPath([
  [60, 52], [56, 52], [56, 56], [52, 56], [52, 60], [48, 60], [48, 66], [46, 66],
  [46, 72], [50, 72], [50, 76], [60, 76],
]);

/**
 * Siamese: slim body, long wedge face, tall ears, and the "pointed" coat:
 * dark mask, ears, paws and tail on a pale body, with almond blue eyes.
 */
export function SiameseArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const paws: PawStyle = {
    mitten: c.markings,
    mittenShade: c.markingsDark,
    toe: c.markingsLight,
    bean: c.accentSoft,
    cuffs: [c.markings, c.markings],
  };

  if (layer === "front") {
    return (
      <ArtSvg mood={mood} layer={layer}>
        <Paws c={c} style={paws} />
      </ArtSvg>
    );
  }

  const sleeping = mood === "sleeping";
  const happy = mood === "happy";

  return (
    <ArtSvg mood={mood} layer={layer}>
      <Tail c={c} fur={c.markings} outlineWidth={11} furWidth={5} />
      <Body c={c} build={BODY.slim} fill={c.fur} shade={c.furDark} id="jp-cat-siamese-body">
        <Bib fill={c.bellyLight} shade={c.bellyShade} />
      </Body>

      <g className="jp-pet-head">
        <path d={HEAD} fill={c.fur} stroke={c.outline} strokeWidth="6" paintOrder="stroke" />
        <clipPath id="jp-cat-siamese-head">
          <path d={HEAD} />
        </clipPath>
        <g clipPath="url(#jp-cat-siamese-head)">
          {/* Dark points: ears and mask. */}
          <rect x="0" y="0" width="120" height="28" fill={c.markings} />
          <path d={MASK} fill={c.markings} />
          {/* Inner ears. */}
          <path d="M34 12 H38 V18 H42 V26 H30 V18 H34 Z" fill={c.accent} />
          <path d="M86 12 H82 V18 H78 V26 H90 V18 H86 Z" fill={c.accent} />
        </g>

        {/* Eyes: almond-shaped, blue, with a vertical pupil. */}
        {sleeping || happy ? (
          <MoodEyes mood={mood} c={c} />
        ) : (
          <g className="jp-pet-eyes">
            <path d="M26 54 H30 V50 H40 V54 H44 V58 H40 V62 H30 V58 H26 Z" fill={c.outline} />
            <path d="M94 54 H90 V50 H80 V54 H76 V58 H80 V62 H90 V58 H94 Z" fill={c.outline} />
            <rect x="30" y="52" width="10" height="8" fill={c.eyes} />
            <rect x="80" y="52" width="10" height="8" fill={c.eyes} />
            <g className="jp-pet-pupils">
              <rect x="34" y="52" width="3" height="8" fill={c.outline} />
              <rect x="83" y="52" width="3" height="8" fill={c.outline} />
            </g>
            <rect x="31" y="53" width="3" height="3" fill="#fff" />
            <rect x="80" y="53" width="3" height="3" fill="#fff" />
          </g>
        )}

        {/* Nose and mouth sit on the dark mask, so the mouth is drawn light. */}
        <path d="M56 58 H64 V60 H62 V62 H58 V60 H56 Z" fill={c.accent} />
        <g transform="translate(0 -2)">
          <Mouth happy={happy} c={c} line={c.markingsLight} />
        </g>
        <Whiskers />
      </g>

      {sleeping && <Zzz big={[103, 8]} small={[113, 0]} />}
    </ArtSvg>
  );
}
