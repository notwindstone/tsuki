<script lang="ts">
  import { Link } from "@/lib/routing";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { NavigationButtons } from "@/constants/navigation";

  const currentRouteState = getCurrentRouteState().currentRouteState;
</script>

<nav class="fixed bottom-0 h-20 w-full flex flex-nowrap bg-sky-950">
  {#each NavigationButtons as { Label, Path, Icon } (Path)}
    <Link
      path={Path}
      class={["h-full flex flex-col gap-2 justify-center items-center flex-1"]}
    >
      <div class="flex justify-center w-18 h-8 py-1 bg-sky-900 rounded-full">
        <Icon active={currentRouteState.current === Path} />
      </div>
      <p class="select-none text-center leading-none">
        {Label}
      </p>
    </Link>
  {/each}
</nav>
