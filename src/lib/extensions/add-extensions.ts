import type { ManifestType } from "@/types/extensions/manifest.type";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import { getExtensions } from "@/lib/extensions/get-extensions";

export function addExtensions(newExtensions: Record<string, ManifestType>) {
  const extensions = getExtensions({
    "local": true,
  });

  localStorage?.setItem?.(ExtensionsLocalStorageKey, JSON.stringify({
    ...extensions,
    ...newExtensions,
  }));
}
