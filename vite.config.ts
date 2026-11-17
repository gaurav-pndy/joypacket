import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
    }),
  ],

  build: {
    lib: {
      entry: {
        index: resolve(root, "src/index.ts"),
        "pixel-pet": resolve(root, "src/pixel-pet.ts"),
        pets: resolve(root, "src/pets.tsx"),
        "wish-star": resolve(root, "src/wish-star.ts"),
      },
      formats: ["es"],
    },

    cssCodeSplit: false,

    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
