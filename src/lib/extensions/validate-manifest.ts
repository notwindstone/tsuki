import type { ManifestType } from "@/types/extensions/manifest.type";
import IsKeyInObject from "@/types/utils/is-key-in-object";

const requiredStringManifestKeys: Array<keyof ManifestType> = [
  "id",
  "logo",
  "name",
  "url",
  "version",
];
const requiredArrayManifestKeys: Array<keyof ManifestType> = [
  "authors",
  "languages",
  "categories",
];

export function validateManifest(parsedManifest: unknown): ManifestType | false {
  if (
    typeof parsedManifest !== "object" ||
    parsedManifest === null
  ) {
    return false;
  }

  // will be overwritten
  const safeManifest: ManifestType = {
    "id"        : "",
    "logo"      : "",
    "name"      : "",
    "url"       : "",
    "version"   : "",
    "authors"   : [],
    "languages" : [],
    "categories": [],
  };

  for (const key of requiredStringManifestKeys) {
    if (!IsKeyInObject<typeof parsedManifest>(key, parsedManifest)) {
      return false;
    }

    if (typeof parsedManifest[key] !== "string") {
      return false;
    }

    safeManifest[key] = parsedManifest[key];
  }

  for (const key of requiredArrayManifestKeys) {
    if (!IsKeyInObject<typeof parsedManifest>(key, parsedManifest)) {
      return false;
    }

    if (!Array.isArray(parsedManifest[key])) {
      return false;
    }

    safeManifest[key] = parsedManifest[key];
  }

  if (
    "description" in parsedManifest &&
    typeof parsedManifest.description === "string"
  ) {
    safeManifest.description = parsedManifest.description;
  }

  if (
    "pages" in parsedManifest &&
    Array.isArray(parsedManifest.pages)
  ) {
    safeManifest.pages = parsedManifest.pages;
  }

  return safeManifest;
}
