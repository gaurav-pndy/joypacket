import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Tail, Zzz, lightPaws, symmetricPath } from "../shared";
import { DOG_HEAD, DogFace } from "./parts";

const EAR = "M32 4 H36 V8 H40 V14 H44 V20 H46 V34 H24 V24 H26 V16 H28 V10 H30 V6 H32 Z";
const EAR_INNER = "M33 12 H36 V16 H40 V28 H30 V18 H33 Z";

// White lower face with a thin blaze up the forehead; the dark cap stays on top.
const MASK = symmetricPath([
  [60, 30], [57, 30], [57, 44], [54, 44], [54, 54], [46, 54], [46, 60], [34, 60],
  [34, 64], [24, 64], [24, 70], [28, 70], [28, 76], [36, 76], [36, 78], [60, 78],
]);

/**
 * Husky: tall pointed ears, a grey coat with a dark cap and white mask,
 * pale blue eyes with white brows, and a big fluffy tail.
 */
export function HuskyArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={17}
        furWidth={11}
        paths={{
          outline: "M107 128 V108 H112 V84 H110 V70.5",
          fur: "M107 128 V108 H112 V84 H110 V73.5",
        }}
        origin="110px 116px"
        tip={c.belly}
        tipAt={[110, 73]}
      />
      <Body c={c} build={BODY.normal} fill={c.fur} shade={c.furDark} id="jp-husky-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>

      <Mirror>
        <Outlined d={EAR} fill={c.markings} outline={c.outline} />
        <path d={EAR_INNER} fill={c.belly} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={DOG_HEAD} fill={c.fur} outline={c.outline} />
        <ClipTo id="jp-husky-head" d={DOG_HEAD}>
          {/* Dark cap and eye patches. */}
          <rect x="0" y="0" width="120" height="40" fill={c.markings} />
          <path d="M24 40 H48 V56 H24 Z M72 40 H96 V56 H72 Z" fill={c.markings} />
          <path d={MASK} fill={c.belly} />
        </ClipTo>
        {/* White brows. */}
        <rect x="31" y="40" width="9" height="3" fill={c.belly} />
        <rect x="80" y="40" width="9" height="3" fill={c.belly} />
        <DogFace c={c} mood={mood} eyeX={30} eyeY={45} iris={c.eyes} />
      </g>
      {mood === "sleeping" && <Zzz big={[99, 4]} small={[111, 0]} />}
    </PetArt>
  );
}
