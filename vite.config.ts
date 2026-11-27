import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

/**
 * Library mode emits the CSS as a separate file that nothing imports, so a
 * plain `import { PixelCat } from "joypacket/pets"` would be unstyled. This
 * appends a small, SSR-safe injector to the chunk that holds the components.
 * `joypacket/style.css` is still published for strict-CSP setups.
 */
function injectStyles(): Plugin {
  return {
    name: "joypacket-inject-styles",
    apply: "build",
    enforce: "post",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
      const cssAsset = Object.values(bundle).find(
        (file) => file.type === "asset" && file.fileName.endsWith(".css"),
      );
      if (!cssAsset || cssAsset.type !== "asset") return;
      const css = String(cssAsset.source);
      const snippet =
        `\n;(function(){if(typeof document==="undefined"||document.getElementById("joypacket-styles"))return;` +
        `var s=document.createElement("style");s.id="joypacket-styles";` +
        `s.textContent=${JSON.stringify(css)};document.head.appendChild(s);})();\n`;
      for (const file of Object.values(bundle)) {
        if (
          file.type === "chunk" &&
          Object.keys(file.modules).some((id) => id.endsWith("PixelPet.tsx"))
        ) {
          file.code += snippet;
        }
      }
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    injectStyles(),
    dts({
      include: ["src"],
      // WishStar is not part of the published package yet.
      exclude: ["src/wish-star.ts", "src/components/WishStar/**"],
      insertTypesEntry: true,
    }),
  ],

  build: {
    lib: {
      entry: {
        index: resolve(root, "src/index.ts"),
        "pixel-pet": resolve(root, "src/pixel-pet.ts"),
        pets: resolve(root, "src/pets.tsx"),
      },
      formats: ["es"],
    },

    cssCodeSplit: false,

    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      // The components use hooks and browser APIs: mark every file as a
      // client module so Next.js (App Router) accepts them from server files.
      output: { banner: '"use client";' },
    },
  },

  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
