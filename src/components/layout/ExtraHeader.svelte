<script lang="ts">
  import { getCurrentRouteState } from "@/states/route/route.svelte";

  const currentRouteState = getCurrentRouteState().currentRouteState;
</script>

<div class="pt-16">
  <p class={`bg-red-${700} w-fit`}>
    {currentRouteState.current}
  </p>
  <p class="bg-red-500 w-fit">
    {currentRouteState.loading}
  </p>

  sosal
</div>
