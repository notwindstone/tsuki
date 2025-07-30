import type { RouterConfiguration as RouterConfigurationType } from "@/lib/routing";

export const Routes = {
  "Library": "/",
  "Recents": "/recents",
  "Browse" : "/browse",
} as const;
export const RouteSet = new Set(Object.values(Routes));
export const RouterConfiguration: RouterConfigurationType = {
  "routes": [
    {
      "path"  : Routes.Library,
      "render": () => import("@/pages/Home.svelte"),
    },
    {
      "path"  : Routes.Library,
      "render": () => import("@/pages/Home.svelte"),
    },
  ],
  "notFound": () => import("@/pages/NotFound.svelte"),
};
