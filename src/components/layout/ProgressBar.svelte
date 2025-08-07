<script lang="ts">
  import { getRouteState } from "@/lib/routing/logic/state.svelte";

  const route = getRouteState();
</script>

<div class="z-5000 fixed top-0 left-0 right-0 h-1 overflow-x-clip">
  <div class={[
    // opacity will be overwritten by animation
    "absolute w-full h-1 bg-rose-500 opacity-0",
    route.loading && "animate-progress-bar",
  ]}></div>
</div>
