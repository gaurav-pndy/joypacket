import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Tail, Zzz, symmetricPath } from "../shared";
import { FOX_HEAD, FoxFace } from "./parts";

const EAR = "M28 2 H34 V6 H38 V12 H42 V18 H46 V24 H48 V38 H22 V26 H24 V18 H26 V10 H28 Z";
const EAR_INNER = "M31 14 H34 V18 H38 V24 H42 V36 H30 V20 H31 Z";

// White cheeks and chin below the eyes.
const WHITE = symmetricPath([
  [60, 62], [52, 62], [52, 58], [42, 58], [42, 54], [32, 54], [32, 58], [10, 58],
  [10, 90], [60, 90],
]);

/**
 * Red fox: tall black-backed ears, a rusty coat with white cheeks and chin,
 * dark "socks" on its paws and a big bushy tail with a white tip.
 */
export function RedFoxArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const paws = {
    mitten: c.markings,
    mittenShade: c.markingsDark,
    toe: c.markingsLight,
    bean: c.accentSoft,
    cuffs: [c.fur, c.fur] as const,
  };
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={paws}>
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={19}
        furWidth={13}
        paths={{
          outline: "M106 128 V108 H112 V84 H110 V58.5",
          fur: "M106 128 V108 H112 V84 H110 V61.5",
        }}
        origin="108px 116px"
        tip={c.belly}
        tipAt={[110, 60]}
        tipHeight={14}
      />
      <Body c={c} build={BODY.normal} fill={c.fur} shade={c.furDark} id="jp-red-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <Mirror>
        <Outlined d={EAR} fill={c.markings} outline={c.outline} />
        <path d={EAR_INNER} fill={c.belly} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={FOX_HEAD} fill={c.fur} outline={c.outline} />
        <ClipTo id="jp-red-head" d={FOX_HEAD}>
          <path d={WHITE} fill={c.belly} />
        </ClipTo>
        <FoxFace c={c} mood={mood} noseY={66} />
      </g>
      {mood === "sleeping" && <Zzz big={[99, 4]} small={[111, 0]} />}
    </PetArt>
  );
}
