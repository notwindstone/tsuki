import type { SettingsType } from "./settings.type";
import { getConfig } from "@/lib/config/get-config";

const currentConfig = getConfig();

let currentSettingsState = $state<SettingsType>({
  "transitions" : currentConfig.transitions,
  "confirmation": currentConfig.confirmation,
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
