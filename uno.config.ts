import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetWind3,
} from "unocss";
// eslint-disable-next-line
// @ts-ignore - "esModuleInterop" and "allowSyntheticDefaultImports" don't affect it somehow
import presetLegacyCompat from "@unocss/preset-legacy-compat";

export default defineConfig({
  "presets": [

    /*
     * presetWind4 requires Chrome 111+ (March 9, 2023), otherwise colors won't work
     *
     * it sucks lol (presetLegacyCompat can't convert oklch() colors)
     */
    presetWind3({
      "dark": "class",
    }),

    /*
     * Fetches Geist font from Google fonts.
     * Unfortunately, Tailwind reset styles override web fonts
     * So we need to manually specify Geist in globals.css
     */
    presetWebFonts({
      "provider": "google",
      "fonts"   : {
        "sans": "Geist",
      },
    }),
    // Lucide icons with CSS (@iconify-json/lucide)
    presetIcons(),
    presetLegacyCompat({
      // Old browsers don't support space styled color functions (i.e. rgb(255 255 255))
      "commaStyleColorFunction": true,
    }),
  ],
});
