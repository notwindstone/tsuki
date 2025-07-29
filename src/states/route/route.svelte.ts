import type { RouteType } from "./route.type";

export const RouteState = $state<RouteType>({
    current: "",
    loading: false,
});
