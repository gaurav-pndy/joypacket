import { PixelPet } from "./components/PixelPet/PixelPet";
import type { PixelPetProps } from "./components/PixelPet/types";

/**
 * One ready-made component per pet:  import { PixelCat } from "joypacket/pets"
 * Each is a thin wrapper around <PixelPet pet="..." />, so they share
 * every prop (position, size, messages, variant, colors, ...).
 */
export function PixelCat(props: Omit<PixelPetProps<"cat">, "pet">) {
  return <PixelPet {...props} pet="cat" />;
}

export function PixelDog(props: Omit<PixelPetProps<"dog">, "pet">) {
  return <PixelPet {...props} pet="dog" />;
}

export function PixelBunny(props: Omit<PixelPetProps<"bunny">, "pet">) {
  return <PixelPet {...props} pet="bunny" />;
}

export function PixelFox(props: Omit<PixelPetProps<"fox">, "pet">) {
  return <PixelPet {...props} pet="fox" />;
}

export function PixelBear(props: Omit<PixelPetProps<"bear">, "pet">) {
  return <PixelPet {...props} pet="bear" />;
}

export type { PixelPetProps } from "./components/PixelPet/types";
