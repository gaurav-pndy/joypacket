import type { PixelPetArtProps } from "../../types";
import type { Palette } from "../palette";
import { Bib, Body, BODY, Mirror, Outlined, PetArt, Zzz, lightPaws, symmetricPath } from "../shared";
import { BunnyFace, POM_TAIL } from "./parts";

// Lean hare-like face.
const HEAD = symmetricPath([
  [60, 36], [46, 36], [46, 38], [38, 38], [38, 42], [32, 42], [32, 48], [28, 48],
  [28, 54], [26, 54], [26, 64], [28, 64], [28, 70], [32, 70], [32, 74], [38, 74],
  [38, 78], [60, 78],
]);

// Tall, narrow ears leaning outwards.
const EAR = "M32 2 H38 V6 H42 V12 H44 V40 H30 V24 H28 V14 H30 V6 H32 Z";

/**
 * Wild rabbit: brown, with very tall dark-tipped ears, a slim face with pale
 * eye rings, and a white cotton tail.
 */
export function WildArt({ mood, layer, palette }: PixelPetArtProps) {
  const c = palette as Palette;
  return (
    <PetArt mood={mood} layer={layer} c={c} paws={lightPaws(c, [c.fur, c.fur])}>
      <g className="jp-pet-tail" style={{ transformOrigin: "98px 108px" }} transform="translate(-12 0)">
        <Outlined d={POM_TAIL} fill="#fff" outline={c.outline} />
      </g>
      <Body c={c} build={BODY.slim} fill={c.fur} shade={c.furDark} id="jp-wild-body">
        <Bib fill={c.belly} shade={c.bellyShade} />
      </Body>
      <Mirror>
        <Outlined d={EAR} fill={c.fur} outline={c.outline} />
        <path d="M30 2 H38 V6 H42 V10 H30 Z" fill={c.markings} />
        <path d="M34 14 H40 V38 H36 V16 Z" fill={c.furLight} />
      </Mirror>
      <g className="jp-pet-head">
        <Outlined d={HEAD} fill={c.fur} outline={c.outline} />
        <path d="M46 60 H74 V68 H70 V74 H50 V68 H46 Z" fill={c.belly} />
        {/* Pale rings around the eyes. */}
        <path d="M30 48 H44 V50 H46 V62 H44 V64 H30 V62 H28 V50 H30 Z" fill={c.belly} transform="translate(0 -2)" />
        <path d="M76 48 H90 V50 H92 V62 H90 V64 H76 V62 H74 V50 H76 Z" fill={c.belly} transform="translate(0 -2)" />
        <BunnyFace c={c} mood={mood} eyeX={34} eyeY={49} />
      </g>
      {mood === "sleeping" && <Zzz big={[99, 4]} small={[111, 0]} />}
    </PetArt>
  );
}
