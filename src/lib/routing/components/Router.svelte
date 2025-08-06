<!--
  @component Renders the current route component.
-->
<script lang="ts">
  import { fade } from "svelte/transition";
  import routerState, { getRouteState } from "../logic/state.svelte";
  import type { RouterConfiguration } from "@/lib/routing/types/router-configuration.type";
  import type { Component } from "svelte";
  import type { LazyComponent } from "@/lib/routing";
  import Loading from "@/pages/Loading.svelte";

  const props: {

    /**
     * Router configuration.
     */
    "routerConfiguration": RouterConfiguration;
  } = $props();

  routerState.init(props.routerConfiguration);

  const routeAsState = getRouteState();
  const shoot = $derived(getRouteState().current);
  const setRouteStatus = routeAsState.setRouteStatus;

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

  $effect(() => {
    setRouteStatus(true);

    currentComponentRenderer()
      .then((module: Record<"default", Component>) => {
        setTimeout(() => {
          CurrentComponent = module.default;

          setRouteStatus(false);
        }, 1000);
      });
  });
</script>

<div>
  huh: {shoot}
</div>
<div>
  Current: {routeAsState.current}
</div>
<div>
  Loading: {routeAsState.loading}
</div>
{#key CurrentComponent}
  <div
    class={[
      "absolute pb-20 sm:pl-24 w-full duration-300 ease-out translate-z-0",
    ]}
    transition:fade={{ "duration": 150 }}
  >
    <CurrentComponent />
  </div>
{/key}
