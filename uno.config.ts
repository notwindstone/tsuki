import { defineConfig, presetWind4 } from "unocss";

export default defineConfig({
  "presets": [

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
