import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, Mirror, Outlined, PetArt, Zzz, lightPaws, symmetricPath } from "../shared";
import { BUNNY_HEAD, BunnyFace, POM_TAIL } from "./parts";

// The woolly mane: a jagged ring much wider than the face.
const MANE = symmetricPath([
  [60, 22], [48, 22], [48, 26], [40, 26], [40, 24], [32, 24], [32, 28], [24, 28],
  [24, 32], [16, 32], [16, 38], [10, 38], [10, 46], [14, 46], [14, 52], [8, 52],
  [8, 62], [12, 62], [12, 68], [16, 68], [16, 74], [22, 74], [22, 80], [34, 80],
  [34, 82], [60, 82],
]);

// Short ear peeking out of the mane.
const EAR = "M38 8 H44 V10 H46 V16 H48 V32 H34 V18 H36 V10 H38 Z";

/**
 * Lionhead: a big fluffy mane of wool all around a small face, with short
 * ears poking out and a pale round face.
 */
export function LionheadArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <g className="jp-pet-tail" style={{ transformOrigin: "110px 108px" }}>
        <Outlined d={POM_TAIL} fill={c.fur} outline={c.outline} />
      </g>
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.furDark} id="jp-lion-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d="M39 14 H43 V30 H38 V16 Z" fill={c.accent} opacity=".8" />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={MANE} fill={c.fur} outline={c.outline} />
        {/* Wool tufts. */}
        <path d="M20 40 H26 V42 H20 Z M96 40 H102 V42 H96 Z M14 58 H20 V60 H14 Z M100 58 H106 V60 H100 Z M30 30 H36 V32 H30 Z M84 30 H90 V32 H84 Z" fill={c.furLight} />
        <path d={BUNNY_HEAD} fill={c.belly} transform="translate(0 2)" />
        <path d="M60 36 H64 V42 H56 Z" fill={c.markings} opacity=".5" />
        <g transform="translate(0 2)">
          <BunnyFace c={c} mood={mood} />
        </g>
      </g>
      {mood === "sleeping" && <Zzz big={[101, 6]} small={[112, 0]} />}
    </PetArt>
  );
}
