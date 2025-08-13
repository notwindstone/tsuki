import { ConfigLocalStorageKey } from "@/constants/app";
import type { ConfigType } from "@/types/config/config.type";

export function writeConfig(newConfig: ConfigType) {
  localStorage?.setItem?.(ConfigLocalStorageKey, JSON.stringify(newConfig));
}
