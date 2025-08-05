import { defineConfig, presetIcons, presetWebFonts, presetWind3 } from "unocss";

export default defineConfig({
  "presets": [

    /*
     * presetWind3 theoretically requires Chrome 99+ (March 1, 2022), but
     * can work with older browsers (tested on Chrome 88)
     * presetWind4 requires Chrome 111+ (March 9, 2023), otherwise colors won't work
     *
     * it sucks lol
     */
    presetWind3({
      "dark": "class",
    }),
    // Fetches Geist font from Google fonts
    presetWebFonts({
      "provider": "google",
      "fonts"   : {
        "sans": "Geist",
        "mono": ["Fira Code", "Fira Mono:400,700"],
      },
    }),
    // Lucide icons with CSS
    presetIcons(),
  ],
});
