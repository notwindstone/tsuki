import type { LazyComponent } from "@/lib/routing/types/lazy-component.type";

/**
 * Path and component to an application route. Path parameters are supported.
 *
 * @example
 * const routeA = {
 *   path: '/page1',
 *   render: () => import('./page1/Page1.svelte'),
 * };
 *
 * const routeB = {
 *   path: '/page2/{name}/and/{age}',
 *   render: () => import('./page2/Page2.svelte'),
 * };
 */
export interface Route {

  /**
   * URL path to match. Path parameters are supported.
   *
   * @example
   * path: '/page1'
   *
   * path: '/page2/{name}/and/{age}'
   */
  "path": string;

  /**
   * Function which lazy-loads the component to be rendered.
   *
   * @example
   * render: () => import('./page1/Page1.svelte')
   */
  "render": LazyComponent;
}
