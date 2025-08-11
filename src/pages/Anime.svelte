<script lang="ts">
  import { getQueryParams } from "@/lib/routing";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";
  import { getCurrentSearchState } from "@/states/search/search.svelte";
  import { fetchAnilistByIdMal } from "@/lib/queries/fetch-anilist-by-id-mal";
  import type { SearchType } from "@/states/search/search.type";
  import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
  import type { StatusType } from "@/types/anilist/status.type";
  import { NoImageURL } from "@/constants/app";

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

  const fetchedAnime = createQuery({

    /*
     * make an anilist fetch only if cache is empty.
     * for example, it can occur when user loads this anime page as a new page or reloads it
     */
    "enabled" : currentData === undefined,
    "queryKey": ["anime", "anilist", "idMal", idMal],
    "queryFn" : () => fetchAnilistByIdMal(idMal),
  });

  const title = $derived<string>(
    foundAnime?.title?.english ??
    foundAnime?.title?.romaji ??
    foundAnime?.title?.native ??
    $fetchedAnime?.data?.title?.english ??
    $fetchedAnime?.data?.title?.romaji ??
    $fetchedAnime?.data?.title?.native ??
    "unknown",
  );
  const coverImage = $derived<string>(
    foundAnime?.coverImage?.extraLarge ??
    $fetchedAnime?.data?.coverImage?.extraLarge ??
    NoImageURL,
  );
  const status = $derived<StatusType>(
    foundAnime?.status ??
    $fetchedAnime?.data?.status ??
    "NOT_YET_RELEASED",
  );
  const score = $derived<number>(
    foundAnime?.averageScore ??
    $fetchedAnime?.data?.averageScore ??
    0,
  );
  const episodes = $derived<number>(
    foundAnime?.episodes ??
    $fetchedAnime?.data?.episodes ??
    0,
  );
</script>

<div class="flex justify-center p-4">
  <div class="max-w-320 w-full">
    {title}
    {coverImage}
    {status}
    {score}
    {episodes}
  </div>
  <!-- div id="extensions-root-id" class="relative h-128 w-full rounded-md"></div -->
</div>
