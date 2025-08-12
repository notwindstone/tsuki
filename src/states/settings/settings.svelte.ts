import type { SettingsType } from "./settings.type";

let currentSettingsState = $state<SettingsType>({
  "transitions": !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

export function getCurrentSettingsState() {
  function setSettings(
    key  : keyof SettingsType,
    value: SettingsType[typeof key],
  ) {
    currentSettingsState[key] = value;
  }

  return {
    get "current"() {
      return currentSettingsState;
    },
    setSettings,
  };
}
