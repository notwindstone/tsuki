import { isPathParam, sanitizePath, serializeQueryParameters } from "./utils";
import type { LazyComponent } from "@/lib/routing/logic/lazy-component.type";
import type { RouterConfiguration } from "@/lib/routing/logic/router-configuration.type";
import type { QueryParams } from "@/lib/routing/logic/query-params.type";

class RouterState {
  /** Application base URL; no leading or trailing "/", no URL query parameters. */
  baseUrl = $state<string>("");

  /** Parts of the current path, without baseUrl. Won't include URL query parameters. */
  currentPathParts = $state<Array<string>>([]);

  /** User-defined routes. */
  userRoutes = $state<Array<{

    /** Parts of the path, without baseUrl. Won't include URL query parameters. */
    "pathParts": string[];

    /** Function which lazy-loads the component to be rendered. */
    "render": LazyComponent;
  }>>([]);

  /** Updates on pop states */
  popState = $state<number | undefined>();

  /** User route to be currently rendered, if any. */
  currentUserRoute = $derived(this.userRoutes.find(userRoute => {
    if (this.currentPathParts.length !== userRoute.pathParts.length) {
      return false;
    }

    for (let i = 0; i < this.currentPathParts.length; ++i) {
      if (isPathParam(userRoute.pathParts[i])) {
        continue;
      }

      if (this.currentPathParts[i] !== userRoute.pathParts[i]) {
        return false;
      }
    }

    return true;
  }));

  constructor() {
    // back or forward button
    window.onpopstate = () => {
      this.popState = Math.random();
      routerState.currentPathParts = routerState.getCurrentUrlPathParts();
    };
  }

  /** Initializes the router internal state with the user options. */
  init(conf: RouterConfiguration): void {
    if (conf.baseUrl !== undefined) {
      this.baseUrl = sanitizePath(conf.baseUrl);
    }

    this.currentPathParts = this.getCurrentUrlPathParts();
    this.userRoutes = conf.routes.map((userRoute, i) => {
      if (isPathParam(userRoute.path) && userRoute.path.length < 3) {
        throw new Error(`Path parameter ${i} cannot be empty.`);
      }

      return {
        "pathParts": sanitizePath(userRoute.path).split("/"),
        "render"   : userRoute.render,
      };
    });
  }

  /** Returns the current path parts without baseUrl, without URL query parameters. */
  getCurrentUrlPathParts(): Array<string> {
    const slashOff = this.baseUrl !== "" ? 1 : 0;

    return sanitizePath(window.location.pathname)
      .substring(this.baseUrl.length + slashOff)
      .split("/");
  }

  /** Generates a fully-qualified URL to the given path. */
  generateFullUrl(path: string, params?: QueryParams): string {
    const basePath = routerState.baseUrl !== ""
      ? "/" + routerState.baseUrl
      : "";

    return basePath + "/" + sanitizePath(path) + serializeQueryParameters(params);
  }

  /** Navigates to the given path. */
  navigate(path: string, queryParams?: QueryParams): void {
    const newPath = sanitizePath(path);
    const basePath = routerState.baseUrl !== ""
      ? "/" + routerState.baseUrl
      : "";

    history.pushState(
      null,
      "",
      basePath + "/" + newPath + serializeQueryParameters(queryParams),
    );

    this.currentPathParts = newPath.split("/");
  }

  /** Returns an object with the current URL path parameters, if any. */
  getPathParams(): Record<string, string> {
    const output: Record<string, string> = {};
    const currentParts = this.getCurrentUrlPathParts();
    const userRoute = this.currentUserRoute;

    if (userRoute !== undefined) {
      for (let i = 0; i < currentParts.length; ++i) {
        if (isPathParam(userRoute.pathParts[i])) {
          const parameterName = userRoute.pathParts[i];

          output[parameterName.substring(1, parameterName.length - 1)] = currentParts[i];
        }
      }
    }

    return output;
  }
}

/** Global router state. */
const routerState = new RouterState;

export default routerState;

/**
 * Returns an object with the current URL path parameters, if any.
 *
 * @example
 * // https://localhost:8080/person/{name}/with/{age}
 * const pathParams = {
 *   name: 'value at {name}',
 *   age: 'value at {age}',
 * };
 */
export function getPathParams(): Record<string, string> {
  return routerState.getPathParams();
}

/**
 * Programmatically, immediately navigates to the given path, which will trigger
 * the rendering of the new route component.
 *
 * You can pass, optionally, an object to be serialized as URL query parameters.
 */
export function navigate(path: string, queryParams?: QueryParams): void {
  routerState.navigate(path, queryParams);
}

export function getPopState() {
  return {
    get "currentPopState"() {
      return routerState.popState;
    },
  };
}
