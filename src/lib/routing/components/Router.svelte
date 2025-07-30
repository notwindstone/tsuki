<!--
  @component Renders the current route component.
-->
<script lang="ts">
  import routerState from "../logic/state.svelte";
  import type { RouterConfiguration } from "@/lib/routing/logic/router-configuration.type";
  import type { Component } from "svelte";
  import type { LazyComponent } from "@/lib/routing";
  import Loading from "@/pages/Loading.svelte";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { RouteArray } from "@/constants/routes";

  const props: {

    /**
     * Router configuration.
     */
    "routerConfiguration": RouterConfiguration;
  } = $props();

  routerState.init(props.routerConfiguration);

  /**
   * Lazy component's load function
   */
  let currentComponentRenderer: LazyComponent = $derived(
    routerState.currentUserRoute?.render ?? props.routerConfiguration.notFound,
  );

  /**
   * Lazy loaded component
   */
  let CurrentComponent: Component = $state(Loading);

  const { setCurrentRoutePathname } = getCurrentRouteState();

  $effect(() => {
    currentComponentRenderer()
      .then((module: Record<"default", Component>) => {
        CurrentComponent = module.default;

        const pathname = "/" + routerState
          .getCurrentUrlPathParts()
          .join("/");

        for (const declaredPathname of RouteArray) {
          if (pathname === declaredPathname) {
            setCurrentRoutePathname(declaredPathname);
          }
        }
      });
  });
</script>

<CurrentComponent />
