<script lang="ts">
  let {
    toggled,
    toggle,
  }: {
    "toggled": boolean;
    "toggle" : () => void;
  } = $props();
</script>

<button
  aria-label="Toggle an option"
  onclick={toggle}
  class={[
    "h-8 w-14 rounded-full p-1 transition-[background-color]",
    toggled
      ? "bg-neutral-400 dark:bg-neutral-600"
      : "bg-neutral-200 dark:bg-neutral-800",
  ]}
>
  <span
    class={[
      "block h-6 w-6 rounded-full bg-black dark:bg-white transition-[transform]",
      toggled ? "translate-x-6" : "translate-x-0",
    ]}
  ></span>
</button>
