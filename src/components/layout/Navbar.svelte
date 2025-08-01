<script lang="ts">
  import { Link } from "@/lib/routing";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { NavigationButtons } from "@/constants/navigation";

  const currentRouteState = getCurrentRouteState().currentRouteState;
</script>

<nav class="fixed bottom-0 h-18 w-full flex flex-nowrap bg-zinc-950">
  {#each NavigationButtons as { Label, Path, Icon } (Path)}
    <Link
      path={Path}
      class={[
        "group h-full flex flex-col gap-2 justify-center items-center flex-1",
        currentRouteState.current === Path
          ? "text-white fill-white"
          : "text-[theme(colors.white/.7)] fill-[theme(colors.white/.7)]",
      ]}
    >
      <div class={[
        "relative flex justify-center h-8 rounded-full duration-200 transition-[width,background-color] group-hover:before:bg-[theme(colors.white/.025)] group-active:before:bg-[theme(colors.white/.025)] before:w-18 before:h-full before:rounded-full before:absolute before:content-empty",
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
