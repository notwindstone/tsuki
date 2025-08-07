import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

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

    /*
     * Adds support for legacy browsers.
     * If you don't want to support them, remove this plugin
     * and "@vitejs/plugin-legacy" & "terser" packages
     */
    legacy({
      "targets": [
        // default @vitejs/plugin-legacy browserlist
        "edge>=79",
        "firefox>=67",
        "chrome>=64",
        "safari>=12",
        "chromeAndroid>=64",
        "iOS>=12",
      ],
      // add polyfills that weren't included in vite build
      "modernPolyfills": [
        // introduced in Chrome 85+ and Firefox 77+
        "esnext.string.replace-all",
      ],
    }),
  ],
});
