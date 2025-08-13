<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { getExtensions } from "@/lib/extensions/get-extensions";
  import ExtensionSubLoader from "@/components/extensions/ExtensionSubLoader.svelte";

  const extensions = $derived(
    createQuery({
      "queryKey": ["extensions", "list", "localStorage"],
      "queryFn" : () => {
        const currentExtensions = getExtensions();

        return Object.entries(currentExtensions);
      },
    }),
  );
</script>

{#if $extensions.data}
  <!-- 'extension' format: [id, manifest] -->
  {#each $extensions.data as extension (extension[0])}
    <ExtensionSubLoader
      name={extension[0]}
      manifest={extension[1]}
    />
  {/each}
{/if}
