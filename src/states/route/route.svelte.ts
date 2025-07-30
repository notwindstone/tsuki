import type { RouteType } from "./route.type";

let currentRouteState = $state.raw<RouteType>({
  "current": "/",
});

export function getCurrentRouteState() {
  function setCurrentRoutePathname(pathname: RouteType["current"]) {
    console.log(currentRouteState);
    currentRouteState = {
      "current": pathname,
    };
  }

  return {
    get "currentRouteState"() {
      return currentRouteState;
    },
    setCurrentRoutePathname,
  };
}
