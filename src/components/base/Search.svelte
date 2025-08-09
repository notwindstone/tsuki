<script lang="ts">
  let {
    setSearch,
    classNames,
    placeholder,
  }: {
    "setSearch"   : (newValue: unknown) => void;
    "classNames"? : string;
    "placeholder"?: string;
  } = $props();
</script>

<div
  class={[
    "relative h-10 w-full cursor-text overflow-clip rounded-md bg-neutral-100 ring-2 ring-transparent transition-[shadow] dark:bg-neutral-900 focus-within:ring-black dark:focus-within:ring-white",
    classNames,
  ]}
>
  <div class="pointer-events-none absolute h-10 w-10 flex items-center justify-center">
    <div class="i-lucide-search h-4 w-4"></div>
  </div>
  <input
    type="text"
    oninput={event => setSearch(event.currentTarget.value)}
    class="h-full w-full bg-transparent pl-10 text-sm text-black outline-none dark:text-white focus:outline-none placeholder-neutral-500"
    placeholder={placeholder}
  />
</div>
