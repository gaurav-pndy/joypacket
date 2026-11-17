import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Tail, Zzz, lightPaws, symmetricPath } from "../shared";
import { DOG_HEAD, DogFace } from "./parts";

const EAR = "M26 6 H36 V8 H40 V12 H44 V18 H46 V34 H22 V22 H20 V14 H22 V10 H26 Z";
const EAR_INNER = "M28 12 H36 V14 H38 V18 H40 V30 H26 V16 H28 Z";

// White blaze down the forehead, opening into the white muzzle and cheeks.
const BLAZE = symmetricPath([
  [60, 30], [56, 30], [56, 44], [54, 44], [54, 54], [46, 54], [46, 58], [40, 58],
  [40, 64], [26, 64], [26, 68], [22, 68], [22, 72], [28, 72], [28, 76], [36, 76],
  [36, 78], [60, 78],
]);

/**
 * Corgi: very large rounded upright ears, a white blaze and muzzle on an
 * orange coat, a chubby low body, and just a tiny stub of a tail.
 */
export function CorgiArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      {/* Stub tail. */}
      <g className="jp-pet-tail" style={{ transformOrigin: "110px 112px" }}>
        <Outlined d="M104 100 H112 V102 H114 V112 H104 Z" fill={c.fur} outline={c.outline} />
      </g>
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.furDark} id="jp-corgi-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>

      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d={EAR_INNER} fill={c.accentSoft} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={DOG_HEAD} fill={c.fur} outline={c.outline} />
        <ClipTo id="jp-corgi-head" d={DOG_HEAD}>
          <path d={BLAZE} fill={c.belly} />
        </ClipTo>
        <DogFace c={c} mood={mood} eyeY={48} />
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
