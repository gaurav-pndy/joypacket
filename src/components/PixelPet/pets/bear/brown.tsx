import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, Mirror, Outlined, PetArt, Tail, Zzz } from "../shared";
import { BEAR_HEAD, BearFace, ROUND_EAR, ROUND_EAR_INNER } from "./parts";

/**
 * Brown bear: warm brown, round ears with light insides, a tan muzzle and
 * a sturdy shoulder hump over a chubby body.
 */
export function BrownArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const paws = {
    mitten: c.furDark,
    mittenShade: c.markings,
    toe: c.markingsLight,
    bean: c.accentSoft,
    cuffs: [c.fur, c.fur] as const,
  };
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={paws}>
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={13}
        furWidth={7}
        paths={{ outline: "M109 128 V112 H112 V102", fur: "M109 128 V112 H112 V105" }}
        origin="110px 116px"
      />
      <Body c={c} build={BODY.chubby} fill={c.fur} shade={c.furDark} id="jp-brown-body">
        <Bib fill={c.belly} shade={c.markingsLight} />
      </Body>
      <Mirror>
        <Outlined d={ROUND_EAR} fill={c.fur} outline={c.outline} />
        <path d={ROUND_EAR_INNER} fill={c.belly} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={BEAR_HEAD} fill={c.fur} outline={c.outline} />
        <path d="M30 34 H38 V36 H30 Z M82 34 H90 V36 H82 Z" fill={c.furLight} />
        <path d="M46 54 H74 V62 H76 V70 H72 V76 H48 V70 H44 V62 H46 Z" fill={c.belly} />
        <BearFace c={c} mood={mood} eyeX={34} eyeY={46} noseY={54} />
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
