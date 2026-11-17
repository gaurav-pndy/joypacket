import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, Mirror, Outlined, PetArt, Zzz, lightPaws } from "../shared";
import { BEAR_HEAD, BearFace } from "./parts";

// Small, low ear.
const EAR = "M20 14 H30 V16 H34 V20 H36 V30 H16 V22 H18 V18 H20 Z";

/**
 * Polar bear: creamy white, small low ears, a long soft muzzle with a big
 * black nose and tiny eyes, and a chubby body.
 */
export function PolarArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <Body c={c} build={BODY.chubby} fill={c.fur} shade="#c4d3e0" id="jp-polar-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d="M22 20 H28 V22 H30 V28 H20 V24 H22 Z" fill="#c4d3e0" />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={BEAR_HEAD} fill={c.fur} outline={c.outline} />
        {/* Icy shading at the cheeks. */}
        <path d="M18 56 H26 V60 H18 Z M94 56 H102 V60 H94 Z" fill="#d6e2ec" />
        {/* Long muzzle. */}
        <path d="M42 54 H78 V62 H80 V70 H76 V76 H44 V70 H40 V62 H42 Z" fill={c.belly} />
        <BearFace c={c} mood={mood} eyeX={34} eyeY={46} noseY={54} small />
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
