<script lang="ts">
  import { ripple } from "svelte-ripple-action";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver.svelte";
  import type { RouteType } from "@/states/route/route.type";
  import { getContext } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";
  import type { ScreenType } from "@/types/Screen.type";

  const intersection = useIntersectionObserver({

    /*
     * Basically [0.5, 0.525, ..., 0.975, 1]
     * Ending at (<= 0.5) removes updates, when component is already hidden under fixed header
     *
     * Intersection Observer is optimized by default to update only when
     * browser can handle it, ignoring some of these thresholds on fast scrolls
     */
    "threshold": Array
      .from({ "length": 21 })
      .map((_, index) => (index + 20) / 40),
  });

  const currentRouteState = getCurrentRouteState().currentRouteState;
  const currentScreen = getContext(ScreenContextKey) as ScreenType;

  const _label: Record<RouteType["current"], string> = {
    "/"       : "Основные",
    "/recents": "Недавние",
    "/browse" : "Поисковик",
  };
</script>

<header
  class={[
    "z-1000 fixed top-0 flex flex-nowrap items-center gap-2 h-16 w-full pl-2 pr-2 opacity-100 transition-[background-color]",
    currentScreen.state === undefined
      ? "sm:pl-26"
      : "",
    (intersection.observed?.intersectionRatio ?? 1) <= 0.5
      ? "bg-zinc-950"
      : "bg-black",
  ]}
>
  <button
    aria-label="Go back"
    onclick={() => window.history.back()}
    class="relative shrink-0 cursor-pointer flex justify-center items-center p-2 rounded-full"
    use:ripple={{
      "color": "rgba(255, 255, 255, 0.06)",
    }}
  >
    <span class="i-material-symbols-arrow-back w-6 h-6"></span>
  </button>
  <p
    class={[
      "text-lg w-full leading-none transition-[opacity]",
      (intersection.observed?.intersectionRatio ?? 1) <= 0.7
        ? "opacity-100"
        : "opacity-0",
    ]}
  >
    {_label[currentRouteState.current]}
  </p>
  <button
    aria-label="More"
    onclick={() => alert("modal should be here")}
    class={[
      "relative shrink-0 cursor-pointer justify-center items-center p-2 rounded-full",
      currentRouteState.current === "/"
        ? "flex"
        : "none",
    ]}
    use:ripple={{
      "color": "rgba(255, 255, 255, 0.06)",
    }}
  >
    <span class="i-material-symbols-more-vert w-6 h-6"></span>
  </button>
</header>
<div
  bind:this={intersection.ref}
  class={[
    "pt-16 pl-4 h-36 flex flex-col justify-end overflow-y-hidden",
    currentScreen.state === undefined
      ? "sm:pl-28"
      : "",
  ]}
>
  <p
    class="text-3xl transition-[opacity]"
    style={`opacity: ${
      Math.max(
        ((intersection.observed?.intersectionRatio ?? 1) - 0.6) / 0.4,
        0,
      )
    };`}
  >
    {_label[currentRouteState.current]}
  </p>
</div>

