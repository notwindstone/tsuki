<script lang="ts">
  import Header from "@/components/layout/Header.svelte";
  import NavigationBar from "@/components/layout/NavigationBar.svelte";
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    "children": Snippet;
  } = $props();
</script>

<Header />
<div class="w-full h-[calc(100%-64px)] flex sm:flex-row-reverse flex-col">
  <main class="relative w-full h-full overflow-y-auto">
    {@render children()}
  </main>
  <NavigationBar />
</div>
