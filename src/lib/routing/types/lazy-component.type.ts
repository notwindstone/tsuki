import type { Component } from "svelte";

/**
 * A lazy-loaded component.
 *
 * @example
 * const lazyComp = () => import('./home/MyHome.svelte');
 */
export type LazyComponent = () => Promise<{ "default": Component }>;
