import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import {
  DEFAULT_LEDGE_SIZE,
  getEdgeSide,
  PixelPetEdge,
  usePixelPetEdge,
} from "./PixelPetEdge";
import { PETS } from "./pets";
import type { PixelPetName } from "./pets";
import { isHexColor } from "./pets/color";
import { PET_CANVAS } from "./pets/contract";
import type {
  PixelPetDefinition,
  PixelPetMood,
  PixelPetPalette,
  PixelPetProps,
} from "./types";

import "./PixelPet.css";

const pct = (units: number) => `${(units / PET_CANVAS) * 100}%`;

export function PixelPet<P extends PixelPetName = "cat">({
  pet = "cat" as P,
  variant,
  colors,
  position = "bottom-right",
  size = 100,
  offset = 24,
  ledgeColor,
  ledgeSize,
  messages,
  messageDuration = 3500,
  sleepAfter = 30000,
  className = "",
  onInteract,
}: PixelPetProps<P>) {
  const definition = (PETS[pet] ?? PETS.cat) as PixelPetDefinition;
  const variantName =
    variant && variant in definition.variants ? variant : definition.defaultVariant;
  const variantDef = definition.variants[variantName];
  const { Art } = variantDef;

  // Variant (curated look) + optional colour overrides -> full palette.
  const colorsKey = JSON.stringify(colors ?? {});
  const palette = useMemo<PixelPetPalette>(() => {
    const base = { ...definition.variants[variantName].colors };
    for (const [slot, value] of Object.entries(
      JSON.parse(colorsKey) as Record<string, unknown>,
    )) {
      if (slot in base && isHexColor(value)) base[slot] = value;
    }
    return definition.resolvePalette(base);
  }, [definition, variantName, colorsKey]);
  const lines = messages ?? definition.messages;

  const [mood, setMood] = useState<PixelPetMood>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const hovering = useRef(false);
  const edgeContext = usePixelPetEdge();
  const edgeSide = getEdgeSide(position);
  const effectiveLedgeSize =
    edgeContext?.ledgeSize ?? ledgeSize ?? DEFAULT_LEDGE_SIZE;

  useEffect(() => {
    if (!edgeContext) return;
    return edgeContext.register(edgeSide);
  }, [edgeContext, edgeSide]);

  // Fall asleep after a while of nothing happening.
  useEffect(() => {
    if (mood !== "idle" || sleepAfter === null) return;
    const timer = window.setTimeout(() => setMood("sleeping"), sleepAfter);
    return () => window.clearTimeout(timer);
  }, [mood, sleepAfter]);

  // The happy face is brief; go back to whatever the pointer is doing.
  useEffect(() => {
    if (mood !== "happy") return;
    const timer = window.setTimeout(
      () => setMood(hovering.current ? "curious" : "idle"),
      1200,
    );
    return () => window.clearTimeout(timer);
  }, [mood]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), messageDuration);
    return () => window.clearTimeout(timer);
  }, [message, messageDuration]);

  const handleClick = () => {
    onInteract?.();

    // A click on a sleeping pet only wakes it up.
    if (mood === "sleeping") {
      setMood("curious");
      return;
    }

    setMood("happy");
    if (lines.length > 0) {
      setMessage(lines[Math.floor(Math.random() * lines.length)]);
    }
  };

  const handlePointerEnter = () => {
    hovering.current = true;
    setMood((current) => (current === "sleeping" ? "sleeping" : "curious"));
  };

  const handlePointerLeave = () => {
    hovering.current = false;
    setMood((current) =>
      current === "sleeping" || current === "happy" ? current : "idle",
    );
  };

  const hitbox = variantDef.hitbox ?? definition.hitbox;
  const headroom = variantDef.headroom ?? definition.headroom;
  const petStyle = {
    "--jp-pet-size": `${size}px`,
    "--jp-pet-offset": `${offset}px`,
    "--jp-pet-ledge-size": `${effectiveLedgeSize}px`,
    "--jp-pet-headroom": headroom,
    "--jp-hit-x": pct(hitbox.x),
    "--jp-hit-y": pct(hitbox.y),
    "--jp-hit-w": pct(hitbox.width),
    "--jp-hit-h": pct(hitbox.height),
  } as CSSProperties;

  const layerClass = (layer: "back" | "front") =>
    [
      "jp-pixel-pet",
      `jp-pixel-pet--${layer}`,
      `jp-pixel-pet--${position}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <>
      {!edgeContext && (
        <PixelPetEdge
          side={edgeSide}
          ledgeColor={ledgeColor}
          ledgeSize={effectiveLedgeSize}
        />
      )}

      {/* Back layer: tail, body and head. It sits BELOW the ledge, so the
          ledge hides the lower part of the pet and it looks like it is
          standing behind it. The button covers the head only. */}
      <div
        className={layerClass("back")}
        style={petStyle}
        data-pet={pet}
        data-variant={variantName}
        data-mood={mood}
      >
        <Art mood={mood} layer="back" palette={palette} />
        <button
          type="button"
          className="jp-pixel-pet__button"
          onClick={handleClick}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          onFocus={handlePointerEnter}
          onBlur={handlePointerLeave}
          aria-label={
            mood === "sleeping"
              ? `Wake up the ${definition.label}`
              : `Interact with the ${definition.label}`
          }
          title="Say hello!"
        />
      </div>

      {/* Front layer: paws and the speech bubble. It sits ABOVE the ledge, so
          the paws rest on the lip. It never takes pointer events. */}
      <div
        className={layerClass("front")}
        style={petStyle}
        data-pet={pet}
        data-mood={mood}
      >
        <Art mood={mood} layer="front" palette={palette} />
        {message && (
          <div className="jp-pixel-pet__bubble" role="status" aria-live="polite">
            {message}
          </div>
        )}
      </div>
    </>
  );
}

export type {
  PixelPetProps,
  PixelPetPosition,
  PixelPetMood,
  PixelPetDefinition,
  PixelPetArtProps,
  PixelPetPalette,
} from "./types";
export { PIXEL_PET_NAMES, getPixelPetVariants } from "./pets";
export type { PixelPetName } from "./pets";
