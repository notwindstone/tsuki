<script lang="ts">
  import { getQueryParams, Link } from "@/lib/routing";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { getCurrentSearchState } from "@/states/search/search.svelte";
  import type { SearchType } from "@/states/search/search.type";
  import type { AnimeEntryType } from "@/types/anime/anime-entry.type";

  // get the 'tanstack query' client
  const queryClient = useQueryClient();
  // get user's anime search state
  const searchState: SearchType = getCurrentSearchState().current;
  // get cached query data with user's search value (either returns data or 'undefined')
  const currentData: Array<AnimeEntryType> | undefined = queryClient.getQueryData(
    // we don't care about reactivity here
    ["anime", "anilist", "search", searchState.value],
  );
  // get current idMal from search params
  const idMal = getQueryParams()["idMal"];

  let foundAnime: AnimeEntryType | undefined;

  // currentData can be undefined
  if (currentData !== undefined) {
    foundAnime = currentData.find((entry: AnimeEntryType) => entry?.idMal?.toString?.() === idMal);
  }
</script>

<div class="flex flex-col gap-2">
  {JSON.stringify(foundAnime)}
  <Link href="/">
    home page
  </Link>
  <div id="extensions-root-id" class="relative h-128 w-full rounded-md"></div>
</div>
