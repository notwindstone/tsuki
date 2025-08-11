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
  <!-- this layout was inspired by https://www.miruro.to/ -->
  <div class="max-w-320 w-full flex flex-col gap-4">
    <!-- player and episode selector will be on the same row on medium and larger screens -->
    <!-- and will be on the two different rows on small screens -->
    <div class="grid cols-1 rows-2 h-full w-full gap-4 md:cols-3 md:rows-1">
      <div
        id="extensions-root-id"
        class="aspect-media relative col-span-1 rounded-md bg-neutral-100 md:col-span-2 dark:bg-neutral-900"
      ></div>
      <div class="relative col-span-1">
        <!-- the only way to ensure that episode selector will not exceed player's height -->
        <div class="absolute bottom-0 left-0 right-0 top-0 flex flex-col rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
          <input
            type="text"
            class="w-full rounded-md bg-neutral-200 px-2 py-1 text-sm dark:bg-neutral-800 focus:outline-none placeholder-neutral-500"
            placeholder="Search episodes..."
          />
          <div class="mt-2 h-full overflow-y-auto">
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
            <div>asd</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 sm:flex-nowrap"></div>
  </div>
</div>
