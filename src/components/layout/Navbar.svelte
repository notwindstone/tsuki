<script lang="ts">
  import { Link } from "@/lib/routing";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { NavigationButtons } from "@/constants/navigation";
  import { getContext } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";
  import type { ScreenType } from "@/types/Screen.type";

  const currentRouteState = getCurrentRouteState().currentRouteState;
  const currentScreen = getContext(ScreenContextKey) as ScreenType;
</script>

<nav
  class={[
    "z-1000 fixed bottom-0 h-20 w-full flex flex-nowrap bg-zinc-950 sm:left-0 sm:top-0 sm:w-24 sm:h-full sm:flex-col sm:justify-start sm:pt-8 sm:gap-8 transition-[opacity,translate] duration-300 ease-out translate-z-0",
    currentScreen.state === undefined
      ? "opacity-100 translate-x-0"
      // pointer-events-none so that we can actually click something behind closed navbar
      : "opacity-0 -translate-x-16 pointer-events-none",
  ]}
>
  {#each NavigationButtons as { Label, Path, Icon } (Path)}
    <Link
      path={Path}
      class={[
        "group h-full flex flex-col gap-2 justify-center items-center flex-1 sm:flex-none sm:h-fit",
        currentRouteState.current === Path
          ? "text-white fill-white"
          : "text-[theme(colors.white/.7)] fill-[theme(colors.white/.7)]",
      ]}
    >
      <div class={[
        "relative flex justify-center h-8 rounded-full duration-200 transition-[width,background-color] group-hover:before:bg-[theme(colors.white/.02)] group-active:before:bg-[theme(colors.white/.02)] before:w-18 before:h-full before:rounded-full before:absolute before:content-empty",
        currentRouteState.current === Path
          ? "w-18 bg-zinc-900"
          : "w-8",
      ]}>
        <Icon active={currentRouteState.current === Path} />
      </div>
      <p class={[
        "select-none text-center leading-none text-sm duration-200 transition-[color]",
      ]}>
        {Label}
      </p>
    </Link>
  {/each}
</nav>
