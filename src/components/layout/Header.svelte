<script lang="ts">
  import { getCurrentRouteState } from "@/states/route/route.svelte";

  const currentRouteState = getCurrentRouteState().currentRouteState;
</script>

<header class="fixed top-0 flex flex-nowrap gap-4 bg-red w-full sm:pl-24">
  <button>

  </button>
</header>
<div>
  <p class={`bg-red-${700} w-fit`}>
    {currentRouteState.current}
  </p>
  <p class="bg-red-500 w-fit">
    {currentRouteState.loading}
  </p>

  sosal
</div>
