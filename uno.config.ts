import { defineConfig, presetWind4 } from "unocss";

export default defineConfig({
  "presets": [
    presetWind4({
      "preflights": {
        // reset all default styles like tailwind does
        "reset": true,
        // 48439
        "theme": true,
      },
    }),
  ],
});
