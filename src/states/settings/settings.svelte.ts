import { getConfig } from "@/lib/config/get-config";
import type { ConfigType } from "@/types/config/config.type";

const currentConfig: ConfigType = getConfig();
let currentSettingsState = $state.raw<ConfigType>({
  ...currentConfig,
});

export function getCurrentSettingsState() {
  function setSettings(
    key  : keyof ConfigType,
    value: ConfigType[typeof key],
  ) {
    // the only way to assign these key-value pairs to the settings state?
    const entries: Array<[keyof ConfigType, ConfigType[typeof key]]> = [
      [key, value],
    ];
    const newConfig: Partial<ConfigType> = Object.fromEntries(entries);

    currentSettingsState = {
      ...currentSettingsState,
      ...newConfig,
    };
  }

  return {
    get "current"() {
      return currentSettingsState;
    },
    setSettings,
  };
}
