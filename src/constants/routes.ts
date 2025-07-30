import type { RouterConf } from "svelte-mini-router";

export const Routes = {
  "Library": "/",

} as const;
export const RouteSet = new Set(Object.values(Routes));
export const RouterConfiguration: RouterConf = {
  "routes": [
    {
      "path"   : Routes.Library,
      "render" : () => import("@/pages/Home.svelte"),
    },
    {
      "path"   : Routes.Library,
      "render" : () => import("@/pages/Home.svelte"),
    },
  ],
  "render404": () => import("@/pages/NotFound.svelte"),
};
