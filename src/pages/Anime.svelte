<script lang="ts">
  import type { SearchType } from "@/states/search/search.type";
  import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
  import type { StatusType } from "@/types/anilist/status.type";
  import { getQueryParams } from "@/lib/routing";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";
  import { getCurrentSearchState } from "@/states/search/search.svelte";
  import { fetchAnilistByIdMal } from "@/lib/queries/fetch-anilist-by-id-mal";
  import { NoImageURL } from "@/constants/app";
  import EpisodeSelector from "@/components/misc/EpisodeSelector.svelte";

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
  const episodes = $derived.by<Array<{
    "url"        : string;
    "title"      : string;
    "thumbnail"  : string;
    "description": string;
  }>>(() => {
    const episodesCount = foundAnime?.episodes ?? $fetchedAnime?.data?.episodes ?? 0;
    const streamingEpisodes = foundAnime?.streamingEpisodes ?? $fetchedAnime?.data?.streamingEpisodes ?? [];

    /*
     * 'streamingEpisodes' often contains nothing or not full list
     * that's why we are filling an array from episodes count and override them with data from 'streamingEpisodes'
     */
    return Array
      .from({ "length": episodesCount })
      .map((_, index) => {
        const correspondingStreamingEpisode = streamingEpisodes?.[index];
        const initialEpisodeData = {
          "url"        : "",
          "title"      : `Episode ${index + 1}`,
          "thumbnail"  : coverImage,
          "description": "",
        };

        if (correspondingStreamingEpisode?.title === undefined) {
          return initialEpisodeData;
        }

        // 'title' format: 'Episode {NUMBER} - {DESCRIPTION}'
        const extractedDescription =
          (correspondingStreamingEpisode?.title ?? "")
            .replace(/Episode \d+ - /, "");

        return {
          "url"        : correspondingStreamingEpisode?.url ?? "",
          "title"      : initialEpisodeData.title,
          "thumbnail"  : correspondingStreamingEpisode?.thumbnail ?? coverImage,
          "description": extractedDescription,
        };
      });
  });

  let toHideImages = $state<boolean>(true);
  let selectedEpisode = $state<number>(1);
</script>

<div class="flex justify-center p-4">
  <!-- this layout was inspired by https://www.miruro.to/ -->
  <div class="max-w-320 w-full flex flex-col gap-4">
    <!-- player and episode selector will be on the same row on large screens -->
    <!-- and will be on the two different rows on smaller screens -->
    <div class="grid cols-1 rows-3 h-full w-full gap-4 lg:cols-3 lg:rows-1 sm:rows-2">
      <!-- all player extensions will mount on this element -->
      <div
        id="extensions-player-id"
        class="aspect-media relative col-span-1 rounded-md bg-neutral-100 lg:col-span-2 dark:bg-neutral-900"
      ></div>
      <div class="relative col-span-1 row-span-2 sm:row-span-1">
        <!-- the only way to ensure that episode selector will not exceed player's height -->
        <div class="absolute bottom-0 left-0 right-0 top-0 flex flex-col rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
          <div class="flex flex-nowrap gap-2">
            <input
              type="text"
              class="w-full rounded-md bg-neutral-200 px-3 py-2 text-sm dark:bg-neutral-800 focus:outline-none placeholder-neutral-500"
              placeholder="Search episodes..."
            />
            <button
              aria-label="Change episode selector format"
              onclick={() => toHideImages = !toHideImages}
              class="h-9 w-9 flex shrink-0 items-center justify-center rounded-md bg-neutral-200 transition-[background-color] dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            >
              <span class={[
                "block h-5 w-5",
                toHideImages
                  ? "i-lucide-eye-closed"
                  : "i-lucide-eye",
              ]}></span>
            </button>
          </div>
          <EpisodeSelector
            episodes={episodes}
            setEpisode={newEpisode => selectedEpisode = newEpisode}
            toHideImages={toHideImages}
            selectedEpisode={selectedEpisode}
          />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 lg:flex-nowrap"></div>
  </div>
</div>
