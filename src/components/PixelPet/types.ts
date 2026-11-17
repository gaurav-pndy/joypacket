import type { ComponentType } from "react";
import type {
  PixelPetName,
  PixelPetSlot,
  PixelPetVariant,
} from "./pets";

export type PixelPetPosition =
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "top-left"
  | "top-center"
  | "top-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom";

export type PixelPetMood = "idle" | "sleeping" | "happy" | "curious";

export type PixelPetProps<P extends PixelPetName = PixelPetName> = {
  /** Which character to show. Defaults to "cat". */
  pet?: P;
  /**
   * A curated look for the pet (coat colours and so on), e.g. "tuxedo".
   * Each pet has its own list; the first one is the default.
   */
  variant?: PixelPetVariant<P>;
  /**
   * Fine-tune a few base colours of the chosen variant, as #rgb / #rrggbb.
   * Shades and highlights are derived automatically. Which slots exist
   * depends on the pet (the cat has fur, belly, eyes and accent).
   */
  colors?: Partial<Record<PixelPetSlot<P>, string>>;
  /** Which screen edge (and where along it) the pet peeks from. */
  position?: PixelPetPosition;
  /** Pet width/height in px. */
  size?: number;
  /** Distance in px from the corner/centre along the edge. */
  offset?: number;
  /**
   * Ledge colour and thickness, used when the pet is rendered WITHOUT a
   * PixelPetProvider. Inside a provider, the provider's values win.
   */
  ledgeColor?: string;
  ledgeSize?: number;
  /**
   * What the pet says when clicked while awake (one is picked at random).
   * Replaces the pet's built-in lines. Pass [] for a silent pet.
   */
  messages?: string[];
  /** How long a message stays visible, in ms. Default 3500. */
  messageDuration?: number;
  /** Idle time in ms before the pet falls asleep. Pass null to never sleep. */
  sleepAfter?: number | null;
  className?: string;
  /** Called on every click, including the click that wakes the pet. */
  onInteract?: () => void;
};

/* ------------------------------------------------------------------ *
 *  Contract for adding a new pet (see pets/cat.tsx for a full example)
 * ------------------------------------------------------------------ */

/** Every colour a pet's art uses (base slots plus derived shades). */
export type PixelPetPalette = Record<string, string>;

export interface PixelPetArtProps {
  mood: PixelPetMood;
  /** Fully resolved colours, from the pet's `resolvePalette`. */
  palette: PixelPetPalette;
  /**
   * The pet is drawn in two layers so the ledge can sit between them:
   * "back" (body, hidden below the ledge) and "front" (paws on the lip).
   */
  layer: "back" | "front";
}

export interface PixelPetHitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PixelPetVariantDefinition<S extends string = string> {
  /** The art: a 120x120 canvas, ledge line at y = 116. See pets/contract.ts. */
  Art: ComponentType<PixelPetArtProps>;
  /** Default colours for this look, one per slot. */
  colors: Record<S, string>;
  /** Overrides the pet's default head hitbox, if this look's head differs. */
  hitbox?: PixelPetHitbox;
  /** Overrides the pet's default headroom. */
  headroom?: number;
}

export interface PixelPetDefinition<
  V extends string = string,
  S extends string = string,
> {
  /** Used in accessible labels, e.g. "pixel cat". */
  label: string;
  /** Default clickable area (the head), in canvas units. */
  hitbox: PixelPetHitbox;
  /** Default empty canvas units above the tallest point; the bubble sits there. */
  headroom: number;
  /** Built-in lines, used when the `messages` prop is not given. */
  messages: string[];
  /**
   * Curated looks. A variant is a different DRAWING (breed, species form,
   * pattern...), not just a recolour: each has its own `Art`. Colours are
   * only the defaults for that look and can be tweaked through `colors`.
   */
  variants: Record<V, PixelPetVariantDefinition<S>>;
  defaultVariant: V;
  /** Turns base slots (variant + user overrides) into the full palette. */
  resolvePalette(base: Record<S, string>): PixelPetPalette;
}
