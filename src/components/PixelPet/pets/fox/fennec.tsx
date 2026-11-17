import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, Mirror, Outlined, PetArt, Tail, Zzz, lightPaws, symmetricPath } from "../shared";
import { FoxFace } from "./parts";

// Small narrow face; the ears do most of the talking.
const HEAD = symmetricPath([
  [60, 34], [46, 34], [46, 36], [38, 36], [38, 40], [32, 40], [32, 46], [28, 46],
  [28, 56], [30, 56], [30, 62], [34, 62], [34, 68], [40, 68], [40, 72], [46, 72],
  [46, 78], [60, 78],
]);

// Enormous ears (left side; mirrored).
const EAR = "M20 6 H26 V10 H30 V16 H34 V22 H38 V28 H44 V34 H48 V44 H16 V30 H14 V20 H16 V12 H18 V8 H20 Z";
const EAR_INNER = "M22 14 H26 V18 H30 V24 H34 V30 H40 V42 H22 V24 H22 Z";

/**
 * Fennec fox: enormous bat-like ears with pink insides, a small narrow face
 * with big dark eyes, sandy fur and a dark-tipped tail.
 */
export function FennecArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={14}
        furWidth={8}
        paths={{
          outline: "M108 128 V108 H112 V88 H114 V66",
          fur: "M108 128 V108 H112 V88 H114 V69",
        }}
        origin="110px 116px"
        tip={c.markings}
        tipAt={[114, 68]}
        tipHeight={8}
      />
      <Body c={c} build={BODY.slim} fill={c.fur} shade={c.furDark} id="jp-fennec-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d={EAR_INNER} fill={c.accent} opacity=".85" />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={HEAD} fill={c.fur} outline={c.outline} />
        <path d="M46 62 H74 V70 H70 V76 H50 V70 H46 Z" fill={c.belly} />
        <FoxFace c={c} mood={mood} eyeX={34} eyeY={46} noseY={62} big />
      </g>
      {mood === "sleeping" && <Zzz big={[101, 8]} small={[112, 0]} />}
    </PetArt>
  );
}
