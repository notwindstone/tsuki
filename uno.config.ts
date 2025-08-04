import { defineConfig, presetIcons, presetWind4, presetWebFonts } from "unocss";

export default defineConfig({
  "presets": [
    presetWebFonts({
      "provider": "google",
      "fonts"   : {
        "sans": "Google Sans",
        "mono": ["Fira Code", "Fira Mono:400,700"],
      },
    }),
    // Material Symbols with CSS
    presetIcons(),

    /*
     * presetWind3 requires Chrome 99+ (March 1, 2022)
     * presetWind4 requires Chrome 111+ (March 9, 2023)
     *
     * it sucks lol
     */
    presetWind4({
      "preflights": {
        // reset all default styles like tailwind does
        "reset": true,
      },
    }),
  ],
});
