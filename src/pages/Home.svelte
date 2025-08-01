<script lang="ts">
  import { getCurrentRouteState } from "@/states/route/route.svelte";

  const currentRouteState = getCurrentRouteState().currentRouteState;
</script>

<div>
  <p class={`bg-red-${700} w-fit`}>
    {currentRouteState.current}
  </p>
  <p class="bg-red-500 w-fit">
    {currentRouteState.loading}
  </p>

  <h1>Vite + Svelte</h1>
  <p style="opacity: 80%">runtime loading of remote components written in any JS framework lul</p>
  <p style="opacity: 40%">shared variables possible too :3</p>
</div>
