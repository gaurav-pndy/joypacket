import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Zzz } from "../shared";
import { BEAR_HEAD, BearFace, ROUND_EAR } from "./parts";

// Tilted oval eye patch (left; mirrored).
const PATCH = "M24 44 H34 V46 H38 V52 H40 V58 H34 V62 H28 V58 H24 V50 Z";

/**
 * Giant panda: white face with black round ears, big tilted eye patches,
 * and black arms and shoulders on a white body.
 */
export function PandaArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const paws = {
    mitten: c.markings,
    mittenShade: c.markingsDark,
    toe: c.markingsLight,
    bean: c.accentSoft,
    cuffs: [c.markings, c.markings] as const,
  };
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={paws}>
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.bellyShade} id="jp-panda-body">
        {/* Black shoulder band and arms. */}
        <Mirror>
          <path d="M0 66 H44 V90 H34 V128 H0 Z" fill={c.markings} />
        </Mirror>
        <Bib fill={c.bellyLight} shade={c.bellyShade} />
      </Body>
      <Mirror>
        <Outlined d={ROUND_EAR} fill={c.markings} outline={c.outline} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={BEAR_HEAD} fill={c.fur} outline={c.outline} />
        <ClipTo id="jp-panda-head" d={BEAR_HEAD}>
          <Mirror>
            <path d={PATCH} fill={c.markings} />
          </Mirror>
        </ClipTo>
        <path d="M46 56 H74 V68 H70 V74 H50 V68 H46 Z" fill={c.bellyLight} />
        <BearFace c={c} mood={mood} eyeX={29} eyeY={49} eyeColor={c.markingsLight} />
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
