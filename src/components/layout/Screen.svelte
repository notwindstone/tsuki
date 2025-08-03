<script lang="ts">
  import { getContext } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";

  const currentScreen = getContext(ScreenContextKey);
</script>

{#if currentScreen !== undefined}
  <div class="absolute inset-0 bg-red overflow-y-auto">
    hello
  </div>
{/if}
