<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { getExtensions } from "@/lib/extensions/get-extensions";
  import ExtensionSubLoader from "@/components/extensions/ExtensionSubLoader.svelte";
  import { ExtensionsQueryKey } from "@/constants/extensions";

  // re-fetch query on state change
  const extensions = $derived(
    createQuery({
      // will be re-fetched on plugin list update
      "queryKey": ExtensionsQueryKey,
      "queryFn" : () => {
        const currentExtensions = getExtensions({
          "local": true,
        });

        return Object.entries(currentExtensions);
      },
    }),
  );
</script>

{#if $extensions.data}
  <!-- 'extension' format: [id, manifest] -->
  {#each $extensions.data as extension (extension[0])}
    <!-- load only if extension is enabled -->
    {#if extension[1]?.enabled}
      <ExtensionSubLoader
        name={extension[0]}
        manifest={extension[1]}
      />
    {/if}
  {/each}
{/if}
