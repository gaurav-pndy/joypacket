import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import type { PixelPetPosition } from "./types";

export type PixelPetEdgeSide = "top" | "bottom" | "left" | "right";

export const DEFAULT_LEDGE_COLOR = "#687386";
/** Ledge thickness in px. Kept thin so it never draws attention on a site. */
export const DEFAULT_LEDGE_SIZE = 5;

interface PixelPetEdgeContextValue {
  register: (side: PixelPetEdgeSide) => () => void;
  ledgeSize: number;
}

function ledgeVars(color: string, size: number) {
  return {
    "--jp-pet-ledge-color": color,
    "--jp-pet-ledge-size": `${size}px`,
  } as CSSProperties;
}

const PixelPetEdgeContext = createContext<PixelPetEdgeContextValue | null>(null);

export function getEdgeSide(position: PixelPetPosition): PixelPetEdgeSide {
  if (position.startsWith("top-")) return "top";
  if (position.startsWith("bottom-")) return "bottom";
  if (position.startsWith("left-")) return "left";
  return "right";
}

export function usePixelPetEdge() {
  return useContext(PixelPetEdgeContext);
}

export function PixelPetProvider({
  children,
  ledgeColor = DEFAULT_LEDGE_COLOR,
  ledgeSize = DEFAULT_LEDGE_SIZE,
}: {
  children: ReactNode;
  /** CSS color used for the shared viewport ledge. */
  ledgeColor?: string;
  /** Ledge thickness in px. */
  ledgeSize?: number;
}) {
  const edgeStyle = ledgeVars(ledgeColor, ledgeSize);
  const [edges, setEdges] = useState<Record<PixelPetEdgeSide, number>>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  const register = useCallback((side: PixelPetEdgeSide) => {
    setEdges((current) => ({ ...current, [side]: current[side] + 1 }));

    let active = true;
    return () => {
      if (!active) return;
      active = false;
      setEdges((current) => ({
        ...current,
        [side]: Math.max(0, current[side] - 1),
      }));
    };
  }, []);

  const contextValue = useMemo(
    () => ({ register, ledgeSize }),
    [register, ledgeSize],
  );

  return (
    <PixelPetEdgeContext.Provider value={contextValue}>
      {children}
      {(Object.keys(edges) as PixelPetEdgeSide[]).map(
        (side) =>
          edges[side] > 0 && (
            <div
              key={side}
              className={`jp-pixel-pet-edge jp-pixel-pet-edge--${side}`}
              style={edgeStyle}
              aria-hidden="true"
            />
          ),
      )}
    </PixelPetEdgeContext.Provider>
  );
}

/** Used when PixelPet is mounted without a PixelPetProvider. */
export function PixelPetEdge({
  side,
  ledgeColor = DEFAULT_LEDGE_COLOR,
  ledgeSize = DEFAULT_LEDGE_SIZE,
}: {
  side: PixelPetEdgeSide;
  ledgeColor?: string;
  ledgeSize?: number;
}) {
  const edgeStyle = ledgeVars(ledgeColor, ledgeSize);
  return (
    <div
      className={`jp-pixel-pet-edge jp-pixel-pet-edge--${side}`}
      style={edgeStyle}
      aria-hidden="true"
    />
  );
}
