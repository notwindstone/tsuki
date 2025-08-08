<script lang="ts">
  let {
    setSearch,
    classNames,
  }: {
    "setSearch"  : (newValue: unknown) => void;
    "classNames"?: string;
  } = $props();
</script>

<div
  class={[
    "h-10 w-full flex flex-nowrap cursor-text items-center gap-0 overflow-clip rounded-md bg-neutral-100 ring-black dark:bg-neutral-900 dark:ring-white",
    classNames,
  ]}
>
  <div class="h-10 w-10 flex shrink-0 items-center justify-center">
    <div class="i-lucide-search h-4 w-4"></div>
  </div>
  <input
    type="text"
    oninput={event => setSearch(event.currentTarget.value)}
    class="h-full w-full bg-transparent text-sm text-black outline-none dark:text-white focus:outline-none placeholder-neutral-500"
    placeholder="Search anime..."
  />
</div>
