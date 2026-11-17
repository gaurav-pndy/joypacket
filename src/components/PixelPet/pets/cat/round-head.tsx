import type { ReactNode } from "react";
import type { PixelPetMood } from "../../types";
import type { Palette } from "../palette";
import { MoodEyes, Mouth, Whiskers } from "../shared";

const OUTLINE_PATH =
  "M14 40 H18 V30 H22 V18 H26 V10 H34 V14 H40 V20 H46 V24 H74 V20 H80 V14 H86 V10 H94 V18 H98 V30 H102 V40 H106 V58 H102 V66 H96 V72 H88 V76 H32 V72 H24 V66 H18 V58 H14 Z";
const FILL_PATH =
  "M17 43 H21 V33 H25 V21 H29 V13 H33 V17 H39 V23 H45 V27 H75 V23 H81 V17 H87 V13 H91 V21 H95 V33 H99 V43 H103 V57 H99 V63 H93 V69 H85 V73 H35 V69 H27 V63 H21 V57 H17 Z";

/**
 * The classic round head with pointed ears (tabby and calico share it).
 * `patches` are drawn over `fill`, clipped to the head.
 */
export function RoundHead({
  c,
  mood,
  fill,
  muzzle,
  stripes = false,
  patches,
}: {
  c: Palette;
  mood: PixelPetMood;
  fill: string;
  muzzle: string;
  /** Tabby forehead marks and brow highlights. */
  stripes?: boolean;
  patches?: ReactNode;
}) {
  const sleeping = mood === "sleeping";
  const happy = mood === "happy";

  return (
    <g className="jp-pet-head">
      <path d={OUTLINE_PATH} fill={c.outline} />
      <path d={FILL_PATH} fill={fill} />
      {patches && (
        <>
          <clipPath id="jp-cat-round-head">
            <path d={FILL_PATH} />
          </clipPath>
          <g clipPath="url(#jp-cat-round-head)">{patches}</g>
        </>
      )}

      {/* Inner ears. */}
      <path d="M29 17 H33 V21 H37 V25 H41 V28 H28 V21 H29 Z" fill={c.accent} />
      <path d="M91 17 H87 V21 H83 V25 H79 V28 H92 V21 H91 Z" fill={c.accent} />

      {stripes && (
        <>
          <path
            d="M59 27 H61 V35 H59 Z M54 28 H56 V33 H54 Z M64 28 H66 V33 H64 Z"
            fill={c.markings}
          />
          <path d="M47 29 H49 V34 H47 Z M71 29 H73 V34 H71 Z" fill={c.markings} />
          <path d="M26 38 H40 V40 H26 Z M80 38 H94 V40 H80 Z" fill={c.furLight} />
          {/* Cheek stripes. */}
          <path
            d="M19 49 H28 V51 H19 Z M18 55 H27 V57 H18 Z M19 61 H26 V63 H19 Z M92 49 H101 V51 H92 Z M93 55 H102 V57 H93 Z M94 61 H101 V63 H94 Z"
            fill={c.markings}
          />
        </>
      )}

      {/* Light muzzle. */}
      <path d="M48 60 H72 V68 H68 V72 H52 V68 H48 Z" fill={muzzle} />

      {/* Eyes: big, glossy and rounded; the mood changes their shape. */}
      {sleeping || happy ? (
        <MoodEyes mood={mood} c={c} />
      ) : (
        <g className="jp-pet-eyes">
          <path d="M30 44 H42 V46 H44 V59 H42 V61 H30 V59 H28 V46 H30 Z" fill={c.outline} />
          <path d="M78 44 H90 V46 H92 V59 H90 V61 H78 V59 H76 V46 H78 Z" fill={c.outline} />
          <rect x="30" y="46" width="12" height="14" fill={c.eyes} />
          <rect x="78" y="46" width="12" height="14" fill={c.eyes} />
          <g className="jp-pet-pupils">
            <rect x="33" y="47" width="6" height="12" fill={c.outline} />
            <rect x="81" y="47" width="6" height="12" fill={c.outline} />
          </g>
          {/* Catchlights. */}
          <rect x="31" y="47" width="4" height="4" fill="#fff" />
          <rect x="79" y="47" width="4" height="4" fill="#fff" />
          <rect x="38" y="55" width="2" height="2" fill="#fff" />
          <rect x="86" y="55" width="2" height="2" fill="#fff" />
        </g>
      )}

      {/* Blush cheeks. */}
      <g fill={c.accent} opacity=".75">
        <rect x="20" y="62" width="9" height="4" />
        <rect x="91" y="62" width="9" height="4" />
      </g>

      {/* Nose and mouth. */}
      <path d="M56 60 H64 V62 H62 V64 H58 V62 H56 Z" fill={c.accent} />
      <Mouth happy={happy} c={c} />
      <Whiskers />
    </g>
  );
}
