<script lang="ts">
  import { ripple } from "svelte-ripple-action";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver.svelte";

  const intersection = useIntersectionObserver({
    // (<= 0.5) doesn't update when hidden under fixed header
    "threshold": [0.5, 0.6, 0.7, 0.8, 0.9, 1],
  });

  const currentRouteState = getCurrentRouteState().currentRouteState;

  const _label = "Основные";
</script>

<header
  class={[
    "z-1000 fixed top-0 flex flex-nowrap items-center gap-2 h-16 w-full pl-2 sm:pl-26 opacity-100 transition-[background-color]",
    (intersection.observed?.intersectionRatio ?? 1) <= 0.5
      ? "bg-zinc-950"
      : "bg-black",
  ]}
>
  <button
    aria-label="Go back"
    onclick={() => window.history.back}
    class="relative shrink-0 cursor-pointer flex justify-center items-center p-2 rounded-full"
    use:ripple={{
      "color": "rgba(255, 255, 255, 0.06)",
    }}
  >
    <span class="i-material-symbols-arrow-back w-6 h-6"></span>
  </button>
  <p
    class={[
      "text-lg leading-none transition-[opacity]",
      (intersection.observed?.intersectionRatio ?? 1) <= 0.7
        ? "opacity-100"
        : "opacity-0",
    ]}
  >
    {_label}
  </p>
</header>
<div
  bind:this={intersection.ref}
  class="pt-16 pl-4 sm:pl-28 h-36 flex flex-col justify-end"
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
    {_label}
  </p>
</div>
<p class={`bg-red-${700} w-fit`}>
  {currentRouteState.current}
</p>
<p class="bg-red-500 w-fit">
  {currentRouteState.loading}
</p>

