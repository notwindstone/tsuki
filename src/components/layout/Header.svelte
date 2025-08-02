<script lang="ts">
  import { ripple } from "svelte-ripple-action";
</script>

<header class="z-1000 fixed top-0 flex flex-nowrap items-center gap-2 bg-zinc-950 h-16 w-full pl-2 sm:pl-26">
  <button
    aria-label="Go back"
    onclick={() => window.history.back}
    class="relative shrink-0 cursor-pointer flex justify-center items-center p-2 rounded-full"
    use:ripple={{
      "color": "rgba(255, 255, 255, 0.06)",
    }}
  >
    <span class="i-material-symbols-arrow-back w-6 h-6"></span>
  </button>
  <p class="text-lg leading-none">
    Главная
  </p>
</header>
