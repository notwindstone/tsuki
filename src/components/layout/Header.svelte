<script lang="ts">
  import { getCurrentRouteState } from "@/states/route/route.svelte";

  const currentRouteState = getCurrentRouteState().currentRouteState;
</script>

<header class="fixed top-0 h-16 w-full sm:pl-24">
  <p class={`bg-red-${700} w-fit`}>
    {currentRouteState.current}
  </p>
  <p class="bg-red-500 w-fit">
    {currentRouteState.loading}
  </p>

  Header
</header>
