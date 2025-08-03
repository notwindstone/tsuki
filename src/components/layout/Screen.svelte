<script lang="ts">
  import { getContext } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";
  import { cubicOut } from "svelte/easing";
  import slideFade from "@/lib/transitions/slide-fade";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import type { ScreenType } from "@/types/Screen.type";
  import {getPathParams} from '@/lib/routing';

  const currentScreen = getContext(ScreenContextKey) as ScreenType;
  const searchParameters = new SvelteURLSearchParams(window.location.search);

  $effect(() => {
    console.log("huh", getPathParams());

    if (currentScreen.state === undefined) {
      searchParameters.delete("screen");
    } else {
      searchParameters.set("screen", currentScreen.state.screen);
    }

    const searchString = searchParameters.toString();

    if (searchString === "") {
      window.history.pushState({}, "", window.location.pathname);

      return;
    }

    window.history.pushState({}, "", `?${searchString}`);
  });
</script>

{#if currentScreen.state !== undefined}
  <div class="z-500 relative overflow-x-hidden min-h-[calc(100svh-144px)]">
    <!-- calc(100%-144px) because header is 144px in height -->
    <div
      transition:slideFade={{
        "duration": 300,
        "easing"  : cubicOut,
      }}
      class="p-4 absolute w-full h-full flex flex-col gap-4"
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
