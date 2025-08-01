import type { RouterConfiguration as RouterConfigurationType } from "@/lib/routing";

export const Routes = {
  "Library": "/",
  "Recents": "/recents",
  "Browse" : "/browse",
} as const;
export const RouteArray = Object.values(Routes);
export const RouteSet = new Set(RouteArray);
export const RouterConfiguration: RouterConfigurationType = {
  "routes": [
    {
      "path"  : Routes.Library,
      "render": () => import("@/pages/Home.svelte"),
    },
    {
      "path"  : Routes.Recents,
      "render": () => import("@/pages/Recents.svelte"),
    },
    {
      "path"  : Routes.Browse,
      "render": () => import("@/pages/Browse.svelte"),
    },
  ],
  "notFound": () => import("@/pages/NotFound.svelte"),
};
