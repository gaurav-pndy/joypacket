import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { RoundHead } from "./round-head";
import { ArtSvg, Bib, Body, Paws, Tail, Zzz } from "../shared";
import type { PawStyle } from "../shared";

/** Tabby: round face, forehead "M" marks, striped tail, cream bib and mittens. */
export function TabbyArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  const paws: PawStyle = {
    mitten: c.bellyLight,
    mittenShade: c.bellyShade,
    toe: c.toeLine,
    bean: c.accentSoft,
    cuffs: [c.fur, c.fur],
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
        bands={[99, 85, 73]}
        bandColor={c.markings}
        tip={c.bellyLight}
      />
      <Body c={c} fill={c.fur} shade={c.furDark} id="jp-cat-tabby-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <RoundHead c={c} mood={mood} fill={c.fur} muzzle={c.belly} stripes />
      {mood === "sleeping" && <Zzz />}
    </ArtSvg>
  );
}
