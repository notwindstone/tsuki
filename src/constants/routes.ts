import type { RouterConfiguration as RouterConfigurationType } from "@/lib/routing";
import { BaseURL } from "@/constants/app";

export const Routes = {
  "Home"    : "/",
  "Anime"   : "/anime",
  "Settings": "/settings",
} as const;
export const RouteArray = Object.values(Routes);
export const RouteSet = new Set(RouteArray);
export const RouterConfiguration: RouterConfigurationType = {
  "baseUrl": BaseURL,
  "routes" : [
    {
      "path"  : Routes.Home,
      "render": () => import("@/pages/Home.svelte"),
    },
    {
      "path"  : Routes.Anime,
      "render": () => import("@/pages/Anime.svelte"),
    },
    {
      "path"  : Routes.Settings,
      "render": () => import("@/pages/Settings.svelte"),
    },
  ],
  "notFound": () => import("@/pages/NotFound.svelte"),
};
