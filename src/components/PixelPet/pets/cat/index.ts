import type { PixelPetDefinition } from "../../types";
import { CalicoArt } from "./calico";
import { FoldArt } from "./fold";
import { CAT_COLORS, resolveCatPalette } from "./palette";
import type { CatSlot, CatVariant } from "./palette";
import { SiameseArt } from "./siamese";
import { TabbyArt } from "./tabby";

export type { CatSlot, CatVariant } from "./palette";

const HEAD_HITBOX = { x: 14, y: 10, width: 92, height: 66 };

/**
 * The cat. Each variant is a different breed with its own drawing (head
 * shape, ears, markings, build, tail); the colours of each can be tweaked
 * through the shared slots (fur, belly, markings, eyes, accent).
 */
export const cat: PixelPetDefinition<CatVariant, CatSlot> = {
  label: "pixel cat",
  hitbox: HEAD_HITBOX,
  headroom: 10,
  messages: [
    "Hello there! 👋",
    "Nice to see you!",
    "Need a little break?",
    "Have a lovely day!",
    "Psst... you're awesome!",
    "Just hanging around. 🐈",
  ],
  defaultVariant: "tabby",
  variants: {
    tabby: { colors: CAT_COLORS.tabby, Art: TabbyArt },
    siamese: {
      colors: CAT_COLORS.siamese,
      Art: SiameseArt,
      hitbox: { x: 16, y: 6, width: 88, height: 72 },
      headroom: 6,
    },
    calico: { colors: CAT_COLORS.calico, Art: CalicoArt },
    fold: {
      colors: CAT_COLORS.fold,
      Art: FoldArt,
      hitbox: { x: 14, y: 14, width: 92, height: 64 },
      headroom: 14,
    },
  },
  resolvePalette: resolveCatPalette,
};
