<!--
  @component Renders the current route component.
-->
<script lang="ts">
  import { fade } from "svelte/transition";
  import routerState, { getRouteState } from "@/lib/routing/logic/state.svelte";
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

  const setRouteStatus = getRouteState().setRouteStatus;

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
        document.startViewTransition(() => {
          CurrentComponent = module.default;

          setRouteStatus(false);
        });
      });
  });
</script>

{#key CurrentComponent}
  <div
    class={[

      /*
       * absolute position so that fading pages will not shift each other.
       * new page will appear even if previous page is still fading away
       */
      "w-full",

      /*
       * old browsers, such as firefox 77, do not apply #tsuki element classnames to absolute children
       * so we copy those classnames here too... bruh
       */
      "text-black bg-white dark:text-white dark:bg-black",
    ]}
    
  >
    <CurrentComponent />
  </div>
{/key}
