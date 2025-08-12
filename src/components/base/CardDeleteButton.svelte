<script lang="ts">
  import { removeEntryFromHistory } from "@/lib/queries/remove-entry-from-history";
  // import { HistoryQueryKey } from "@/constants/app";

  let {
    entryDate,
  }: {
    "entryDate": string | undefined;
  } = $props();
</script>

<button
  aria-label="Delete this entry"
  onclick={(event: MouseEvent) => {
    // both of these callbacks are needed to prevent from triggering navigation
    event.preventDefault();
    event.stopPropagation();

    const toDelete = confirm("Do you really want to delete this history entry?");

    if (!toDelete || !entryDate) {
      return;
    }

    removeEntryFromHistory(entryDate);

    /*
     * refetch the watch history
     * i wanted to optimistically hide the card instead of refetching the whole history
     * but seems like even with ~4700 entries on mobile firefox it is re-calculated almost instantly...
     *
     * queryClient.refetchQueries({ "queryKey": HistoryQueryKey });
     */
  }}
  class="absolute right-0 top-[50%] z-15 h-10 w-10 flex translate-y-[-50%] items-center justify-center rounded-l-md bg-neutral-900 text-white opacity-30 transition-[opacity] dark:bg-neutral-100 dark:text-black hover:opacity-100"
>
  <span class="i-lucide-x block h-6 w-6"></span>
</button>
