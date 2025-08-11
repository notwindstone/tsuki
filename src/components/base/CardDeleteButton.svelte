<script lang="ts">
  import { removeEntryFromHistory } from "@/lib/queries/remove-entry-from-history";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { HistoryQueryKey } from "@/constants/app";

  const queryClient = useQueryClient();
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
     * TODO: optimistically hide this card instead of refetching the whole history
     */
    queryClient.refetchQueries({ "queryKey": HistoryQueryKey });
  }}
  class="absolute right-0 top-[50%] z-15 h-10 w-10 flex translate-y-[-50%] items-center justify-center rounded-l-md bg-neutral-900 text-white opacity-30 transition-[opacity] dark:bg-neutral-100 dark:text-black hover:opacity-100"
>
  <span class="i-lucide-x block h-6 w-6"></span>
</button>
