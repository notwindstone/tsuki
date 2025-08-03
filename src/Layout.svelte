<script lang="ts">
  import Header from "@/components/layout/Header.svelte";
  import Navbar from "@/components/layout/Navbar.svelte";
  import { setContext, type Snippet } from "svelte";
  import { ScreenContextKey } from "@/constants/screens";

  // For Screen functionality
  setContext<{
    "label" : string;
    "screen": string;
  } | undefined>(
    ScreenContextKey,
    undefined,
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
