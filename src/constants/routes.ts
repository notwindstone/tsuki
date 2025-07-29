import type { RouterConf } from "svelte-mini-router";

export const Routes = {
    Library: "/",

} as const;
export const RouteSet = new Set(Object.values(Routes));
export const RouterConfiguration: RouterConf = {
    routes: [
        {
            path: Routes.Home,
            render: () => import("@/pages/Home.svelte"),
        },
        {
            path: Routes.Library,
            render: () => import("./Shit.svelte"),
        },
    ],
    render404: () => import("@/pages/NotFound.svelte"),
};
