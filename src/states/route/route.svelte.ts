import type { RouteType } from "./route.type";

export const Route = $state<RouteType>({
    current: "",
    loading: false,
});
