import { ConfigLocalStorageKey, DefaultConfig } from "@/constants/app";

export function initializeConfig() {
  const queriedConfig = localStorage?.getItem?.(ConfigLocalStorageKey);

  if (queriedConfig !== null) {
    return;
  }

  localStorage?.setItem?.(ConfigLocalStorageKey, JSON.stringify(DefaultConfig));
}
