import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Tail, Zzz } from "../shared";
import { FLUFFY_HEAD } from "../fox/parts";
import { BearFace } from "./parts";

const EAR = "M22 10 H32 V12 H36 V16 H40 V22 H42 V34 H16 V24 H18 V16 H20 V12 H22 Z";
const EAR_INNER = "M26 18 H32 V20 H36 V24 H38 V32 H22 V24 H24 V20 H26 Z";

// White cheek patch (left; mirrored).
const CHEEK = "M10 50 H30 V54 H36 V66 H28 V72 H18 V66 H10 Z";

/**
 * Red panda: rusty coat, white cheeks, brow marks and ear rims, dark tear
 * stripes under the eyes, dark legs and a bushy ringed tail.
 */
export function RedPandaArt({ mood, layer, palette }: PixelPetArtProps) {
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
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={19}
        furWidth={13}
        bands={[100, 88, 76]}
        bandColor={c.markings}
        paths={{
          outline: "M106 128 V108 H112 V84 H110 V62",
          fur: "M106 128 V108 H112 V84 H110 V65",
        }}
        origin="108px 116px"
        tip={c.markings}
        tipAt={[110, 64]}
        tipHeight={6}
      />
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.furDark} id="jp-redpanda-body">
        <Bib fill={c.markings} shade={c.markingsDark} />
      </Body>
      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d={EAR_INNER} fill={c.belly} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={FLUFFY_HEAD} fill={c.fur} outline={c.outline} />
        <ClipTo id="jp-redpanda-head" d={FLUFFY_HEAD}>
          <Mirror>
            <path d={CHEEK} fill={c.belly} />
          </Mirror>
        </ClipTo>
        {/* Brow marks and tear stripes. */}
        <rect x="32" y="42" width="8" height="3" fill={c.belly} />
        <rect x="80" y="42" width="8" height="3" fill={c.belly} />
        <rect x="33" y="58" width="3" height="10" fill={c.markings} />
        <rect x="84" y="58" width="3" height="10" fill={c.markings} />
        <path d="M46 58 H74 V68 H70 V74 H50 V68 H46 Z" fill={c.belly} />
        <BearFace c={c} mood={mood} eyeX={34} eyeY={47} noseY={58} small />
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
