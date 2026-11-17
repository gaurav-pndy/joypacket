import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, Mirror, Outlined, PetArt, Zzz, lightPaws } from "../shared";
import { BUNNY_HEAD, BunnyFace, POM_TAIL } from "./parts";

// Long ear hanging down beside the face (left side; mirrored for the right).
const EAR = "M22 30 H30 V34 H33 V48 H31 V62 H29 V72 H25 V77 H17 V71 H15 V59 H13 V45 H15 V37 H19 V33 H22 Z";

/**
 * Holland Lop: ears hang down beside a round little face, with a fluffy
 * round body and tail. The head sits higher so the long ears have room.
 */
export function LopArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <g className="jp-pet-tail" style={{ transformOrigin: "110px 108px" }}>
        <Outlined d={POM_TAIL} fill={c.bellyLight} outline={c.outline} />
      </g>
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.furDark} id="jp-lop-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <g transform="translate(0 -14)">
        <g className="jp-pet-head">
          <Outlined d={BUNNY_HEAD} fill={c.fur} outline={c.outline} />
          <path d="M46 60 H74 V68 H70 V74 H50 V68 H46 Z" fill={c.belly} />
          <BunnyFace c={c} mood={mood} />
          <Mirror>
            <Outlined d={EAR} fill={c.markings} outline={c.outline} />
            <path d="M18 44 H22 V70 H18 Z" fill={c.accentSoft} opacity=".55" />
          </Mirror>
        </g>
      </g>
      {mood === "sleeping" && <Zzz big={[99, 4]} small={[111, 0]} />}
    </PetArt>
  );
}
