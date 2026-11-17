import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Zzz, lightPaws } from "../shared";
import { BUNNY_HEAD, BunnyFace, EAR_UPRIGHT, EAR_UPRIGHT_INNER, POM_TAIL } from "./parts";

/**
 * Dutch rabbit: tall upright ears, a dark coat on the ears, cheeks and
 * shoulders, and a white blaze, muzzle and chest.
 */
export function DutchArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <g className="jp-pet-tail" style={{ transformOrigin: "110px 108px" }}>
        <Outlined d={POM_TAIL} fill={c.fur} outline={c.outline} />
      </g>
      <Body c={c} build={BODY.chubby} fill={c.markings} shade={c.markingsDark} id="jp-dutch-body">
        {/* White chest and front. */}
        <path d="M40 62 H80 V128 H40 Z" fill={c.fur} />
        <path d="M34 100 H86 V128 H34 Z" fill={c.fur} />
      </Body>
      <Mirror>
        <Outlined d={EAR_UPRIGHT} fill={c.markings} outline={c.outline} />
        <path d={EAR_UPRIGHT_INNER} fill={c.accent} opacity=".8" />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={BUNNY_HEAD} fill={c.markings} outline={c.outline} />
        <ClipTo id="jp-dutch-head" d={BUNNY_HEAD}>
          {/* White blaze widening into the muzzle and chin. */}
          <path
            d="M60 32 H64 V44 H66 V56 H72 V60 H80 V64 H84 V78 H36 V64 H40 V60 H48 V56 H54 V44 H56 V32 Z"
            fill={c.fur}
          />
        </ClipTo>
        <BunnyFace c={c} mood={mood} eyeColor={c.eyes} />
      </g>
      {mood === "sleeping" && <Zzz big={[99, 4]} small={[111, 0]} />}
    </PetArt>
  );
}
