<script lang="ts">
  import { Link } from "@/lib/routing";
  import { createQuery } from "@tanstack/svelte-query";
  import { searchAnilist } from "@/lib/queries/searchAnilist";
  import { GithubLink, HomePageLinks } from "@/constants/app";
  import { getCurrentSearchState } from "@/states/search/search.svelte";
  import { debounce } from "@/lib/helpers/debounce";
  import Search from "@/components/base/Search.svelte";
  import env from "@/constants/env-variables.json";
  import History from "@/components/layout/History.svelte";
  import Card from "@/components/base/Card.svelte";

  const searchState = getCurrentSearchState().current;

  let debounced = $state(searchState.value);
  const updateDebounced = debounce<string>((newValue: string) => debounced = newValue, 300);

  // trigger debounced value update
  $effect(() => updateDebounced(searchState.value));

  // that's a react-like way to make queries lol (aka "state have changed, lemme re-create this hook")
  const animes = $derived(
    createQuery({
      "queryKey": ["anime", "anilist", "search", debounced],
      "queryFn" : () => searchAnilist(debounced),
    }),
  );
</script>

<div class="flex flex-col items-center p-4">
  <div class="relative pb-8 pt-4">
    <span class="select-none text-6xl text-black font-600 dark:text-white">
      tsuki
    </span>
    <a
      class="absolute bottom-4 left-[50%] translate-x-[-50%] rounded-md bg-neutral-100 px-2 py-1 text-sm text-black opacity-80 transition-[opacity] dark:bg-neutral-900 dark:text-white hover:opacity-100"
      href={`${GithubLink}/commit/${env.GIT_COMMIT_HASH}`}
      target="_blank"
    >
      {env.GIT_COMMIT_HASH}
    </a>
  </div>
  <div class="flex flex-nowrap pb-2">
    {#each HomePageLinks as link (link.href)}
      <Link
        class="mx-1 flex flex-nowrap items-center rounded-md bg-neutral-100 px-2 py-1 transition-[background-color,opacity] focus:cursor-default dark:bg-neutral-900 hover:bg-neutral-200 focus:opacity-70 dark:hover:bg-neutral-800"
        href={link.href}
      >
        <div class={[
          "mr-2 h-4 w-4",
          // presetIcons() does not detect icon strings defined in other places lol
          link.href === "/settings"
            ? "i-lucide-settings"
            : "i-lucide-blocks",
        ]}></div>
        <div>
          {link.label}
        </div>
      </Link>
    {/each}
  </div>
  <Search
    classNames="max-w-144"
    placeholder="Search anime by name or MAL ID..."
  />
  {#if $animes.isPending}
    <div class="pt-4 text-center">
      Loading...
    </div>
  {:else if $animes.isError}
    <div class="pt-4 text-center">
      Error:
      <span class="underline underline-red-500 underline-wavy">
        {$animes?.error?.message}
      </span>
    </div>
  <!-- show only if 'data' exists and has some data -->
  {:else if $animes.data && $animes.data.length > 0}
    <div class="grid cols-2 max-w-320 w-full gap-2 pt-4 md:cols-5 sm:cols-3">
      {#each $animes.data as anime (anime.id)}
        <Card entry={anime} />
      {/each}
    </div>
  <!-- show that nothing was found only if search value is not empty -->
  {:else if debounced !== "" && $animes.data && $animes.data.length <= 0}
    <div class="max-w-320 w-full pt-4 text-center">
      No anime found
    </div>
  {/if}
  <History />
</div>
