import type { LazyComponent } from "@/lib/routing/types/lazy-component.type";
import type { Route } from "@/lib/routing/types/route.type";

/**
 * Router configuration.
 */
export interface RouterConfiguration {

  /**
   * Base URL, as defined in vite.config.ts.
   *
   * @example
   * baseUrl: '/my-application'
   */
  "baseUrl"?: string;

  /**
   * Application routes.
   */
  "routes": Route[];

  /**
   * Error 404 route.
   *
   * If not defined, a simple "404 - Not found" text will be displayed.
   *
   * @example
   * render404: () => import('./Error404.svelte')
   */
  "notFound": LazyComponent;
}
