<script lang="ts">
  import { cubicOut } from "svelte/easing";
  import slideFade from "@/lib/transitions/slide-fade";
  import { getContext } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";
  import type { ScreenType } from "@/types/Screen.type";

  const currentScreen = getContext(ScreenContextKey) as ScreenType;
</script>

{#if currentScreen.state !== undefined}
  <div class="z-500 relative overflow-x-hidden min-h-[calc(100svh-144px)]">
    <!-- calc(100%-144px) because header is 144px in height -->
    <div
      transition:slideFade={{
        "duration": 300,
        "easing"  : cubicOut,
      }}
      class="p-4 w-full h-full flex flex-col gap-4"
    >
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <div>hewwo</div>
      <button class="flex" onclick={() => {
        currentScreen.state = undefined;
      }}>
        Close
      </button>
    </div>
  </div>
{/if}
