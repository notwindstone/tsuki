<script lang="ts">
  import type { HistoryEntryType } from "@/types/history/history-entry.type";
  import { createQuery } from "@tanstack/svelte-query";
  import { ChunkSize, HistoryLocalStorageKey } from "@/constants/app";
  import { fade } from "svelte/transition";
  import { getHistoryEntryFromUnknown } from "@/lib/helpers/get-history-entry-from-unknown";
  import { divideListToChunks } from "@/lib/helpers/divide-list-to-chunks";
  import Pagination from "@/components/base/Pagination.svelte";

  const history = createQuery({
    "queryKey": ["anime", "history", "localStorage"],
    "queryFn" : () => {
      const historyString = localStorage?.getItem?.(HistoryLocalStorageKey) ?? "[]";

      let parsedHistory: Array<unknown>;

      // historyString can be literally anything, because user can change localStorage
      try {
        parsedHistory = JSON.parse(historyString);
      } catch (error) {
        console.error(error);

        parsedHistory = [];
      }

      /*
       * validation of 2000 entries (529 453 bytes) with every field being a random value
       * requires 8.5 milliseconds in dev mode on:
       *
       * Ryzen 3 3100
       * Chrome 139.0.7258.66 with 20x CPU slowdown (Chrome -> Performance tab)
       *
       * and 0.4 milliseconds without a CPU slowdown.
       */
      const shallowlyValidatedHistory: Array<HistoryEntryType>
        = parsedHistory.map((unknownEntry: unknown) => getHistoryEntryFromUnknown(unknownEntry));

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
        // pagination will show 36 anime cards on the page
        "chunkSize": ChunkSize,
      });

      return {
        // chunks of entries
        "entries": dividedEntries,
        // 'dividedEntries' is an object, not an array
        "size"   : Object.keys(dividedEntries).length,
      };
    },
  });
</script>

<div class="max-w-320 w-full flex flex-col gap-4 pt-8">
  <p class="text-center text-2xl font-medium leading-none">
    History
  </p>
  <p class="text-center leading-none opacity-80">
    Find anime titles that you have recently watched
  </p>
  <!-- we don't care about $history.isPending -->
  <!-- because localStorage blocks main thread -->
  {#if $history.data && $history.data.size > 0}
    <div class="w-full flex justify-center" transition:fade={{ "duration": 200 }}>
      <Pagination
        data={$history.data.entries}
        size={$history.data.size}
      />
    </div>
  {:else if $history.data && $history.data.size <= 0}
    <div class="text-center" transition:fade={{ "duration": 200 }}>
      No history yet. Try watching some anime first!
    </div>
  {/if}
</div>
