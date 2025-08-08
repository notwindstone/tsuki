<script lang="ts">
  import { getRouteState } from "@/lib/routing/logic/state.svelte";

  const route = getRouteState();
</script>

<div class="fixed left-0 right-0 top-0 z-5000 h-1 overflow-x-clip">
  <div class={[
    // opacity will be overwritten by animation
    "absolute h-1 w-full bg-rose-500 opacity-0",
    route.loading && "animate-progress-bar",
  ]}></div>
</div>
