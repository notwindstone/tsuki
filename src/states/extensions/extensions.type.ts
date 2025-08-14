type Statuses = "fetching" | "reading" | "initializing" | "executing" | "done" | "error";

// keys here are extension unique ids. each plugin has its own data
export type ExtensionsType = Record<string, {
  // time to pass each step
  "time"  : Record<Exclude<Statuses, "done" | "error">, number | undefined>;
  // current extension step
  "status": Statuses;
}>;
