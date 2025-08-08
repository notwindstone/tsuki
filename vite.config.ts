import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";
import path from "path";
import legacy from "@vitejs/plugin-legacy";
import { BaseURL } from "./src/constants/app.ts";

// https://vite.dev/config/
export default defineConfig({
  "base"  : BaseURL,
  "server": {
    // expose to the network
    "host": true,
  },
  "preview": {
    // allow any origins in preview mode ("vite preview")
    "allowedHosts": true,
  },
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

        /*
         * 'AbortController' requires Chrome 66+
         * default value: "chrome>=64"
         */
        "chrome>=66",
        "safari>=12",

        /*
         * 'AbortController' requires Chrome 66+
         * default value: "chromeAndroid>=64"
         */
        "chromeAndroid>=66",
        "iOS>=12",
      ],
      // add polyfills that weren't included in vite build
      "modernPolyfills": [
        "web.queue-microtask",
        "es/global-this",
        // introduced in Chrome 85+ and Firefox 77+
        "esnext.string.replace-all",
      ],
    }),
  ],
});
