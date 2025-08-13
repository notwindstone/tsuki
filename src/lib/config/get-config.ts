import type { ConfigType } from "@/types/config/config.type";
import { ConfigLocalStorageKey, DefaultConfig } from "@/constants/app";
import { validateConfig } from "@/lib/config/validate-config";

export function getConfig(): ConfigType {
  const queriedConfig: string | null = localStorage?.getItem?.(ConfigLocalStorageKey);

  if (!queriedConfig) {
    return DefaultConfig;
  }

  let parsedConfig: unknown;

  try {
    parsedConfig = JSON.parse(queriedConfig);
  } catch (error) {
    console.error(error);

    parsedConfig = {};
  }

  return validateConfig(parsedConfig);
}
