import App from "./App.svelte";
import { mount } from "svelte";
import { ApplicationRootID } from "./constants/app";
import "virtual:uno.css";

/*
 * reset css styles like tailwind does it.
 * it also resets presetWebFonts() lol (we manually set it in globals.css)
 */
import "@unocss/reset/tailwind.css";
import "./globals.css";

const app = mount(App, {
  "target": document.getElementById(ApplicationRootID)!,
});

export default app;
