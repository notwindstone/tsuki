export type ExtensionsType = Record<string, {
  "timeToLoad": number;
  "status"    : "fetching" | "reading" | "loading" | "running" | "done";
}>;
