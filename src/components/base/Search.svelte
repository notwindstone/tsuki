<script lang="ts">
  let {
    setSearch,
  }: {
    "setSearch": (newValue: unknown) => void;
  } = $props();
</script>

<div class="flex flex-nowrap items-center overflow-clip w-full h-10 gap-0 cursor-text ring-black dark:ring-white rounded-md bg-neutral-50 dark:bg-neutral-950">
  <div class="shrink-0 flex justify-center items-center w-10 h-10">
    <div class="i-lucide-search w-4 h-4"></div>
  </div>
  <input
    type="text"
    oninput={event => setSearch(event.currentTarget.value)}
    class="outline-none focus:outline-none w-full h-full text-sm bg-transparent text-black dark:text-white"
    placeholder="Search anime..."
  />
</div>
