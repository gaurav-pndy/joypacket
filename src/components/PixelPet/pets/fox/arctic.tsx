import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, Mirror, Outlined, PetArt, Tail, Zzz, lightPaws } from "../shared";
import { FLUFFY_HEAD, FoxFace } from "./parts";

const EAR = "M24 14 H34 V16 H38 V20 H40 V36 H20 V24 H22 V18 H24 Z";
const EAR_INNER = "M27 20 H33 V22 H35 V32 H25 V24 H27 Z";

/**
 * Arctic fox: all pale and fluffy, with a round puffball face, small round
 * ears, thick cheek fluff and a huge white tail.
 */
export function ArcticFoxArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={28}
        furWidth={22}
        paths={{
          outline: "M104 128 V108 H107 V84 H106 V66",
          fur: "M104 128 V108 H107 V84 H106 V69",
        }}
        origin="106px 116px"
      />
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.markings} id="jp-arctic-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d={EAR_INNER} fill={c.markings} opacity=".7" />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={FLUFFY_HEAD} fill={c.fur} outline={c.outline} />
        {/* Soft shading in the cheek fluff. */}
        <path d="M12 54 H18 V56 H12 Z M102 54 H108 V56 H102 Z M16 60 H22 V62 H16 Z M98 60 H104 V62 H98 Z" fill={c.markings} />
        <path d="M46 60 H74 V68 H70 V74 H50 V68 H46 Z" fill={c.belly} />
        <FoxFace c={c} mood={mood} eyeX={34} eyeY={48} noseY={60} />
        <g fill={c.accent} opacity=".6">
          <rect x="24" y="62" width="9" height="4" />
          <rect x="87" y="62" width="9" height="4" />
        </g>
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
