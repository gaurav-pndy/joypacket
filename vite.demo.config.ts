import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Builds the demo page as a static site (GitHub Pages, Vercel, Netlify...).
 * `DEMO_BASE` is the URL path the site is served from, e.g. "/joypacket/"
 * for https://<user>.github.io/joypacket/. Relative by default.
 */
export default defineConfig({
  base: process.env.DEMO_BASE ?? "./",
  plugins: [react()],
  build: { outDir: "dist-demo", emptyOutDir: true },
});
