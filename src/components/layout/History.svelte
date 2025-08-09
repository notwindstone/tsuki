<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { HistoryLocalStorageKey } from "@/constants/app";
  import { fade } from "svelte/transition";
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

      // first elements will be the most recent
      return parsedHistory.reverse();
    },
  });
</script>

<div class="max-w-320 w-full flex flex-col gap-4 pt-8">
  <p class="text-center text-2xl font-medium leading-none">
    History
  </p>
  <p class="text-center leading-none opacity-70">
    Find anime titles that you have recently watched
  </p>
  <!-- we don't care about $history.isPending -->
  <!-- because localStorage blocks main thread -->
  {#if $history.data && $history.data.length > 0}
    <div transition:fade={{ "duration": 200 }}>
      <Pagination />
    </div>
  {:else if $history.data && $history.data.length <= 0}
    <div transition:fade={{ "duration": 200 }}>
      No history yet. Try watching some anime first
    </div>
  {/if}
</div>
