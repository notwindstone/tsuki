<script lang="ts">
  import ExtensionsLoader from "@/components/extensions/ExtensionsLoader.svelte";
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    "children": Snippet;
  } = $props();
</script>

{@render children()}
<ExtensionsLoader />
