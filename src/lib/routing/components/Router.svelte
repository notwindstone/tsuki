<!--
  @component Renders the current route component.
-->
<script lang="ts">
  import { fade } from "svelte/transition";
  import routerState, { getRouteState } from "@/lib/routing/logic/state.svelte";
  import type { RouterConfiguration } from "@/lib/routing/types/router-configuration.type";
  import type { Component } from "svelte";
  import type { LazyComponent } from "@/lib/routing";
  import { ApplicationName, TransitionDuration } from "@/constants/app";
  import { Routes } from "@/constants/routes";
  import Loading from "@/pages/Loading.svelte";
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";

  const settingsState = getCurrentSettingsState().current;
  const transitionDuration = $derived(settingsState.transitions ? TransitionDuration : 0);

  const props: {

    /**
     * Router configuration.
     */
    "routerConfiguration": RouterConfiguration;
  } = $props();

  routerState.init(props.routerConfiguration);

  const setRouteStatus = getRouteState().setRouteStatus;
  const derivedDocumentTitle = $derived.by(() => {
    const currentPath = getRouteState().current;
    const foundRoute = Object
      .entries(Routes)
      .find(([, value]) => {
        return value === currentPath;
      });

    if (!foundRoute) {
      return "unknown";
    }

    return foundRoute[0].toLowerCase();
  });

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
        CurrentComponent = module.default;

        // scroll to the top of the page if route has changed
        window.scrollTo(0, 0);
        setRouteStatus(false);
      });
  });
</script>

<svelte:head>
  <!-- if 'derivedDocumentTitle' is falsy (empty, undefined, etc.), show 'tsuki' -->
  <title>{derivedDocumentTitle || ApplicationName}</title>
</svelte:head>

{#key CurrentComponent}
  <div
    class={[

      /*
       * absolute position so that fading pages will not shift each other.
       * new page will appear even if previous page is still fading away
       */
      "absolute w-full",

      /*
       * old browsers, such as firefox 77, do not apply #tsuki element classnames to absolute children
       * so we copy those classnames here too... bruh
       */
      "bg-white text-black dark:bg-black dark:text-white",
    ]}
    transition:fade={{ "duration": transitionDuration }}
  >
    <CurrentComponent />
  </div>
{/key}
