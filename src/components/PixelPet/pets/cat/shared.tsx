import type { ReactNode } from "react";
import type { PixelPetMood } from "../../types";
import { artClassName, artSvgProps } from "../contract";
import type { CatPalette } from "./palette";

/* Pieces shared by every cat breed. Breeds differ in head, ears, markings,
   body build, tail and paw colours; this file holds what they have in common. */

export function ArtSvg({
  mood,
  layer,
  children,
}: {
  mood: PixelPetMood;
  layer: "back" | "front";
  children: ReactNode;
}) {
  return (
    <svg
      {...artSvgProps}
      className={artClassName(mood, layer)}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

type Pt = [number, number];

/** Builds a closed, mirror-symmetric path from its left half (x < 60).
    The first and last points must sit on the centre line (x = 60). */
export function symmetricPath(left: Pt[]): string {
  const right = left
    .slice(1, -1)
    .reverse()
    .map(([x, y]): Pt => [120 - x, y]);
  return `M${[...left, ...right].map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
}

/* ------------------------------- Body ------------------------------- */

/** Left x of each shoulder step (top to bottom). The right side mirrors it. */
export const BODY = {
  normal: [34, 28, 22, 18],
  slim: [36, 32, 28, 24],
  chubby: [32, 24, 18, 13],
} as const;

export function Body({
  c,
  build = BODY.normal,
  fill,
  shade,
  id,
  children,
}: {
  c: CatPalette;
  build?: readonly number[];
  fill: string;
  shade: string;
  /** Unique clip id for this body (children are clipped to it). */
  id: string;
  children?: ReactNode;
}) {
  const L = build;
  const R = L.map((x) => 120 - x);
  const outline = `M${L[0]} 62 H${R[0]} V76 H${R[1]} V84 H${R[2]} V92 H${R[3]} V128 H${L[3]} V92 H${L[2]} V84 H${L[1]} V76 H${L[0]} Z`;
  const inner = `M${L[0] + 3} 62 H${R[0] - 3} V79 H${R[1] - 3} V87 H${R[2] - 3} V95 H${R[3] - 3} V128 H${L[3] + 3} V95 H${L[2] + 3} V87 H${L[1] + 3} V79 H${L[0] + 3} Z`;
  return (
    <g>
      <path d={outline} fill={c.outline} />
      <path d={inner} fill={fill} />
      <clipPath id={id}>
        <path d={inner} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        {children}
        {/* Side shading for a rounder chest. */}
        <path
          d={`M${L[3] + 3} 95 H${L[3] + 9} V128 H${L[3] + 3} Z M${R[3] - 9} 95 H${R[3] - 3} V128 H${R[3] - 9} Z M${L[2] + 3} 87 H${L[2] + 7} V95 H${L[2] + 3} Z M${R[2] - 7} 87 H${R[2] - 3} V95 H${R[2] - 7} Z`}
          fill={shade}
          opacity=".55"
        />
        {/* Hint of forelegs running down to the paws. */}
        <path d="M46 84 H48 V104 H46 Z M72 84 H74 V104 H72 Z" fill={shade} />
      </g>
    </g>
  );
}

/** Light chest bib between the forelegs. */
export function Bib({ fill, shade }: { fill: string; shade: string }) {
  return (
    <>
      <path d="M48 70 H72 V98 H68 V128 H52 V98 H48 Z" fill={fill} />
      <path d="M48 96 H52 V100 H48 Z M68 96 H72 V100 H68 Z" fill={shade} />
    </>
  );
}

/* ------------------------------- Tail ------------------------------- */

export function Tail({
  c,
  fur,
  outlineWidth = 13,
  furWidth = 7,
  bands = [],
  bandColor,
  tip,
}: {
  c: CatPalette;
  fur: string;
  outlineWidth?: number;
  furWidth?: number;
  /** y positions of stripes across the tail. */
  bands?: number[];
  bandColor?: string;
  tip?: string;
}) {
  const centre = (y: number) => (y >= 94 ? 112 : 113);
  return (
    <g className="jp-pet-tail" style={{ transformOrigin: "112px 116px" }}>
      <path
        d="M109 128 V112 H112 V94 H113 V63.5"
        fill="none"
        stroke={c.outline}
        strokeWidth={outlineWidth}
      />
      <path
        d="M109 128 V112 H112 V94 H113 V66.5"
        fill="none"
        stroke={fur}
        strokeWidth={furWidth}
      />
      {bands.map((y) => (
        <rect
          key={y}
          x={centre(y) - furWidth / 2}
          y={y}
          width={furWidth}
          height={4}
          fill={bandColor}
        />
      ))}
      {tip && (
        <rect x={113 - furWidth / 2} y={66.5} width={furWidth} height={4.5} fill={tip} />
      )}
    </g>
  );
}

/* ------------------------------- Paws ------------------------------- */

const PAW_CENTERS = [38, 82] as const;

export interface PawStyle {
  mitten: string;
  mittenShade: string;
  toe: string;
  bean: string;
  /** Fur cuff colour for the left and right paw. */
  cuffs: readonly [string, string];
}

export function Paws({ c, style }: { c: CatPalette; style: PawStyle }) {
  return (
    <g className="jp-pet-paws">
      {PAW_CENTERS.map((x, i) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <Paw c={c} style={style} cuff={style.cuffs[i]} />
        </g>
      ))}
    </g>
  );
}

/**
 * One small paw, centred on x=0: a short cuff into a mitten with three toes.
 * It hangs 5 units below the ledge line (y=116), so it looks draped over it.
 */
function Paw({ c, style, cuff }: { c: CatPalette; style: PawStyle; cuff: string }) {
  return (
    <>
      <path
        d="M-8 102 H8 V105 H10 V108 H11 V118 H9 V121 H-9 V118 H-11 V108 H-10 V105 H-8 Z"
        fill={c.outline}
      />
      <path d="M-7 104 H7 V108 H9 V109 H-9 V108 H-7 Z" fill={cuff} />
      <path d="M-9 108 H9 V118 H-9 Z" fill={style.mitten} />
      <path d="M-9 115 H9 V118 H-9 Z" fill={style.mittenShade} />
      <path d="M-4 111 H-2 V116 H-4 Z M2 111 H4 V116 H2 Z" fill={style.toe} />
      <path
        d="M-7 112 H-5 V114 H-7 Z M-1 112 H1 V114 H-1 Z M5 112 H7 V114 H5 Z"
        fill={style.bean}
      />
      {/* Contact shadow on the ledge face below the paw. */}
      <path d="M-9 121 H9 V123 H-9 Z" fill="#000" opacity=".28" />
    </>
  );
}

/* ------------------------------- Face ------------------------------- */

/** Eyes for the sleeping and happy moods (same on every breed). */
export function MoodEyes({ mood, c }: { mood: PixelPetMood; c: CatPalette }) {
  if (mood === "sleeping") {
    return (
      <>
        <path d="M28 52 Q36 60 44 52" stroke={c.outline} strokeWidth="3" fill="none" />
        <path d="M76 52 Q84 60 92 52" stroke={c.outline} strokeWidth="3" fill="none" />
      </>
    );
  }
  return (
    <>
      <path d="M28 56 Q36 45 44 56" stroke={c.outline} strokeWidth="3.5" fill="none" />
      <path d="M76 56 Q84 45 92 56" stroke={c.outline} strokeWidth="3.5" fill="none" />
    </>
  );
}

export function Mouth({
  happy,
  c,
  line = c.outline,
}: {
  happy: boolean;
  c: CatPalette;
  line?: string;
}) {
  return happy ? (
    <>
      <path d="M54 66 H66 V68 H64 V71 H56 V68 H54 Z" fill={c.outline} />
      <rect x="57" y="69" width="6" height="2" fill={c.accent} />
    </>
  ) : (
    <path
      d="M60 64 V67 M60 67 Q56 70 53 67 M60 67 Q64 70 67 67"
      stroke={line}
      strokeWidth="1.8"
      fill="none"
    />
  );
}

export function Whiskers({ short = false }: { short?: boolean }) {
  return (
    <g stroke="#c9cfdd" strokeWidth="1.5" fill="none">
      {short ? (
        <>
          <path d="M24 62 L10 59 M24 66 L9 66 M24 70 L10 73" />
          <path d="M96 62 L110 59 M96 66 L111 66 M96 70 L110 73" />
        </>
      ) : (
        <>
          <path d="M24 62 L4 58 M24 66 L5 66 M24 70 L6 74" />
          <path d="M96 62 L116 58 M96 66 L115 66 M96 70 L114 74" />
        </>
      )}
    </g>
  );
}

/** A "Z" built from a 5x5 pixel grid. */
function PixelZ({ x, y, cell }: { x: number; y: number; cell: number }) {
  const rows = ["11111", "00010", "00100", "01000", "11111"];
  return (
    <g>
      {rows.flatMap((row, r) =>
        [...row].map((on, col) =>
          on === "1" ? (
            <rect
              key={`${r}-${col}`}
              x={x + col * cell}
              y={y + r * cell}
              width={cell}
              height={cell}
            />
          ) : null,
        ),
      )}
    </g>
  );
}

export function Zzz({ big = [97, 9], small = [110, 0] }: { big?: Pt; small?: Pt }) {
  return (
    <g className="jp-pet-zzz" fill="#a6b4ff">
      <PixelZ x={big[0]} y={big[1]} cell={2.4} />
      <PixelZ x={small[0]} y={small[1]} cell={1.6} />
    </g>
  );
}
