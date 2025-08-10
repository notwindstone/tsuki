<script lang="ts">
  import type { HistoryEntryType } from "@/types/history/history-entry.type";
  import Card from "@/components/base/Card.svelte";

  let page = $state<number>(1);
  let {
    data,
    size,
  }: {
    "data": Record<number, Array<HistoryEntryType>>;
    "size": number;
  } = $props();
</script>

<div class="grid cols-2 w-full gap-2 md:cols-5 sm:cols-3">
  <!-- index is safer as a key here (entries can be duplicated) -->
  {#each data[page - 1] as entry, index (`${page}-${index}`)}
    <Card entry={entry} />
  {/each}
</div>
