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

// Big round head with chubby cheeks (fur boundary; outline is a stroke).
const HEAD = symmetricPath([
  [60, 22], [40, 22], [40, 24], [32, 24], [32, 28], [26, 28], [26, 32], [22, 32],
  [22, 38], [18, 38], [18, 46], [14, 46], [14, 62], [16, 62], [16, 68], [20, 68],
  [20, 72], [26, 72], [26, 76], [34, 76], [34, 78], [60, 78],
]);

// One folded ear (left side): a small flap lying on the top corner of the
// head. The right ear is the same shape mirrored.
const EAR =
  "M30 20 H40 V22 H44 V26 H46 V32 H26 V28 H24 V24 H26 V22 H30 Z";

/**
 * Scottish Fold: chubby build, very round head, ears folded flat, big round
 * eyes and a soft little muzzle.
 */
export function FoldArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const paws: PawStyle = {
    mitten: c.bellyLight,
    mittenShade: c.bellyShade,
    toe: c.toeLine,
    bean: c.accentSoft,
    cuffs: [c.fur, c.fur],
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
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={14}
        furWidth={8}
        bands={[99, 85, 73]}
        bandColor={c.markings}
        tip={c.bellyLight}
      />
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.furDark} id="jp-cat-fold-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>

      <g className="jp-pet-head">
        <path d={HEAD} fill={c.fur} stroke={c.outline} strokeWidth="6" paintOrder="stroke" />

        {/* Silver-tabby forehead marks and cheek stripes. */}
        <path
          d="M58 24 H62 V34 H58 Z M52 25 H55 V32 H52 Z M65 25 H68 V32 H65 Z"
          fill={c.markings}
        />
        <path d="M14 54 H22 V56 H14 Z M14 59 H20 V61 H14 Z M98 54 H106 V56 H98 Z M100 59 H106 V61 H100 Z" fill={c.markings} />

        {/* Soft muzzle. */}
        <path d="M44 62 H76 V70 H72 V76 H48 V70 H44 Z" fill={c.belly} />

        {/* Folded ears: drawn over the head, lying flat. */}
        {[false, true].map((mirrored) => (
          <g key={String(mirrored)} transform={mirrored ? "translate(120 0) scale(-1 1)" : undefined}>
            <path d={EAR} fill={c.fur} stroke={c.outline} strokeWidth="6" paintOrder="stroke" />
            <path d="M30 26 H42 V30 H30 Z" fill={c.furDark} />
          </g>
        ))}

        {/* Eyes: very round and glossy. */}
        {sleeping || happy ? (
          <MoodEyes mood={mood} c={c} />
        ) : (
          <g className="jp-pet-eyes">
            <path d="M28 42 H42 V44 H44 V58 H42 V60 H28 V58 H26 V44 H28 Z" fill={c.outline} />
            <path d="M78 42 H92 V44 H94 V58 H92 V60 H78 V58 H76 V44 H78 Z" fill={c.outline} />
            <rect x="28" y="44" width="14" height="14" fill={c.eyes} />
            <rect x="78" y="44" width="14" height="14" fill={c.eyes} />
            <g className="jp-pet-pupils">
              <rect x="31" y="45" width="8" height="12" fill={c.outline} />
              <rect x="81" y="45" width="8" height="12" fill={c.outline} />
            </g>
            <rect x="29" y="45" width="5" height="5" fill="#fff" />
            <rect x="79" y="45" width="5" height="5" fill="#fff" />
            <rect x="37" y="54" width="2" height="2" fill="#fff" />
            <rect x="87" y="54" width="2" height="2" fill="#fff" />
          </g>
        )}

        <g fill={c.accent} opacity=".75">
          <rect x="22" y="62" width="10" height="4" />
          <rect x="88" y="62" width="10" height="4" />
        </g>

        <path d="M57 60 H63 V62 H62 V64 H58 V62 H57 Z" fill={c.accent} />
        <Mouth happy={happy} c={c} />
        <Whiskers short />
      </g>

      {sleeping && <Zzz big={[101, 6]} small={[112, 0]} />}
    </ArtSvg>
  );
}
