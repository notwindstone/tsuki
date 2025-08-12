<script lang="ts">
  import { removeEntryFromHistory } from "@/lib/queries/remove-entry-from-history";
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";

  // don't care about reactivity here
  const toConfirm = getCurrentSettingsState().current.confirmation;
  let {
    entryDate,
    optimisticRemove,
  }: {
    "entryDate"       : string | undefined;
    "optimisticRemove": () => void;
  } = $props();
</script>

{#if entryDate}
  <button
    aria-label="Delete this entry"
    onclick={(event: MouseEvent) => {
      // both of these callbacks are needed to prevent from triggering navigation
      event.preventDefault();
      event.stopPropagation();

      if (!toConfirm) {
        removeEntryFromHistory(entryDate);
        optimisticRemove();

        return;
      }

      const toDelete = confirm("Do you really want to delete this history entry?");

      if (!toDelete) {
        return;
      }

      removeEntryFromHistory(entryDate);
      optimisticRemove();
    }}
    class="absolute right-2 top-2 z-10 h-8 w-8 flex items-center justify-center rounded-md bg-neutral-900 text-white opacity-30 dark:bg-neutral-100 dark:text-black hover:opacity-100 motion-safe:transition-[opacity]"
  >
    <span class="i-lucide-x block h-6 w-6"></span>
  </button>
{/if}
