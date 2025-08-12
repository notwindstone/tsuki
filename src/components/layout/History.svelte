<script lang="ts">
  import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";
  import { HistoryLocalStorageKey, HistoryQueryKey } from "@/constants/app";
  import { fade } from "svelte/transition";
  import { getAnimeEntryFromUnknown } from "@/lib/helpers/get-anime-entry-from-unknown";
  import { divideListToChunks } from "@/lib/helpers/divide-list-to-chunks";
  import { getCurrentHistoryState } from "@/states/history/history.svelte";
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";
  import Pagination from "@/components/base/Pagination.svelte";
  import HistoryCard from "@/components/base/HistoryCard.svelte";

  const settingsState = getCurrentSettingsState().current;
  const transitionDuration = $derived(
    settingsState.transitions
      ? settingsState.transitionDuration
      : 0,
  );

  const historyState = getCurrentHistoryState().current;
  const page = $derived(historyState.page);

  // get the 'tanstack query' client
  const queryClient = useQueryClient();
  const history = createQuery({
    "queryKey": HistoryQueryKey,
    "queryFn" : () => {
      const historyString = localStorage?.getItem?.(HistoryLocalStorageKey) ?? "[]";

      let parsedHistory: unknown;

      // historyString can be literally anything, because user can change localStorage
      try {
        parsedHistory = JSON.parse(historyString);
      } catch (error) {
        console.error(error);

        parsedHistory = [];
      }

      // just as i said, history can be anything data
      const historyList: Array<unknown> = Array.isArray(parsedHistory)
        ? parsedHistory
        : [];

      /*
       * validation of 2000 entries (529 453 bytes) with every field being a random value
       * requires 8.5 milliseconds in dev mode on:
       *
       * Ryzen 3 3100
       * Chrome 139.0.7258.66 with 20x CPU slowdown (Chrome -> Performance tab)
       *
       * and 0.4 milliseconds without a CPU slowdown.
       */
      const shallowlyValidatedHistory: Array<AnimeEntryType>
        = historyList.map((unknownEntry: unknown) => getAnimeEntryFromUnknown(unknownEntry));

      /*
       * divide a list into chunks to make pagination faster
       *
       * same setup as above:
       * 5 milliseconds with 20x CPU slowdown,
       * 0.2 milliseconds without a CPU slowdown.
       */
      const dividedEntries = divideListToChunks({
        // first elements will be the most recent
        "list"     : shallowlyValidatedHistory.reverse(),
        // pagination will show 30 anime cards on the page
        "chunkSize": settingsState.chunkSize,
      });

      return {
        // chunks of entries
        "entries": dividedEntries,
        // 'dividedEntries' is an object, not an array
        "size"   : Object.keys(dividedEntries).length,
      };
    },
  });

  function refetchHistory() {
    queryClient.refetchQueries({ "queryKey": HistoryQueryKey });
  }
</script>

<div class="max-w-320 w-full flex flex-col gap-4 pt-8">
  <div class="flex flex-nowrap items-center justify-center gap-4">
    <p class="text-3xl font-medium leading-none">
      History
    </p>
    <button
      aria-label="Refetch history"
      class="h-9 w-9 flex items-center justify-center rounded-md bg-neutral-100 transition-[background-color] active:bg-white dark:bg-neutral-900 hover:bg-neutral-200 dark:active:bg-black dark:hover:bg-neutral-800"
      onclick={refetchHistory}
    >
      <span class="i-lucide-rotate-ccw block h-5 w-5"></span>
    </button>
  </div>
  <p class="text-center leading-none opacity-80">
    Find anime titles that you have recently watched
  </p>
  <!-- we don't care about $history.isPending -->
  <!-- because localStorage blocks main thread -->
  {#if $history.data && $history.data.size > 0}
    <div class="w-full flex flex-col items-center gap-4" transition:fade={{ "duration": transitionDuration }}>
      <Pagination
        size={$history.data.size}
      >
        <!-- 'entry.date' can be undefined, if that's the case, use index as a key -->
        {#each $history.data.entries[page - 1] as entry, index (entry?.date ?? `${page}-${index}`)}
          <HistoryCard entry={entry} />
        {/each}
      </Pagination>
    </div>
  {:else if $history.data && $history.data.size <= 0}
    <div class="text-center" transition:fade={{ "duration": transitionDuration }}>
      No history yet. Try watching some anime first!
    </div>
  {/if}
</div>
