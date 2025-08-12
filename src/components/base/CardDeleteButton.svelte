<script lang="ts">
  import { removeEntryFromHistory } from "@/lib/queries/remove-entry-from-history";

  let {
    entryDate,
    optimisticRemove,
  }: {
    "entryDate"       : string | undefined;
    "optimisticRemove": () => void;
  } = $props();
</script>

<button
  aria-label="Delete this entry"
  onclick={(event: MouseEvent) => {
    // both of these callbacks are needed to prevent from triggering navigation
    event.preventDefault();
    event.stopPropagation();

    // TODO: add a settings option to make user decide whether to show confirmation or no
    const toDelete = confirm("Do you really want to delete this history entry?");

    if (!toDelete || !entryDate) {
      return;
    }

    removeEntryFromHistory(entryDate);
    optimisticRemove();
  }}
  class="absolute right-2 top-2 z-10 h-8 w-8 flex items-center justify-center rounded-md bg-neutral-900 text-white opacity-30 transition-[opacity] dark:bg-neutral-100 dark:text-black hover:opacity-100"
>
  <span class="i-lucide-x block h-6 w-6"></span>
</button>
