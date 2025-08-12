import { ConfigLocalStorageKey, DefaultConfig } from "@/constants/app";
import type { ConfigType } from "@/types/config/config.type";

export function initializeConfig() {
  const queriedConfig = localStorage?.getItem?.(ConfigLocalStorageKey);

  if (queriedConfig !== null) {
    return;
  }

  const modifiedDefaultConfig: ConfigType = {
    ...DefaultConfig,
    // respect user's prefers-reduced-motion settings
    "transitions": !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };

  localStorage?.setItem?.(ConfigLocalStorageKey, JSON.stringify(modifiedDefaultConfig));
}
