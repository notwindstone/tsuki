import { ExtensionsLocalStorageKey } from "@/constants/app";
import { getExtensions } from "@/lib/extensions/get-extensions";

export function toggleExtension(key: string) {
  const extensions = getExtensions({
    "local": true,
  });

  // just to be safe
  if (!("enabled" in extensions[key])) {
    extensions[key].enabled = false;
  }

  extensions[key].enabled = !extensions[key].enabled;

  localStorage?.setItem?.(ExtensionsLocalStorageKey, JSON.stringify(extensions));
}
