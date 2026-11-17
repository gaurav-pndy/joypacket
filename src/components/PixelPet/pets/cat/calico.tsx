import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { RoundHead } from "./round-head";
import { ArtSvg, BODY, Body, Paws, Tail, Zzz } from "../shared";
import type { PawStyle } from "../shared";

/**
 * Calico: a white cat with patches. Orange covers one ear and side of the
 * head, black the other, with a white blaze between; the shoulders and paw
 * cuffs are patched the same way.
 */
export function CalicoArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const paws: PawStyle = {
    mitten: c.bellyLight,
    mittenShade: c.bellyShade,
    toe: c.toeLine,
    bean: c.accentSoft,
    cuffs: [c.fur, c.markings],
  };

  if (layer === "front") {
    return (
      <ArtSvg mood={mood} layer={layer}>
        <Paws c={c} style={paws} />
      </ArtSvg>
    );
  }

  return (
    <ArtSvg mood={mood} layer={layer}>
      <Tail
        c={c}
        fur={c.fur}
        bands={[97, 80]}
        bandColor={c.markings}
        tip={c.bellyLight}
      />
      <Body
        c={c}
        build={BODY.normal}
        fill={c.belly}
        shade={c.bellyShade}
        id="jp-cat-calico-body"
      >
        {/* Shoulder patches. */}
        <path d="M0 60 H46 V84 H38 V96 H28 V108 H0 Z" fill={c.fur} />
        <path d="M82 60 H120 V104 H100 V92 H90 V80 H82 Z" fill={c.markings} />
      </Body>
      <RoundHead
        c={c}
        mood={mood}
        fill={c.belly}
        muzzle={c.bellyLight}
        patches={
          <>
            {/* Orange: left ear and side of the head. */}
            <path d="M0 0 H55 V22 H49 V32 H41 V43 H31 V49 H0 Z" fill={c.fur} />
            {/* Black: right ear, wrapping around the eye. */}
            <path d="M65 0 H120 V57 H97 V51 H88 V43 H77 V32 H65 Z" fill={c.markings} />
          </>
        }
      />
      {mood === "sleeping" && <Zzz />}
    </ArtSvg>
  );
}
