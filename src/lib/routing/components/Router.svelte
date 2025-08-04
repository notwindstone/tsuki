<!--
  @component Renders the current route component.
-->
<script lang="ts">
  import { fade } from "svelte/transition";
  import routerState from "../logic/state.svelte";
  import type { RouterConfiguration } from "@/lib/routing/logic/router-configuration.type";
  import type { Component } from "svelte";
  import type { LazyComponent } from "@/lib/routing";
  import Loading from "@/pages/Loading.svelte";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { RouteArray } from "@/constants/routes";
  import { getContext } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";
  import type { ScreenType } from "@/types/Screen.type";

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

  const { setCurrentRoutePathname, setCurrentRouteStatus } = getCurrentRouteState();
  const currentScreen = getContext(ScreenContextKey) as ScreenType;

  $effect(() => {
    setCurrentRouteStatus(true);

    currentComponentRenderer()
      .then((module: Record<"default", Component>) => {
        CurrentComponent = module.default;

        const pathname = "/" + routerState
          .getCurrentUrlPathParts()
          .join("/");

        for (const declaredPathname of RouteArray) {
          if (pathname === declaredPathname) {
            setCurrentRoutePathname(declaredPathname);
            setCurrentRouteStatus(false);
          }
        }
      });
  });
</script>

{#key CurrentComponent}
  <div
    class={[
      "absolute pb-20 sm:pl-24 w-full transition-[opacity,translate] duration-300 ease-out translate-z-0",
      currentScreen.state === undefined
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-16 max-h-[calc(100svh-144px)] overflow-y-hidden",
    ]}
    transition:fade={{ "duration": 150 }}
  >
    <CurrentComponent />
  </div>
{/key}
