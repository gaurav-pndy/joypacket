import type { PixelPetDefinition } from "../types";
import { cat } from "./cat";
import { bear } from "./bear";
import { bunny } from "./bunny";
import { dog } from "./dog";
import { fox } from "./fox";

/** Register new pets here, then they can be used as <PixelPet pet="name" />. */
export const PETS = {
  cat,
  dog,
  bunny,
  fox,
  bear,
} satisfies Record<string, PixelPetDefinition<any, any>>;

export type PixelPetName = keyof typeof PETS;

/** Variant names for a pet, e.g. PixelPetVariant<"cat"> = "tabby" | "siamese" | ... */
export type PixelPetVariant<P extends PixelPetName = PixelPetName> =
  P extends PixelPetName ? keyof (typeof PETS)[P]["variants"] & string : never;

/** Overridable colour slots for a pet, e.g. "fur" | "belly" | "markings" | ... */
export type PixelPetSlot<P extends PixelPetName = PixelPetName> =
  P extends PixelPetName
    ? (typeof PETS)[P] extends PixelPetDefinition<any, infer S>
      ? S
      : never
    : never;

export const PIXEL_PET_NAMES = Object.keys(PETS) as PixelPetName[];

export function getPixelPetVariants<P extends PixelPetName>(pet: P) {
  return Object.keys(PETS[pet].variants) as PixelPetVariant<P>[];
}
