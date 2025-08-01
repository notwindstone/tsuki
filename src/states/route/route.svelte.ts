import type { RouteType } from "./route.type";

let currentRouteState = $state<RouteType>({
  "current": "/",
  "loading": true,
});

export function getCurrentRouteState() {
  function setCurrentRoutePathname(pathname: RouteType["current"]) {
    currentRouteState.current = pathname;
  }

  function setCurrentRouteStatus(status: RouteType["loading"]) {
    currentRouteState.loading = status;
  }

  return {
    get "currentRouteState"() {
      return currentRouteState;
    },
    setCurrentRoutePathname,
    setCurrentRouteStatus,
  };
}
