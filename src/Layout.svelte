<script lang="ts">
  import Header from "@/components/layout/Header.svelte";
  import Navbar from "@/components/layout/Navbar.svelte";
  import { setContext, type Snippet } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";
  import type { ScreenType } from "@/types/Screen.type";
  import Screen from "@/components/layout/Screen.svelte";

  let currentScreen = $state<ScreenType>({
    "state": undefined,
  });

  // For Screen functionality
  setContext<ScreenType>(
    ScreenContextKey,
    currentScreen,
  );

  let {
    children,
  }: {
    "children": Snippet;
  } = $props();
</script>

<Header />
{@render children()}
<Navbar />
<Screen />
