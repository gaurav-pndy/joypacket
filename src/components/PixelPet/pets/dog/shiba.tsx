import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Tail, Zzz, lightPaws } from "../shared";
import { DOG_HEAD, DogFace, LOWER_FACE } from "./parts";

const EAR = "M30 8 H36 V12 H40 V18 H44 V24 H46 V34 H24 V26 H26 V20 H28 V14 H30 Z";
const EAR_INNER = "M33 14 H36 V18 H39 V28 H31 V20 H33 Z";

/**
 * Shiba Inu: pointed upright ears, tan coat with the white "urajiro" lower
 * face and cheeks, cream brow dots, and a thick tail curled over its back.
 */
export function ShibaArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={19}
        furWidth={13}
        paths={{
          outline: "M108 128 V108 H113 V92 H108 V84.5",
          fur: "M108 128 V108 H113 V92 H108 V87.5",
        }}
        origin="110px 116px"
        tip={c.belly}
        tipAt={[108, 84]}
      />
      <Body c={c} build={BODY.normal} fill={c.fur} shade={c.furDark} id="jp-shiba-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>

      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d={EAR_INNER} fill={c.belly} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={DOG_HEAD} fill={c.fur} outline={c.outline} />
        <ClipTo id="jp-shiba-head" d={DOG_HEAD}>
          <path d={LOWER_FACE} fill={c.belly} />
          {/* Cream cheek "urajiro" reaching up under the eyes. */}
          <path d="M18 52 H30 V58 H26 V64 H18 Z M102 52 H90 V58 H94 V64 H102 Z" fill={c.belly} />
        </ClipTo>
        {/* Brow dots. */}
        <rect x="32" y="40" width="4" height="3" fill={c.belly} />
        <rect x="84" y="40" width="4" height="3" fill={c.belly} />
        <DogFace c={c} mood={mood} />
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
