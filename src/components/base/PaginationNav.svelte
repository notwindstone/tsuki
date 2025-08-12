<script lang="ts">
  import { getPaginationEntries } from "@/lib/helpers/get-pagination-entries";

  let {
    page,
    size,
    delta,
    goNext,
    goPrevious,
    setPage,
  }: {
    "page"      : number;
    "size"      : number;
    "delta"     : number;
    "goNext"    : () => void;
    "goPrevious": () => void;
    "setPage"   : (specific: number) => void;
  } = $props();

  const pagination = $derived(
    getPaginationEntries({
      "current": page,
      "last"   : size,
      "delta"  : delta,
    }),
  );
</script>

<div class="max-w-full w-88 flex flex-nowrap justify-between gap-2 sm:w-128">
  <button
    disabled={page <= 1}
    aria-label="Go to the previous page"
    class="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 ring-black transition-[background-color,shadow] dark:bg-neutral-900 disabled:bg-transparent focus:ring-2 dark:ring-white"
    onclick={goPrevious}
  >
    <span class="i-lucide-chevron-left"></span>
  </button>
  <div class="flex overflow-x-auto flex-nowrap gap-2">
    <!-- items can be duplicated, index is better here as the key -->
    {#each pagination as item, index (index)}
      {#if item === "dots"}
        <div class="h-8 w-8 flex items-center justify-center">
          <div class="i-lucide-ellipsis"></div>
        </div>
      {:else}
        <button
          onclick={() => setPage(item)}
          class={[
            "font-medium h-8 min-w-8 flex items-center justify-center rounded-md px-2 transition-[background-color]",
            page === item
              ? "bg-rose-500"
              : "bg-neutral-100 dark:bg-neutral-900",
          ]}
        >
          {item}
        </button>
      {/if}
    {/each}
  </div>
  <button
    disabled={page >= size}
    aria-label="Go to the next page"
    class="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 ring-black transition-[background-color,shadow] dark:bg-neutral-900 disabled:bg-transparent focus:ring-2 dark:ring-white"
    onclick={goNext}
  >
    <span class="i-lucide-chevron-right"></span>
  </button>
</div>
