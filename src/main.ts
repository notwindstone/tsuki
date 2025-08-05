import App from "./App.svelte";
import { mount } from "svelte";
import { ApplicationRootID } from "./constants/app";
import "./globals.css";
import "virtual:uno.css";
// reset css styles like tailwind does it
import "@unocss/reset/tailwind.css";

const app = mount(App, {
  "target": document.getElementById(ApplicationRootID)!,
});

export default app;
