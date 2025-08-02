<script lang="ts">
  import Header from "@/components/layout/Header.svelte";
  import Navbar from "@/components/layout/Navbar.svelte";
  import ExtraHeader from "@/components/layout/ExtraHeader.svelte";
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    "children": Snippet;
  } = $props();
</script>

<Header />
<ExtraHeader />
{@render children()}
<Navbar />
