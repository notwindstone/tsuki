<script lang="ts">
  import Clock from "@/components/icons/Clock.svelte";
  import Book from "@/components/icons/Book.svelte";
  import Compass from "@/components/icons/Compass.svelte";
  import type { RouteType } from "@/states/route/route.type";

  let active = $state<RouteType["current"]>("/");
</script>

<nav class="fixed bottom-0 h-20 w-full flex flex-nowrap px-2">
  <button class="h-full flex flex-1">
    <Book active={active === "/"} />
  </button>
</nav>
