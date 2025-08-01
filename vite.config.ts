import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // handles "@/..." imports
  "resolve": {
    "alias": {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  "plugins": [
    svelte(),
    // uses unocss package
    UnoCSS(),
  ],
});
