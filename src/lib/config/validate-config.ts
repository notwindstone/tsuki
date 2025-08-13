import IsKeyInObject from "@/types/utils/is-key-in-object";
import type { ConfigType } from "@/types/config/config.type";
import { DefaultConfig } from "@/constants/app";

const numberConfigKeys: Array<keyof ConfigType> = [
  "transitionDuration",
  "chunkSize",
];
const booleanConfigKeys: Array<keyof ConfigType> = [
  "hideEpisodeImages",
  "transitions",
  "confirmation",
];

export function validateConfig(parsedConfig: unknown): ConfigType {
  const safeConfig: ConfigType = {
    ...DefaultConfig,
  };

  if (
    typeof parsedConfig !== "object" ||
    parsedConfig === null
  ) {
    return safeConfig;
  }

  // for fields that have a numeric values
  for (const numberConfigKey of numberConfigKeys) {
    // type guard
    if (!IsKeyInObject<typeof parsedConfig>(numberConfigKey, parsedConfig)) {
      continue;
    }

    const parsedConfigValue = parsedConfig[numberConfigKey];

    if (typeof parsedConfigValue !== "number") {
      continue;
    }

    safeConfig[numberConfigKey] = parsedConfigValue;
  }

  // for fields that have a boolean values
  for (const booleanConfigKey of booleanConfigKeys) {
    // type guard
    if (!IsKeyInObject<typeof parsedConfig>(booleanConfigKey, parsedConfig)) {
      continue;
    }

    const parsedConfigValue = parsedConfig[booleanConfigKey];

    if (typeof parsedConfigValue !== "boolean") {
      continue;
    }

    safeConfig[booleanConfigKey] = parsedConfigValue;
  }

  return safeConfig;
}
