import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

// useLayoutEffect warns during server rendering, so fall back to useEffect.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Keep the speech bubble this far from the viewport edge. */
const BUBBLE_MARGIN = 10;

/** Pick the bubble accent: the pet's fur, unless it is too pale to see. */
function bubbleAccent(palette: PixelPetPalette): string {
  const fur = String(palette.fur ?? "");
  const hex = fur.replace("#", "");
  if (/^[0-9a-f]{3}$/i.test(hex) || /^[0-9a-f]{6}$/i.test(hex)) {
    const full = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    if (luminance < 0.78) return fur;
  }
  return String(palette.accent ?? "#e8899f");
}

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
  const bubbleRef = useRef<HTMLDivElement>(null);
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

  // Keep the bubble inside the viewport. It is centred on the pet, so near a
  // corner (or with a very long word) it would stick out; slide it back and
  // let CSS keep the little tail pointing at the pet.
  useIsoLayoutEffect(() => {
    const el = bubbleRef.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const alongY = position.startsWith("left") || position.startsWith("right");

    const fit = () => {
      const box = host.getBoundingClientRect();
      const view = document.documentElement;
      // Beside the pet there may be little horizontal room: shrink to fit.
      if (alongY) {
        const rect = el.getBoundingClientRect();
        const room = position.startsWith("left")
          ? view.clientWidth - BUBBLE_MARGIN - rect.left
          : rect.right - BUBBLE_MARGIN;
        el.style.maxWidth = `${Math.max(96, Math.min(240, Math.floor(room)))}px`;
      }
      const [start, size, limit] = alongY
        ? [box.top + box.height / 2 - el.offsetHeight / 2, el.offsetHeight, view.clientHeight]
        : [box.left + box.width / 2 - el.offsetWidth / 2, el.offsetWidth, view.clientWidth];
      const shift = Math.max(
        BUBBLE_MARGIN - start,
        Math.min(0, limit - BUBBLE_MARGIN - (start + size)),
      );
      el.style.setProperty("--jp-bubble-shift", `${Math.round(shift)}px`);
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [message, position, size, offset]);

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
    "--jp-bubble-accent": bubbleAccent(palette),
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
              : `Say hello to the ${definition.label}`
          }
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
        {/* Screen readers: a live region that exists before its text changes
            is announced reliably; the visual bubble is decorative. */}
        <div className="jp-pixel-pet__sr" role="status" aria-live="polite">
          {message}
        </div>
        {message && (
          <div
            ref={bubbleRef}
            className="jp-pixel-pet__bubble"
            aria-hidden="true"
          >
            {message}
            {/* Pixel-stair tail; CSS turns it towards the pet. */}
            <svg
              className="jp-pixel-pet__bubble-tail"
              viewBox="0 0 18 12"
              width="18"
              height="12"
              shapeRendering="crispEdges"
              aria-hidden="true"
            >
              <path className="jp-bubble-tail-ink" d="M0 0H18V4H15V8H12V12H6V8H3V4H0Z" />
              <path className="jp-bubble-tail-fill" d="M3 0H15V4H12V8H6V4H3Z" />
            </svg>
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
