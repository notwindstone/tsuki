export type ManifestType = {
  // should be unique
  "id"       : string;
  "logo"     : string;
  "name"     : string;
  "url"      : string;
  "version"  : string;
  "authors"  : Array<string>;
  // use ISO 639-2 three-letter language codes
  "languages": Array<string>;

  /*
   * mal - uses MAL ID to get media (e.g. Anilibria API, Kodik)
   * non-mal - uses different method to get media (e.g. Consumet API)
   * cosmetic - changes app UI
   */
  "categories": Array<"mal" | "non-mal" | "cosmetic">;
} & Partial<{
  "description": string;
  // a list of routes that extension will use for its own pages
  "pages"      : Array<string>;
}>;
