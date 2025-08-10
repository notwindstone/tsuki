<script lang="ts">
  import type { HistoryEntryType } from "@/types/history/history-entry.type";
  import Card from "@/components/base/Card.svelte";
  import PaginationNav from "@/components/base/PaginationNav.svelte";

  let page = $state<number>(1);
  let {
    data,
    size,
  }: {
    "data": Record<number, Array<HistoryEntryType>>;
    "size": number;
  } = $props();

  const goNext = () => {
    if (page >= size) {
      page = size;

      return;
    }

    page++;
  };
  const goPrevious = () => {
    if (page <= 1) {
      page = 1;

      return;
    }

    page--;
  };
  const setPage = (specific: number) => {
    page = specific;
  };
</script>

<PaginationNav
  page={page}
  size={size}
  goNext={goNext}
  goPrevious={goPrevious}
  setPage={setPage}
/>
<div class="grid cols-2 w-full gap-2 md:cols-5 sm:cols-3">
  <!-- index is safer as a key here (entries can be duplicated) -->
  {#each data[page - 1] as entry, index (`${page}-${index}`)}
    <Card entry={entry} />
  {/each}
</div>
<PaginationNav
  page={page}
  size={size}
  goNext={goNext}
  goPrevious={goPrevious}
  setPage={setPage}
/>
