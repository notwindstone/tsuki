<!--
  @component Renders the current route component.
-->
<script lang="ts">
  import routerState from "../logic/state.svelte";
  import type { LazyComponent, RouterConfiguration } from "../logic/types";

  const props: {

    /**
     * Router configuration.
     */
    "routerConfiguration": RouterConfiguration;
  } = $props();

  routerState.init(props.routerConfiguration);
</script>

{#if routerState.currentUserRoute === undefined}
  {#if props.routerConfiguration.notFound !== undefined}
    {@render asyncComponent(props.routerConfiguration.notFound)}
  {:else}
    404 - Not found
  {/if}
{:else}
  {@render asyncComponent(routerState.currentUserRoute.render)}
{/if}

{#snippet asyncComponent(renderLazyComponent: LazyComponent)}
  {#await renderLazyComponent()}
    {props.routerConfiguration.loadingText || "Loading..."}
  {:then { "default": UserComponent }}
    <UserComponent />
  {/await}
{/snippet}
