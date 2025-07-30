<!--
  @component Renders the current route component.
-->
<script lang="ts">
  import routerState from "../logic/state.svelte";
  import type { RouterConfiguration } from "@/lib/routing/logic/router-configuration.type";
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
    currentComponentRenderer()
      .then(module => {
        CurrentComponent = module.default as Component;
      });
  });
</script>

<CurrentComponent />
