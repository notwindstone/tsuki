<script lang="ts">
  import ExtensionsLoader from "@/components/extensions/ExtensionsLoader.svelte";
  import ProgressBar from "@/components/layout/ProgressBar.svelte";
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    "children": Snippet;
  } = $props();
</script>

<ProgressBar />
{@render children()}
<ExtensionsLoader />
