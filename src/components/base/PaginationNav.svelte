<script lang="ts">
  let {
    page,
    size,
    goNext,
    goPrevious,
    setPage,
  }: {
    "page"      : number;
    "size"      : number;
    "goNext"    : () => void;
    "goPrevious": () => void;
    "setPage"   : (specific: number) => void;
  } = $props();

  const temporary = [
    1, "dots", 3, 4, 5, "dots", 10,
  ] as const;
</script>

<div class="flex flex-wrap justify-center gap-2">
  <button
    disabled={page <= 1}
    aria-label="go to the previous page"
    class="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 transition-[background-color] dark:bg-neutral-900 disabled:bg-transparent"
    onclick={goPrevious}
  >
    <div class="i-lucide-chevron-left"></div>
  </button>
  <!-- items can be duplicated, index is better here as the key -->
  {#each temporary as item, index (index)}
    {#if item === "dots"}
      <div class="h-8 w-8 flex items-center justify-center">
        <div class="i-lucide-ellipsis"></div>
      </div>
    {:else}
      <button
        onclick={() => setPage(item)}
        class={[
          "h-8 min-w-8 flex items-center justify-center rounded-md transition-[background-color]",
          page === item
            ? "bg-rose-500"
            : "bg-neutral-100 dark:bg-neutral-900",
        ]}
      >
        {item}
      </button>
    {/if}
  {/each}
  <button
    disabled={page >= size}
    aria-label="go to the next page"
    class="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-100 transition-[background-color] dark:bg-neutral-900 disabled:bg-transparent"
    onclick={goNext}
  >
    <div class="i-lucide-chevron-right"></div>
  </button>
</div>
