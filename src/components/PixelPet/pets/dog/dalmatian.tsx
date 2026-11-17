import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, ClipTo, Mirror, Outlined, PetArt, Tail, Zzz, lightPaws } from "../shared";
import { DOG_HEAD, DogFace } from "./parts";

// Floppy ear hanging down the side of the face (drawn over the head).
const EAR = "M20 28 H30 V32 H34 V44 H32 V60 H30 V68 H22 V62 H18 V50 H16 V38 H18 V32 H20 Z";

/**
 * Dalmatian: a white coat covered in black spots, big floppy black ears that
 * hang beside the face, and a slim tail.
 */
export function DalmatianArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const spots = (
    <g fill={c.markings}>
      <path d="M64 30 H72 V34 H74 V38 H66 V36 H64 Z" />
      <path d="M86 56 H94 V60 H96 V64 H88 V62 H86 Z" />
      <path d="M24 84 H32 V88 H34 V94 H26 V92 H24 Z" />
      <path d="M88 82 H96 V86 H98 V92 H90 V90 H88 Z" />
      <path d="M48 29 H56 V35 H48 Z" />
      <path d="M68 66 H73 V70 H68 Z" />
      <path d="M40 94 H50 V102 H40 Z" />
      <path d="M70 88 H80 V96 H70 Z" />
      <path d="M18 96 H28 V106 H18 Z" />
      <path d="M82 100 H90 V104 H92 V110 H84 V108 H82 Z" />
      <path d="M30 100 H38 V104 H40 V108 H32 V106 H30 Z" />
    </g>
  );
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <Tail
        c={c}
        fur={c.fur}
        outlineWidth={11}
        furWidth={5}
        paths={{
          outline: "M109 128 V110 H113 V80 H114 V62.5",
          fur: "M109 128 V110 H113 V80 H114 V65.5",
        }}
        origin="111px 116px"
        tip={c.markings}
        tipAt={[114, 64]}
      />
      <Body c={c} build={BODY.normal} fill={c.fur} shade={c.bellyShade} id="jp-dal-body">
        <Bib fill={c.bellyLight} shade={c.bellyShade} />
        {spots}
      </Body>

      <g className="jp-pet-head">
        <Outlined d={DOG_HEAD} fill={c.fur} outline={c.outline} />
        <ClipTo id="jp-dal-head" d={DOG_HEAD}>
          {spots}
        </ClipTo>
        <DogFace c={c} mood={mood} eyeX={36} eyeY={46} />
        <Mirror>
          <Outlined d={EAR} fill={c.markings} outline={c.outline} />
        </Mirror>
      </g>
      {mood === "sleeping" && <Zzz />}
    </PetArt>
  );
}
